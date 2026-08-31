import * as React from "react"
import * as NavigationMenuPrimitives from "@radix-ui/react-navigation-menu"

import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/utils"
import { RiArrowDownSLine } from "@remixicon/react"

const NavigationMenu = NavigationMenuPrimitives.Root
NavigationMenu.displayName = "NavigationMenu"

const navigationVariants = tv({
  base: [
    "flex",
    "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:space-x-2",
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:space-y-2",
  ],
})

interface NavigationMenuListProps
  extends React.ComponentPropsWithoutRef<"ul">,
    VariantProps<typeof navigationVariants> {
        //    
    }

const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  (
    { 
        className, 
        children, 
        ...props 
    }: NavigationMenuListProps,
    forwardedRef,
  ) => {
    return (
      <NavigationMenuPrimitives.List
        ref={forwardedRef}
        className={cx(navigationVariants(), className)}
        {...props}
      >
          {children}
      </NavigationMenuPrimitives.List>
    )
  }
)
NavigationMenuList.displayName = "NavigationMenuList"


interface NavigationMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Item> {
    // You can add custom props here if needed
    className?: string;
  }

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Item>,
  NavigationMenuItemProps
>(({ className, children, ...props }, forwardedRef) => {
    return (
      <NavigationMenuPrimitives.Item
        ref={forwardedRef}
        className={cx(className)}
        {...props}
      >
          {children}
      </NavigationMenuPrimitives.Item>
    )
  }
)

NavigationMenuItem.displayName = "NavigationMenuItem"

interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<"button">{
    className?: string;
    }

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  (
    { 
        className, 
        children, 
        ...props 
    }: NavigationMenuTriggerProps,
    forwardedRef,
  ) => {
    return (
      <NavigationMenuPrimitives.Trigger
        ref={forwardedRef}
        className={cx(
            "flex items-center gap-1 h-full",
            className
        )}
        {...props}
      >
          {children}
          <RiArrowDownSLine size={16} />
      </NavigationMenuPrimitives.Trigger>
    )
  }
)

NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

interface NavigationMenuContentProps
  extends NavigationMenuPrimitives.NavigationMenuContentProps {
    children?: React.ReactNode
}

const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  (
    { 
        className, 
        children, 
        ...props 
    }: NavigationMenuContentProps,
    forwardedRef,
  ) => {
    return (
      <NavigationMenuPrimitives.Content
        ref={forwardedRef}
        className={cx(
          "z-50 fixed left-0 w-full overflow-hidden border border-zinc-300 bg-popover py-8 text-popover-foreground bg-zinc-50",
          className
        )}
        {...props}
      >
          <div className="container">{children}</div>
      </NavigationMenuPrimitives.Content>
    )
  }
)

NavigationMenuContent.displayName = "NavigationMenuContent"

interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Link> {
    active?: boolean
    children?: React.ReactNode
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, children, active, ...props }, forwardedRef) => {
    return (
      <NavigationMenuPrimitives.Link
        ref={forwardedRef}
        className={cx(
            "px-2 py-0 flex items-center h-full",
            "hover:text-violet-600 hover:border-b hover:border-t hover:border-b-violet-500 hover:border-t-transparent",
            active ? "text-violet-600 border-b border-t border-b-violet-500 border-t-transparent" : "text-gray-700",
            className
        )}
        {...props}
      >
        {children}
      </NavigationMenuPrimitives.Link>
    )
  }
)

NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuSub = NavigationMenuPrimitives.Sub
NavigationMenuSub.displayName = "NavigationMenuSub"

const NavigationMenuViewport = NavigationMenuPrimitives.Viewport
NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuIndicator = NavigationMenuPrimitives.Indicator
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuSub,
  NavigationMenuViewport,
  NavigationMenuIndicator
}