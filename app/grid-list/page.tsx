"use client"
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/components/custom/EnhancedList';
import { Mail, Star, Archive, Trash2, Settings, ChevronRight, Bell, Lock, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ListDemos = () => {
  // Sample data for demos
  const emails = [
    { id: 1, subject: "Weekly Report", from: "sarah@example.com", unread: true },
    { id: 2, subject: "Meeting Notes", from: "john@example.com", unread: false },
    { id: 3, subject: "Project Update", from: "mike@example.com", unread: true },
  ];

  const tasks = [
    { id: 1, title: "Review PR", priority: "high", due: "Today" },
    { id: 2, title: "Update docs", priority: "medium", due: "Tomorrow" },
    { id: 3, title: "Fix bugs", priority: "low", due: "Next week" },
  ];

  const settings = [
    { id: 1, name: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: 2, name: "Privacy", icon: <Lock className="h-4 w-4" /> },
    { id: 3, name: "Security", icon: <Shield className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Density Variations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Density Variations</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Compact Density */}
          <List 
            aria-label="Compact list"
            density="compact"
            divider="full"
            className="border rounded-lg"
          >
            {emails.map(email => (
              <ListItem key={email.id} density="compact">
                <ListItemIcon>
                  <Mail className={email.unread ? "text-primary" : ""} />
                </ListItemIcon>
                <ListItemContent>
                  <div className="font-medium">{email.subject}</div>
                  <div className="text-sm text-muted-foreground">{email.from}</div>
                </ListItemContent>
              </ListItem>
            ))}
          </List>

          {/* Default Density */}
          <List 
            aria-label="Default list"
            density="default"
            divider="inset"
            className="border rounded-lg"
          >
            {emails.map(email => (
              <ListItem key={email.id}>
                <ListItemIcon>
                  <Mail className={email.unread ? "text-primary" : ""} />
                </ListItemIcon>
                <ListItemContent>
                  <div className="font-medium">{email.subject}</div>
                  <div className="text-sm text-muted-foreground">{email.from}</div>
                </ListItemContent>
              </ListItem>
            ))}
          </List>

          {/* Comfortable Density */}
          <List 
            aria-label="Comfortable list"
            density="comfortable"
            className="border rounded-lg"
          >
            {emails.map(email => (
              <ListItem key={email.id} density="comfortable">
                <ListItemIcon>
                  <Mail className={email.unread ? "text-primary" : ""} />
                </ListItemIcon>
                <ListItemContent>
                  <div className="font-medium">{email.subject}</div>
                  <div className="text-sm text-muted-foreground">{email.from}</div>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        </div>
      </section>

      {/* Layout Variations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Layout Variations</h2>
        
        {/* Vertical Layout with Dividers */}
        <div className="space-y-4">
          <h3 className="text-xl">Vertical with Dividers</h3>
          <List 
            aria-label="Tasks list"
            divider="inset"
            className=""
          >
            {tasks.map(task => (
              <ListItem key={task.id}>
                <ListItemContent>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">Due: {task.due}</div>
                </ListItemContent>
                <ListItemAction>
                  <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                    {task.priority}
                  </Badge>
                </ListItemAction>
              </ListItem>
            ))}
          </List>
        </div>

        {/* Horizontal Layout */}
        <div className="space-y-4">
          <h3 className="text-xl">Horizontal Layout</h3>
          <List 
            aria-label="Quick actions"
            layout="horizontal"
            density="comfortable"
            className="border rounded-lg p-4"
          >
            {['Star', 'Archive', 'Delete'].map(action => (
              <ListItem key={action} className="flex-1 justify-center" >
                <Button variant="ghost" className="w-full">
                  {action === 'Star' && <Star className="mr-2 h-4 w-4" />}
                  {action === 'Archive' && <Archive className="mr-2 h-4 w-4" />}
                  {action === 'Delete' && <Trash2 className="mr-2 h-4 w-4" />}
                  {action}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>

        {/* Grid Layout */}
        <div className="space-y-4">
          <h3 className="text-xl">Grid Layout</h3>
          <List 
            aria-label="Settings grid"
            layout="grid"
            gridColumns={3}
            density="comfortable"
            className="border rounded-lg p-4"
          >
            {settings.map(setting => (
              <ListItem 
                key={setting.id}
                variant="interactive"
                className="flex flex-col items-center justify-center p-6 rounded-lg"
              >
                <ListItemIcon>
                  {setting.icon}
                </ListItemIcon>
                <ListItemContent>
                  <div className="text-center mt-2">{setting.name}</div>
                </ListItemContent>
                <ChevronRight className="mt-2 h-4 w-4 text-muted-foreground" />
              </ListItem>
            ))}
          </List>
        </div>
      </section>

      {/* Interactive Lists */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Interactive Lists</h2>
        <List 
          aria-label="Interactive settings"
          listRole="listbox"
          isInteractive
        //   divider="inset"
          className="border rounded-lg"
        >
          {settings.map(setting => (
            <ListItem 
              key={setting.id}
              variant="interactive"
              onClick={() => console.log(`Clicked ${setting.name}`)}
            >
              <ListItemIcon>{setting.icon}</ListItemIcon>
              <ListItemContent>{setting.name}</ListItemContent>
              <ListItemAction>
                <ChevronRight className="h-4 w-4" />
              </ListItemAction>
            </ListItem>
          ))}
        </List>
      </section>

      {/* Grouped Lists with Different Densities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Grouped Lists</h2>
        <List 
          aria-label="Grouped emails"
          density="compact"
          divider="inset"
          className="border rounded-lg"
        >
          <ListGroup variant="spaced">
            <ListGroupTitle variant="primary" size="md">Unread</ListGroupTitle>
            {emails.filter(e => e.unread).map(email => (
              <ListItem key={email.id} density="compact">
                <ListItemIcon>
                  <Mail className="text-primary" />
                </ListItemIcon>
                <ListItemContent>
                  <div className="font-medium">{email.subject}</div>
                  <div className="text-sm text-muted-foreground">{email.from}</div>
                </ListItemContent>
              </ListItem>
            ))}
          </ListGroup>
          <ListGroup variant="spaced">
            <ListGroupTitle size="md">Read</ListGroupTitle>
            {emails.filter(e => !e.unread).map(email => (
              <ListItem key={email.id} density="compact">
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemContent>
                  <div className="font-medium">{email.subject}</div>
                  <div className="text-sm text-muted-foreground">{email.from}</div>
                </ListItemContent>
              </ListItem>
            ))}
          </ListGroup>
        </List>
      </section>
    </div>
  );
};

export default ListDemos;