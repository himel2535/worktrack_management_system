import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none select-none hover:-translate-y-0.5 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900 hover:border-emerald-700/80 font-bold",
        outline:
          "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900/80 hover:border-emerald-700/80 aria-expanded:bg-emerald-900/80",
        secondary:
          "bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900 hover:border-emerald-700/80 aria-expanded:bg-emerald-900",
        glass:
          "bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900 hover:border-emerald-700/80 font-bold",
        ghost:
          "text-white/70 hover:bg-white/10 hover:text-white aria-expanded:bg-white/10",
        destructive:
          "bg-rose-950/90 text-rose-300 border border-rose-800/70 shadow-[inset_0_-2px_0_0_#EF4444] hover:bg-rose-900 hover:border-rose-700/80",
        link: "text-emerald-400 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
