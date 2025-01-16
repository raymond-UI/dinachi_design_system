'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/components/custom/list'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Shield, User, FileText, Settings } from 'lucide-react'

export default function ComplexPermissions() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', icon: Shield },
    { id: 2, name: 'Manager', icon: User },
    { id: 3, name: 'Editor', icon: FileText },
    { id: 4, name: 'Viewer', icon: Settings },
  ])

  const [permissions, setPermissions] = useState([
    { id: 1, name: 'Create Users', roles: [1, 2] },
    { id: 2, name: 'Edit Content', roles: [1, 2, 3] },
    { id: 3, name: 'View Reports', roles: [1, 2, 3, 4] },
    { id: 4, name: 'Manage Settings', roles: [1] },
  ])

  const togglePermission = (permissionId: number, roleId: number) => {
    setPermissions(permissions.map(permission => 
      permission.id === permissionId
        ? { ...permission, roles: permission.roles.includes(roleId)
            ? permission.roles.filter(id => id !== roleId)
            : [...permission.roles, roleId] }
        : permission
    ))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Complex Permission System</h1>
      <List aria-label='Complex Permission System list'>
        <ListGroup>
          <ListGroupTitle>Permissions Matrix</ListGroupTitle>
          <ListItem>
            <ListItemContent>Permission</ListItemContent>
            {roles.map(role => (
              <ListItemAction key={role.id}>
                <div className="flex flex-col items-center">
                  <role.icon className="h-5 w-5" />
                  <span className="text-xs">{role.name}</span>
                </div>
              </ListItemAction>
            ))}
          </ListItem>
          {permissions.map(permission => (
            <ListItem key={permission.id} size={"lg"}>
              <ListItemContent>{permission.name}</ListItemContent>
              {roles.map(role => (
                <ListItemAction key={role.id}>
                  <Checkbox
                    checked={permission.roles.includes(role.id)}
                    onCheckedChange={() => togglePermission(permission.id, role.id)}
                  />
                </ListItemAction>
              ))}
            </ListItem>
          ))}
        </ListGroup>
      </List>
      <Button className="mt-4">Save Permissions</Button>
    </div>
  )
}

