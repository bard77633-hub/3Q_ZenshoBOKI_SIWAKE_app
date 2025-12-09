
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Data Module - V12 (Massive Content Expansion)
 */

// --- Helpers for Randomization ---
const Randomizer = {
  round: (num, precision = 1000) => Math.round(num / precision) * precision,
  getAmount: (base, variation = 0.2, precision = 1000) => {
    const min = base * (1 - variation);
    const max = base * (1 + variation);
    const raw = Math.random() * (max - min) + min;
    return Randomizer.round(raw, precision);
  },
  fmt: (num) => num.toLocaleString(),
  updateSteps: (steps, mapObj) => { return steps; } 
};

// --- Collection Data (30 Items) ---
const COLLECTION_ITEMS = [
  // Common (15)
  { id: 1, name: "現金", rarity: 1, icon: "💰", desc: "通貨（硬貨・紙幣）および、通貨代用証券（他人振出小切手、送金小切手など）。" },
  { id: 2, name: "小切手", rarity: 1, icon: "🎫", desc: "銀行に支払いを委託する証券。受け取った場合は直ちに現金化できるため「現金」。" },
  { id: 3, name: "当座預金", rarity: 1, icon: "🏦", desc: "小切手の支払いに充てられる無利息の預金。決済用口座として重要。" },
  { id: 4, name: "商品", rarity: 1, icon: "📦", desc: "販売目的で所有する物品。期末に残った在庫は棚卸資産となる。" },
  { id: 5, name: "仕入", rarity: 1, icon: "🚚", desc: "商品の調達原価。費用勘定。" },
  { id: 6, name: "売上", rarity: 1, icon: "🏷️", desc: "営業活動から得られる収益。" },
  { id: 7, name: "通信費", rarity: 1, icon: "📮", desc: "電話代、切手、インターネット料金など。" },
  { id: 8, name: "消耗品費", rarity: 1, icon: "✏️", desc: "事務用品など、短期間で消費される物品の購入費用。" },
  { id: 9, name: "旅費交通費", rarity: 1, icon: "🚕", desc: "電車、バス、タクシー代や宿泊費。" },
  { id: 10, name: "借入金", rarity: 1, icon: "💸", desc: "後で返済する義務がある負債。" },
  { id: 11, name: "貸付金", rarity: 1, icon: "🤝", desc: "後で返済してもらう権利（債権）。" },
  { id: 12, name: "受取手形", rarity: 1, icon: "📜", desc: "手形代金を受け取る権利。" },
  { id: 13, name: "支払手形", rarity: 1, icon: "✍️", desc: "手形代金を支払う義務。" },
  { id: 14, name: "売掛金", rarity: 1, icon: "📓", desc: "商品の掛け売りによる未回収代金。" },
  { id: 15, name: "買掛金", rarity: 1, icon: "🧾", desc: "商品の掛け仕入れによる未払代金。" },
  
  // Rare (10)
  { id: 16, name: "引出金", rarity: 2, icon: "👜", desc: "店主が私用で使ったお金。資本金のマイナスとして扱う。" },
  { id: 17, name: "租税公課", rarity: 2, icon: "🏛️", desc: "固定資産税、印紙税などの税金や公的な負担金。" },
  { id: 18, name: "商品券", rarity: 2, icon: "🎁", desc: "他店商品券は「他店商品券」勘定または「商品券」勘定（資産）で処理する。" },
  { id: 19, name: "前払金", rarity: 2, icon: "🔜", desc: "商品購入の手付金（内金）。" },
  { id: 20, name: "前受金", rarity: 2, icon: "🔙", desc: "注文を受けた際に受け取った手付金（内金）。" },
  { id: 21, name: "未払金", rarity: 2, icon: "🛒", desc: "商品以外の購入代金（後払い）を表す負債。" },
  { id: 22, name: "備品", rarity: 2, icon: "💻", desc: "パソコン、机など1年以上使用する資産。" },
  { id: 23, name: "車両運搬具", rarity: 2, icon: "🚛", desc: "営業用のトラックや社用車。" },
  { id: 24, name: "貸倒引当金", rarity: 2, icon: "🛡️", desc: "将来の貸倒れに備える評価勘定（マイナス資産）。" },
  { id: 25, name: "減価償却費", rarity: 2, icon: "📉", desc: "固定資産の価値減少分を計上する費用。" },

  // Super Rare (5)
  { id: 26, name: "資本金", rarity: 3, icon: "👑", desc: "事業の元手となる純資産。" },
  { id: 27, name: "土地", rarity: 3, icon: "🏰", desc: "敷地。減価償却しない固定資産。" },
  { id: 28, name: "建物", rarity: 3, icon: "🏢", desc: "店舗や倉庫などの建物。" },
  { id: 29, name: "損益", rarity: 3, icon: "⚖️", desc: "決算で収益と費用を集計する集合勘定。" },
  { id: 30, name: "純利益", rarity: 3, icon: "💎", desc: "収益から費用を引いた正味の儲け。" }
];

// --- Genre Configuration ---
const GENRE_STRUCTURE = [
  {
    id: 'cash_savings',
    title: '💰 現金・預金',
    subs: [
      { id: 'cash_basic', title: '現金・小切手' },
      { id: 'checking', title: '当座預金' },
      { id: 'petty_cash', title: '小口現金' },
      { id: 'short_over', title: '現金過不足' }
    ]
  },
  {
    id: 'merchandise',
    title: '📦 商品売買',
    subs: [
      { id: 'trade_basic', title: '仕入・売上' },
      { id: 'returns', title: '返品・値引' },
      { id: 'advance', title: '前払金・前受金' },
      { id: 'shipping', title: '諸掛り' },
      { id: 'other_pay', title: 'クレジット・商品券' }
    ]
  },
  {
    id: 'notes',
    title: '💴 手形・貸借',
    subs: [
      { id: 'notes_trade', title: '約束手形(売買)' },
      { id: 'loan_notes', title: '貸付・借入' }
    ]
  },
  {
    id: 'assets_expenses',
    title: '🏢 固定資産・経費',
    subs: [
      { id: 'fixed_assets', title: '固定資産購入' },
      { id: 'expenses', title: '諸経費・税金' }
    ]
  },
  {
    id: 'closing',
    title: '📊 決算整理',
    subs: [
      { id: 'bad_debts', title: '貸倒引当金' },
      { id: 'depreciation', title: '減価償却' },
      { id: 'inventory', title: '売上原価算定' },
      { id: 'deferral_accrual', title: '見越・繰延' },
      { id: 'tax', title: '税金・その他' }
    ]
  }
];

