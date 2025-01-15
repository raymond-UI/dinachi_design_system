'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/components/custom/list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Database, HardDrive, Cpu, Network } from 'lucide-react'

export default function ResourceManagement() {
  const [resources, setResources] = useState([
    { id: 1, name: 'Database Cluster', type: 'Database', capacity: '1TB', usage: '60%', icon: Database },
    { id: 2, name: 'Storage Array', type: 'Storage', capacity: '10TB', usage: '45%', icon: HardDrive },
    { id: 3, name: 'Compute Cluster', type: 'Compute', capacity: '128 cores', usage: '75%', icon: Cpu },
    { id: 4, name: 'Network Switch', type: 'Network', capacity: '100Gbps', usage: '30%', icon: Network },
  ])

  const [newResource, setNewResource] = useState({ name: '', type: '', capacity: '' })

  const addResource = () => {
    if (newResource.name && newResource.type && newResource.capacity) {
      setResources([...resources, { ...newResource, id: resources.length + 1, usage: '0%', icon: Database }])
      setNewResource({ name: '', type: '', capacity: '' })
    }
  }

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Resource Management System</h1>
      <List isInteractive={true}>
        <ListGroup>
          <ListGroupTitle>Enterprise Resources</ListGroupTitle>
          {resources.map(resource => (
            <ListItem key={resource.id} variant={"hoverable"}>
              <ListItemContent>
                <div className="flex items-center">
                  <resource.icon className="mr-2 h-5 w-5" />
                  <div>
                    <div className="font-medium">{resource.name}</div>
                    <div className="text-sm text-muted-foreground">{resource.type} - Capacity: {resource.capacity}</div>
                  </div>
                </div>
              </ListItemContent>
              <ListItemAction>
                <div className="text-sm font-medium">{resource.usage} Used</div>
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
      <div className="mt-4 space-y-2">
        <Input 
          placeholder="Resource Name" 
          value={newResource.name} 
          onChange={(e) => setNewResource({...newResource, name: e.target.value})}
        />
        <Input 
          placeholder="Resource Type" 
          value={newResource.type} 
          onChange={(e) => setNewResource({...newResource, type: e.target.value})}
        />
        <Input 
          placeholder="Capacity" 
          value={newResource.capacity} 
          onChange={(e) => setNewResource({...newResource, capacity: e.target.value})}
        />
        <Button onClick={addResource}>Add Resource</Button>
      </div>
    </div>
  )
}

