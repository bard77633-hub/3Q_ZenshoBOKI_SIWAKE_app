

/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Logic Controller - V10 (Refactored & Enhanced Gacha)
 * 
 * Dependencies:
 * - data.js (Randomizer, COLLECTION_ITEMS, GENRE_STRUCTURE, QUESTIONS) must be loaded first.
 */

// --- Utilities ---
function generateId() { return 'id-' + Math.random().toString(36).substr(2, 9); }
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- State ---
const state = {
  currentSessionQueue: [], 
  currentIndex: 0,
  debitLines: [],
  creditLines: [],
  editingId: null, 
  tempAmount: "0",
  selectedChoice: null,
  sessionStats: { correct: 0, total: 0 },
  currentMode: null, 
  currentGenreId: null
};

const explanationState = {
  active: false,
  question: null,
  steps: [],
  currentStepIndex: -1,
  intervalId: null,
  isPlaying: false
};

let userStats = {
  correct: 0,
  total: 0,
  history: [],
  categoryScores: {},
  inventory: [] // Array of item IDs
};

// --- Core Logic ---

function initApp() {
  console.log("App Initializing V10...");
  loadStats();
  renderHomeStats();
  renderHomeMenu();
  
  // Event Listeners
  document.getElementById('btn-comprehensive').addEventListener('click', () => startSession('comprehensive'));
  document.getElementById('open-collection-btn').addEventListener('click', showCollectionScreen);
  document.getElementById('close-collection-btn').addEventListener('click', hideCollectionScreen);
  
  document.getElementById('clear-data-btn').addEventListener('click', () => {
    if(confirm('学習データとコレクションをすべてリセットしますか？')) {
      userStats = { correct: 0, total: 0, history: [], categoryScores: {}, inventory: [] };
      saveStats();
      renderHomeStats();
      renderHomeMenu();
      document.body.classList.remove('bg-complete'); // Reset theme
    }
  });

  document.getElementById('back-home-btn').addEventListener('click', showHomeScreen);
  document.getElementById('check-btn').addEventListener('click', checkAnswer);
  document.getElementById('next-btn').addEventListener('click', nextQuestion);
  document.getElementById('reset-q-btn').addEventListener('click', resetCurrentQuestion);
  
  document.getElementById('add-debit-btn').addEventListener('click', () => addLine('debit'));
  document.getElementById('add-credit-btn').addEventListener('click', () => addLine('credit'));

  // Explanation
  document.getElementById('open-expl-mode-btn').addEventListener('click', startExplanationMode);
  document.getElementById('close-expl-btn').addEventListener('click', closeExplanationMode);
  document.getElementById('expl-prev-btn').addEventListener('click', () => changeExplStep(-1));
  document.getElementById('expl-next-btn').addEventListener('click', () => changeExplStep(1));
  document.getElementById('expl-play-btn').addEventListener('click', toggleExplPlay);

  // Bonus Game (New Gacha Flow)
  document.getElementById('gacha-box-container').addEventListener('click', playGachaOpenAnimation);
  
  document.getElementById('gacha-close-btn').addEventListener('click', () => {
    const modal = document.getElementById('gacha-result-modal');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        showHomeScreen();
    }, 300);
  });

  // Item Detail Modal
  document.getElementById('close-detail-btn').addEventListener('click', hideItemDetail);
  document.getElementById('item-detail-modal').addEventListener('click', (e) => {
    if(e.target.id === 'item-detail-modal') hideItemDetail();
  });

  // Keypad
  setupKeypad();
  document.getElementById('keypad-close').addEventListener('click', closeKeypad);
  document.getElementById('key-enter').addEventListener('click', confirmAmount);
  document.getElementById('key-clear').addEventListener('click', () => updateKeypadDisplay("0"));
  document.getElementById('key-backspace').addEventListener('click', () => {
    const current = state.tempAmount;
    updateKeypadDisplay(current.length > 1 ? current.slice(0, -1) : "0");
  });
}

