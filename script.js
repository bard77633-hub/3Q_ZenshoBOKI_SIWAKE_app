
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { COLLECTION_ITEMS, GENRE_STRUCTURE } from './data.js';
import { RAW_QUESTIONS } from './questions.js';
import { EXPLANATIONS } from './explanations.js';

// --- Utilities ---
const generateId = () => 'id-' + Math.random().toString(36).substr(2, 9);
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Fallback: Auto-generate explanation steps if no detailed manual steps exist
const generateAutoSteps = (q, explText) => {
  const steps = [];
  steps.push({
    comment: "取引の内容を確認し、勘定科目を決定します。",
    highlight: "",
    debit: false, credit: false
  });
  q.correctEntries.debit.forEach((d) => {
    steps.push({
      comment: `借方（左側）に「${d.accountName}」を ${d.amount.toLocaleString()}円 計上します。`,
      highlight: d.accountName, 
      debit: true, debitKey: d.accountName
    });
  });
  q.correctEntries.credit.forEach((c) => {
    steps.push({
      comment: `貸方（右側）に「${c.accountName}」を ${c.amount.toLocaleString()}円 計上します。`,
      highlight: c.accountName,
      credit: true, creditKey: c.accountName
    });
  });
  steps.push({
    comment: `最後に貸借の金額が一致していることを確認します。\n\n【ポイント】\n${explText}`,
    highlight: "",
    debit: true, credit: true, showAll: true 
  });
  return steps;
};

// Smart adjustment: Replace numbers in manual steps with mutated numbers
const adjustStepsForMutation = (originalSteps, originalQ, mutatedQ) => {
  // Deep clone steps to avoid mutating the original definition
  const newSteps = JSON.parse(JSON.stringify(originalSteps));
  
  const collect = (entries) => entries.debit.concat(entries.credit);
  const oldEntries = collect(originalQ.correctEntries);
  const newEntries = collect(mutatedQ.correctEntries);
  
  // Create a replacement map: "1,000" -> "1,200"
  const replacements = [];
  
  // Strategy: Map by Account Name match. 
  // If multiple same accounts exist (rare in L3), index order usually preserves mutation structure.
  oldEntries.forEach((o, i) => {
     // Find corresponding entry in newEntries that matches account name
     // (Using index i is usually safe because mutation creates a clone structure, but let's be robust)
     const match = newEntries[i]; 
     
     if (match && match.accountName === o.accountName && match.amount !== o.amount) {
         const oldStr = o.amount.toLocaleString();
         const newStr = match.amount.toLocaleString();
         
         // Only add if not already added to prevent double replacing
         if (!replacements.some(r => r.from === oldStr)) {
             replacements.push({ from: oldStr, to: newStr });
         }
     }
  });

  // Apply replacements to comment and highlight text
  return newSteps.map(step => {
      let newComment = step.comment;
      let newHighlight = step.highlight;
      
      replacements.forEach(rep => {
          // Replace all occurrences
          if (newComment) newComment = newComment.split(rep.from).join(rep.to);
          if (newHighlight) newHighlight = newHighlight.split(rep.from).join(rep.to);
      });
      
      return { ...step, comment: newComment, highlight: newHighlight };
  });
};

// --- Components ---

