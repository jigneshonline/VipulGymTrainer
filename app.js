const STORE_KEY = "vifit-trainer-dashboard-v11";

const seedData = {
  trainer: {
    name: "Vipul Shinde",
    password: "IAMTRAINER",
    phone: "8879238390",
    holidays: [],
    growth: [
      "Record every session before leaving the gym floor",
      "Review weekly adherence every Sunday evening",
      "Learn one corrective exercise method each week",
    ],
  },
  clients: [
    {
      id: "raj",
      name: "Raj Patel",
      password: "IAMFIT",
      goal: "Maintenance",
      phone: "9000000001",
      email: "",
      startWeight: 76,
      currentWeight: 75,
      targetWeight: 74,
      nutritionEnabled: false,
      note: "Keep shoulder mobility slow and controlled. No repeat of yesterday's exact routine.",
      holidayByTrainer: false,
      holidayByClient: false,
      week: [
        { day: "Mon", focus: "Push + Core", status: "Completed" },
        { day: "Tue", focus: "Pull + Mobility", status: "Completed" },
        { day: "Wed", focus: "Legs + Balance", status: "Today" },
        { day: "Thu", focus: "Active Recovery", status: "Planned" },
        { day: "Fri", focus: "Full Body", status: "Planned" },
        { day: "Sat", focus: "Cardio Zone 2", status: "Planned" },
      ],
      todayPlan: [
        { name: "Goblet squat", detail: "3 sets x 12 reps", done: false },
        { name: "Incline push-up", detail: "3 sets x 10 reps", done: false },
        { name: "Cable row", detail: "3 sets x 12 reps", done: true },
        { name: "Dead bug", detail: "3 sets x 12 each side", done: false },
      ],
      sessions: [
        { date: "2026-05-28", summary: "Pull + mobility completed", adherence: 100 },
        { date: "2026-05-27", summary: "Push + core completed", adherence: 88 },
      ],
      nutrition: {
        protein: "Dal, paneer, curd or eggs with two meals",
        water: "2.5 litres",
        avoid: "Late fried snacks",
      },
    },
    {
      id: "amit",
      name: "Amit Shah",
      password: "IAMFIT",
      goal: "Weight Loss",
      phone: "9892000001",
      email: "amit@example.com",
      startWeight: 92,
      currentWeight: 88,
      targetWeight: 82,
      nutritionEnabled: true,
      note: "Keep intensity moderate; knee comfort is the constraint.",
      holidayByTrainer: false,
      holidayByClient: true,
      week: [
        { day: "Mon", focus: "Cardio + Core", status: "Completed" },
        { day: "Tue", focus: "Upper Body", status: "Completed" },
        { day: "Wed", focus: "Lower Body Light", status: "Today" },
        { day: "Thu", focus: "Walk + Stretch", status: "Planned" },
        { day: "Fri", focus: "Circuit", status: "Planned" },
        { day: "Sat", focus: "Measurement Day", status: "Planned" },
      ],
      todayPlan: [
        { name: "Treadmill incline walk", detail: "18 minutes", done: true },
        { name: "Box squat", detail: "3 sets x 12 reps", done: false },
        { name: "Lat pulldown", detail: "3 sets x 12 reps", done: false },
        { name: "Plank", detail: "3 holds x 30 seconds", done: false },
      ],
      sessions: [{ date: "2026-05-28", summary: "Cardio completed, knee okay", adherence: 75 }],
      nutrition: {
        protein: "Add protein at breakfast",
        water: "3 litres",
        avoid: "Sugary tea and biscuits",
      },
    },
    {
      id: "rohan",
      name: "Rohan Mehta",
      password: "IAMFIT",
      goal: "Body Building",
      phone: "9892000002",
      email: "rohan@example.com",
      startWeight: 68,
      currentWeight: 71,
      targetWeight: 76,
      nutritionEnabled: true,
      note: "Progressive overload only if form is clean.",
      holidayByTrainer: false,
      holidayByClient: false,
      week: [
        { day: "Mon", focus: "Chest", status: "Completed" },
        { day: "Tue", focus: "Back", status: "Completed" },
        { day: "Wed", focus: "Legs", status: "Today" },
        { day: "Thu", focus: "Shoulders", status: "Planned" },
        { day: "Fri", focus: "Arms", status: "Planned" },
        { day: "Sat", focus: "Weak Points", status: "Planned" },
      ],
      todayPlan: [
        { name: "Leg press", detail: "4 sets x 10 reps", done: false },
        { name: "Romanian deadlift", detail: "4 sets x 8 reps", done: false },
        { name: "Walking lunge", detail: "3 sets x 12 each", done: false },
        { name: "Standing calf raise", detail: "4 sets x 15 reps", done: false },
      ],
      sessions: [{ date: "2026-05-28", summary: "Back session, added 2.5 kg", adherence: 90 }],
      nutrition: {
        protein: "120g daily target",
        water: "3 litres",
        avoid: "Skipping post-workout meal",
      },
    },
  ],
  selectedClientId: "raj",
  pendingUpdates: [],
  workoutMaster: [
    { id: "w1", name: "Goblet squat", type: "Strength", sets: 3, reps: "12" },
    { id: "w2", name: "Incline push-up", type: "Strength", sets: 3, reps: "10" },
    { id: "w3", name: "Cable row", type: "Back", sets: 3, reps: "12" },
    { id: "w4", name: "Treadmill incline walk", type: "Cardio", sets: 1, reps: "18 min" },
  ],
  goalMaster: [
    { id: "g1", category: "Generic Goals", name: "Maintenance", workoutTypes: ["Mobility", "Strength", "Cardio"] },
    { id: "g2", category: "Generic Goals", name: "Weight Loss", workoutTypes: ["Cardio", "Core", "Circuit"] },
    { id: "g3", category: "Generic Goals", name: "Body Building", workoutTypes: ["Push", "Pull", "Legs"] },
    { id: "g4", category: "Custom Goals", name: "Rehab", workoutTypes: ["Mobility", "Corrective", "Balance"] },
  ],
};

let state = loadState();
let view = "overview";
let role = null;
let loginRole = "trainer";
let clientView = "plan";

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  const parsed = saved ? JSON.parse(saved) : structuredClone(seedData);
  parsed.trainer.holidays = parsed.trainer.holidays || [];
  parsed.pendingUpdates = parsed.pendingUpdates || [];
  parsed.workoutMaster = parsed.workoutMaster || structuredClone(seedData.workoutMaster);
  parsed.goalMaster = parsed.goalMaster || structuredClone(seedData.goalMaster);
  parsed.clients.forEach((client) => {
    client.demographics = client.demographics || { age: "", height: "", city: "" };
    client.holidays = client.holidays || [];
    client.status = client.status || "active";
    client.statusHistory = client.statusHistory || [];
  });
  return parsed;
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function selectedClient() {
  return state.clients.find((client) => client.id === state.selectedClientId) || state.clients[0];
}

function pendingForClient(clientId) {
  return state.pendingUpdates.filter((item) => item.clientId === clientId && item.status === "pending");
}

