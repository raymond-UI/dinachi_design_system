'use client'

import { useState } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, ListGroup, ListGroupTitle } from '@/components/custom/list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building, Users, Database, Settings } from 'lucide-react'

export default function MultiTenantInterface() {
  const [tenants, setTenants] = useState([
    { id: 1, name: 'Acme Corp', users: 150, storage: '500GB', customDomain: 'acme.example.com' },
    { id: 2, name: 'TechStart Inc', users: 75, storage: '250GB', customDomain: 'techstart.example.com' },
    { id: 3, name: 'Global Services LLC', users: 300, storage: '1TB', customDomain: 'globalservices.example.com' },
  ])

  const [newTenant, setNewTenant] = useState({ name: '', customDomain: '' })

  const addTenant = () => {
    if (newTenant.name && newTenant.customDomain) {
      setTenants([...tenants, { ...newTenant, id: tenants.length + 1, users: 0, storage: '100GB' }])
      setNewTenant({ name: '', customDomain: '' })
    }
  }

  return (
    <div className="p-4 min-w-fit">
      <h1 className="text-2xl font-bold mb-4">Multi-Tenant Interface</h1>
      <List aria-label="Multi-Tenant Interface">
        <ListGroup>
          <ListGroupTitle icon={<Building />}>Active Tenants</ListGroupTitle>
          {tenants.map(tenant => (
            <ListItem key={tenant.id} size={"md"} variant={"interactive"}>
              <ListItemContent className='flex-col items-start'>
                <p className="font-medium">{tenant.name}</p>
                <span className="text-sm text-muted-foreground">Domain: {tenant.customDomain}</span>
              </ListItemContent>
              <ListItemAction className="flex space-x-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{tenant.users}</span>
                </div>
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-1" />
                  <span className="text-sm">{tenant.storage}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </ListItemAction>
            </ListItem>
          ))}
        </ListGroup>
      </List>
      <div className="mt-4 space-y-2">
        <Input 
          placeholder="Tenant Name" 
          value={newTenant.name} 
          onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
        />
        <Input 
          placeholder="Custom Domain" 
          value={newTenant.customDomain} 
          onChange={(e) => setNewTenant({...newTenant, customDomain: e.target.value})}
        />
        <Button onClick={addTenant}>Add Tenant</Button>
      </div>
    </div>
  )
}

