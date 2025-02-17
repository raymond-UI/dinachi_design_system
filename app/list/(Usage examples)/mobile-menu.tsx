import React, { useState } from "react";
import { useGesture } from "@use-gesture/react";
import {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  ListGroup,
  ListGroupTitle,
} from "@/registry/list/list";
import {
  Mail,
  Trash2,
  Archive,
  Star,
  Menu,
  ChevronRight,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react";

interface Email {
  id: number;
  subject: string;
  preview: string;
  isStarred: boolean;
  unread: boolean;
}

export default function MobileMenu() {
  const menuItems = [
    { id: 1, icon: <Mail />, label: "Inbox" },
    { id: 2, icon: <Star />, label: "Starred" },
    { id: 3, icon: <Trash2 />, label: "Trash" },
    { id: 4, icon: <Archive />, label: "Archive" },
    { id: 5, icon: <Bell />, label: "Notifications" },
    { id: 6, icon: <Settings />, label: "Settings" },
    { id: 7, icon: <HelpCircle />, label: "Help" },
  ];
  const [selectedMenuItem, setSelectedMenuItem] = useState<number | null>(null);

  return (
    <div className=" min-h-80 bg-secondary flex items-center flex-col  p-2 pb-4 w-full">
      <div className="flex w-full h-4 items-center justify-between mb-4 bg-black/10 rounded-full overflow-clip"></div>
      <div
        className="
         h-full w-64 bg-card shadow-lg p-4 rounded"
      >
          <List aria-label="Mobile Menu" listRole="menu" 
          isInteractive
          className="space-y-2">
            {menuItems.map((item) => (
              <ListItem className=" "
              leading={item.icon}
                key={item.id}
                variant={"interactive"}
                size={"md"}
                selected={item.id === selectedMenuItem}
                onClick={() => setSelectedMenuItem(item.id)}
              >
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemContent>{item.label}</ListItemContent>

              </ListItem>
            ))}
          </List>
      </div>
    </div>
  );
}
