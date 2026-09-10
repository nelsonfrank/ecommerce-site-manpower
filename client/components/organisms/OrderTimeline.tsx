import * as React from "react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/data";
import { TimelineStep } from "@/components/molecules/TimelineStep";

export interface OrderTimelineProps {
  status: OrderStatus;
  className?: string;
}

const TIMELINE_STEPS = [
  "Order placed",
  "Processing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export function OrderTimeline({ status, className }: OrderTimelineProps) {
  const completedCount = status === "delivered" ? 5 : 3;

  return (
    <div className={cn("my-6", className)}>
      {TIMELINE_STEPS.map((step, index) => {
        const isDone = index < completedCount;
        const isLast = index === TIMELINE_STEPS.length - 1;

        return (
          <TimelineStep
            key={step}
            title={step}
            description={isDone ? "Complete" : "Upcoming"}
            isDone={isDone}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
}
