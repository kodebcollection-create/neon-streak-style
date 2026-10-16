import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useFitStreakStore, type Post } from "@/lib/store";
import { useState, useMemo } from "react";
import {
  Search,
  Flame,
  TrendingUp,
  Tag,
  Sparkles,
  Trophy,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  X,
  Shirt,
  UserPlus,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore & Discover — FitStreak" }] }),
  component: ExplorePage,
});

const categories = [
  "All",
  "Streetwear",
  "Y2K",
  "Vintage",
  "Minimalist",
  "Gorpcore",
  "Cyberpunk",
  "Formal",
];

const trendingCreators = [
  {
    name: "Sora_X",
    handle: "@sorax",
    streak: 28,
    avatar: "from-fuchsia-500 to-indigo-600",
    followers: "14.2k",
  },
  {
    name: "Kai_Fits",
    handle: "@kaifits",
    streak: 21,
    avatar: "from-emerald-400 to-cyan-500",
    followers: "8.9k",
  },
  {
    name: "Elena_V",
    handle: "@elenav",
    streak: 16,
    avatar: "from-amber-400 to-rose-500",
    followers: "11.5k",
  },
  {
    name: "Marcus",
    handle: "@marcus_w",
    streak: 14,
    avatar: "from-blue-600 to-violet-800",
    followers: "5.1k",
  },
];

