import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/explore")({ component: () => <AppLayout><Stub title="Explore"/></AppLayout> });
function Stub({ title }: { title: string }) {
  return <div className="panel p-10 text-center text-muted-foreground"><h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>Coming soon.</div>;
}
