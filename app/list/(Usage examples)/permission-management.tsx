'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/registry/list/list'
import { Switch } from '@/components/ui/switch'
import { Lock } from 'lucide-react'

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'Create Posts', enabled: true },
    { id: 2, name: 'Edit Users', enabled: false },
    { id: 3, name: 'Delete Comments', enabled: true },
    { id: 4, name: 'Manage Settings', enabled: false },
  ])

  const togglePermission = (id: number) => {
    setPermissions(permissions.map(perm => 
      perm.id === id ? { ...perm, enabled: !perm.enabled } : perm
    ))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Permission Management</h1>
      <List aria-label='Permission Management list '>
        <ListGroup>
          <ListGroupTitle icon={<Lock />}>Permissions</ListGroupTitle>
          {permissions.map(perm => (
            <ListItem key={perm.id} variant={'bordered'}>
              <ListItemContent>{perm.name}</ListItemContent>
              <ListItemAction>
                <Switch 
                  checked={perm.enabled}
                  onCheckedChange={() => togglePermission(perm.id)}
                />
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
    </div>
  )
}

