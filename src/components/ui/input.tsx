import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-sans text-ink shadow-sm transition-colors placeholder:text-ink/40 focus-visible:outline-none focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
