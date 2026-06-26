// Shared mock data for the FitStreak demo
export const outfitGradients = [
  "from-slate-700 via-slate-800 to-black",
  "from-amber-700 via-stone-700 to-stone-900",
  "from-zinc-600 via-zinc-800 to-black",
  "from-stone-500 via-stone-700 to-stone-900",
  "from-blue-900 via-slate-800 to-slate-900",
  "from-neutral-600 via-neutral-800 to-black",
];

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
  bg: string;
}

export const feedPosts: Post[] = [
  { id: "1", user: "Brian", avatar: "from-orange-400 to-pink-500", time: "2h ago",
    title: "Simple and clean ✨", tags: ["#streetwear", "#minimal"], likes: 45, comments: 8, streak: 6, fire: 12,
    bg: outfitGradients[0] },
  { id: "2", user: "Daisy", avatar: "from-pink-400 to-purple-500", time: "4h ago",
    title: "Sunshine mood 🌞", tags: ["#y2k", "#casual"], likes: 32, comments: 6, streak: 12, fire: 18,
    bg: outfitGradients[4] },
  { id: "3", user: "Mike", avatar: "from-blue-400 to-cyan-500", time: "5h ago",
    title: "Earth tones always 🤎", tags: ["#ootd", "#earthtones"], likes: 27, comments: 5, streak: 3, fire: 9,
    bg: outfitGradients[1] },
];

export const profilePosts = [
  { title: "All black everything 🖤", time: "2 days ago", likes: 128, comments: 12, fire: 12, bg: outfitGradients[0] },
  { title: "Earth tones always 🤎", time: "4 days ago", likes: 96, comments: 8, fire: 10, bg: outfitGradients[1] },
  { title: "Street vibes only ⚡", time: "6 days ago", likes: 142, comments: 15, fire: 9, bg: outfitGradients[2] },
  { title: "Minimal but clean ✨", time: "1 week ago", likes: 110, comments: 9, fire: 8, bg: outfitGradients[3] },
  { title: "Comfort is key 🔑", time: "1 week ago", likes: 98, comments: 7, fire: 7, bg: outfitGradients[5] },
  { title: "Layered to perfection 👌", time: "1 week ago", likes: 105, comments: 11, fire: 6, bg: outfitGradients[4] },
];
