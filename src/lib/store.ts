import { useState, useEffect } from "react";
import {
  outfitGradients,
  feedPosts as initialFeedPosts,
  profilePosts as initialProfilePosts,
} from "./mock";

export interface TaggedItem {
  id: string;
  name: string;
  brand?: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface Post {
  id: string;
  user: string;
  avatar: string;
  time: string;
  title: string;
  tags: string[];
  likes: number;
  comments: number;
  streak: number;
  fire: number;
  bg?: string;
  imageUrl?: string;
  items?: TaggedItem[];
  liked?: boolean;
  category?: string;
  location?: string;
  createdAt: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalOutfits: number;
  totalLikes: number;
  freezesAvailable: number;
  hasPostedToday: boolean;
  todayKey: string;
  history: Record<string, "posted" | "frozen" | "missed">; // YYYY-MM-DD
  timezone: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  outfitPreview?: {
    title: string;
    image?: string;
    bg?: string;
    streak: number;
  };
  isNudge?: boolean;
}

export interface Conversation {
  id: string;
  friendName: string;
  avatar: string;
  streak: number;
  lastActive: string;
  unreadCount: number;
  messages: DirectMessage[];
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  verified: boolean;
}

// Helpers for timezone-aware dates
export function getLocalTodayKey(): string {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return "2026-10-16";
  }
}

const DEFAULT_USER: UserProfile = {
  id: "user_dafy",
  username: "dafy",
  displayName: "Dafy",
  email: "dafy@fitstreak.style",
  avatar: "from-zinc-700 to-black",
  bio: "Streetwear obsessive & vintage collector. Never skipping my daily fit check 👟🔥",
  location: "Brooklyn, NY",
  joinDate: "September 2024",
  verified: true,
};

