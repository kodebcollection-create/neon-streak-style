import { createFileRoute, useRouter, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useFitStreakStore, type TaggedItem } from "@/lib/store";
import {
  ArrowLeft,
  Image as ImageIcon,
  Video,
  X,
  UploadCloud,
  Lightbulb,
  Hash,
  MapPin,
  Shirt,
  ChevronDown,
  Lock,
  Send,
  Flame,
  Camera,
  Plus,
  Trash2,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/post")({
  head: () => ({ meta: [{ title: "Post Outfit — FitStreak" }] }),
  component: PostPage,
});

function PostPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const { addPost, streak } = useFitStreakStore();

  const [mode, setMode] = useState<"Photo" | "Video">("Photo");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("Brooklyn, NY");
  const [tags, setTags] = useState<string[]>(["#streetwear", "#allblack"]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [category, setCategory] = useState("Streetwear");
  const [visibility, setVisibility] = useState("Everyone");
  const [advanced, setAdvanced] = useState({ comments: true, likes: true, gallery: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clothing tagging state
  const [taggedItems, setTaggedItems] = useState<TaggedItem[]>([]);
  const [pendingTagCoord, setPendingTagCoord] = useState<{ x: number; y: number } | null>(null);
  const [tagItemName, setTagItemName] = useState("");
  const [tagItemBrand, setTagItemBrand] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const suggestedTags = [
    "#streetwear",
    "#allblack",
    "#ootd",
    "#vintage",
    "#y2k",
    "#minimalist",
    "#sneakers",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        toast.error("File is too large. Please select a photo under 25MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        toast.success("Photo loaded! Tap anywhere on the image to tag clothing items.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPendingTagCoord({ x, y });
  };

  const handleSaveTag = () => {
    if (!tagItemName.trim() || !pendingTagCoord) return;
    const newItem: TaggedItem = {
      id: "tag_" + Date.now(),
      name: tagItemName.trim(),
      brand: tagItemBrand.trim() || undefined,
      x: pendingTagCoord.x,
      y: pendingTagCoord.y,
    };
    setTaggedItems((prev) => [...prev, newItem]);
    setPendingTagCoord(null);
    setTagItemName("");
    setTagItemBrand("");
  };

  const handleRemoveTag = (id: string) => {
    setTaggedItems((prev) => prev.filter((it) => it.id !== id));
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = customTagInput.trim().replace(/^#/, "");
      if (val && !tags.includes(`#${val}`)) {
        setTags([...tags, `#${val}`]);
        setCustomTagInput("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      toast.error("Please add a title or caption for your outfit.");
      return;
    }

    setIsSubmitting(true);

    try {
      addPost({
        title: caption.trim(),
        tags,
        category,
        location,
        imageUrl: selectedImage || undefined,
        items: taggedItems,
      });

      toast.success("Outfit posted! Your daily streak is safe 🔥");
      navigate({ to: "/home" });
    } catch {
      toast.error("Failed to post outfit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.history.back()} className="p-2 rounded-lg hover:bg-muted">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Share Your Outfit <Flame size={18} className="text-primary" fill="currentColor" />
            </h1>
            <p className="text-xs text-muted-foreground">
              Keep your {streak.currentStreak}-day streak alive today!
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-pink text-sm px-5 py-2 font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <Send size={15} /> Post Outfit
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Media Upload & Interactive Tagging */}
        <div className="space-y-4">
          <div className="panel p-2 grid grid-cols-2 gap-2">
            {(["Photo", "Video"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition ${
                  mode === m ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {m === "Photo" ? <ImageIcon size={16} /> : <Video size={16} />}
                {m}
              </button>
            ))}
          </div>

          {/* Media Preview Box */}
          <div className="panel overflow-hidden border-border">
            {selectedImage ? (
              <div
                ref={imageContainerRef}
                onClick={handleImageClick}
                className="relative aspect-[3/4] bg-black cursor-crosshair group overflow-hidden select-none"
              >
                <img
                  src={selectedImage}
                  alt="Outfit preview"
                  className="w-full h-full object-cover"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                    setTaggedItems([]);
                  }}
                  className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 text-white hover:bg-destructive transition"
                >
                  <X size={13} /> Remove Image
                </button>

                {/* Tag hint */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-2.5 py-1 rounded-lg text-[11px] text-white/90 pointer-events-none">
                  Tap to tag items ({taggedItems.length})
                </div>

                {/* Placed Item Pins */}
                {taggedItems.map((item) => (
                  <div
                    key={item.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-10"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-white grid place-items-center shadow-glow animate-bounce">
                      <Shirt size={12} />
                    </div>
                    <div className="absolute left-7 top-0 bg-black/95 backdrop-blur border border-primary/50 rounded-lg p-2 text-xs shadow-xl min-w-[120px]">
                      <div className="font-bold text-white">{item.name}</div>
                      {item.brand && <div className="text-[10px] text-primary">{item.brand}</div>}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(item.id)}
                        className="text-[10px] text-destructive hover:underline mt-1 flex items-center gap-0.5"
                      >
                        <Trash2 size={10} /> Delete pin
                      </button>
                    </div>
                  </div>
                ))}

                {/* Pending tag placement marker */}
                {pendingTagCoord && (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-yellow-400 text-black grid place-items-center z-20 shadow-lg"
                    style={{ left: `${pendingTagCoord.x}%`, top: `${pendingTagCoord.y}%` }}
                  >
                    <Plus size={14} />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto">
                  <UploadCloud size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Upload your daily fit</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    High quality vertical (3:4 or 9:16) format recommended
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <ImageIcon size={14} /> Choose File
                  </button>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="bg-panel border border-border hover:border-primary text-foreground px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Camera size={14} /> Take Photo
                  </button>
                </div>

                <p className="text-[11px] text-muted-foreground">PNG, JPG, HEIC, WebP up to 25MB</p>
              </div>
            )}
          </div>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Pending Tag Input Modal/Card */}
          {pendingTagCoord && (
            <div className="panel p-4 border-primary/50 bg-primary/5 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Shirt size={14} className="text-primary" /> Tag garment at this position
                </span>
                <button
                  type="button"
                  onClick={() => setPendingTagCoord(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Item name (e.g. Bomber Jacket)"
                  value={tagItemName}
                  onChange={(e) => setTagItemName(e.target.value)}
                  className="input-dark-plain text-xs"
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Brand (e.g. Stüssy, Vintage)"
                  value={tagItemBrand}
                  onChange={(e) => setTagItemBrand(e.target.value)}
                  className="input-dark-plain text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveTag}
                disabled={!tagItemName.trim()}
                className="w-full btn-pink py-1.5 text-xs font-semibold disabled:opacity-50"
              >
                Save Pin Tag
              </button>
            </div>
          )}

          {/* Tagged Items List */}
          {taggedItems.length > 0 && (
            <div className="panel p-3.5 space-y-2">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                <span>Tagged Pieces ({taggedItems.length})</span>
              </div>
              <div className="divide-y divide-border/40">
                {taggedItems.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-foreground">{item.name}</span>
                      {item.brand && (
                        <span className="text-primary ml-2 font-medium">@{item.brand}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(item.id)}
                      className="text-muted-foreground hover:text-destructive transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informational Card */}
          <div className="panel p-4 bg-muted/20 border-border text-xs text-muted-foreground flex gap-3 items-start">
            <Lightbulb size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">FitStreak Pro Tip:</strong> Posting your outfit
              before 6 PM increases friend engagement by 40% and guarantees your flame streak
              multiplier!
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Metadata & Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Caption */}
          <div className="panel p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Caption & Description
              </label>
              <span
                className={`text-xs ${caption.length > 200 ? "text-destructive" : "text-muted-foreground"}`}
              >
                {caption.length}/220
              </span>
            </div>
            <textarea
              maxLength={220}
              rows={3}
              placeholder="What are you rocking today? (e.g. Earth tones with vintage denim ✨)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary resize-none transition"
            />
          </div>

          {/* Tags */}
          <div className="panel p-4 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Hash size={14} className="text-primary" /> Hashtags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1"
                >
                  {t}
                  <button type="button" onClick={() => toggleTag(t)} className="hover:text-white">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-muted-foreground block mb-1.5">
                Suggested tags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedTags.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleTag(st)}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition ${
                      tags.includes(st)
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Type custom tag & press Enter..."
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              onKeyDown={handleAddCustomTag}
              className="input-dark-plain text-xs"
            />
          </div>

          {/* Category Selection */}
          <div className="panel p-4 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Shirt size={14} className="text-primary" /> Style Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Streetwear", "Casual", "Formal"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 rounded-xl text-xs font-bold transition border ${
                    category === cat
                      ? "bg-primary/20 border-primary text-primary shadow-glow"
                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="panel p-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" /> Location Tag
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. SoHo, New York"
              className="input-dark-plain text-xs"
            />
          </div>

          {/* Submit Actions */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-pink py-3 text-base font-bold flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
            >
              <Flame size={18} fill="currentColor" />{" "}
              {isSubmitting ? "Posting..." : "Post Outfit & Keep Streak"}
            </button>
            <button
              type="button"
              onClick={() => {
                toast.info("Draft saved locally!");
                router.history.back();
              }}
              className="w-full bg-panel hover:bg-muted text-muted-foreground py-2.5 rounded-xl text-xs font-semibold transition"
            >
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
