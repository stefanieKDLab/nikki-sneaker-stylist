import { useState, useRef, useEffect } from "react";

const STYLE_OPTIONS = [
  { id: "streetwear", label: "Streetwear / Hype", icon: "🔥" },
  { id: "athletic", label: "Athletic / Performance", icon: "⚡" },
  { id: "lifestyle", label: "Lifestyle / Everyday", icon: "☁️" },
  { id: "editorial", label: "Fashion-Forward / Editorial", icon: "✦" },
  { id: "retro", label: "Classic / Retro", icon: "◈" },
];

const BUDGET_OPTIONS = [
  { id: "under100", label: "Under $100" },
  { id: "100to150", label: "$100 – $150" },
  { id: "150to250", label: "$150 – $250" },
  { id: "250plus", label: "$250+" },
];

const NIKE_CATALOG = [
  { name: "Nike Air Force 1 '07", price: 110, styles: ["streetwear","lifestyle","retro"], features: "Clean leather upper, classic cushioning, timeless low-top silhouette.", wearWith: "Baggy denim, cargo pants, or a monochrome tracksuit.", whereTo: "Coffee runs, weekend errands, casual dinners, rooftop hangouts.", nikeUrl: "https://www.nike.com/w?q=air+force+1+07&vst=air+force+1+07", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211b-5b5a-4001-b4b0-b4f5e6f3bee8/air-force-1-07-mens-shoes-jBrhbr.png" },
  { name: "Nike Dunk Low Retro", price: 115, styles: ["streetwear","retro","lifestyle"], features: "Padded collar, multi-panel leather upper, rubber waffle outsole.", wearWith: "Wide-leg trousers, oversized hoodies, or vintage graphic tees.", whereTo: "Art gallery openings, brunch spots, skate parks, city streets.", nikeUrl: "https://www.nike.com/w?q=dunk+low+retro&vst=dunk+low+retro", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9720818d-9a30-4b7e-9079-3fa485a0e5cd/dunk-low-retro-mens-shoes-76KnBL.png" },
  { name: "Nike Pegasus 42", price: 130, styles: ["athletic","lifestyle"], features: "React foam cushioning, breathable mesh upper, reliable everyday trainer.", wearWith: "Running tights, training shorts, or casual joggers.", whereTo: "Morning runs, the gym, trail walks, post-workout errands.", nikeUrl: "https://www.nike.com/w?q=pegasus+42&vst=pegasus+42", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c0ca6d7d-fc28-4f51-bd37-3a2bcdc1a5f9/pegasus-42-road-running-shoes.png" },
  { name: "Nike Pegasus Premium", price: 160, styles: ["athletic","lifestyle","editorial"], features: "Elevated Pegasus with ZoomX foam, premium materials and a refined ride.", wearWith: "Sleek training sets, slim joggers, or an elevated athleisure look.", whereTo: "Long runs, travel days, gym sessions, upscale casual outings.", nikeUrl: "https://www.nike.com/w?q=pegasus+premium&vst=pegasus+premium", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e03e0072-6b82-4429-9a78-85fcfbc36e9c/pegasus-premium-road-running-shoes.png" },
  { name: "Nike Air Max 90", price: 130, styles: ["retro","lifestyle","streetwear"], features: "Visible Max Air heel unit, iconic TPU overlays, waffle outsole.", wearWith: "Straight-leg jeans, windbreakers, or a clean linen set.", whereTo: "Street markets, weekend travel, concerts, casual Fridays at work.", nikeUrl: "https://www.nike.com/w?q=air+max+90&vst=air+max+90", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-4356b928-a5a7-4e7c-a47b-6e8cc7d97e8b/air-max-90-mens-shoes-6n3vKB.png" },
  { name: "Nike Vomero 18", price: 160, styles: ["athletic","lifestyle","editorial"], features: "ZoomX foam stack, plush cushioned ride, futuristic high-stack profile.", wearWith: "Techwear fits, slim joggers, or an oversized blazer.", whereTo: "Long runs, airport travel, fashion-forward city days, errands.", nikeUrl: "https://www.nike.com/w?q=vomero+18&vst=vomero+18", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1617a626-3db1-4e39-b134-0d39c59e7090/vomero-18-road-running-shoes.png" },
  { name: "Nike Vomero Plus", price: 145, styles: ["athletic","lifestyle"], features: "React foam, extra cushioning stack, smooth and protective daily ride.", wearWith: "Training tights, casual joggers, or relaxed athleisure sets.", whereTo: "Daily runs, gym sessions, errands, casual weekend days.", nikeUrl: "https://www.nike.com/w?q=vomero+plus&vst=vomero+plus", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8e3b8d81-4f65-49b7-aadc-b781e9e5ebce/vomero-plus-mens-shoes.png" },
  { name: "Nike Air Max 1", price: 140, styles: ["retro","lifestyle","editorial"], features: "The original visible Air window, low-profile silhouette, premium leather.", wearWith: "Straight-cut denim, a trench coat, or linen wide-legs.", whereTo: "Museum visits, farmers markets, date nights, everyday rotation.", nikeUrl: "https://www.nike.com/w?q=air+max+1&vst=air+max+1", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a59d1271-0e56-4800-9abd-cbd4027bbb0b/air-max-1-mens-shoes-GQPjGZ.png" },
  { name: "Nike P-6000", price: 110, styles: ["editorial","retro","streetwear"], features: "Y2K-inspired dad shoe profile, chunky sole, archival tech runner aesthetic.", wearWith: "Fitted mini skirts, baggy cargos, or a vintage-inspired coord.", whereTo: "Fashion events, vintage shops, weekend brunch, city exploring.", nikeUrl: "https://www.nike.com/w?q=p-6000&vst=p-6000", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a0a399c4-f9e3-45e8-95a6-56c3e2a3a4d8/p-6000-shoes.png" },
  { name: "Nike Cortez", price: 90, styles: ["retro","lifestyle","editorial"], features: "Heritage runner from 1972, nylon upper, foam midsole, iconic simplicity.", wearWith: "Midi skirts, track pants, or a classic white tee and jeans.", whereTo: "Afternoon walks, casual meetups, weekend markets, travel days.", nikeUrl: "https://www.nike.com/w?q=cortez&vst=cortez", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2ec3657d-3e93-4e1e-bde4-32c5a7d30244/cortez-mens-shoes.png" },
  { name: "Nike Zoom Fly 6", price: 165, styles: ["athletic","editorial"], features: "Carbon fiber plate, React foam, built for race-day speed and energy return.", wearWith: "Racing kits or sleek performance tights.", whereTo: "Race days, tempo runs, training sessions, fitness events.", nikeUrl: "https://www.nike.com/w?q=zoom+fly+6&vst=zoom+fly+6", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d468750f-88a7-4879-a91e-8aee87b8a2c0/zoom-fly-6-road-racing-shoes.png" },
  { name: "Nike Air Jordan 1 Low", price: 110, styles: ["streetwear","retro","lifestyle"], features: "Leather upper, Air-Sole cushioning, low-top take on a basketball legend.", wearWith: "Joggers, midi skirts, loose denim, or a casual hoodie set.", whereTo: "Concerts, sports games, street-style days, any casual occasion.", nikeUrl: "https://www.nike.com/w?q=air+jordan+1+low&vst=air+jordan+1+low", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb7eda84-1db4-4c37-a4dd-e9094ec0a5bf/air-jordan-1-low-shoes.png" },
  { name: "Nike Blazer Mid '77", price: 100, styles: ["retro","editorial","lifestyle"], features: "High-foam midsole, vintage-finish overlays, classic court silhouette.", wearWith: "Pleated trousers, a blazer, wide-leg jeans, or a slip dress.", whereTo: "Gallery nights, work-casual days, coffee dates, shopping trips.", nikeUrl: "https://www.nike.com/w?q=blazer+mid+77&vst=blazer+mid+77", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e9da30ab-3146-4fcf-b5d1-01ad89c59ef6/blazer-mid-77-vintage-mens-shoes.png" },
  { name: "Nike Free Metcon 7", price: 130, styles: ["athletic","lifestyle"], features: "Flexible forefoot, stable heel, built for gym training and cross-training.", wearWith: "Training shorts, gym leggings, or a fitted tank set.", whereTo: "Weight training, HIIT classes, CrossFit, gym sessions.", nikeUrl: "https://www.nike.com/w?q=free+metcon+7&vst=free+metcon+7", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1f812249-2c3b-4766-b3ef-38a3bad98450/free-metcon-7-workout-shoes.png" },
  { name: "Nike Free Metcon 10", price: 140, styles: ["athletic","lifestyle"], features: "Updated Metcon with improved flexibility, wider base and training grip.", wearWith: "Training shorts, gym leggings, or a performance tank set.", whereTo: "Lifting, functional fitness, gym classes, studio workouts.", nikeUrl: "https://www.nike.com/w?q=free+metcon+10&vst=free+metcon+10", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0a62a9ca-7249-4565-8e76-c9f9fa3bdc53/free-metcon-10-workout-shoes.png" },
];

const ACCENT = "#2D7DD2";
const NIKE_ORANGE = "#F05223";
const CARD_BG = ["#e8e6e0","#dddbd4","#e4e2da","#d8d5ce","#e0ded8"];

function scoreSneaker(sneaker, styles, budget) {
  let score = 0;
  score += sneaker.styles.filter(s => styles.includes(s)).length * 30;
  const map = { under100:[0,100], "100to150":[100,150], "150to250":[150,250], "250plus":[250,9999] };
  const [min, max] = map[budget] || [0,9999];
  if (sneaker.price >= min && sneaker.price <= max) score += 40;
  else if (Math.abs(sneaker.price - (min+max)/2) < 50) score += 15;
  return Math.min(score, 100);
}

function ShoeBoxAvatar({ blink, size = 90 }) {
  const vw = 140, vh = 78;
  return (
    <svg width={size} height={Math.round(size * vh / vw)} viewBox={`0 0 ${vw} ${vh}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F87040"/><stop offset="100%" stopColor="#D83A0E"/></linearGradient>
        <linearGradient id="gTop" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F89060"/><stop offset="100%" stopColor="#FFAA70"/></linearGradient>
        <linearGradient id="gSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#BF4015"/><stop offset="100%" stopColor="#9B2E08"/></linearGradient>
        <linearGradient id="gLidF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FA8050"/><stop offset="100%" stopColor="#E04818"/></linearGradient>
        <linearGradient id="gLidT" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F8A070"/><stop offset="100%" stopColor="#FFB880"/></linearGradient>
        <linearGradient id="gLidS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C84818"/><stop offset="100%" stopColor="#A03010"/></linearGradient>
      </defs>
      <polygon points="108,22 126,11 126,47 108,58" fill="url(#gSide)"/>
      <polygon points="8,22 108,22 108,58 8,58" fill="url(#gFront)"/>
      <polygon points="8,22 26,11 126,11 108,22" fill="url(#gTop)"/>
      <polygon points="8,56 108,56 126,45 126,47 108,58 8,58" fill="#7A2008" opacity="0.3"/>
      <polygon points="110,21 128,9 128,-1 110,11" fill="url(#gLidS)"/>
      <polygon points="6,23 110,23 110,11 6,11" fill="url(#gLidF)"/>
      <polygon points="6,11 24,-1 128,-1 110,11" fill="url(#gLidT)"/>
      <line x1="6" y1="23" x2="110" y2="23" stroke="#7A2008" strokeWidth="0.8" opacity="0.7"/>
      <path d="M60,4 C64,2 72,4 69,7 C66,9 58,6 60,4Z" fill="white" opacity="0.8"/>
      <ellipse cx="22" cy="23" rx="5" ry="2.8" fill="#5A1800" opacity="0.8"/>
      <ellipse cx="22" cy="23" rx="3.5" ry="1.8" fill="#1a0500"/>
      {blink ? (
        <>
          <line x1="39" y1="36" x2="49" y2="36" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="67" y1="36" x2="77" y2="36" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <circle cx="44" cy="36" r="5.5" fill="white"/>
          <circle cx="45.2" cy="34.8" r="2.4" fill="#1a0500"/>
          <circle cx="46" cy="34.2" r="0.8" fill="white"/>
          <circle cx="72" cy="36" r="5.5" fill="white"/>
          <circle cx="73.2" cy="34.8" r="2.4" fill="#1a0500"/>
          <circle cx="74" cy="34.2" r="0.8" fill="white"/>
        </>
      )}
      <path d="M47 41 Q58 49 69 41" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <ellipse cx="34" cy="42" rx="5" ry="2.8" fill="#ff5820" opacity="0.25"/>
      <ellipse cx="82" cy="42" rx="5" ry="2.8" fill="#ff5820" opacity="0.25"/>
      <ellipse cx="67" cy="73" rx="50" ry="4" fill="black" opacity="0.12"/>
    </svg>
  );
}

function MiniBoxAvatar() {
  return (
    <svg width="36" height="20" viewBox="0 0 140 78" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0, marginTop:3 }}>
      <polygon points="108,22 126,11 126,47 108,58" fill="#BF4015"/>
      <polygon points="8,22 108,22 108,58 8,58" fill="#F05223"/>
      <polygon points="8,22 26,11 126,11 108,22" fill="#F89060"/>
      <polygon points="110,21 128,9 128,-1 110,11" fill="#C84818"/>
      <polygon points="6,23 110,23 110,11 6,11" fill="#F26030"/>
      <polygon points="6,11 24,-1 128,-1 110,11" fill="#F8A070"/>
      <line x1="6" y1="23" x2="110" y2="23" stroke="#7A2008" strokeWidth="0.8" opacity="0.7"/>
      <path d="M60,4 C64,2 72,4 69,7 C66,9 58,6 60,4Z" fill="white" opacity="0.8"/>
      <ellipse cx="22" cy="23" rx="3.5" ry="1.8" fill="#1a0500"/>
      <circle cx="44" cy="36" r="5.5" fill="white"/>
      <circle cx="45.2" cy="34.8" r="2.4" fill="#1a0500"/>
      <circle cx="72" cy="36" r="5.5" fill="white"/>
      <circle cx="73.2" cy="34.8" r="2.4" fill="#1a0500"/>
      <path d="M47 41 Q58 49 69 41" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <ellipse cx="34" cy="42" rx="5" ry="2.8" fill="#ff5820" opacity="0.25"/>
      <ellipse cx="82" cy="42" rx="5" ry="2.8" fill="#ff5820" opacity="0.25"/>
    </svg>
  );
}

export default function App() {
  const [step, setStep] = useState("welcome");
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [gender, setGender] = useState(null);
  const [useCase, setUseCase] = useState(null);
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blink, setBlink] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, step, results]);
  useEffect(() => {
    const iv = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 160); }, 3500);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    setTimeout(() => addMsg("assistant", "Hii! I'm Nikki, your Nike Sneaker Consultant — here to match you with the right pair for you. Let's find your fit. 👟"), 400);
  }, []);

  const addMsg = (role, content, type = "text") => setMessages(p => [...p, { role, content, type }]);
  const toggleStyle = id => setSelectedStyles(p => p.includes(id) ? p.filter(s => s !== id) : p.length < 3 ? [...p, id] : p);

  const submitStyle = () => {
    if (!selectedStyles.length) return;
    addMsg("user", selectedStyles.map(id => STYLE_OPTIONS.find(o => o.id === id)?.label).join(", "));
    setTimeout(() => { setStep("budget"); addMsg("assistant", "Love that. Now let's talk budget — which range works for you?"); }, 300);
  };
  const submitBudget = () => {
    if (!selectedBudget) return;
    addMsg("user", BUDGET_OPTIONS.find(o => o.id === selectedBudget)?.label);
    setTimeout(() => { setStep("gender"); addMsg("assistant", "Got it! Quick one — who are we shopping for today?"); }, 300);
  };
  const submitGender = g => {
    setGender(g); addMsg("user", g);
    setTimeout(() => { setStep("use"); addMsg("assistant", "Almost there! What's the main vibe — how will you be wearing these?"); }, 300);
  };
  const submitUse = u => {
    setUseCase(u); addMsg("user", u);
    setTimeout(() => generateResults(u), 300);
  };

  const generateResults = async uc => {
    setLoading(true);
    addMsg("assistant", "Give me one sec — pulling your picks from the Nike catalog...", "loading");
    const scored = NIKE_CATALOG.map(s => ({ ...s, score: scoreSneaker(s, selectedStyles, selectedBudget) })).sort((a, b) => b.score - a.score).slice(0, 3);
    const prompt = `You are Nikki, a warm, culturally fluent Nike sneaker stylist. Speak like a knowledgeable best friend — direct, enthusiastic, never salesy.\nCustomer profile:\n- Style: ${selectedStyles.join(", ")}\n- Budget: ${BUDGET_OPTIONS.find(o => o.id === selectedBudget)?.label}\n- Shopping for: ${gender}\n- Use: ${uc}\nWrite a punchy personalized stylist note for each sneaker. Max 2 sentences. Be specific to why it works for THIS person.\n1. ${scored[0].name} ($${scored[0].price})\n2. ${scored[1].name} ($${scored[1].price})\n3. ${scored[2].name} ($${scored[2].price})\nRespond ONLY with a JSON array of 3 objects with "name" and "note" fields. No markdown, no extra text.`;
    try {
      const [aiRes, ...imgRes] = await Promise.all([
        fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) }),
        ...scored.map(s => fetch("/api/images", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: s.name }) }))
      ]);
      const aiData = await aiRes.json();
      const notes = JSON.parse(aiData.content?.[0]?.text?.replace(/```json|```/g, "").trim() || "[]");
      const images = await Promise.all(imgRes.map(r => r.json()));
      setResults(scored.map((s, i) => ({ ...s, note: notes[i]?.note || "", image: images[i]?.image || s.image || null })));
    } catch {
      setResults(scored.map(s => ({ ...s, note: "A strong match for your style profile.", image: s.image || null })));
    }
    setMessages(p => p.filter(m => m.type !== "loading"));
    addMsg("assistant", "Here are your top 3 picks — Nikki-approved. 🧡");
    setStep("results");
    setLoading(false);
  };

  const restart = () => {
    setStep("welcome"); setSelectedStyles([]); setSelectedBudget(null); setGender(null); setUseCase(null); setResults([]); setMessages([]);
    setTimeout(() => { addMsg("assistant", "Welcome back! Ready to find your next pair? Let's go. 👟"); setTimeout(() => { setStep("style"); addMsg("assistant", "What's your style? Pick up to 3 that feel like you."); }, 600); }, 300);
  };

  return (
    <div style={{ height:"100vh", background:"#070c14", display:"flex", flexDirection:"column", fontFamily:"'DM Sans',sans-serif", color:"#e0e8f0", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#1a2535;border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,80%,100%{opacity:.2;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}
        @keyframes bobble{0%,100%{transform:translateY(0) rotate(0deg)}40%{transform:translateY(-4px) rotate(-1.5deg)}70%{transform:translateY(-2px) rotate(1deg)}}
        .bobble{animation:bobble 3.2s ease-in-out infinite}
        .fade{animation:fadeUp .28s ease both}
        .header{padding:10px 18px;border-bottom:1px solid #0f1a26;display:flex;align-items:center;gap:14px;background:rgba(7,12,20,.97);flex-shrink:0}
        .hname{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:4px;color:#e8f0f8}
        .htag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#2D7DD2;font-weight:400;margin-top:2px}
        .nlogo{margin-left:auto;font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:4px;color:#182030}
        .chat{flex:1;overflow-y:auto;padding:16px 18px 8px;display:flex;flex-direction:column;gap:12px;min-height:0}
        .mrow{display:flex;align-items:flex-end;gap:8px}
        .bub{max-width:78%;padding:11px 15px;font-size:14px;line-height:1.55;font-weight:300}
        .bub.a{background:#0c1520;border:1px solid #111e2e;color:#c8d8e8;border-radius:4px 16px 16px 16px}
        .bub.u{background:#2D7DD2;color:#fff;border-radius:16px 4px 16px 16px;font-weight:400}
        .ldot{width:5px;height:5px;border-radius:50%;background:#F05223;animation:pulse 1.2s ease infinite;display:inline-block}
        .ldot:nth-child(2){animation-delay:.2s}.ldot:nth-child(3){animation-delay:.4s}
        .lbub{display:flex;gap:5px;padding:13px 16px;background:#0c1520;border:1px solid #111e2e;border-radius:4px 16px 16px 16px}
        .iarea{flex-shrink:0;padding:14px 18px 18px;border-top:1px solid #1a1008;background:#100d08}
        .hint{font-size:11px;color:#c87040;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;font-weight:500}
        .sgrid{display:flex;flex-direction:column;gap:7px;margin-bottom:12px}
        .schip{display:flex;align-items:center;gap:10px;padding:12px 15px;background:#1c1208;border:1px solid #3a2010;color:#e0c8a0;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;transition:all .15s;border-radius:8px;text-align:left}
        .schip:hover{border-color:#F0522388;color:#ffe0c0;background:#251808}
        .schip.on{background:#2a1400;border-color:#F05223;color:#ffe8d0}
        .ck{margin-left:auto;width:18px;height:18px;border-radius:50%;background:#F05223;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0}
        .bgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px}
        .bcard{padding:16px 12px;background:#1c1208;border:1px solid #3a2010;cursor:pointer;transition:all .15s;border-radius:8px;text-align:center}
        .bcard:hover{border-color:#F0522388;background:#251808}
        .bcard.on{background:#2a1400;border-color:#F05223}
        .blbl{font-size:15px;font-weight:500;color:#e0c8a0;letter-spacing:.3px}
        .bcard.on .blbl{color:#ffe8d0}
        .prow{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
        .pill{padding:10px 18px;background:#1c1208;border:1px solid #3a2010;color:#e0c8a0;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;transition:all .15s;border-radius:50px}
        .pill:hover{border-color:#F0522388;color:#ffe0c0;background:#251808}
        .pill.on{background:#2a1400;border-color:#F05223;color:#ffe8d0}
        .sbtn{width:100%;padding:13px;background:#F05223;color:#fff;border:none;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:3px;transition:all .15s;border-radius:8px}
        .sbtn:hover{background:#d94010}
        .sbtn:disabled{background:#1c1208;color:#3a2010;cursor:not-allowed}
        .rcards{display:flex;flex-direction:column;gap:12px;margin:6px 0 4px;width:100%}
        .rcard{background:#0e1825;border:1px solid #1a2d42;border-radius:12px;overflow:hidden;animation:fadeUp .4s ease both;transition:border-color .2s}
        .rcard:hover{border-color:#2D7DD255}
        .rimgwrap{height:155px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
        .rfallback{font-family:'Bebas Neue',sans-serif;letter-spacing:2px;font-size:19px;text-align:center;padding:0 20px;line-height:1.3;color:#666}
        .rrank-badge{position:absolute;top:0;left:0;right:0;padding:10px 14px;background:linear-gradient(to bottom,rgba(14,24,37,.88),transparent)}
        .rrank-num{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;color:#fff;line-height:1}
        .rrank-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#F05223;font-weight:500}
        .rbody{padding:14px 16px 16px}
        .rname{font-size:16px;font-weight:500;color:#e8f4ff}
        .rprice{font-size:14px;color:#90b0d0;margin-top:4px;font-weight:400}
        .rnote{font-size:13px;color:#7090a8;line-height:1.55;margin-top:8px;font-weight:300;font-style:italic;border-left:2px solid #F0522355;padding-left:10px}
        .drow{margin-top:12px;display:flex;flex-direction:column;gap:7px;padding-top:12px;border-top:1px solid #141e2e}
        .ditem{display:flex;gap:10px;align-items:flex-start;font-size:12px;font-weight:300;line-height:1.45}
        .dlbl{color:#2D7DD2;letter-spacing:1px;text-transform:uppercase;font-size:10px;font-weight:500;min-width:58px;padding-top:1px;flex-shrink:0}
        .dval{color:#8aa8c0}
        .jdi{display:block;width:100%;margin-top:14px;padding:12px 16px;background:transparent;border:1.5px solid #F05223;color:#ffe8d0;font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:4px;cursor:pointer;border-radius:8px;transition:all .15s;text-align:center;text-decoration:none}
        .jdi:hover{background:#F05223;color:#fff}
        .rbtn{background:transparent;border:1px solid #1c1208;color:#3a2010;padding:10px 20px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .15s;border-radius:8px;display:block;width:100%;margin-top:10px}
        .rbtn:hover{border-color:#F0522344;color:#c87040}
        .fnote{font-size:10px;color:#1c1208;text-align:center;letter-spacing:1.5px;text-transform:uppercase;margin-top:10px}
      `}</style>
      <div className="header">
        <div className="bobble"><ShoeBoxAvatar blink={blink} size={90} /></div>
        <div><div className="hname">NIKKI</div><div className="htag">Finds your perfect pair, every time</div></div>
        <div className="nlogo">NIKE</div>
      </div>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className="fade" style={{ display:"flex", flexDirection:"column", alignItems: m.role==="user"?"flex-end":"flex-start" }}>
            {m.role === "assistant" ? (
              <div className="mrow">
                <MiniBoxAvatar />
                {m.type === "loading" ? <div className="lbub"><div className="ldot"/><div className="ldot"/><div className="ldot"/></div> : <div className="bub a">{m.content}</div>}
              </div>
            ) : <div className="bub u">{m.content}</div>}
          </div>
        ))}
        {step === "results" && results.length > 0 && (
          <div className="rcards">
            {results.map((r, i) => (
              <div key={i} className="rcard">
             <div className="rimgwrap" style={{ background: CARD_BG[i % CARD_BG.length] }}>
 {r.image
  ? <img src={r.image} alt={r.name} style={{ height:"130px", objectFit:"contain", padding:"8px" }} onError={e => { e.target.style.display='none' }}/>
  : <div className="rfallback">{r.name}</div>
}
                  <div className="rrank-badge"><div className="rrank-num">#{i+1}</div><div className="rrank-label">{i===0?"Top Pick":i===1?"Runner Up":"Also Great"}</div></div>
                </div>
                <div className="rbody">
                  <div className="rname">{r.name}</div>
                  <div className="rprice">${r.price}</div>
                  {r.note && <p className="rnote">"{r.note}"</p>}
                  <div className="drow">
                    <div className="ditem"><span className="dlbl">The Shoe</span><span className="dval">{r.features}</span></div>
                    <div className="ditem"><span className="dlbl">Wear With</span><span className="dval">{r.wearWith}</span></div>
                    <div className="ditem"><span className="dlbl">Where To</span><span className="dval">{r.whereTo}</span></div>
                  </div>
                  <a href={r.nikeUrl} target="_blank" rel="noopener noreferrer" className="jdi">JUST DO IT ↗</a>
                </div>
              </div>
            ))}
            <button className="rbtn" onClick={restart}>↺ Start Over</button>
            <div className="fnote">Powered by Nikki · Nike Catalog Demo</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="iarea">
        {step === "welcome" && <button className="sbtn" onClick={() => { setStep("style"); addMsg("assistant","Let's start with your style — pick up to 3 that feel like you. ✨"); }}>LET'S FIND YOUR PAIR</button>}
        {step === "style" && (<><div className="hint">Pick up to 3</div><div className="sgrid">{STYLE_OPTIONS.map(o => (<button key={o.id} className={`schip${selectedStyles.includes(o.id)?" on":""}`} onClick={() => toggleStyle(o.id)}><span style={{fontSize:15}}>{o.icon}</span>{o.label}{selectedStyles.includes(o.id) && <span className="ck">✓</span>}</button>))}</div><button className="sbtn" disabled={!selectedStyles.length} onClick={submitStyle}>NEXT</button></>)}
        {step === "budget" && (<><div className="hint">Select your range</div><div className="bgrid">{BUDGET_OPTIONS.map(o => (<button key={o.id} className={`bcard${selectedBudget===o.id?" on":""}`} onClick={() => setSelectedBudget(o.id)}><div className="blbl">{o.label}</div></button>))}</div><button className="sbtn" disabled={!selectedBudget} onClick={submitBudget}>NEXT</button></>)}
        {step === "gender" && (<><div className="hint">Shopping for</div><div className="prow">{["Men's","Women's","Unisex / Both"].map(g => (<button key={g} className={`pill${gender===g?" on":""}`} onClick={() => submitGender(g)}>{g}</button>))}</div></>)}
        {step === "use" && (<><div className="hint">Main vibe</div><div className="prow">{["Everyday Wear","Running","Court / Sport","Going Out","Collecting"].map(u => (<button key={u} className={`pill${useCase===u?" on":""}`} onClick={() => submitUse(u)}>{u}</button>))}</div></>)}
      </div>
    </div>
  );
}