// --- Menu Rendering ---
function renderHomeMenu() {
  const container = document.getElementById('dynamic-menu-area');
  if (!container) return;
  container.innerHTML = '';
  GENRE_STRUCTURE.forEach(major => {
    const groupDiv = document.createElement('div');
    groupDiv.className = "bg-white/90 backdrop-blur rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-4";
    const header = document.createElement('div');
    header.className = "bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center";
    const title = document.createElement('h3');
    title.className = "font-bold text-slate-700 text-sm md:text-base";
    title.textContent = major.title;
    const mixBtn = document.createElement('button');
    mixBtn.className = "text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold hover:bg-blue-200 transition-colors";
    mixBtn.innerHTML = "まとめ (5問)";
    mixBtn.onclick = () => startSession('major', major.id, major.title);
    header.appendChild(title);
    header.appendChild(mixBtn);
    groupDiv.appendChild(header);
    const subContainer = document.createElement('div');
    subContainer.className = "divide-y divide-slate-100";
    major.subs.forEach(sub => {
      const subRow = document.createElement('button');
      subRow.className = "w-full text-left p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors flex justify-between items-center";
      subRow.onclick = () => startSession('sub', sub.id, sub.title);
      const subName = document.createElement('span');
      subName.className = "text-sm text-slate-600 font-medium";
      subName.textContent = sub.title;
      const stats = userStats.categoryScores[sub.id];
      const badge = document.createElement('span');
      if (stats) {
        const rate = stats.total > 0 ? stats.correct / stats.total : 0;
        let colorClass = "bg-slate-100 text-slate-400";
        if (rate >= 0.8) colorClass = "bg-green-100 text-green-700 border border-green-200";
        else if (rate >= 0.4) colorClass = "bg-yellow-50 text-yellow-600 border border-yellow-100";
        else colorClass = "bg-red-50 text-red-500 border border-red-100";
        badge.className = `text-xs px-2 py-1 rounded ${colorClass} font-mono`;
        badge.textContent = `${stats.correct}/${stats.total}`;
      } else {
        badge.className = "text-xs text-slate-300 font-light";
        badge.textContent = "-";
      }
      subRow.appendChild(subName);
      subRow.appendChild(badge);
      subContainer.appendChild(subRow);
    });
    groupDiv.appendChild(subContainer);
    container.appendChild(groupDiv);
  });
}

function startSession(mode, id = null, title = null) {
  let selectedQuestions = [];
  let limit = 5;
  let sessionTitle = "";

  if (mode === 'comprehensive') {
    selectedQuestions = [...QUESTIONS];
    limit = 10;
    sessionTitle = "総合演習";
  } 
  else if (mode === 'major') {
    selectedQuestions = QUESTIONS.filter(q => q.major === id);
    limit = 5;
    sessionTitle = title + " (まとめ)";
  } 
  else if (mode === 'sub') {
    const pool = QUESTIONS.filter(q => q.sub === id);
    if (pool.length < 5 && pool.length > 0) {
        while(selectedQuestions.length < 5) {
            selectedQuestions = selectedQuestions.concat(pool);
        }
        selectedQuestions = selectedQuestions.slice(0, 5);
    }
    else {
        selectedQuestions = pool;
    }
    limit = 5;
    sessionTitle = title;
  }

  if (selectedQuestions.length === 0) {
    alert("この単元の問題は現在準備中です。\n別の単元を選択してください。");
    return;
  }

  selectedQuestions = shuffleArray(selectedQuestions).slice(0, limit);
  state.currentSessionQueue = selectedQuestions.map(q => {
    const clone = JSON.parse(JSON.stringify(q));
    const original = QUESTIONS.find(o => o.id === q.id);
    if (original && original.mutate) return original.mutate(clone);
    return clone;
  });

  state.currentIndex = 0;
  state.sessionStats = { correct: 0, total: state.currentSessionQueue.length };
  state.currentMode = mode;
  state.currentGenreId = id; 

  document.getElementById('session-title').textContent = sessionTitle;
  document.getElementById('home-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  window.scrollTo(0,0);
  loadQuestion();
}

function showHomeScreen() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('home-screen').classList.remove('hidden');
  document.getElementById('result-modal').classList.add('hidden');
  document.getElementById('gacha-opening-screen').classList.add('hidden'); // Ensure opening screen is hidden
  document.getElementById('gacha-result-modal').classList.add('hidden');
  document.getElementById('explanation-screen').classList.add('hidden');
  document.getElementById('collection-screen').classList.add('hidden');
  renderHomeStats();
  renderHomeMenu();
  window.scrollTo(0, 0);
}

