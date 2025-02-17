"use client"
// app/page.tsx
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const components = [
  {
    value: "list",
    label: "List",
    url: "/list",
  },
  {
    value: "list-grid",
    label: "Grid",
    url: "/list-grid",
  },
];


const handleCopy = () => {
  navigator.clipboard.writeText("pnpm dlx shadcn@latest add https://dinachi.netlify.app/r/list.json");
  
  toast({
    title: "Copied to clipboard",
    description: "The command has been copied to your clipboard.",
    duration: 3000,
    
  });
}

export default function Home() {
  return (
    <main className="container max-w-2xl rounded mx-auto flex flex-col items-start justify-start sm:mt-[10dvh] pb-4">
      <div className="mt-10 gap-2 flex flex-col ">
      <Badge className="self-start">Work in progress</Badge>
      <h1 className="text-3xl font-bold  ">
      Dinachi design system
      </h1>
      <p className="text-lg text-muted-foreground text-left">Beautifully designed components built with React, UI and Tailwind CSS.
      </p>
      </div>

      {/* Components */}
      <h2 className=" text-xl font-bold mt-10">Components</h2>

      <div className="mt-4 border rounded p-4 bg-secondary/50 w-full">
      <h3 className="text-primary font-bold">1. List component</h3>
      <p>The list component is a versatile component that can be used to display a list of items. It can be used to display a list of items in a grid, menu items,  or a list.</p>

      <div className="mt-4 space-y-1">
        <span className="text-muted-foreground">Installation</span>
       <div className="relative bg-primary/10 border border-primary/50 p-2  w-full rounded">
      pnpm dlx shadcn@latest add https://dinachi.netlify.app/r/list.json
      <Button size={"icon"} variant={"ghost"} className="absolute right-0 top-0 " onClick={handleCopy}>
      <Copy className="text-primary" />
      </Button>
      </div>

      </div>
      <div className=" mt-4 space-y-1">
        <span className="text-muted-foreground">Usage</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {components.map((component) => (
          <Link href={component.url || "#"} key={component.value} passHref>
            <Card className=" hover:scale-105 transition-all p-4 cursor-pointer hover:bg-secondary">
              <CardContent className="p-0 m-0">
                <CardTitle>{component.label}</CardTitle>
                <CardDescription>
                  See example usage in a {component.label}.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
        </div>
      </div>

      <div className=" mt-4 space-y-1">
      <span className="text-muted-foreground">Documentation</span>
      <div className="bg-primary/10 border border-primary/50 p-2  w-full rounded">Coming soon!</div>
      </div>
      </div>

    </main>
  );
}
