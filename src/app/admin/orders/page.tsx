"use client";

import useSWR from "swr";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import Link from "next/link";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statuses = ["ALL", "RECEIVED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("ALL");
  const query = filter === "ALL" ? "" : `?status=${filter}`;

  const { data, error } = useSWR(`/api/admin/orders${query}`, fetcher, {
    refreshInterval: 10000,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === s
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500">Failed to load orders.</p>}

      {!data && !error && <p className="text-gray-500">Loading...</p>}

      {data && data.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {data && data.length > 0 && (
        <div className="bg-white rounded-lg shadow divide-y">
          {data.map(
            (order: {
              id: string;
              orderNumber: number;
              customerName: string;
              status: string;
              total: number;
              type: string;
              createdAt: string;
              _count: { items: number };
            }) => (
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
                    {order._count.items} items &middot; ${(order.total / 100).toFixed(2)} &middot;{" "}
                    {order.type}
                  </p>
                </div>
                <div className="text-right">
                  <OrderStatusBadge status={order.status} />
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