// --- Collection Screen Logic ---
function showCollectionScreen() {
  const screen = document.getElementById('collection-screen');
  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';

  // Stats Counters
  const counts = { common: 0, rare: 0, super: 0 };
  const totals = { common: 0, rare: 0, super: 0 };

  COLLECTION_ITEMS.forEach(item => {
    // Count totals
    if (item.rarity === 1) totals.common++;
    else if (item.rarity === 2) totals.rare++;
    else if (item.rarity === 3) totals.super++;

    const isOwned = userStats.inventory.includes(item.id);
    if (isOwned) {
      if (item.rarity === 1) counts.common++;
      else if (item.rarity === 2) counts.rare++;
      else if (item.rarity === 3) counts.super++;
    }

    const el = document.createElement('div');
    // Base Classes
    let rarityClass = "rarity-common";
    if (item.rarity === 2) rarityClass = "rarity-rare";
    if (item.rarity === 3) rarityClass = "rarity-super";

    el.className = `aspect-[3/4] rounded-xl border-2 flex flex-col items-center justify-center p-2 shadow-sm transition-transform active:scale-95 cursor-pointer relative overflow-hidden ${isOwned ? rarityClass : 'item-locked border-slate-200'}`;
    
    if (isOwned) {
      el.innerHTML = `
        <div class="text-4xl mb-2 drop-shadow-sm">${item.icon}</div>
        <div class="text-[10px] md:text-xs font-bold text-slate-700 text-center leading-tight bg-white/60 rounded px-1 w-full truncate">${item.name}</div>
        ${item.rarity === 3 ? '<div class="absolute top-0 right-0 p-1 text-[8px] text-yellow-600 font-bold">★</div>' : ''}
      `;
      el.onclick = () => showItemDetail(item);
    } else {
      el.innerHTML = `
        <div class="text-3xl mb-1 opacity-20">🔒</div>
        <div class="text-[10px] text-slate-300 font-bold">No.${item.id}</div>
      `;
      el.onclick = () => { /* Play lock sound or small shake? */ };
    }
    grid.appendChild(el);
  });

  // Update Header Stats
  document.getElementById('stat-common').textContent = `${counts.common}/${totals.common}`;
  document.getElementById('stat-rare').textContent = `${counts.rare}/${totals.rare}`;
  document.getElementById('stat-super').textContent = `${counts.super}/${totals.super}`;

  screen.classList.remove('hidden');
}

function hideCollectionScreen() {
  document.getElementById('collection-screen').classList.add('hidden');
}

// Item Detail Modal
function showItemDetail(item) {
  const modal = document.getElementById('item-detail-modal');
  const card = document.getElementById('item-detail-card');
  const badge = document.getElementById('detail-rarity-badge');
  const icon = document.getElementById('detail-icon');
  const name = document.getElementById('detail-name');
  const desc = document.getElementById('detail-desc');
  const idDisplay = document.getElementById('detail-id');

  icon.textContent = item.icon;
  name.textContent = item.name;
  desc.textContent = item.desc;
  idDisplay.textContent = item.id.toString().padStart(2, '0');

  // Reset Card Style
  card.className = "w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 scale-100 border-4";
  badge.className = "mb-4 text-xs font-black tracking-widest px-2 py-0.5 rounded border";

  if (item.rarity === 1) {
    card.classList.add('border-slate-200');
    badge.textContent = "COMMON";
    badge.classList.add('bg-slate-100', 'text-slate-500', 'border-slate-200');
  } else if (item.rarity === 2) {
    card.classList.add('border-blue-200');
    badge.textContent = "RARE";
    badge.classList.add('bg-blue-50', 'text-blue-500', 'border-blue-200');
  } else {
    card.classList.add('border-yellow-300');
    badge.textContent = "SUPER RARE";
    badge.classList.add('bg-yellow-50', 'text-yellow-600', 'border-yellow-200', 'shadow-sm');
  }

  modal.classList.remove('hidden');
  // Trigger fade in
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
  });
}

function hideItemDetail() {
  const modal = document.getElementById('item-detail-modal');
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}


