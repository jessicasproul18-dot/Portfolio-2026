// Tremor Dropdown Menu [v1.0.0]

"use client"

import * as React from "react"
import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu"
// Removed unused icon imports

import { cx } from "@/lib/utils"
import { Input } from "./Input"

import { useSearchSelect } from "@/lib/useSearchSelect"


const SearchSelect = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Root>) => {
  const { isOpen, setIsOpen } = useSearchSelect();
  console.log("SearchSelect isOpen:", isOpen);
  return (
    <DropdownMenuPrimitives.Root {...props} open={isOpen} onOpenChange={setIsOpen}>
      {children}
    </DropdownMenuPrimitives.Root>
)}

const SearchSelectTrigger = DropdownMenuPrimitives.Trigger
SearchSelectTrigger.displayName = "SearchSelectTrigger"

const SearchSelectGroup = DropdownMenuPrimitives.Group
SearchSelectGroup.displayName = "SearchSelectGroup"

interface SearchSelectInputProps extends React.ComponentPropsWithoutRef<"input"> {
  value?:string;
  placeholder?:string;
}

const SearchSelectInput = React.forwardRef<HTMLInputElement, SearchSelectInputProps>(
  ({ className, placeholder, value, ...props }, forwardedRef) => {
    const { setIsOpen } = useSearchSelect();

    const handleInput = (val: string) => {
      setIsOpen(val.length > 0);
    };
    
    return (
      <>
        <Input
            ref={forwardedRef}
            placeholder={ placeholder ?? "Search" }
            id="location"
            name="location"
            type="search"
            value={value}
            autoComplete='off'
            onChange={(e) => handleInput(e.target.value)}
            className={cx(
              // base
              className,
            )}
            {...props}
            />
      </>
    )
})

SearchSelectInput.displayName = "SearchSelectInput"

const SearchSelectContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Content>
>(
  (
    {
      className,
      sideOffset = 8,
      collisionPadding = 8,
      align = "center",
      loop = true,
      ...props
    },
    forwardedRef,
  ) => (
    <>
      <DropdownMenuPrimitives.Trigger />
      <DropdownMenuPrimitives.Portal>
        <DropdownMenuPrimitives.Content
          ref={forwardedRef}
          className={cx(
            // base
            "relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
            // widths
            "min-w-48",
            // heights
            "max-h-[var(--radix-popper-available-height)]",
            // background color
            "bg-white dark:bg-gray-950",
            // text color
            "text-gray-900 dark:text-gray-50",
            // border color
            "border-gray-200 dark:border-gray-800",
            // transition
            "will-change-[transform,opacity]",
            "data-[state=closed]:animate-hide",
            "data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
            className,
          )}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={collisionPadding}
          loop={loop}
          {...props}
        />
      </DropdownMenuPrimitives.Portal>
    </>
  ),
)
SearchSelectContent.displayName = "SearchSelectContent"

const SearchSelectItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Item>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item>,
    "asChild"
  > & {
    shortcut?: string
    hint?: string
  }
>(({ className, shortcut, hint, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Item
    ref={forwardedRef}
    className={cx(
      // base
      "group/SearchSelectItem relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-1 outline-hidden transition-colors data-[state=checked]:font-semibold sm:text-sm",
      // text color
      "text-gray-900 dark:text-gray-50",
      // disabled
      "data-disabled:pointer-events-none data-disabled:text-gray-400 data-disabled:hover:bg-none dark:data-disabled:text-gray-600",
      // focus
      "focus-visible:bg-gray-100 dark:focus-visible:bg-gray-900",
      // hover
      "hover:bg-gray-100 dark:hover:bg-gray-900",
      className,
    )}
    tremor-id="tremor-raw"
    {...props}
  >
    {children}
    {hint && (
      <span
        className={cx("ml-auto pl-2 text-sm text-gray-400 dark:text-gray-600")}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx("ml-auto pl-2 text-sm text-gray-400 dark:text-gray-600")}
      >
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitives.Item>
))
SearchSelectItem.displayName = "SearchSelectItem"

const SearchSelectLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Label
    ref={forwardedRef}
    className={cx(
      // base
      "px-2 py-2 text-xs font-medium tracking-wide",
      // text color
      "text-gray-500 dark:text-gray-500",
      className,
    )}
    {...props}
  />
))
SearchSelectLabel.displayName = "SearchSelectLabel"

const SearchSelectSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Separator
    ref={forwardedRef}
    className={cx(
      "-mx-1 my-1 h-px border-t border-gray-200 dark:border-gray-800",
      className,
    )}
    {...props}
  />
))
SearchSelectSeparator.displayName = "SearchSelectSeparator"

const SearchSelectIconWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cx(
        // text color
        "text-gray-600 dark:text-gray-400",
        // disabled
        "group-data-disabled/SearchSelectItem:text-gray-400 dark:group-data-disabled/SearchSelectItem:text-gray-700",
        className,
      )}
      {...props}
    />
  )
}
SearchSelectIconWrapper.displayName = "SearchSelectIconWrapper"

export {
  SearchSelect,
  SearchSelectTrigger,
  SearchSelectGroup,
  SearchSelectContent,
  SearchSelectItem,
  SearchSelectIconWrapper,
  SearchSelectLabel,
  SearchSelectInput,
  SearchSelectSeparator,
}