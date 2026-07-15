import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      default: "bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] text-[#050816] font-semibold hover:from-[#F4E4A6] hover:via-[#D4AF37] hover:to-[#C9A227] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_30px_rgba(244,228,166,0.6)] transition-all duration-300",
      outline: "border border-[#D4AF37]/40 bg-transparent hover:bg-[#D4AF37]/10 text-slate-900 dark:border-[#D4AF37]/40 dark:text-[#F9FAFB] dark:hover:bg-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.15)]",
      ghost: "hover:bg-[#D4AF37]/10 dark:hover:bg-[#D4AF37]/20 text-slate-900 dark:text-[#F9FAFB]",
      link: "text-[#D4AF37] underline-offset-4 hover:underline dark:text-[#F4E4A6]",
      glass: "bg-[#111827]/60 backdrop-blur-md border border-[#D4AF37]/30 text-[#F9FAFB] hover:bg-[#111827]/80 dark:bg-[#111827]/60 dark:border-[#D4AF37]/40 dark:text-[#F9FAFB] dark:hover:bg-[#111827]/80 shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-lg px-8",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
