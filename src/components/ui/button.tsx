import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Quest button system. Color policy: brand coral is reserved for the
// single "Post a quest" create CTA (`primary`). Everything else is
// neutral — `secondary` (solid ink) for prominent non-brand actions
// like Apply, `outline`/`ghost` for tertiary controls. Every variant
// sets an EXPLICIT background so the native `button{background:coral}`
// base rule can never bleed through.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold font-sans transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        // brand — create only (WCAG-AA coral)
        primary:
          "bg-coral-cta text-white hover:bg-coral-cta-hover shadow-sm focus-visible:ring-coral/40",
        // prominent neutral — e.g. Apply
        secondary: "bg-ink text-white hover:bg-ink/90",
        // bordered neutral
        outline:
          "bg-white border border-ink/20 text-ink hover:bg-ink/[0.04] hover:border-ink/30",
        // subtle neutral — tabs, filters, icon buttons
        ghost: "bg-transparent text-ink/70 hover:bg-ink/[0.06] hover:text-ink",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "secondary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
