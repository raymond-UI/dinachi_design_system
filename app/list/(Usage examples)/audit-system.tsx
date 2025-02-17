'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListGroup, ListGroupTitle } from '@/registry/list/list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Activity, Search, Filter } from 'lucide-react'

export default function AuditSystem() {
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'User Login', user: 'john@example.com', timestamp: '2023-06-15 10:30:00', ip: '192.168.1.1' },
    { id: 2, action: 'File Accessed', user: 'jane@example.com', timestamp: '2023-06-15 11:45:00', ip: '192.168.1.2' },
    { id: 3, action: 'Settings Changed', user: 'admin@example.com', timestamp: '2023-06-15 13:15:00', ip: '192.168.1.3' },
    { id: 4, action: 'Data Exported', user: 'bob@example.com', timestamp: '2023-06-15 14:30:00', ip: '192.168.1.4' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Audit System</h1>
      <div className="flex space-x-2 mb-4">
        <Input 
          placeholder="Search logs..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      <List aria-label='Audit Logs List'>
        <ListGroup>
          <ListGroupTitle icon={<Activity />}>Audit Logs</ListGroupTitle>
          {filteredLogs.map(log => (
            <ListItem key={log.id}>
              <ListItemContent className='flex justify-between'>
                <div className='flex flex-col'>
                <span className=" font-medium">{log.action}</span>
                <span className=" truncate text-sm text-muted-foreground">User: {log.user}</span>
                </div>
                <div className='flex flex-col'>
                <span className="text-sm text-muted-foreground">Time: {log.timestamp}</span>
                <span className="text-sm text-muted-foreground">IP: {log.ip}</span>
                </div>
              </ListItemContent>
            </ListItem>
          ))}
        </ListGroup>
      </List>
      <Button className="mt-4">
        <Search className="h-4 w-4 mr-2" />
        Advanced Search
      </Button>
    </div>
  )
}

