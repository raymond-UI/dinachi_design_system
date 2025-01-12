// app/page.tsx
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const components = [
  {
    value: "list",
    label: "List component",
    url: "/list",
  },
  {
    value: "card",
    label: "Cards",
    url: "/card",
  },
  {
    value: "button",
    label: "Buttons",
    url: "/button",
  },
  {
    value: "input",
    label: "Input",
    url: "/input",
  },
];

export default function Home() {
  return (
    <main className="container min-h-screen flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
      <h1 className="text-3xl font-bold text-center sm:text-left newh1">
        Dinachi <br />
        <span className="font-medium text-xl text-secondary-foreground">
          Extended Shadcn component library
        </span>{" "}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {components.map((component) => (
          <Link href={component.url || "#"} key={component.value} passHref>
            <Card className=" hover:scale-105 transition-all p-4 cursor-pointer hover:bg-secondary">
              <CardContent>
                <CardTitle>{component.label}</CardTitle>
                <CardDescription>
                  Learn more about {component.label}.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