// --- Question Rendering & Input (Standard) ---
function loadQuestion() {
  const q = state.currentSessionQueue[state.currentIndex];
  document.getElementById('progress-text').textContent = `${state.currentIndex + 1} / ${state.currentSessionQueue.length}`;
  document.getElementById('question-id').textContent = (state.currentIndex + 1); 
  document.getElementById('question-text').textContent = q.text;
  state.debitLines = [{ id: generateId(), accountName: null, amount: 0 }];
  state.creditLines = [{ id: generateId(), accountName: null, amount: 0 }];
  state.selectedChoice = null;
  renderChoices(q.choices);
  renderLines();
  const main = document.querySelector('#game-screen main');
  if(main) main.scrollTop = 0;
}
function renderChoices(choices) {
  const container = document.getElementById('choices-container');
  if (!container) return;
  container.innerHTML = '';
  choices.forEach(choice => {
    const chip = document.createElement('div');
    chip.className = "bg-white border-2 border-slate-200 text-slate-700 px-3 py-2 rounded-lg cursor-pointer transition-all active:scale-95 select-none text-sm font-bold shadow-sm touch-manipulation";
    chip.draggable = true;
    chip.textContent = choice;
    chip.addEventListener('click', () => handleChoiceClick(choice, chip));
    chip.addEventListener('dragstart', (e) => {
      handleChoiceClick(null, null);
      e.dataTransfer.setData('text/plain', choice);
      chip.classList.add('opacity-50');
    });
    chip.addEventListener('dragend', () => chip.classList.remove('opacity-50'));
    container.appendChild(chip);
  });
}
function handleChoiceClick(choiceName, element) {
  const allChips = document.querySelectorAll('#choices-container div');
  if (state.selectedChoice === choiceName) {
    state.selectedChoice = null;
    allChips.forEach(c => c.classList.remove('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700'));
    return;
  }
  state.selectedChoice = choiceName;
  allChips.forEach(c => c.classList.remove('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700'));
  if (choiceName && element) {
    element.classList.add('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700');
  }
}
function renderLines() { renderSide('debit'); renderSide('credit'); }
function renderSide(side) {
  const containerId = side === 'debit' ? 'debit-area' : 'credit-area';
  const container = document.getElementById(containerId);
  const lines = side === 'debit' ? state.debitLines : state.creditLines;
  if (!container) return;
  container.innerHTML = '';
  lines.forEach(line => {
    const row = document.createElement('div');
    row.className = `flex flex-col md:flex-row gap-1 p-2 rounded border mb-2 relative group ${side === 'debit' ? 'bg-blue-50/30 border-blue-100' : 'bg-red-50/30 border-red-100'}`;
    const dropZone = document.createElement('div');
    dropZone.className = `h-10 border-2 border-dashed ${line.accountName ? 'border-transparent bg-white shadow-sm' : 'border-slate-300 bg-white/50'} rounded flex items-center justify-center cursor-pointer transition-colors relative w-full`;
    dropZone.addEventListener('click', () => handleZoneClick(line.id, side));
    if (line.accountName) {
      const text = document.createElement('span');
      text.className = "font-bold text-slate-800 text-sm";
      text.textContent = line.accountName;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "✕";
      removeBtn.className = "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 font-bold p-2 z-10";
      removeBtn.onclick = (e) => { e.stopPropagation(); line.accountName = null; renderLines(); };
      dropZone.appendChild(text); dropZone.appendChild(removeBtn);
    } else {
      const placeholder = state.selectedChoice ? "ここをタップ" : "空欄";
      dropZone.innerHTML = `<span class="text-slate-300 text-xs pointer-events-none">${placeholder}</span>`;
      if(state.selectedChoice) dropZone.classList.add('animate-pulse', 'border-blue-300');
    }
    dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('bg-blue-100', 'border-blue-400'); };
    dropZone.ondragleave = () => { dropZone.classList.remove('bg-blue-100', 'border-blue-400'); };
    dropZone.ondrop = (e) => { e.preventDefault(); const data = e.dataTransfer.getData('text/plain'); if (data) { line.accountName = data; renderLines(); } };
    const amountBox = document.createElement('div');
    amountBox.className = "h-10 bg-white border border-slate-300 rounded flex items-center justify-end px-3 cursor-pointer hover:border-blue-400 active:bg-slate-50 w-full";
    amountBox.innerHTML = `<span class="font-mono text-lg ${line.amount ? 'text-slate-800 font-bold' : 'text-slate-300'}">${line.amount > 0 ? line.amount.toLocaleString() : '金額'}</span>`;
    amountBox.onclick = () => openKeypad(line.id, side);
    const delBtn = document.createElement('button');
    delBtn.className = "absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm opacity-0 group-hover:opacity-100 transition-opacity";
    delBtn.textContent = "−";
    if (lines.length > 1) { delBtn.onclick = (e) => { e.stopPropagation(); removeLine(line.id, side); }; row.appendChild(delBtn); }
    row.appendChild(dropZone); row.appendChild(amountBox); container.appendChild(row);
  });
}
function handleZoneClick(lineId, side) {
  if (state.selectedChoice) {
    const list = side === 'debit' ? state.debitLines : state.creditLines;
    const line = list.find(l => l.id === lineId);
    if (line) {
      line.accountName = state.selectedChoice;
      state.selectedChoice = null;
      document.querySelectorAll('.selected-choice').forEach(c => c.classList.remove('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700'));
      renderLines();
    }
  }
}
function addLine(side) { const newLine = { id: generateId(), accountName: null, amount: 0 }; if (side === 'debit') state.debitLines.push(newLine); else state.creditLines.push(newLine); renderLines(); }
function removeLine(id, side) { if (side === 'debit') state.debitLines = state.debitLines.filter(l => l.id !== id); else state.creditLines = state.creditLines.filter(l => l.id !== id); renderLines(); }
function resetCurrentQuestion() { loadQuestion(); }

