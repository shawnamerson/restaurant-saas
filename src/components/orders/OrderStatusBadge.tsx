const statusStyles: Record<string, string> = {
  RECEIVED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-yellow-100 text-yellow-800",
  READY: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  RECEIVED: "Order Received",
  PREPARING: "Preparing",
  READY: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
