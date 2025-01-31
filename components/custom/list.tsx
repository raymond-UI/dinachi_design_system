"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Centralized size configuration
const sizeConfig = {
  sm: {
    item: "p-2 text-sm",
    leading: "h-4 w-4 mr-2",
    action: "h-4 w-4",
    groupTitle: "text-sm",
    groupTitleIcon: "h-3 w-3",
  },
  md: {
    item: "p-2 text-base",
    leading: "h-5 w-5 mr-2",
    action: "h-5 w-5",
    groupTitle: "text-base",
    groupTitleIcon: "h-4 w-4",
  },
  lg: {
    item: "p-3 text-lg",
    leading: "h-6 w-6 mr-3",
    action: "h-6 w-6",
    groupTitle: "text-lg",
    groupTitleIcon: "h-5 w-5",
  },
} as const;

type SizeType = keyof typeof sizeConfig;

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
  'aria-label': string;
  listRole?: "list" | "listbox" | "menu";
  orientation?: "horizontal" | "vertical";
  isInteractive?: boolean;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({
    className,
    variant,
    listRole = "list",
    orientation = "vertical",
    isInteractive = false,
    "aria-label": ariaLabel,
    ...props
  }, ref) => {
    const ariaProps = listRole === "list" 
      ? { "aria-label": ariaLabel }
      : { 
          "aria-orientation": orientation,
          "aria-label": ariaLabel
        };

    return (
      <ListContext.Provider value={{ variant: variant ?? "default", listRole, isInteractive }}>
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

const listItemVariants = cva(
  "flex items-center justify-between w-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded mb-2 last:mb-0",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border-b border-dashed last:border-none rounded-none",
        interactive: "transition-colors duration-200 ease-in-out hover:bg-accent cursor-pointer active:text-primary",
        striped: "odd:bg-muted/50 even:bg-none",
      },
      size: {
        sm: sizeConfig.sm.item,
        md: sizeConfig.md.item,
        lg: sizeConfig.lg.item,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const ListItemContext = React.createContext<{ size?: SizeType }>({});

interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  disabled?: boolean;
  selected?: boolean;
  leading?: React.ReactNode;
  size?: SizeType;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ 
    className,
    variant,
    size = "md",
    disabled,
    selected,
    leading,
    onClick,
    children,
    ...props 
  }, ref) => {
    const { listRole, isInteractive } = React.useContext(ListContext);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (disabled) return;
      if (isInteractive && onClick && (event.key === "Enter" || event.key === " ")) {
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
            selected && "bg-primary/5 text-primary",
            isFocused && "outline-1 outline-offset-1 outline-focus text-primary",
            className
          )}
          {...props}
        >
          {leading && (
            <div
              className={cn(
                "flex items-center justify-center shrink-0",
                sizeConfig[size].leading
              )}
            >
              {leading}
            </div>
          )}
          {children}
        </li>
      </ListItemContext.Provider>
    );
  }
);
ListItem.displayName = "ListItem";

interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ children, className, ...props }, ref) => {
    // Check if the children are a plain string or an array of strings
    const isSimpleText = React.Children.toArray(children).every(
      (child) => typeof child === "string"
    );

    // Choose the appropriate element based on content type
    const Wrapper = isSimpleText ? "p" : "div";

    return (
      <Wrapper
        ref={ref}
        className={cn("flex-grow min-w-0 flex text-wrap truncate gap-1", className)}
        {...props}
      >
        {children}
      </Wrapper>
    );
  }
);
ListItemContent.displayName = "ListItemContent";

interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizeType;
}

const ListItemAction = React.forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ml-2 flex items-center",
        sizeConfig[size].action,
        className
      )}
      {...props}
    />
  )
);
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
          className="list-none flex flex-col items-start w-full px-1"
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

interface ListGroupTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listGroupTitleVariants> {
  icon?: React.ReactNode;
  size?: SizeType;
}

const ListGroupTitle = React.forwardRef<HTMLDivElement, ListGroupTitleProps>(
  ({ className, variant, icon, size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center space-x-1",
          listGroupTitleVariants({ variant }),
          sizeConfig[size].groupTitle,
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn(
            "flex items-center justify-center",
            sizeConfig[size].groupTitleIcon
          )}>
            {icon}
          </div>
        )}
        <span>{children}</span>
      </div>
    );
  }
);
ListGroupTitle.displayName = "ListGroupTitle";

export {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  ListGroup,
  ListGroupTitle,
  type ListProps,
  type ListItemProps,
  type ListItemActionProps,
  type ListGroupProps,
  type ListGroupTitleProps,
  type SizeType,
};