function createPendingUpdate(clientId, type, payload, summary) {
  state.pendingUpdates.unshift({
    id: `update-${Date.now()}`,
    clientId,
    type,
    payload,
    summary,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  saveState();
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function maxHolidayISO() {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString().slice(0, 10);
}

function datedHoliday(list, date = todayISO()) {
  return (list || []).find((item) => item.date === date && item.status !== "cancelled");
}

function completion(client) {
  if (!client.todayPlan.length) return 0;
  return Math.round((client.todayPlan.filter((item) => item.done).length / client.todayPlan.length) * 100);
}

function weeklyProgress(client) {
  if (!client.week.length) return 0;
  const completed = client.week.filter((day) => day.status === "Completed").length;
  const todayCredit = completion(client) >= 70 ? 1 : completion(client) >= 30 ? 0.5 : 0;
  return Math.round(((completed + todayCredit) / client.week.length) * 100);
}

function monthlyProgress(client) {
  const sessions = client.sessions.slice(0, 8);
  if (!sessions.length) return completion(client);
  return Math.round(sessions.reduce((sum, session) => sum + session.adherence, 0) / sessions.length);
}

function overallProgress(client) {
  const weightTotal = Math.abs(client.startWeight - client.targetWeight) || 1;
  const weightDone = Math.min(weightTotal, Math.abs(client.startWeight - client.currentWeight));
  const weightProgress = Math.round((weightDone / weightTotal) * 100);
  return Math.round((completion(client) * 0.25) + (weeklyProgress(client) * 0.25) + (monthlyProgress(client) * 0.25) + (weightProgress * 0.25));
}

function renderProgressTimeline(client) {
  const items = [
    ["Today", completion(client), `${client.todayPlan.filter((item) => item.done).length}/${client.todayPlan.length} exercises`],
    ["Weekly", weeklyProgress(client), `${client.week.filter((day) => day.status === "Completed").length} sessions completed`],
    ["Monthly", monthlyProgress(client), `${client.sessions.length || 0} logged sessions`],
    ["Overall", overallProgress(client), `${client.currentWeight} kg now · target ${client.targetWeight} kg`],
  ];
  return `
    <div class="panel timeline-panel">
      <div class="section-title"><span>↗</span><h3>Progress timeline</h3></div>
      <div class="timeline">
        ${items.map(([label, value, detail]) => `
          <details class="timeline-item">
            <summary>
              <span>${label}</span>
              <strong>${value}%</strong>
            </summary>
            <div class="timeline-bar"><i style="--value:${value}%"></i></div>
            <p>${detail}</p>
          </details>
        `).join("")}
      </div>
    </div>
  `;
}

function app(html) {
  document.getElementById("app").innerHTML = html;
}

function logo() {
  return `<div class="brand-mark" aria-label="ViFit logo">ViFit</div>`;
}

function lightningLogo() {
  return `
    <div class="bolt" aria-label="ViFit lightning logo">
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
        <path d="M36 4 13 36h17l-3 24 24-34H34l2-22Z" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" />
      </svg>
    </div>
  `;
}

function renderLogin() {
  app(`
    <section class="login">
      <div class="login-brand">
        ${lightningLogo()}
        <h1>ViFit Tracker</h1>
        <p>by Vipul Shinde · Personal Training</p>
      </div>
      <div class="login-box">
        <form class="login-form" onsubmit="handleLogin(event)">
          <h2>Who are you logging in as?</h2>
          <div class="role-toggle">
            <button type="button" class="${loginRole === "trainer" ? "active" : ""}" onclick="setLoginRole('trainer')"><span>◎</span><strong>Trainer</strong><small>Vipul Shinde</small></button>
            <button type="button" class="${loginRole === "client" ? "active" : ""}" onclick="setLoginRole('client')"><span>♙</span><strong>Client</strong><small>Private access</small></button>
          </div>
          <label class="${loginRole === "client" ? "" : "hidden"}">Registered mobile number
            <input id="loginMobile" inputmode="numeric" placeholder="Enter mobile number" autocomplete="tel" />
          </label>
          <label>Password
            <input id="password" type="password" placeholder="Enter password" autocomplete="current-password" />
          </label>
          <button class="primary-btn" type="submit">${loginRole === "client" ? "Open my plan" : "Open trainer dashboard"}</button>
          <p id="loginError" class="subtle"></p>
        </form>
      </div>
    </section>
  `);
}

function setLoginRole(nextRole) {
  loginRole = nextRole;
  renderLogin();
}

function handleLogin(event) {
  event.preventDefault();
  const password = document.getElementById("password").value.trim();
  if (loginRole === "trainer" && password === state.trainer.password) {
    role = "trainer";
    renderShell();
    return;
  }
  if (loginRole === "client") {
    const mobile = document.getElementById("loginMobile").value.replace(/\D/g, "");
    const client = state.clients.find((item) => item.phone.replace(/\D/g, "") === mobile);
    if (client?.status === "deleted") {
      document.getElementById("loginError").textContent = "Access is closed. Contact Vipul.";
      return;
    }
    if (client && password === client.password) {
      role = "client";
      state.selectedClientId = client.id;
      saveState();
      renderClientPortal();
      return;
    }
  }
  document.getElementById("loginError").textContent = "Access failed. Check the registered mobile number and password.";
}

function renderShell() {
  const titles = {
    overview: "Home",
    clients: "Clients",
    quicklog: "Log",
    calendar: "Week",
    nutrition: "Nutrition",
    reports: "Reports",
    growth: "Growth",
    more: "More",
  };
  const activeTitle = titles[view] || "Home";
  app(`
    <section class="liquid-shell">
      <header class="liquid-header">
        <div class="brand compact">${lightningLogo()}<div><h1>ViFit Tracker</h1><p>${state.trainer.name} · ${new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</p></div></div>
        <button class="glass-icon" onclick="setView('more')" aria-label="More options">•••</button>
      </header>
      <section class="liquid-hero">
        <div>
          ${view !== "overview" ? `<button class="ghost-btn back-btn" onclick="goBack()">Back</button>` : ""}
          <p class="eyebrow">${activeTitle}</p>
          <h2>${view === "overview" ? "Today at a glance" : activeTitle}</h2>
          <p class="subtle">${topbarCopy()}</p>
        </div>
        <div class="header-pills"><button class="status-pill" onclick="setView('overview')">${todaySessions()} today</button><button class="status-pill alert" onclick="setView('review')">${alertCount()} alerts</button></div>
      </section>
      ${["overview", "clients", "quicklog", "calendar", "nutrition", "reports"].includes(view) ? renderTrainerClientSwitcher() : ""}
      <section class="liquid-content">
        ${renderView()}
      </section>
      ${renderBottomNav()}
    </section>
  `);
}

function renderTrainerClientSwitcher() {
  const client = selectedClient();
  return `
    <div class="client-switcher">
      <div class="client-avatar">${client.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
      <div>
        <span>Active client</span>
        <strong>${client.name}</strong>
        <p>${client.goal} · ${completion(client)}% today · ${overallProgress(client)}% overall</p>
      </div>
      <label>
        <select onchange="selectClient(this.value)">
          ${state.clients.filter((item) => item.status !== "deleted").map((item) => `<option value="${item.id}" ${item.id === client.id ? "selected" : ""}>Change to ${item.name}</option>`).join("")}
        </select>
      </label>
    </div>
  `;
}

function renderBottomNav() {
  const items = [
    ["overview", "⌂", "Home"],
    ["quicklog", "✓", "Log"],
    ["calendar", "▦", "Week"],
    ["reports", "◌", "Reports"],
    ["more", "•••", "More"],
  ];
  return `
    <nav class="bottom-nav" aria-label="Main navigation">
      ${items.map(([key, icon, label]) => `<button class="${view === key ? "active" : ""}" onclick="setView('${key}')"><span>${icon}</span>${label}</button>`).join("")}
    </nav>
  `;
}

function topbarCopy() {
  const copy = {
    overview: "The trainer should never depend on memory. The system must remember for him.",
    clients: "Filter, pick, and confirm each client before assigning work.",
    quicklog: "Tap what happened today. No long forms, no excuses.",
    calendar: "Weekly view for trainer holidays, client holidays, and self-workouts.",
    nutrition: "Optional nutrition guidance, only when it supports the client's goal.",
    reports: "Share either WhatsApp text or print-ready PDF.",
    growth: "A trainer also needs a progress plan, otherwise the business stays small.",
    master: "Maintain reusable workouts, goal types, sets and reps.",
    review: "Approve client-submitted updates before they become final.",
    more: "Trainer tools and settings.",
  };
  return copy[view];
}

function setView(nextView) {
  if (view !== nextView) state.lastView = view;
  view = nextView;
  saveState();
  renderShell();
}

function goBack() {
  view = state.lastView || "overview";
  saveState();
  renderShell();
}

function renderView() {
  if (view === "overview") return renderOverview();
  if (view === "clients") return renderClients();
  if (view === "quicklog") return renderQuickLog();
  if (view === "calendar") return renderCalendar();
  if (view === "nutrition") return renderNutrition();
  if (view === "reports") return renderReports();
  if (view === "review") return renderReviewQueue();
  if (view === "master") return renderMasterSetup();
  if (view === "more") return renderMore();
  return renderGrowth();
}

function renderOverview() {
  const active = state.clients.filter((client) => client.status !== "deleted").length;
  const avgCompletion = Math.round(state.clients.reduce((sum, client) => sum + completion(client), 0) / active);
  const holidays = state.clients.filter((client) => client.holidayByClient || client.holidayByTrainer).length;
  const onTrack = state.clients.filter((client) => completion(client) >= 70).length;
  const client = selectedClient();
  return `
    <div class="grid dashboard-grid">
      <button class="panel metric drill-card" onclick="setView('clients')"><span>Active clients</span><strong>${active}</strong><em>Tap to view all</em></button>
      <button class="panel metric drill-card" onclick="setView('quicklog')"><span>Today</span><strong>${completion(client)}%</strong><em>${client.todayPlan.filter((item) => item.done).length}/${client.todayPlan.length} done</em></button>
      <button class="panel metric drill-card" onclick="setView('reports')"><span>Overall</span><strong class="good">${overallProgress(client)}%</strong><em>Tap for report</em></button>
      <button class="panel metric drill-card" onclick="setView('reports')"><span>Reports</span><strong class="hot">${Math.max(1, holidays + 1)}</strong><em>${holidays} overdue</em></button>
    </div>
    ${renderProgressTimeline(client)}
    ${renderTrainerHolidayManager()}
    <div class="panel">
      <div class="section-title"><span>◷</span><h3>Today's schedule</h3></div>
      <div class="schedule-list">${state.clients.filter((item) => item.status !== "deleted").map(renderScheduleRow).join("")}</div>
    </div>
    <div class="panel">
      <div class="section-title"><span>♢</span><h3>Needs attention</h3></div>
      <div class="alert-list">${renderAlerts()}</div>
    </div>
  `;
}

function renderTrainerHolidayManager() {
  const upcoming = state.trainer.holidays.filter((item) => item.status !== "cancelled" && item.date >= todayISO()).sort((a, b) => a.date.localeCompare(b.date));
  return `
    <div class="panel">
      <div class="section-title"><span>☾</span><h3>Vipul holiday marker</h3></div>
      <p class="subtle">Mark Vipul unavailable from today up to 3 months ahead. This updates all clients. If cancelled, mark the date as available for training.</p>
      <div class="form-grid">
        <label>Date<input id="trainerHolidayDate" type="date" min="${todayISO()}" max="${maxHolidayISO()}" value="${todayISO()}" /></label>
        <label>Reason<input id="trainerHolidayReason" placeholder="Example: family commitment, travel, event" /></label>
      </div>
      <div class="actions">
        <button class="primary-btn" onclick="markTrainerHoliday()">Mark Vipul unavailable</button>
        <button class="ghost-btn" onclick="cancelTrainerHoliday()">Mark available for training</button>
      </div>
      ${upcoming.length ? `<div class="log-list">${upcoming.map((item) => `<div class="card"><strong>${item.date}</strong><p class="subtle">${item.reason || "No reason added"} · All clients updated</p></div>`).join("")}</div>` : `<p class="subtle">No upcoming Vipul holidays marked.</p>`}
    </div>
  `;
}

function markTrainerHoliday() {
  const date = document.getElementById("trainerHolidayDate").value;
  const reason = document.getElementById("trainerHolidayReason").value.trim();
  if (!date) return;
  if (!reason) {
    alert("Add a reason before marking Vipul unavailable.");
    return;
  }
  if (!confirm(`Mark Vipul unavailable on ${date}? This will show to all clients. If the holiday is cancelled later, mark available for training.`)) return;
  const existing = datedHoliday(state.trainer.holidays, date);
  if (existing) {
    existing.reason = reason;
    existing.status = "active";
  } else {
    state.trainer.holidays.push({ date, reason, status: "active", createdAt: new Date().toISOString() });
  }
  saveState();
  renderShell();
}

function cancelTrainerHoliday() {
  const date = document.getElementById("trainerHolidayDate").value;
  const existing = datedHoliday(state.trainer.holidays, date);
  if (!existing) {
    alert("No Vipul holiday found for this date.");
    return;
  }
  if (!confirm(`Cancel Vipul holiday on ${date} and mark available for training?`)) return;
  existing.status = "cancelled";
  existing.cancelledAt = new Date().toISOString();
  saveState();
  renderShell();
}

function todaySessions() {
  return Math.min(3, state.clients.length);
}

function alertCount() {
  return state.clients.filter((client) => completion(client) < 70 || client.holidayByClient || client.holidayByTrainer).length + state.pendingUpdates.filter((item) => item.status === "pending").length + 1;
}

function renderScheduleRow(client, index) {
  const times = ["8:00 AM", "10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"];
  const labels = ["Done", "Now", "Next", "Scheduled", "Later"];
  const label = labels[index] || "Scheduled";
  return `
    <div class="schedule-row" onclick="selectClient('${client.id}')">
      <time>${times[index] || "5:00 PM"}</time>
      <span class="dot"></span>
      <div><strong>${client.name}</strong><p>${client.goal} · ${client.week.find((day) => day.status === "Today")?.focus || "Workout"} · Today ${completion(client)}% · Overall ${overallProgress(client)}%</p>${renderClientContactActions(client, true)}</div>
      <b class="${label.toLowerCase()}">${label}</b>
    </div>
  `;
}

function renderClientContactActions(client, compact = false) {
  return `
    <div class="client-actions ${compact ? "compact-actions" : ""}" onclick="event.stopPropagation()">
      <button class="small-btn" onclick="callClient('${client.id}')">Call</button>
      <button class="small-btn" onclick="messageClient('${client.id}')">Message</button>
      <button class="small-btn" onclick="shareReportFor('${client.id}')">Share Report</button>
      <button class="small-btn" onclick="selectClient('${client.id}'); setView('clients')">Edit</button>
    </div>
  `;
}

function callClient(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  if (!client?.phone) {
    alert("Client mobile number is missing.");
    return;
  }
  window.open(`tel:${client.phone}`, "_blank");
}

function messageClient(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  const phone = client?.phone || state.trainer.phone;
  window.open(`https://wa.me/91${phone}`, "_blank");
}

function shareReportFor(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  if (!client) return;
  const period = prompt("Share report for which period? Type Daily, Weekly, Monthly, or Till Date", "Weekly");
  if (!period) return;
  const message = `ViFit ${period} Progress Report%0ATrainer: Vipul Shinde%0AClient: ${client.name}%0AGoal: ${client.goal}%0AToday: ${completion(client)}%25%0AWeekly: ${weeklyProgress(client)}%25%0AMonthly: ${monthlyProgress(client)}%25%0AOverall: ${overallProgress(client)}%25%0ANote: ${client.note}%0A%0AViFit Tracker - Trainer%0AWhatsApp: 8879238390`;
  window.open(`https://wa.me/91${client.phone || state.trainer.phone}?text=${message}`, "_blank");
}

function renderAlerts() {
  const lowClient = state.clients.find((client) => completion(client) < 70) || selectedClient();
  const pending = state.pendingUpdates.filter((item) => item.status === "pending");
  return `
    ${pending.length ? `<button class="attention attention-button" onclick="setView('review')"><span>✓</span><div><strong>${pending.length} client update${pending.length > 1 ? "s" : ""} waiting for approval</strong><p>Review before final progress changes</p></div></button>` : ""}
    <button class="attention attention-button" onclick="selectClient('${lowClient.id}'); setView('quicklog')"><span>⚠</span><div><strong>${lowClient.name} needs follow-up</strong><p>${lowClient.goal} · open quick log</p></div></button>
    <button class="attention attention-button" onclick="setView('reports')"><span>▤</span><div><strong>${Math.max(1, state.clients.length)} progress reports pending</strong><p>${state.clients.map((client) => client.name.split(" ")[0]).join(", ")}</p></div></button>
    <button class="attention attention-button" onclick="setView('reports')"><span>♧</span><div><strong>${selectedClient().name} milestone review due</strong><p>${selectedClient().goal} · open report</p></div></button>
    <button class="attention attention-button" onclick="setView('growth')"><span>▣</span><div><strong>Trainer growth review</strong><p>Update learning habit and client SOP</p></div></button>
  `;
}

function renderClientSummary(client) {
  const status = client.status || "active";
  return `
    <div class="client-card ${client.id === state.selectedClientId ? "active" : ""}" onclick="selectClient('${client.id}')">
      <div class="spread">
        <div><h3>${client.name}</h3><div class="subtle">${client.goal} | ${client.currentWeight} kg now | target ${client.targetWeight} kg</div></div>
        <span class="tag ${status !== "active" ? "red" : ""}">${status === "active" ? `${completion(client)}%` : status}</span>
      </div>
      <div class="progress" style="--value:${completion(client)}%"><span></span></div>
      <p class="subtle">${client.note}</p>
      ${renderClientContactActions(client)}
    </div>
  `;
}

function renderClients() {
  return `
    <div class="grid two-col">
      <div class="panel">
        <div class="add-client-panel">
          <div>
            <h3>Add new client</h3>
            <p class="subtle">Create a blank profile, then fill mobile, goal, password and baseline weight.</p>
          </div>
          <button class="primary-btn" onclick="addClient()">Add Client</button>
        </div>
        <div class="toolbar">
          <input id="search" placeholder="Search client" oninput="filterClients()" />
          <select id="goalFilter" onchange="filterClients()">
            <option>All Goals</option>
            ${state.goalMaster.map((goal) => `<option>${goal.name}</option>`).join("")}
          </select>
          <select id="statusFilter" onchange="filterClients()">
            <option>All Status</option>
            <option>active</option>
            <option>paused</option>
            <option>deleted</option>
          </select>
        </div>
        <div id="clientList" class="client-list">${state.clients.map(renderClientSummary).join("")}</div>
      </div>
      <div class="panel">${renderClientEditor(selectedClient())}</div>
    </div>
  `;
}

function renderClientEditor(client) {
  const status = client.status || "active";
  return `
    <h3>Edit ${client.name}</h3>
    <p class="subtle">Status: <strong>${status}</strong>${client.statusReason ? ` | Reason: ${client.statusReason}` : ""}</p>
    ${renderClientContactActions(client)}
    <div class="form-grid" style="margin-top:12px">
      <label>Name<input value="${client.name}" onchange="updateClient('${client.id}', 'name', this.value)" /></label>
      <label>Goal<select onchange="updateClient('${client.id}', 'goal', this.value)">
        ${state.goalMaster.map((goal) => `<option ${client.goal === goal.name ? "selected" : ""}>${goal.name}</option>`).join("")}
      </select></label>
      <label>Phone<input value="${client.phone}" onchange="updateClient('${client.id}', 'phone', this.value)" /></label>
      <label>Client password<input value="${client.password}" onchange="updateClient('${client.id}', 'password', this.value)" /></label>
      <label>Current weight<input type="number" value="${client.currentWeight}" onchange="updateClient('${client.id}', 'currentWeight', Number(this.value))" /></label>
      <label>Target weight<input type="number" value="${client.targetWeight}" onchange="updateClient('${client.id}', 'targetWeight', Number(this.value))" /></label>
    </div>
    <label>Trainer note<textarea onchange="updateClient('${client.id}', 'note', this.value)">${client.note}</textarea></label>
    <div class="danger-zone">
      <h3>Client status controls</h3>
      <p class="subtle">Pause, resume, or delete with action date and reason. No blind status changes.</p>
      <label>Action date<input id="clientStatusDate" type="date" value="${todayISO()}" /></label>
      <textarea id="clientStatusReason" placeholder="Reason required for pause, resume, or delete">${client.statusReason || ""}</textarea>
      <div class="actions">
        <button class="ghost-btn" onclick="setClientStatus('${client.id}', 'paused')">Pause</button>
        <button class="primary-btn" onclick="setClientStatus('${client.id}', 'active')">Resume</button>
        <button class="danger-btn" onclick="deleteClient('${client.id}')">Delete</button>
      </div>
      ${client.statusHistory?.length ? `<div class="log-list">${client.statusHistory.map((item) => `<div class="card"><strong>${item.action} · ${item.date}</strong><p class="subtle">${item.reason}</p></div>`).join("")}</div>` : ""}
    </div>
  `;
}

function filterClients() {
  const q = document.getElementById("search").value.toLowerCase();
  const goal = document.getElementById("goalFilter").value;
  const status = document.getElementById("statusFilter").value;
  const clients = state.clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(q);
    const matchesGoal = goal === "All Goals" || client.goal === goal;
    const matchesStatus = status === "All Status" || (client.status || "active") === status;
    return matchesSearch && matchesGoal && matchesStatus;
  });
  document.getElementById("clientList").innerHTML = clients.map(renderClientSummary).join("") || `<p class="subtle">No client found.</p>`;
}

function selectClient(id) {
  state.selectedClientId = id;
  saveState();
  renderShell();
}

function updateClient(id, key, value) {
  const client = state.clients.find((item) => item.id === id);
  client[key] = value;
  saveState();
}

function addClient() {
  const id = `client-${Date.now()}`;
  state.clients.push({
    id,
    name: "New Client",
    password: "IAMFIT",
    goal: "Maintenance",
    phone: "",
    email: "",
    status: "active",
    statusReason: "",
    startWeight: 70,
    currentWeight: 70,
    targetWeight: 68,
    nutritionEnabled: false,
    note: "Set first assessment note.",
    holidayByTrainer: false,
    holidayByClient: false,
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => ({ day, focus: index === 2 ? "Assessment" : "Planned workout", status: index === 2 ? "Today" : "Planned" })),
    todayPlan: [
      { name: "Warm-up walk", detail: "8 minutes", done: false },
      { name: "Mobility check", detail: "10 minutes", done: false },
    ],
    sessions: [],
    nutrition: { protein: "", water: "", avoid: "" },
    demographics: { age: "", height: "", city: "" },
  });
  state.selectedClientId = id;
  saveState();
  renderShell();
}

