import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold font-sans uppercase tracking-wide whitespace-nowrap",
  {
    variants: {
      variant: {
        category: "bg-ink/[0.05] text-ink/70",
        coral: "bg-coral/10 text-coral",
        marigold: "bg-marigold/15 text-[#92610a]",
        electric: "bg-electric/10 text-electric",
        violet: "bg-violet/10 text-violet",
        lime: "bg-lime/25 text-[#5b7a00]",
        success: "bg-emerald-50 text-emerald-600",
        warning: "bg-amber-50 text-amber-600",
        muted:
          "bg-transparent text-ink/55 normal-case tracking-normal font-medium px-0",
      },
    },
    defaultVariants: { variant: "category" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
