
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Question Definitions
 */

const RAW_QUESTIONS = [
  // --- CASH & SAVINGS ---
  {
    id: 'cs_01', major: 'cash_savings', sub: 'cash_basic',
    text: "現金 1,000,000円 を元入れして営業を開始した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 1000000 }], credit: [{ accountName: "資本金", amount: 1000000 }] },
    choices: ["現金", "資本金", "借入金", "当座預金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000000, 0.5, 100000);
      q.text = `現金 ${Randomizer.fmt(amt)}円 を元入れして営業を開始した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "資本金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_02', major: 'cash_savings', sub: 'cash_basic',
    text: "得意先より売掛金の回収として、同店振出しの小切手 50,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 50000 }], credit: [{ accountName: "売掛金", amount: 50000 }] },
    choices: ["現金", "当座預金", "売掛金", "受取手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `得意先より売掛金の回収として、同店振出しの小切手 ${Randomizer.fmt(amt)}円 を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_03', major: 'cash_savings', sub: 'cash_basic',
    text: "売掛金 30,000円 の回収として、郵便為替証書を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 30000 }], credit: [{ accountName: "売掛金", amount: 30000 }] },
    choices: ["現金", "当座預金", "売掛金", "受取手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(30000, 0.3, 1000);
      q.text = `売掛金 ${Randomizer.fmt(amt)}円 の回収として、郵便為替証書を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_04', major: 'cash_savings', sub: 'checking',
    text: "手元の現金 150,000円 を当座預金口座に預け入れた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 150000 }], credit: [{ accountName: "現金", amount: 150000 }] },
    choices: ["当座預金", "現金", "資本金", "借入金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(150000, 0.4, 1000);
      q.text = `手元の現金 ${Randomizer.fmt(amt)}円 を当座預金口座に預け入れた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_05', major: 'cash_savings', sub: 'checking',
    text: "買掛金 200,000円 の支払いのため、小切手を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 200000 }], credit: [{ accountName: "当座預金", amount: 200000 }] },
    choices: ["当座預金", "現金", "買掛金", "支払手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.3, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いのため、小切手を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_06', major: 'cash_savings', sub: 'checking',
    text: "売掛金の回収として、以前に当店が振り出した小切手 40,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 40000 }], credit: [{ accountName: "売掛金", amount: 40000 }] },
    choices: ["当座預金", "現金", "売掛金", "受取手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(40000, 0.3, 1000);
      q.text = `売掛金の回収として、以前に当店が振り出した小切手 ${Randomizer.fmt(amt)}円 を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_07', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係に小切手 50,000円 を振り出して手渡した（定額資金前渡法）。",
    correctEntries: { debit: [{ accountName: "小口現金", amount: 50000 }], credit: [{ accountName: "当座預金", amount: 50000 }] },
    choices: ["小口現金", "当座預金", "現金", "雑費"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `小口係に小切手 ${Randomizer.fmt(amt)}円 を振り出して手渡した（定額資金前渡法）。`;
      q.correctEntries = { debit: [{ accountName: "小口現金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_08', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係より、交通費 6,000円、消耗品費 4,000円 の支払報告を受けた。ただちに同額の小切手を振り出して補給した。",
    correctEntries: { debit: [{ accountName: "旅費交通費", amount: 6000 }, { accountName: "消耗品費", amount: 4000 }], credit: [{ accountName: "当座預金", amount: 10000 }] },
    choices: ["旅費交通費", "消耗品費", "当座預金", "小口現金"],
    mutate: (q) => {
      const v1 = Randomizer.getAmount(6000, 0.2, 100);
      const v2 = Randomizer.getAmount(4000, 0.2, 100);
      const total = v1 + v2;
      q.text = `小口係より、交通費 ${Randomizer.fmt(v1)}円、消耗品費 ${Randomizer.fmt(v2)}円 の支払報告を受けた。ただちに同額の小切手を振り出して補給した。`;
      q.correctEntries = { debit: [{ accountName: "旅費交通費", amount: v1 }, { accountName: "消耗品費", amount: v2 }], credit: [{ accountName: "当座預金", amount: total }] };
      return q;
    }
  },
  {
    id: 'cs_09', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高を調べたところ 8,000円 であり、帳簿残高 8,500円 より少なかった。原因は不明。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 500 }], credit: [{ accountName: "現金", amount: 500 }] },
    choices: ["現金", "現金過不足", "雑損", "雑益"],
    mutate: (q) => {
      const book = Randomizer.getAmount(8500, 0.2, 100);
      const diff = 500;
      const actual = book - diff;
      q.text = `現金の実際有高を調べたところ ${Randomizer.fmt(actual)}円 であり、帳簿残高 ${Randomizer.fmt(book)}円 より少なかった。原因は不明。`;
      q.correctEntries = { debit: [{ accountName: "現金過不足", amount: diff }], credit: [{ accountName: "現金", amount: diff }] };
      return q;
    }
  },
  {
    id: 'cs_10', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高が帳簿より 1,000円 多かった。原因不明のため適切に処理する。",
    correctEntries: { debit: [{ accountName: "現金", amount: 1000 }], credit: [{ accountName: "現金過不足", amount: 1000 }] },
    choices: ["現金", "現金過不足", "雑益", "雑損"],
    mutate: (q) => {
      const diff = Randomizer.getAmount(1000, 0.3, 100);
      q.text = `現金の実際有高が帳簿より ${Randomizer.fmt(diff)}円 多かった。原因不明のため適切に処理する。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: diff }], credit: [{ accountName: "現金過不足", amount: diff }] };
      return q;
    }
  },

  // --- MERCHANDISE ---
  {
    id: 'md_01', major: 'merchandise', sub: 'trade_basic',
    text: "商品 400,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 400000 }], credit: [{ accountName: "買掛金", amount: 400000 }] },
    choices: ["仕入", "買掛金", "売掛金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(400000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "買掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_02', major: 'merchandise', sub: 'trade_basic',
    text: "商品 600,000円 を売り上げ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 600000 }], credit: [{ accountName: "売上", amount: 600000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(600000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_03', major: 'merchandise', sub: 'trade_basic',
    text: "商品 150,000円 を仕入れ、代金のうち 50,000円 は現金で支払い、残額は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 150000 }], credit: [{ accountName: "現金", amount: 50000 }, { accountName: "買掛金", amount: 100000 }] },
    choices: ["仕入", "現金", "買掛金", "当座預金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(150000, 0.2, 1000);
      const cash = Randomizer.round(total * 0.3, 1000);
      const credit = total - cash;
      q.text = `商品 ${Randomizer.fmt(total)}円 を仕入れ、代金のうち ${Randomizer.fmt(cash)}円 は現金で支払い、残額は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "現金", amount: cash }, { accountName: "買掛金", amount: credit }] };
      return q;
    }
  },
  {
    id: 'md_04', major: 'merchandise', sub: 'trade_basic',
    text: "商品 250,000円 を売り上げ、代金のうち 100,000円 は小切手で受け取り、残額は掛けとした。",
    correctEntries: { debit: [{ accountName: "現金", amount: 100000 }, { accountName: "売掛金", amount: 150000 }], credit: [{ accountName: "売上", amount: 250000 }] },
    choices: ["売上", "現金", "売掛金", "受取手形"],
    mutate: (q) => {
      const total = Randomizer.getAmount(250000, 0.2, 1000);
      const check = Randomizer.round(total * 0.4, 1000);
      const credit = total - check;
      q.text = `商品 ${Randomizer.fmt(total)}円 を売り上げ、代金のうち ${Randomizer.fmt(check)}円 は小切手で受け取り、残額は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: check }, { accountName: "売掛金", amount: credit }], credit: [{ accountName: "売上", amount: total }] };
      return q;
    }
  },
  {
    id: 'md_05', major: 'merchandise', sub: 'returns_discounts',
    text: "掛けで仕入れた商品のうち、品質不良のため 5,000円 を返品した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 5000 }], credit: [{ accountName: "仕入", amount: 5000 }] },
    choices: ["買掛金", "仕入", "現金", "売掛金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(5000, 0.2, 100);
      q.text = `掛けで仕入れた商品のうち、品質不良のため ${Randomizer.fmt(amt)}円 を返品した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "仕入", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_06', major: 'merchandise', sub: 'returns_discounts',
    text: "掛けで売り上げた商品のうち 8,000円 が品違いのため返品された。",
    correctEntries: { debit: [{ accountName: "売上", amount: 8000 }], credit: [{ accountName: "売掛金", amount: 8000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(8000, 0.2, 100);
      q.text = `掛けで売り上げた商品のうち ${Randomizer.fmt(amt)}円 が品違いのため返品された。`;
      q.correctEntries = { debit: [{ accountName: "売上", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_07', major: 'merchandise', sub: 'advance',
    text: "商品 80,000円 を注文し、内金として 10,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 10000 }], credit: [{ accountName: "現金", amount: 10000 }] },
    choices: ["前払金", "仕入", "買掛金", "現金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(80000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(total)}円 を注文し、内金として ${Randomizer.fmt(adv)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "前払金", amount: adv }], credit: [{ accountName: "現金", amount: adv }] };
      return q;
    }
  },
  {
    id: 'md_08', major: 'merchandise', sub: 'advance',
    text: "注文を受けていた商品 120,000円 を引き渡し、代金は受け取っていた内金 30,000円 を差し引き、残額を掛けとした。",
    correctEntries: { debit: [{ accountName: "前受金", amount: 30000 }, { accountName: "売掛金", amount: 90000 }], credit: [{ accountName: "売上", amount: 120000 }] },
    choices: ["前受金", "売掛金", "売上", "現金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(120000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.25, 1000);
      const bal = total - adv;
      q.text = `注文を受けていた商品 ${Randomizer.fmt(total)}円 を引き渡し、代金は受け取っていた内金 ${Randomizer.fmt(adv)}円 を差し引き、残額を掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "前受金", amount: adv }, { accountName: "売掛金", amount: bal }], credit: [{ accountName: "売上", amount: total }] };
      return q;
    }
  },
  {
    id: 'md_09', major: 'merchandise', sub: 'shipping',
    text: "商品を仕入れ、代金 40,000円 と引取運賃 1,500円 は現金で支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 41500 }], credit: [{ accountName: "現金", amount: 41500 }] },
    choices: ["仕入", "現金", "発送費", "買掛金"],
    mutate: (q) => {
      const goods = Randomizer.getAmount(40000, 0.2, 1000);
      const ship = 1500;
      const total = goods + ship;
      q.text = `商品を仕入れ、代金 ${Randomizer.fmt(goods)}円 と引取運賃 ${Randomizer.fmt(ship)}円 は現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "現金", amount: total }] };
      return q;
    }
  },
  {
    id: 'md_10', major: 'merchandise', sub: 'shipping',
    text: "商品を売り上げ、代金 70,000円 は掛けとした。発送運賃 1,200円（先方負担）を現金で立て替えた。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 71200 }], credit: [{ accountName: "売上", amount: 70000 }, { accountName: "現金", amount: 1200 }] },
    choices: ["売掛金", "売上", "現金", "立替金"],
    mutate: (q) => {
      const goods = Randomizer.getAmount(70000, 0.2, 1000);
      const ship = 1200;
      const totalRec = goods + ship;
      q.text = `商品を売り上げ、代金 ${Randomizer.fmt(goods)}円 は掛けとした。発送運賃 ${Randomizer.fmt(ship)}円（先方負担）を現金で立て替えた。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: totalRec }], credit: [{ accountName: "売上", amount: goods }, { accountName: "現金", amount: ship }] };
      return q;
    }
  },
  
  // --- NOTES & CALCULATION PROBLEMS (Reverse Logic Applied) ---
  
  // sub: notes_transfer (Discounting)
  {
    id: 'nt_10', major: 'notes', sub: 'notes_transfer',
    text: "約束手形 300,000円 を取引銀行で割り引き、割引料 5,000円 を差し引かれた残額を当座預金とした。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 295000 }, { accountName: "手形売却損", amount: 5000 }], credit: [{ accountName: "受取手形", amount: 300000 }] },
    choices: ["当座預金", "手形売却損", "受取手形", "支払利息"],
    mutate: (q) => {
      // Logic: Total is multiple of 10000. Fee is random integer.
      const total = Randomizer.getAmount(300000, 0.2, 10000);
      const fee = Randomizer.getAmount(5000, 0.5, 100); 
      const net = total - fee;
      q.text = `約束手形 ${Randomizer.fmt(total)}円 を取引銀行で割り引き、割引料 ${Randomizer.fmt(fee)}円 を差し引かれた残額を当座預金とした。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: net }, { accountName: "手形売却損", amount: fee }], credit: [{ accountName: "受取手形", amount: total }] };
      return q;
    }
  },
  {
    id: 'nt_10b', major: 'notes', sub: 'notes_transfer',
    text: "約束手形 500,000円 を銀行で割り引き、割引料 8,000円 を引かれた残額を現金で受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 492000 }, { accountName: "手形売却損", amount: 8000 }], credit: [{ accountName: "受取手形", amount: 500000 }] },
    choices: ["現金", "手形売却損", "受取手形", "当座預金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(500000, 0.2, 10000);
      const fee = Randomizer.getAmount(8000, 0.5, 100);
      const net = total - fee;
      q.text = `約束手形 ${Randomizer.fmt(total)}円 を銀行で割り引き、割引料 ${Randomizer.fmt(fee)}円 を引かれた残額を現金で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: net }, { accountName: "手形売却損", amount: fee }], credit: [{ accountName: "受取手形", amount: total }] };
      return q;
    }
  },

  // sub: loan_notes (Interest Calculations)
  {
    id: 'nt_07', major: 'notes', sub: 'loan_notes',
    text: "手形借入金 500,000円 が期日となり、利息 5,000円 とともに現金で返済した。",
    correctEntries: { debit: [{ accountName: "手形借入金", amount: 500000 }, { accountName: "支払利息", amount: 5000 }], credit: [{ accountName: "現金", amount: 505000 }] },
    choices: ["手形借入金", "支払利息", "現金", "当座預金"],
    mutate: (q) => {
      const principal = Randomizer.getAmount(500000, 0.2, 10000); 
      const rate = 0.01 + (Math.floor(Math.random() * 4) * 0.005); 
      const interest = Math.round(principal * rate); 
      const total = principal + interest;
      q.text = `手形借入金 ${Randomizer.fmt(principal)}円 が期日となり、利息 ${Randomizer.fmt(interest)}円 とともに現金で返済した。`;
      q.correctEntries = { debit: [{ accountName: "手形借入金", amount: principal }, { accountName: "支払利息", amount: interest }], credit: [{ accountName: "現金", amount: total }] };
      return q;
    }
  },
  
  // sub: bad_debts (Percentage Calc)
  {
    id: 'cl_01', major: 'closing', sub: 'bad_debts',
    text: "決算につき、売掛金残高 1,500,000円 に対し 2% の貸倒引当金を設定する。残高は 10,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金繰入", amount: 20000 }], credit: [{ accountName: "貸倒引当金", amount: 20000 }] },
    choices: ["貸倒引当金繰入", "貸倒引当金", "売掛金", "貸倒損失"],
    mutate: (q) => {
      const receivables = Randomizer.getAmount(1500000, 0.1, 10000);
      const rate = 0.02; 
      const target = Math.round(receivables * rate); 
      const balance = Randomizer.getAmount(target * 0.5, 0.2, 1000);
      const entryAmt = target - balance; 
      q.text = `決算につき、売掛金残高 ${Randomizer.fmt(receivables)}円 に対し 2% の貸倒引当金を設定する。残高は ${Randomizer.fmt(balance)}円 である（差額補充法）。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金繰入", amount: entryAmt }], credit: [{ accountName: "貸倒引当金", amount: entryAmt }] };
      return q;
    }
  },

  // sub: depreciation (Monthly & Annual Calc)
  {
    id: 'cl_04', major: 'closing', sub: 'depreciation',
    text: "建物の減価償却を行う。取得原価 4,000,000円、残存価額ゼロ、耐用年数40年、定額法。記帳方法は直接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "建物", amount: 100000 }] },
    choices: ["減価償却費", "建物", "減価償却累計額"],
    mutate: (q) => {
      const years = 40;
      const dep = Randomizer.getAmount(100000, 0.2, 1000); // Integer dep
      const cost = dep * years; // Integer cost
      q.text = `建物の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は直接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "建物", amount: dep }] };
      return q;
    }
  },
  {
    id: 'cl_05d', major: 'closing', sub: 'depreciation',
    text: "当期首に購入した備品（取得原価 1,200,000円、耐用年数5年、残存価額ゼロ、定額法）について、9ヶ月分の減価償却を行う（間接法）。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 180000 }], credit: [{ accountName: "減価償却累計額", amount: 180000 }] },
    choices: ["減価償却費", "減価償却累計額", "備品"],
    mutate: (q) => {
      // Reverse Logic for Monthly:
      const years = 5;
      const months = 9;
      // 1. Pick monthly depreciation (integer)
      const monthlyDep = Randomizer.getAmount(20000, 0.2, 100); 
      // 2. Calculate annual
      const annualDep = monthlyDep * 12;
      // 3. Calculate Cost
      const cost = annualDep * years;
      // 4. Calculate Answer
      const answer = monthlyDep * months;
      q.text = `当期首に購入した備品（取得原価 ${Randomizer.fmt(cost)}円、耐用年数${years}年、残存価額ゼロ、定額法）について、${months}ヶ月分の減価償却を行う（間接法）。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: answer }], credit: [{ accountName: "減価償却累計額", amount: answer }] };
      return q;
    }
  },
  {
    id: 'nt_01', major: 'notes', sub: 'notes_trade',
    text: "買掛金 250,000円 の支払いとして、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 250000 }], credit: [{ accountName: "支払手形", amount: 250000 }] },
    choices: ["買掛金", "支払手形", "当座預金", "受取手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(250000, 0.2, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いとして、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_11b', major: 'merchandise', sub: 'other_pay',
    text: "クレジット売掛金 45,000円 について、信販会社より手数料 2,000円 を差し引かれた残額が当座預金に振り込まれた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 43000 }, { accountName: "支払手数料", amount: 2000 }], credit: [{ accountName: "売掛金", amount: 45000 }] },
    aliases: { credit: [{"売掛金": ["クレジット売掛金"]}] },
    choices: ["当座預金", "支払手数料", "売掛金", "現金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(45000, 0.2, 1000);
      const fee = Randomizer.getAmount(total * 0.05, 0.2, 100);
      const net = total - fee;
      q.text = `クレジット売掛金 ${Randomizer.fmt(total)}円 について、信販会社より手数料 ${Randomizer.fmt(fee)}円 を差し引かれた残額が当座預金に振り込まれた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: net }, { accountName: "支払手数料", amount: fee }], credit: [{ accountName: "売掛金", amount: total }] };
      return q;
    }
  }
];