function statusReason() {
  return (document.getElementById("clientStatusReason")?.value || "").trim();
}

function statusDate() {
  return document.getElementById("clientStatusDate")?.value || todayISO();
}

function setClientStatus(id, nextStatus) {
  const client = state.clients.find((item) => item.id === id);
  if (!client) return;
  const reason = statusReason();
  if (!reason) {
    alert("Reason is required before changing client status.");
    return;
  }
  client.status = nextStatus;
  client.statusReason = reason;
  client.statusUpdatedAt = statusDate();
  client.statusHistory = client.statusHistory || [];
  client.statusHistory.unshift({ action: nextStatus === "active" ? "Resume" : "Pause", date: statusDate(), reason });
  saveState();
  renderShell();
}

function deleteClient(id) {
  const reason = statusReason();
  if (!reason) {
    alert("Reason is required before deleting a client.");
    return;
  }
  const client = state.clients.find((item) => item.id === id);
  if (!client) return;
  const confirmed = confirm(`Delete ${client.name}? This will mark the client deleted on ${statusDate()}. Reason: ${reason}`);
  if (!confirmed) return;
  client.status = "deleted";
  client.statusReason = reason;
  client.statusUpdatedAt = statusDate();
  client.statusHistory = client.statusHistory || [];
  client.statusHistory.unshift({ action: "Delete", date: statusDate(), reason });
  state.selectedClientId = state.clients.find((item) => item.status !== "deleted")?.id || client.id;
  saveState();
  renderShell();
}

