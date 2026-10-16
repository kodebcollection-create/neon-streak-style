import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Flame,
  Users,
  Trophy,
  User as UserIcon,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Check,
  Camera,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { FitStreakStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "FitStreak — Show your fit. Keep your streak." }] }),
  component: AuthPage,
});

function BrandPanel({ signup = false }: { signup?: boolean }) {
  const features = [
    { icon: Flame, title: "Build Streaks", text: "Post daily and keep your streak alive." },
    {
      icon: Users,
      title: "Connect",
      text: signup
        ? "Follow friends and share your fits."
        : "Follow friends and see their latest fits.",
    },
    { icon: Trophy, title: "Climb Leaderboards", text: "Compete and become the style icon." },
  ];

  return (
    <div className="relative p-8 lg:p-12 flex flex-col justify-between min-h-full overflow-hidden">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/20 text-primary">
            <Flame size={22} fill="currentColor" />
          </div>
          <span className="text-2xl font-bold">
            Fit<span className="text-primary">Streak</span>
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          {signup ? (
            <>
              Start your
              <br />
              journey.
              <br />
              Build your <span className="text-primary">streak.</span>
            </>
          ) : (
            <>
              Show your fit.
              <br />
              Keep your <span className="text-primary">streak.</span>
            </>
          )}
        </h1>

        <p className="text-muted-foreground max-w-xs mb-8">
          {signup
            ? "Join FitStreak and connect with people who love style as much as you do."
            : "Share your outfit of the day, connect with friends and build unstoppable streaks."}
        </p>

        <div className="space-y-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3 items-center">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 grid place-items-center text-primary">
                <f.icon size={20} fill="currentColor" />
              </div>
              <div>
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground max-w-[200px]">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-2 gap-3 max-w-xs mb-6 relative">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${
                [
                  "from-stone-600 to-stone-900",
                  "from-blue-800 to-slate-900",
                  "from-zinc-700 to-black",
                ][i]
              } ring-2 ring-primary/40 shadow-glow ${i === 2 ? "col-span-2 max-w-[140px]" : ""}`}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flame-badge text-base">
            <Flame size={16} fill="currentColor" />
            {signup ? 25 : 12}
          </div>
        </div>
        <div className="text-primary text-3xl leading-none mb-2">❝</div>
        <p className="text-sm text-muted-foreground max-w-[220px]">
          Style is a way to say who you are without having to speak.
          <br />– Rachel Zoe
        </p>
      </div>
    </div>
  );
}

function SocialButtons() {
  const navigate = useNavigate();
  const handleSocial = (provider: string) => {
    toast.success(`Signed in with ${provider}! Welcome back 🔥`);
    navigate({ to: "/home" });
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {["Google", "Apple", "GitHub"].map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => handleSocial(p)}
          className="panel py-2.5 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-muted transition border border-border"
        >
          {p}
        </button>
      ))}
    </div>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("dafy@fitstreak.style");
  const [password, setPassword] = useState("password123");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    toast.success("Welcome back, Dafy! Your streak is ready 🔥");
    navigate({ to: "/home" });
  };

  return (
    <form onSubmit={handleLogin} className="panel p-8 lg:p-10 w-full max-w-md border-border">
      <h2 className="text-3xl font-bold text-center mb-2">Welcome back! 👋</h2>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Log in to continue your FitStreak journey.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Email or Username
      </label>
      <div className="relative mt-1.5 mb-4">
        <UserIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            setError("");
          }}
          className="input-dark text-sm"
          placeholder="Enter your email or username"
        />
      </div>

      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Password
      </label>
      <div className="relative mt-1.5 mb-2">
        <Lock
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="input-dark pr-10 text-sm"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="text-right mb-6">
        <button
          type="button"
          onClick={() => toast.info("Password reset link sent to your registered email!")}
          className="text-xs text-primary font-medium hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="btn-pink w-full py-2.5 font-bold text-sm block text-center mb-6 shadow-glow"
      >
        Log In
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-muted-foreground tracking-wider font-semibold">
          OR CONTINUE WITH
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <SocialButtons />

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password strength calculation
  const getStrength = (val: string) => {
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthScore = getStrength(pw);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agree) {
      setError("Please agree to the Terms of Service.");
      return;
    }

    // Save newly created user
    FitStreakStore.saveUser({
      id: "user_" + Date.now(),
      username: username.toLowerCase().replace(/\s+/g, "_"),
      displayName: username,
      email,
      avatar: "from-pink-500 to-purple-600",
      bio: "Just joined FitStreak! Ready to build my daily fit streak 🔥",
      location: "New York, NY",
      joinDate: "October 2026",
      verified: false,
    });

    toast.success(`Account created! Welcome to FitStreak, ${username} 🔥`);
    navigate({ to: "/home" });
  };

  return (
    <form onSubmit={handleSignup} className="panel p-8 lg:p-10 w-full max-w-md border-border">
      <h2 className="text-3xl font-bold text-center mb-2">Create your account 👋</h2>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Sign up to start your FitStreak journey.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Profile Picture Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarSelect}
      />
      <div
        className="relative w-24 h-24 mx-auto mb-2 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/60" />
        <div className="absolute inset-1.5 rounded-full bg-muted grid place-items-center text-primary overflow-hidden">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
          ) : (
            <Flame size={28} fill="currentColor" />
          )}
        </div>
        <button
          type="button"
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary grid place-items-center shadow-glow text-white"
        >
          <Camera size={14} />
        </button>
      </div>
      <p className="text-center font-semibold text-xs mb-4 text-muted-foreground">
        Upload profile picture
      </p>

      <div className="space-y-3.5 mb-5">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Username
          </label>
          <div className="relative mt-1">
            <UserIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="input-dark text-sm"
              placeholder="e.g. streetwear_alex"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <div className="relative mt-1">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="input-dark text-sm"
              placeholder="alex@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <div className="relative mt-1">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError("");
              }}
              className="input-dark text-sm"
              placeholder="Create a strong password"
            />
          </div>

          {/* Password strength colored meter */}
          {pw.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1.5 w-full">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      strengthScore >= step
                        ? strengthScore <= 2
                          ? "bg-red-500"
                          : strengthScore <= 3
                            ? "bg-yellow-400"
                            : "bg-emerald-500"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="text-[10px] text-muted-foreground text-right">
                {strengthScore <= 2
                  ? "Weak"
                  : strengthScore <= 3
                    ? "Moderate"
                    : "Strong password ✓"}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="accent-primary rounded"
        />
        <label htmlFor="agree" className="text-xs text-muted-foreground">
          I agree to the{" "}
          <span className="text-primary underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-primary underline cursor-pointer">Privacy Policy</span>.
        </label>
      </div>

      <button
        type="submit"
        className="btn-pink w-full py-2.5 font-bold text-sm block text-center mb-6 shadow-glow"
      >
        Create Account & Start Streak
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary font-semibold hover:underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
}

function AuthPage() {
  const [signup, setSignup] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-panel border-b lg:border-b-0 lg:border-r border-border">
        <BrandPanel signup={signup} />
      </div>
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        {signup ? (
          <SignupForm onSwitch={() => setSignup(false)} />
        ) : (
          <LoginForm onSwitch={() => setSignup(true)} />
        )}
      </div>
    </div>
  );
}