// --- Data: Questions (Expanded to 53 questions) ---
const QUESTIONS = [
  // ==========================================
  // 1. CASH & SAVINGS (10 questions)
  // ==========================================
  {
    id: 'cs_01', major: 'cash_savings', sub: 'cash_basic',
    text: "現金 1,000,000円 を元入れして営業を開始した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 1000000 }], credit: [{ accountName: "資本金", amount: 1000000 }] },
    choices: ["現金", "資本金", "借入金", "当座預金"],
    explanation: "開業資金は「資本金」として処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000000, 0.5, 100000);
      q.text = `現金 ${Randomizer.fmt(amt)}円 を元入れして営業を開始した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "資本金", amount: amt }] };
      q.explanationSteps = [{highlight:"元入れ", entries:[{side:'debit',account:'現金',amount:amt},{side:'credit',account:'資本金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cs_02', major: 'cash_savings', sub: 'cash_basic',
    text: "得意先より売掛金の回収として、同店振出しの小切手 50,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 50000 }], credit: [{ accountName: "売掛金", amount: 50000 }] },
    choices: ["現金", "当座預金", "売掛金", "受取手形"],
    explanation: "他人（得意先）振出しの小切手は、直ちに現金化できるため「現金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `得意先より売掛金の回収として、同店振出しの小切手 ${Randomizer.fmt(amt)}円 を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"小切手", entries:[{side:'debit',account:'現金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cs_03', major: 'cash_savings', sub: 'cash_basic',
    text: "売掛金 30,000円 の回収として、郵便為替証書を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 30000 }], credit: [{ accountName: "売掛金", amount: 30000 }] },
    choices: ["現金", "当座預金", "売掛金", "受取手形"],
    explanation: "郵便為替証書も通貨代用証券として「現金」勘定で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(30000, 0.3, 1000);
      q.text = `売掛金 ${Randomizer.fmt(amt)}円 の回収として、郵便為替証書を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"郵便為替証書", entries:[{side:'debit',account:'現金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cs_04', major: 'cash_savings', sub: 'checking',
    text: "手元の現金 150,000円 を当座預金口座に預け入れた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 150000 }], credit: [{ accountName: "現金", amount: 150000 }] },
    choices: ["当座預金", "現金", "資本金", "借入金"],
    explanation: "手元の現金を減らし、当座預金を増やします。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(150000, 0.4, 1000);
      q.text = `手元の現金 ${Randomizer.fmt(amt)}円 を当座預金口座に預け入れた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"預け入れた", entries:[{side:'debit',account:'当座預金',amount:amt}, {side:'credit',account:'現金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cs_05', major: 'cash_savings', sub: 'checking',
    text: "買掛金 200,000円 の支払いのため、小切手を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 200000 }], credit: [{ accountName: "当座預金", amount: 200000 }] },
    choices: ["当座預金", "現金", "買掛金", "支払手形"],
    explanation: "自社で小切手を振り出した場合は「当座預金」の減少として処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.3, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いのため、小切手を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      q.explanationSteps = [{highlight:"小切手を振り出した", entries:[{side:'credit',account:'当座預金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cs_06', major: 'cash_savings', sub: 'checking',
    text: "以前に当店が振り出した小切手 40,000円 が、所持人から当座預金口座に返還（入金）された。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 40000 }], credit: [{ accountName: "現金", amount: 0 }] }, // trick
    // Wait, if self-check is returned, it increases checking account.
    // However, context matters. "Returned" usually means the deal was cancelled or similar.
    // Let's change to "Received self-check" scenario.
    text: "売掛金の回収として、以前に当店が振り出した小切手 40,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 40000 }], credit: [{ accountName: "売掛金", amount: 40000 }] },
    choices: ["当座預金", "現金", "売掛金", "受取手形"],
    explanation: "自己振出小切手を受け取った場合は、振出時の逆仕訳（当座預金の増加）を行います。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(40000, 0.3, 1000);
      q.text = `売掛金の回収として、以前に当店が振り出した小切手 ${Randomizer.fmt(amt)}円 を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"当店が振り出した小切手", entries:[{side:'debit',account:'当座預金',amount:amt}], comment:"自己振出小切手は当座預金勘定に戻します。"}];
      return q;
    }
  },
  {
    id: 'cs_07', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係に小切手 50,000円 を振り出して手渡した（定額資金前渡法）。",
    correctEntries: { debit: [{ accountName: "小口現金", amount: 50000 }], credit: [{ accountName: "当座預金", amount: 50000 }] },
    choices: ["小口現金", "当座預金", "現金", "雑費"],
    explanation: "資金の前渡し時は「小口現金」（資産）を増やします。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `小口係に小切手 ${Randomizer.fmt(amt)}円 を振り出して手渡した（定額資金前渡法）。`;
      q.correctEntries = { debit: [{ accountName: "小口現金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      q.explanationSteps = [{highlight:"小切手...手渡した", entries:[{side:'debit',account:'小口現金',amount:amt}, {side:'credit',account:'当座預金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cs_08', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係より、交通費 6,000円、消耗品費 4,000円 の支払報告を受けた。ただちに同額の小切手を振り出して補給した。",
    correctEntries: { debit: [{ accountName: "旅費交通費", amount: 6000 }, { accountName: "消耗品費", amount: 4000 }], credit: [{ accountName: "当座預金", amount: 10000 }] },
    choices: ["旅費交通費", "消耗品費", "当座預金", "小口現金"],
    explanation: "「報告即補給」の場合、小口現金勘定を通さず、費用／当座預金で処理することもありますが、全商簿記では報告と補給の仕訳を合わせる形（借：費用／貸：当座預金）になります。",
    mutate: (q) => {
      const v1 = Randomizer.getAmount(6000, 0.2, 100);
      const v2 = Randomizer.getAmount(4000, 0.2, 100);
      const total = v1 + v2;
      q.text = `小口係より、交通費 ${Randomizer.fmt(v1)}円、消耗品費 ${Randomizer.fmt(v2)}円 の支払報告を受けた。ただちに同額の小切手を振り出して補給した。`;
      q.correctEntries = { debit: [{ accountName: "旅費交通費", amount: v1 }, { accountName: "消耗品費", amount: v2 }], credit: [{ accountName: "当座預金", amount: total }] };
      q.explanationSteps = [{highlight:"報告", entries:[{side:'debit',account:'旅費交通費',amount:v1},{side:'debit',account:'消耗品費',amount:v2}]}, {highlight:"ただちに...補給", entries:[{side:'credit',account:'当座預金',amount:total}]}];
      return q;
    }
  },
  {
    id: 'cs_09', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高を調べたところ 8,000円 であり、帳簿残高 8,500円 より少なかった。原因は不明。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 500 }], credit: [{ accountName: "現金", amount: 500 }] },
    choices: ["現金", "現金過不足", "雑損", "雑益"],
    explanation: "実際＜帳簿なので、帳簿の現金を減らします。",
    mutate: (q) => {
      const book = Randomizer.getAmount(8500, 0.2, 100);
      const diff = 500;
      const actual = book - diff;
      q.text = `現金の実際有高を調べたところ ${Randomizer.fmt(actual)}円 であり、帳簿残高 ${Randomizer.fmt(book)}円 より少なかった。原因は不明。`;
      q.correctEntries = { debit: [{ accountName: "現金過不足", amount: diff }], credit: [{ accountName: "現金", amount: diff }] };
      q.explanationSteps = [{highlight:"少なかった", entries:[{side:'credit',account:'現金',amount:diff}]}];
      return q;
    }
  },
  {
    id: 'cs_10', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高が帳簿より 1,000円 多かった。原因不明のため適切に処理する。",
    correctEntries: { debit: [{ accountName: "現金", amount: 1000 }], credit: [{ accountName: "現金過不足", amount: 1000 }] },
    choices: ["現金", "現金過不足", "雑益", "雑損"],
    explanation: "実際＞帳簿なので、帳簿の現金を増やします。",
    mutate: (q) => {
      const diff = Randomizer.getAmount(1000, 0.3, 100);
      q.text = `現金の実際有高が帳簿より ${Randomizer.fmt(diff)}円 多かった。原因不明のため適切に処理する。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: diff }], credit: [{ accountName: "現金過不足", amount: diff }] };
      q.explanationSteps = [{highlight:"多かった", entries:[{side:'debit',account:'現金',amount:diff}]}];
      return q;
    }
  },

  // ==========================================
  // 2. MERCHANDISE (12 questions)
  // ==========================================
  {
    id: 'md_01', major: 'merchandise', sub: 'trade_basic',
    text: "商品 400,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 400000 }], credit: [{ accountName: "買掛金", amount: 400000 }] },
    choices: ["仕入", "買掛金", "売掛金", "現金"],
    explanation: "商品の購入代金を後払いにした場合は「買掛金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(400000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "買掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"仕入れ", entries:[{side:'debit',account:'仕入',amount:amt}]}, {highlight:"掛け", entries:[{side:'credit',account:'買掛金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'md_02', major: 'merchandise', sub: 'trade_basic',
    text: "商品 600,000円 を売り上げ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 600000 }], credit: [{ accountName: "売上", amount: 600000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    explanation: "商品の販売代金を後受けにした場合は「売掛金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(600000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"売り上げ", entries:[{side:'credit',account:'売上',amount:amt}]}, {highlight:"掛け", entries:[{side:'debit',account:'売掛金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'md_03', major: 'merchandise', sub: 'trade_basic',
    text: "商品 150,000円 を仕入れ、代金のうち 50,000円 は現金で支払い、残額は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 150000 }], credit: [{ accountName: "現金", amount: 50000 }, { accountName: "買掛金", amount: 100000 }] },
    choices: ["仕入", "現金", "買掛金", "当座預金"],
    explanation: "一部現金、一部掛けの複合取引です。",
    mutate: (q) => {
      const total = Randomizer.getAmount(150000, 0.2, 1000);
      const cash = Randomizer.round(total * 0.3, 1000);
      const credit = total - cash;
      q.text = `商品 ${Randomizer.fmt(total)}円 を仕入れ、代金のうち ${Randomizer.fmt(cash)}円 は現金で支払い、残額は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "現金", amount: cash }, { accountName: "買掛金", amount: credit }] };
      q.explanationSteps = [{highlight:"現金で支払い", entries:[{side:'credit',account:'現金',amount:cash}]}, {highlight:"残額は掛け", entries:[{side:'credit',account:'買掛金',amount:credit}]}];
      return q;
    }
  },
  {
    id: 'md_04', major: 'merchandise', sub: 'trade_basic',
    text: "商品 250,000円 を売り上げ、代金のうち 100,000円 は小切手で受け取り、残額は掛けとした。",
    correctEntries: { debit: [{ accountName: "現金", amount: 100000 }, { accountName: "売掛金", amount: 150000 }], credit: [{ accountName: "売上", amount: 250000 }] },
    choices: ["売上", "現金", "売掛金", "受取手形"],
    explanation: "小切手の受取は「現金」で処理します。",
    mutate: (q) => {
      const total = Randomizer.getAmount(250000, 0.2, 1000);
      const check = Randomizer.round(total * 0.4, 1000);
      const credit = total - check;
      q.text = `商品 ${Randomizer.fmt(total)}円 を売り上げ、代金のうち ${Randomizer.fmt(check)}円 は小切手で受け取り、残額は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: check }, { accountName: "売掛金", amount: credit }], credit: [{ accountName: "売上", amount: total }] };
      q.explanationSteps = [{highlight:"小切手で受け取り", entries:[{side:'debit',account:'現金',amount:check}]}, {highlight:"残額は掛け", entries:[{side:'debit',account:'売掛金',amount:credit}]}];
      return q;
    }
  },
  {
    id: 'md_05', major: 'merchandise', sub: 'returns',
    text: "掛けで仕入れた商品のうち、品質不良のため 5,000円 を返品した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 5000 }], credit: [{ accountName: "仕入", amount: 5000 }] },
    choices: ["買掛金", "仕入", "現金", "売掛金"],
    explanation: "仕入戻し（返品）は、仕入の減少と買掛金の減少で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(5000, 0.2, 100);
      q.text = `掛けで仕入れた商品のうち、品質不良のため ${Randomizer.fmt(amt)}円 を返品した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "仕入", amount: amt }] };
      q.explanationSteps = [{highlight:"返品した", entries:[{side:'debit',account:'買掛金',amount:amt}, {side:'credit',account:'仕入',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'md_06', major: 'merchandise', sub: 'returns',
    text: "掛けで売り上げた商品のうち 8,000円 が品違いのため返品された。",
    correctEntries: { debit: [{ accountName: "売上", amount: 8000 }], credit: [{ accountName: "売掛金", amount: 8000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    explanation: "売上戻り（返品）は、売上の減少と売掛金の減少で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(8000, 0.2, 100);
      q.text = `掛けで売り上げた商品のうち ${Randomizer.fmt(amt)}円 が品違いのため返品された。`;
      q.correctEntries = { debit: [{ accountName: "売上", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"返品された", entries:[{side:'debit',account:'売上',amount:amt}, {side:'credit',account:'売掛金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'md_07', major: 'merchandise', sub: 'advance',
    text: "商品 80,000円 を注文し、内金として 10,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 10000 }], credit: [{ accountName: "現金", amount: 10000 }] },
    choices: ["前払金", "仕入", "買掛金", "現金"],
    explanation: "注文時の内金払いは「前払金」（資産）です。",
    mutate: (q) => {
      const total = Randomizer.getAmount(80000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(total)}円 を注文し、内金として ${Randomizer.fmt(adv)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "前払金", amount: adv }], credit: [{ accountName: "現金", amount: adv }] };
      q.explanationSteps = [{highlight:"内金", entries:[{side:'debit',account:'前払金',amount:adv}]}];
      return q;
    }
  },
  {
    id: 'md_08', major: 'merchandise', sub: 'advance',
    text: "注文を受けていた商品 120,000円 を引き渡し、代金は受け取っていた内金 30,000円 を差し引き、残額を掛けとした。",
    correctEntries: { debit: [{ accountName: "前受金", amount: 30000 }, { accountName: "売掛金", amount: 90000 }], credit: [{ accountName: "売上", amount: 120000 }] },
    choices: ["前受金", "売掛金", "売上", "現金"],
    explanation: "売上計上時に「前受金」を取り崩し、残額を「売掛金」とします。",
    mutate: (q) => {
      const total = Randomizer.getAmount(120000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.25, 1000);
      const bal = total - adv;
      q.text = `注文を受けていた商品 ${Randomizer.fmt(total)}円 を引き渡し、代金は受け取っていた内金 ${Randomizer.fmt(adv)}円 を差し引き、残額を掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "前受金", amount: adv }, { accountName: "売掛金", amount: bal }], credit: [{ accountName: "売上", amount: total }] };
      q.explanationSteps = [{highlight:"引き渡し", entries:[{side:'credit',account:'売上',amount:total}]}, {highlight:"内金...を差し引き", entries:[{side:'debit',account:'前受金',amount:adv}, {side:'debit',account:'売掛金',amount:bal}]}];
      return q;
    }
  },
  {
    id: 'md_09', major: 'merchandise', sub: 'shipping',
    text: "商品を仕入れ、代金 40,000円 と引取運賃 1,500円 は現金で支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 41500 }], credit: [{ accountName: "現金", amount: 41500 }] },
    choices: ["仕入", "現金", "発送費", "買掛金"],
    explanation: "仕入時の付随費用は「仕入」原価に含めます。",
    mutate: (q) => {
      const goods = Randomizer.getAmount(40000, 0.2, 1000);
      const ship = 1500;
      const total = goods + ship;
      q.text = `商品を仕入れ、代金 ${Randomizer.fmt(goods)}円 と引取運賃 ${Randomizer.fmt(ship)}円 は現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "現金", amount: total }] };
      q.explanationSteps = [{highlight:"引取運賃", entries:[{side:'debit',account:'仕入',amount:total}]}];
      return q;
    }
  },
  {
    id: 'md_10', major: 'merchandise', sub: 'shipping',
    text: "商品を売り上げ、代金 70,000円 は掛けとした。発送運賃 1,200円（先方負担）を現金で立て替えた。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 71200 }], credit: [{ accountName: "売上", amount: 70000 }, { accountName: "現金", amount: 1200 }] },
    choices: ["売掛金", "売上", "現金", "立替金"],
    explanation: "先方負担の運賃を立て替えた場合、「売掛金」に含めるか「立替金」としますが、売掛金に含めるのが一般的です。",
    mutate: (q) => {
      const goods = Randomizer.getAmount(70000, 0.2, 1000);
      const ship = 1200;
      const totalRec = goods + ship;
      q.text = `商品を売り上げ、代金 ${Randomizer.fmt(goods)}円 は掛けとした。発送運賃 ${Randomizer.fmt(ship)}円（先方負担）を現金で立て替えた。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: totalRec }], credit: [{ accountName: "売上", amount: goods }, { accountName: "現金", amount: ship }] };
      q.explanationSteps = [{highlight:"先方負担...立て替えた", entries:[{side:'debit',account:'売掛金',amount:totalRec}], comment:"商品代金と一緒に後で請求するため、売掛金に含めます。"}];
      return q;
    }
  },
  {
    id: 'md_11', major: 'merchandise', sub: 'other_pay',
    text: "商品 45,000円 を売り上げ、代金は全額クレジットカード払い（信販会社への債権）となった。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 45000 }], credit: [{ accountName: "売上", amount: 45000 }] },
    choices: ["売掛金", "売上", "クレジット売掛金", "現金"],
    explanation: "クレジット売上も3級では「売掛金」（またはクレジット売掛金）で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(45000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は全額クレジットカード払い（信販会社への債権）となった。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"クレジットカード払い", entries:[{side:'debit',account:'売掛金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'md_12', major: 'merchandise', sub: 'other_pay',
    text: "商品 12,000円 を売り上げ、代金は共通商品券で受け取った。",
    correctEntries: { debit: [{ accountName: "商品券", amount: 12000 }], credit: [{ accountName: "売上", amount: 12000 }] },
    choices: ["商品券", "売上", "現金", "受取手形"],
    explanation: "商品券は資産勘定（「商品券」または「他店商品券」）で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(12000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は共通商品券で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "商品券", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"商品券", entries:[{side:'debit',account:'商品券',amount:amt}]}];
      return q;
    }
  },

  // ==========================================
  // 3. NOTES (8 questions)
  // ==========================================
  {
    id: 'nt_01', major: 'notes', sub: 'notes_trade',
    text: "買掛金 250,000円 の支払いとして、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 250000 }], credit: [{ accountName: "支払手形", amount: 250000 }] },
    choices: ["買掛金", "支払手形", "当座預金", "受取手形"],
    explanation: "手形の振出しによる債務の支払いです。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(250000, 0.2, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いとして、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      q.explanationSteps = [{highlight:"約束手形を振り出した", entries:[{side:'credit',account:'支払手形',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'nt_02', major: 'notes', sub: 'notes_trade',
    text: "売掛金 350,000円 の回収として、得意先振出しの約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 350000 }], credit: [{ accountName: "売掛金", amount: 350000 }] },
    choices: ["受取手形", "売掛金", "支払手形", "現金"],
    explanation: "手形の受取りによる債権の回収です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(350000, 0.2, 1000);
      q.text = `売掛金 ${Randomizer.fmt(amt)}円 の回収として、得意先振出しの約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "受取手形", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"約束手形を受け取った", entries:[{side:'debit',account:'受取手形',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'nt_03', major: 'notes', sub: 'notes_trade',
    text: "商品 420,000円 を仕入れ、代金は約束手形を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 420000 }], credit: [{ accountName: "支払手形", amount: 420000 }] },
    choices: ["仕入", "支払手形", "買掛金", "現金"],
    explanation: "仕入と同時に手形を振り出すケースです。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(420000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は約束手形を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      q.explanationSteps = [{highlight:"手形を振り出して", entries:[{side:'credit',account:'支払手形',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'nt_04', major: 'notes', sub: 'notes_trade',
    text: "商品 180,000円 を売り上げ、代金は約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 180000 }], credit: [{ accountName: "売上", amount: 180000 }] },
    choices: ["受取手形", "売上", "売掛金", "現金"],
    explanation: "売上と同時に手形を受け取るケースです。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(180000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "受取手形", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"手形を受け取った", entries:[{side:'debit',account:'受取手形',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'nt_05', major: 'notes', sub: 'loan_notes',
    text: "銀行より現金 800,000円 を借り入れ、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 800000 }], credit: [{ accountName: "手形借入金", amount: 800000 }] },
    choices: ["現金", "手形借入金", "支払手形", "借入金"],
    explanation: "金銭の貸借に伴う手形振出しは「手形借入金」勘定を用います。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(800000, 0.1, 10000);
      q.text = `銀行より現金 ${Randomizer.fmt(amt)}円 を借り入れ、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "手形借入金", amount: amt }] };
      q.explanationSteps = [{highlight:"借り入れ...手形を振り出した", entries:[{side:'credit',account:'手形借入金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'nt_06', major: 'notes', sub: 'loan_notes',
    text: "取引先に現金 400,000円 を貸し付け、同額の約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "手形貸付金", amount: 400000 }], credit: [{ accountName: "現金", amount: 400000 }] },
    choices: ["手形貸付金", "現金", "受取手形", "貸付金"],
    explanation: "金銭の貸借に伴う手形受取りは「手形貸付金」勘定を用います。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(400000, 0.2, 1000);
      q.text = `取引先に現金 ${Randomizer.fmt(amt)}円 を貸し付け、同額の約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "手形貸付金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"貸し付け...手形を受け取った", entries:[{side:'debit',account:'手形貸付金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'nt_07', major: 'notes', sub: 'loan_notes',
    text: "手形借入金 500,000円 が期日となり、利息 5,000円 とともに現金で返済した。",
    correctEntries: { debit: [{ accountName: "手形借入金", amount: 500000 }, { accountName: "支払利息", amount: 5000 }], credit: [{ accountName: "現金", amount: 505000 }] },
    choices: ["手形借入金", "支払利息", "現金", "当座預金"],
    explanation: "借入金の返済と利息の支払いを同時に行う取引です。",
    mutate: (q) => {
      const principal = Randomizer.getAmount(500000, 0.2, 1000);
      const interest = Randomizer.round(principal * 0.01, 100);
      const total = principal + interest;
      q.text = `手形借入金 ${Randomizer.fmt(principal)}円 が期日となり、利息 ${Randomizer.fmt(interest)}円 とともに現金で返済した。`;
      q.correctEntries = { debit: [{ accountName: "手形借入金", amount: principal }, { accountName: "支払利息", amount: interest }], credit: [{ accountName: "現金", amount: total }] };
      q.explanationSteps = [{highlight:"借入金...返済", entries:[{side:'debit',account:'手形借入金',amount:principal}]}, {highlight:"利息", entries:[{side:'debit',account:'支払利息',amount:interest}]}];
      return q;
    }
  },
  {
    id: 'nt_08', major: 'notes', sub: 'loan_notes',
    text: "手形貸付金 300,000円 が期日となり、利息 3,000円 とともに現金で回収した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 303000 }], credit: [{ accountName: "手形貸付金", amount: 300000 }, { accountName: "受取利息", amount: 3000 }] },
    choices: ["現金", "手形貸付金", "受取利息", "当座預金"],
    explanation: "貸付金の回収と利息の受取りを同時に行う取引です。",
    mutate: (q) => {
      const principal = Randomizer.getAmount(300000, 0.2, 1000);
      const interest = Randomizer.round(principal * 0.01, 100);
      const total = principal + interest;
      q.text = `手形貸付金 ${Randomizer.fmt(principal)}円 が期日となり、利息 ${Randomizer.fmt(interest)}円 とともに現金で回収した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: total }], credit: [{ accountName: "手形貸付金", amount: principal }, { accountName: "受取利息", amount: interest }] };
      q.explanationSteps = [{highlight:"貸付金...回収", entries:[{side:'credit',account:'手形貸付金',amount:principal}]}, {highlight:"利息", entries:[{side:'credit',account:'受取利息',amount:interest}]}];
      return q;
    }
  },

  // ==========================================
  // 4. ASSETS & EXPENSES (9 questions)
  // ==========================================
  {
    id: 'ae_01', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用のパソコン 160,000円 を購入し、代金は翌月払いとした。",
    correctEntries: { debit: [{ accountName: "備品", amount: 160000 }], credit: [{ accountName: "未払金", amount: 160000 }] },
    choices: ["備品", "未払金", "買掛金", "仕入"],
    explanation: "商品以外の購入（後払い）は「未払金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(160000, 0.2, 1000);
      q.text = `営業用のパソコン ${Randomizer.fmt(amt)}円 を購入し、代金は翌月払いとした。`;
      q.correctEntries = { debit: [{ accountName: "備品", amount: amt }], credit: [{ accountName: "未払金", amount: amt }] };
      q.explanationSteps = [{highlight:"パソコン", entries:[{side:'debit',account:'備品',amount:amt}]}, {highlight:"翌月払い", entries:[{side:'credit',account:'未払金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_02', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用のトラック 2,000,000円 を購入し、代金は小切手を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "車両運搬具", amount: 2000000 }], credit: [{ accountName: "当座預金", amount: 2000000 }] },
    choices: ["車両運搬具", "当座預金", "未払金", "備品"],
    explanation: "自動車などは「車両運搬具」勘定で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(2000000, 0.1, 100000);
      q.text = `営業用のトラック ${Randomizer.fmt(amt)}円 を購入し、代金は小切手を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "車両運搬具", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      q.explanationSteps = [{highlight:"トラック", entries:[{side:'debit',account:'車両運搬具',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_03', major: 'assets_expenses', sub: 'fixed_assets',
    text: "土地 6,000,000円 を購入し、代金は小切手で支払った。なお、仲介手数料 200,000円 も小切手で支払った。",
    correctEntries: { debit: [{ accountName: "土地", amount: 6200000 }], credit: [{ accountName: "当座預金", amount: 6200000 }] },
    choices: ["土地", "当座預金", "支払手数料", "建物"],
    explanation: "土地購入時の手数料は取得原価に含めます。",
    mutate: (q) => {
      const land = Randomizer.getAmount(6000000, 0.1, 100000);
      const fee = 200000;
      const total = land + fee;
      q.text = `土地 ${Randomizer.fmt(land)}円 を購入し、代金は小切手で支払った。なお、仲介手数料 ${Randomizer.fmt(fee)}円 も小切手で支払った。`;
      q.correctEntries = { debit: [{ accountName: "土地", amount: total }], credit: [{ accountName: "当座預金", amount: total }] };
      q.explanationSteps = [{highlight:"仲介手数料", entries:[{side:'debit',account:'土地',amount:total}], comment:"手数料込で土地勘定とします。"}];
      return q;
    }
  },
  {
    id: 'ae_04', major: 'assets_expenses', sub: 'fixed_assets',
    text: "不要になった備品（帳簿価額 50,000円）を 30,000円 で売却し、代金は月末に受け取ることにした（直接法）。",
    correctEntries: { debit: [{ accountName: "未収金", amount: 30000 }, { accountName: "固定資産売却損", amount: 20000 }], credit: [{ accountName: "備品", amount: 50000 }] },
    choices: ["未収金", "備品", "固定資産売却損", "現金"],
    explanation: "商品以外の売却代金（後受け）は「未収金」。帳簿価額より安く売った差額は「固定資産売却損」です。",
    mutate: (q) => {
      const bookVal = Randomizer.getAmount(50000, 0.2, 1000);
      const sellVal = Randomizer.round(bookVal * 0.6, 1000);
      const loss = bookVal - sellVal;
      q.text = `不要になった備品（帳簿価額 ${Randomizer.fmt(bookVal)}円）を ${Randomizer.fmt(sellVal)}円 で売却し、代金は月末に受け取ることにした（直接法）。`;
      q.correctEntries = { debit: [{ accountName: "未収金", amount: sellVal }, { accountName: "固定資産売却損", amount: loss }], credit: [{ accountName: "備品", amount: bookVal }] };
      q.explanationSteps = [{highlight:"売却", entries:[{side:'credit',account:'備品',amount:bookVal}]}, {highlight:"代金は月末", entries:[{side:'debit',account:'未収金',amount:sellVal}]}, {highlight:"差額", entries:[{side:'debit',account:'固定資産売却損',amount:loss}]}];
      return q;
    }
  },
  {
    id: 'ae_05', major: 'assets_expenses', sub: 'expenses',
    text: "固定資産税 60,000円 を現金で納付した。",
    correctEntries: { debit: [{ accountName: "租税公課", amount: 60000 }], credit: [{ accountName: "現金", amount: 60000 }] },
    choices: ["租税公課", "現金", "法人税等", "資本金"],
    explanation: "固定資産税は「租税公課」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(60000, 0.2, 1000);
      q.text = `固定資産税 ${Randomizer.fmt(amt)}円 を現金で納付した。`;
      q.correctEntries = { debit: [{ accountName: "租税公課", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"固定資産税", entries:[{side:'debit',account:'租税公課',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_06', major: 'assets_expenses', sub: 'expenses',
    text: "収入印紙 3,000円 を現金で購入し、ただちに使用した。",
    correctEntries: { debit: [{ accountName: "租税公課", amount: 3000 }], credit: [{ accountName: "現金", amount: 3000 }] },
    choices: ["租税公課", "現金", "消耗品費", "通信費"],
    explanation: "収入印紙は「租税公課」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(3000, 0.2, 100);
      q.text = `収入印紙 ${Randomizer.fmt(amt)}円 を現金で購入し、ただちに使用した。`;
      q.correctEntries = { debit: [{ accountName: "租税公課", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"収入印紙", entries:[{side:'debit',account:'租税公課',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_07', major: 'assets_expenses', sub: 'expenses',
    text: "郵便切手 1,000円 を現金で購入し、ただちに使用した。",
    correctEntries: { debit: [{ accountName: "通信費", amount: 1000 }], credit: [{ accountName: "現金", amount: 1000 }] },
    choices: ["通信費", "現金", "租税公課", "消耗品費"],
    explanation: "切手は「通信費」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000, 0.2, 100);
      q.text = `郵便切手 ${Randomizer.fmt(amt)}円 を現金で購入し、ただちに使用した。`;
      q.correctEntries = { debit: [{ accountName: "通信費", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"郵便切手", entries:[{side:'debit',account:'通信費',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_08', major: 'assets_expenses', sub: 'expenses',
    text: "コピー用紙や文房具代 5,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "消耗品費", amount: 5000 }], credit: [{ accountName: "現金", amount: 5000 }] },
    choices: ["消耗品費", "現金", "雑費", "通信費"],
    explanation: "事務用品などは「消耗品費」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(5000, 0.3, 100);
      q.text = `コピー用紙や文房具代 ${Randomizer.fmt(amt)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "消耗品費", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"文房具代", entries:[{side:'debit',account:'消耗品費',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_09', major: 'assets_expenses', sub: 'expenses',
    text: "従業員の給料 300,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "給料", amount: 300000 }], credit: [{ accountName: "現金", amount: 300000 }] },
    choices: ["給料", "現金", "立替金", "預り金"],
    explanation: "給料の支払いです。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.2, 1000);
      q.text = `従業員の給料 ${Randomizer.fmt(amt)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "給料", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"給料", entries:[{side:'debit',account:'給料',amount:amt}]}];
      return q;
    }
  },

  // ==========================================
  // 5. CLOSING (14 questions)
  // ==========================================
  {
    id: 'cl_01', major: 'closing', sub: 'bad_debts',
    text: "決算につき、売掛金残高 1,500,000円 に対し 2% の貸倒引当金を設定する。残高は 10,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金繰入", amount: 20000 }], credit: [{ accountName: "貸倒引当金", amount: 20000 }] },
    choices: ["貸倒引当金繰入", "貸倒引当金", "売掛金", "貸倒損失"],
    explanation: "要設定額(30,000) - 残高(10,000) = 繰入額(20,000)。",
    mutate: (q) => {
      const receivables = Randomizer.getAmount(1500000, 0.1, 100000);
      const rate = 0.02; 
      const target = receivables * rate;
      const balance = Randomizer.getAmount(10000, 0.5, 1000);
      const entryAmt = target - balance; 
      q.text = `決算につき、売掛金残高 ${Randomizer.fmt(receivables)}円 に対し 2% の貸倒引当金を設定する。残高は ${Randomizer.fmt(balance)}円 である（差額補充法）。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金繰入", amount: entryAmt }], credit: [{ accountName: "貸倒引当金", amount: entryAmt }] };
      q.explanationSteps = [{highlight:"貸倒引当金を設定", entries:[{side:'debit',account:'貸倒引当金繰入',amount:entryAmt},{side:'credit',account:'貸倒引当金',amount:entryAmt}]}];
      return q;
    }
  },
  {
    id: 'cl_02', major: 'closing', sub: 'bad_debts',
    text: "前期に貸倒れ処理した売掛金 5,000円 が当期に現金で回収された。",
    correctEntries: { debit: [{ accountName: "現金", amount: 5000 }], credit: [{ accountName: "償却債権取立益", amount: 5000 }] },
    choices: ["現金", "償却債権取立益", "貸倒引当金", "雑益"],
    explanation: "過年度に処理した貸倒れの回収は「償却債権取立益」（収益）で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(5000, 0.5, 100);
      q.text = `前期に貸倒れ処理した売掛金 ${Randomizer.fmt(amt)}円 が当期に現金で回収された。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "償却債権取立益", amount: amt }] };
      q.explanationSteps = [{highlight:"前期に貸倒れ...回収", entries:[{side:'credit',account:'償却債権取立益',amount:amt}], comment:"前期以前の回収は収益（取立益）です。"}];
      return q;
    }
  },
  {
    id: 'cl_03', major: 'closing', sub: 'bad_debts',
    text: "得意先が倒産し、売掛金 30,000円 が貸倒れとなった。貸倒引当金の残高は 50,000円 ある。",
    correctEntries: { debit: [{ accountName: "貸倒引当金", amount: 30000 }], credit: [{ accountName: "売掛金", amount: 30000 }] },
    choices: ["貸倒引当金", "売掛金", "貸倒損失", "現金"],
    explanation: "引当金残高が十分ある場合は、全額を引当金から充当します。",
    mutate: (q) => {
      const loss = Randomizer.getAmount(30000, 0.2, 1000);
      const balance = loss + 20000;
      q.text = `得意先が倒産し、売掛金 ${Randomizer.fmt(loss)}円 が貸倒れとなった。貸倒引当金の残高は ${Randomizer.fmt(balance)}円 ある。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金", amount: loss }], credit: [{ accountName: "売掛金", amount: loss }] };
      q.explanationSteps = [{highlight:"貸倒れとなった", entries:[{side:'debit',account:'貸倒引当金',amount:loss}, {side:'credit',account:'売掛金',amount:loss}], comment:"残高があるので引当金を取り崩します。"}];
      return q;
    }
  },
  {
    id: 'cl_04', major: 'closing', sub: 'depreciation',
    text: "建物の減価償却を行う。取得原価 4,000,000円、残存価額ゼロ、耐用年数40年、定額法。記帳方法は直接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "建物", amount: 100000 }] },
    choices: ["減価償却費", "建物", "減価償却累計額"],
    explanation: "4,000,000 ÷ 40 = 100,000円。直接法なので「建物」を減らします。",
    mutate: (q) => {
      const cost = Randomizer.getAmount(4000000, 0.1, 100000);
      const years = 40;
      const dep = Math.round(cost / years);
      q.text = `建物の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は直接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "建物", amount: dep }] };
      q.explanationSteps = [{highlight:"減価償却", entries:[{side:'debit',account:'減価償却費',amount:dep},{side:'credit',account:'建物',amount:dep}]}];
      return q;
    }
  },
  {
    id: 'cl_05', major: 'closing', sub: 'depreciation',
    text: "備品の減価償却を行う。取得原価 600,000円、残存価額ゼロ、耐用年数6年、定額法。記帳方法は間接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "減価償却累計額", amount: 100000 }] },
    choices: ["減価償却費", "減価償却累計額", "備品"],
    explanation: "間接法の場合、貸方は「減価償却累計額」を使用します。",
    mutate: (q) => {
      const cost = Randomizer.getAmount(600000, 0.1, 10000);
      const years = 6;
      const dep = Math.round(cost / years);
      q.text = `備品の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は間接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "減価償却累計額", amount: dep }] };
      q.explanationSteps = [{highlight:"間接法", entries:[{side:'credit',account:'減価償却累計額',amount:dep}]}];
      return q;
    }
  },
  {
    id: 'cl_06', major: 'closing', sub: 'inventory',
    text: "決算整理を行う。期首商品棚卸高 70,000円、期末商品棚卸高 80,000円 であった。売上原価は「仕入」の行で計算する。",
    correctEntries: { 
      debit: [{ accountName: "仕入", amount: 70000 }, { accountName: "繰越商品", amount: 80000 }], 
      credit: [{ accountName: "繰越商品", amount: 70000 }, { accountName: "仕入", amount: 80000 }] 
    },
    choices: ["仕入", "繰越商品", "売上", "棚卸減耗費"],
    explanation: "「し・くり・くり・し」の仕訳です。",
    mutate: (q) => {
      const start = Randomizer.getAmount(70000, 0.2, 1000);
      const end = Randomizer.getAmount(80000, 0.2, 1000);
      q.text = `決算整理を行う。期首商品棚卸高 ${Randomizer.fmt(start)}円、期末商品棚卸高 ${Randomizer.fmt(end)}円 であった。売上原価は「仕入」の行で計算する。`;
      q.correctEntries = { 
        debit: [{ accountName: "仕入", amount: start }, { accountName: "繰越商品", amount: end }], 
        credit: [{ accountName: "繰越商品", amount: start }, { accountName: "仕入", amount: end }] 
      };
      q.explanationSteps = [
        {highlight:"期首商品", entries:[{side:'debit',account:'仕入',amount:start},{side:'credit',account:'繰越商品',amount:start}]},
        {highlight:"期末商品", entries:[{side:'debit',account:'繰越商品',amount:end},{side:'credit',account:'仕入',amount:end}]}
      ];
      return q;
    }
  },
  {
    id: 'cl_07', major: 'closing', sub: 'deferral_accrual',
    text: "家賃の未払分 40,000円 を計上する。",
    correctEntries: { debit: [{ accountName: "支払家賃", amount: 40000 }], credit: [{ accountName: "未払家賃", amount: 40000 }] },
    choices: ["支払家賃", "未払家賃", "未払金", "現金"],
    explanation: "費用の見越し計上です（未払費用の計上）。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(40000, 0.2, 1000);
      q.text = `家賃の未払分 ${Randomizer.fmt(amt)}円 を計上する。`;
      q.correctEntries = { debit: [{ accountName: "支払家賃", amount: amt }], credit: [{ accountName: "未払家賃", amount: amt }] };
      q.explanationSteps = [{highlight:"未払分", entries:[{side:'debit',account:'支払家賃',amount:amt},{side:'credit',account:'未払家賃',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cl_08', major: 'closing', sub: 'deferral_accrual',
    text: "地代の前払分 15,000円 を繰り延べる。",
    correctEntries: { debit: [{ accountName: "前払地代", amount: 15000 }], credit: [{ accountName: "支払地代", amount: 15000 }] },
    choices: ["前払地代", "支払地代", "前払金", "現金"],
    explanation: "費用の繰延べです（前払費用の計上）。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(15000, 0.2, 1000);
      q.text = `地代の前払分 ${Randomizer.fmt(amt)}円 を繰り延べる。`;
      q.correctEntries = { debit: [{ accountName: "前払地代", amount: amt }], credit: [{ accountName: "支払地代", amount: amt }] };
      q.explanationSteps = [{highlight:"前払分", entries:[{side:'debit',account:'前払地代',amount:amt},{side:'credit',account:'支払地代',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cl_09', major: 'closing', sub: 'deferral_accrual',
    text: "受取利息の未収分 800円 を計上する。",
    correctEntries: { debit: [{ accountName: "未収利息", amount: 800 }], credit: [{ accountName: "受取利息", amount: 800 }] },
    choices: ["未収利息", "受取利息", "未収金", "現金"],
    explanation: "収益の見越しです（未収収益の計上）。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(800, 0.5, 100);
      q.text = `受取利息の未収分 ${Randomizer.fmt(amt)}円 を計上する。`;
      q.correctEntries = { debit: [{ accountName: "未収利息", amount: amt }], credit: [{ accountName: "受取利息", amount: amt }] };
      q.explanationSteps = [{highlight:"未収分", entries:[{side:'debit',account:'未収利息',amount:amt},{side:'credit',account:'受取利息',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cl_10', major: 'closing', sub: 'deferral_accrual',
    text: "受取家賃の前受分 25,000円 を繰り延べる。",
    correctEntries: { debit: [{ accountName: "受取家賃", amount: 25000 }], credit: [{ accountName: "前受家賃", amount: 25000 }] },
    choices: ["受取家賃", "前受家賃", "前受金", "現金"],
    explanation: "収益の繰延べです（前受収益の計上）。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(25000, 0.2, 1000);
      q.text = `受取家賃の前受分 ${Randomizer.fmt(amt)}円 を繰り延べる。`;
      q.correctEntries = { debit: [{ accountName: "受取家賃", amount: amt }], credit: [{ accountName: "前受家賃", amount: amt }] };
      q.explanationSteps = [{highlight:"前受分", entries:[{side:'debit',account:'受取家賃',amount:amt},{side:'credit',account:'前受家賃',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cl_11', major: 'closing', sub: 'tax',
    text: "当期の法人税等（法人税、住民税及び事業税）が 150,000円 と計算された。中間申告分 60,000円（仮払法人税等）を差し引き、残額を未払計上する。",
    correctEntries: { debit: [{ accountName: "法人税等", amount: 150000 }], credit: [{ accountName: "仮払法人税等", amount: 60000 }, { accountName: "未払法人税等", amount: 90000 }] },
    choices: ["法人税等", "仮払法人税等", "未払法人税等", "現金"],
    explanation: "法人税等の確定処理です。仮払分を相殺し、不足分を未払法人税等とします。",
    mutate: (q) => {
      const tax = Randomizer.getAmount(150000, 0.2, 10000);
      const paid = Randomizer.round(tax * 0.4, 1000);
      const unpaid = tax - paid;
      q.text = `当期の法人税等（法人税、住民税及び事業税）が ${Randomizer.fmt(tax)}円 と計算された。中間申告分 ${Randomizer.fmt(paid)}円（仮払法人税等）を差し引き、残額を未払計上する。`;
      q.correctEntries = { debit: [{ accountName: "法人税等", amount: tax }], credit: [{ accountName: "仮払法人税等", amount: paid }, { accountName: "未払法人税等", amount: unpaid }] };
      q.explanationSteps = [{highlight:"法人税等", entries:[{side:'debit',account:'法人税等',amount:tax}]}, {highlight:"中間申告分", entries:[{side:'credit',account:'仮払法人税等',amount:paid}, {side:'credit',account:'未払法人税等',amount:unpaid}]}];
      return q;
    }
  },
  {
    id: 'cl_12', major: 'closing', sub: 'tax',
    text: "購入時に費用処理していた郵便切手の未使用分 2,000円 を貯蔵品に振り替える。",
    correctEntries: { debit: [{ accountName: "貯蔵品", amount: 2000 }], credit: [{ accountName: "通信費", amount: 2000 }] },
    choices: ["貯蔵品", "通信費", "消耗品費", "現金"],
    explanation: "未使用の切手や収入印紙は、決算時に「貯蔵品」（資産）に振り替えます。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(2000, 0.5, 100);
      q.text = `購入時に費用処理していた郵便切手の未使用分 ${Randomizer.fmt(amt)}円 を貯蔵品に振り替える。`;
      q.correctEntries = { debit: [{ accountName: "貯蔵品", amount: amt }], credit: [{ accountName: "通信費", amount: amt }] };
      q.explanationSteps = [{highlight:"未使用分", entries:[{side:'debit',account:'貯蔵品',amount:amt}, {side:'credit',account:'通信費',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'cl_13', major: 'closing', sub: 'tax',
    text: "消費税の決算整理を行う。当期の仮受消費税は 80,000円、仮払消費税は 50,000円 であり、差額を未払消費税とする。",
    correctEntries: { debit: [{ accountName: "仮受消費税", amount: 80000 }], credit: [{ accountName: "仮払消費税", amount: 50000 }, { accountName: "未払消費税", amount: 30000 }] },
    choices: ["仮受消費税", "仮払消費税", "未払消費税", "現金"],
    explanation: "仮受消費税と仮払消費税を相殺し、納付額を未払消費税として計上します。",
    mutate: (q) => {
      const received = Randomizer.getAmount(80000, 0.2, 1000);
      const paid = Randomizer.round(received * 0.6, 1000);
      const tax = received - paid;
      q.text = `消費税の決算整理を行う。当期の仮受消費税は ${Randomizer.fmt(received)}円、仮払消費税は ${Randomizer.fmt(paid)}円 であり、差額を未払消費税とする。`;
      q.correctEntries = { debit: [{ accountName: "仮受消費税", amount: received }], credit: [{ accountName: "仮払消費税", amount: paid }, { accountName: "未払消費税", amount: tax }] };
      q.explanationSteps = [{highlight:"仮受消費税", entries:[{side:'debit',account:'仮受消費税',amount:received}]}, {highlight:"仮払消費税", entries:[{side:'credit',account:'仮払消費税',amount:paid}, {side:'credit',account:'未払消費税',amount:tax}]}];
      return q;
    }
  },
  {
    id: 'cl_14', major: 'closing', sub: 'tax',
    text: "当期純利益 200,000円 を繰越利益剰余金勘定に振り替える。（損益勘定の借方残高を振り替える）",
    correctEntries: { debit: [{ accountName: "損益", amount: 200000 }], credit: [{ accountName: "繰越利益剰余金", amount: 200000 }] },
    choices: ["損益", "繰越利益剰余金", "資本金", "当期純利益"],
    explanation: "個人企業の資本金振替とは異なり、株式会社（3級範囲の一部）では繰越利益剰余金を使いますが、全商3級の個人企業前提なら「資本金」への振替となります。※ここでは一般的な3級範囲として「資本金」振替パターンも用意すべきですが、近年の傾向に合わせ柔軟に対応します。今回は個人企業前提で「資本金」とするのが無難ですが、問題文に「繰越利益剰余金」とある場合はそれに従います。",
    // For Zensho 3, it's usually Sole Proprietorship -> Capital. Let's stick to Capital for consistency with other questions.
    text: "当期純利益 200,000円 を資本金勘定に振り替える。",
    correctEntries: { debit: [{ accountName: "損益", amount: 200000 }], credit: [{ accountName: "資本金", amount: 200000 }] },
    choices: ["損益", "資本金", "繰越利益剰余金", "当期純利益"],
    explanation: "個人企業の場合、当期純利益は「資本金」に加算します。",
    mutate: (q) => {
      const profit = Randomizer.getAmount(200000, 0.5, 10000);
      q.text = `当期純利益 ${Randomizer.fmt(profit)}円 を資本金勘定に振り替える。`;
      q.correctEntries = { debit: [{ accountName: "損益", amount: profit }], credit: [{ accountName: "資本金", amount: profit }] };
      q.explanationSteps = [{highlight:"資本金勘定に振り替える", entries:[{side:'debit',account:'損益',amount:profit}, {side:'credit',account:'資本金',amount:profit}]}];
      return q;
    }
  }
];
