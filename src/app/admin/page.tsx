import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayOrders, todayRevenue, recentOrders, totalOrders] =
    await Promise.all([
      prisma.order.count({
        where: { createdAt: { gte: today }, paid: true },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: today }, paid: true },
        _sum: { total: true },
      }),
      prisma.order.findMany({
        where: { paid: true },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),
      prisma.order.count({ where: { paid: true } }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Today&apos;s Orders</p>
          <p className="text-3xl font-bold">{todayOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Today&apos;s Revenue</p>
          <p className="text-3xl font-bold">
            {formatPrice(todayRevenue._sum.total || 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-semibold text-lg">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View All
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="p-6 text-gray-500">No orders yet.</p>
        ) : (
          <div className="divide-y">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium">
                    #{order.orderNumber} — {order.customerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items.length} items &middot;{" "}
                    {formatPrice(order.total)}
                  </p>
                </div>
                <div className="text-right">
                  <OrderStatusBadge status={order.status} />
                  <p className="text-xs text-gray-400 mt-1">
                    {order.createdAt.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
