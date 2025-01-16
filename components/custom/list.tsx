"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Context to share list properties
interface ListContextValue {
  variant: "default" | undefined;
  listRole?: "list" | "listbox" | "menu";
  isInteractive?: boolean;
}

const ListContext = React.createContext<ListContextValue>({
  variant: undefined,
  listRole: "list",
  isInteractive: false,
});

// Enhanced list variants with better spacing and styling options
const listVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
    },

  },
  defaultVariants: {
    variant: "default",
  },
});



interface ListProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'aria-label'>,
    VariantProps<typeof listVariants> {
  /**
   * Required ARIA label for the list
   */
  'aria-label': string;
  /** Role of the list element */
  listRole?: "list" | "listbox" | "menu";
  /** Orientation of the list items */
  orientation?: "horizontal" | "vertical";
  /** Whether the list items are interactive */
  isInteractive?: boolean;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      variant,
      listRole = "list",
      orientation = "vertical",
      isInteractive = false,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    // Only include aria-orientation for listbox and menu roles
    const ariaProps = listRole === "list" 
      ? { "aria-label": ariaLabel }
      : { 
          "aria-orientation": orientation,
          "aria-label": ariaLabel
        };

    return (
      <ListContext.Provider
        value={{ variant: variant ?? "default", listRole, isInteractive }}
      >
        <ul
          ref={ref}
          role={listRole}
          {...ariaProps}
          className={cn(listVariants({ variant }), className)}
          {...props}
        />
      </ListContext.Provider>
    );
  }
);
List.displayName = "List";


// Enhanced list item variants with improved interaction states
const listItemVariants = cva(
  "flex items-center justify-between  w-full text-base transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded mb-2 last:mb-0 px-1",
  {
    variants: {
      variant: {
        default: "",
        bordered: "py-1 px-1 border-b border-dashed last:border-none rounded-none",
        interactive:
          "transition-colors duration-200 ease-in-out hover:bg-accent  cursor-pointer active:text-primary",
        striped: "odd:bg-muted/50 even:bg-none",
        
      },
      size: {
        default: "",
        sm: "p-2 text-sm",
        md: "p-2 text-lg",
        lg: "p-2 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const ListItemContext = React.createContext<{ size?: string }>({});

interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  disabled?: boolean;
  selected?: boolean;
  index?: number;
  size?:  "sm" | "md" | "lg";
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, size, disabled, selected, onClick, index, ...props }, ref) => {
    const { listRole, isInteractive } = React.useContext(ListContext);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (disabled) return;
      if (
        isInteractive &&
        onClick &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLLIElement>);
      }
    };

    return (
      <ListItemContext.Provider value={{ size }}>
        <li
          ref={ref}
          role={
            listRole === "listbox"
              ? "option"
              : listRole === "menu"
              ? "menuitem"
              : undefined
          }
          aria-disabled={disabled}
          aria-selected={listRole === "listbox" ? selected : undefined}
          tabIndex={isInteractive && !disabled ? 0 : undefined}
          onClick={disabled ? undefined : onClick}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            listItemVariants({ variant, size }),
            selected && "bg-primary/5  text-primary",
            isFocused && "outline-1 outline-offset-1 outline-focus text-primary",
            className
          )}
          {...props}
        />
      </ListItemContext.Provider>
    );
  }
);

ListItem.displayName = "ListItem";

const ListItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, "aria-hidden": ariaHidden = true, ...props }, ref) => {
    const { size } = React.useContext(ListItemContext);

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    return (
      <div
        ref={ref}
        aria-hidden={ariaHidden}
        className={cn("flex items-center justify-start mr-2 shrink-0", sizeClasses[size as "sm" | "md" | "lg"] || sizeClasses['md'], className)}
        {...props}
      />
    );
  }
);

ListItemIcon.displayName = "ListItemIcon";

interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ children, className, ...props }, ref) => {
    // Check if the children are a plain string or an array of strings
    const isSimpleText = React.Children.toArray(children).every(
      (child) => typeof child === "string"
    );

    // Choose the appropriate element
    const Wrapper = isSimpleText ? "p" : "div";

    return (
      <Wrapper
        ref={ref}
        className={cn(" flex flex-grow text-wrap truncate gap-1", className)}
        {...props}
      >
        {children}
      </Wrapper>
    );
  }
);
ListItemContent.displayName = "ListItemContent";

const ListItemAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-2 flex items-center", className)}
    {...props}
  />
));
ListItemAction.displayName = "ListItemAction";

const listGroupVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "items-start",
      compact: "items-start",
      spaced: "items-start space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Update the props interface to be generic
interface ListGroupProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listGroupVariants> {
  "aria-label"?: string;
}

const ListGroup = React.forwardRef<HTMLElement, ListGroupProps>(
  ({ className, variant, "aria-label": ariaLabel, children, ...props }, ref) => {
    const listContext = React.useContext(ListContext);
    
    // Separate title and items
    const childrenArray = React.Children.toArray(children);
    const titleElement = childrenArray.find(
      child => React.isValidElement(child) && child.type === ListGroupTitle
    );
    const items = childrenArray.filter(
      child => React.isValidElement(child) && child.type === ListItem
    );
    
    if (listContext.listRole === "list") {
      return (
        <li
          ref={ref as React.Ref<HTMLLIElement>}
          className="Groupwrapper list-none flex flex-col items-start w-full px-1"
        >
          {titleElement}
          <ul 
            className={cn(" w-full", listGroupVariants({ variant }), className)}
            aria-label={ariaLabel}
          >
            {items}
          </ul>
        </li>
      );
    }

    // If not inside a List, keep original behavior
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="group"
        aria-label={ariaLabel}
        className={cn(listGroupVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ListGroup.displayName = "ListGroup";

const listGroupTitleVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-3 mb-1",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary",
        accent: "text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ListGroupTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listGroupTitleVariants> {
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const ListGroupTitle = React.forwardRef<HTMLDivElement, ListGroupTitleProps>(
  ({ className, variant, icon, size = "sm", ...props }, ref) => {
    const sizeClasses = {
      sm: {
        icon: "h-3 w-3 ",
        text: "text-sm", // Smaller text size
      },
      md: {
        icon: "h-4 w-4", // Default icon size
        text: "text-base", // Default text size
      },
      lg: {
        icon: "h-6 w-6",
        text: "text-lg",
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center space-x-1 ",
          listGroupTitleVariants({ variant }),
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={`${sizeClasses[size].icon} flex items-center justify-center`}
          >
            {icon}
          </div>
        )}{" "}
        {/* Apply icon size */}
        <span className={sizeClasses[size].text}>{props.children}</span>{" "}
        {/* Apply text size */}
      </div>
    );
  }
);
ListGroupTitle.displayName = "ListGroupTitle";
export {
  List,
  ListItem,
  ListItemIcon,
  ListItemContent,
  ListItemAction,
  ListGroup,
  ListGroupTitle,
  type ListProps,
  type ListItemProps,
};
