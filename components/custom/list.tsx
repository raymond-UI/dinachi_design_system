"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Context to share list properties
interface ListContextValue {
  variant: "default" | "bordered" | "hoverable" | undefined;
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
      default: "space-y-3",
      bordered:
        "rounded-lg border bg-card text-card-foreground shadow-sm divide-y divide-border",
      hoverable: "space-y-3",
    },
    size: {
      default: "",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Enhanced list item variants with improved interaction states
const listItemVariants = cva(
  "flex items-center justify-between w-full p-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        bordered: "py-2",
        hoverable:
          "hover:bg-accent focus:outline focus:outline-offset-1 focus:outline-foreground cursor-pointer hover:border hover:text-accent-foreground rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  listRole?: "list" | "listbox" | "menu";
  orientation?: "horizontal" | "vertical";
  isInteractive?: boolean;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      variant,
      size,
      listRole = "list",
      orientation = "vertical",
      isInteractive = false,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <ListContext.Provider
        value={{ variant: variant ?? "default", listRole, isInteractive }}
      >
        <ul
          ref={ref}
          role={listRole}
          aria-orientation={orientation}
          aria-label={ariaLabel}
          className={cn(listVariants({ variant, size }), className)}
          {...props}
        />
      </ListContext.Provider>
    );
  }
);
List.displayName = "List";

interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  disabled?: boolean;
  selected?: boolean;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, disabled, selected, onClick, ...props }, ref) => {
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
          listItemVariants({ variant }),
          selected && "bg-accent text-accent-foreground",
          isFocused && "outline-2 outline-offset-2 outline-focus",
          className
        )}
        {...props}
      />
    );
  }
);
ListItem.displayName = "ListItem";

const ListItemIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, "aria-hidden": ariaHidden = true, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden={ariaHidden}
    className={cn("flex items-center justify-start mr-2 h-4 w-4 shrink-0", className)}
    {...props}
  />
));
ListItemIcon.displayName = "ListItemIcon";

const ListItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-x-1 flex flex-grow truncate", className)}
    {...props}
  />
));
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
      default: "items-start space-y-1",
      compact: "items-start",
      spaced: "items-start space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ListGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listGroupVariants> {
  "aria-label"?: string;
}

const ListGroup = React.forwardRef<HTMLDivElement, ListGroupProps>(
  ({ className, variant, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn(listGroupVariants({ variant }), className)}
        {...props}
      />
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
  ({ className, variant, icon, size = "md", ...props }, ref) => {
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
        className={cn("flex items-center justify-center space-x-1 ", listGroupTitleVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className={`${sizeClasses[size].icon} flex items-center justify-center`}>{icon}</span>} {/* Apply icon size */}
        <span className={sizeClasses[size].text}>{props.children}</span> {/* Apply text size */}
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
