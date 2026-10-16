import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useFitStreakStore, type Conversation } from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Flame,
  Search,
  Shirt,
  Sparkles,
  Zap,
  MoreVertical,
  CheckCheck,
  Smile,
  Image as ImageIcon,
  ArrowLeft,
  X,
} from "lucide-react";

export const Route = createFileRoute("/messages")({
  head: () => ({ meta: [{ title: "Messages & Streaks — FitStreak" }] }),
  component: MessagesPage,
});

function MessagesPage() {
  const { conversations, sendMessage, posts } = useFitStreakStore();
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || "conv_1");
  const [inputText, setInputText] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [showOutfitPicker, setShowOutfitPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter((c) =>
    c.friendName.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputText.trim());
    setInputText("");
  };

  const handleSendNudge = () => {
    if (!activeConversation) return;
    sendMessage(
      activeConversation.id,
      `🔥 Streak Nudge! We have a ${activeConversation.streak}-day streak going strong. Don't forget your fit check today!`,
      undefined,
      true,
    );
  };

  const handleShareOutfit = (post: (typeof posts)[0]) => {
    if (!activeConversation) return;
    sendMessage(activeConversation.id, "Check out my fit for today! What do you think?", {
      title: post.title,
      image: post.imageUrl,
      bg: post.bg,
      streak: post.streak,
    });
    setShowOutfitPicker(false);
  };

  return (
    <AppLayout>
      <div className="panel h-[calc(100vh-6.5rem)] flex overflow-hidden border-border">
        {/* LEFT: Conversation List */}
        <div
          className={`w-full md:w-80 shrink-0 border-r border-border flex flex-col ${
            selectedConvId && "hidden md:flex"
          }`}
        >
          {/* Header & Search */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Messages <Sparkles size={18} className="text-primary" />
              </h2>
            </div>
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-primary transition"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/40">
            {filteredConversations.map((c) => {
              const isSelected = c.id === activeConversation?.id;
              const lastMsg = c.messages[c.messages.length - 1];
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvId(c.id)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                    isSelected ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted/40"
                  }`}
                >
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.avatar}`} />
                    <div className="absolute -bottom-1 -right-1 bg-black/80 rounded-full px-1 py-0.5 border border-primary/50 text-[10px] text-primary flex items-center font-bold">
                      <Flame size={10} fill="currentColor" /> {c.streak}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm truncate">{c.friendName}</div>
                      <span className="text-[10px] text-muted-foreground">
                        {lastMsg?.timestamp || c.lastActive}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">
                      {lastMsg?.isNudge ? "🔥 Streak Nudge" : lastMsg?.text || "No messages yet"}
                    </div>
                  </div>

                  {c.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold grid place-items-center shrink-0">
                      {c.unreadCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Active Chat View */}
        {activeConversation ? (
          <div
            className={`flex-1 flex flex-col bg-panel/30 ${!selectedConvId && "hidden md:flex"}`}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-panel">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConvId("")}
                  className="md:hidden p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeConversation.avatar}`}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-black rounded-full px-1 py-0.2 border border-primary/40 text-[9px] text-primary flex items-center font-bold">
                    <Flame size={9} fill="currentColor" /> {activeConversation.streak}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    {activeConversation.friendName}
                  </h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active {activeConversation.lastActive}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendNudge}
                  title="Send Streak Nudge"
                  className="bg-primary/15 hover:bg-primary text-primary hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Flame size={14} fill="currentColor" />
                  <span className="hidden sm:inline">Nudge Streak</span>
                </button>
                <button
                  onClick={() => setShowOutfitPicker(true)}
                  title="Share an outfit"
                  className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition"
                >
                  <Shirt size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConversation.messages.map((msg) => {
                const isMe = msg.senderId === "user_dafy";
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[78%] sm:max-w-md rounded-2xl p-3 text-sm space-y-2 shadow-sm ${
                        isMe
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-panel border border-border text-foreground rounded-bl-none"
                      } ${msg.isNudge ? "border border-primary/50 shadow-glow" : ""}`}
                    >
                      {msg.isNudge && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-300 mb-1">
                          <Zap size={14} /> STREAK NUDGE
                        </div>
                      )}

                      <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>

                      {/* Embedded Outfit Card */}
                      {msg.outfitPreview && (
                        <div className="rounded-xl overflow-hidden bg-black/40 border border-white/20 mt-2 p-2">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                            {msg.outfitPreview.image ? (
                              <img
                                src={msg.outfitPreview.image}
                                alt={msg.outfitPreview.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-br ${msg.outfitPreview.bg}`}
                              />
                            )}
                            <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-primary font-bold flex items-center gap-1">
                              <Flame size={10} fill="currentColor" /> {msg.outfitPreview.streak}d
                              streak
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-white mt-1.5 line-clamp-1">
                            {msg.outfitPreview.title}
                          </div>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-1 text-right ${
                          isMe ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-panel border-t border-border flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setShowOutfitPicker(true)}
                className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-muted"
                title="Send Outfit"
              >
                <Shirt size={18} />
              </button>
              <input
                type="text"
                placeholder={`Message ${activeConversation.friendName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-40 text-white p-2 rounded-xl transition"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 hidden md:grid place-items-center text-muted-foreground text-sm">
            Select a conversation to start chatting.
          </div>
        )}
      </div>

      {/* Outfit Attachment Picker Modal */}
      {showOutfitPicker && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowOutfitPicker(false)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-lg w-full p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base flex items-center gap-1.5">
                <Shirt size={16} className="text-primary" /> Select an outfit to share
              </h4>
              <button
                onClick={() => setShowOutfitPicker(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
              {posts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleShareOutfit(p)}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:border-primary transition p-2 bg-panel space-y-1.5"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted relative">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${p.bg}`} />
                    )}
                    <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-primary font-bold flex items-center gap-0.5">
                      <Flame size={9} fill="currentColor" /> {p.streak}d
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold truncate text-foreground">
                    {p.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
