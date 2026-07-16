const today = () => new Date().toISOString().slice(0, 10);

const STORAGE_KEY = 'habit_tracker';

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (_) {}
  }
  return { habits: ['喝水', '运动', '读书'], history: {} };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let data = loadData();
const todayKey = today();

if (!data.history[todayKey]) {
  data.history[todayKey] = {};
}
data.habits.forEach(h => {
  if (data.history[todayKey][h] === undefined) {
    data.history[todayKey][h] = false;
  }
});
saveData(data);

// --- DOM refs ---
const habitListEl = document.getElementById('habitList');
const habitInput = document.getElementById('habitInput');
const addBtn = document.getElementById('addBtn');
const todayDisplay = document.getElementById('todayDisplay');
const progressCount = document.getElementById('progressCount');
const progressLabel = document.getElementById('progressLabel');
const progressCircle = document.getElementById('progressCircle');

function formatDate() {
  const d = new Date();
  const weekdays = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];
  return '' + d.getFullYear() + '\u5e74' + (d.getMonth()+1) + '\u6708' + d.getDate() + '\u65e5 \u661f\u671f' + weekdays[d.getDay()];
}
todayDisplay.textContent = formatDate();

// --- Motivational Quote ---
const quotes = [
  '\u6bcf\u4e00\u5929\u90fd\u662f\u65b0\u7684\u5f00\u59cb\uff0c\u52a0\u6cb9\uff01',
  '\u575a\u6301\u5c31\u662f\u80dc\u5229\uff0c\u4eca\u5929\u4e5f\u8981\u52aa\u529b\u54e6\uff01',
  '\u5c0f\u4e60\u60ef\u6539\u53d8\u5927\u672a\u6765\uff0c\u4e00\u8d77\u52a0\u6cb9\u5427\uff01',
  '\u4eca\u5929\u7684\u4f60\u6bd4\u6628\u5929\u66f4\u5f3a\uff0c\u7ee7\u7eed\u52a0\u6cb9\uff01',
  '\u5e78\u798f\u662f\u4e00\u79cd\u4e60\u60ef\uff0c\u5929\u5929\u6253\u5361\uff01',
  '\u4e0d\u8981\u5c0f\u770b\u6bcf\u4e00\u6b65\uff0c\u79ef\u5c11\u6210\u591a\uff01',
  '\u4f60\u5df2\u7ecf\u5f88\u5e2e\u4e86\uff0c\u7ee7\u7eed\u4fdd\u6301\uff01',
  '\u505a\u6700\u597d\u7684\u81ea\u5df1\uff0c\u4ece\u4e60\u60ef\u5f00\u59cb\uff01',
  '\u4e00\u8d77\u53d8\u5f97\u66f4\u597d\uff0c\u4eca\u5929\u4e5f\u8981\u52a0\u6cb9\u554a\uff01',
  '\u4e60\u60ef\u662f\u6700\u5f3a\u5927\u7684\u529b\u91cf\uff0c\u575a\u6301\u5c31\u662f\u4e00\u5207\uff01',
  '\u7528\u884c\u52a8\u8bc1\u660e\u81ea\u5df1\uff0c\u4eca\u5929\u4e5f\u8981\u52aa\u529b\uff01',
  '\u6bcf\u4e00\u4e2a\u5c0f\u76ee\u6807\u90fd\u503c\u5f97\u795d\u8d3a\uff0c\u52a0\u6cb9\uff01',
  '\u4f60\u6bd4\u4f60\u60f3\u8c61\u7684\u66f4\u5f3a\u5927\uff0c\u4e0d\u8981\u653e\u5f03\uff01',
  '\u4eca\u5929\u7684\u4ed8\u51fa\u662f\u660e\u5929\u7684\u6536\u83b7\uff0c\u575a\u6301\uff01',
  '\u7528\u4e60\u60ef\u8ba9\u751f\u6d3b\u66f4\u7f8e\u597d\uff0c\u4eca\u5929\u4e5f\u8981\u52a0\u6cb9\uff01'
];

