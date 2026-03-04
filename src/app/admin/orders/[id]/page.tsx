"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderStatusUpdater } from "@/components/orders/OrderStatusUpdater";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminOrderDetailPage() {
  const params = useParams();
  const { data: order, error, mutate } = useSWR(
    `/api/admin/orders/${params.id}`,
    fetcher
  );

  if (error) return <p className="text-red-500">Failed to load order.</p>;
  if (!order) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <OrderStatusUpdater
        orderId={order.id}
        currentStatus={order.status}
        onUpdate={mutate}
      />

      {/* Customer Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 mt-6">
        <h2 className="font-semibold mb-3">Customer</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Name:</span> {order.customerName}
          </div>
          <div>
            <span className="text-gray-500">Email:</span> {order.customerEmail}
          </div>
          <div>
            <span className="text-gray-500">Phone:</span> {order.customerPhone}
          </div>
          <div>
            <span className="text-gray-500">Type:</span> {order.type}
          </div>
          {order.deliveryAddress && (
            <div className="col-span-2">
              <span className="text-gray-500">Address:</span>{" "}
              {order.deliveryAddress}
            </div>
          )}
          {order.notes && (
            <div className="col-span-2">
              <span className="text-gray-500">Notes:</span> {order.notes}
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-semibold mb-3">Items</h2>
        <div className="space-y-2">
          {order.items.map(
            (item: {
              id: string;
              name: string;
              price: number;
              quantity: number;
            }) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
              </div>
            )
          )}
        </div>
        <div className="border-t mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${(order.subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${(order.tax / 100).toFixed(2)}</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${(order.deliveryFee / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>${(order.total / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold mb-3">Payment</h2>
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Paid:</span>{" "}
            {order.paid ? "Yes" : "No"}
          </p>
          {order.stripePaymentId && (
            <p>
              <span className="text-gray-500">Stripe Payment ID:</span>{" "}
              {order.stripePaymentId}
            </p>
          )}
          <p>
            <span className="text-gray-500">Created:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
