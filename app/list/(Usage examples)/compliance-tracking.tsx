"use client";

import {
  List,
  ListGroup,
  ListGroupTitle,
  ListItem,
  ListItemAction,
  ListItemContent,
} from "@/components/custom/list";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle,
  ClipboardCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function ComplianceTracking() {
  const [complianceItems, setComplianceItems] = useState([
    {
      id: 1,
      name: "Data Protection",
      status: "Compliant",
      progress: 100,
      icon: CheckCircle,
    },
    {
      id: 2,
      name: "Access Control",
      status: "In Progress",
      progress: 75,
      icon: AlertTriangle,
    },
    {
      id: 3,
      name: "Incident Response",
      status: "Non-Compliant",
      progress: 30,
      icon: XCircle,
    },
    {
      id: 4,
      name: "Third-Party Risk",
      status: "In Progress",
      progress: 60,
      icon: AlertTriangle,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "text-green-700";
      case "In Progress":
        return "text-yellow-700";
      case "Non-Compliant":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Compliance Tracking System</h1>
      <List aria-label="Compliance Tracking List">
        <ListGroup>
          <ListGroupTitle icon={<ClipboardCheck />}>
            Compliance Requirements
          </ListGroupTitle>
          {complianceItems.map((item) => (
            <ListItem key={item.id} size={"sm"} leading={<item.icon />}>
                  <ListItemContent>
                <div className="flex items-center">
                  <div className="flex items-center gap-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-sm  flex items-center justify-center ${getStatusColor(item.status)}`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              </ListItemContent>
              <ListItemAction className="w-48">
                <Progress
                  value={item.progress}
                  className="w-full"
                  aria-label={`Progress for ${item.name}: ${item.status}`} // Added aria-label for accessibility
                />{" "}
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
      <Button className="mt-4">Generate Compliance Report</Button>
    </div>
  );
}