// Keypad
function setupKeypad() {
  const container = document.querySelector('#keypad-content .grid-cols-3');
  if (!container) return;
  container.innerHTML = '';
  const keys = ['7','8','9','4','5','6','1','2','3','0','00','000'];
  keys.forEach(k => {
    const btn = document.createElement('button');
    btn.textContent = k;
    btn.className = "bg-white text-slate-700 font-semibold text-2xl py-3 active:bg-slate-200 transition-colors touch-manipulation";
    btn.onclick = () => { let val = state.tempAmount; if (val === '0') val = k; else val += k; updateKeypadDisplay(val); };
    container.appendChild(btn);
  });
}
function openKeypad(id, side) {
  state.editingId = { id, side };
  const list = side === 'debit' ? state.debitLines : state.creditLines;
  const line = list.find(l => l.id === id);
  if (line) {
    state.tempAmount = line.amount === 0 ? "0" : line.amount.toString();
    updateKeypadDisplay(state.tempAmount);
    const backdrop = document.getElementById('keypad-backdrop');
    const wrapper = document.getElementById('keypad-wrapper');
    const content = document.getElementById('keypad-content');
    backdrop.classList.remove('hidden'); wrapper.classList.remove('hidden');
    setTimeout(() => { backdrop.classList.remove('opacity-0'); content.classList.remove('translate-y-full'); }, 10);
    document.getElementById('question-container').classList.add('question-highlight');
  }
}
function closeKeypad() {
  const backdrop = document.getElementById('keypad-backdrop');
  const wrapper = document.getElementById('keypad-wrapper');
  const content = document.getElementById('keypad-content');
  backdrop.classList.add('opacity-0'); content.classList.add('translate-y-full');
  document.getElementById('question-container').classList.remove('question-highlight');
  setTimeout(() => { backdrop.classList.add('hidden'); wrapper.classList.add('hidden'); state.editingId = null; }, 200);
}
function updateKeypadDisplay(val) {
  if (val.length > 1 && val.startsWith('0')) val = val.substring(1);
  if (val.length > 10) return;
  state.tempAmount = val;
  const disp = document.getElementById('keypad-display');
  if (disp) disp.textContent = parseInt(val || '0').toLocaleString();
}
function confirmAmount() {
  if (!state.editingId) return;
  const { id, side } = state.editingId;
  const list = side === 'debit' ? state.debitLines : state.creditLines;
  const line = list.find(l => l.id === id);
  if (line) { line.amount = parseInt(state.tempAmount) || 0; renderLines(); }
  closeKeypad();
}

// Check Answer
function checkAnswer() {
  const q = state.currentSessionQueue[state.currentIndex];
  const userDebit = state.debitLines.filter(l => l.accountName && l.amount > 0);
  const userCredit = state.creditLines.filter(l => l.accountName && l.amount > 0);
  const allLines = [...state.debitLines, ...state.creditLines];
  const hasIncompleteLines = allLines.some(l => (l.accountName && !l.amount) || (!l.accountName && l.amount));
  const isEmpty = userDebit.length === 0 && userCredit.length === 0;
  if (isEmpty || hasIncompleteLines) {
    if (!confirm("未入力または不完全な項目があります。\nこのまま解答し（不正解扱いとなります）、正解を確認しますか？")) return; 
  }
  const sorter = (a, b) => (a.n || '').localeCompare(b.n || '');
  const mapper = l => ({ n: l.accountName, a: l.amount });
  const d1 = userDebit.map(mapper).sort(sorter);
  const c1 = userCredit.map(mapper).sort(sorter);
  const d2 = q.correctEntries.debit.map(mapper).sort(sorter);
  const c2 = q.correctEntries.credit.map(mapper).sort(sorter);
  const isCorrect = JSON.stringify(d1) === JSON.stringify(d2) && JSON.stringify(c1) === JSON.stringify(c2);
  if (isCorrect) { userStats.correct++; state.sessionStats.correct++; }
  userStats.total++;
  userStats.history.push({ qId: q.id, res: isCorrect, date: Date.now() });
  saveStats(); 
  showResult(isCorrect, q);
}
function showResult(isCorrect, q) {
  const modal = document.getElementById('result-modal');
  const card = document.getElementById('result-card');
  const header = document.getElementById('result-header');
  const display = document.getElementById('correct-answer-display');
  const expl = document.getElementById('explanation-text');
  const nextBtn = document.getElementById('next-btn');
  card.className = "bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up flex flex-col max-h-[85vh] border-4";
  if (isCorrect) {
    header.textContent = "正解！ 🙆‍♂️"; header.className = "p-6 text-center text-white font-bold text-3xl bg-green-500 shrink-0"; card.classList.add('border-green-500'); display.className = "bg-white p-3 rounded border border-green-200 text-sm font-mono shadow-sm"; nextBtn.className = "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm active:scale-[0.98]";
  } else {
    header.textContent = "不正解... 🙅‍♀️"; header.className = "p-6 text-center text-white font-bold text-3xl bg-red-500 shrink-0"; card.classList.add('border-red-500'); display.className = "bg-white p-3 rounded border border-red-200 text-sm font-mono shadow-sm text-red-900"; nextBtn.className = "w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm active:scale-[0.98]";
  }
  let html = `<div class="grid grid-cols-2 border border-slate-300 rounded overflow-hidden text-slate-800 text-xs md:text-sm"><div class="bg-slate-100 p-2 text-center font-bold border-r border-b border-slate-300">借方</div><div class="bg-slate-100 p-2 text-center font-bold border-b border-slate-300">貸方</div><div class="p-2 border-r border-slate-300 bg-white">`;
  q.correctEntries.debit.forEach(d => { html += `<div class="flex justify-between mb-1"><span class="font-bold text-blue-700">${d.accountName}</span><span>${d.amount.toLocaleString()}</span></div>`; });
  html += `</div><div class="p-2 bg-white">`;
  q.correctEntries.credit.forEach(c => { html += `<div class="flex justify-between mb-1"><span class="font-bold text-red-700">${c.accountName}</span><span>${c.amount.toLocaleString()}</span></div>`; });
  html += `</div></div>`;
  display.innerHTML = html; expl.textContent = q.explanation;
  nextBtn.disabled = true; nextBtn.classList.add('opacity-50', 'cursor-not-allowed'); nextBtn.textContent = "確認中...";
  modal.classList.remove('hidden');
  setTimeout(() => { nextBtn.disabled = false; nextBtn.classList.remove('opacity-50', 'cursor-not-allowed'); nextBtn.textContent = "次の問題へ"; }, 1000);
}
function nextQuestion() {
  document.getElementById('result-modal').classList.add('hidden');
  if (state.currentIndex + 1 < state.currentSessionQueue.length) { state.currentIndex++; loadQuestion(); } else { finishSession(); }
}

