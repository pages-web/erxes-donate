'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { phoneZod } from '@/lib/zod';
import { useAtom, useSetAtom } from 'jotai';
import { deliveryInfoAtom, donateViewAtom } from '@/store/donate.store';
import { useDonate } from './donate';
import { LoadingIcon } from '@/components/ui/loading';
import { ArrowLeftIcon } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Нэрээ бүтнээр нь оруулана уу',
  }),
  phone: phoneZod,
  source: z.string().min(4, {
    message: 'Эx үүсвэрийн мэдээлэл ээ 4-өөс дээш үсгээр илэрхийлнэ үү',
  }),
  eb_id: z.string().length(12, {
    message: 'Иргэний бүртгэлийн дугаараа зөв оруулана уу',
  }),
});

const DonateInfo = () => {
  const { loading, action, variables } = useDonate();
  const [deliveryInfo, setDeliveryInfo] = useAtom(deliveryInfoAtom);
  const setView = useSetAtom(donateViewAtom);

  const { description, ...defaultValues } = deliveryInfo;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const description = `${values.name} ${values.phone} ${values.source} ${values.eb_id}`;

    setDeliveryInfo({ ...values, description });

    action({
      variables: {
        ...variables,
        description,
        deliveryInfo: {
          ...values,
          description,
        },
      },
    });
  }

  return (
    <CardContent className="md:pt-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Таны нэр</FormLabel>
                <FormControl>
                  <Input placeholder="Бат" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Утасны дугаар</FormLabel>
                <FormControl>
                  <Input placeholder="0000 0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xандивын эх үүсвэр</FormLabel>
                <FormControl>
                  <Input placeholder="цалин, халамж гэх мэт" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eb_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Иргэний бүртгэлийн дугаар</FormLabel>
                <FormControl>
                  <Input placeholder="0000 0000 0000" {...field} />
                </FormControl>
                <FormDescription>
                  Ибаримт дээр харагддаг 12 оронтой тоо.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading && <LoadingIcon />}
            Үргэлжлүүлэх
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full !mt-4"
            disabled={loading}
            onClick={() => setView('')}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 -ml-2" />
            Буцах
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default DonateInfo;
