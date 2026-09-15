// Site logo — Jessica Sproul JS mark (replaces former AMP wordmark)

import React from "react"
import Image from "next/image"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"

const applicationLogoVariants = tv({
  base: "inline-flex items-center",
  variants: {
    variant: {
      default: [],
      white: [],
      zinc: ["opacity-80"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface AMPLogoProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof applicationLogoVariants> {
  "aria-label"?: string
}

const AMPLogo = React.forwardRef<HTMLDivElement, AMPLogoProps>(
  (
    {
      className,
      variant,
      "aria-label": ariaLabel = "Jessica Sproul",
      ...props
    }: AMPLogoProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx(applicationLogoVariants({ variant }), className)}
        role="img"
        aria-label={ariaLabel}
        tremor-id="tremor-raw"
        {...props}
      >
        <Image
          src="/icons/icon-192x192.png"
          alt="Jessica Sproul"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
          priority
        />
      </div>
    )
  },
)

AMPLogo.displayName = "AMPLogo"

export { AMPLogo, applicationLogoVariants, type AMPLogoProps }
export default AMPLogo