function updateQuote() {
  const el = document.getElementById('quoteDisplay');
  if (!el) return;
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  el.textContent = quotes[dayOfYear % quotes.length];
}

// --- Render ---
function render() {
  const day = data.history[todayKey] || {};
  const checked = data.habits.filter(h => day[h]).length;
  const total = data.habits.length;

  const circumference = 2 * Math.PI * 30;
  const offset = total > 0 ? circumference * (1 - checked / total) : circumference;
  progressCircle.style.strokeDashoffset = offset;

  progressCount.innerHTML = checked + '<small>/' + total + '</small>';
  progressLabel.innerHTML = '\u4eca\u5929\u5b8c\u6210\u4e86 <strong>' + checked + '</strong> \u9879';

  if (data.habits.length === 0) {
    habitListEl.innerHTML = '\n      <div class="empty-state">\n        <div class="emoji">\ud83c\udf31</div>\n        \u8fd8\u6ca1\u6709\u4e60\u60ef<br>\u5728\u4e0a\u9762\u6dfb\u52a0\u4e00\u4e2a\u5427\n      </div>';
    return;
  }

  habitListEl.innerHTML = data.habits.map(function(habit, idx) {
    const done = day[habit] || false;
    return '\n      <div class="habit-item' + (done ? ' checked' : '') + '" data-index="' + idx + '">\n        <div class="check-box">' + (done ? '\u2713' : '') + '</div>\n        <span class="habit-name">' + escapeHtml(habit) + '</span>\n        <button class="delete-btn" data-action="delete" title="\u5220\u9664\u4e60\u60ef">\u2715</button>\n      </div>';
  }).join('');

  renderWeekStats();
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// --- Week Stats ---
function renderWeekStats() {
  const bar = document.getElementById('weekBarFill');
  const summary = document.getElementById('weekSummary');
  if (!bar || !summary) return;

  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const totalHabits = data.habits.length;
  let totalDone = 0;
  let totalAll = 0;

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayData = data.history[dateStr];
    let done = 0;
    if (dayData && totalHabits > 0) {
      done = data.habits.filter(function(h) { return dayData[h]; }).length;
    }
    totalDone += done;
    totalAll += totalHabits;
  }

  const pct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
  bar.style.width = pct + '%';
  summary.textContent = '\u5b8c\u6210 ' + totalDone + '/' + totalAll + ' \u9879';
}

// --- Events ---
habitListEl.addEventListener('click', function(e) {
  const item = e.target.closest('.habit-item');
  if (!item) return;

  const isDelete = e.target.closest('[data-action="delete"]');
  if (isDelete) {
    const name = data.habits[+item.dataset.index];
    if (confirm('\u786e\u5b9a\u8981\u5220\u9664\u300c' + name + '\u300d\u5417\uff1f')) {
      data.habits.splice(+item.dataset.index, 1);
      for (const dateKey in data.history) {
        delete data.history[dateKey][name];
      }
      saveData(data);
      render();
    }
    return;
  }

  const habit = data.habits[+item.dataset.index];
  data.history[todayKey][habit] = !data.history[todayKey][habit];
  saveData(data);
  render();
});

function addHabit() {
  const name = habitInput.value.trim();
  if (!name) return;
  if (data.habits.includes(name)) {
    alert('\u8fd9\u4e2a\u4e60\u60ef\u5df2\u7ecf\u5b58\u5728\u4e86');
    return;
  }
  data.habits.push(name);
  if (!data.history[todayKey]) data.history[todayKey] = {};
  data.history[todayKey][name] = false;
  saveData(data);
  habitInput.value = '';
  render();
  habitInput.focus();
}

addBtn.addEventListener('click', addHabit);
habitInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') addHabit(); });

// Initial render
render();
updateQuote();
