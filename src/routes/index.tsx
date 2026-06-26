import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Users, Trophy, User as UserIcon, Lock, Mail, Eye, EyeOff, Check, Camera, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "FitStreak — Show your fit. Keep your streak." }] }),
  component: AuthPage,
});

function BrandPanel({ signup = false }: { signup?: boolean }) {
  const features = [
    { icon: Flame, title: "Build Streaks", text: "Post daily and keep your streak alive." },
    { icon: Users, title: "Connect", text: signup ? "Follow friends and share your fits." : "Follow friends and see their latest fits." },
    { icon: Trophy, title: "Climb Leaderboards", text: "Compete and become the style icon." },
  ];
  return (
    <div className="relative p-8 lg:p-12 flex flex-col justify-between min-h-full overflow-hidden">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/20 text-primary">
            <Flame size={22} fill="currentColor" />
          </div>
          <span className="text-2xl font-bold">Fit<span className="text-primary">Streak</span></span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {signup ? <>Start your<br />journey.<br />Build your <span className="text-primary">streak.</span></>
                 : <>Show your fit.<br />Keep your <span className="text-primary">streak.</span></>}
        </h1>
        <p className="text-muted-foreground max-w-xs mb-8">
          {signup ? "Join FitStreak and connect with people who love style as much as you do."
                  : "Share your outfit of the day, connect with friends and build unstoppable streaks."}
        </p>
        <div className="space-y-4">
          {features.map(f => (
            <div key={f.title} className="flex gap-3">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 grid place-items-center text-primary">
                <f.icon size={20} fill="currentColor" />
              </div>
              <div>
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-muted-foreground max-w-[200px]">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-3 max-w-xs mb-6 relative">
          {[0,1,2].map(i => (
            <div key={i} className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${
              ["from-stone-600 to-stone-900","from-blue-800 to-slate-900","from-zinc-700 to-black"][i]
            } ring-2 ring-primary/40 shadow-glow ${i===2?"col-span-2 max-w-[140px]":""}`} />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flame-badge text-base">
            <Flame size={16} fill="currentColor" />{signup ? 25 : 12}
          </div>
        </div>
        <div className="text-primary text-3xl leading-none mb-2">❝</div>
        <p className="text-sm text-muted-foreground max-w-[220px]">
          Style is a way to say who you are without having to speak.<br />– Rachel Zoe
        </p>
      </div>
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {["Google", "Apple", "Facebook"].map(p => (
        <button key={p} className="panel py-2.5 text-sm flex items-center justify-center gap-2 hover:bg-muted transition">
          <span className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-blue-500" />{p}
        </button>
      ))}
    </div>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="panel p-8 lg:p-10 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-2">Welcome back! 👋</h2>
      <p className="text-center text-muted-foreground mb-8">Log in to continue your FitStreak journey.</p>
      <label className="text-sm font-medium">Email or Username</label>
      <div className="relative mt-2 mb-5">
        <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input className="input-dark" placeholder="Enter your email or username" />
      </div>
      <label className="text-sm font-medium">Password</label>
      <div className="relative mt-2 mb-2">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type={show ? "text" : "password"} className="input-dark pr-10" placeholder="Enter your password" />
        <button onClick={()=>setShow(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {show ? <EyeOff size={16}/> : <Eye size={16}/>}
        </button>
      </div>
      <div className="text-right mb-6"><a className="text-sm text-primary font-medium">Forgot password?</a></div>
      <Link to="/home" className="btn-pink w-full block text-center mb-6">Log In</Link>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground tracking-wider">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <SocialButtons />
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account? <button onClick={onSwitch} className="text-primary font-semibold">Sign up</button>
      </p>
    </div>
  );
}

function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const [pw, setPw] = useState("");
  const strength = Math.min(8, Math.floor(pw.length / 2));
  return (
    <div className="panel p-8 lg:p-10 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-2">Create your account 👋</h2>
      <p className="text-center text-muted-foreground mb-6">Sign up to start your FitStreak journey.</p>
      <div className="relative w-32 h-32 mx-auto mb-2">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/60" />
        <div className="absolute inset-3 rounded-full bg-muted grid place-items-center text-primary">
          <Flame size={36} fill="currentColor" />
        </div>
        <button className="absolute bottom-0 right-2 w-10 h-10 rounded-full bg-primary grid place-items-center shadow-glow">
          <Camera size={18} className="text-white"/>
        </button>
      </div>
      <p className="text-center font-semibold mb-1">Upload profile picture</p>
      <p className="text-center text-xs text-muted-foreground mb-6">JPG, PNG or GIF. Max size 5MB</p>

      {[
        { label: "Username", icon: UserIcon, ph: "Choose a username", ok: true },
        { label: "Email", icon: Mail, ph: "Enter your email address", ok: true },
      ].map(f => (
        <div key={f.label} className="mb-4">
          <label className="text-sm font-medium">{f.label}</label>
          <div className="relative mt-2">
            <f.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="input-dark pr-10" placeholder={f.ph} />
            {f.ok && <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
          </div>
        </div>
      ))}

      <label className="text-sm font-medium">Password</label>
      <div className="relative mt-2 mb-2">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="input-dark pr-10" placeholder="Create a password" />
        <Eye size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="flex gap-1 mb-1">
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < strength ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
      <p className="text-xs mb-4">Password strength: <span className="text-green-400 font-semibold">{strength>5?"Strong":strength>2?"Medium":"Weak"}</span></p>

      <label className="text-sm font-medium">Confirm Password</label>
      <div className="relative mt-2 mb-5">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="password" className="input-dark pr-10" placeholder="Confirm your password" />
        <Eye size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>

      <label className="flex items-start gap-2 text-sm mb-6">
        <div className="w-5 h-5 rounded bg-primary grid place-items-center shrink-0 mt-0.5"><Check size={14} className="text-white"/></div>
        <span>I agree to the <a className="text-primary">Terms of Service</a> and <a className="text-primary">Privacy Policy</a></span>
      </label>

      <Link to="/home" className="btn-pink w-full block text-center mb-6">Sign Up</Link>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground tracking-wider">OR SIGN UP WITH</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <SocialButtons />
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account? <button onClick={onSwitch} className="text-primary font-semibold">Log in</button>
      </p>
    </div>
  );
}

function AuthPage() {
  const [mode, setMode] = useState<"login"|"signup">("login");
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <BrandPanel signup={mode==="signup"} />
      <div className="flex flex-col items-center justify-center p-6 lg:p-10">
        {mode === "login"
          ? <LoginForm onSwitch={()=>setMode("signup")} />
          : <SignupForm onSwitch={()=>setMode("login")} />}
        <p className="text-xs text-muted-foreground mt-6 flex items-center gap-2">
          <ShieldCheck size={14}/> Your data is safe with us. We respect your <a className="text-primary">privacy</a>.
        </p>
      </div>
    </div>
  );
}
