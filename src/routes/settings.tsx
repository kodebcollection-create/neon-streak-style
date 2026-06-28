import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { User, Lock, Mail, Phone, Bell, Globe, Palette, Shield, Ban, KeyRound, Activity, HelpCircle, FileText, ShieldCheck, Info, LogOut, ChevronRight } from "lucide-react";

type Row = { icon: any; title: string; sub: string; right?: string; toggle?: boolean; on?: boolean };

const account: Row[] = [
  { icon: User, title: "Edit Profile", sub: "Update your profile information" },
  { icon: Lock, title: "Change Password", sub: "Update your account password" },
  { icon: Mail, title: "Email Address", sub: "Update your email address", right: "dafy@gmail.com" },
  { icon: Phone, title: "Phone Number", sub: "Update your phone number", right: "+254 712 345 678" },
];

const prefs: Row[] = [
  { icon: Bell, title: "Push Notifications", sub: "Manage your notification preferences", toggle: true, on: true },
  { icon: Mail, title: "Email Notifications", sub: "Receive updates via email", toggle: true, on: false },
  { icon: Globe, title: "Language", sub: "Choose your preferred language", right: "English" },
  { icon: Palette, title: "Appearance", sub: "Customize app appearance", right: "Dark" },
];

const privacy: Row[] = [
  { icon: Shield, title: "Privacy Settings", sub: "Manage who can see your content" },
  { icon: Ban, title: "Blocked Users", sub: "Manage blocked accounts" },
  { icon: KeyRound, title: "Two-Factor Authentication", sub: "Add extra security to your account", right: "Off" },
  { icon: Activity, title: "Login Activity", sub: "See where you're logged in" },
];

const support: Row[] = [
  { icon: HelpCircle, title: "Help Center", sub: "Get help and support" },
  { icon: FileText, title: "Terms of Service", sub: "Read our terms and conditions" },
  { icon: ShieldCheck, title: "Privacy Policy", sub: "Learn how we protect your data" },
  { icon: Info, title: "About FitStreak", sub: "App version 1.0.0" },
];

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="panel p-5">
      <h2 className="text-primary font-semibold mb-3">{title}</h2>
      <div className="divide-y divide-border">
        {rows.map((r, i) => {
          const Icon = r.icon;
          return (
            <div key={i} className="flex items-center gap-4 py-3.5">
              <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center text-primary shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.sub}</div>
              </div>
              {r.right && <span className="text-sm text-muted-foreground">{r.right}</span>}
              {r.toggle ? (
                <div className={`w-11 h-6 rounded-full relative transition ${r.on ? "bg-primary" : "bg-muted"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${r.on ? "right-0.5" : "left-0.5"}`} />
                </div>
              ) : (
                <ChevronRight size={16} className="text-muted-foreground" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your account, preferences and privacy.</p>
        </div>

        <Section title="Account" rows={account} />
        <Section title="Preferences" rows={prefs} />
        <Section title="Privacy & Security" rows={privacy} />
        <Section title="Support" rows={support} />

        <button className="panel w-full py-3.5 text-primary font-semibold flex items-center justify-center gap-2 hover:bg-panel-2">
          Log Out <LogOut size={16} />
        </button>
      </div>
    </AppLayout>
  );
}

export const Route = createFileRoute("/settings")({ component: SettingsPage });