// --- Game End & New Gacha Logic ---
function finishSession() {
  if (state.currentGenreId && state.currentMode !== 'comprehensive') {
    userStats.categoryScores[state.currentGenreId] = { correct: state.sessionStats.correct, total: state.sessionStats.total };
    saveStats();
  }
  
  // Show Opening Screen
  const openScreen = document.getElementById('gacha-opening-screen');
  const scoreDisplay = document.getElementById('gacha-score-display');
  const box = document.getElementById('gacha-box');
  
  // Reset Box Animation State
  box.classList.remove('animate-shake-hard');
  
  scoreDisplay.textContent = `${state.sessionStats.correct} / ${state.sessionStats.total}`;
  openScreen.classList.remove('hidden');
}

function playGachaOpenAnimation() {
  const box = document.getElementById('gacha-box');
  const container = document.getElementById('gacha-box-container');
  
  // 1. Shake it hard
  box.classList.remove('animate-bounce-gentle');
  box.classList.add('animate-shake-hard');
  
  // 2. Wait a bit then flash and open
  setTimeout(() => {
    // Determine the result
    const scorePct = state.sessionStats.total > 0 ? (state.sessionStats.correct / state.sessionStats.total) : 0;
    
    // Hide opening screen immediately or fade it
    document.getElementById('gacha-opening-screen').classList.add('hidden');
    
    // Show Result
    drawGachaItem(scorePct);
  }, 800);
}

function drawGachaItem(scorePercent) {
  // Probabilities
  let probs = { common: 90, rare: 10, super: 0 };
  if (scorePercent === 1.0) probs = { common: 20, rare: 50, super: 30 };
  else if (scorePercent >= 0.8) probs = { common: 40, rare: 50, super: 10 };
  else if (scorePercent >= 0.6) probs = { common: 60, rare: 35, super: 5 };

  const roll = Math.random() * 100;
  let targetRarity = 1;
  if (roll < probs.super) targetRarity = 3;
  else if (roll < probs.super + probs.rare) targetRarity = 2;
  
  const pool = COLLECTION_ITEMS.filter(i => i.rarity === targetRarity);
  
  // Prefer new items
  let selectedItem = pool[Math.floor(Math.random() * pool.length)];
  for(let i=0; i<3; i++) {
    if (userStats.inventory.includes(selectedItem.id)) {
      selectedItem = pool[Math.floor(Math.random() * pool.length)];
    } else { break; }
  }

  const isNew = !userStats.inventory.includes(selectedItem.id);
  if (isNew) {
    userStats.inventory.push(selectedItem.id);
    saveStats();
  }

  // Populate Modal
  const modal = document.getElementById('gacha-result-modal');
  const card = document.getElementById('gacha-card');
  const icon = document.getElementById('gacha-card-icon');
  const name = document.getElementById('gacha-card-name');
  const desc = document.getElementById('gacha-desc');
  const badge = document.getElementById('gacha-new-badge');
  const rarityText = document.getElementById('gacha-rarity-text');
  const rarityBadge = document.getElementById('gacha-card-rarity-badge');

  icon.textContent = selectedItem.icon;
  name.textContent = selectedItem.name;
  desc.textContent = selectedItem.desc;
  
  if (isNew) badge.classList.remove('hidden');
  else badge.classList.add('hidden');

  // Rarity Styling
  card.className = "w-48 h-64 rounded-2xl shadow-xl border-4 flex flex-col items-center justify-center bg-white mb-6 relative overflow-hidden transition-transform duration-300 group";
  
  if (selectedItem.rarity === 1) {
    card.classList.add('rarity-common');
    rarityText.textContent = "COMMON";
    rarityText.className = "text-2xl font-black text-slate-400 mb-2 drop-shadow-sm tracking-widest";
    rarityBadge.textContent = "COMMON";
    rarityBadge.className = "text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-500 backdrop-blur-sm border border-slate-200";
  } else if (selectedItem.rarity === 2) {
    card.classList.add('rarity-rare');
    rarityText.textContent = "RARE";
    rarityText.className = "text-2xl font-black text-blue-500 mb-2 drop-shadow-sm tracking-widest";
    rarityBadge.textContent = "RARE";
    rarityBadge.className = "text-[10px] font-black px-2 py-0.5 rounded bg-blue-50 text-blue-600 backdrop-blur-sm border border-blue-200";
  } else {
    card.classList.add('rarity-super');
    rarityText.textContent = "SUPER RARE";
    rarityText.className = "text-2xl font-black text-yellow-500 mb-2 drop-shadow-sm tracking-widest";
    rarityBadge.textContent = "S.RARE";
    rarityBadge.className = "text-[10px] font-black px-2 py-0.5 rounded bg-yellow-50 text-yellow-600 backdrop-blur-sm border border-yellow-200 shadow-sm";
  }

  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.remove('opacity-0'));
  
  // Update stats if new item added
  if(isNew) renderHomeStats();
}

