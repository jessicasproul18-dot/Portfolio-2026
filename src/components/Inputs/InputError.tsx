import React from "react"
import { HTMLAttributes } from 'react';
import { Slot } from "@radix-ui/react-slot"
import { cx } from "@/lib/utils"

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean
  message?: string
}

const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
    (
        {
            asChild,
            message,
            className = '',
            ...props
        }: InputErrorProps,
        forwardedRef,
    ) => {
        const Component = asChild ? Slot : "p"
        return message ? (
            <Component
                ref={forwardedRef}
                {...props}
                className={cx("text-sm text-red-600 dark:text-red-400", className)}
            >
                {message}
            </Component>
        ) : null;
    }
)

InputError.displayName = "InputError"

export { InputError, type InputErrorProps }