function submitClientHolidayRequest() {
  const client = selectedClient();
  const date = document.getElementById("clientHolidayDate").value;
  const reason = document.getElementById("clientHolidayReason").value.trim();
  if (!date) return;
  if (!reason) {
    alert("Add a reason before requesting holiday.");
    return;
  }
  if (!confirm(`Request holiday on ${date}? Vipul will confirm it. Don't break the streak unless this is a real commitment.`)) return;
  createPendingUpdate(client.id, "holiday", { action: "mark", date, reason }, `Holiday request for ${date}: ${reason}`);
  renderClientPortal();
}

function submitClientHolidayCancel() {
  const client = selectedClient();
  const date = document.getElementById("clientHolidayDate").value;
  const doneIndexes = [...document.querySelectorAll("[data-cancel-holiday-done]:checked")].map((input) => Number(input.dataset.cancelHolidayDone));
  const actualTask = document.getElementById("holidayCancelNote").value.trim();
  const adherence = client.todayPlan.length ? Math.round((doneIndexes.length / client.todayPlan.length) * 100) : 0;
  if (!date) return;
  if (!actualTask && !doneIndexes.length) {
    alert("Select tasks performed or add an actual workout note before cancelling holiday.");
    return;
  }
  if (!confirm(`Cancel holiday on ${date} and send routine workout details to Vipul?`)) return;
  createPendingUpdate(client.id, "holiday", { action: "cancel", date, doneIndexes, actualTask, adherence }, `Holiday cancellation for ${date}: routine workout submitted`);
  renderClientPortal();
}