const DEFAULT_STREAK: StreakData = {
  currentStreak: 12,
  longestStreak: 15,
  totalOutfits: 48,
  totalLikes: 1420,
  freezesAvailable: 2,
  hasPostedToday: true,
  todayKey: getLocalTodayKey(),
  history: {
    "2026-10-05": "posted",
    "2026-10-06": "posted",
    "2026-10-07": "posted",
    "2026-10-08": "posted",
    "2026-10-09": "posted",
    "2026-10-10": "frozen",
    "2026-10-11": "posted",
    "2026-10-12": "posted",
    "2026-10-13": "posted",
    "2026-10-14": "posted",
    "2026-10-15": "posted",
    "2026-10-16": "posted",
  },
  timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
};

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    friendName: "Mike",
    avatar: "from-blue-400 to-cyan-500",
    streak: 9,
    lastActive: "15m ago",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        senderId: "Mike",
        text: "Yo! Did you see the new Carhartt drop?",
        timestamp: "10:14 AM",
      },
      {
        id: "m2",
        senderId: "user_dafy",
        text: "Yeah! Already ordered the canvas jacket. Fire colorway.",
        timestamp: "10:20 AM",
      },
      {
        id: "m3",
        senderId: "Mike",
        text: "Fit check for today! Don't let our streak die!",
        timestamp: "10:25 AM",
        outfitPreview: {
          title: "Earth tones always 🤎",
          bg: outfitGradients[1],
          streak: 9,
        },
      },
    ],
  },
  {
    id: "conv_2",
    friendName: "Daisy",
    avatar: "from-pink-400 to-purple-500",
    streak: 18,
    lastActive: "1h ago",
    unreadCount: 0,
    messages: [
      {
        id: "m4",
        senderId: "Daisy",
        text: "Our streak is almost at 20 days! 🚀",
        timestamp: "Yesterday",
      },
      {
        id: "m5",
        senderId: "user_dafy",
        text: "Unstoppable! Loving your Y2K denim look.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "conv_3",
    friendName: "Brian",
    avatar: "from-orange-400 to-pink-500",
    streak: 6,
    lastActive: "3h ago",
    unreadCount: 0,
    messages: [
      {
        id: "m6",
        senderId: "Brian",
        text: "Where did you get those boots from your latest post?",
        timestamp: "Oct 14",
      },
      {
        id: "m7",
        senderId: "user_dafy",
        text: "Tagged them in the post! Rick Owens Bozo Tractor boots.",
        timestamp: "Oct 14",
      },
    ],
  },
];

const STORAGE_KEYS = {
  POSTS: "fitstreak_posts_v1",
  STREAK: "fitstreak_streak_v1",
  USER: "fitstreak_user_v1",
  CONVERSATIONS: "fitstreak_conversations_v1",
  SAVED_POSTS: "fitstreak_saved_v1",
};

// State subscribers pattern for reactive client-side store
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

// In-memory cache
let cachedPosts: Post[] | null = null;
let cachedStreak: StreakData | null = null;
let cachedUser: UserProfile | null = null;
let cachedConversations: Conversation[] | null = null;
let cachedSavedIds: string[] | null = null;

export const FitStreakStore = {
  getPosts(): Post[] {
    if (typeof window === "undefined") return initialFeedPosts;
    if (cachedPosts) return cachedPosts;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (data) {
        cachedPosts = JSON.parse(data);
        return cachedPosts!;
      }
    } catch (_e) {
      /* ignore storage error */
    }
    cachedPosts = [
      {
        id: "p_init_dafy",
        user: "Dafy",
        avatar: "from-zinc-700 to-black",
        time: "Just now",
        title: "All black everything 🖤 Oversized silhouette",
        tags: ["#streetwear", "#allblack", "#rickowens"],
        likes: 128,
        comments: 12,
        streak: 12,
        fire: 12,
        bg: outfitGradients[0],
        liked: false,
        category: "Streetwear",
        location: "SoHo, New York",
        createdAt: new Date().toISOString(),
        items: [
          { id: "i1", name: "Leather Bomber Jacket", brand: "Acne Studios", x: 48, y: 32 },
          { id: "i2", name: "Wide-Leg Cargos", brand: "Rick Owens", x: 50, y: 65 },
          { id: "i3", name: "Lug Sole Boots", brand: "Bottega Veneta", x: 45, y: 88 },
        ],
      },
      ...initialFeedPosts,
    ];
    this.savePosts(cachedPosts);
    return cachedPosts;
  },

  savePosts(posts: Post[]) {
    cachedPosts = posts;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
      } catch (_e) {
        /* ignore */
      }
    }
    notify();
  },

  addPost(newPostData: {
    title: string;
    tags: string[];
    category: string;
    location?: string;
    imageUrl?: string;
    bg?: string;
    items?: TaggedItem[];
  }): Post {
    const user = this.getUser();
    const streak = this.getStreak();

    // Check if posting today increments streak
    const today = getLocalTodayKey();
    const hasAlreadyPostedToday = streak.history[today] === "posted";
    let updatedStreakCount = streak.currentStreak;

    if (!hasAlreadyPostedToday) {
      updatedStreakCount += 1;
      const updatedHistory = { ...streak.history, [today]: "posted" as const };
      this.saveStreak({
        ...streak,
        currentStreak: updatedStreakCount,
        longestStreak: Math.max(streak.longestStreak, updatedStreakCount),
        totalOutfits: streak.totalOutfits + 1,
        hasPostedToday: true,
        todayKey: today,
        history: updatedHistory,
      });
    }

    const newPost: Post = {
      id: "post_" + Date.now(),
      user: user.displayName,
      avatar: user.avatar,
      time: "Just now",
      title: newPostData.title,
      tags: newPostData.tags.map((t) => (t.startsWith("#") ? t : `#${t}`)),
      likes: 1,
      comments: 0,
      streak: updatedStreakCount,
      fire: updatedStreakCount,
      bg: newPostData.imageUrl ? undefined : newPostData.bg || outfitGradients[0],
      imageUrl: newPostData.imageUrl,
      items: newPostData.items || [],
      liked: false,
      category: newPostData.category || "Streetwear",
      location: newPostData.location || "New York",
      createdAt: new Date().toISOString(),
    };

    const currentPosts = this.getPosts();
    this.savePosts([newPost, ...currentPosts]);
    return newPost;
  },

  toggleLikePost(postId: string) {
    const posts = this.getPosts();
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isLiked = !p.liked;
        return {
          ...p,
          liked: isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      }
      return p;
    });
    this.savePosts(updated);
  },

  getStreak(): StreakData {
    if (typeof window === "undefined") return DEFAULT_STREAK;
    if (cachedStreak) return cachedStreak;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (data) {
        cachedStreak = JSON.parse(data);
        return cachedStreak!;
      }
    } catch (_e) {
      /* ignore */
    }
    cachedStreak = DEFAULT_STREAK;
    return cachedStreak;
  },

  saveStreak(streak: StreakData) {
    cachedStreak = streak;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
      } catch (_e) {
        /* ignore */
      }
    }
    notify();
  },

  activateStreakFreeze(): boolean {
    const streak = this.getStreak();
    if (streak.freezesAvailable <= 0) return false;
    const today = getLocalTodayKey();
    const updatedHistory = { ...streak.history, [today]: "frozen" as const };
    this.saveStreak({
      ...streak,
      freezesAvailable: streak.freezesAvailable - 1,
      history: updatedHistory,
    });
    return true;
  },

  getUser(): UserProfile {
    if (typeof window === "undefined") return DEFAULT_USER;
    if (cachedUser) return cachedUser;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) {
        cachedUser = JSON.parse(data);
        return cachedUser!;
      }
    } catch (_e) {
      /* ignore */
    }
    cachedUser = DEFAULT_USER;
    return cachedUser;
  },

  saveUser(user: UserProfile) {
    cachedUser = user;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } catch (_e) {
        /* ignore */
      }
    }
    notify();
  },

  getConversations(): Conversation[] {
    if (typeof window === "undefined") return DEFAULT_CONVERSATIONS;
    if (cachedConversations) return cachedConversations;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (data) {
        cachedConversations = JSON.parse(data);
        return cachedConversations!;
      }
    } catch (_e) {
      /* ignore */
    }
    cachedConversations = DEFAULT_CONVERSATIONS;
    this.saveConversations(cachedConversations);
    return cachedConversations;
  },

  saveConversations(convs: Conversation[]) {
    cachedConversations = convs;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
      } catch (_e) {
        /* ignore */
      }
    }
    notify();
  },

  sendMessage(
    convId: string,
    text: string,
    outfitPreview?: DirectMessage["outfitPreview"],
    isNudge?: boolean,
  ) {
    const convs = this.getConversations();
    const updated = convs.map((c) => {
      if (c.id === convId) {
        const newMsg: DirectMessage = {
          id: "msg_" + Date.now(),
          senderId: "user_dafy",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          outfitPreview,
          isNudge,
        };
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: isNudge ? "🔥 Sent a Streak Nudge!" : text,
          lastActive: "Just now",
        };
      }
      return c;
    });
    this.saveConversations(updated);
  },

  getSavedPostIds(): string[] {
    if (typeof window === "undefined") return [];
    if (cachedSavedIds) return cachedSavedIds;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_POSTS);
      if (data) {
        cachedSavedIds = JSON.parse(data);
        return cachedSavedIds!;
      }
    } catch (_e) {
      /* ignore */
    }
    cachedSavedIds = ["1"];
    return cachedSavedIds;
  },

  toggleSavePost(postId: string): boolean {
    const saved = new Set(this.getSavedPostIds());
    let isSaved = false;
    if (saved.has(postId)) {
      saved.delete(postId);
    } else {
      saved.add(postId);
      isSaved = true;
    }
    cachedSavedIds = Array.from(saved);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_POSTS, JSON.stringify(cachedSavedIds));
      } catch (_e) {
        /* ignore */
      }
    }
    notify();
    return isSaved;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

