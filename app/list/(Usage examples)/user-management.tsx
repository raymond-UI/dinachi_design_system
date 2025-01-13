'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/components/custom/list'
import { Button } from '@/components/ui/button'
import { UserCircle, Edit, Trash } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
  ])

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <List>
        <ListGroup>
          <ListGroupTitle icon={<UserCircle />}>Users</ListGroupTitle>
          {users.map(user => (
            <ListItem key={user.id} variant={"hoverable"}>
              <ListItemContent>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground ">{user.email}</div>
                <div className="text-sm text-muted-foreground">{user.role}</div>
              </ListItemContent>
              <ListItemAction>
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}><Trash className="h-4 w-4" /></Button>
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
    </div>
  )
}

