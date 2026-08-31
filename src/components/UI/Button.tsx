// Tremor Button [v0.2.0]
"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Loader2 } from "lucide-react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusRing } from "@/lib/utils"

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border gap-3 text-center tracking-wide uppercase font-semibold transition-all duration-200 ease-in-out shadow-md hover:shadow-lg",
    // disabled
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    size: {
      xs: [
        // padding
        "px-4 py-2",
        // text size
        "text-xs",
      ],
      sm: [
        // padding
        "px-6 py-3",
        // text size
        "text-sm",
      ],
      md: [
        // padding
        "px-8 py-4",
        // text size
        "text-base",
      ],
      lg: [
        // padding
        "px-12 py-6",
        // text size
        "text-lg",
      ],
    },
    icon: {
      true: [],
      false: [],
    },
    variant: {
      default: [
        // border
        "border-white",
        "hover:border-zinc-100",
        // text color
        "text-zinc-900",
        "hover:text-black",
        // background color
        "bg-white",
        "hover:bg-zinc-100",
        // disabled
        "disabled:bg-white/60 disabled:text-zinc-900/60",
      ],

      primary: [
        // border
        "border-primary-600",
        "hover:border-primary-700",
        // text color
        "text-white",
        // background color
        "bg-primary-600",
        "hover:bg-primary-700",
        // disabled
        "disabled:bg-primary-600/60 disabled:text-white/60",
      ],

      primaryOutline: [
        // border
        "border-primary-600",
        "hover:border-primary-700",
        // text color
        "text-primary-700",
        "hover:text-white",
        // background color
        "bg-transparent",
        "hover:bg-primary-600",
        // disabled
        "disabled:bg-transparent disabled:text-primary-600/60",
      ],

      secondary: [
        // border
        "border-secondary",
        "hover:border-secondary-600",
        // text color
        "text-secondary-foreground",
        // background color
        "bg-secondary",
        "hover:bg-secondary-600",
        // disabled
        "disabled:bg-secondary/60 disabled:text-secondary-foreground/60",
      ],

      secondaryOutline: [
        // border
        "border-secondary-600",
        "hover:border-secondary-900",
        // text color
        "text-secondary-600",
        "hover:text-secondary-200",
        // background color
        "bg-transparent",
        "hover:bg-secondary-900",
        // disabled
        "disabled:bg-transparent disabled:text-secondary-600/50",
      ],

      ghost: [
        // border
        "border-white",
        "hover:border-white/90",
        // text color
        "text-white",
        // background color
        "bg-transparent",
        "hover:bg-white/10",
        // disabled
        "disabled:bg-transparent disabled:text-white/60",
      ]

    },
  },
  compoundVariants: [
    {
      icon: true,
      size: "xs",
      class: [
        // remove padding
        "p-0",
        // width and height
        "w-4 h-4",
      ],
    },
    {
      icon: true,
      size: "sm",
      class: [
        // remove padding
        "p-0",
        // width and height
        "w-6 h-6",
      ],
    },
    {
      icon: true,
      size: "md",
      class: [
        // remove padding
        "p-0",
        // width and height
        "w-8 h-8",
      ],
    },
    {
      icon: true,
      size: "lg",
      class: [
        // remove padding
        "p-0",
        // width and height
        "w-10 h-10",
      ],
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    icon: false,
  },
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  preventDefault?: boolean
  size?: "xs" | "sm" | "md" | "lg"
  icon?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      preventDefault = false,
      className,
      disabled,
      variant,
      size,
      icon,
      children,
      onClick,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button"
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (preventDefault) {
        event.preventDefault()
      }
      if (onClick) {
        onClick(event)
      }
    }
    
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant, size, icon }), className)}
        disabled={disabled || isLoading}
        tremor-id="tremor-raw"
        onClick={handleClick}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <Loader2
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants, type ButtonProps }