// 1. Calculator & Keypad
const Keypad = ({ isOpen, onClose, onConfirm, initialValue }) => {
  const [value, setValue] = useState("0");
  const [calcMode, setCalcMode] = useState(false);
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValue(initialValue ? initialValue.toString() : "0");
      setOperand(null);
      setOperator(null);
      setResetDisplay(false);
    }
  }, [isOpen, initialValue]);

  const handleDigit = (digit) => {
    if (resetDisplay) {
      setValue(digit);
      setResetDisplay(false);
    } else {
      setValue(prev => (prev === "0" ? digit : prev + digit).slice(0, 10));
    }
  };

  const handleOp = (op) => {
    const current = parseInt(value.replace(/,/g, ''), 10);
    if (operand !== null && operator && !resetDisplay) {
      const res = calculate(operand, current, operator);
      setOperand(res);
      setValue(res.toString());
    } else {
      setOperand(current);
    }
    setOperator(op);
    setResetDisplay(true);
  };

  const calculate = (a, b, op) => {
    switch(op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? 0 : Math.floor(a / b);
      default: return b;
    }
  };

  const handleEqual = () => {
    if (operand === null || !operator) return;
    const current = parseInt(value.replace(/,/g, ''), 10);
    const res = calculate(operand, current, operator);
    setValue(res.toString());
    setOperand(null);
    setOperator(null);
    setResetDisplay(true);
  };

  const handleClear = () => {
    setValue("0");
    setOperand(null);
    setOperator(null);
    setResetDisplay(false);
  };

  const handleBackspace = () => {
    if (resetDisplay) return;
    setValue(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/50 pointer-events-auto transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-xs overflow-hidden pointer-events-auto transform transition-transform duration-300">
        <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-700 text-sm">金額を入力</h3>
            <button type="button" onClick={() => setCalcMode(!calcMode)} className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold border border-orange-200 hover:bg-orange-200">
              電卓ツール 🧮
            </button>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold p-1 px-3 bg-slate-200 rounded-full text-xs">閉じる</button>
        </div>

        {calcMode && (
          <div className="bg-orange-50 border-b border-orange-100 grid grid-cols-4 gap-1 p-2">
            {['+', '-', '*', '/'].map(op => (
              <button key={op} type="button" onClick={() => handleOp(op)} className="bg-orange-100 text-orange-700 font-bold py-2 rounded hover:bg-orange-200 touch-manipulation">
                {op === '*' ? '×' : op === '/' ? '÷' : op === '+' ? '＋' : '−'}
              </button>
            ))}
            <button type="button" onClick={handleEqual} className="col-span-4 bg-orange-200 text-orange-800 font-bold py-2 rounded mt-1 active:bg-orange-300 touch-manipulation">＝</button>
          </div>
        )}

        <div className="p-4 bg-white border-b border-blue-100 text-right">
          <span className="text-3xl font-mono font-bold text-slate-800 tracking-wider">{parseInt(value).toLocaleString()}</span>
          <span className="text-sm text-slate-400 ml-1">円</span>
        </div>

        <div className="grid grid-cols-3 gap-px bg-slate-200 border-b border-slate-200">
          {[7,8,9,4,5,6,1,2,3,0,'00','000'].map(n => (
            <button key={n} type="button" onClick={() => handleDigit(n.toString())} className="bg-white text-slate-700 font-semibold text-2xl py-3 active:bg-slate-200 touch-manipulation">
              {n}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50">
           <button type="button" onClick={handleClear} className="bg-white text-red-500 font-bold py-3 rounded shadow-sm border border-slate-200 active:bg-slate-100 touch-manipulation">C</button>
           <button type="button" onClick={handleBackspace} className="bg-white text-orange-500 font-bold py-3 rounded shadow-sm border border-slate-200 active:bg-slate-100 touch-manipulation">⌫</button>
           <button type="button" onClick={() => onConfirm(parseInt(value))} className="col-span-2 bg-blue-600 text-white font-bold py-3 rounded shadow active:bg-blue-700 touch-manipulation">決定</button>
        </div>
      </div>
    </div>
  );
};

// 2. Item Detail Modal
const ItemDetailModal = ({ item, onClose }) => {
  if (!item) return null;
  
  let borderColor = "border-slate-300";
  let badgeColor = "bg-slate-100 text-slate-500 border-slate-200";
  let rarityLabel = "COMMON";
  
  if (item.rarity === 2) {
    borderColor = "border-blue-400";
    badgeColor = "bg-blue-50 text-blue-600 border-blue-200";
    rarityLabel = "RARE";
  } else if (item.rarity === 3) {
    borderColor = "border-yellow-400";
    badgeColor = "bg-yellow-50 text-yellow-600 border-yellow-200";
    rarityLabel = "SUPER RARE";
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className={`w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 scale-100 border-4 ${borderColor}`} onClick={e => e.stopPropagation()}>
        <div className="relative p-6 flex flex-col items-center text-center">
          <button onClick={onClose} className="absolute top-3 right-3 text-slate-300 hover:text-slate-500 font-bold text-2xl leading-none">&times;</button>
          
          <div className={`mb-4 text-xs font-black tracking-widest px-2 py-0.5 rounded border ${badgeColor}`}>{rarityLabel}</div>
          
          <div className="w-24 h-24 mb-4 flex items-center justify-center text-7xl drop-shadow-md animate-bounce-gentle">
            {item.icon}
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2 w-full">{item.name}</h3>
          
          <div className="bg-slate-50 rounded-lg p-4 w-full border border-slate-100 mb-4">
            <p className="text-sm text-slate-600 leading-relaxed text-left font-medium whitespace-pre-wrap">
              {item.desc}
            </p>
          </div>
          
          <div className="text-[10px] text-slate-400">No.{item.id.toString().padStart(2, '0')}</div>
        </div>
        <div className="bg-slate-100 p-3 text-center border-t border-slate-200">
           <p className="text-[10px] text-slate-400">全商簿記実務検定</p>
        </div>
      </div>
    </div>
  );
};

// 3. Explanation Overlay
const ExplanationOverlay = ({ q, currentIndex, onClose }) => {
  const [stepIndex, setStepIndex] = useState(-1);
  const steps = q.explanationSteps || [];
  
  const currentStep = stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null;
  const currentComment = currentStep ? currentStep.comment : "まずは全体の流れを確認しましょう。（右下の▶ボタンで進む）";
  
  const revealedDebits = new Set();
  const revealedCredits = new Set();
  
  for (let i = 0; i <= stepIndex; i++) {
      const s = steps[i];
      if (s) {
          if (s.debitKey) revealedDebits.add(s.debitKey);
          if (s.creditKey) revealedCredits.add(s.creditKey);
          if (s.showAll) {
             q.correctEntries.debit.forEach(d => revealedDebits.add(d.accountName));
             q.correctEntries.credit.forEach(c => revealedCredits.add(c.accountName));
          }
      }
  }

  // Robust highlighting: If highlight text exists in q.text, replace it. Otherwise just return text.
  const displayHtml = currentStep && currentStep.highlight && q.text.includes(currentStep.highlight)
    ? q.text.replace(currentStep.highlight, `<span class="bg-yellow-300 px-1 rounded shadow-sm transition-all duration-300">${currentStep.highlight}</span>`)
    : q.text;

  const isDebitHighlight = currentStep && currentStep.debit;
  const isCreditHighlight = currentStep && currentStep.credit;

  return (
    <div className="fixed inset-0 z-[60] bg-gray-100 flex flex-col animate-fade-in">
      <div className="bg-white px-4 py-3 shadow-sm flex justify-between items-center shrink-0">
        <h2 className="font-bold text-slate-700 flex items-center gap-2">
          <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded font-black">解説モード</span>
          <span className="text-sm">Q.{currentIndex + 1}</span>
        </h2>
        <button 
          onClick={onClose} 
          className="text-slate-500 hover:text-slate-700 font-bold px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-xs"
        >
          閉じる
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
         <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <p 
             className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed transition-all duration-300" 
             dangerouslySetInnerHTML={{ __html: displayHtml }}
           />
         </div>
         
         <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[200px]">
            <div className="bg-slate-50 border-b border-slate-200 p-2 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              仕訳プロセス
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-100 text-sm h-full">
               <div className={`p-3 transition-colors duration-500 ${isDebitHighlight ? 'bg-blue-50' : ''}`}>
                 <div className="text-center text-xs text-blue-500 font-bold mb-2">借方</div>
                 <div className="space-y-2">
                 {q.correctEntries.debit.map((d, i) => {
                   const isVisible = revealedDebits.has(d.accountName);
                   return (
                     <div key={i} className={`flex justify-between items-center p-2 rounded border transition-all duration-500 gap-4 ${isVisible ? 'opacity-100 translate-y-0 border-blue-100 bg-white shadow-sm' : 'opacity-0 translate-y-2 border-transparent'}`}>
                       <span className="font-bold text-slate-700 text-left shrink-0 truncate flex-grow">{d.accountName}</span>
                       <span className="font-mono text-slate-500 text-right shrink-0 whitespace-nowrap">{d.amount.toLocaleString()}</span>
                     </div>
                   );
                 })}
                 </div>
               </div>
               <div className={`p-3 transition-colors duration-500 ${isCreditHighlight ? 'bg-red-50' : ''}`}>
                 <div className="text-center text-xs text-red-500 font-bold mb-2">貸方</div>
                 <div className="space-y-2">
                 {q.correctEntries.credit.map((c, i) => {
                   const isVisible = revealedCredits.has(c.accountName);
                   return (
                     <div key={i} className={`flex justify-between items-center p-2 rounded border transition-all duration-500 gap-4 ${isVisible ? 'opacity-100 translate-y-0 border-red-100 bg-white shadow-sm' : 'opacity-0 translate-y-2 border-transparent'}`}>
                       <span className="font-bold text-slate-700 text-left shrink-0 truncate flex-grow">{c.accountName}</span>
                       <span className="font-mono text-slate-500 text-right shrink-0 whitespace-nowrap">{c.amount.toLocaleString()}</span>
                     </div>
                   );
                 })}
                 </div>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 pb-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative bg-yellow-50 p-4 rounded-xl border border-yellow-200 min-h-[5rem] flex items-center shadow-sm transition-all">
            <div className="absolute -top-3 left-4 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-200">POINT</div>
            <p className="text-base md:text-lg font-medium text-slate-800 w-full animate-fade-in whitespace-pre-wrap">
              {currentComment}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button 
              type="button"
              onClick={() => setStepIndex(prev => Math.max(-1, prev - 1))} 
              disabled={stepIndex <= -1}
              className="p-4 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 touch-manipulation shadow-sm"
            >
              ◀
            </button>
            <div className="flex-grow text-center text-xs text-slate-400 font-bold">
              STEP {stepIndex + 2} / {steps.length + 1}
            </div>
            <button 
              type="button"
              onClick={() => setStepIndex(prev => Math.min(steps.length - 1, prev + 1))} 
              disabled={stepIndex >= steps.length - 1}
              className="p-4 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 touch-manipulation shadow-sm"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Review Modal
const ReviewModal = ({ results, onClose }) => {
  const incorrects = results.filter(r => !r.isCorrect);
  const corrects = results.filter(r => r.isCorrect);
  const sortedResults = [...incorrects, ...corrects];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
         <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-700">問題の振り返り ({results.length}問)</h3>
            <button onClick={onClose} className="text-slate-400 font-bold px-2">✕</button>
         </div>
         <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-100">
            {sortedResults.map((res, i) => (
                <div key={i} className={`bg-white p-4 rounded-xl border shadow-sm relative overflow-hidden ${res.isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${res.isCorrect ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div className="pl-3">
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400">Q.{res.q.id}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${res.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{res.isCorrect ? '正解' : '不正解'}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-800 mb-3">{res.q.text}</div>
                        
                        <div className="bg-slate-50 border border-slate-100 rounded p-2 text-xs mb-2">
                            <div className="text-[10px] text-slate-500 font-bold mb-1 text-center border-b pb-1">正解の仕訳</div>
                            <div className="flex justify-between gap-2 mt-1">
                                <div className="w-1/2 border-r border-slate-200 pr-1">
                                    <div className="text-center text-[10px] text-blue-400 font-bold">借方</div>
                                    {res.q.correctEntries.debit.map((d,k)=><div key={k} className="flex justify-between"><span>{d.accountName}</span><span>{d.amount.toLocaleString()}</span></div>)}
                                </div>
                                <div className="w-1/2 pl-1">
                                    <div className="text-center text-[10px] text-red-400 font-bold">貸方</div>
                                    {res.q.correctEntries.credit.map((c,k)=><div key={k} className="flex justify-between"><span>{c.accountName}</span><span>{c.amount.toLocaleString()}</span></div>)}
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-slate-600 leading-relaxed bg-yellow-50/50 p-2 rounded border border-yellow-100">
                            <span className="font-bold text-yellow-700">解説: </span>{res.q.explanation}
                        </div>
                    </div>
                </div>
            ))}
         </div>
         <div className="p-4 bg-white border-t">
            <button onClick={onClose} className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl">閉じる</button>
         </div>
      </div>
    </div>
  );
};

// 5. Collection Screen Component
const CollectionScreen = ({ setScreen, userStats }) => {
  const isOwned = (id) => userStats.inventory.includes(id);
  const [selected, setSelected] = useState(null);
  
  return (
    <>
      <div className="fixed inset-0 bg-slate-100 flex flex-col z-50">
        <header className="bg-white shadow-sm px-4 py-3">
          <button onClick={() => setScreen('home')} className="text-slate-500 font-bold text-sm mb-2">← HOME</button>
          <h2 className="font-bold text-slate-700">アイテム図鑑</h2>
        </header>
        <div className="flex-grow overflow-y-auto p-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-6xl mx-auto w-full">
          {COLLECTION_ITEMS.map(item => {
            const owned = isOwned(item.id);
            return (
              <div 
                key={item.id} 
                onClick={() => { if(owned) setSelected(item); }} 
                className={`aspect-[3/4] rounded-xl border-2 flex flex-col items-center justify-center p-2 shadow-sm transition-transform active:scale-95 cursor-pointer select-none ${owned ? (item.rarity===3 ? 'border-yellow-300 bg-yellow-50' : item.rarity===2 ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white') : 'border-slate-200 bg-slate-100 grayscale opacity-50 cursor-default'}`}
              >
                <div className="text-4xl mb-2">{owned ? item.icon : '🔒'}</div>
                <div className="text-xs font-bold text-slate-700 text-center leading-tight truncate w-full px-1">{owned ? item.name : `No.${item.id}`}</div>
              </div>
            );
          })}
        </div>
      </div>
      <ItemDetailModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
};

// 6. Main App Component
const App = () => {
  const [screen, setScreen] = useState('home'); 
  const [userStats, setUserStats] = useState({ correct: 0, total: 0, history: [], categoryScores: {}, inventory: [] });
  const [questions, setQuestions] = useState([]);
  const [currentSession, setCurrentSession] = useState([]);
  const [sessionMode, setSessionMode] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Game State
  const [debitLines, setDebitLines] = useState([]);
  const [creditLines, setCreditLines] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [keypadConfig, setKeypadConfig] = useState({ isOpen: false, lineId: null, side: null, initialValue: 0 });
  const [sessionStats, setSessionStats] = useState({ correct: 0 });
  const [showResultModal, setShowResultModal] = useState(false);
  const [lastResult, setLastResult] = useState(null); 
  
  // Next Button Delay State
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  // Review State
  const [sessionResults, setSessionResults] = useState([]); 
  const [showReview, setShowReview] = useState(false);

  // Gacha State
  const [gachaItem, setGachaItem] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [showGachaDetail, setShowGachaDetail] = useState(false); 

  // Explanation State
  const [showExplanation, setShowExplanation] = useState(false);

  // Initialization
  useEffect(() => {
    setQuestions(RAW_QUESTIONS); 
    const saved = localStorage.getItem('zensho_bookkeeping_v3');
    if (saved) {
      try { setUserStats(JSON.parse(saved)); } catch(e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('zensho_bookkeeping_v3', JSON.stringify(userStats));
  }, [userStats]);

  // Handle Next Button Delay
  useEffect(() => {
    if (showResultModal) {
      setIsNextButtonDisabled(true);
      const timer = setTimeout(() => {
        setIsNextButtonDisabled(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showResultModal]);

  // --- Actions ---

  const startSession = (mode, id = null) => {
    let pool = [];
    if (mode === 'comprehensive') pool = [...questions];
    else if (mode === 'major') pool = questions.filter(q => q.major === id);
    else if (mode === 'sub') pool = questions.filter(q => q.sub === id);

    if (pool.length === 0) return alert("準備中です");

    pool = shuffleArray(pool).slice(0, mode === 'comprehensive' ? 10 : 5);
    const session = pool.map(q => {
      const clone = JSON.parse(JSON.stringify(q));
      
      // 1. Mutate the question (randomize numbers)
      const mutated = q.mutate ? q.mutate(clone) : clone;
      
      // 2. Resolve Explanations with Numeric Adjustment
      const manualExpl = EXPLANATIONS[q.id];
      
      if (manualExpl && manualExpl.steps) {
         // Use the detailed manual steps, but adjust numbers to match the mutation
         mutated.explanationSteps = adjustStepsForMutation(manualExpl.steps, q, mutated);
         mutated.explanation = manualExpl.explanation;
      } else {
         // Fallback to generic steps if no manual steps exist
         mutated.explanationSteps = generateAutoSteps(mutated, mutated.explanation || q.explanation);
      }
      
      return mutated;
    });

    setSessionMode(mode); 
    setCurrentSession(session);
    setSessionResults([]); 
    setCurrentIndex(0);
    setSessionStats({ correct: 0 });
    setDebitLines([{ id: generateId(), accountName: null, amount: 0 }]);
    setCreditLines([{ id: generateId(), accountName: null, amount: 0 }]);
    setScreen('game');
  };

  const handleLineUpdate = (side, id, field, val) => {
    const setter = side === 'debit' ? setDebitLines : setCreditLines;
    setter(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l));
  };

  const addLine = (side) => {
    const setter = side === 'debit' ? setDebitLines : setCreditLines;
    setter(prev => [...prev, { id: generateId(), accountName: null, amount: 0 }]);
  };

  const removeLine = (side, id) => {
    const setter = side === 'debit' ? setDebitLines : setCreditLines;
    setter(prev => prev.filter(l => l.id !== id));
  };

  const handleChoiceClick = (choice) => {
    setSelectedChoice(selectedChoice === choice ? null : choice);
  };

  const handleZoneClick = (side, id) => {
    if (selectedChoice) {
      handleLineUpdate(side, id, 'accountName', selectedChoice);
      setSelectedChoice(null);
    }
  };

  const checkAnswer = () => {
    const hasIncomplete = [...debitLines, ...creditLines].some(l => !l.accountName || l.amount <= 0);
    if (hasIncomplete) {
      if (!window.confirm("科目未選択または金額が0円の行があります。\nこのまま解答してよろしいですか？")) {
        return;
      }
    }

    const q = currentSession[currentIndex];
    const dEntries = debitLines.filter(l => l.accountName && l.amount > 0).map(l => ({ n: l.accountName, a: l.amount }));
    const cEntries = creditLines.filter(l => l.accountName && l.amount > 0).map(l => ({ n: l.accountName, a: l.amount }));
    
    const normalize = (entries, aliases) => entries.map(e => {
      let name = e.n;
      if (aliases?.debit) aliases.debit.forEach(a => { if (Object.values(a)[0].includes(name)) name = Object.keys(a)[0]; });
      if (aliases?.credit) aliases.credit.forEach(a => { if (Object.values(a)[0].includes(name)) name = Object.keys(a)[0]; });
      return { n: name, a: e.a };
    }).sort((a,b) => a.n.localeCompare(b.n));

    const dNorm = normalize(dEntries, q.aliases);
    const cNorm = normalize(cEntries, q.aliases);
    const dCorrect = q.correctEntries.debit.map(l => ({ n: l.accountName, a: l.amount })).sort((a,b) => a.n.localeCompare(b.n));
    const cCorrect = q.correctEntries.credit.map(l => ({ n: l.accountName, a: l.amount })).sort((a,b) => a.n.localeCompare(b.n));

    const isCorrect = JSON.stringify(dNorm) === JSON.stringify(dCorrect) && JSON.stringify(cNorm) === JSON.stringify(cCorrect);

    if (isCorrect) {
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setUserStats(prev => ({ 
        ...prev, 
        correct: prev.correct + 1, 
        total: prev.total + 1
      }));
    } else {
      setUserStats(prev => ({ ...prev, total: prev.total + 1 }));
    }

    setSessionResults(prev => [...prev, { q, isCorrect }]);
    setLastResult({ isCorrect, q });
    setShowResultModal(true);
  };

  const nextQuestion = () => {
    setShowResultModal(false);
    if (currentIndex + 1 < currentSession.length) {
      setCurrentIndex(prev => prev + 1);
      setDebitLines([{ id: generateId(), accountName: null, amount: 0 }]);
      setCreditLines([{ id: generateId(), accountName: null, amount: 0 }]);
    } else {
      // Session Ended: Update Best Score
      if (sessionMode === 'sub') {
         const subId = currentSession[0].sub;
         if (subId) {
             const finalCorrect = sessionStats.correct;
             const finalTotal = currentSession.length;
             
             setUserStats(prev => {
                 const prevScore = prev.categoryScores[subId] || { correct: 0, total: 1 };
                 const prevRate = (prev.categoryScores[subId] ? prevScore.correct / prevScore.total : -1);
                 const currentRate = finalCorrect / finalTotal;

                 if (currentRate > prevRate || (currentRate === prevRate && finalTotal > prevScore.total)) {
                     return {
                         ...prev,
                         categoryScores: {
                             ...prev.categoryScores,
                             [subId]: { correct: finalCorrect, total: finalTotal }
                         }
                     };
                 }
                 return prev;
             });
         }
      }

      setScreen('gacha_open');
    }
  };

  const doGacha = () => {
    const scoreRate = sessionStats.correct / currentSession.length;
    let probs = { common: 100, rare: 0, super: 0 };
    if (scoreRate === 1) probs = { common: 20, rare: 50, super: 30 };
    else if (scoreRate >= 0.8) probs = { common: 40, rare: 50, super: 10 };
    else if (scoreRate >= 0.6) probs = { common: 60, rare: 35, super: 5 };
    else if (scoreRate > 0) probs = { common: 90, rare: 10, super: 0 };

    const roll = Math.random() * 100;
    let rarity = 1;
    if (roll < probs.super) rarity = 3;
    else if (roll < probs.super + probs.rare) rarity = 2;

    const pool = COLLECTION_ITEMS.filter(i => i.rarity === rarity);
    let item = pool[Math.floor(Math.random() * pool.length)];
    
    if (rarity >= 2 && userStats.inventory.includes(item.id)) {
       item = pool[Math.floor(Math.random() * pool.length)];
    }

    if (scoreRate === 0) {
       return;
    }

    const isNew = !userStats.inventory.includes(item.id);
    if (isNew) {
      setUserStats(prev => ({ ...prev, inventory: [...prev.inventory, item.id] }));
    }
    setGachaItem(item);
    setIsNewItem(isNew);
    setScreen('gacha_result');
  };

  // --- Rendering ---

  if (screen === 'home') {
    return (
      <div className="flex-grow flex flex-col items-center p-6 space-y-6 overflow-y-auto max-w-md mx-auto w-full">
        <div className="text-center space-y-2 mt-4">
          <h1 className="text-2xl font-bold text-blue-800">全商簿記3級<br/>仕訳演習</h1>
          <p className="text-slate-500 text-xs font-medium">基礎から合格レベルまで完全網羅 (React 19)</p>
        </div>
        <div className="flex gap-4 w-full">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">総正解数</div>
            <div className="text-2xl font-bold text-blue-600">{userStats.correct}<span className="text-xs text-slate-500 ml-1">問</span></div>
          </div>
          <button type="button" onClick={() => setScreen('collection')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors group">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 group-hover:text-orange-500">コレクション</div>
            <div className="text-2xl">{userStats.inventory.length}<span className="text-xs text-slate-500 ml-1">/ {COLLECTION_ITEMS.length}</span></div>
          </button>
        </div>
        <button type="button" onClick={() => startSession('comprehensive')} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex justify-between items-center hover:from-blue-700 transition-all active:scale-[0.98]">
          <div className="text-left">
            <div className="text-lg">🏆 総合演習</div>
            <div className="text-xs text-blue-100 font-normal">全範囲からランダム 10問</div>
          </div>
          <span className="text-2xl">→</span>
        </button>
        <div className="w-full space-y-4 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px bg-slate-300 flex-grow opacity-50"></div>
            <span className="text-xs font-bold text-slate-400 uppercase">ジャンル別演習</span>
            <div className="h-px bg-slate-300 flex-grow opacity-50"></div>
          </div>
          {GENRE_STRUCTURE.map(g => (
            <div key={g.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">{g.title}</h3>
                <button type="button" onClick={() => startSession('major', g.id)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">まとめ</button>
              </div>
              <div className="divide-y divide-slate-100">
                {g.subs.map(s => {
                  const score = userStats.categoryScores[s.id];
                  // Score Display logic: Best Score
                  const scoreText = score ? `${score.correct}/${score.total}` : '-';
                  const rate = score ? (score.correct / score.total) : 0;
                  
                  return (
                    <button type="button" key={s.id} onClick={() => startSession('sub', s.id)} className="w-full text-left p-4 hover:bg-slate-50 flex justify-between items-center">
                      <span className="text-sm text-slate-600">{s.title}</span>
                      <span className={`text-xs px-2 py-1 rounded font-mono ${rate >= 0.8 ? 'bg-green-100 text-green-700' : rate >= 0.4 ? 'bg-yellow-50 text-yellow-600' : 'bg-slate-100 text-slate-400'}`}>
                        {scoreText}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => { if(confirm('データをリセットしますか？')) { localStorage.removeItem('zensho_bookkeeping_v3'); location.reload(); }}} className="text-xs text-slate-400 underline">リセット</button>
      </div>
    );
  }

  if (screen === 'collection') return <CollectionScreen setScreen={setScreen} userStats={userStats} />;
  
  if (screen === 'game') {
    const q = currentSession[currentIndex];
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-sm sticky top-0 z-20 px-4 py-3 flex justify-between items-center max-w-4xl mx-auto w-full">
          <button type="button" onClick={() => setScreen('home')} className="text-slate-500 font-bold text-sm">← HOME</button>
          <div className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">{currentIndex + 1} / {currentSession.length}</div>
        </header>
        <main className="flex-grow p-4 pb-32 overflow-y-auto max-w-4xl mx-auto w-full space-y-6">
          {/* Question, Choices, Journal Table ... */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between mb-3"><span className="bg-slate-800 text-white text-xs px-2 py-1 rounded font-mono">Q.{currentIndex + 1}</span></div>
            <p className="text-lg font-medium text-slate-800 leading-relaxed">{q.text}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider flex items-center gap-1"><span>👇 タップして選択</span></p>
            <div className="flex flex-wrap gap-2">
              {q.choices.map(c => (
                <button type="button" key={c} onClick={() => handleChoiceClick(c)} className={`px-3 py-2 rounded-lg text-sm font-bold shadow-sm transition-all border-2 touch-manipulation ${selectedChoice === c ? 'bg-blue-100 border-blue-500 text-blue-800 scale-95' : 'bg-white border-slate-200 text-slate-700 active:scale-95'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <div className="grid grid-cols-2 bg-slate-100 border-b text-xs font-bold text-slate-600">
              <div className="p-2 text-center text-blue-600 border-r border-slate-200">借方 (Debit)</div>
              <div className="p-2 text-center text-red-600">貸方 (Credit)</div>
            </div>
            <div className="grid grid-cols-2 relative min-h-[160px]">
              <div className="absolute inset-y-0 left-1/2 w-px bg-slate-100 -ml-px"></div>
              {['debit', 'credit'].map(side => (
                <div key={side} className="p-2 space-y-2">
                  {(side === 'debit' ? debitLines : creditLines).map(line => (
                    <div key={line.id} className={`flex flex-col gap-1 p-2 rounded border ${side === 'debit' ? 'bg-blue-50/30 border-blue-100' : 'bg-red-50/30 border-red-100'}`}>
                      <div onClick={() => handleZoneClick(side, line.id)} className={`h-10 border-2 border-dashed rounded flex items-center justify-center cursor-pointer transition-colors ${line.accountName ? 'bg-white border-transparent' : selectedChoice ? 'border-blue-300 animate-pulse bg-white/50' : 'border-slate-300'}`}>
                        <span className="text-sm font-bold text-slate-800">{line.accountName || <span className="text-slate-300 text-xs pointer-events-none">科目を選択</span>}</span>
                        {line.accountName && <button type="button" onClick={(e) => { e.stopPropagation(); handleLineUpdate(side, line.id, 'accountName', null); }} className="ml-2 text-slate-400 p-2">×</button>}
                      </div>
                      <div onClick={() => setKeypadConfig({ isOpen: true, lineId: line.id, side, initialValue: line.amount })} className="h-10 bg-white border border-slate-300 rounded flex items-center justify-end px-3 cursor-pointer hover:border-blue-400 active:bg-slate-50">
                        <span className="font-mono text-lg font-bold text-slate-800">{line.amount > 0 ? line.amount.toLocaleString() : <span className="text-slate-300 font-normal">金額</span>}</span>
                      </div>
                      {(side==='debit'?debitLines:creditLines).length > 1 && <button type="button" onClick={() => removeLine(side, line.id)} className="text-xs text-red-400 text-right p-1">削除</button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addLine(side)} className={`w-full py-2 text-xs font-bold rounded border border-dashed transition-colors ${side==='debit'?'text-blue-400 border-blue-200 hover:bg-blue-50':'text-red-400 border-red-200 hover:bg-red-50'}`}>+ 行追加</button>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-200 z-30">
          <div className="max-w-4xl mx-auto"><button type="button" onClick={checkAnswer} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md text-lg active:scale-[0.98] transition-transform">解答する</button></div>
        </div>
        <Keypad isOpen={keypadConfig.isOpen} initialValue={keypadConfig.initialValue} onClose={() => setKeypadConfig({ ...keypadConfig, isOpen: false })} onConfirm={(val) => { handleLineUpdate(keypadConfig.side, keypadConfig.lineId, 'amount', val); setKeypadConfig({ ...keypadConfig, isOpen: false }); }} />
        {showResultModal && lastResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] border-4 ${lastResult.isCorrect ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`p-5 text-center text-white font-bold text-2xl ${lastResult.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>{lastResult.isCorrect ? "正解！ 🙆‍♂️" : "不正解... 🙅‍♀️"}</div>
              <div className="p-5 overflow-y-auto flex-grow space-y-4">
                <div><h4 className="text-xs font-bold text-slate-400 uppercase mb-1">正解の仕訳</h4><div className="grid grid-cols-2 text-xs md:text-sm bg-slate-50 border rounded"><div className="p-2 border-r border-b font-bold text-center">借方</div><div className="p-2 border-b font-bold text-center">貸方</div><div className="p-2 border-r">{lastResult.q.correctEntries.debit.map((d,i)=><div key={i} className="flex justify-between"><span className="text-blue-700 font-bold">{d.accountName}</span><span>{d.amount.toLocaleString()}</span></div>)}</div><div className="p-2">{lastResult.q.correctEntries.credit.map((c,i)=><div key={i} className="flex justify-between"><span className="text-red-700 font-bold">{c.accountName}</span><span>{c.amount.toLocaleString()}</span></div>)}</div></div></div>
                <div><h4 className="text-xs font-bold text-slate-400 uppercase mb-1">解説</h4><p className="text-sm text-slate-700 bg-yellow-50 p-3 rounded border border-yellow-100 leading-relaxed whitespace-pre-wrap">{lastResult.q.explanation}</p></div>
              </div>
              <div className="p-4 bg-white border-t space-y-3">
                <button type="button" onClick={() => { setShowResultModal(false); setShowExplanation(true); }} className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-3 rounded-xl shadow-md transition-transform active:scale-[0.98]">🎬 解説モード</button>
                <button 
                  type="button" 
                  onClick={nextQuestion} 
                  disabled={isNextButtonDisabled}
                  className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  次の問題へ
                </button>
              </div>
            </div>
          </div>
        )}
        {showExplanation && <ExplanationOverlay q={currentSession[currentIndex]} currentIndex={currentIndex} onClose={() => { setShowExplanation(false); setShowResultModal(true); }} />}
      </div>
    );
  }

  // --- Gacha Screens (Updated) ---
  if (screen === 'gacha_open') {
    const isZeroScore = sessionStats.correct === 0;
    
    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50 cursor-default" onClick={isZeroScore ? undefined : doGacha}>
        <div className="text-white text-2xl font-bold mb-8 animate-fade-in-up">
          {isZeroScore ? "残念..." : "お疲れ様でした！"}
        </div>
        <div className="text-white text-xl mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          正解数: <span className={`font-mono text-4xl font-bold ml-2 ${isZeroScore ? 'text-gray-400' : 'text-yellow-400'}`}>
            {sessionStats.correct} / {currentSession.length}
          </span>
        </div>
        
        {isZeroScore ? (
          <div className="animate-fade-in text-center" style={{animationDelay: '0.2s'}}>
            <div className="text-6xl mb-6">😢</div>
            <p className="text-white/70 text-sm mb-8">1問以上正解でアイテムゲットのチャンス！</p>
            <button onClick={() => setScreen('home')} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-all active:scale-95 mb-4">トップへ戻る</button>
            <div>
               <button onClick={(e) => { e.stopPropagation(); setShowReview(true); }} className="text-white/80 hover:text-white underline text-sm">問題の振り返り</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center cursor-pointer">
            <div className="text-9xl animate-bounce-gentle">🎁</div>
            <div className="text-white/70 text-sm font-bold mt-12 animate-pulse border border-white/30 rounded-full py-2 px-6 backdrop-blur bg-white/10">タップして開封</div>
            <button onClick={(e) => { e.stopPropagation(); setShowReview(true); }} className="mt-8 text-white/60 hover:text-white text-sm underline z-50 px-4 py-2">問題の振り返り</button>
          </div>
        )}

        {showReview && (
          <ReviewModal 
            results={sessionResults} 
            onClose={(e) => { if(e) e.stopPropagation(); setShowReview(false); }} 
          />
        )}
      </div>
    );
  }

  if (screen === 'gacha_result' && gachaItem) {
    const isRare = gachaItem.rarity === 2;
    const isSuperRare = gachaItem.rarity === 3;

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in overflow-hidden">
        {/* Special Background Effects */}
        {isSuperRare && (
          <>
            <div className="effect-sunburst"></div>
            <div className="effect-godrays"></div>
            <div className="effect-particles"></div>
          </>
        )}
        
        <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-200 -z-10"></div>
          <div className="text-xs font-black text-slate-400 mb-4 tracking-[0.3em]">GET ITEM!</div>
          
          {/* Card Container with onClick for Detail View */}
          <div 
            onClick={() => setShowGachaDetail(true)}
            className={`w-48 h-64 mx-auto rounded-2xl shadow-xl border-4 flex flex-col items-center justify-center bg-white mb-6 relative cursor-pointer active:scale-95 transition-transform duration-200 ${gachaItem.rarity===3?'rarity-super':gachaItem.rarity===2?'rarity-rare':'rarity-common'}`}
          >
             {isNewItem && <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow animate-bounce z-20">NEW</div>}
             <div className="text-7xl mb-2 drop-shadow-md z-10">{gachaItem.icon}</div>
             <div className="font-bold text-slate-700 text-lg px-2 z-10">{gachaItem.name}</div>
             <div className="absolute bottom-2 text-[10px] text-slate-400 font-bold z-10">TAP TO READ ▶</div>
          </div>

          <div className={`text-2xl font-black mb-2 ${isSuperRare ? 'text-super animate-pulse' : isRare ? 'text-rare' : 'text-slate-400'}`}>
            {isSuperRare ? 'SUPER RARE' : isRare ? 'RARE' : 'COMMON'}
          </div>
          
          <p className="text-slate-500 text-xs mb-6 h-8 leading-tight overflow-hidden px-2">
            {gachaItem.desc.substring(0, 40)}...
          </p>
          
          <div className="space-y-3">
             <button 
               type="button" 
               onClick={() => {
                 setSessionResults([]); // Reset game state
                 setScreen('home');
               }} 
               className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
             >
               トップへ戻る
             </button>
             <button type="button" onClick={() => setShowReview(true)} className="w-full bg-slate-200 text-slate-600 font-bold py-3 rounded-xl shadow-sm active:scale-95 transition-transform text-sm">📝 問題の振り返り</button>
          </div>
        </div>

        {/* Detail Modal for full text */}
        {showGachaDetail && (
          <ItemDetailModal 
            item={gachaItem} 
            onClose={() => setShowGachaDetail(false)} 
          />
        )}

        {showReview && (
          <ReviewModal 
            results={sessionResults} 
            onClose={(e) => { if(e) e.stopPropagation(); setShowReview(false); }} 
          />
        )}
      </div>
    );
  }

  return <div className="flex items-center justify-center min-h-screen text-slate-400">Loading...</div>;
};

// Render
const root = createRoot(document.getElementById('root'));
root.render(<App />);