function renderQuickLog() {
  const client = selectedClient();
  return `
    <div class="grid two-col">
      <div class="panel">
        <div class="spread">
          <div><h3>${client.name}</h3><p class="subtle">${client.goal} | Today completion ${completion(client)}%</p></div>
          <select onchange="selectClient(this.value)">${state.clients.map((item) => `<option value="${item.id}" ${item.id === client.id ? "selected" : ""}>${item.name}</option>`).join("")}</select>
        </div>
        <div class="exercise-list">
          ${client.todayPlan.map((item, index) => renderExercise(client, item, index, true)).join("")}
        </div>
        <div class="holiday-strip">
          <label>Add task from workout master
            <select id="masterWorkoutSelect">
              ${state.workoutMaster.map((item) => `<option value="${item.id}">${item.name} · ${item.sets} x ${item.reps}</option>`).join("")}
            </select>
          </label>
          <button class="ghost-btn" onclick="addWorkoutToClientPlan('${client.id}')">Add to today's plan</button>
        </div>
        <label>Session note<textarea id="sessionNote">${client.note}</textarea></label>
        <button class="primary-btn" onclick="saveSessionNote()">Save today's log</button>
      </div>
      <div class="panel">${renderPhone(client)}</div>
    </div>
  `;
}

function addWorkoutToClientPlan(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  const workout = state.workoutMaster.find((item) => item.id === document.getElementById("masterWorkoutSelect").value);
  if (!client || !workout) return;
  client.todayPlan.push({ name: workout.name, detail: `${workout.sets} sets x ${workout.reps}`, done: false });
  saveState();
  renderShell();
}

function renderExercise(client, item, index, editable = false) {
  const doneLabel = role === "client" ? "Completed" : "Done";
  const pendingLabel = role === "client" ? "To do" : "Pending";
  return `
    <div class="exercise ${item.done ? "done" : ""}" ${editable ? `onclick="toggleExercise('${client.id}', ${index})"` : ""}>
      <div class="check">✓</div>
      <div><strong>${item.name}</strong><div class="subtle">${item.detail}</div></div>
      <span class="tag ${item.done ? "green" : ""}">${item.done ? doneLabel : pendingLabel}</span>
    </div>
  `;
}

function toggleExercise(clientId, index) {
  const client = state.clients.find((item) => item.id === clientId);
  client.todayPlan[index].done = !client.todayPlan[index].done;
  saveState();
  role === "client" ? renderClientPortal() : renderShell();
}

function saveSessionNote() {
  const client = selectedClient();
  client.note = document.getElementById("sessionNote").value;
  client.sessions.unshift({
    date: new Date().toISOString().slice(0, 10),
    summary: client.note,
    adherence: completion(client),
  });
  saveState();
  renderShell();
}

function renderCalendar() {
  const client = selectedClient();
  return `
    <div class="grid two-col">
      <div class="panel">
        <div class="spread"><h3>${client.name}'s Week</h3><span class="tag">${client.goal}</span></div>
        <div class="week-list">
          ${client.week.map((day, index) => `
            <div class="week-day">
              <strong>${day.day}</strong>
              <input value="${day.focus}" onchange="updateWeek('${client.id}', ${index}, this.value)" />
              <span class="mini-pill">${day.status}</span>
            </div>
          `).join("")}
        </div>
        <p class="subtle">Holiday rule: if Vipul marks a holiday, the client can still continue their self-workout and check it off.</p>
      </div>
      <div class="panel">${renderPhone(client)}</div>
    </div>
  `;
}

function updateWeek(clientId, index, value) {
  const client = state.clients.find((item) => item.id === clientId);
  client.week[index].focus = value;
  saveState();
}

function renderNutrition() {
  const client = selectedClient();
  return `
    <div class="panel">
      <div class="spread">
        <div><h3>Nutrition for ${client.name}</h3><p class="subtle">Optional. Do not force it where it will distract from workout adherence.</p></div>
        <label class="nutrition-toggle"><input type="checkbox" ${client.nutritionEnabled ? "checked" : ""} onchange="toggleNutrition('${client.id}', this.checked)" /> Enabled</label>
      </div>
      <div class="${client.nutritionEnabled ? "" : "hidden"}">
        <div class="form-grid">
          <label>Protein focus<input value="${client.nutrition.protein}" onchange="updateNutrition('${client.id}', 'protein', this.value)" /></label>
          <label>Water target<input value="${client.nutrition.water}" onchange="updateNutrition('${client.id}', 'water', this.value)" /></label>
        </div>
        <label>Avoid / reduce<input value="${client.nutrition.avoid}" onchange="updateNutrition('${client.id}', 'avoid', this.value)" /></label>
      </div>
    </div>
  `;
}

function toggleNutrition(clientId, enabled) {
  const client = state.clients.find((item) => item.id === clientId);
  client.nutritionEnabled = enabled;
  saveState();
  renderShell();
}

function updateNutrition(clientId, key, value) {
  const client = state.clients.find((item) => item.id === clientId);
  client.nutrition[key] = value;
  saveState();
}

