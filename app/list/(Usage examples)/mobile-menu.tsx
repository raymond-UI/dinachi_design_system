import React, { useState } from "react";
import { useGesture } from "@use-gesture/react";
import {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  ListGroup,
  ListGroupTitle,
  ListItemIcon,
} from "@/components/custom/list";
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
    <div className=" min-h-80 bg-gray-100 flex flex-col  p-2">
      <div className="flex w-full h-4 items-center justify-between mb-4 bg-black/10 rounded-full overflow-clip"></div>
      {/* Sliding Menu */}
      <div
        className="
         h-full w-64 bg-white shadow-lg"
      >
        <div className="p-4">
          <List>
            {menuItems.map((item) => (
              <ListItem
              variant={"striped"}
                key={item.id}
                selected={item.id === selectedMenuItem}
                onClick={() => setSelectedMenuItem(item.id)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemContent>{item.label}</ListItemContent>
                <ListItemAction>
                  <ChevronRight className="h-4 w-4" />
                </ListItemAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
