// Tremor SelectNative [v0.0.1]

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusInput, hasErrorInput } from "@/lib/utils"

const selectNativeStyles = tv({
  base: [
    // base
    "peer w-full cursor-pointer appearance-none truncate border py-2 pl-3 pr-7 shadow-sm outline-none transition-all sm:text-sm",
    // background color
    "bg-zinc-800",
    // border color
    "border-zinc-600",
    // text color
    "text-zinc-100",
    // placeholder color
    "placeholder-zinc-400",
    // hover
    "hover:bg-zinc-50 hover:dark:bg-zinc-900/50",
    // disabled
    "disabled:pointer-events-none",
    "disabled:bg-zinc-100 disabled:text-zinc-400",
    "disabled:dark:border-zinc-700 disabled:dark:bg-zinc-800 disabled:dark:text-zinc-500",
    // focus
    focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
})

interface SelectNativeProps
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectNativeStyles> {}

const SelectNative = React.forwardRef<HTMLSelectElement, SelectNativeProps>(
  ({ className, hasError, ...props }: SelectNativeProps, forwardedRef) => {
    return (
      <select
        ref={forwardedRef}
        className={cx(selectNativeStyles({ hasError }), className)}
        tremor-id="tremor-raw"
        {...props}
      />
    )
  },
)

SelectNative.displayName = "SelectNative"

export { SelectNative, selectNativeStyles, type SelectNativeProps }