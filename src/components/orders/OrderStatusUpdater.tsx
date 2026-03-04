"use client";

import { useState } from "react";

const transitions: Record<string, string[]> = {
  RECEIVED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

interface Props {
  orderId: string;
  currentStatus: string;
  onUpdate: () => void;
}

export function OrderStatusUpdater({ orderId, currentStatus, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const nextStatuses = transitions[currentStatus] || [];

  if (nextStatuses.length === 0) return null;

  async function updateStatus(status: string) {
    setLoading(true);
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      onUpdate();
    } catch {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      {nextStatuses.map((status) => (
        <button
          key={status}
          onClick={() => updateStatus(status)}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 ${
            status === "CANCELLED"
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {status === "CANCELLED"
            ? "Cancel"
            : `Mark as ${status.charAt(0) + status.slice(1).toLowerCase()}`}
        </button>
      ))}
    </div>
  );
}
