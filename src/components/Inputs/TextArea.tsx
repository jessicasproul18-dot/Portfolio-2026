// Tremor TextArea [v0.0.2]

import React from "react"

import { cx, focusInput, hasErrorInput } from "@/lib/utils"

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError, ...props }: TextAreaProps, forwardedRef) => {
    return (
      <textarea
        ref={forwardedRef}
        className={cx(
          // base
          "flex min-h-[4rem] w-full border px-3 py-1.5 shadow-sm outline-none transition-colors sm:text-sm",
          // text color
          "text-zinc-100",
          // border color
          "border-zinc-600",
          // background color
          "bg-zinc-800",
          // placeholder color
          "placeholder-zinc-400",
          // disabled
          "disabled:border-zinc-600 disabled:bg-zinc-700 disabled:text-zinc-500",
          // focus
          focusInput,
          // error
          hasError ? hasErrorInput : "",
          // invalid (optional)
          // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          className,
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    )
  },
)

TextArea.displayName = "TextArea"

export { TextArea, type TextAreaProps }