// Explanation & Persistence
function startExplanationMode() {
  const q = state.currentSessionQueue[state.currentIndex];
  explanationState.question = q;
  explanationState.active = true;
  document.getElementById('result-modal').classList.add('hidden');
  document.getElementById('explanation-screen').classList.remove('hidden');
  document.getElementById('expl-q-id').textContent = state.currentIndex + 1;
  if (q.explanationSteps && q.explanationSteps.length > 0) {
    explanationState.steps = [...q.explanationSteps];
  } else {
    const debitEntries = q.correctEntries.debit.map(e => ({ side: 'debit', account: e.accountName, amount: e.amount }));
    const creditEntries = q.correctEntries.credit.map(e => ({ side: 'credit', account: e.accountName, amount: e.amount }));
    explanationState.steps = [];
    if(debitEntries.length > 0) explanationState.steps.push({ highlight: "", entries: debitEntries, comment: "借方の仕訳を確認します。" });
    if(creditEntries.length > 0) explanationState.steps.push({ highlight: "", entries: creditEntries, comment: "貸方の仕訳を確認します。" });
    explanationState.steps.push({ highlight: "", entries: [], comment: q.explanation || "全体の流れを確認しましょう。" });
  }
  explanationState.currentStepIndex = -1;
  explanationState.isPlaying = false;
  updateExplControls();
  renderExplStep(-1);
}
function closeExplanationMode() {
  if (explanationState.intervalId) clearInterval(explanationState.intervalId);
  explanationState.active = false;
  document.getElementById('explanation-screen').classList.add('hidden');
  document.getElementById('result-modal').classList.remove('hidden');
}
function toggleExplPlay() {
  if (explanationState.isPlaying) {
    explanationState.isPlaying = false;
    if (explanationState.intervalId) clearInterval(explanationState.intervalId);
    updateExplControls();
  } else {
    if (explanationState.currentStepIndex >= explanationState.steps.length - 1) {
      explanationState.currentStepIndex = -1;
      renderExplStep(-1);
    }
    explanationState.isPlaying = true;
    updateExplControls();
    explanationState.intervalId = setInterval(() => {
       if (explanationState.currentStepIndex < explanationState.steps.length - 1) {
         changeExplStep(1);
       } else {
         explanationState.isPlaying = false;
         clearInterval(explanationState.intervalId);
         updateExplControls();
       }
    }, 2500); 
  }
}
function changeExplStep(delta) {
  const newIndex = explanationState.currentStepIndex + delta;
  if (newIndex >= -1 && newIndex < explanationState.steps.length) {
    explanationState.currentStepIndex = newIndex;
    renderExplStep(newIndex);
  }
}
function renderExplStep(index) {
  const q = explanationState.question;
  const steps = explanationState.steps;
  const textContainer = document.getElementById('expl-question-text');
  if (index === -1) textContainer.innerHTML = q.text;
  else {
    const step = steps[index];
    if (step.highlight && q.text.includes(step.highlight)) {
      textContainer.innerHTML = q.text.replace(step.highlight, `<span class="bg-yellow-300 rounded px-1 box-decoration-clone transition-all duration-300">${step.highlight}</span>`);
    } else textContainer.innerHTML = q.text;
  }
  const debitContainer = document.getElementById('expl-debit-area');
  const creditContainer = document.getElementById('expl-credit-area');
  debitContainer.innerHTML = '';
  creditContainer.innerHTML = '';
  const currentDebitState = [];
  const currentCreditState = [];
  const updateState = (stateArray, entry) => {
    const existingIdx = stateArray.findIndex(e => e.account === entry.account);
    if (existingIdx >= 0) stateArray[existingIdx] = { ...stateArray[existingIdx], ...entry };
    else stateArray.push({ ...entry });
  };
  if (index > -1) {
    for (let i = 0; i <= index; i++) {
      const stepEntries = steps[i].entries || [];
      stepEntries.forEach(entry => {
        if (entry.side === 'debit') updateState(currentDebitState, entry);
        if (entry.side === 'credit') updateState(currentCreditState, entry);
      });
    }
  }
  const renderEntry = (entry) => {
    const el = document.createElement('div');
    el.className = "flex justify-between items-center bg-white border border-slate-200 p-2 rounded shadow-sm animate-fade-in transition-all duration-300";
    let isNew = false;
    if (index > -1) {
      const currentStepEntries = steps[index].entries || [];
      isNew = currentStepEntries.some(e => e.account === entry.account && e.side === entry.side);
    }
    if (isNew) el.classList.add('border-blue-400', 'bg-blue-50');
    const amountDisplay = (typeof entry.amount === 'number') ? entry.amount.toLocaleString() : (entry.amount || '');
    el.innerHTML = `<span class="font-bold text-slate-700 text-sm">${entry.account}</span><span class="font-mono ${entry.amount === '???' ? 'text-slate-300 font-bold' : 'text-slate-600'}">${amountDisplay}</span>`;
    return el;
  };
  currentDebitState.forEach(e => debitContainer.appendChild(renderEntry(e)));
  currentCreditState.forEach(e => creditContainer.appendChild(renderEntry(e)));
  const commentContainer = document.getElementById('expl-commentary');
  if (index === -1) commentContainer.textContent = "それでは、仕訳のプロセスを順番に確認しましょう。再生ボタンを押すか、矢印で進めてください。";
  else commentContainer.textContent = steps[index].comment || "";
  const dotsContainer = document.getElementById('expl-progress-dots');
  dotsContainer.innerHTML = '';
  const startDot = document.createElement('div');
  startDot.className = `w-2 h-2 rounded-full transition-colors ${index === -1 ? 'bg-blue-600' : 'bg-slate-300'}`;
  dotsContainer.appendChild(startDot);
  steps.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-blue-600' : (i < index ? 'bg-blue-300' : 'bg-slate-200')}`;
    dotsContainer.appendChild(dot);
  });
  updateExplControls();
}
function updateExplControls() {
  const prevBtn = document.getElementById('expl-prev-btn');
  const nextBtn = document.getElementById('expl-next-btn');
  const playText = document.getElementById('expl-play-text');
  const playIcon = document.getElementById('expl-play-icon');
  prevBtn.disabled = explanationState.currentStepIndex <= -1;
  nextBtn.disabled = explanationState.currentStepIndex >= explanationState.steps.length - 1;
  if (explanationState.isPlaying) {
    playText.textContent = "一時停止";
    playIcon.textContent = "⏸";
  } else {
    if (explanationState.currentStepIndex >= explanationState.steps.length - 1) {
       playText.textContent = "もう一度";
       playIcon.textContent = "↻";
    } else {
       playText.textContent = "解説を再生";
       playIcon.textContent = "▶";
    }
  }
}

// Persistence
const STORAGE_KEY = 'zensho_bookkeeping_v9';
function loadStats() {
  const s = localStorage.getItem(STORAGE_KEY);
  if (s) {
    try { 
      const data = JSON.parse(s); 
      userStats = { ...userStats, ...data };
      if(!userStats.categoryScores) userStats.categoryScores = {};
      if(!userStats.inventory) userStats.inventory = [];
    } catch(e) {}
  }
}
function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userStats));
}
function renderHomeStats() {
  document.getElementById('home-stat-correct').textContent = userStats.correct;
  document.getElementById('collection-count').textContent = userStats.inventory.length;

  // Completion Check
  if (userStats.inventory.length >= COLLECTION_ITEMS.length) {
    document.body.classList.add('bg-complete');
    document.getElementById('app-title').textContent = "全商簿記3級 マスター";
    document.getElementById('app-subtitle').textContent = "すべてのアイテムをコンプリートしました！";
  } else {
    document.body.classList.remove('bg-complete');
    document.getElementById('app-title').innerHTML = "全商簿記3級<br>仕訳演習";
    document.getElementById('app-subtitle').textContent = "基礎から合格レベルまで完全網羅";
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}