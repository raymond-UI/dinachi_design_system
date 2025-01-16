"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Enhanced context to include density and layout properties
interface ListContextValue {
  variant: "default" | undefined;
  listRole?: "list" | "listbox" | "menu";
  isInteractive?: boolean;
  density?: "compact" | "comfortable" | "default";
  layout?: "vertical" | "horizontal" | "grid";
}

const ListContext = React.createContext<ListContextValue>({
  variant: undefined,
  listRole: "list",
  isInteractive: false,
  density: "default",
  layout: "vertical",
});

// Enhanced list variants with grid support and density controls
const listVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
    },
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row flex-wrap",
      grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
    },
    density: {
      compact: "gap-1",
      comfortable: "gap-4",
      default: "gap-2",
    },
    divider: {
      none: "",
      full: "divide-y divide-border",
      inset: "divide-y divide-border [&>*]:pl-4",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "vertical",
    density: "default",
    divider: "none",
  },
});

interface ListProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'aria-label'>,
    VariantProps<typeof listVariants> {
  'aria-label': string;
  listRole?: "list" | "listbox" | "menu";
  orientation?: "horizontal" | "vertical";
  isInteractive?: boolean;
  density?: "compact" | "comfortable" | "default";
  layout?: "vertical" | "horizontal" | "grid";
  gridColumns?: number;
  divider?: "none" | "full" | "inset";
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      variant,
      listRole = "list",
      orientation = "vertical",
      isInteractive = false,
      density = "default",
      layout = "vertical",
      gridColumns,
      divider = "none",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const ariaProps = listRole === "list" 
      ? { "aria-label": ariaLabel }
      : { 
          "aria-orientation": orientation,
          "aria-label": ariaLabel
        };

    // Custom grid columns style if specified
    const gridStyle = gridColumns
      ? { 
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          display: 'grid'
        }
      : {};

    return (
      <ListContext.Provider
        value={{ 
          variant: variant ?? "default", 
          listRole, 
          isInteractive,
          density,
          layout 
        }}
      >
        <ul
          ref={ref}
          role={listRole}
          {...ariaProps}
          className={cn(
            listVariants({ variant, layout, density, divider }), 
            className
          )}
          style={gridStyle}
          {...props}
        />
      </ListContext.Provider>
    );
  }
);
List.displayName = "List";

// Enhanced list item variants with density support
const listItemVariants = cva(
  "flex items-center justify-between w-full text-base transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded mb-2 last:mb-0 px-1",
  {
    variants: {
      variant: {
        default: "",
        bordered: "py-2 border-b border-border last:border-none rounded-none",
        interactive: "transition-colors duration-200 ease-in-out hover:bg-accent cursor-pointer active:text-primary",
        striped: "odd:bg-muted/50 even:bg-none",
      },
      size: {
        default: "",
        sm: "p-2 text-sm",
        md: "p-2 text-lg",
        lg: "p-2 text-xl",
      },
      density: {
        compact: "py-1 px-2",
        comfortable: "py-3 px-4",
        default: "py-2 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      density: "default",
    },
  }
);

interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  disabled?: boolean;
  selected?: boolean;
  index?: number;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, size, density, disabled, selected, onClick, index, ...props }, ref) => {
    const { listRole, isInteractive, density: contextDensity } = React.useContext(ListContext);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (disabled) return;
      if (isInteractive && onClick && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLLIElement>);
      }
    };

    return (
      <li
        ref={ref}
        role={listRole === "listbox" ? "option" : listRole === "menu" ? "menuitem" : undefined}
        aria-disabled={disabled}
        aria-selected={listRole === "listbox" ? selected : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          listItemVariants({ 
            variant: variant === 'striped' && (index ?? 0) % 2 === 0 ? 'striped' : variant, 
            size,
            density: density || contextDensity 
          }),
          selected && "bg-primary/5 text-primary",
          isFocused && "outline-1 outline-offset-1 outline-focus text-primary",
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
    className={cn(
      "flex items-center justify-start mr-2 h-4 w-4 shrink-0",
      className
    )}
    {...props}
  />
));
ListItemIcon.displayName = "ListItemIcon";

interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ children, className, ...props }, ref) => {
    const isSimpleText = React.Children.toArray(children).every(
      (child) => typeof child === "string"
    );

    const Wrapper = isSimpleText ? "p" : "div";

    return (
      <Wrapper
        ref={ref}
        className={cn("flex flex-grow text-wrap truncate gap-1", className)}
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

interface ListGroupProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listGroupVariants> {
  "aria-label"?: string;
}

const ListGroup = React.forwardRef<HTMLElement, ListGroupProps>(
  ({ className, variant, "aria-label": ariaLabel, children, ...props }, ref) => {
    const listContext = React.useContext(ListContext);
    
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
          className="list-none flex flex-col items-start w-full"
        >
          {titleElement}
          <ul 
            className={cn("w-full", listGroupVariants({ variant }), className)}
            aria-label={ariaLabel}
          >
            {items}
          </ul>
        </li>
      );
    }

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
        text: "text-sm",
      },
      md: {
        icon: "h-4 w-4",
        text: "text-base",
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
          "flex items-center justify-center space-x-1",
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
        )}
        <span className={sizeClasses[size].text}>{props.children}</span>
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
