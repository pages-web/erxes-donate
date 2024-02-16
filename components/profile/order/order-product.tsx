import Image from '@/components/ui/image';

const OrderProduct = () => {
  return (
    <div className="rounded-xl overflow-hidden flex gap-4">
      <Image
        src="/images/product.webp"
        alt=""
        height={200}
        width={200}
        className="h-40 w-40"
      />

      <div className="py-8">
        <h3 className="font-medium">Nike Air Jordan 1</h3>
      </div>
    </div>
  );
};

export default OrderProduct;