function renderReports() {
  const client = selectedClient();
  return `
    ${renderProgressTimeline(client)}
    <div class="grid two-col">
      <div class="panel no-print">
        <h3>Share Progress</h3>
        <p class="subtle">WhatsApp text is practical. PDF is for formal monthly updates.</p>
        <div class="actions">
          <button class="primary-btn" onclick="shareWhatsApp()">Share WhatsApp summary</button>
          <button class="ghost-btn" onclick="window.print()">Print / save as PDF</button>
        </div>
      </div>
      <div class="panel report-paper">
        ${renderReportPaper(client)}
      </div>
    </div>
  `;
}

function renderMore() {
  const shortcuts = [
    ["clients", "◎", "Clients", "Search, add, and edit client profiles"],
    ["nutrition", "◌", "Nutrition", "Optional food guidance by client"],
    ["review", "✓", "Review updates", `${state.pendingUpdates.filter((item) => item.status === "pending").length} waiting for approval`],
    ["master", "▦", "Workout & goal master", "Reusable workouts, sets, reps, generic and custom goals"],
    ["growth", "↗", "My growth", "Trainer habits and self-development"],
  ];
  return `
    <div class="more-grid">
      ${shortcuts.map(([key, icon, title, copy]) => `
        <button class="more-card panel" onclick="setView('${key}')">
          <span>${icon}</span>
          <div><strong>${title}</strong><p class="subtle">${copy}</p></div>
        </button>
      `).join("")}
      <button class="more-card panel" onclick="logout()">
        <span>⏻</span>
        <div><strong>Logout</strong><p class="subtle">Close trainer access</p></div>
      </button>
    </div>
  `;
}

function renderReviewQueue() {
  const pending = state.pendingUpdates.filter((item) => item.status === "pending");
  return `
    <div class="panel">
      <div class="section-title"><span>✓</span><h3>Client updates waiting for approval</h3></div>
      ${pending.length ? `<div class="review-list">${pending.map(renderPendingUpdate).join("")}</div>` : `<p class="subtle">No pending client updates. Good. Nothing to approve.</p>`}
    </div>
  `;
}

function renderMasterSetup() {
  return `
    <div class="grid two-col">
      <div class="panel">
        <div class="section-title"><span>▦</span><h3>Workout master</h3></div>
        <p class="subtle">Create reusable workouts with sets and reps. Use these while planning client tasks.</p>
        <div class="form-grid">
          <label>Workout<input id="workoutName" placeholder="Example: Dumbbell press" /></label>
          <label>Type<input id="workoutType" placeholder="Example: Push, Pull, Cardio" /></label>
          <label>Sets<input id="workoutSets" type="number" value="3" /></label>
          <label>Reps / duration<input id="workoutReps" placeholder="Example: 12 or 20 min" /></label>
        </div>
        <button class="primary-btn" onclick="addWorkoutMaster()">Add workout</button>
        <div class="log-list">${state.workoutMaster.map((item) => `<div class="card"><strong>${item.name}</strong><p class="subtle">${item.type} · ${item.sets} sets x ${item.reps}</p></div>`).join("")}</div>
      </div>
      <div class="panel">
        <div class="section-title"><span>◎</span><h3>Goal master</h3></div>
        <p class="subtle">Maintain generic goals and custom goals with workout types under each goal.</p>
        <div class="form-grid">
          <label>Goal category<select id="goalCategory"><option>Generic Goals</option><option>Custom Goals</option></select></label>
          <label>Goal name<input id="goalName" placeholder="Example: Marathon prep" /></label>
        </div>
        <label>Workout types<input id="goalWorkoutTypes" placeholder="Example: Cardio, Mobility, Core" /></label>
        <button class="primary-btn" onclick="addGoalMaster()">Add goal</button>
        <div class="log-list">${state.goalMaster.map((item) => `<div class="card"><strong>${item.name}</strong><p class="subtle">${item.category} · ${item.workoutTypes.join(", ")}</p></div>`).join("")}</div>
      </div>
    </div>
  `;
}

function addWorkoutMaster() {
  const name = document.getElementById("workoutName").value.trim();
  if (!name) return;
  state.workoutMaster.push({
    id: `w-${Date.now()}`,
    name,
    type: document.getElementById("workoutType").value.trim() || "General",
    sets: Number(document.getElementById("workoutSets").value) || 1,
    reps: document.getElementById("workoutReps").value.trim() || "as planned",
  });
  saveState();
  renderShell();
}

function addGoalMaster() {
  const name = document.getElementById("goalName").value.trim();
  if (!name) return;
  state.goalMaster.push({
    id: `g-${Date.now()}`,
    category: document.getElementById("goalCategory").value,
    name,
    workoutTypes: document.getElementById("goalWorkoutTypes").value.split(",").map((item) => item.trim()).filter(Boolean),
  });
  saveState();
  renderShell();
}

function renderPendingUpdate(update) {
  const client = state.clients.find((item) => item.id === update.clientId);
  return `
    <div class="review-card">
      <div>
        <strong>${client?.name || "Client"}</strong>
        <p class="subtle">${update.summary}</p>
        <small>${new Date(update.createdAt).toLocaleString("en-IN")}</small>
      </div>
      <div class="actions">
        <button class="primary-btn" onclick="approveUpdate('${update.id}')">Approve</button>
        <button class="ghost-btn" onclick="rejectUpdate('${update.id}')">Reject</button>
      </div>
    </div>
  `;
}

function approveUpdate(updateId) {
  const update = state.pendingUpdates.find((item) => item.id === updateId);
  if (!update) return;
  const client = state.clients.find((item) => item.id === update.clientId);
  if (!client) return;

  if (update.type === "profile") {
    Object.assign(client, update.payload.profile || {});
    client.demographics = { ...(client.demographics || {}), ...(update.payload.demographics || {}) };
  }

  if (update.type === "workout") {
    update.payload.doneIndexes.forEach((index) => {
      if (client.todayPlan[index]) client.todayPlan[index].done = true;
    });
    if (update.payload.actualTask) {
      client.sessions.unshift({
        date: new Date().toISOString().slice(0, 10),
        summary: `Client actual workout: ${update.payload.actualTask}`,
        adherence: update.payload.adherence,
      });
    }
  }

  if (update.type === "holiday" && update.payload.action === "mark") {
    const existing = datedHoliday(client.holidays, update.payload.date);
    if (existing) {
      existing.reason = update.payload.reason;
      existing.status = "active";
    } else {
      client.holidays.push({ date: update.payload.date, reason: update.payload.reason, status: "active", createdAt: update.createdAt });
    }
  }

  if (update.type === "holiday" && update.payload.action === "cancel") {
    client.holidays.forEach((item) => {
      if (item.date === update.payload.date) {
        item.status = "cancelled";
        item.cancelledAt = new Date().toISOString();
      }
    });
    update.payload.doneIndexes.forEach((index) => {
      if (client.todayPlan[index]) client.todayPlan[index].done = true;
    });
    client.sessions.unshift({
      date: update.payload.date,
      summary: `Holiday cancelled. Routine workout done: ${update.payload.actualTask || "planned tasks completed"}`,
      adherence: update.payload.adherence,
    });
  }

  update.status = "approved";
  saveState();
  renderShell();
}

function rejectUpdate(updateId) {
  const update = state.pendingUpdates.find((item) => item.id === updateId);
  if (!update) return;
  update.status = "rejected";
  saveState();
  renderShell();
}

