// app/components/CssVariablesDisplay.tsx

"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CssVariablesDisplay: React.FC = () => {
  const [variables, setVariables] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    
    // Define the CSS variable names
    const variableNames = [
      '--background', '--foreground', '--card', '--card-foreground',
      '--popover', '--popover-foreground', '--primary', '--primary-foreground',
      '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
      '--accent', '--accent-foreground', '--destructive', '--destructive-foreground',
      '--border', '--input', '--ring', '--chart-1', '--chart-2',
      '--chart-3', '--chart-4', '--chart-5', '--radius',
    ];

    // Retrieve CSS variable values
    const variablesObject: { [key: string]: string } = {};
    variableNames.forEach(variable => {
      variablesObject[variable] = rootStyles.getPropertyValue(variable).trim();
    });

    setVariables(variablesObject);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(variables).map(([key, value]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>{key}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{value}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CssVariablesDisplay;
