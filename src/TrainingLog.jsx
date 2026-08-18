import React, { useState, useEffect } from 'react';
import { Dumbbell, Check, ChevronDown, ChevronUp, History, Save, Info, Scale, Plus, Flame, Target, Activity, TrendingUp, TrendingDown, LayoutDashboard, Pencil, Trash2, X, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PROGRAM = {
  push: {
    label: 'Push',
    exercises: [
      { id: 'p1', name: 'Flat Barbell Bench Press', type: 'reps', sets: 4, repMin: 6, repMax: 8, desc: 'Grip slightly wider than shoulders. Lower the bar to mid-chest with control, drive through your feet, press up and slightly back.' },
      { id: 'p2', name: 'DB Lateral Raise', type: 'reps', sets: 4, repMin: 15, repMax: 20, desc: 'Slight bend in the elbows. Raise dumbbells to shoulder height leading with your elbows, not your hands. No swinging.' },
      { id: 'p3', name: 'Arnold Press', type: 'reps', sets: 3, repMin: 8, repMax: 10, desc: 'Start with palms facing you at shoulder height, rotating outward as you press overhead. Control the rotation on the way back down.' },
      { id: 'p4', name: '30° Incline DB Press', type: 'reps', sets: 3, repMin: 8, repMax: 10, desc: 'Set the bench to exactly 30°. Press dumbbells up and slightly inward, full stretch at the bottom of each rep.' },
      { id: 'p5', name: 'Assisted Dip Machine', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: 'Lean forward slightly to bias the chest. Lower until you feel a stretch in the shoulders, press back up without locking out hard.' },
      { id: 'p6', name: 'Low-to-High Cable Fly', type: 'reps', sets: 3, repMin: 12, repMax: 15, desc: 'Set pulleys low. Arc your hands up and together at chest height, squeeze at the top, control the stretch on the way back.' },
      { id: 'p7', name: 'Cable Lateral Raise', type: 'reps', sets: 3, repMin: 15, repMax: 20, desc: 'Stand side-on to the pulley. Raise the handle out to shoulder height across your body, keeping constant tension throughout.' },
      { id: 'p8', name: 'Overhead Rope Tricep Extension', type: 'reps', sets: 3, repMin: 12, repMax: 15, desc: 'Face away from the cable, elbows high and fixed. Extend your forearms overhead, feeling the stretch in the long head at the bottom.' },
      { id: 'p9', name: 'Rope Pushdown', type: 'reps', sets: 3, repMin: 12, repMax: 15, desc: 'Elbows pinned to your sides. Push the rope down and slightly apart at the bottom, squeeze the triceps hard.' },
    ],
  },
  pull: {
    label: 'Pull',
    exercises: [
      { id: 'pl1', name: 'Wide-Grip Lat Pulldown', type: 'reps', sets: 4, repMin: 8, repMax: 10, desc: 'Grip just outside shoulder width. Pull the bar to your upper chest leading with your elbows, squeeze your lats at the bottom.' },
      { id: 'pl2', name: 'Chest-Supported DB Row', type: 'reps', sets: 4, repMin: 8, repMax: 10, desc: 'Chest flat against an incline bench. Row dumbbells to your hips, squeeze your shoulder blades together at the top.' },
      { id: 'pl3', name: 'Straight-Arm Pulldown', type: 'reps', sets: 3, repMin: 12, repMax: 15, desc: 'Keep arms straight, hinge slightly forward. Pull the bar down to your thighs using only your lats, not your arms.' },
      { id: 'pl4', name: 'Seated Cable Row', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: 'Neutral grip. Drive your elbows straight back, keep your chest up, avoid leaning back excessively to move the weight.' },
      { id: 'pl5', name: 'Face Pull', type: 'reps', sets: 3, repMin: 15, repMax: 20, desc: 'Rope at head height. Pull towards your face with elbows high, externally rotating your hands at the end of the movement.' },
      { id: 'pl6', name: 'Reverse Pec Deck Fly', type: 'reps', sets: 3, repMin: 15, repMax: 20, desc: 'Chest against the pad, arms slightly bent. Pull the handles back and out in an arc, squeezing your rear delts.' },
      { id: 'pl7', name: 'Incline DB Curl', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: 'Sit on an incline bench, arms hanging straight down behind your torso. Curl up without swinging your shoulders.' },
      { id: 'pl8', name: 'Preacher Curl', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: 'Upper arms flat on the pad. Curl through a full range of motion, control the lowering phase, avoid locking out hard at the bottom.' },
      { id: 'pl9', name: 'Hammer Curl', type: 'reps', sets: 3, repMin: 12, repMax: 15, desc: 'Neutral grip, palms facing each other. Curl straight up keeping your elbows pinned to your sides.' },
      { id: 'pl10', name: 'Wrist Curl', type: 'reps', sets: 2, repMin: 15, repMax: 20, desc: 'Forearms resting on a bench, palms up. Curl the weight up using only your wrists, full range of motion.' },
      { id: 'pl11', name: 'Reverse Wrist Curl', type: 'reps', sets: 2, repMin: 15, repMax: 20, desc: 'Forearms resting on a bench, palms down. Lift the weight up using only your wrists.' },
    ],
  },
  legs: {
    label: 'Legs',
    exercises: [
      { id: 'l1', name: 'Hip Thrust', type: 'reps', sets: 4, repMin: 10, repMax: 12, desc: 'Upper back on a bench, bar over your hips. Drive through your heels until hips are fully extended, squeeze glutes hard at the top.' },
      { id: 'l2', name: 'Leg Press', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: 'Feet mid-to-wide stance on the platform, knees tracking out over your toes. Lower until knees reach roughly 90°.' },
      { id: 'l3', name: 'Romanian Deadlift', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: 'Soft knees, push your hips back keeping the bar close to your legs. Lower until you feel a hamstring stretch, then drive hips forward to stand.' },
      { id: 'l4', name: 'Leg Extension', type: 'reps', sets: 3, repMin: 15, repMax: 15, desc: 'Sit tall, extend your legs fully without slamming the weight. Pause briefly at the top, lower with control.' },
      { id: 'l5', name: 'Leg Curl', type: 'reps', sets: 3, repMin: 15, repMax: 15, desc: 'Curl the pad towards your glutes. Control the negative on the way back, avoid using momentum to swing the weight.' },
      { id: 'l6', name: 'Standing Calf Raise', type: 'reps', sets: 3, repMin: 15, repMax: 15, desc: 'Full stretch at the bottom. Rise onto your toes as high as possible, pause and squeeze at the top.' },
    ],
  },
  evening: {
    label: 'Evening',
    exercises: [
      { id: 'e1', name: 'Pull-up Negatives', type: 'reps', sets: 3, repMin: 5, repMax: 5, desc: 'Jump or step up to the top position, chin over the bar. Lower yourself down as slowly as possible, aiming for 4-5 seconds per rep.' },
      { id: 'e2', name: 'Dead Hangs', type: 'time', sets: 2, timeMin: 30, timeMax: 40, desc: 'Hang from the bar with arms fully extended, shoulders relaxed but active, not shrugged up. Hold for time.' },
      { id: 'e3', name: 'Parallette Dips', type: 'reps', sets: 3, repMin: 8, repMax: 12, desc: 'Support your body on the parallettes. Lower under control until you feel a stretch in your chest/shoulders, press back up.' },
      { id: 'e4', name: 'L-sit / Tuck Hold', type: 'time', sets: 3, timeMin: 15, timeMax: 20, desc: 'Support your body on the parallettes. Lift your legs (tucked knees to start, straight legs once stronger), keep shoulders pressed down, hold for time.' },
      { id: 'e5', name: 'Hanging Knee/Leg Raises', type: 'reps', sets: 3, repMin: 10, repMax: 15, desc: 'Hang from the bar, raise your knees (or straight legs) towards your chest without swinging. Lower with control.' },
      { id: 'e6', name: 'Plank + Side Plank', type: 'time', sets: 3, timeMin: 30, timeMax: 45, desc: 'Forearm on the ground, body in a straight line from head to heels. Brace your core and hold; repeat on each side.' },
    ],
  },
};

const TABS = ['dashboard', 'push', 'pull', 'legs', 'evening', 'weight'];
const WEEKLY_TARGET = { push: 2, pull: 2, legs: 2, evening: 3 };
const DAY_ORDER = ['push', 'pull', 'legs', 'evening'];

const C = {
  bg: '#14161A',
  panel: '#1C1F26',
  border: '#2B2F38',
  chalk: '#EDEAE3',
  steel: '#8B8F98',
  brass: '#C79A4B',
  success: '#5FA875',
};

function nowISO() {
  return new Date().toISOString();
}

function formatStamp(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch (e) {
    return iso;
  }
}

function formatShort(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function emptySets(ex) {
  if (ex.type === 'time') {
    return Array.from({ length: ex.sets }, () => ({ seconds: '' }));
  }
  return Array.from({ length: ex.sets }, () => ({ weight: '', reps: '' }));
}

function makeId() {
  return 'custom-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}

function blankExercise() {
  return { id: makeId(), name: '', type: 'reps', sets: 3, repMin: 10, repMax: 12, desc: '' };
}

export default function TrainingLog() {
  const [day, setDay] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [sets, setSets] = useState({});
  const [lastRef, setLastRef] = useState({});
  const [history, setHistory] = useState([]);
  const [viewStamp, setViewStamp] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  const [weightEntries, setWeightEntries] = useState([]);
  const [weightInput, setWeightInput] = useState('');
  const [weightStatus, setWeightStatus] = useState('');

  const [streak, setStreak] = useState(0);
  const [weeklyCounts, setWeeklyCounts] = useState({ push: 0, pull: 0, legs: 0, evening: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [dashWeight, setDashWeight] = useState(null);
  const [dashWeightDelta, setDashWeightDelta] = useState(null);

  const [activeExercises, setActiveExercises] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editBuffer, setEditBuffer] = useState([]);
  const [programStatus, setProgramStatus] = useState('');

  const ROTATION = ['push', 'pull', 'legs'];

  useEffect(() => {
    let cancelled = false;
    async function determineStartDay() {
      const latest = {};
      for (const d of ROTATION) {
        try {
          const res = await window.storage.get(`history:${d}`, false);
          if (res && res.value) {
            const hist = JSON.parse(res.value);
            if (Array.isArray(hist) && hist.length > 0) latest[d] = new Date(hist[0]).getTime();
          }
        } catch (e) {
          // no history for this day yet
        }
      }
      const trainedDays = Object.keys(latest);
      let startDay = 'dashboard';
      if (trainedDays.length > 0) {
        const lastDay = trainedDays.reduce((a, b) => (latest[a] > latest[b] ? a : b));
        const nextIndex = (ROTATION.indexOf(lastDay) + 1) % ROTATION.length;
        startDay = ROTATION[nextIndex];
      }
      if (!cancelled) {
        setDay(startDay);
        setInitializing(false);
      }
    }
    determineStartDay();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!day) return;
    let cancelled = false;

    async function loadExerciseDay() {
      setLoading(true);
      let exs = PROGRAM[day].exercises;
      try {
        const res = await window.storage.get(`program:${day}`, false);
        if (res && res.value) {
          const custom = JSON.parse(res.value);
          if (Array.isArray(custom) && custom.length > 0) exs = custom;
        }
      } catch (e) {
        // no custom program saved, use default
      }
      const refs = {};
      for (const ex of exs) {
        try {
          const res = await window.storage.get(`last:${day}:${ex.id}`, false);
          if (res && res.value) refs[ex.id] = JSON.parse(res.value);
        } catch (e) {
          // no reference yet
        }
      }
      const initSets = {};
      exs.forEach((ex) => {
        const base = emptySets(ex);
        const ref = refs[ex.id];
        if (ref && Array.isArray(ref.sets)) {
          for (let i = 0; i < base.length; i++) {
            const prev = ref.sets[i];
            if (!prev) continue;
            if (ex.type === 'time') {
              base[i] = { seconds: prev.seconds !== undefined ? prev.seconds : '' };
            } else {
              base[i] = {
                weight: prev.weight !== undefined ? prev.weight : '',
                reps: prev.reps !== undefined ? prev.reps : '',
              };
            }
          }
        }
        initSets[ex.id] = base;
      });
      let hist = [];
      try {
        const res = await window.storage.get(`history:${day}`, false);
        if (res && res.value) hist = JSON.parse(res.value);
      } catch (e) {
        // no history yet
      }
      if (!cancelled) {
        setSets(initSets);
        setLastRef(refs);
        setHistory(hist);
        setViewStamp(null);
        setViewData(null);
        setStatus('');
        setExpanded({});
        setActiveExercises(exs);
        setEditBuffer(exs);
        setEditMode(false);
        setProgramStatus('');
        setLoading(false);
      }
    }

    async function loadWeight() {
      setLoading(true);
      let entries = [];
      try {
        const res = await window.storage.get('bodyweight:log', false);
        if (res && res.value) entries = JSON.parse(res.value);
      } catch (e) {
        // no entries yet
      }
      if (!cancelled) {
        setWeightEntries(entries);
        setWeightInput('');
        setWeightStatus('');
        setLoading(false);
      }
    }

    async function loadDashboard() {
      setLoading(true);
      const allEntries = [];
      for (const d of DAY_ORDER) {
        let hist = [];
        try {
          const res = await window.storage.get(`history:${d}`, false);
          if (res && res.value) hist = JSON.parse(res.value);
        } catch (e) {
          // no history for this day yet
        }
        hist.forEach((stamp) => allEntries.push({ day: d, timestamp: stamp }));
      }
      allEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const counts = { push: 0, pull: 0, legs: 0, evening: 0 };
      allEntries.forEach((e) => {
        if (new Date(e.timestamp) >= sevenDaysAgo) counts[e.day] += 1;
      });

      const uniqueDates = Array.from(new Set(allEntries.map((e) => new Date(e.timestamp).toDateString())));
      const dateSet = new Set(uniqueDates);
      let streakCount = 0;
      let cursor = new Date();
      if (!dateSet.has(cursor.toDateString())) {
        cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
      }
      while (dateSet.has(cursor.toDateString())) {
        streakCount += 1;
        cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
      }

      let wEntries = [];
      try {
        const res = await window.storage.get('bodyweight:log', false);
        if (res && res.value) wEntries = JSON.parse(res.value);
      } catch (e) {
        // no weight entries yet
      }
      let latestW = null;
      let deltaW = null;
      if (wEntries.length > 0) {
        const sorted = [...wEntries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        latestW = sorted[0].weight;
        const weekAgoEntry = [...wEntries]
          .filter((e) => new Date(e.timestamp) <= sevenDaysAgo)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        if (weekAgoEntry) deltaW = Number((latestW - weekAgoEntry.weight).toFixed(1));
      }

      if (!cancelled) {
        setWeeklyCounts(counts);
        setStreak(streakCount);
        setRecentActivity(allEntries.slice(0, 5));
        setDashWeight(latestW);
        setDashWeightDelta(deltaW);
        setLoading(false);
      }
    }

    if (day === 'weight') {
      loadWeight();
    } else if (day === 'dashboard') {
      loadDashboard();
    } else {
      loadExerciseDay();
    }
    return () => { cancelled = true; };
  }, [day]);

  const updateSet = (exId, idx, field, value) => {
    setSets((prev) => {
      const copy = { ...prev };
      const arr = [...(copy[exId] || [])];
      arr[idx] = { ...arr[idx], [field]: value };
      copy[exId] = arr;
      return copy;
    });
  };

  const toggleDesc = (exId) => {
    setExpanded((prev) => ({ ...prev, [exId]: !prev[exId] }));
  };

  const handleSave = async () => {
    setStatus('saving');
    const stamp = nowISO();
    try {
      await window.storage.set(`session:${day}:${stamp}`, JSON.stringify(sets), false);
      for (const ex of activeExercises) {
        const arr = sets[ex.id] || [];
        const logged = arr.filter((s) => (ex.type === 'time' ? s.seconds !== '' : (s.weight !== '' || s.reps !== '')));
        if (logged.length > 0) {
          await window.storage.set(`last:${day}:${ex.id}`, JSON.stringify({ date: stamp, sets: arr }), false);
        }
      }
      let hist = [stamp, ...history].slice(0, 15);
      await window.storage.set(`history:${day}`, JSON.stringify(hist), false);
      setHistory(hist);
      setStatus('saved');
      setTimeout(() => setStatus(''), 2000);
    } catch (e) {
      setStatus('error');
    }
  };

  const openHistory = async (stamp) => {
    if (viewStamp === stamp) {
      setViewStamp(null);
      setViewData(null);
      return;
    }
    try {
      const res = await window.storage.get(`session:${day}:${stamp}`, false);
      if (res && res.value) {
        setViewData(JSON.parse(res.value));
        setViewStamp(stamp);
      }
    } catch (e) {
      // nothing saved for this entry
    }
  };

  const handleLogWeight = async () => {
    if (weightInput === '' || isNaN(Number(weightInput))) {
      setWeightStatus('empty');
      setTimeout(() => setWeightStatus(''), 2000);
      return;
    }
    setWeightStatus('saving');
    const stamp = nowISO();
    const entry = { timestamp: stamp, weight: Number(weightInput) };
    const updated = [entry, ...weightEntries].slice(0, 200);
    try {
      await window.storage.set('bodyweight:log', JSON.stringify(updated), false);
      setWeightEntries(updated);
      setWeightInput('');
      setWeightStatus('saved');
      setTimeout(() => setWeightStatus(''), 2000);
    } catch (e) {
      setWeightStatus('error');
      setTimeout(() => setWeightStatus(''), 3000);
    }
  };

  const enterEditMode = () => {
    setEditBuffer(activeExercises.map((ex) => ({ ...ex })));
    setEditMode(true);
    setProgramStatus('');
  };

  const cancelEditMode = () => {
    setEditBuffer(activeExercises.map((ex) => ({ ...ex })));
    setEditMode(false);
    setProgramStatus('');
  };

  const updateEditField = (id, field, value) => {
    setEditBuffer((prev) => prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)));
  };

  const addEditExercise = () => {
    setEditBuffer((prev) => [...prev, blankExercise()]);
  };

  const removeEditExercise = (id) => {
    setEditBuffer((prev) => prev.filter((ex) => ex.id !== id));
  };

  const saveProgram = async () => {
    setProgramStatus('saving');
    const cleaned = editBuffer
      .filter((ex) => ex.name.trim() !== '')
      .map((ex) => ({
        ...ex,
        sets: Math.max(1, Number(ex.sets) || 1),
        repMin: ex.type === 'reps' ? Number(ex.repMin) || 1 : undefined,
        repMax: ex.type === 'reps' ? Number(ex.repMax) || Number(ex.repMin) || 1 : undefined,
        timeMin: ex.type === 'time' ? Number(ex.timeMin) || 1 : undefined,
        timeMax: ex.type === 'time' ? Number(ex.timeMax) || Number(ex.timeMin) || 1 : undefined,
      }));
    try {
      await window.storage.set(`program:${day}`, JSON.stringify(cleaned), false);
      setActiveExercises(cleaned);
      setEditBuffer(cleaned);
      const initSets = {};
      cleaned.forEach((ex) => { initSets[ex.id] = emptySets(ex); });
      setSets(initSets);
      setEditMode(false);
      setProgramStatus('saved');
      setTimeout(() => setProgramStatus(''), 1500);
    } catch (e) {
      setProgramStatus('error');
    }
  };

  const resetProgramToDefault = async () => {
    setProgramStatus('saving');
    try {
      await window.storage.delete(`program:${day}`, false);
    } catch (e) {
      // nothing to delete
    }
    const defaults = PROGRAM[day].exercises;
    setActiveExercises(defaults);
    setEditBuffer(defaults.map((ex) => ({ ...ex })));
    const initSets = {};
    defaults.forEach((ex) => { initSets[ex.id] = emptySets(ex); });
    setSets(initSets);
    setEditMode(false);
    setProgramStatus('');
  };



  const exercises = (day === 'weight' || day === 'dashboard') ? [] : activeExercises;

  const chartData = [...weightEntries]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .slice(-20)
    .map((e) => ({ label: formatShort(e.timestamp), weight: e.weight }));

  if (initializing || !day) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, color: C.chalk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap');`}</style>
        <div className="flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.steel, letterSpacing: '0.1em' }}>
          <Dumbbell size={18} color={C.brass} />
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.chalk, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        input:focus, button:focus-visible { outline: 2px solid #C79A4B; outline-offset: 1px; }
        input { min-width: 0; width: 100%; }
      `}</style>

      <div className="max-w-lg mx-auto px-4 pb-28 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <Dumbbell size={18} color={C.brass} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: C.steel }}>
            TRAINING LEDGER
          </span>
        </div>
        <h1 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 30, letterSpacing: '0.02em', margin: '4px 0 20px', textTransform: 'uppercase' }}>
          {day === 'dashboard' ? 'Dashboard' : day === 'weight' ? 'Body Weight' : `${PROGRAM[day].label} ${day === 'evening' ? 'Session' : 'Day'}`}
        </h1>

        <div className="flex gap-2 mb-6" style={{ flexWrap: 'wrap' }}>
          {TABS.map((k) => (
            <button
              key={k}
              onClick={() => setDay(k)}
              style={{
                flex: '1 1 auto',
                minWidth: 52,
                padding: '10px 0',
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                borderRadius: 4,
                border: `1px solid ${day === k ? C.brass : C.border}`,
                background: day === k ? C.brass : 'transparent',
                color: day === k ? '#14161A' : C.steel,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {k === 'dashboard' ? 'Home' : k === 'weight' ? 'Weight' : PROGRAM[k].label}
            </button>
          ))}
        </div>

        {day !== 'dashboard' && day !== 'weight' && !loading && (
          <div className="flex justify-end mb-4">
            {!editMode ? (
              <button
                onClick={enterEditMode}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'transparent', border: `1px solid ${C.border}`, color: C.steel,
                  borderRadius: 4, padding: '6px 12px',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.05em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                <Pencil size={13} /> Customize
              </button>
            ) : (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.brass, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Editing this list
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div style={{ color: C.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, padding: '40px 0', textAlign: 'center' }}>
            Loading...
          </div>
        ) : day === 'dashboard' ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div style={{ flex: 1, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={16} color={C.brass} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: C.steel, textTransform: 'uppercase' }}>Streak</span>
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 30 }}>
                  {streak} <span style={{ fontSize: 14, color: C.steel, fontWeight: 500 }}>day{streak === 1 ? '' : 's'}</span>
                </div>
              </div>
              <div style={{ flex: 1, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
                <div className="flex items-center gap-2 mb-2">
                  <Scale size={16} color={C.brass} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: C.steel, textTransform: 'uppercase' }}>Weight</span>
                </div>
                {dashWeight === null ? (
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.steel }}>No entries</div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 30 }}>{dashWeight}</div>
                    <span style={{ fontSize: 13, color: C.steel }}>kg</span>
                    {dashWeightDelta !== null && (
                      <span
                        className="flex items-center gap-1"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: dashWeightDelta >= 0 ? C.success : C.brass }}
                      >
                        {dashWeightDelta >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {dashWeightDelta >= 0 ? '+' : ''}{dashWeightDelta}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
              <div className="flex items-center gap-2 mb-3">
                <Target size={16} color={C.brass} />
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  This Week
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {DAY_ORDER.map((d) => {
                  const count = weeklyCounts[d];
                  const targetVal = WEEKLY_TARGET[d];
                  const ratio = Math.min(count / targetVal, 1);
                  const met = count >= targetVal;
                  return (
                    <div key={d}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                          {PROGRAM[d].label}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: met ? C.success : C.steel }}>
                          {count} / {targetVal}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: 6, background: C.bg, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${ratio * 100}%`, height: '100%', background: met ? C.success : C.brass, borderRadius: 3, transition: 'width 0.2s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={15} color={C.brass} />
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Recent Activity
                </span>
              </div>
              {recentActivity.length === 0 ? (
                <div style={{ color: C.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Nothing logged yet — go train.</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {recentActivity.map((e, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                      style={{ padding: '8px 0', borderBottom: idx === recentActivity.length - 1 ? 'none' : `1px solid ${C.border}` }}
                    >
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 13, color: C.brass, textTransform: 'uppercase' }}>
                        {PROGRAM[e.day].label}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>{formatStamp(e.timestamp)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : day === 'weight' ? (
          <div className="flex flex-col gap-4">
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
              <div className="flex items-center gap-2 mb-3">
                <Scale size={16} color={C.brass} />
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Log Today's Weight
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="kg"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: C.bg,
                    border: `1px solid ${weightStatus === 'empty' ? C.brass : C.border}`,
                    borderRadius: 4,
                    padding: '10px 12px',
                    color: C.chalk,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 16,
                  }}
                />
                <button
                  onClick={handleLogWeight}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: weightStatus === 'saved' ? C.success : weightStatus === 'error' ? '#B5533C' : C.brass,
                    color: '#14161A',
                    border: 'none',
                    borderRadius: 4,
                    padding: '10px 16px',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={15} />
                  {weightStatus === 'saving' ? 'Saving' : weightStatus === 'saved' ? 'Saved' : weightStatus === 'error' ? 'Error' : 'Log'}
                </button>
              </div>
              {weightStatus === 'empty' && (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.brass, marginTop: 6 }}>
                  Enter a weight first
                </div>
              )}
              {weightStatus === 'error' && (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#B5533C', marginTop: 6 }}>
                  Couldn't save — check your connection and try again
                </div>
              )}
            </div>

            {chartData.length > 1 && (
              <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                  Trend (last {chartData.length})
                </div>
                <div style={{ width: '100%', height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="label" stroke={C.steel} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                      <YAxis stroke={C.steel} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip
                        contentStyle={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 4, fontFamily: 'JetBrains Mono', fontSize: 12 }}
                        labelStyle={{ color: C.chalk }}
                      />
                      <Line type="monotone" dataKey="weight" stroke={C.brass} strokeWidth={2} dot={{ r: 3, fill: C.brass }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>
                Entries
              </div>
              {weightEntries.length === 0 ? (
                <div style={{ color: C.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>No entries logged yet.</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {weightEntries.map((e, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                      style={{ padding: '8px 0', borderBottom: idx === weightEntries.length - 1 ? 'none' : `1px solid ${C.border}` }}
                    >
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.steel }}>{formatStamp(e.timestamp)}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: C.chalk, fontWeight: 700 }}>{e.weight} kg</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : editMode ? (
          <div className="flex flex-col gap-4">
            {editBuffer.map((ex) => (
              <div key={ex.id} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
                  <input
                    type="text"
                    placeholder="Exercise name"
                    value={ex.name}
                    onChange={(e) => updateEditField(ex.id, 'name', e.target.value)}
                    style={{
                      flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4,
                      padding: '8px 10px', color: C.chalk, fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15,
                    }}
                  />
                  <button
                    onClick={() => removeEditExercise(ex.id)}
                    aria-label="Remove exercise"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 4 }}
                  >
                    <Trash2 size={17} color={C.brass} />
                  </button>
                </div>

                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  <select
                    value={ex.type}
                    onChange={(e) => updateEditField(ex.id, 'type', e.target.value)}
                    style={{
                      background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: '8px 10px',
                      color: C.chalk, fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                    }}
                  >
                    <option value="reps">Reps</option>
                    <option value="time">Time (sec)</option>
                  </select>
                  <div className="flex items-center gap-1" style={{ flex: 1 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>Sets</span>
                    <input
                      type="number"
                      value={ex.sets}
                      onChange={(e) => updateEditField(ex.id, 'sets', e.target.value)}
                      style={{
                        flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4,
                        padding: '8px 10px', color: C.chalk, fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
                  {ex.type === 'time' ? (
                    <>
                      <div className="flex items-center gap-1" style={{ flex: 1 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>Min sec</span>
                        <input
                          type="number"
                          value={ex.timeMin ?? ''}
                          onChange={(e) => updateEditField(ex.id, 'timeMin', e.target.value)}
                          style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: '8px 10px', color: C.chalk, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
                        />
                      </div>
                      <div className="flex items-center gap-1" style={{ flex: 1 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>Max sec</span>
                        <input
                          type="number"
                          value={ex.timeMax ?? ''}
                          onChange={(e) => updateEditField(ex.id, 'timeMax', e.target.value)}
                          style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: '8px 10px', color: C.chalk, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1" style={{ flex: 1 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>Min reps</span>
                        <input
                          type="number"
                          value={ex.repMin ?? ''}
                          onChange={(e) => updateEditField(ex.id, 'repMin', e.target.value)}
                          style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: '8px 10px', color: C.chalk, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
                        />
                      </div>
                      <div className="flex items-center gap-1" style={{ flex: 1 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>Max reps</span>
                        <input
                          type="number"
                          value={ex.repMax ?? ''}
                          onChange={(e) => updateEditField(ex.id, 'repMax', e.target.value)}
                          style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, padding: '8px 10px', color: C.chalk, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <textarea
                  placeholder="Cue / description (optional)"
                  value={ex.desc || ''}
                  onChange={(e) => updateEditField(ex.id, 'desc', e.target.value)}
                  rows={2}
                  style={{
                    width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4,
                    padding: '8px 10px', color: C.steel, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12,
                    resize: 'vertical',
                  }}
                />
              </div>
            ))}

            <button
              onClick={addEditExercise}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'transparent', border: `1px dashed ${C.border}`, color: C.brass,
                borderRadius: 6, padding: '12px 0',
                fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
              }}
            >
              <Plus size={16} /> Add Exercise
            </button>

            <button
              onClick={resetProgramToDefault}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'transparent', border: 'none', color: C.steel,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', padding: '4px 0',
              }}
            >
              <RotateCcw size={13} /> Reset this day to default
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {exercises.map((ex, exIdx) => {
              const ref = lastRef[ex.id];
              const isTime = ex.type === 'time';
              return (
                <div key={ex.id} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
                  <div className="flex items-start justify-between" style={{ marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.25, flex: 1 }}>
                      {String(exIdx + 1).padStart(2, '0')} — {ex.name}
                    </div>
                    <button
                      onClick={() => toggleDesc(ex.id)}
                      aria-label="Toggle exercise cue"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 0 0 8px', flexShrink: 0 }}
                    >
                      <Info size={16} color={expanded[ex.id] ? C.brass : C.steel} />
                    </button>
                  </div>

                  {expanded[ex.id] && (
                    <div
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: C.steel,
                        background: C.bg,
                        border: `1px solid ${C.border}`,
                        borderRadius: 4,
                        padding: '10px 12px',
                        marginBottom: 10,
                      }}
                    >
                      {ex.desc}
                    </div>
                  )}

                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.brass, marginBottom: ref ? 6 : 12 }}>
                    TARGET: {ex.sets} × {isTime
                      ? `${ex.timeMin === ex.timeMax ? ex.timeMin : `${ex.timeMin}\u2013${ex.timeMax}`} sec`
                      : `${ex.repMin === ex.repMax ? ex.repMin : `${ex.repMin}\u2013${ex.repMax}`} reps`}
                  </div>

                  {ref && (
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel, marginBottom: 12 }}>
                      LAST ({formatStamp(ref.date)}): {isTime
                        ? ref.sets.map((s) => `${s.seconds || '-'}s`).join('  ')
                        : ref.sets.map((s) => `${s.weight || '-'}kg×${s.reps || '-'}`).join('  ')}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {Array.from({ length: ex.sets }).map((_, i) => {
                      const s = (sets[ex.id] && sets[ex.id][i]) || (isTime ? { seconds: '' } : { weight: '', reps: '' });
                      if (isTime) {
                        const hit = s.seconds !== '' && Number(s.seconds) >= ex.timeMin;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div style={{ width: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.steel }}>{i + 1}</div>
                            <input
                              type="number"
                              inputMode="numeric"
                              placeholder="seconds held"
                              value={s.seconds}
                              onChange={(e) => updateSet(ex.id, i, 'seconds', e.target.value)}
                              style={{
                                flex: 1,
                                background: C.bg,
                                border: `1px solid ${hit ? C.success : C.border}`,
                                borderRadius: 4,
                                padding: '8px 10px',
                                color: C.chalk,
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 14,
                              }}
                            />
                            <span style={{ color: C.steel, fontSize: 12 }}>sec</span>
                            {hit && <Check size={16} color={C.success} />}
                          </div>
                        );
                      }
                      const hit = s.reps !== '' && Number(s.reps) >= ex.repMin;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <div style={{ width: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.steel }}>{i + 1}</div>
                          <input
                            type="number"
                            inputMode="decimal"
                            placeholder="kg"
                            value={s.weight}
                            onChange={(e) => updateSet(ex.id, i, 'weight', e.target.value)}
                            style={{
                              flex: 1,
                              background: C.bg,
                              border: `1px solid ${C.border}`,
                              borderRadius: 4,
                              padding: '8px 10px',
                              color: C.chalk,
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 14,
                            }}
                          />
                          <span style={{ color: C.steel, fontSize: 13 }}>×</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            placeholder="reps"
                            value={s.reps}
                            onChange={(e) => updateSet(ex.id, i, 'reps', e.target.value)}
                            style={{
                              flex: 1,
                              background: C.bg,
                              border: `1px solid ${hit ? C.success : C.border}`,
                              borderRadius: 4,
                              padding: '8px 10px',
                              color: C.chalk,
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 14,
                            }}
                          />
                          {hit && <Check size={16} color={C.success} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <History size={15} color={C.brass} />
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Past Sessions
                </span>
              </div>
              {history.length === 0 ? (
                <div style={{ color: C.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>No sessions logged yet.</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {history.map((stamp) => (
                    <div key={stamp}>
                      <button
                        onClick={() => openHistory(stamp)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'transparent',
                          border: 'none',
                          color: C.chalk,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          padding: '8px 0',
                          cursor: 'pointer',
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        {formatStamp(stamp)}
                        {viewStamp === stamp ? <ChevronUp size={14} color={C.steel} /> : <ChevronDown size={14} color={C.steel} />}
                      </button>
                      {viewStamp === stamp && viewData && (
                        <div style={{ padding: '8px 0 4px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {exercises.map((ex) => {
                            const arr = viewData[ex.id];
                            if (!arr) return null;
                            const isTime = ex.type === 'time';
                            const logged = arr.filter((s) => (isTime ? s.seconds !== '' : (s.weight !== '' || s.reps !== '')));
                            if (logged.length === 0) return null;
                            return (
                              <div key={ex.id} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steel }}>
                                <span style={{ color: C.chalk }}>{ex.name}:</span>{' '}
                                {isTime
                                  ? logged.map((s) => `${s.seconds || '-'}s`).join('  ')
                                  : logged.map((s) => `${s.weight || '-'}×${s.reps || '-'}`).join('  ')}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {day !== 'weight' && day !== 'dashboard' && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: C.panel,
            borderTop: `1px solid ${C.border}`,
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {editMode ? (
            <div className="flex gap-2" style={{ width: '100%', maxWidth: 480 }}>
              <button
                onClick={cancelEditMode}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: 'transparent', border: `1px solid ${C.border}`, color: C.steel,
                  fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 14,
                  textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 6, padding: '14px 0', cursor: 'pointer',
                }}
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={saveProgram}
                disabled={programStatus === 'saving'}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: programStatus === 'saved' ? C.success : C.brass, color: '#14161A',
                  fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 14,
                  textTransform: 'uppercase', letterSpacing: '0.06em', border: 'none', borderRadius: 6, padding: '14px 0', cursor: 'pointer',
                }}
              >
                <Save size={16} />
                {programStatus === 'saving' ? 'Saving...' : programStatus === 'saved' ? 'Saved' : 'Save List'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleSave}
              disabled={status === 'saving'}
              style={{
                width: '100%',
                maxWidth: 480,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: status === 'saved' ? C.success : C.brass,
                color: '#14161A',
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                border: 'none',
                borderRadius: 6,
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <Save size={17} />
              {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved' : status === 'error' ? 'Error \u2014 try again' : `Log ${PROGRAM[day].label} ${day === 'evening' ? 'Session' : 'Day'}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