function renderReportPaper(client) {
  return `
    <div class="spread">
      <div>${logo()}<h3>Progress Report</h3></div>
      <div class="subtle">ViFit Tracker - Trainer<br>Vipul Shinde<br>WhatsApp: 8879238390</div>
    </div>
    <h2>${client.name}</h2>
    <p><strong>Goal:</strong> ${client.goal}</p>
    <p><strong>Weight:</strong> ${client.startWeight} kg start | ${client.currentWeight} kg current | ${client.targetWeight} kg target</p>
    <p><strong>Today completion:</strong> ${completion(client)}%</p>
    <p><strong>Overall progress:</strong> ${overallProgress(client)}%</p>
    <p><strong>Weekly progress:</strong> ${weeklyProgress(client)}% | <strong>Monthly progress:</strong> ${monthlyProgress(client)}%</p>
    <p><strong>Trainer note:</strong> ${client.note}</p>
    <h3>Recent Sessions</h3>
    <div class="log-list">${client.sessions.map((session) => `<div class="card"><strong>${session.date}</strong><p>${session.summary}</p><span class="tag">${session.adherence}% adherence</span></div>`).join("")}</div>
  `;
}

function shareWhatsApp() {
  const client = selectedClient();
  shareReportFor(client.id);
}

function renderClientProgress(client) {
  return `
    <div class="panel">
      <div class="section-title"><span>↗</span><h3>My growth</h3></div>
      <p class="subtle">Your growth is measured by consistency, workout completion, weight movement, and honest updates to Vipul.</p>
    </div>
    ${renderProgressTimeline(client)}
    <div class="grid dashboard-grid">
      <div class="panel metric"><span>Today</span><strong>${completion(client)}%</strong><em>${client.todayPlan.filter((item) => item.done).length}/${client.todayPlan.length} exercises</em></div>
      <div class="panel metric"><span>Weekly</span><strong>${weeklyProgress(client)}%</strong><em>Your week progress</em></div>
      <div class="panel metric"><span>Monthly</span><strong>${monthlyProgress(client)}%</strong><em>Recent adherence</em></div>
      <div class="panel metric"><span>Overall</span><strong class="good">${overallProgress(client)}%</strong><em>Goal journey</em></div>
    </div>
  `;
}

function renderClientWeek(client) {
  return `
    <div class="panel">
      <div class="section-title"><span>▦</span><h3>Your week</h3></div>
      <div class="holiday-strip">
        <p class="subtle">Holiday requests are on your main Plan screen. If Vipul is unavailable, you can still continue self-workout and protect the streak.</p>
      </div>
      <div class="week-list">${client.week.map((day) => `
        <details class="timeline-item">
          <summary><span>${day.day} · ${day.focus}</span><strong>${day.status}</strong></summary>
          <p>${day.status === "Completed" ? "Completed. Keep this consistency." : day.status === "Today" ? "Today's session. Mark exercises from Plan as you complete them." : "Planned by Vipul."}</p>
        </details>
      `).join("")}</div>
    </div>
  `;
}

function renderClientReport(client) {
  return `
    ${renderProgressTimeline(client)}
    <div class="panel report-paper">${renderReportPaper(client)}</div>
  `;
}

function renderClientHolidayManager(client) {
  const upcoming = client.holidays.filter((item) => item.status !== "cancelled" && item.date >= todayISO()).sort((a, b) => a.date.localeCompare(b.date));
  const trainerUpcoming = state.trainer.holidays.filter((item) => item.status !== "cancelled" && item.date >= todayISO()).sort((a, b) => a.date.localeCompare(b.date));
  return `
    <div class="panel">
      <div class="section-title"><span>☾</span><h3>Holiday marker</h3></div>
      <p class="subtle">Request holiday from today up to 3 months ahead. Vipul will confirm it. If holiday is cancelled, submit the routine workout you performed that day.</p>
      <div class="form-grid">
        <label>Holiday date<input id="clientHolidayDate" type="date" min="${todayISO()}" max="${maxHolidayISO()}" value="${todayISO()}" /></label>
        <label>Reason<input id="clientHolidayReason" placeholder="Example: travel, family function, office commitment" /></label>
      </div>
      <button class="primary-btn" onclick="submitClientHolidayRequest()">Update Vipul: request holiday</button>
      <details class="timeline-item" style="margin-top:12px">
        <summary><span>Holiday cancelled?</span><strong>Mark routine day</strong></summary>
        <p>Select what you actually performed. Vipul will confirm and update final progress.</p>
        <div class="exercise-list">
          ${client.todayPlan.map((item, index) => `
            <label class="client-check">
              <input type="checkbox" data-cancel-holiday-done="${index}" />
              <span>${item.name}</span>
              <small>${item.detail}</small>
            </label>
          `).join("")}
        </div>
        <label>Actual workout note<textarea id="holidayCancelNote" placeholder="Example: did home workout and completed push-up, row, core"></textarea></label>
        <button class="ghost-btn" onclick="submitClientHolidayCancel()">Update Vipul: holiday cancelled, routine workout done</button>
      </details>
      ${trainerUpcoming.length ? `<div class="log-list">${trainerUpcoming.map((item) => `<div class="card"><strong>Vipul unavailable: ${item.date}</strong><p class="subtle">${item.reason || "Trainer holiday"} · you can still do self-workout</p></div>`).join("")}</div>` : ""}
      ${upcoming.length ? `<div class="log-list">${upcoming.map((item) => `<div class="card"><strong>Your holiday: ${item.date}</strong><p class="subtle">${item.reason || "Holiday marked"}</p></div>`).join("")}</div>` : `<p class="subtle">No confirmed upcoming holidays.</p>`}
    </div>
  `;
}

function renderClientMore(client) {
  const pending = pendingForClient(client.id);
  return `
    <div class="more-grid">
      <div class="panel">
        <div class="section-title"><span>◎</span><h3>Send update to Vipul</h3></div>
        <div class="form-grid">
          <label>Age<input id="clientAge" inputmode="numeric" value="${client.demographics?.age || ""}" placeholder="Example: 36" /></label>
          <label>Height<input id="clientHeight" value="${client.demographics?.height || ""}" placeholder="Example: 5 ft 8 in" /></label>
          <label>Current weight<input id="clientWeight" type="number" value="${client.currentWeight}" /></label>
          <label>City<input id="clientCity" value="${client.demographics?.city || ""}" placeholder="Example: Mumbai" /></label>
        </div>
        <button class="primary-btn" onclick="submitClientProfileUpdate()">Send profile/weight update</button>
      </div>
      <div class="panel">
        <div class="section-title"><span>✓</span><h3>What you actually did</h3></div>
        <div class="exercise-list">
          ${client.todayPlan.map((item, index) => `
            <label class="client-check">
              <input type="checkbox" data-client-done="${index}" ${item.done ? "checked" : ""} />
              <span>${item.name}</span>
              <small>${item.detail}</small>
            </label>
          `).join("")}
        </div>
        <label>Anything different from plan?<textarea id="actualTask" placeholder="Example: skipped cable row, did 20 min cycling instead"></textarea></label>
        <button class="primary-btn" onclick="submitClientWorkoutUpdate()">Send workout update</button>
      </div>
      ${pending.length ? `<div class="panel"><h3>Pending with Vipul</h3><div class="log-list">${pending.map((item) => `<div class="card"><strong>${item.summary}</strong><p class="subtle">${new Date(item.createdAt).toLocaleString("en-IN")}</p></div>`).join("")}</div></div>` : ""}
      ${client.nutritionEnabled ? `
        <div class="more-card panel">
          <span>◌</span>
          <div><strong>Food guidance</strong><p class="subtle">${client.nutrition.protein} | Water: ${client.nutrition.water} | Avoid: ${client.nutrition.avoid}</p></div>
        </div>
      ` : `
        <div class="more-card panel">
          <span>◌</span>
          <div><strong>Food guidance</strong><p class="subtle">Vipul has not enabled nutrition guidance for your plan.</p></div>
        </div>
      `}
      <button class="more-card panel" onclick="window.open('https://wa.me/91${state.trainer.phone}', '_blank')">
        <span>↗</span>
        <div><strong>Message Vipul</strong><p class="subtle">Ask about your workout, holiday, or progress.</p></div>
      </button>
      <button class="more-card panel" onclick="logout()">
        <span>⏻</span>
        <div><strong>Logout</strong><p class="subtle">Close your private plan.</p></div>
      </button>
    </div>
  `;
}

