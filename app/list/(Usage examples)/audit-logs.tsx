"use client";

import {
  List,
  ListItem,
  ListItemContent,
  ListGroup,
  ListGroupTitle,
} from "@/components/custom/list";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function AuditLog() {
  const auditLogs = [
    {
      id: 1,
      action: "User Login",
      user: "john@example.com",
      timestamp: "2023-06-15 10:30:00",
    },
    {
      id: 2,
      action: "Post Created",
      user: "jane@example.com",
      timestamp: "2023-06-15 11:45:00",
    },
    {
      id: 3,
      action: "Settings Changed",
      user: "admin@example.com",
      timestamp: "2023-06-15 13:15:00",
    },
    {
      id: 4,
      action: "User Logout",
      user: "bob@example.com",
      timestamp: "2023-06-15 14:30:00",
    },
  ];

  return (
    <Card className="p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Log</h1>
      <List>
        <ListGroup >
          <ListGroupTitle icon={<Activity />}>Recent Activities</ListGroupTitle>
          {auditLogs.map((log) => (
            <ListItem key={log.id}>
              <ListItemContent className="space-x-1">
                <div className="font-medium">{log.action}</div>
                <div className="text-sm text-muted-foreground">
                  By: {log.user}
                </div>
                <div className="text-sm text-muted-foreground">
                  {log.timestamp}
                </div>
              </ListItemContent>
            </ListItem>
          ))}
        </ListGroup>
      </List>
    </Card>
  );
}