// React Hook to consume reactive store
export function useFitStreakStore() {
  const [posts, setPosts] = useState<Post[]>(() => FitStreakStore.getPosts());
  const [streak, setStreak] = useState<StreakData>(() => FitStreakStore.getStreak());
  const [user, setUser] = useState<UserProfile>(() => FitStreakStore.getUser());
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    FitStreakStore.getConversations(),
  );
  const [savedIds, setSavedIds] = useState<string[]>(() => FitStreakStore.getSavedPostIds());

  useEffect(() => {
    // Initial sync upon client mount
    setPosts(FitStreakStore.getPosts());
    setStreak(FitStreakStore.getStreak());
    setUser(FitStreakStore.getUser());
    setConversations(FitStreakStore.getConversations());
    setSavedIds(FitStreakStore.getSavedPostIds());

    const unsubscribe = FitStreakStore.subscribe(() => {
      setPosts([...FitStreakStore.getPosts()]);
      setStreak({ ...FitStreakStore.getStreak() });
      setUser({ ...FitStreakStore.getUser() });
      setConversations([...FitStreakStore.getConversations()]);
      setSavedIds([...FitStreakStore.getSavedPostIds()]);
    });

    return unsubscribe;
  }, []);

  return {
    posts,
    streak,
    user,
    conversations,
    savedIds,
    addPost: FitStreakStore.addPost.bind(FitStreakStore),
    toggleLikePost: FitStreakStore.toggleLikePost.bind(FitStreakStore),
    toggleSavePost: FitStreakStore.toggleSavePost.bind(FitStreakStore),
    activateStreakFreeze: FitStreakStore.activateStreakFreeze.bind(FitStreakStore),
    saveUser: FitStreakStore.saveUser.bind(FitStreakStore),
    sendMessage: FitStreakStore.sendMessage.bind(FitStreakStore),
  };
}
