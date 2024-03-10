'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import PhoneNumber from '@/components/ui/phone-number';
import * as z from 'zod';
import { currentUserAtom } from '@/store/user.store';
import { useAtomValue } from 'jotai';
import { SmartphoneIcon } from 'lucide-react';
import { useUserEdit } from '@/sdk/hooks/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneZod } from '@/lib/zod';
import { LoadingIcon } from '@/components/ui/loading';

const formSchema = z.object({
  phone: phoneZod
});

const ChangePhone = () => {
  const { phone, _id } = useAtomValue(currentUserAtom) || {};
  const { editUser, loading } = useUserEdit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      phone: phone || ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editUser({
      variables: { _id, phone: values.phone }
    });
  }
  return (
    <Form {...form}>
      <form
        className="flex items-center justify-center py-12 flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SmartphoneIcon className="h-8 w-8 text-black/60" strokeWidth={1.7} />
        <div className="text-center space-y-1 mb-4">
          <h3 className="font-medium">Дугаар оруулах</h3>
          <div className="text-sm text-black/50">
            Та зөвхөн өөрийн нэр дээрх гар утасны дугаараас хүсэлт илгээх
            шаардлагатай.
          </div>
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneNumber
                  value={field.value}
                  handleOutputString={(val: string) => field.onChange(val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading}>
          {loading && <LoadingIcon />}
          Дугаараа солих
        </Button>
      </form>
    </Form>
  );
};

export default ChangePhone;
