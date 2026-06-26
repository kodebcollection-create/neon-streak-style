import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
export const Route = createFileRoute("/notifications")({ component: () => <AppLayout><div className="panel p-10 text-center text-muted-foreground"><h1 className="text-2xl font-bold text-foreground mb-2">Notifications</h1>You're all caught up.</div></AppLayout> });
