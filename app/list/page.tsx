"use client";
import {
  List,
  ListGroup,
  ListGroupTitle,
  ListItem,
  ListItemAction,
  // ListItemIcon,
  ListItemContent,
} from "@/registry/list/list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Archive,
  Bell,
  Calendar,
  Check,
  Clock,
  FileText,
  Flag,
  FolderClosed,
  Home,
  Inbox,
  InboxIcon,
  Plus,
  ReceiptIcon,
  Settings,
  Star,
  Tags,
  Trash2,
  Users
} from "lucide-react";
import { useState } from "react";
import AuditLog from "./(Usage examples)/audit-logs";
import AuditSystem from "./(Usage examples)/audit-system";
import ComplexPermissions from "./(Usage examples)/complex-permissions";
import ComplianceTracking from "./(Usage examples)/compliance-tracking";
import MobileMenu from "./(Usage examples)/mobile-menu";
import MultiTenantInterface from "./(Usage examples)/multi-tenant";
import PermissionManagement from "./(Usage examples)/permission-management";
import ResourceAllocation from "./(Usage examples)/resource-allocation";
import ResourceManagement from "./(Usage examples)/resource-management";
import UserManagement from "./(Usage examples)/user-management";

const ListDemo = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-3xl space-y-8 p-1 ">
      {/* Basic List with Groups */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Grouped List</h2>
        <List aria-label="Grouped List">
          <ListGroup>
            <ListGroupTitle
              variant="primary"
              icon={<InboxIcon className="" />}
              size="lg"
            >
              Inbox
            </ListGroupTitle>
            <ListItem size="lg" leading={<Inbox />}>
              {/* <ListItemIcon>
                <Inbox className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Primary</ListItemContent>
              <ListItemAction>
                <Badge>23</Badge>
              </ListItemAction>
            </ListItem>
            <ListItem leading={<Star />}>
{/*               <ListItemIcon>
                <Star className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Starred</ListItemContent>
            </ListItem>
          </ListGroup>

          <ListGroup>
            <ListGroupTitle variant="accent">Categories</ListGroupTitle>
            <ListItem leading={<Tags />}>
              {/* <ListItemIcon>
                <Tags className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Personal</ListItemContent>
            </ListItem>
            <ListItem leading={<Users />}>
              {/* <ListItemIcon>
                <Users className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Team</ListItemContent>
            </ListItem>
          </ListGroup>
        </List>
      </section>

      {/* Interactive Grouped List */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Interactive Grouped List</h2>
        <List listRole="listbox" isInteractive aria-label="Select a label" description="This is a description of the list"
        >
          <ListGroup variant="spaced">
            <ListGroupTitle icon={<ReceiptIcon />} size="md">
              Recent
            </ListGroupTitle>
            {[
              { id: "today", icon: Clock, label: "Today" },
              { id: "calendar", icon: Calendar, label: "Calendar" },
              { id: "archive", icon: Archive, label: "Archive" },
            ].map((item) => (
              <ListItem
              leading={<item.icon />}
                key={item.id}
                variant="interactive"
                size="sm"
                description="This is a description"
                selected={selectedItems.includes(item.id)}
                onClick={() => toggleSelection(item.id)}
              >
                {/* <ListItemIcon>
                  <item.icon />
                </ListItemIcon> */}
                <ListItemContent>{item.label}</ListItemContent>
                {selectedItems.includes(item.id) && (
                  <ListItemAction>
                    <Check className="h-4 w-4" />
                  </ListItemAction>
                )}
              </ListItem>
            ))}
          </ListGroup>

          <ListGroup variant="spaced">
            <ListGroupTitle>Folders</ListGroupTitle>
            {[
              { id: "documents", icon: FileText, label: "Documents" },
              { id: "projects", icon: FolderClosed, label: "Projects" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <ListItem
               leading={<item.icon />}
                key={item.id}
                variant="interactive"
                selected={selectedItems.includes(item.id)}
                onClick={() => toggleSelection(item.id)}
              >
                {/* <ListItemIcon> */}
                  {/* <item.icon className="h-4 w-4" /> */}
                {/* </ListItemIcon> */}
                <ListItemContent>{item.label}</ListItemContent>
                {selectedItems.includes(item.id) && (
                  <ListItemAction>
                    <Check className="h-4 w-4" />
                  </ListItemAction>
                )}
              </ListItem>
            ))}
          </ListGroup>
        </List>
      </section>

      {/* Complex List with Groups and Actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          Complex Grouped List with Actions
        </h2>
        <List aria-label="Complex Grouped List with Actions"  >
          <ListGroup>
            <ListGroupTitle>Priority Tasks</ListGroupTitle>
            {[
              {
                id: "high",
                icon: Flag,
                label: "High Priority",
                count: 3,
                color: "text-red-500",
              },
              {
                id: "medium",
                icon: Flag,
                label: "Medium Priority",
                count: 5,
                color: "text-yellow-500",
              },
              {
                id: "low",
                icon: Flag,
                label: "Low Priority",
                count: 8,
                color: "text-green-500",
              },
            ].map((item) => (
              <ListItem key={item.id} className="group" leading={<item.icon  className={item.color}/>}>
                {/* <ListItemIcon className={item.color}>
                  <item.icon />
                </ListItemIcon> */}
                <ListItemContent className="flex items-center">
                  <div className="font-medium">{item.label}</div>
                  <p className="text-xs text-muted-foreground">
                    {item.count} tasks pending
                  </p>
                </ListItemContent>
                <ListItemAction className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </ListItemAction>
              </ListItem>
            ))}
          </ListGroup>
        </List>
      </section>

      {/* Horizontal List with Groups */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Horizontal Grouped List</h2>
        <List aria-label='Horizontal Grouped List'
          orientation="horizontal"
          className="flex-row space-x-4 space-y-0"
         >
          <ListGroup className="flex-row space-x-2">
            <ListGroupTitle className="flex items-center">Main:</ListGroupTitle>
            <ListItem variant="striped" className="inline-flex" leading={<Home />}>
              {/* <ListItemIcon>
                <Home className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Home</ListItemContent>
            </ListItem>
            <ListItem variant="striped" className="inline-flex" leading={<FileText />}>
              {/* <ListItemIcon>
                <FileText className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Files</ListItemContent>
            </ListItem>
          </ListGroup>

          <ListGroup className="flex-row space-x-2">
            <ListGroupTitle className="flex items-center">
              Tools:
            </ListGroupTitle>
            <ListItem variant="striped" className="inline-flex" leading={<Settings />}>
              {/* <ListItemIcon>
                <Settings className="h-4 w-4" />
              </ListItemIcon> */}
              <ListItemContent>Settings</ListItemContent>
            </ListItem>
            <ListItem variant="striped" className="inline-flex" leading={<Bell />}>
              {/* <ListItemIcon> */}
                {/* <Bell className="h-4 w-4" /> */}
              {/* </ListItemIcon> */}
              <ListItemContent>Notifications</ListItemContent>
            </ListItem>
          </ListGroup>
        </List>
      </section>
      <section className="flex flex-col gap-4">
      <ComplianceTracking />
      <MobileMenu />
      </section>

       <section className="flex flex-col gap-4">
        <AuditLog />
        <PermissionManagement />
        <ResourceAllocation />
        <UserManagement />
      </section>

      <section className="flex flex-col gap-4">
        <AuditSystem />
        <ComplexPermissions />
        <MultiTenantInterface />
        <ResourceManagement />
      </section>

      <section className="flex flex-col gap-4 border rounded-lg w-min ">
      </section>
    </div>
  );
};

export default ListDemo;
