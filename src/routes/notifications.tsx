import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Heart, MessageCircle, UserPlus, Share2, AtSign, CheckCircle2 } from "lucide-react";

const tabs = ["All", "Likes", "Comments", "Follows", "Mentions"];

type N = {
  user: string;
  grad: string;
  action: string;
  time: string;
  icon: React.ComponentType<{ size?: number; className?: string; fill?: string }>;
  iconColor: string;
  thumb?: string;
  quote?: string;
  cta?: string;
  unread?: boolean;
};

const items: N[] = [
  {
    user: "Sarah Kimani",
    grad: "from-rose-500 to-pink-700",
    action: "liked your outfit.",
    time: "2 minutes ago",
    icon: Heart,
    iconColor: "text-primary",
    thumb: "from-slate-700 to-slate-900",
    unread: true,
  },
  {
    user: "Brian Otieno",
    grad: "from-amber-700 to-stone-900",
    action: "commented on your post.",
    time: "10 minutes ago",
    icon: MessageCircle,
    iconColor: "text-primary",
    thumb: "from-amber-800 to-stone-900",
    quote: "This looks so clean! 🔥",
    unread: true,
  },
  {
    user: "Mercy Wanjiku",
    grad: "from-amber-600 to-rose-700",
    action: "started following you.",
    time: "1 hour ago",
    icon: UserPlus,
    iconColor: "text-primary",
    cta: "Follow back",
    unread: true,
  },
  {
    user: "David Mwangi",
    grad: "from-zinc-700 to-zinc-900",
    action: "shared your post.",
    time: "3 hours ago",
    icon: Share2,
    iconColor: "text-primary",
    thumb: "from-zinc-700 to-zinc-900",
  },
  {
    user: "Amina Hassan",
    grad: "from-pink-600 to-purple-800",
    action: "reacted to your post.",
    time: "5 hours ago",
    icon: Heart,
    iconColor: "text-primary",
    thumb: "from-stone-500 to-stone-800",
  },
  {
    user: "Kelvin Mutiso",
    grad: "from-stone-600 to-stone-900",
    action: "mentioned you in a comment.",
    time: "1 day ago",
    icon: AtSign,
    iconColor: "text-primary",
    thumb: "from-zinc-600 to-zinc-900",
    quote: "@dafy What's your go-to brand?",
  },
  {
    user: "Tasha Ali",
    grad: "from-fuchsia-600 to-violet-800",
    action: "started following you.",
    time: "2 days ago",
    icon: UserPlus,
    iconColor: "text-primary",
    cta: "Follow back",
  },
];

function NotificationsPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <button className="border border-primary text-primary rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
            <CheckCircle2 size={16} /> Mark all as read
          </button>
        </div>

        <div className="panel p-1.5 inline-flex gap-1 flex-wrap">
          {tabs.map((t, i) => (
            <button
              key={t}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${i === 0 ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {items.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={i} className="panel p-4 flex items-center gap-4 relative">
                {n.unread && (
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${n.grad} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-semibold text-primary">{n.user}</span>{" "}
                    <span>{n.action}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-muted grid place-items-center">
                      <Icon size={11} className={n.iconColor} />
                    </span>
                    {n.time}
                  </div>
                  {n.quote && (
                    <div className="text-sm text-muted-foreground mt-1.5">"{n.quote}"</div>
                  )}
                </div>
                {n.thumb && (
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${n.thumb} shrink-0`} />
                )}
                {n.cta && (
                  <button className="border border-primary text-primary rounded-full px-4 py-1.5 text-xs font-medium shrink-0">
                    {n.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center text-xs text-muted-foreground py-4">
          <div>You've reached the end</div>
          <div className="w-10 h-0.5 bg-primary mx-auto mt-2" />
        </div>
      </div>
    </AppLayout>
  );
}

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });
