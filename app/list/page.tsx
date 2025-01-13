"use client"
import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemContent,
  ListItemAction,
  ListGroup,
  ListGroupTitle,
} from '@/components/custom/list'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  Star,
  Mail,
  Settings,
  User,
  Bell,
  Plus,
  Trash2,
  Home,
  FileText,
  Inbox,
  Archive,
  Flag,
  Clock,
  Calendar,
  FolderClosed,
  Tags,
  Users,
  InboxIcon,
  ReceiptIcon,
} from 'lucide-react'
import AuditLog from './(Usage examples)/audit-logs'
import PermissionManagement from './(Usage examples)/permission-management'
import ResourceAllocation from './(Usage examples)/resource-allocation'
import SystemConfig from './(Usage examples)/system-config'

const ListDemo = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full max-w-3xl space-y-8 p-6">
      {/* Basic List with Groups */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Grouped List</h2>
        <List variant="bordered" size="md">
          <ListGroup >
            <ListGroupTitle variant="primary" icon={<InboxIcon className=''/>} size='sm'>Inbox</ListGroupTitle>
            <ListItem>
              <ListItemIcon>
                <Inbox className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent className='bg-blue-500'>Primary</ListItemContent>
              <ListItemAction>
                <Badge>23</Badge>
              </ListItemAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Star className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Starred</ListItemContent>
            </ListItem>
          </ListGroup>

          <ListGroup>
            <ListGroupTitle variant="accent">Categories</ListGroupTitle>
            <ListItem>
              <ListItemIcon>
                <Tags className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Personal</ListItemContent>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Users className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Team</ListItemContent>
            </ListItem>
          </ListGroup>
        </List>
      </section>

      {/* Interactive Grouped List */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Interactive Grouped List</h2>
        <List variant="hoverable" size="md" listRole="listbox" isInteractive>
          <ListGroup variant="spaced" > 
            <ListGroupTitle icon={<ReceiptIcon />} size='lg'>Recent</ListGroupTitle>
            {[
              { id: 'today', icon: Clock, label: 'Today' },
              { id: 'calendar', icon: Calendar, label: 'Calendar' },
              { id: 'archive', icon: Archive, label: 'Archive' },
            ].map((item) => (
              <ListItem
                key={item.id}
                variant="hoverable"
                selected={selectedItems.includes(item.id)}
                onClick={() => toggleSelection(item.id)}
              >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
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
              { id: 'documents', icon: FileText, label: 'Documents' },
              { id: 'projects', icon: FolderClosed, label: 'Projects' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <ListItem
                key={item.id}
                variant="hoverable"
                selected={selectedItems.includes(item.id)}
                onClick={() => toggleSelection(item.id)}
              >
                <ListItemIcon>
                  <item.icon className="h-4 w-4" />
                </ListItemIcon>
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
        <h2 className="mb-4 text-lg font-semibold">Complex Grouped List with Actions</h2>
        <List variant="bordered" size="lg">
          <ListGroup>
            <ListGroupTitle>Priority Tasks</ListGroupTitle>
            {[
              { id: 'high', icon: Flag, label: 'High Priority', count: 3, color: 'text-red-500' },
              { id: 'medium', icon: Flag, label: 'Medium Priority', count: 5, color: 'text-yellow-500' },
              { id: 'low', icon: Flag, label: 'Low Priority', count: 8, color: 'text-green-500' },
            ].map((item) => (
              <ListItem key={item.id} className="group">
                <ListItemIcon className={item.color}>
                  <item.icon className="h-4 w-4" />
                </ListItemIcon>
                <ListItemContent>
                  <div className="font-medium">{item.label}</div>
                  <p className="text-xs text-muted-foreground">
                    {item.count} tasks pending
                  </p>
                </ListItemContent>
                <ListItemAction className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive">
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
        <List
          orientation="horizontal"
          className="flex-row space-x-4 space-y-0"
          variant="hoverable"
          size="lg"
        >
          <ListGroup className="flex-row space-x-2">
            <ListGroupTitle className="flex items-center">Main:</ListGroupTitle>
            <ListItem variant="hoverable" className="inline-flex">
              <ListItemIcon>
                <Home className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Home</ListItemContent>
            </ListItem>
            <ListItem variant="hoverable" className="inline-flex">
              <ListItemIcon>
                <FileText className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Files</ListItemContent>
            </ListItem>
          </ListGroup>

          <ListGroup className="flex-row space-x-2">
            <ListGroupTitle className="flex items-center">Tools:</ListGroupTitle>
            <ListItem variant="hoverable" className="inline-flex">
              <ListItemIcon>
                <Settings className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Settings</ListItemContent>
            </ListItem>
            <ListItem variant="hoverable" className="inline-flex">
              <ListItemIcon>
                <Bell className="h-4 w-4" />
              </ListItemIcon>
              <ListItemContent>Notifications</ListItemContent>
            </ListItem>
          </ListGroup>
        </List>
      </section>

      <section className="flex flex-col gap-4">
        <AuditLog />
        <PermissionManagement />
        <ResourceAllocation />
        <SystemConfig />
      </section>
    </div>

  )
}

export default ListDemo