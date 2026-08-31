import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"

const iconDivider = tv({
  slots: {
    root: "flex w-full min-w-0 items-center gap-3",
    iconFrame: "flex shrink-0 items-center justify-center border",
    tagline: "text-sm font-normal uppercase",
    line: "h-px min-w-0 flex-1",
  },
  variants: {
    variant: {
      primary: {
        iconFrame:
          "border-primary-500 text-primary-500 [&_svg]:!text-primary-500 dark:border-primary-500 dark:text-primary-500 dark:[&_svg]:!text-primary-500",
        tagline: "text-primary-500/80",
        line: "bg-primary-500 dark:bg-zinc-600",
      },
      secondary: {
        iconFrame:
          "border-secondary-500 text-secondary-500 [&_svg]:!text-secondary-500 dark:border-secondary-500 dark:text-secondary-500 dark:[&_svg]:!text-secondary-500",
        tagline: "text-secondary-500/80",
        line: "bg-secondary-500 dark:bg-zinc-600",
      },
      light: {
        iconFrame:
          "border-white text-white [&_svg]:!text-white dark:border-white dark:text-white dark:[&_svg]:!text-white",
        tagline: "text-white/80",
        line: "bg-white/80 dark:bg-zinc-600",
      },
      dark: {
        iconFrame:
          "border-zinc-900 text-zinc-900 [&_svg]:!text-zinc-900 dark:border-zinc-900",
        tagline: "text-zinc-900/80",
        line: "bg-zinc-900/80 dark:bg-zinc-600",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

export interface IconDividerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof iconDivider> {
  /** Icon or custom node shown inside the square border on the left. */
  icon: React.ReactNode
  /** Classes for the square icon frame. */
  iconContainerClassName?: string
  /** Classes for the horizontal line (fills remaining width). */
  lineClassName?: string
  /** Tagline to display next to the icon. */
  tagline?: string
}

const IconDivider = React.forwardRef<HTMLDivElement, IconDividerProps>(
  (
    {
      icon,
      className,
      variant,
      iconContainerClassName,
      lineClassName,
      tagline,
      ...props
    }: IconDividerProps,
    forwardedRef,
  ) => {
    const slots = iconDivider({ variant })

    return (
      <div
        ref={forwardedRef}
        className={cx(slots.root(), className)}
        {...props}
      >
        <div
          className={cx(slots.iconFrame(), iconContainerClassName)}
          aria-hidden
        >
          {icon}
        </div>
        <div>
          <h6 className={slots.tagline()}>{tagline}</h6>
        </div>
        <div
          className={cx(slots.line(), lineClassName)}
          aria-hidden
        />
      </div>
    )
  },
)

IconDivider.displayName = "IconDivider"

export { IconDivider }
