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

// Enhanced Context to share list properties
interface ListContextValue {
  variant: "default" | undefined;
  listRole?: "list" | "listbox" | "menu";
  isInteractive?: boolean;
  titleId?: string;
  descriptionId?: string;
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
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'aria-label'> {
  'aria-label': string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  listRole?: "list" | "listbox" | "menu";
  orientation?: "horizontal" | "vertical";
  isInteractive?: boolean;
  description?: string;
  variant?: "default";
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({
    className,
    variant,
    listRole = "list",
    orientation = "vertical",
    isInteractive = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    description,
    ...props
  }, ref) => {
    const titleId = React.useId();
    const descriptionId = React.useId();

    const ariaProps = {
      ...(listRole === "list" ? {} : { "aria-orientation": orientation }),
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      ...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}),
      ...(description || ariaDescribedBy ? { 
        "aria-describedby": ariaDescribedBy || descriptionId 
      } : {})
    };

    return (
      <ListContext.Provider value={{ 
        variant: variant ?? "default",
        listRole,
        isInteractive,
        titleId,
        descriptionId
      }}>
        {description && (
          <div id={descriptionId} className="sr-only">
            {description}
          </div>
        )}
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

interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  disabled?: boolean;
  selected?: boolean;
  leading?: React.ReactNode;
  size?: SizeType;
  description?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
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
    description,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    children,
    ...props 
  }, ref) => {
    const { listRole, isInteractive } = React.useContext(ListContext);
    const [isFocused, setIsFocused] = React.useState(false);
    const descriptionId = React.useId();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (!disabled && isInteractive && onClick && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLLIElement>);
      }
    };

    return (
      <>
        {description && (
          <div id={descriptionId} className="sr-only">
            {description}
          </div>
        )}
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
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy || (description ? descriptionId : undefined)}
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
      </>
    );
  }
);
ListItem.displayName = "ListItem";

interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ children, className, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
    const isSimpleText = React.Children.toArray(children).every(
      (child) => typeof child === "string"
    );

    const Wrapper = isSimpleText ? "p" : "div";

    return (
      <Wrapper
        ref={ref}
        aria-labelledby={ariaLabelledBy}
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
  "aria-label"?: string;
}

const ListItemAction = React.forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ className, size = "md", "aria-label": ariaLabel, ...props }, ref) => (
    <div
      ref={ref}
      aria-label={ariaLabel}
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
  "aria-labelledby"?: string;
  description?: string;
}

const ListGroup = React.forwardRef<HTMLElement, ListGroupProps>(
  ({ 
    className, 
    variant, 
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    children, 
    ...props 
  }, ref) => {
    const listContext = React.useContext(ListContext);
    const descriptionId = React.useId();
    
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
          {description && (
            <div id={descriptionId} className="sr-only">
              {description}
            </div>
          )}
          {titleElement}
          <ul 
            className={cn("w-full", listGroupVariants({ variant }), className)}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={description ? descriptionId : undefined}
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
        aria-labelledby={ariaLabelledBy}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(listGroupVariants({ variant }), className)}
        {...props}
      >
        {description && (
          <div id={descriptionId} className="sr-only">
            {description}
          </div>
        )}
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
  description?: string;
}

const ListGroupTitle = React.forwardRef<HTMLDivElement, ListGroupTitleProps>(
  ({ className, variant, icon, size = "md", description, children, ...props }, ref) => {
    const descriptionId = React.useId();
    const titleId = React.useId();

    return (
      <>
        {description && (
          <div id={descriptionId} className="sr-only">
            {description}
          </div>
        )}
        <div
          ref={ref}
          id={titleId}
          aria-describedby={description ? descriptionId : undefined}
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
      </>
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