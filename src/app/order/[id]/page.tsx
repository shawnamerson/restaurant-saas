export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";

interface Props {
  params: { id: string };
}

export default async function OrderStatusPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Order #{order.orderNumber}</h1>
      <div className="mb-8">
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Items</h2>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold pt-3 mt-3 border-t">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-6">
        <p>Placed: {order.createdAt.toLocaleString()}</p>
        <p>Type: {order.type}</p>
        {order.notes && <p>Notes: {order.notes}</p>}
      </div>

      <Link href="/menu" className="text-primary hover:text-primary-dark">
        Order More
      </Link>
    </div>
  );
}