function ExplorePage() {
  const { posts, toggleLikePost, toggleSavePost, savedIds } = useFitStreakStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "All" ||
        (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCat;
    });
  }, [posts, searchQuery, selectedCategory]);

  const toggleFollow = (handle: string) => {
    setFollowed((prev) => ({ ...prev, [handle]: !prev[handle] }));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              Explore & Discover <Sparkles className="text-primary" size={24} />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Find outfit inspirations, trending styles, and follow top streak creators.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags, fits, creators..."
              className="w-full bg-panel border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Weekly Streak Challenge Banner */}
        <div className="panel p-6 bg-gradient-to-r from-primary/20 via-panel to-panel border-primary/30 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Trophy size={14} /> Weekly Streak Challenge
            </div>
            <h2 className="text-2xl font-black text-foreground">
              Neon Streetwear Week <span className="text-primary">🔥</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Post an outfit featuring neon or high-contrast styling for 7 consecutive days to
              unlock the exclusive
              <strong className="text-foreground"> "Neon Overdrive"</strong> badge.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link
                to="/post"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
              >
                <Flame size={16} fill="currentColor" /> Join Challenge
              </Link>
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">1,842</span> fashion creators
                participating
              </div>
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
            <Flame size={200} className="text-primary" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-glow"
                    : "bg-panel text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Trending Creators Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-1.5 text-foreground uppercase tracking-wider">
              <TrendingUp size={16} className="text-primary" /> Top Streak Icons
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trendingCreators.map((creator) => {
              const isFollowing = !!followed[creator.handle];
              return (
                <div
                  key={creator.handle}
                  className="panel p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full bg-gradient-to-br ${creator.avatar}`}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{creator.name}</div>
                      <div className="text-[11px] text-primary flex items-center gap-0.5">
                        <Flame size={11} fill="currentColor" /> {creator.streak}d streak
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(creator.handle)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      isFollowing
                        ? "bg-muted text-foreground"
                        : "bg-primary/15 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {isFollowing ? <Check size={13} /> : <UserPlus size={13} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Masonry / Grid Posts Stream */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Trending Outfits</h3>
            <span className="text-xs text-muted-foreground">{filteredPosts.length} outfits</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="panel p-12 text-center">
              <Shirt size={40} className="mx-auto text-muted-foreground mb-3 opacity-50" />
              <h4 className="font-bold text-foreground">No outfits found</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for a different tag or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => {
                const isSaved = savedIds.includes(post.id);
                return (
                  <div
                    key={post.id}
                    className="panel overflow-hidden group cursor-pointer border-border hover:border-primary/50 transition-all duration-300 flex flex-col"
                    onClick={() => setSelectedPost(post)}
                  >
                    {/* Media Area */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${
                            post.bg || "from-slate-700 via-slate-800 to-black"
                          } group-hover:scale-105 transition-transform duration-500`}
                        />
                      )}

                      {/* Streak Flame Badge */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 border border-primary/30">
                        <Flame size={13} fill="currentColor" /> {post.streak}d
                      </div>

                      {/* Tagged Items Marker pill */}
                      {post.items && post.items.length > 0 && (
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] text-white flex items-center gap-1">
                          <Shirt size={10} className="text-primary" /> {post.items.length} tagged
                        </div>
                      )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-6 h-6 rounded-full bg-gradient-to-br ${post.avatar}`}
                          />
                          <span className="text-xs font-semibold text-foreground">{post.user}</span>
                          <span className="text-[11px] text-muted-foreground ml-auto">
                            {post.time}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold line-clamp-1">{post.title}</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[11px] text-primary font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 text-muted-foreground">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLikePost(post.id);
                          }}
                          className={`flex items-center gap-1.5 text-xs transition ${
                            post.liked ? "text-primary" : "hover:text-foreground"
                          }`}
                        >
                          <Heart size={14} fill={post.liked ? "currentColor" : "none"} />
                          <span>{post.likes}</span>
                        </button>

                        <div className="flex items-center gap-1.5 text-xs">
                          <MessageCircle size={14} />
                          <span>{post.comments}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSavePost(post.id);
                          }}
                          className={`text-xs transition ${
                            isSaved ? "text-primary" : "hover:text-foreground"
                          }`}
                        >
                          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal for Selected Post */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground z-10"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Preview with Interactive Tags */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                {selectedPost.imageUrl ? (
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${selectedPost.bg || "from-slate-700 to-black"}`}
                  />
                )}

                {/* Tag Pins */}
                {selectedPost.items?.map((item) => (
                  <div
                    key={item.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary text-white grid place-items-center cursor-pointer shadow-glow animate-pulse">
                      <Shirt size={10} />
                    </div>
                    <div className="absolute left-6 top-0 bg-black/90 backdrop-blur border border-primary/40 rounded-lg px-2.5 py-1 text-xs whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover/pin:opacity-100 transition-opacity">
                      <div className="font-bold text-white">{item.name}</div>
                      {item.brand && <div className="text-[10px] text-primary">{item.brand}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Details & Actions */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedPost.avatar}`}
                    />
                    <div>
                      <div className="font-bold text-sm">{selectedPost.user}</div>
                      <div className="text-xs text-primary flex items-center gap-1 font-semibold">
                        <Flame size={12} fill="currentColor" /> {selectedPost.streak} day streak
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mt-2">{selectedPost.title}</h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedPost.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-panel text-primary text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Garments breakdown */}
                  {selectedPost.items && selectedPost.items.length > 0 && (
                    <div className="mt-5 panel p-3.5 space-y-2">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <Shirt size={12} className="text-primary" /> Tagged Garments
                      </div>
                      <div className="space-y-1.5">
                        {selectedPost.items.map((it) => (
                          <div key={it.id} className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-foreground">{it.name}</span>
                            <span className="text-primary font-medium">{it.brand || "Custom"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleLikePost(selectedPost.id)}
                      className={`flex items-center gap-1.5 text-sm font-semibold transition ${
                        selectedPost.liked
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Heart size={18} fill={selectedPost.liked ? "currentColor" : "none"} />
                      <span>{selectedPost.likes}</span>
                    </button>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MessageCircle size={18} />
                      <span>{selectedPost.comments}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSavePost(selectedPost.id)}
                    className={`p-2 rounded-xl transition ${
                      savedIds.includes(selectedPost.id)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-panel"
                    }`}
                  >
                    <Bookmark
                      size={18}
                      fill={savedIds.includes(selectedPost.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
