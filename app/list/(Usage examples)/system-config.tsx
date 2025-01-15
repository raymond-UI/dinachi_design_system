"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  ListGroup,
  ListGroupTitle,
} from "@/components/custom/list";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";

export default function SystemConfig() {
  const [configs, setConfigs] = useState([
    { id: 1, name: "Site Name", value: "My Awesome Site" },
    { id: 2, name: "Max Upload Size", value: "10MB" },
    { id: 3, name: "Default Language", value: "English" },
    { id: 4, name: "Timezone", value: "UTC" },
  ]);

  const updateConfig = (id: number, newValue: string) => {
    setConfigs(
      configs.map((config) =>
        config.id === id ? { ...config, value: newValue } : config
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">System Configuration</h1>
      <List  aria-label="System Configuration List">
        <ListGroup>
          <ListGroupTitle icon={<Settings />}>Configuration</ListGroupTitle>
          {configs.map((config) => (
            <ListItem key={config.id}>
              <ListItemContent>{config.name}</ListItemContent>
              <ListItemAction>
                <label htmlFor={`config-${config.id}`} className="sr-only">
                  {config.name}
                </label>
                <Input
                  id={`config-${config.id}`}
                  value={config.value}
                  onChange={(e) => updateConfig(config.id, e.target.value)}
                  className="w-48"
                />
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
    </div>
  );
}
