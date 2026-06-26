import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft, Image as ImageIcon, Video, X, Play, Maximize2, UploadCloud, Lightbulb, ChevronRight, Hash, MapPin, Shirt, ChevronDown, Lock, Send, Bookmark, Smile, Flame } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/post")({
  head: () => ({ meta: [{ title: "Create Post — FitStreak" }] }),
  component: PostPage,
});

function Toggle({ on=true }: { on?: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-full relative ${on?"bg-primary":"bg-muted"}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${on?"right-0.5":"left-0.5"}`} />
    </div>
  );
}

function PostPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"Photo"|"Video">("Video");
  const [tags, setTags] = useState(["#streetwear","#allblack","#ootd"]);
  const [cat, setCat] = useState("Streetwear");
  const [advanced, setAdvanced] = useState({ comments: true, likes: true, gallery: false });

  return (
    <AppLayout>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={()=>router.history.back()} className="p-2 rounded-lg hover:bg-muted"><ArrowLeft size={18}/></button>
        <h1 className="text-xl font-bold">Create Post</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT - Media */}
        <div className="space-y-4">
          <div className="panel p-2 grid grid-cols-2 gap-2">
            {(["Photo","Video"] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} className={`py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${mode===m?"bg-primary text-white":"text-muted-foreground"}`}>
                {m==="Photo"?<ImageIcon size={16}/>:<Video size={16}/>}{m}
              </button>
            ))}
          </div>

          <div className="panel overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-zinc-700 via-zinc-900 to-black relative">
              <button className="absolute top-3 left-3 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"><X size={12}/>Remove</button>
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs">0:27</span>
            </div>
            <div className="p-3 flex items-center gap-3">
              <button className="text-muted-foreground"><Play size={18}/></button>
              <div className="flex-1 h-1 bg-muted rounded-full"><div className="h-full w-full bg-primary rounded-full"/></div>
              <span className="text-xs text-muted-foreground">0:27 / 0:27</span>
              <Maximize2 size={14} className="text-muted-foreground"/>
            </div>
          </div>

          <button className="panel w-full p-6 border-2 border-dashed border-primary/40 grid place-items-center text-center hover:bg-primary/5">
            <UploadCloud size={28} className="text-primary mb-2"/>
            <div className="font-semibold text-sm">Tap to upload</div>
            <div className="text-xs text-muted-foreground mt-1">MP4, MOV up to 60s • Max 100MB</div>
          </button>

          <div className="panel p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary grid place-items-center"><Lightbulb size={16}/></div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Tips for great posts</div>
              <div className="text-xs text-muted-foreground">Good lighting, full outfit visible, and clean background get more love!</div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground"/>
          </div>
        </div>

        {/* RIGHT - Metadata */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2"><label className="font-semibold">Caption</label><span className="text-xs text-muted-foreground">0/220</span></div>
            <div className="relative">
              <textarea rows={4} className="input-dark-plain resize-none" placeholder="What's your fit today?
#ootd #streetwear #vibes" />
              <Smile size={16} className="absolute bottom-3 right-3 text-muted-foreground"/>
            </div>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2"><Hash size={16}/>Add Tags</label>
            <div className="relative">
              <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input className="input-dark" placeholder="Add up to 10 tags"/>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map(t=>(
                <span key={t} className="bg-primary/15 text-primary text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                  {t}<button onClick={()=>setTags(tags.filter(x=>x!==t))}><X size={12}/></button>
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Popular: <span className="text-foreground/80">#streetwear #casual #minimal #vintage</span></p>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2"><MapPin size={16}/>Location</label>
            <button className="input-dark-plain text-left flex items-center justify-between text-muted-foreground">
              Add location <ChevronRight size={16}/>
            </button>
          </div>

          <div>
            <label className="font-semibold mb-2 block">Outfit Category</label>
            <div className="grid grid-cols-3 gap-3">
              {["Streetwear","Casual","Formal"].map(c=>(
                <button key={c} onClick={()=>setCat(c)} className={`panel p-4 flex flex-col items-center gap-2 ${cat===c?"border-primary ring-1 ring-primary":""}`}>
                  <Shirt size={22} className={cat===c?"text-primary":""}/>
                  <span className={`text-sm ${cat===c?"text-primary":""}`}>{c}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold mb-2 block">Who can see this?</label>
            <button className="input-dark-plain text-left flex items-center justify-between">
              <span className="flex items-center gap-3"><Lock size={16}/><span><div className="text-sm">Everyone</div><div className="text-xs text-primary">Public post</div></span></span>
              <ChevronDown size={16}/>
            </button>
          </div>

          <div className="panel p-4">
            <button className="flex items-center justify-between w-full">
              <span className="font-semibold">Advanced Options</span>
              <ChevronDown size={16}/>
            </button>
            <div className="space-y-3 mt-4">
              {[
                ["comments","Allow Comments"],
                ["likes","Allow Likes"],
                ["gallery","Save to gallery"],
              ].map(([k,label])=>(
                <div key={k} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <button onClick={()=>setAdvanced(a=>({...a,[k]:!a[k as keyof typeof a]}))}>
                    <Toggle on={advanced[k as keyof typeof advanced]} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button className="btn-pink w-full py-3.5 flex items-center justify-center gap-2 text-base"><Send size={18}/>Post Outfit</button>
            <button className="panel w-full py-3.5 flex items-center justify-center gap-2 text-sm hover:bg-muted"><Bookmark size={16}/>Save as Draft</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
