import React from "react"
import * as SelectPrimitives from "@radix-ui/react-select"
import { RiSearchLine, RiCheckLine, RiArrowUpSLine, RiArrowDownSLine } from "@remixicon/react"

import { tv, type VariantProps } from "tailwind-variants"
// Removed unused Slot import
import { cx, focusInput, hasErrorInput } from "@/lib/utils"
import { Input } from "./Input"
import { useSearchSelect } from "@/lib/useSearchSelect"



const SearchSelect = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitives.Root>) => {
  const { } = useSearchSelect();
  return (
    <SelectPrimitives.Root {...props}>
      {children}
    </SelectPrimitives.Root>
)}

SearchSelect.displayName = "SearchSelect"

const SearchSelectGroup = SelectPrimitives.Group
SearchSelectGroup.displayName = "SearchSelectGroup"

const SearchSelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Value>
>(({ className, ...props }, forwardedRef) => {
  return(
    <div className="relative">
      <div className="absolute inset-0 bg-zinc-100"><input /></div>
      <SelectPrimitives.Value
        ref={forwardedRef}
        className={cx(
          // base
          "px-3 py-2 text-xs font-medium tracking-wide",
          // text color
          "text-zinc-500",
          className,
        )}
        {...props}
      />
  </div>
)})

SearchSelectValue.displayName = "SearchSelectValue"

const searchSelectTriggerVariants = tv({
  base: cx(
    // base
    "group/trigger flex w-full select-none items-center justify-between gap-2 truncate rounded-md px-3 py-2 outline-none transition sm:text-sm",
    // border color
    "border-zinc-300",
    // text color
    "text-zinc-900",
    // placeholder
    "data-[placeholder]:text-zinc-500",
    // background color
    "bg-white",
    // hover
    "hover:bg-zinc-50",
    // disabled
    "data-[disabled]:bg-zinc-100 data-[disabled]:text-zinc-400",
    focusInput,
  ),
  variants: {
    variant: {
      default: [
        "border",
      ],
      ghost: [
        "border-none",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface SearchSelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Trigger>,
    VariantProps<typeof searchSelectTriggerVariants> {
      hasError?: boolean
    }

const SearchSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Trigger>,
  SearchSelectTriggerProps
>((
    { 
      className, 
      hasError, 
      children, 
      variant,
      ...props 
    }: SearchSelectTriggerProps, 
    forwardedRef
  ) => {
  return (
    
      <SelectPrimitives.Trigger 
        asChild
        ref={forwardedRef}
        className={cx(
          searchSelectTriggerVariants({ variant }),
          hasError ? hasErrorInput : "",
          className,
        )}
        tremor-id="tremor-raw"
        {...props}
      >
        <div>
          <span className="truncate">{children}</span>
          <SelectPrimitives.Icon asChild>
            <RiSearchLine
              className={cx(
                // base
                "size-4 shrink-0",
                // text color
                "text-zinc-400",
                // disabled
                "group-data-[disabled]/trigger:text-zinc-300",
              )}
            />
          </SelectPrimitives.Icon>
        </div>
      </SelectPrimitives.Trigger>
    
  )
})

SearchSelectTrigger.displayName = "SearchSelectTrigger"

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

const SearchSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollUpButton>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.ScrollUpButton
    ref={forwardedRef}
    className={cx(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <RiArrowUpSLine className="size-3 shrink-0" aria-hidden="true" />
  </SelectPrimitives.ScrollUpButton>
))
SearchSelectScrollUpButton.displayName = SelectPrimitives.ScrollUpButton.displayName

const SearchSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollDownButton>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.ScrollDownButton
    ref={forwardedRef}
    className={cx(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <RiArrowDownSLine className="size-3 shrink-0" aria-hidden="true" />
  </SelectPrimitives.ScrollDownButton>
))
SearchSelectScrollDownButton.displayName =
  SelectPrimitives.ScrollDownButton.displayName

const SearchSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Content>
>(
  (
    {
      className,
      position = "popper",
      children,
      sideOffset = 8,
      collisionPadding = 10,
      ...props
    },
    forwardedRef,
  ) => (
    <SelectPrimitives.Portal>
      <SelectPrimitives.Content
        ref={forwardedRef}
        className={cx(
          // base
          "relative z-50 overflow-hidden rounded-md border shadow-xl shadow-black/[2.5%]",
          // widths
          "min-w-[calc(var(--radix-select-trigger-width)-2px)] max-w-[95vw]",
          // heights
          "max-h-[--radix-select-content-available-height]",
          // background color
          "bg-white",
          // text color
          "text-zinc-900",
          // border color
          "border-zinc-200",
          // transition
          "will-change-[transform,opacity]",
          // "data-[state=open]:animate-slideDownAndFade",
          "data-[state=closed]:animate-hide",
          "data-[side=bottom]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=right]:animate-slideRightAndFade data-[side=top]:animate-slideUpAndFade",
          className,
        )}
        sideOffset={sideOffset}
        position={position}
        collisionPadding={collisionPadding}
        onPointerDownOutside={(e) => e.preventDefault()}
        {...props}
      >
        <SearchSelectScrollUpButton />
        <SelectPrimitives.Viewport
          className={cx(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[calc(var(--radix-select-trigger-width))]",
          )}
        >
          {children}
        </SelectPrimitives.Viewport>
        <SearchSelectScrollDownButton />
      </SelectPrimitives.Content>
    </SelectPrimitives.Portal>
  ),
)

SearchSelectContent.displayName = "SearchSelectContent"

const SearchSelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.Label
    ref={forwardedRef}
    className={cx(
      // base
      "px-3 py-2 text-xs font-medium tracking-wide",
      // text color
      "text-zinc-500",
      className,
    )}
    {...props}
  />
))

SearchSelectGroupLabel.displayName = "SearchSelectGroupLabel"

const SearchSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitives.Item
      ref={forwardedRef}
      className={cx(
        // base
        "grid cursor-pointer grid-cols-[1fr_20px] gap-x-2 rounded px-3 py-2 outline-none transition-colors data-[state=checked]:font-semibold sm:text-sm",
        // text color
        "text-zinc-900",
        // disabled
        "data-[disabled]:pointer-events-none data-[disabled]:text-zinc-400 data-[disabled]:hover:bg-none",
        // focus
        "focus-visible:bg-zinc-100",
        // hover
        "hover:bg-zinc-100",
        className,
      )}
      {...props}
    >
      <SelectPrimitives.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitives.ItemText>
      <SelectPrimitives.ItemIndicator>
        <RiCheckLine
          className="size-5 shrink-0 text-zinc-800"
          aria-hidden="true"
        />
      </SelectPrimitives.ItemIndicator>
    </SelectPrimitives.Item>
  )
})

SearchSelectItem.displayName = "SearchSelectItem"

const SearchSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.Separator
    ref={forwardedRef}
    className={cx(
      // base
      "-mx-1 my-1 h-px",
      // background color
      "bg-zinc-300",
      className,
    )}
    {...props}
  />
))

SearchSelectSeparator.displayName = "SearchSelectSeparator"

export { 
  SearchSelect, 
  SearchSelectGroup, 
  SearchSelectValue, 
  SearchSelectInput, 
  SearchSelectTrigger, 
  SearchSelectContent, 
  SearchSelectItem 
}