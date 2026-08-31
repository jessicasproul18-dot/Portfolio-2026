// Tremor Popover [v0.0.3]

import React, { useEffect } from "react"
import { Slot } from "@radix-ui/react-slot"
import * as PopoverPrimitives from "@radix-ui/react-popover"

import { cx } from "@/lib/utils"
import { Input } from "./Input"
import { useSearchSelect } from "@/lib/useSearchSelect"

interface SearchSelectProps 
  extends React.ComponentPropsWithoutRef<"input">, 
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Root> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SearchSelect = ({ 
  children, 
  onValueChange,
  ...props 
}: SearchSelectProps) => {
  const { isOpen, selected } = useSearchSelect();

  useEffect(() => {
    if (selected) {
      onValueChange?.(selected.value);
    }
  }, [selected, onValueChange]);

  return (
    <PopoverPrimitives.Root {...props} open={isOpen}>
      {children}
    </PopoverPrimitives.Root>
)}

SearchSelect.displayName = "SearchSelect"

const SearchSelectTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Trigger>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Trigger ref={forwardedRef} {...props} />
})

interface SearchSelectValueProps extends React.ComponentPropsWithoutRef<"input"> {
  // Additional props can be added here if needed
  className?: string;
}

const SearchSelectValue = React.forwardRef<HTMLInputElement, SearchSelectValueProps>(
({ className, ...props }, forwardedRef) => {
  return(
    <Input 
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
)})

SearchSelectValue.displayName = "SearchSelectValue"

SearchSelectTrigger.displayName = "SearchSelectTrigger"

interface SearchSelectInputProps extends React.ComponentPropsWithoutRef<"input"> {
  value?:string;
  onValueChange?: (value: string) => void;
  placeholder?:string;
}

const SearchSelectInput = React.forwardRef<HTMLInputElement, SearchSelectInputProps>(
  ({ className, placeholder, value, onValueChange, ...props }, forwardedRef) => {
    const { selected, setIsOpen, setSelected } = useSearchSelect();
    const [inputValue, setInputValue] = React.useState(value || "");

    // Update input when selected changes
    React.useEffect(() => {
      if (selected) {
        setInputValue(selected.title);
      }
    }, [selected]);

    const handleInput = (val: string) => {
      onValueChange?.(val);
      setInputValue(val);
      setIsOpen(val.length > 0);

      // Only clear selection if the value doesn't match selected
      if (selected && val !== selected.title) {
        setSelected(null);
      }
    };
        
    return (
      <>
        <PopoverPrimitives.Trigger asChild>
          <Input
              ref={forwardedRef}
              placeholder={ placeholder ?? "Search" }
              id="location"
              name="location"
              type="search"
              value={inputValue}
              autoComplete="off"
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const firstItem = document.querySelector('[data-search-select-item]');
                  if (firstItem instanceof HTMLElement) {
                    firstItem.focus();
                  }
                }
              }}
              className={cx(
                // base
                className,
              )}
              data-search-select-input
              {...props}
              />
          </PopoverPrimitives.Trigger>
      </>
    )
})
SearchSelectInput.displayName = "SearchSelectInput"

const SearchSelectAnchor = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Anchor>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Anchor>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Anchor ref={forwardedRef} {...props} />
})

SearchSelectAnchor.displayName = "SearchSelectAnchor"

const SearchSelectClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Close>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Close ref={forwardedRef} {...props} />
})

SearchSelectClose.displayName = "SearchSelectClose"

type ContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitives.Content
>

const SearchSelectContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Content>,
  ContentProps
>(
  (
    {
      className,
      sideOffset = 0,
      side = "bottom",
      align = "start",
      collisionPadding,
      avoidCollisions = true,
      ...props
    }: ContentProps,
    forwardedRef,
  ) => {
    const { setIsOpen } = useSearchSelect();
    
    return (
      <>
        <PopoverPrimitives.Portal>
          <PopoverPrimitives.Content
            ref={forwardedRef}
            sideOffset={sideOffset}
            side={side}
            align={align}
            collisionPadding={collisionPadding}
            avoidCollisions={avoidCollisions}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={() => setIsOpen(false)}
            onFocusOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className={cx(
              // base
              "max-h-[var(--radix-popper-available-height)] min-w-60 overflow-hidden rounded-md border p-2.5 text-sm shadow-md",
              // border color
              "border-gray-200 dark:border-gray-200",
              // text color
              "text-gray-900 dark:text-gray-900",
              // background color
              "bg-white dark:bg-white",
              // transition
              "will-change-[transform,opacity]",
              "data-[state=closed]:animate-hide",
              "data-[state=open]:data-[side=bottom]:animate-slide-down-and-fade data-[state=open]:data-[side=left]:animate-slide-left-and-fade data-[state=open]:data-[side=right]:animate-slide-right-and-fade data-[state=open]:data-[side=top]:animate-slide-up-and-fade",

              className,
            )}
            tremor-id="tremor-raw"
            // https://github.com/radix-ui/primitives/issues/1159
            onWheel={(event) => {
              event.stopPropagation()
              const isScrollingDown = event.deltaY > 0
              if (isScrollingDown) {
                event.currentTarget.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "ArrowDown" }),
                )
              } else {
                event.currentTarget.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "ArrowUp" }),
                )
              }
            }}
            {...props}
          />
        </PopoverPrimitives.Portal>
      </>
    )
  },
)
SearchSelectContent.displayName = "SearchSelectContent"

interface SearchSelectItemProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
  value: string | number;
  title: string;
}

const SearchSelectItem = React.forwardRef<HTMLDivElement, SearchSelectItemProps>(
  ({ className, title, asChild, value, ...props }, forwardedRef) => {
    const { setSelected, setIsOpen } = useSearchSelect();

    const Component = asChild ? Slot : "div"

    const handleSelect = () => {   
      setSelected({
        title: title,
        value: String(value),
      });
      setIsOpen(false);   
      // Focus the input
      const input = document.querySelector('input[data-search-select-input]') as HTMLInputElement | null;
      input?.focus();
    }
    return (
      <Component
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
        onClick={() => handleSelect()}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
            next?.focus();
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = (e.currentTarget as HTMLElement).previousElementSibling as HTMLElement | null;
            prev?.focus();
          }

          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelect();
          }
        }}
        tabIndex={-1}
        data-search-select-item
      >
          {title}
      </Component>
    )
})

SearchSelectItem.displayName = "SearchSelectItem"

export { 
  SearchSelect, 
  SearchSelectAnchor, 
  SearchSelectClose, 
  SearchSelectContent, 
  SearchSelectItem, 
  SearchSelectTrigger,
  SearchSelectValue,
  SearchSelectInput,
}