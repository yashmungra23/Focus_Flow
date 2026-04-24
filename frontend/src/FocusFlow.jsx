import { useState, useEffect, useRef, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

import API_BASE from "./config";
if (!document.getElementById("ff2-styles")) {
    const el = document.createElement("style");
    el.id = "ff2-styles";
    el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=Nunito+Sans:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
    .ff2 * { box-sizing: border-box; margin: 0; padding: 0; }
    .ff2 { font-family: 'Nunito Sans', sans-serif; background: #f5f0e8; color: #1c2b1a; min-height: 100vh; display: flex; flex-direction: column; }
    .ff2-topbar { background: #1c2b1a; min-height: 58px; display: flex; align-items: center; padding: 0 28px; position: sticky; top: 0; z-index: 100; flex-shrink: 0; flex-wrap: wrap; }
    .ff2-logo { font-family: 'Fraunces', serif; font-weight: 700; font-size: 21px; color: #e8c97d; letter-spacing: -0.4px; margin-right: 36px; display: flex; align-items: center; }
    .ff2-logo span { color: rgba(232, 201, 125, 0.4); font-weight: 300; font-style: italic; }
    .ff2-nav { height: 58px; display: flex; align-items: center; gap: 7px; padding: 0 16px; font-size: 13px; font-weight: 600; color: rgba(232, 220, 196, 0.35); cursor: pointer; border-bottom: 2px solid transparent; transition: all .18s; letter-spacing: .2px; white-space: nowrap; }
    .ff2-nav:hover { color: rgba(232, 220, 196, 0.65); }
    .ff2-nav.on { color: #e8c97d; border-bottom-color: #e8c97d; }
    .ff2-top-right { flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 20px; flex-wrap: wrap; }
    .ff2-tstat { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
    .ff2-tstat span:first-child { font-size: 10px; color: rgba(232, 220, 196, 0.28); letter-spacing: .8px; text-transform: uppercase; }
    .ff2-tstat span:last-child { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; color: #e8c97d; }
    .ff2-div { width: 1px; height: 28px; background: rgba(255, 255, 255, 0.06); }
    .ff2-page { flex: 1; padding: 32px 36px; margin: 0 auto; max-width: 1120px; width: 100%; box-sizing: border-box; }
    .ff2-card { background: #fffdf7; border: 1px solid #e2d9c8; border-radius: 16px; padding: 24px; box-sizing: border-box; width: 100%; }
    .ff2-card-dark { background: #1c2b1a; border: 1px solid rgba(232, 201, 125, 0.12); border-radius: 16px; padding: 24px; color: #e8dcc4; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    .ff2-surf { background: #f0ebe0; border: 1px solid #ddd5c5; border-radius: 12px; padding: 16px 18px; box-sizing: border-box; }
    .ff2-display { font-family: 'Fraunces', serif; }
    .ff2-mono { font-family: 'JetBrains Mono', monospace; }
    .ff2-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: none; border-radius: 10px; padding: 10px 20px; font-family: 'Nunito Sans', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .15s; letter-spacing: .2px; white-space: nowrap; }
    .ff2-primary { background: #2d4a2a; color: #e8c97d; } .ff2-primary:hover { background: #3a5e36; } .ff2-primary:disabled { opacity: .4; cursor: default; }
    .ff2-ghost { background: transparent; border: 1px solid #c8bfac; color: #5a6b58; } .ff2-ghost:hover { background: #f0ebe0; border-color: #a89f8e; }
    .ff2-amber { background: rgba(201, 150, 62, 0.1); border: 1px solid rgba(201, 150, 62, 0.28); color: #8a6520; } .ff2-amber:hover { background: rgba(201, 150, 62, 0.18); }
    .ff2-danger { background: rgba(180, 60, 40, 0.07); border: 1px solid rgba(180, 60, 40, 0.18); color: #9b3f30; } .ff2-danger:hover { background: rgba(180, 60, 40, 0.13); }
    .ff2-input { background: #f8f4ec; border: 1px solid #d0c8b8; border-radius: 10px; padding: 9px 13px; color: #1c2b1a; font-family: 'Nunito Sans', sans-serif; font-size: 13.5px; outline: none; width: 100%; transition: border-color .18s, box-shadow .18s; box-sizing: border-box; }
    .ff2-input:focus { border-color: #5a7d52; box-shadow: 0 0 0 3px rgba(90, 125, 82, .1); }
    .ff2-input::placeholder { color: #b5ac9c; }
    .ff2-input option { background: #f8f4ec; }
    .ff2-chip { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: .3px; }
    .chip-h { background: rgba(160, 50, 30, .1); color: #8c3520; }
    .chip-m { background: rgba(180, 130, 20, .12); color: #7a5c10; }
    .chip-l { background: rgba(50, 120, 60, .1); color: #2d6e38; }
    .ff2-task-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .ff2-task-info { display: flex; gap: 16px; font-size: 11.5px; color: #9aaa98; margin-top: 2px; flex-wrap: wrap; }
    .ff2-task { display: flex; align-items: center; gap: 13px; padding: 12px 16px; background: #fffdf7; border: 1px solid #e2d9c8; border-radius: 12px; margin-bottom: 7px; transition: all .15s; flex-wrap: wrap; }
    .ff2-task:hover { border-color: #c0b8a8; background: #fffef9; }
    .ff2-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
    .ff2-dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 18px; margin-bottom: 22px; align-items: start; }
    .form-row-1 { display: grid; grid-template-columns: 3fr 1fr 1fr; gap: 10px; margin-bottom: 10px; }
    .form-row-2 { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; margin-bottom: 14px; }
    .ff2-timer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
    .ff2-charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 20px; }
    .ff2-history-header-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 2fr; gap: 10px; padding-bottom: 8px; border-bottom: 2px solid #f0ebe0; margin-bottom: 4px; }
    .ff2-history-row-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 2fr; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f5f0e8; font-size: 13px; align-items: center; }
    .ff2-insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .ff2-in { animation: ff2In .28s ease; }
    @keyframes ff2In { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .ff2-scroll::-webkit-scrollbar { width: 3px; }
    .ff2-scroll::-webkit-scrollbar-thumb { background: #c8bfac; border-radius: 4px; }
    .ff2-ai-bubble { background: #fffdf7; border: 1px solid #e2d9c8; border-radius: 4px 16px 16px 16px; padding: 13px 16px; font-size: 13.5px; line-height: 1.7; color: #2a3828; white-space: pre-wrap; max-width: 78%; }
    .ff2-user-bubble { background: #1c2b1a; border-radius: 16px 4px 16px 16px; padding: 13px 16px; font-size: 13.5px; line-height: 1.7; color: #d4e8d0; white-space: pre-wrap; max-width: 78%; }
    .ff2-dots span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #6b8e68; animation: ff2dot 1.2s ease-in-out infinite; }
    .ff2-dots span:nth-child(2) { animation-delay: .2s; }
    .ff2-dots span:nth-child(3) { animation-delay: .4s; }
    @keyframes ff2dot { 0%, 80%, 100% { transform: scale(.5); opacity: .3; } 40% { transform: scale(1); opacity: 1; } }
    .ff2-pill { padding: 9px 18px; border-radius: 24px; cursor: pointer; font-size: 13px; font-weight: 700; border: 1.5px solid transparent; transition: all .15s; font-family: 'Nunito Sans', sans-serif; }
    .ff2-ptrack { height: 6px; background: #e4ddd0; border-radius: 3px; overflow: hidden; width: 100%; }
    .ff2-pfill { height: 100%; border-radius: 3px; transition: width 1s linear; }
    @keyframes ff2glow { 0%, 100% { box-shadow: 0 0 4px 1px rgba(58, 110, 52, .4); } 50% { box-shadow: 0 0 10px 3px rgba(58, 110, 52, .7); } }
    .ff2-live { width: 8px; height: 8px; border-radius: 50%; background: #3a6e34; animation: ff2glow 2s ease-in-out infinite; }
    @media (max-width: 1024px) {
        .ff2-stats-grid { grid-template-columns: repeat(2, 1fr); }
        .ff2-insights-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
        .ff2-topbar { padding: 8px 16px; }
        .ff2-logo { margin-right: 16px; margin-bottom: 8px; }
        .ff2-top-right { flex: initial; margin-left: 0; width: 100%; justify-content: flex-start; gap: 12px; margin-bottom: 8px; }
        .ff2-nav { height: 36px; padding: 0 10px; font-size: 12px; }
        .ff2-page { padding: 24px 16px; }
        .ff2-dashboard-grid { grid-template-columns: 1fr; }
        .ff2-timer-grid { grid-template-columns: 1fr; }
        .ff2-charts-grid { grid-template-columns: 1fr; }
        .form-row-1, .form-row-2 { grid-template-columns: 1fr; }
        .ff2-history-header-grid { display: none; }
        .ff2-history-row-grid { grid-template-columns: 1fr; gap: 4px; padding: 12px 0; border: 1px solid #e2d9c8; border-radius: 8px; padding: 16px; margin-bottom: 12px; background: #fffdf7; }
        .ff2-history-row-grid > span { display: inline-block; width: 100%; }
        .ff2-history-row-grid .ff2-ptrack { margin-top: 8px; }
        .ff2-task { flex-direction: column; align-items: flex-start; gap: 12px; position: relative; }
        .ff2-task-wrapper { width: 100%; padding-left: 32px; }
        .ff2-task > div:first-child { position: absolute; left: 16px; top: 16px; }
        .ff2-task .ff2-btn { width: 100%; margin-top: 8px; }
        .ff2-task .ff2-chip { position: absolute; right: 16px; top: 16px; }
    }
    @media (max-width: 480px) {
        .ff2-stats-grid { grid-template-columns: 1fr; }
        .ff2-ai-bubble, .ff2-user-bubble { max-width: 90%; }
    }
  `;
    document.head.appendChild(el);
}

const MODES = {
    pomodoro: { label: "Pomodoro", work: 25, brk: 5, sub: "25 min · 5 min rest" },
    deep: { label: "Deep Work", work: 50, brk: 10, sub: "50 min · 10 min rest" },
    micro: { label: "Micro", work: 15, brk: 3, sub: "15 min · 3 min rest" },
};
const PRI = {
    high: { label: "High", chip: "chip-h", dot: "#c04030", color: "#8c3520" },
    medium: { label: "Medium", chip: "chip-m", dot: "#c09020", color: "#7a5c10" },
    low: { label: "Low", chip: "chip-l", dot: "#3a8e48", color: "#2d6e38" },
};
const DTAGS = ["📱 Phone", "💬 Message", "🌐 Browsing", "😴 Fatigue", "💭 Mind-wander", "☕ Break early"];
const QUICK = [
    "Analyze my sessions and give me 3 improvements",
    "What deep work techniques fit my patterns?",
    "Build me a personalized weekly study plan",
    "How do I stop procrastinating on hard tasks?",
    "Explain the science behind my distractions",
];

const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const today = () => new Date().toDateString();
const greet = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };

function buildWeek(sessions) {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (6 - i));
        const ds = d.toDateString();
        const day = sessions.filter(s => new Date(s.date).toDateString() === ds);
        return { d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()], mins: day.reduce((a, s) => a + (s.duration || 0), 0), score: day.length ? Math.round(day.reduce((a, s) => a + (s.score || 0), 0) / day.length) : 0 };
    });
}

const TipC = ({ active, payload, label, unit }) => !active || !payload?.length ? null : (
    <div style={{ background: "#1c2b1a", border: "1px solid rgba(232,201,125,0.2)", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontFamily: "Nunito Sans", color: "#d4e8d0" }}>
        <div style={{ color: "rgba(232,201,125,0.5)", marginBottom: 3, fontSize: 11 }}>{label}</div>
        <div style={{ fontWeight: 700, color: "#e8c97d" }}>{payload[0].value}{unit}</div>
    </div>
);

const I = {
    Home: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>,
    Tasks: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    Timer: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>,
    Chart: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></svg>,
    Brain: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.2-4.41A2.5 2.5 0 0 1 4 11a2.5 2.5 0 0 1 2-4.85A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.2-4.41A2.5 2.5 0 0 0 20 11a2.5 2.5 0 0 0-2-4.85A2.5 2.5 0 0 0 14.5 2Z" /></svg>,
    Plus: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Trash: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3,6 5,6 21,6" /><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2" /></svg>,
    Check: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>,
    Play: p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>,
    Pause: p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>,
    Reset: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1,4 1,10 7,10" /><path d="M3.51,15a9,9,0,1,0,.49-4.95" /></svg>,
    Send: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9" /></svg>,
    Warn: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29,3.86L1.82,18a2,2,0,0,0,1.71,3h16.94A2,2,0,0,0,22.18,18L13.71,3.86A2,2,0,0,0,10.29,3.86Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
};

export default function FocusFlow() 
{
    const [page, setPage] = useState("dashboard");
    const [tasks, setTasks] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [poms, setPoms] = useState(0);
    const [msgs, setMsgs] = useState([{ role: "assistant", content: "Welcome to FocusFlow. I'm your AI productivity coach — trained in deep work science, habit formation, and cognitive performance.\n\nI have real-time access to your session data, task list, and focus patterns. What would you like to work on today?" }]);
    const [aiInput, setAiInput] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const chatRef = useRef(null);
    const [mode, setMode] = useState("pomodoro");
    const [running, setRunning] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [secs, setSecs] = useState(MODES.pomodoro.work * 60);
    const [distr, setDistr] = useState([]);
    const [distrIn, setDistrIn] = useState("");
    const [done, setDone] = useState(null);
    const [actTask, setActTask] = useState("");
    const timerRef = useRef(null);
    const blank = { title: "", priority: "medium", deadline: "", estMins: 25, notes: "" };
    const [form, setForm] = useState(blank);
    const [showForm, setShowForm] = useState(false);
    const [filt, setFilt] = useState("active");

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/api/tasks`)
                .then(res => res.json())
                .catch(() => { console.warn("API not reachable"); return []; }),
            fetch(`${API_BASE}/api/sessions`)
                .then(res => res.json())
                .catch(() => { console.warn("API not reachable"); return []; })
        ]).then(([tasksData, sessionsData]) => {
            if (Array.isArray(tasksData)) setTasks(tasksData.map(t => ({ ...t, id: t._id || t.id })));
            if (Array.isArray(sessionsData)) setSessions(sessionsData);
        });
    }, []);


    const finishSession = useCallback(() => {
        clearInterval(timerRef.current); setRunning(false);
        const dur = MODES[mode].work;
        const score = Math.max(10, 100 - distr.length * 12);
        const s = { id: uid(), date: new Date().toISOString(), duration: dur, mode, taskId: actTask, interrupts: [...distr], score };
        fetch(`${API_BASE}/api/sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(s)
        });
        setSessions(p => [...p, s]);
        const np = poms + 1; setPoms(np); try { localStorage.setItem("ff2_poms", String(np)); } catch (_) {}
        setDone(s);
        setOnBreak(true);
        setSecs(MODES[mode].brk * 60);
    }, [mode, distr, actTask, poms]);

    useEffect(() => {
        if (running) { timerRef.current = setInterval(() => setSecs(p => { if (p <= 1) { finishSession(); return 0; } return p - 1; }), 1000); }
        else clearInterval(timerRef.current);
        return () => clearInterval(timerRef.current);
    }, [running, finishSession]);

    const startSess = () => { setDone(null); setRunning(true); };
    const pauseSess = () => setRunning(false);
    const resetSess = () => {
        setRunning(false);
        setOnBreak(false); setSecs(MODES[mode].work * 60);
        setDistr([]); setDone(null);
    };
    const skipBreak = () => {
        setOnBreak(false); setRunning(false);
        setSecs(MODES[mode].work * 60);
        setDistr([]);
    };
    const pickMode = m => { if (running) return; setMode(m); setOnBreak(false); setSecs(MODES[m].work * 60); setDistr([]); setDone(null); };
    const logD = r => setDistr(p => [...p, { reason: r, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);

    const addTask = async () => {
        if (!form.title.trim()) return;

        const newTask = {
            ...form,
            id: uid(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        try {
            const res = await fetch(`${API_BASE}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });
            if (res.ok) {
                const data = await res.json();
                setTasks(prev => [data, ...prev]);
                setForm(blank);
                setShowForm(false);
                return;
            }
        } catch (e) {
            console.warn("API not reachable, using local state");
        }

        setTasks(prev => [newTask, ...prev]);
        setForm(blank);
        setShowForm(false);
    };
    const toggleTask = id => setTasks(p => p.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const deleteTask = id => setTasks(p => p.filter(t => t.id !== id));
    const focusOn = id => { setActTask(id); setPage("timer"); };

    const send = async (text) => {
        const q = (text || aiInput).trim(); if (!q || aiLoading) return;
        setAiInput("");
        const hist = [...msgs, { role: "user", content: q }]; setMsgs(hist); setAiLoading(true);
        const todayS = sessions.filter(s => new Date(s.date).toDateString() === today());
        const allMins = sessions.reduce((a, s) => a + (s.duration || 0), 0);
        const avgScore = sessions.length ? Math.round(sessions.reduce((a, s) => a + (s.score || 0), 0) / sessions.length) : 0;
        const sys = `You are FocusFlow AI Coach — expert in deep work, neuroscience, behavioral productivity, habit formation.

USER LIVE DATA:
• Sessions: ${sessions.length} | Focus minutes: ${allMins} | Avg score: ${avgScore}/100
• Today: ${todayS.length} sessions, ${todayS.reduce((a, s) => a + (s.duration || 0), 0)} min
• Pomodoros: ${poms} | Mode: ${mode}
• Active tasks: ${tasks.filter(t => !t.completed).map(t => `"${t.title}"(${t.priority})`).join(",") || "none"}
• High-priority pending: ${tasks.filter(t => !t.completed && t.priority === "high").length}
• Total distractions: ${sessions.reduce((a, s) => a + (s.interrupts?.length || 0), 0)}

STYLE: Evidence-based, warm, direct. Reference actual data. 130–200 words. End with 🎯 Action Step. Use Cal Newport / Andrew Huberman / BJ Fogg frameworks.`;
        try {
            const res = await fetch(`${API_BASE}/api/ai`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: hist,
                    system: sys
                })
            });

            const data = await res.json();
            const reply = data?.reply || "No response";
            setMsgs(p => [...p, { role: "assistant", content: reply }]);
        } catch { setMsgs(p => [...p, { role: "assistant", content: "Connection issue — please try again." }]); }
        setAiLoading(false);
    };

    useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [msgs, aiLoading]);

    const todayS = sessions.filter(s => new Date(s.date).toDateString() === today());
    const todayMins = todayS.reduce((a, s) => a + (s.duration || 0), 0);
    const todayScore = todayS.length ? Math.round(todayS.reduce((a, s) => a + (s.score || 0), 0) / todayS.length) : 0;
    const doneC = tasks.filter(t => t.completed).length;
    const allMins = sessions.reduce((a, s) => a + (s.duration || 0), 0);
    const allScore = sessions.length ? Math.round(sessions.reduce((a, s) => a + (s.score || 0), 0) / sessions.length) : 0;
    const wk = buildWeek(sessions);
    const total = onBreak ? MODES[mode].brk * 60 : MODES[mode].work * 60;
    const prog = secs / total;
    const R = 100; const CIRC = 2 * Math.PI * R;
    const vis = tasks.filter(t => filt === "all" ? true : filt === "done" ? t.completed : !t.completed);


    const NAV = [
        { id: "dashboard", label: "Home", Icon: I.Home },
        { id: "tasks", label: "Tasks", Icon: I.Tasks },
        { id: "timer", label: "Focus", Icon: I.Timer },
        { id: "analytics", label: "Analytics", Icon: I.Chart },
        { id: "coach", label: "AI Coach", Icon: I.Brain },
    ];

    return (
        <div className="ff2">
            {/* TOP NAV */}
            <div className="ff2-topbar">
                <div className="ff2-logo">
                    <img src="/logo.jpeg" alt="FocusFlow" style={{ width: 32, height: 32, borderRadius: 8, marginRight: 10 }} />
                    Focus<span>flow</span>
                </div>
                {NAV.map(({ id, label, Icon }) => (
                    <div key={id} className={`ff2-nav${page === id ? " on" : ""}`} onClick={() => setPage(id)}>
                        <Icon width={14} height={14} style={{ flexShrink: 0 }} />{label}
                    </div>
                ))}
                <div className="ff2-top-right">
                    <div className="ff2-div" />
                    <div className="ff2-tstat"><span>Today</span><span>{todayMins}m</span></div>
                    <div className="ff2-div" />
                    <div className="ff2-tstat"><span>Score</span><span>{todayScore || "—"}</span></div>
                    <div className="ff2-div" />
                    <div className="ff2-tstat"><span>Poms</span><span>{poms}</span></div>
                </div>
            </div>

            <div className="ff2-page ff2-in">

                {/* ═══ DASHBOARD ═══ */}
                {page === "dashboard" && (
                    <div>
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
                                <h1 className="ff2-display" style={{ fontSize: 34, fontWeight: 600, color: "#1c2b1a", letterSpacing: "-0.6px" }}>{greet()}</h1>
                                <span style={{ fontSize: 13.5, color: "#9aaa98", fontStyle: "italic" }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                            </div>
                            <div style={{ height: 3, width: 60, background: "#2d4a2a", borderRadius: 2 }} />
                        </div>

                        {/* Stats */}
                        <div className="ff2-stats-grid">
                            {[
                                { label: "Focus today", val: `${todayMins}m`, sub: "minutes of deep work", accent: "#2d4a2a" },
                                { label: "Sessions", val: todayS.length, sub: "completed today", accent: "#5a4820" },
                                { label: "Tasks done", val: `${doneC}/${tasks.length}`, sub: "completion rate", accent: "#1a3a2a" },
                                { label: "Focus score", val: todayScore || "—", sub: "quality average", accent: "#3a2810" },
                            ].map(({ label, val, sub, accent }) => (
                                <div key={label} className="ff2-card" style={{ position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: accent, borderRadius: "16px 0 0 16px" }} />
                                    <div style={{ paddingLeft: 8 }}>
                                        <div style={{ fontSize: 11, color: "#a09888", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>{label}</div>
                                        <div className="ff2-display" style={{ fontSize: 36, fontWeight: 600, color: "#1c2b1a", letterSpacing: "-1px", lineHeight: 1 }}>{val}</div>
                                        <div style={{ fontSize: 11.5, color: "#b0a898", marginTop: 5 }}>{sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Middle */}
                        <div className="ff2-dashboard-grid">
                            <div className="ff2-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                                    <div className="ff2-display" style={{ fontSize: 17, fontWeight: 600, color: "#1c2b1a" }}>Active Tasks</div>
                                    <button className="ff2-btn ff2-ghost" style={{ fontSize: 12, padding: "6px 14px" }} onClick={() => setPage("tasks")}>Manage →</button>
                                </div>
                                {tasks.filter(t => !t.completed).slice(0, 5).map(t => (
                                    <div key={t.id} className="ff2-task">
                                        <div onClick={() => toggleTask(t.id)} style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${PRI[t.priority].dot}`, flexShrink: 0, cursor: "pointer" }} />
                                        <div className="ff2-task-wrapper">
                                            <div style={{ fontSize: 13.5, color: "#1c2b1a", fontWeight: 600 }}>{t.title}</div>
                                            {t.deadline && <div style={{ fontSize: 11.5, color: "#9aaa98", marginTop: 2 }}>Due {t.deadline}</div>}
                                        </div>
                                        <span className={`ff2-chip ${PRI[t.priority].chip}`}>{t.priority}</span>
                                        <button className="ff2-btn ff2-ghost" style={{ fontSize: 11.5, padding: "5px 12px" }} onClick={() => focusOn(t.id)}>Focus</button>
                                    </div>
                                ))}
                                {tasks.filter(t => !t.completed).length === 0 && (
                                    <div style={{ textAlign: "center", padding: "24px 0", color: "#b0a898" }}>
                                        <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
                                        <div style={{ fontSize: 13.5 }}>All clear — add tasks to begin</div>
                                    </div>
                                )}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                <div className="ff2-card-dark" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer", padding: 28 }} onClick={() => setPage("timer")}>
                                    <div style={{ fontSize: 42, marginBottom: 14 }}>🌱</div>
                                    <div className="ff2-display" style={{ fontSize: 20, fontWeight: 600, color: "#e8dcc4", marginBottom: 6 }}>Begin Session</div>
                                    <div style={{ fontSize: 12, color: "rgba(232,220,196,0.4)", marginBottom: 20 }}>Enter deep focus</div>
                                    <button className="ff2-btn ff2-primary" style={{ width: "100%", padding: "12px" }}>Start Now</button>
                                </div>
                                <div className="ff2-card" style={{ padding: 20, textAlign: "center" }}>
                                    <div style={{ fontSize: 11, color: "#a09888", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>All-time Pomodoros</div>
                                    <div className="ff2-display ff2-mono" style={{ fontSize: 42, fontWeight: 600, color: "#c9963e", letterSpacing: -1 }}>{poms}</div>
                                    <div style={{ fontSize: 12, color: "#b0a898", marginTop: 4 }}>sessions earned</div>
                                </div>
                            </div>
                        </div>

                        <div className="ff2-card">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
                                <div className="ff2-display" style={{ fontSize: 17, fontWeight: 600, color: "#1c2b1a" }}>Weekly Focus</div>
                                <div style={{ fontSize: 12, color: "#a09888" }}>minutes per day</div>
                            </div>
                            <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={wk} barSize={28}>
                                    <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "#b0a898", fontSize: 12, fontFamily: "Nunito Sans" }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#b0a898", fontSize: 11 }} />
                                    <Tooltip content={<TipC unit="m" />} />
                                    <Bar dataKey="mins" radius={[6, 6, 0, 0]}>{wk.map((_, i) => <Cell key={i} fill={i === 6 ? "#2d4a2a" : "#d4ccbc"} />)}</Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* ═══ TASKS ═══ */}
                {page === "tasks" && (
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
                            <div>
                                <h1 className="ff2-display" style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.5px", color: "#1c2b1a", marginBottom: 4 }}>Task Manager</h1>
                                <p style={{ color: "#9aaa98", fontSize: 13.5 }}>{tasks.filter(t => !t.completed).length} active · {doneC} completed</p>
                            </div>
                            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                <div style={{ display: "flex", background: "#fffdf7", border: "1px solid #e2d9c8", borderRadius: 10, padding: 3, gap: 3 }}>
                                    {["active", "done", "all"].map(f => (
                                        <button key={f} onClick={() => setFilt(f)} style={{ background: filt === f ? "#1c2b1a" : "transparent", color: filt === f ? "#e8c97d" : "#8a8070", border: "none", borderRadius: 8, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontFamily: "Nunito Sans", fontWeight: 700, transition: "all .14s", textTransform: "capitalize" }}>{f}</button>
                                    ))}
                                </div>
                                <button className="ff2-btn ff2-primary" style={{ padding: "9px 18px" }} onClick={() => setShowForm(p => !p)}>
                                    <I.Plus width={14} height={14} /> New Task
                                </button>
                            </div>
                        </div>

                        {showForm && (
                            <div className="ff2-card ff2-in" style={{ marginBottom: 20, border: "1px solid #c8bfac" }}>
                                <div className="ff2-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#1c2b1a" }}>New Task</div>
                                <div className="form-row-1">
                                    <input className="ff2-input" placeholder="What needs to be done?" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} onKeyDown={e => e.key === "Enter" && addTask()} />
                                    <select className="ff2-input" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                                        <option value="high">🔴 High</option><option value="medium">🟡 Medium</option><option value="low">🟢 Low</option>
                                    </select>
                                    <input type="number" className="ff2-input" placeholder="Est. min" value={form.estMins} onChange={e => setForm(p => ({ ...p, estMins: parseInt(e.target.value) || 25 }))} />
                                </div>
                                <div className="form-row-2">
                                    <input type="date" className="ff2-input" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
                                    <input className="ff2-input" placeholder="Notes or context..." value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
                                </div>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <button className="ff2-btn ff2-primary" onClick={addTask}>Add Task</button>
                                    <button className="ff2-btn ff2-ghost" onClick={() => { setShowForm(false); setForm(blank); }}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {["high", "medium", "low"].map(p => {
                            const pts = vis.filter(t => t.priority === p && !t.completed);
                            if (!pts.length) return null;
                            return (
                                <div key={p} style={{ marginBottom: 24 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: PRI[p].dot }} />
                                        <span className="ff2-display" style={{ fontSize: 13.5, fontWeight: 600, color: PRI[p].color }}>{PRI[p].label} Priority</span>
                                        <span style={{ fontSize: 12, color: "#b0a898" }}>({pts.length})</span>
                                    </div>
                                    {pts.map(t => (
                                        <div key={t.id} className="ff2-task">
                                            <div onClick={() => toggleTask(t.id)} style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${PRI[t.priority].dot}`, flexShrink: 0, cursor: "pointer" }} />
                                            <div className="ff2-task-wrapper">
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#1c2b1a" }}>{t.title}</div>
                                                <div className="ff2-task-info">
                                                    {t.deadline && <span>📅 {t.deadline}</span>}
                                                    <span>⏱ ~{t.estMins}m</span>
                                                    {t.notes && <span>📝 {t.notes}</span>}
                                                </div>
                                            </div>
                                            <button className="ff2-btn ff2-ghost" style={{ fontSize: 12, padding: "6px 14px" }} onClick={() => focusOn(t.id)}>Focus →</button>
                                            <button className="ff2-btn ff2-danger" style={{ padding: "8px 10px" }} onClick={() => deleteTask(t.id)}><I.Trash width={13} height={13} /></button>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}

                        {vis.filter(t => t.completed).length > 0 && (
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3a8e48" }} />
                                    <span className="ff2-display" style={{ fontSize: 13.5, fontWeight: 600, color: "#2d6e38" }}>Completed</span>
                                </div>
                                {vis.filter(t => t.completed).map(t => (
                                    <div key={t.id} className="ff2-task" style={{ opacity: .45 }}>
                                        <div onClick={() => toggleTask(t.id)} style={{ width: 20, height: 20, borderRadius: 6, background: "#3a8e48", flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <I.Check width={11} height={11} style={{ color: "#fff" }} />
                                        </div>
                                        <div className="ff2-task-wrapper" style={{ textDecoration: "line-through", color: "#9aaa98", fontSize: 14 }}>{t.title}</div>
                                        <button className="ff2-btn ff2-danger" style={{ padding: "8px 10px" }} onClick={() => deleteTask(t.id)}><I.Trash width={13} height={13} /></button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {vis.length === 0 && (
                            <div style={{ textAlign: "center", padding: "70px 0", color: "#b0a898" }}>
                                <div style={{ fontSize: 48, marginBottom: 14 }}>📋</div>
                                <div className="ff2-display" style={{ fontSize: 20, marginBottom: 6, color: "#5a6b58" }}>No tasks here</div>
                                <div style={{ fontSize: 13.5 }}>Click "New Task" to add something</div>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ TIMER ═══ */}
                {page === "timer" && (
                    <div>
                        <div style={{ marginBottom: 24 }}>
                            <h1 className="ff2-display" style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.5px", color: "#1c2b1a", marginBottom: 4 }}>{onBreak ? "Rest & Recover" : "Deep Focus"}</h1>
                            <p style={{ color: "#9aaa98", fontSize: 13.5, fontStyle: "italic" }}>{onBreak ? "Step away. Let your mind consolidate." : "One task. Total attention. No compromise."}</p>
                        </div>

                        {!running && !onBreak && (
                            <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
                                {Object.entries(MODES).map(([k, m]) => (
                                    <button key={k} className="ff2-pill" onClick={() => pickMode(k)}
                                        style={{ background: mode === k ? "#1c2b1a" : "#fffdf7", color: mode === k ? "#e8c97d" : "#7a8a78", borderColor: mode === k ? "#1c2b1a" : "#d0c8b8" }}>
                                        <div style={{ fontWeight: 700 }}>{m.label}</div>
                                        <div style={{ fontSize: 10.5, opacity: .65, marginTop: 2 }}>{m.sub}</div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="ff2-timer-grid">
                            <div className="ff2-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 40 }}>
                                <div style={{ position: "relative", width: 256, height: 256, marginBottom: 32 }}>
                                    <svg width="256" height="256">
                                        <circle cx="128" cy="128" r={R} fill="none" stroke="#e8e0d2" strokeWidth="10" />
                                        <circle cx="128" cy="128" r={R} fill="none" stroke={onBreak ? "#c9963e" : "#2d4a2a"} strokeWidth="10" strokeLinecap="round"
                                            strokeDasharray={`${prog * CIRC} ${CIRC}`}
                                            style={{ transform: "rotate(-90deg)", transformOrigin: "128px 128px", transition: "stroke-dasharray 1s linear,stroke .5s" }} />
                                    </svg>
                                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                                        <div className="ff2-display ff2-mono" style={{ fontSize: 52, fontWeight: 700, color: onBreak ? "#c9963e" : "#1c2b1a", letterSpacing: -2, lineHeight: 1 }}>{fmt(secs)}</div>
                                        <div style={{ fontSize: 11, color: "#a09888", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 8 }}>{onBreak ? "break" : MODES[mode].label}</div>
                                        {running && !onBreak && <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}><div className="ff2-live" /></div>}
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 24 }}>
                                    <button className="ff2-btn ff2-ghost" style={{ padding: "12px 16px" }} onClick={resetSess}><I.Reset width={15} height={15} /></button>
                                    <button className="ff2-btn ff2-primary" style={{ padding: "14px 44px", fontSize: 16, borderRadius: 14 }} onClick={running ? pauseSess : startSess}>
                                        {running ? <><I.Pause width={17} height={17} /> Pause</> : <><I.Play width={17} height={17} /> {onBreak ? "Take Break" : "Begin"}</>}
                                    </button>
                                    {onBreak && <button className="ff2-btn ff2-ghost" style={{ padding: "12px 16px" }} onClick={skipBreak}>Skip</button>}
                                </div>

                                {!onBreak && (
                                    <div style={{ width: "100%" }}>
                                        <div style={{ fontSize: 11, color: "#a09888", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>Focusing on</div>
                                        <select className="ff2-input" value={actTask} onChange={e => setActTask(e.target.value)}>
                                            <option value="">— Open / general session —</option>
                                            {tasks.filter(t => !t.completed).map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {done && (
                                    <div className="ff2-card ff2-in" style={{ border: "1px solid rgba(45,100,42,0.28)", background: "rgba(45,100,42,0.03)", textAlign: "center", padding: 24 }}>
                                        <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
                                        <div className="ff2-display" style={{ fontSize: 18, fontWeight: 600, color: "#2d6e38", marginBottom: 4 }}>Session Complete!</div>
                                        <div style={{ fontSize: 13.5, color: "#6a8a68" }}>{done.duration} min · Score <span className="ff2-mono" style={{ fontWeight: 700, color: "#2d4a2a" }}>{done.score}/100</span></div>
                                        {done.interrupts.length > 0 && <div style={{ fontSize: 12, color: "#8a7050", marginTop: 4 }}>{done.interrupts.length} distraction(s) logged</div>}
                                    </div>
                                )}

                                <div className="ff2-card" style={{ padding: 20 }}>
                                    <div className="ff2-display" style={{ fontSize: 15, fontWeight: 600, color: "#1c2b1a", marginBottom: 14 }}>Live Stats</div>
                                    {[
                                        ["Today's sessions", todayS.length, "#2d4a2a"],
                                        ["Today's focus time", `${todayMins}m`, "#5a4820"],
                                        ["Session distractions", distr.length, distr.length > 3 ? "#8c3520" : "#2d6e38"],
                                        ["All-time pomodoros", poms, "#7a5c10"],
                                    ].map(([l, v, c]) => (
                                        <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f0ebe0" }}>
                                            <span style={{ fontSize: 13, color: "#7a8a78" }}>{l}</span>
                                            <span className="ff2-mono" style={{ fontWeight: 700, color: c, fontSize: 14 }}>{v}</span>
                                        </div>
                                    ))}
                                </div>

                                {running && !onBreak && (
                                    <div className="ff2-card ff2-in" style={{ padding: 20, border: "1px solid rgba(180,130,20,0.2)" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                            <I.Warn width={14} height={14} style={{ color: "#8a6520" }} />
                                            <span className="ff2-display" style={{ fontSize: 13.5, fontWeight: 600, color: "#8a6520" }}>Log distraction</span>
                                        </div>
                                        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                                            <input className="ff2-input" placeholder="What pulled your focus?" value={distrIn} onChange={e => setDistrIn(e.target.value)}
                                                onKeyDown={e => { if (e.key === "Enter" && distrIn.trim()) { logD(distrIn); setDistrIn(""); } }} style={{ fontSize: 12.5 }} />
                                            <button className="ff2-btn ff2-amber" style={{ padding: "8px 12px", flexShrink: 0 }} onClick={() => { if (distrIn.trim()) { logD(distrIn); setDistrIn(""); } }}>
                                                <I.Plus width={14} height={14} />
                                            </button>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                                            {DTAGS.map(tag => (
                                                <button key={tag} onClick={() => logD(tag)} style={{ background: "rgba(180,130,20,0.07)", border: "1px solid rgba(180,130,20,0.18)", borderRadius: 20, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontFamily: "Nunito Sans", color: "#7a6540" }}>{tag}</button>
                                            ))}
                                        </div>
                                        {distr.length > 0 && (
                                            <div style={{ maxHeight: 100, overflowY: "auto" }} className="ff2-scroll">
                                                {distr.map((d, i) => (
                                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: "1px solid #f0ebe0" }}>
                                                        <span style={{ color: "#3a3020" }}>{d.reason}</span><span style={{ color: "#b0a898" }}>{d.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!running && (
                                    <div className="ff2-surf" style={{ padding: 18 }}>
                                        <div style={{ fontSize: 11, color: "#a09888", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 12 }}>Session checklist</div>
                                        {["Phone silenced or in another room", "One clear intention for this block", "Noise-cancelling or ambient audio ready", "All irrelevant tabs closed", "Water within reach"].map((t, i) => (
                                            <div key={i} style={{ display: "flex", gap: 10, padding: "4px 0", fontSize: 13, color: "#5a6b58" }}>
                                                <span style={{ color: "#3a6e34" }}>✓</span>{t}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ ANALYTICS ═══ */}
                {page === "analytics" && (
                    <div>
                        <div style={{ marginBottom: 26 }}>
                            <h1 className="ff2-display" style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.5px", color: "#1c2b1a", marginBottom: 4 }}>Analytics</h1>
                            <p style={{ color: "#9aaa98", fontSize: 13.5 }}>Your productivity narrative, quantified</p>
                        </div>

                        <div className="ff2-stats-grid">
                            {[
                                ["Total Sessions", sessions.length, "#2d4a2a"],
                                ["Focus Hours", `${(allMins / 60).toFixed(1)}h`, "#5a4820"],
                                ["Avg Score", `${allScore}/100`, "#1a3a2a"],
                                ["Tasks Completed", doneC, "#3a2810"],
                            ].map(([l, v, c]) => (
                                <div key={l} className="ff2-surf" style={{ textAlign: "center", padding: 18 }}>
                                    <div className="ff2-display" style={{ fontSize: 30, fontWeight: 600, color: c, letterSpacing: -0.5 }}>{v}</div>
                                    <div style={{ fontSize: 11.5, color: "#9aaa98", marginTop: 5 }}>{l}</div>
                                </div>
                            ))}
                        </div>

                        <div className="ff2-charts-grid">
                            <div className="ff2-card">
                                <div className="ff2-display" style={{ fontSize: 15, fontWeight: 600, color: "#1c2b1a", marginBottom: 18 }}>Daily Focus Minutes</div>
                                <ResponsiveContainer width="100%" height={190}>
                                    <BarChart data={wk} barSize={24}>
                                        <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "#b0a898", fontSize: 11.5, fontFamily: "Nunito Sans" }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#b0a898", fontSize: 10.5 }} />
                                        <Tooltip content={<TipC unit="m" />} />
                                        <Bar dataKey="mins" radius={[6, 6, 0, 0]} fill="#2d4a2a" fillOpacity={0.75} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="ff2-card">
                                <div className="ff2-display" style={{ fontSize: 15, fontWeight: 600, color: "#1c2b1a", marginBottom: 18 }}>Focus Quality Score</div>
                                <ResponsiveContainer width="100%" height={190}>
                                    <LineChart data={wk}>
                                        <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "#b0a898", fontSize: 11.5, fontFamily: "Nunito Sans" }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#b0a898", fontSize: 10.5 }} domain={[0, 100]} />
                                        <Tooltip content={<TipC unit="/100" />} />
                                        <Line type="monotone" dataKey="score" stroke="#c9963e" strokeWidth={2.5} dot={{ fill: "#c9963e", r: 4, strokeWidth: 0 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="ff2-card" style={{ marginBottom: 20 }}>
                            <div className="ff2-display" style={{ fontSize: 15, fontWeight: 600, color: "#1c2b1a", marginBottom: 18 }}>Session History</div>
                            {sessions.length === 0 ? (
                                <div style={{ textAlign: "center", padding: "30px 0", color: "#b0a898" }}>
                                    <div style={{ fontSize: 32, marginBottom: 8 }}>🌱</div>
                                    <div style={{ fontSize: 13.5 }}>Complete your first session to see history</div>
                                </div>
                            ) : (
                                <>
                                    <div className="ff2-history-header-grid">
                                        {["Date", "Mode", "Duration", "Interrupts", "Quality Score"].map(h => (
                                            <div key={h} style={{ fontSize: 10.5, color: "#a09888", textTransform: "uppercase", letterSpacing: ".7px" }}>{h}</div>
                                        ))}
                                    </div>
                                    {[...sessions].reverse().slice(0, 12).map(s => (
                                        <div key={s.id} className="ff2-history-row-grid">
                                            <span style={{ color: "#7a8a78" }}>{new Date(s.date).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                                            <span style={{ color: "#9aaa98", textTransform: "capitalize" }}>{s.mode}</span>
                                            <span className="ff2-mono" style={{ color: "#2d4a2a", fontWeight: 600 }}>{s.duration}m</span>
                                            <span className="ff2-mono" style={{ color: (s.interrupts?.length || 0) > 2 ? "#8c3520" : "#2d6e38", fontWeight: 600 }}>{s.interrupts?.length || 0}</span>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div className="ff2-ptrack" style={{ flex: 1 }}>
                                                    <div className="ff2-pfill" style={{ width: `${s.score}%`, background: s.score > 70 ? "#2d4a2a" : s.score > 40 ? "#c9963e" : "#8c3520" }} />
                                                </div>
                                                <span className="ff2-mono" style={{ fontSize: 12, fontWeight: 700, color: s.score > 70 ? "#2d4a2a" : s.score > 40 ? "#c9963e" : "#8c3520" }}>{s.score}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="ff2-insights-grid">
                            {[
                                {
                                    icon: "📈", title: "Focus Pattern", accent: "#2d4a2a",
                                    text: sessions.length < 2 ? "Log at least 2 sessions to see your pattern insight." : allScore >= 75 ? `Outstanding avg score of ${allScore}/100. You're consistently achieving deep work. Focus on increasing total weekly volume.` : allScore >= 50 ? `Avg score ${allScore}/100. Build consistency first — reduce session length temporarily to 15–20 min, then extend.` : `Score: ${allScore}/100. Start with 15-min Micro sessions. Small wins build real momentum.`
                                },
                                {
                                    icon: "⚡", title: "Best Strategy", accent: "#5a4820",
                                    text: sessions.length === 0 ? "Complete sessions to discover your optimal mode." :
                                        (() => { const c = { pomodoro: 0, deep: 0, micro: 0 }; sessions.forEach(s => { if (c[s.mode] !== undefined) c[s.mode]++; }); const best = Object.entries(c).sort((a, b) => b[1] - a[1])[0]; return `${MODES[best[0]].label} is your most-used mode (${best[1]}×). ${best[0] === "deep" ? "Deep Work builds the strongest cognitive momentum for complex tasks." : "Consider 50-min Deep Work sessions for analytically demanding work."}`; })()
                                },
                                {
                                    icon: "🎯", title: "Task Velocity", accent: "#1a3a2a",
                                    text: tasks.length === 0 ? "Add tasks to unlock this insight." : `${Math.round((doneC / tasks.length) * 100) || 0}% completion rate. ${tasks.filter(t => !t.completed && t.priority === "high").length > 0 ? `${tasks.filter(t => !t.completed && t.priority === "high").length} high-priority item(s) pending — schedule these during your next peak energy window.` : "All urgent tasks clear. Add new challenges to maintain momentum."}`
                                },
                            ].map(({ icon, title, text, accent }) => (
                                <div key={title} className="ff2-card" style={{ borderTop: `3px solid ${accent}`, padding: 20 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                        <span style={{ fontSize: 18 }}>{icon}</span>
                                        <span className="ff2-display" style={{ fontSize: 14, fontWeight: 600, color: "#1c2b1a" }}>{title}</span>
                                    </div>
                                    <div style={{ fontSize: 12.5, color: "#6a7868", lineHeight: 1.7 }}>{text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ AI COACH ═══ */}
                {page === "coach" && (
                    <div style={{ height: "calc(100vh - 130px)", display: "flex", flexDirection: "column" }}>
                        <div style={{ marginBottom: 16 }}>
                            <h1 className="ff2-display" style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.5px", color: "#1c2b1a", marginBottom: 4 }}>AI Coach</h1>
                            <p style={{ color: "#9aaa98", fontSize: 13.5 }}>Personalized coaching · Powered by Claude · Knows your data</p>
                        </div>

                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                            {QUICK.map((q, i) => (
                                <button key={i} onClick={() => send(q)} disabled={aiLoading}
                                    style={{ background: "#fffdf7", border: "1px solid #d4ccbc", borderRadius: 20, padding: "5px 14px", color: "#6a7868", fontSize: 11.5, cursor: "pointer", fontFamily: "Nunito Sans", fontWeight: 600, transition: "all .14s", whiteSpace: "nowrap" }}>
                                    {q.length > 38 ? q.slice(0, 38) + "…" : q}
                                </button>
                            ))}
                        </div>

                        <div ref={chatRef} className="ff2-scroll" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, marginBottom: 14, paddingRight: 4 }}>
                            {msgs.map((m, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                                    <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: m.role === "user" ? "#f0ebe0" : "#1c2b1a", border: m.role === "user" ? "1px solid #d4ccbc" : "1px solid rgba(232,201,125,0.2)", fontSize: 16 }}>
                                        {m.role === "user" ? "👤" : "🌿"}
                                    </div>
                                    <div className={m.role === "user" ? "ff2-user-bubble" : "ff2-ai-bubble"}>{m.content}</div>
                                </div>
                            ))}
                            {aiLoading && (
                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1c2b1a", border: "1px solid rgba(232,201,125,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌿</div>
                                    <div style={{ background: "#fffdf7", border: "1px solid #e2d9c8", borderRadius: "4px 16px 16px 16px", padding: "14px 18px" }}>
                                        <div className="ff2-dots" style={{ display: "flex", gap: 5 }}><span /><span /><span /></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                            <input className="ff2-input" placeholder="Ask about deep work, procrastination, study habits, time management..."
                                value={aiInput} onChange={e => setAiInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                                disabled={aiLoading} style={{ fontSize: 13.5, padding: "13px 16px" }} />
                            <button className="ff2-btn ff2-primary" style={{ padding: "0 24px", flexShrink: 0 }} onClick={() => send()} disabled={aiLoading || !aiInput.trim()}>
                                <I.Send width={14} height={14} /> Send
                            </button>
                        </div>
                        <div style={{ marginTop: 10, fontSize: 11, color: "#c0b8ac", textAlign: "center" }}>
                            AI Coach has live access to your session history, task list, and behavioral patterns
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}