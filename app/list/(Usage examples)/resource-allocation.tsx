'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/components/custom/list'
import { Progress } from '@/components/ui/progress'
import { Server } from 'lucide-react'

export default function ResourceAllocation() {
  const [resources, setResources] = useState([
    { id: 1, name: 'CPU', usage: 65 },
    { id: 2, name: 'Memory', usage: 80 },
    { id: 3, name: 'Disk Space', usage: 45 },
    { id: 4, name: 'Network', usage: 50 },
  ]);

  const [storageResources, setStorageResources] = useState([
    { id: 1, name: 'SSD', usage: 70 },
    { id: 2, name: 'HDD', usage: 30 },
    { id: 3, name: 'NAS', usage: 20 },
    { id: 4, name: 'Cloud Storage', usage: 10 },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resource Allocation</h1>
      <List aria-label='Resource Allocation List'>
        <ListGroup>
          <ListGroupTitle icon={<Server />}>System Resources</ListGroupTitle>
          {resources.map(resource => (
            <ListItem key={resource.id}>
              <ListItemContent>
                <span className="font-medium">{resource.name}</span>
                <span className="text-sm text-muted-foreground">{resource.usage}% used</span>
              </ListItemContent>
              <ListItemAction className="w-48">
                <Progress value={resource.usage} className="w-full" aria-label={`Progress for ${resource.name}: ${resource.usage}% used`} />
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
        <ListGroup>
          <ListGroupTitle icon={<Server />}>Storage Resources</ListGroupTitle>
          {storageResources.map(resource => (
            <ListItem key={resource.id}>
              <ListItemContent>
                <span className="font-medium">{resource.name}</span>
                <span className="text-sm text-muted-foreground">{resource.usage}% used</span>
              </ListItemContent>
              <ListItemAction className="w-48">
                <Progress value={resource.usage} className="w-full" aria-label={`Progress for ${resource.name}: ${resource.usage}% used`} />
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
    </div>
  )
}