function submitClientProfileUpdate() {
  const client = selectedClient();
  const currentWeight = Number(document.getElementById("clientWeight").value) || client.currentWeight;
  const demographics = {
    age: document.getElementById("clientAge").value.trim(),
    height: document.getElementById("clientHeight").value.trim(),
    city: document.getElementById("clientCity").value.trim(),
  };
  createPendingUpdate(client.id, "profile", { profile: { currentWeight }, demographics }, `Profile update: weight ${currentWeight} kg`);
  renderClientPortal();
}

function submitClientWorkoutUpdate() {
  const client = selectedClient();
  const checked = [...document.querySelectorAll("[data-client-done]:checked")].map((input) => Number(input.dataset.clientDone));
  const actualTask = document.getElementById("actualTask").value.trim();
  const adherence = client.todayPlan.length ? Math.round((checked.length / client.todayPlan.length) * 100) : 0;
  createPendingUpdate(client.id, "workout", { doneIndexes: checked, actualTask, adherence }, `Workout update: ${checked.length}/${client.todayPlan.length} planned tasks done${actualTask ? " + actual note" : ""}`);
  renderClientPortal();
}

function renderClientView(client) {
  if (clientView === "progress") return renderClientProgress(client);
  if (clientView === "week") return renderClientWeek(client);
  if (clientView === "report") return renderClientReport(client);
  if (clientView === "more") return renderClientMore(client);
  return `${renderPhone(client)}${renderClientHolidayManager(client)}`;
}

function setClientView(nextView) {
  clientView = nextView;
  renderClientPortal();
}

function renderClientBottomNav() {
  const items = [
    ["plan", "✓", "Plan"],
    ["progress", "↗", "Progress"],
    ["week", "▦", "Week"],
    ["report", "◌", "Report"],
    ["more", "•••", "More"],
  ];
  return `
    <nav class="bottom-nav" aria-label="Client navigation">
      ${items.map(([key, icon, label]) => `<button class="${clientView === key ? "active" : ""}" onclick="setClientView('${key}')"><span>${icon}</span>${label}</button>`).join("")}
    </nav>
  `;
}

function renderGrowth() {
  const activeClients = state.clients.filter((client) => client.status === "active").length;
  const pending = state.pendingUpdates.filter((item) => item.status === "pending").length;
  const avg = Math.round(state.clients.reduce((sum, client) => sum + overallProgress(client), 0) / state.clients.length);
  return `
    <div class="grid dashboard-grid">
      <div class="panel metric"><span>Active clients</span><strong>${activeClients}</strong><em>capacity discipline</em></div>
      <div class="panel metric"><span>Avg progress</span><strong>${avg}%</strong><em>client outcomes</em></div>
      <div class="panel metric"><span>Pending reviews</span><strong>${pending}</strong><em>response quality</em></div>
      <div class="panel metric"><span>Workout master</span><strong>${state.workoutMaster.length}</strong><em>system maturity</em></div>
    </div>
    <div class="panel">
      <div class="section-title"><span>↗</span><h3>Trainer growth focus</h3></div>
      <p class="subtle">This is not generic motivation. Vipul should improve the business by reducing memory work, improving review speed, and standardising workout planning.</p>
    </div>
    <div class="grid three-col">
      ${state.trainer.growth.map((item, index) => `
        <div class="panel">
          <span class="tag">Habit ${index + 1}</span>
          <h3 style="margin-top:10px">${item}</h3>
          <p class="subtle">This is how Vipul grows beyond 5-10 clients without chaos.</p>
        </div>
      `).join("")}
    </div>
    <div class="panel" style="margin-top:14px">
      <h3>Add trainer development habit</h3>
      <div class="row">
        <input id="growthHabit" placeholder="Example: review 3 client videos every Friday" />
        <button class="primary-btn" onclick="addGrowthHabit()">Add</button>
      </div>
    </div>
  `;
}

function addGrowthHabit() {
  const input = document.getElementById("growthHabit");
  if (!input.value.trim()) return;
  state.trainer.growth.push(input.value.trim());
  saveState();
  renderShell();
}

function renderPhone(client) {
  const isClient = role === "client";
  const trainerHoliday = datedHoliday(state.trainer.holidays);
  const clientHoliday = datedHoliday(client.holidays);
  const holidayText = [
    trainerHoliday ? (isClient ? `Vipul unavailable today: ${trainerHoliday.reason}` : "Trainer holiday today") : "",
    clientHoliday ? (isClient ? `Your holiday today: ${clientHoliday.reason}` : "Client holiday today") : "",
  ].filter(Boolean).join(" | ");
  return `
    <div class="phone">
      <div class="phone-screen">
        <div class="spread">
          <div><h2>${isClient ? `Hi, ${client.name}` : client.name}</h2><p class="subtle">${isClient ? `Your goal: ${client.goal}` : client.goal}</p></div>
          <span class="status-pill">${completion(client)}% today</span>
        </div>
        <div class="mini-progress-grid">
          <div><strong>${completion(client)}%</strong><span>Today</span></div>
          <div><strong>${overallProgress(client)}%</strong><span>Overall</span></div>
        </div>
        ${holidayText ? `<p class="mini-pill">${holidayText}</p>` : ""}
        <h3>${isClient ? "Your plan today" : "Today"}</h3>
        <div class="exercise-list">${client.todayPlan.map((item, index) => renderExercise(client, item, index, role === "client")).join("")}</div>
        <h3 style="margin-top:16px">${isClient ? "Your week" : "This Week"}</h3>
        <div class="week-list">${client.week.map((day) => `<div class="week-day"><strong>${day.day}</strong><span>${day.focus}</span><span class="mini-pill">${day.status}</span></div>`).join("")}</div>
        <div class="card" style="margin-top:12px">
          <strong>${isClient ? "Vipul's note" : "Trainer note"}</strong>
          <p class="subtle">${client.note}</p>
        </div>
        ${client.nutritionEnabled ? `<div class="card" style="margin-top:12px"><strong>${isClient ? "Food guidance" : "Nutrition"}</strong><p class="subtle">${client.nutrition.protein} | Water: ${client.nutrition.water}</p></div>` : ""}
        <button class="primary-btn" style="width:100%;margin-top:12px" onclick="window.open('${role === "client" ? `https://wa.me/91${state.trainer.phone}` : `https://wa.me/91${client.phone || state.trainer.phone}`}', '_blank')">${role === "client" ? "Message Vipul" : "Message client"}</button>
      </div>
    </div>
  `;
}

function renderClientPortal() {
  const client = selectedClient();
  const titles = {
    plan: "My ViFit Plan",
    progress: "My Progress",
    week: "My Week",
    report: "My Report",
    more: "More",
  };
  app(`
    <section class="liquid-shell client-only">
      <header class="liquid-header">
        <div class="brand compact">${lightningLogo()}<div><h1>${titles[clientView]}</h1><p>${client.name} · private access</p></div></div>
        <button class="glass-icon" onclick="logout()" aria-label="Logout">⏻</button>
      </header>
      <section class="liquid-content">
        ${renderClientView(client)}
      </section>
      ${renderClientBottomNav()}
    </section>
  `);
}

function logout() {
  role = null;
  renderLogin();
}

renderLogin();
