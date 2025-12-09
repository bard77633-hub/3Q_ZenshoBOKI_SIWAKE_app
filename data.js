
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Data Module - V11 (Expanded Content)
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
      { id: 'deferral_accrual', title: '見越・繰延' }
    ]
  }
];

// --- Data: Questions (Expanded to ~50 questions) ---
const QUESTIONS = [
  // ==========================================
  // 1. CASH & SAVINGS
  // ==========================================
  // [Cash Basic]
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
      q.explanationSteps = [{highlight:"元入れ", entries:[{side:'debit',account:'現金',amount:amt},{side:'credit',account:'資本金',amount:amt}], comment:"資産(現金)の増加と純資産(資本金)の増加です。"}];
      return q;
    }
  },
  {
    id: 'cs_02', major: 'cash_savings', sub: 'cash_basic',
    text: "得意先より売掛金の回収として、同店振出しの小切手 50,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 50000 }], credit: [{ accountName: "売掛金", amount: 50000 }] },
    choices: ["現金", "当座預金", "売掛金", "受取手形"],
    explanation: "他人（得意先）振出しの小切手は、すぐに換金できるため「現金」として扱います。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `得意先より売掛金の回収として、同店振出しの小切手 ${Randomizer.fmt(amt)}円 を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"小切手", entries:[{side:'debit',account:'現金',amount:amt}], comment:"他人振出小切手は「現金」勘定で処理します。"}];
      return q;
    }
  },
  // [Checking]
  {
    id: 'cs_03', major: 'cash_savings', sub: 'checking',
    text: "当座預金口座に現金 200,000円 を預け入れた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 200000 }], credit: [{ accountName: "現金", amount: 200000 }] },
    choices: ["当座預金", "現金", "資本金", "借入金"],
    explanation: "手元の現金を減らし、当座預金を増やします。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.4, 1000);
      q.text = `当座預金口座に現金 ${Randomizer.fmt(amt)}円 を預け入れた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"預け入れた", entries:[{side:'debit',account:'当座預金',amount:amt}, {side:'credit',account:'現金',amount:amt}], comment:"資産の振替取引です。"}];
      return q;
    }
  },
  {
    id: 'cs_04', major: 'cash_savings', sub: 'checking',
    text: "買掛金 150,000円 の支払いのため、小切手を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 150000 }], credit: [{ accountName: "当座預金", amount: 150000 }] },
    choices: ["当座預金", "現金", "買掛金", "支払手形"],
    explanation: "小切手を振り出すと、当座預金が減少します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(150000, 0.3, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いのため、小切手を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      q.explanationSteps = [{highlight:"小切手を振り出した", entries:[{side:'credit',account:'当座預金',amount:amt}], comment:"自社で小切手を振り出した場合は「当座預金」の減少です。"}];
      return q;
    }
  },
  // [Petty Cash]
  {
    id: 'cs_05', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係に小切手 30,000円 を振り出して手渡した（定額資金前渡法）。",
    correctEntries: { debit: [{ accountName: "小口現金", amount: 30000 }], credit: [{ accountName: "当座預金", amount: 30000 }] },
    choices: ["小口現金", "当座預金", "現金", "雑費"],
    explanation: "小口現金を前渡しした段階では、費用ではなく「小口現金」（資産）の増加とします。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(30000, 0.2, 1000);
      q.text = `小口係に小切手 ${Randomizer.fmt(amt)}円 を振り出して手渡した（定額資金前渡法）。`;
      q.correctEntries = { debit: [{ accountName: "小口現金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      q.explanationSteps = [{highlight:"小切手", entries:[{side:'credit',account:'当座預金',amount:amt}], comment:"当座預金から支払い、"},{highlight:"小口係", entries:[{side:'debit',account:'小口現金',amount:amt}], comment:"小口現金へ資金を移動します。"}];
      return q;
    }
  },
  {
    id: 'cs_06', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係より、交通費 5,000円、雑費 2,000円 の支払報告を受けた。",
    correctEntries: { debit: [{ accountName: "旅費交通費", amount: 5000 }, { accountName: "雑費", amount: 2000 }], credit: [{ accountName: "小口現金", amount: 7000 }] },
    choices: ["旅費交通費", "雑費", "小口現金", "現金"],
    explanation: "報告を受けたタイミングで費用を計上し、小口現金を減らします（補給はまだしていない）。",
    mutate: (q) => {
      const v1 = Randomizer.getAmount(5000, 0.2, 100);
      const v2 = Randomizer.getAmount(2000, 0.2, 100);
      const total = v1 + v2;
      q.text = `小口係より、交通費 ${Randomizer.fmt(v1)}円、雑費 ${Randomizer.fmt(v2)}円 の支払報告を受けた。`;
      q.correctEntries = { debit: [{ accountName: "旅費交通費", amount: v1 }, { accountName: "雑費", amount: v2 }], credit: [{ accountName: "小口現金", amount: total }] };
      q.explanationSteps = [{highlight:"支払報告", entries:[{side:'debit',account:'旅費交通費',amount:v1},{side:'debit',account:'雑費',amount:v2},{side:'credit',account:'小口現金',amount:total}], comment:"使った金額分、小口現金を減らします。"}];
      return q;
    }
  },
  // [Short/Over]
  {
    id: 'cs_07', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高を調べたところ 10,000円 であり、帳簿残高 11,000円 より少なかった。不一致の原因は不明である。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 1000 }], credit: [{ accountName: "現金", amount: 1000 }] },
    choices: ["現金", "現金過不足", "雑損", "雑益"],
    explanation: "実際 < 帳簿 の場合、帳簿を減らして実際に合わせます。相手科目は「現金過不足」。",
    mutate: (q) => {
      const book = Randomizer.getAmount(11000, 0.2, 100);
      const diff = 1000;
      const actual = book - diff;
      q.text = `現金の実際有高を調べたところ ${Randomizer.fmt(actual)}円 であり、帳簿残高 ${Randomizer.fmt(book)}円 より少なかった。不一致の原因は不明である。`;
      q.correctEntries = { debit: [{ accountName: "現金過不足", amount: diff }], credit: [{ accountName: "現金", amount: diff }] };
      q.explanationSteps = [{highlight:"少なかった", entries:[{side:'credit',account:'現金',amount:diff}], comment:"帳簿の現金を減らして実際に合わせます。"}];
      return q;
    }
  },
  {
    id: 'cs_08', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高が帳簿より 500円 多かったが、原因不明のため処理する。",
    correctEntries: { debit: [{ accountName: "現金", amount: 500 }], credit: [{ accountName: "現金過不足", amount: 500 }] },
    choices: ["現金", "現金過不足", "雑益", "雑損"],
    explanation: "実際 > 帳簿 の場合、帳簿を増やして実際に合わせます。",
    mutate: (q) => {
      const diff = Randomizer.getAmount(500, 0.4, 100);
      q.text = `現金の実際有高が帳簿より ${Randomizer.fmt(diff)}円 多かったが、原因不明のため処理する。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: diff }], credit: [{ accountName: "現金過不足", amount: diff }] };
      q.explanationSteps = [{highlight:"多かった", entries:[{side:'debit',account:'現金',amount:diff}], comment:"帳簿の現金を増やして実際に合わせます。"}];
      return q;
    }
  },
  {
    id: 'cs_09', major: 'cash_savings', sub: 'short_over',
    text: "決算において、現金過不足（借方残高） 2,000円 の原因が判明しなかったため、雑損として処理する。",
    correctEntries: { debit: [{ accountName: "雑損", amount: 2000 }], credit: [{ accountName: "現金過不足", amount: 2000 }] },
    choices: ["雑損", "現金過不足", "雑益", "現金"],
    explanation: "期中に計上した現金過不足（借方＝不足）が決算まで残った場合は「雑損」に振り替えます。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(2000, 0.5, 100);
      q.text = `決算において、現金過不足（借方残高） ${Randomizer.fmt(amt)}円 の原因が判明しなかったため、雑損として処理する。`;
      q.correctEntries = { debit: [{ accountName: "雑損", amount: amt }], credit: [{ accountName: "現金過不足", amount: amt }] };
      q.explanationSteps = [{highlight:"雑損として処理", entries:[{side:'debit',account:'雑損',amount:amt}, {side:'credit',account:'現金過不足',amount:amt}], comment:"借方残高（不足）は損失として確定させます。"}];
      return q;
    }
  },

  // ==========================================
  // 2. MERCHANDISE
  // ==========================================
  // [Trade Basic]
  {
    id: 'md_01', major: 'merchandise', sub: 'trade_basic',
    text: "商品 300,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 300000 }], credit: [{ accountName: "買掛金", amount: 300000 }] },
    choices: ["仕入", "買掛金", "売掛金", "現金"],
    explanation: "商品の購入代金を後払いにした場合は「買掛金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "買掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"仕入れ", entries:[{side:'debit',account:'仕入',amount:amt}]}, {highlight:"掛け", entries:[{side:'credit',account:'買掛金',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'md_02', major: 'merchandise', sub: 'trade_basic',
    text: "商品 500,000円 を売り上げ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 500000 }], credit: [{ accountName: "売上", amount: 500000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    explanation: "商品の販売代金を後受けにした場合は「売掛金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(500000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"売り上げ", entries:[{side:'credit',account:'売上',amount:amt}]}, {highlight:"掛け", entries:[{side:'debit',account:'売掛金',amount:amt}]}];
      return q;
    }
  },
  // [Returns]
  {
    id: 'md_03', major: 'merchandise', sub: 'returns',
    text: "掛けで仕入れた商品のうち、不良品 10,000円 を返品した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 10000 }], credit: [{ accountName: "仕入", amount: 10000 }] },
    choices: ["買掛金", "仕入", "現金", "売掛金"],
    explanation: "仕入戻し（返品）は、仕入の逆仕訳を行います（買掛金の減少、仕入の減少）。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(10000, 0.2, 1000);
      q.text = `掛けで仕入れた商品のうち、不良品 ${Randomizer.fmt(amt)}円 を返品した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "仕入", amount: amt }] };
      q.explanationSteps = [{highlight:"返品した", entries:[{side:'debit',account:'買掛金',amount:amt}, {side:'credit',account:'仕入',amount:amt}], comment:"仕入時と逆の仕訳を行い、債務と費用を取り消します。"}];
      return q;
    }
  },
  {
    id: 'md_04', major: 'merchandise', sub: 'returns',
    text: "掛けで売り上げた商品のうち 20,000円 が品違いのため返品された。",
    correctEntries: { debit: [{ accountName: "売上", amount: 20000 }], credit: [{ accountName: "売掛金", amount: 20000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    explanation: "売上戻り（返品）は、売上の逆仕訳を行います（売上の減少、売掛金の減少）。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(20000, 0.2, 1000);
      q.text = `掛けで売り上げた商品のうち ${Randomizer.fmt(amt)}円 が品違いのため返品された。`;
      q.correctEntries = { debit: [{ accountName: "売上", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"返品された", entries:[{side:'debit',account:'売上',amount:amt}, {side:'credit',account:'売掛金',amount:amt}], comment:"売上時と逆の仕訳を行い、収益と債権を取り消します。"}];
      return q;
    }
  },
  // [Advance]
  {
    id: 'md_05', major: 'merchandise', sub: 'advance',
    text: "商品 100,000円 を注文し、内金として 20,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 20000 }], credit: [{ accountName: "現金", amount: 20000 }] },
    choices: ["前払金", "仕入", "買掛金", "現金"],
    explanation: "商品をまだ受け取っていない段階での支払いは「前払金」（資産）です。",
    mutate: (q) => {
      const total = Randomizer.getAmount(100000, 0.2, 10000);
      const adv = Randomizer.round(total * 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(total)}円 を注文し、内金として ${Randomizer.fmt(adv)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "前払金", amount: adv }], credit: [{ accountName: "現金", amount: adv }] };
      q.explanationSteps = [{highlight:"内金", entries:[{side:'debit',account:'前払金',amount:adv}], comment:"手付金は「前払金」で処理します。"}];
      return q;
    }
  },
  {
    id: 'md_06', major: 'merchandise', sub: 'advance',
    text: "注文済みの商品 100,000円 を受け取り、代金は内金 20,000円 を差し引き、残額を掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 100000 }], credit: [{ accountName: "前払金", amount: 20000 }, { accountName: "買掛金", amount: 80000 }] },
    choices: ["仕入", "前払金", "買掛金", "現金"],
    explanation: "商品到着時に「仕入」を計上し、先に支払った「前払金」を充当します。",
    mutate: (q) => {
      const total = Randomizer.getAmount(100000, 0.2, 10000);
      const adv = Randomizer.round(total * 0.2, 1000);
      const bal = total - adv;
      q.text = `注文済みの商品 ${Randomizer.fmt(total)}円 を受け取り、代金は内金 ${Randomizer.fmt(adv)}円 を差し引き、残額を掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "前払金", amount: adv }, { accountName: "買掛金", amount: bal }] };
      q.explanationSteps = [{highlight:"商品...を受け取り", entries:[{side:'debit',account:'仕入',amount:total}]}, {highlight:"内金...を差し引き", entries:[{side:'credit',account:'前払金',amount:adv}, {side:'credit',account:'買掛金',amount:bal}], comment:"前払金を消し込み、残りを買掛金とします。"}];
      return q;
    }
  },
  // [Shipping]
  {
    id: 'md_07', major: 'merchandise', sub: 'shipping',
    text: "商品を仕入れ、代金 50,000円 と引取運賃 1,000円 は現金で支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 51000 }], credit: [{ accountName: "現金", amount: 51000 }] },
    choices: ["仕入", "現金", "発送費", "買掛金"],
    explanation: "仕入諸掛り（引取運賃）は、仕入原価に含めます。",
    mutate: (q) => {
      const goods = Randomizer.getAmount(50000, 0.2, 1000);
      const ship = 1000;
      const total = goods + ship;
      q.text = `商品を仕入れ、代金 ${Randomizer.fmt(goods)}円 と引取運賃 ${Randomizer.fmt(ship)}円 は現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "現金", amount: total }] };
      q.explanationSteps = [{highlight:"引取運賃", entries:[{side:'debit',account:'仕入',amount:total}], comment:"仕入時の運賃は「仕入」に合算します。"}];
      return q;
    }
  },
  {
    id: 'md_08', major: 'merchandise', sub: 'shipping',
    text: "商品を売り上げ、代金 80,000円 は掛けとした。なお、発送運賃 1,500円 を現金で支払った（当社負担）。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 80000 }, { accountName: "発送費", amount: 1500 }], credit: [{ accountName: "売上", amount: 80000 }, { accountName: "現金", amount: 1500 }] },
    choices: ["売掛金", "発送費", "売上", "現金", "仕入"],
    explanation: "売上諸掛り（発送運賃）で当社負担の場合は、独立した費用科目（発送費）で処理します。",
    mutate: (q) => {
      const goods = Randomizer.getAmount(80000, 0.2, 1000);
      const ship = 1500;
      q.text = `商品を売り上げ、代金 ${Randomizer.fmt(goods)}円 は掛けとした。なお、発送運賃 ${Randomizer.fmt(ship)}円 を現金で支払った（当社負担）。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: goods }, { accountName: "発送費", amount: ship }], credit: [{ accountName: "売上", amount: goods }, { accountName: "現金", amount: ship }] };
      q.explanationSteps = [{highlight:"発送運賃", entries:[{side:'debit',account:'発送費',amount:ship},{side:'credit',account:'現金',amount:ship}], comment:"売上時の運賃（当社負担）は「発送費」等の費用となります。"}];
      return q;
    }
  },
  // [Other Pay]
  {
    id: 'md_09', major: 'merchandise', sub: 'other_pay',
    text: "商品 30,000円 を売り上げ、代金はクレジットカード払い（信販会社への債権）となった。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 30000 }], credit: [{ accountName: "売上", amount: 30000 }] },
    choices: ["売掛金", "売上", "クレジット売掛金", "現金"],
    explanation: "3級範囲ではクレジット売掛金も「売掛金」で処理することが一般的です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(30000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金はクレジットカード払い（信販会社への債権）となった。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"クレジットカード払い", entries:[{side:'debit',account:'売掛金',amount:amt}], comment:"クレジット販売も「売掛金」（またはクレジット売掛金）で処理します。"}];
      return q;
    }
  },
  {
    id: 'md_10', major: 'merchandise', sub: 'other_pay',
    text: "商品 10,000円 を売り上げ、代金は共通商品券で受け取った。",
    correctEntries: { debit: [{ accountName: "商品券", amount: 10000 }], credit: [{ accountName: "売上", amount: 10000 }] },
    choices: ["商品券", "他店商品券", "売上", "現金"],
    explanation: "受け取った商品券は「商品券」または「他店商品券」勘定（資産）で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(10000, 0.5, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は共通商品券で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "商品券", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"商品券で受け取った", entries:[{side:'debit',account:'商品券',amount:amt}], comment:"すぐに現金化できないため「商品券」（資産）とします。"}];
      return q;
    }
  },

  // ==========================================
  // 3. NOTES
  // ==========================================
  // [Trade Notes]
  {
    id: 'nt_01', major: 'notes', sub: 'notes_trade',
    text: "買掛金 200,000円 の支払いとして、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 200000 }], credit: [{ accountName: "支払手形", amount: 200000 }] },
    choices: ["買掛金", "支払手形", "当座預金", "受取手形"],
    explanation: "約束手形を振り出すと、後で支払う義務が生じるため「支払手形」（負債）の増加です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.2, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いとして、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      q.explanationSteps = [{highlight:"約束手形を振り出した", entries:[{side:'debit',account:'買掛金',amount:amt}, {side:'credit',account:'支払手形',amount:amt}], comment:"買掛金（債務）が支払手形（債務）に振り替わります。"}];
      return q;
    }
  },
  {
    id: 'nt_02', major: 'notes', sub: 'notes_trade',
    text: "売掛金 300,000円 の回収として、得意先振出しの約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 300000 }], credit: [{ accountName: "売掛金", amount: 300000 }] },
    choices: ["受取手形", "売掛金", "支払手形", "現金"],
    explanation: "約束手形を受け取ると、代金を受け取る権利が生じるため「受取手形」（資産）の増加です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.2, 1000);
      q.text = `売掛金 ${Randomizer.fmt(amt)}円 の回収として、得意先振出しの約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "受取手形", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      q.explanationSteps = [{highlight:"約束手形を受け取った", entries:[{side:'debit',account:'受取手形',amount:amt}, {side:'credit',account:'売掛金',amount:amt}], comment:"売掛金（債権）が受取手形（債権）に振り替わります。"}];
      return q;
    }
  },
  {
    id: 'nt_03', major: 'notes', sub: 'notes_trade',
    text: "商品 400,000円 を仕入れ、代金は約束手形を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 400000 }], credit: [{ accountName: "支払手形", amount: 400000 }] },
    choices: ["仕入", "支払手形", "買掛金", "当座預金"],
    explanation: "仕入と同時に手形を振り出した場合です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(400000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は約束手形を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      q.explanationSteps = [{highlight:"手形を振り出して", entries:[{side:'credit',account:'支払手形',amount:amt}], comment:"直接、支払手形を計上します。"}];
      return q;
    }
  },
  // [Loan Notes]
  {
    id: 'nt_04', major: 'notes', sub: 'loan_notes',
    text: "銀行より現金 1,000,000円 を借り入れ、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 1000000 }], credit: [{ accountName: "手形借入金", amount: 1000000 }] },
    choices: ["現金", "手形借入金", "支払手形", "借入金"],
    explanation: "金を借りるために手形を振り出した場合は「手形借入金」（または借入金）を使います。商品売買の「支払手形」と区別します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000000, 0.1, 10000);
      q.text = `銀行より現金 ${Randomizer.fmt(amt)}円 を借り入れ、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "手形借入金", amount: amt }] };
      q.explanationSteps = [{highlight:"借り入れ...手形を振り出した", entries:[{side:'credit',account:'手形借入金',amount:amt}], comment:"営業外の手形振出しは「手形借入金」です。"}];
      return q;
    }
  },
  {
    id: 'nt_05', major: 'notes', sub: 'loan_notes',
    text: "取引先に現金 500,000円 を貸し付け、同額の約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "手形貸付金", amount: 500000 }], credit: [{ accountName: "現金", amount: 500000 }] },
    choices: ["手形貸付金", "現金", "受取手形", "貸付金"],
    explanation: "金を貸して手形を受け取った場合は「手形貸付金」です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(500000, 0.2, 1000);
      q.text = `取引先に現金 ${Randomizer.fmt(amt)}円 を貸し付け、同額の約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "手形貸付金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"貸し付け...手形を受け取った", entries:[{side:'debit',account:'手形貸付金',amount:amt}], comment:"営業外の手形受取りは「手形貸付金」です。"}];
      return q;
    }
  },

  // ==========================================
  // 4. ASSETS & EXPENSES
  // ==========================================
  // [Fixed Assets]
  {
    id: 'ae_01', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用のパソコン 150,000円 を購入し、代金は翌月払いとした。",
    correctEntries: { debit: [{ accountName: "備品", amount: 150000 }], credit: [{ accountName: "未払金", amount: 150000 }] },
    choices: ["備品", "未払金", "買掛金", "仕入"],
    explanation: "商品以外の物品購入（後払い）は「未払金」で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(150000, 0.2, 1000);
      q.text = `営業用のパソコン ${Randomizer.fmt(amt)}円 を購入し、代金は翌月払いとした。`;
      q.correctEntries = { debit: [{ accountName: "備品", amount: amt }], credit: [{ accountName: "未払金", amount: amt }] };
      q.explanationSteps = [{highlight:"パソコン", entries:[{side:'debit',account:'備品',amount:amt}], comment:"1年以上使用するものは「備品」です。"},{highlight:"翌月払い", entries:[{side:'credit',account:'未払金',amount:amt}], comment:"商品売買ではないので「未払金」です。"}];
      return q;
    }
  },
  {
    id: 'ae_02', major: 'assets_expenses', sub: 'fixed_assets',
    text: "土地 5,000,000円 を購入し、代金は小切手を振り出して支払った。仲介手数料 150,000円 も小切手で支払った。",
    correctEntries: { debit: [{ accountName: "土地", amount: 5150000 }], credit: [{ accountName: "当座預金", amount: 5150000 }] },
    choices: ["土地", "当座預金", "支払手数料", "建物"],
    explanation: "固定資産購入時の付随費用（手数料など）は、取得原価に含めます。",
    mutate: (q) => {
      const land = Randomizer.getAmount(5000000, 0.1, 100000);
      const fee = 150000;
      const total = land + fee;
      q.text = `土地 ${Randomizer.fmt(land)}円 を購入し、代金は小切手を振り出して支払った。仲介手数料 ${Randomizer.fmt(fee)}円 も小切手で支払った。`;
      q.correctEntries = { debit: [{ accountName: "土地", amount: total }], credit: [{ accountName: "当座預金", amount: total }] };
      q.explanationSteps = [{highlight:"仲介手数料", entries:[{side:'debit',account:'土地',amount:total}], comment:"手数料も「土地」の価格に含めます。"}];
      return q;
    }
  },
  // [Expenses]
  {
    id: 'ae_03', major: 'assets_expenses', sub: 'expenses',
    text: "固定資産税 50,000円 を現金で納付した。",
    correctEntries: { debit: [{ accountName: "租税公課", amount: 50000 }], credit: [{ accountName: "現金", amount: 50000 }] },
    choices: ["租税公課", "現金", "法人税等", "資本金"],
    explanation: "固定資産税や印紙代は「租税公課」（費用）で処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `固定資産税 ${Randomizer.fmt(amt)}円 を現金で納付した。`;
      q.correctEntries = { debit: [{ accountName: "租税公課", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"固定資産税", entries:[{side:'debit',account:'租税公課',amount:amt}]}];
      return q;
    }
  },
  {
    id: 'ae_04', major: 'assets_expenses', sub: 'expenses',
    text: "収入印紙 2,000円 と郵便切手 840円 を現金で購入し、ただちに使用した。",
    correctEntries: { debit: [{ accountName: "租税公課", amount: 2000 }, { accountName: "通信費", amount: 840 }], credit: [{ accountName: "現金", amount: 2840 }] },
    choices: ["租税公課", "通信費", "現金", "消耗品費"],
    explanation: "印紙は「租税公課」、切手は「通信費」です。",
    mutate: (q) => {
      const stamp = 2000;
      const post = 840;
      const total = stamp + post;
      q.text = `収入印紙 ${Randomizer.fmt(stamp)}円 と郵便切手 ${Randomizer.fmt(post)}円 を現金で購入し、ただちに使用した。`;
      q.correctEntries = { debit: [{ accountName: "租税公課", amount: stamp }, { accountName: "通信費", amount: post }], credit: [{ accountName: "現金", amount: total }] };
      q.explanationSteps = [{highlight:"収入印紙", entries:[{side:'debit',account:'租税公課',amount:stamp}]}, {highlight:"郵便切手", entries:[{side:'debit',account:'通信費',amount:post}]}];
      return q;
    }
  },
  {
    id: 'ae_05', major: 'assets_expenses', sub: 'expenses',
    text: "従業員の給料 250,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "給料", amount: 250000 }], credit: [{ accountName: "現金", amount: 250000 }] },
    choices: ["給料", "現金", "立替金", "未払金"],
    explanation: "労働の対価は「給料」（費用）です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(250000, 0.2, 1000);
      q.text = `従業員の給料 ${Randomizer.fmt(amt)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "給料", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"給料", entries:[{side:'debit',account:'給料',amount:amt}]}];
      return q;
    }
  },

  // ==========================================
  // 5. CLOSING
  // ==========================================
  // [Bad Debts]
  {
    id: 'cl_01', major: 'closing', sub: 'bad_debts',
    text: "決算につき、売掛金残高 2,000,000円 に対し 2% の貸倒引当金を設定する。残高は 15,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金繰入", amount: 25000 }], credit: [{ accountName: "貸倒引当金", amount: 25000 }] },
    choices: ["貸倒引当金繰入", "貸倒引当金", "売掛金", "貸倒損失"],
    explanation: "要設定額(40,000) - 残高(15,000) = 繰入額(25,000)。",
    mutate: (q) => {
      const receivables = Randomizer.getAmount(2000000, 0.1, 100000);
      const rate = 0.02; 
      const target = receivables * rate;
      const balance = Randomizer.getAmount(15000, 0.5, 1000);
      const entryAmt = target - balance; // Usually positive in this drill
      q.text = `決算につき、売掛金残高 ${Randomizer.fmt(receivables)}円 に対し 2% の貸倒引当金を設定する。残高は ${Randomizer.fmt(balance)}円 である（差額補充法）。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金繰入", amount: entryAmt }], credit: [{ accountName: "貸倒引当金", amount: entryAmt }] };
      q.explanationSteps = [{highlight:"貸倒引当金を設定", entries:[{side:'debit',account:'貸倒引当金繰入',amount:entryAmt},{side:'credit',account:'貸倒引当金',amount:entryAmt}], comment:`${Randomizer.fmt(receivables)}×2% - ${Randomizer.fmt(balance)} = ${Randomizer.fmt(entryAmt)}円を補充します。`}];
      return q;
    }
  },
  // [Depreciation]
  {
    id: 'cl_02', major: 'closing', sub: 'depreciation',
    text: "建物の減価償却を行う。取得原価 3,000,000円、残存価額ゼロ、耐用年数30年、定額法。記帳方法は直接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "建物", amount: 100000 }] },
    choices: ["減価償却費", "建物", "減価償却累計額"],
    explanation: "3,000,000 ÷ 30 = 100,000円。直接法なので「建物」を減らします。",
    mutate: (q) => {
      const cost = Randomizer.getAmount(3000000, 0.1, 100000);
      const years = 30;
      const dep = Math.round(cost / years);
      q.text = `建物の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は直接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "建物", amount: dep }] };
      q.explanationSteps = [{highlight:"減価償却", entries:[{side:'debit',account:'減価償却費',amount:dep},{side:'credit',account:'建物',amount:dep}], comment:"直接法なので資産科目を直接減らします。"}];
      return q;
    }
  },
  {
    id: 'cl_03', major: 'closing', sub: 'depreciation',
    text: "備品の減価償却を行う。取得原価 500,000円、残存価額ゼロ、耐用年数5年、定額法。記帳方法は間接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "減価償却累計額", amount: 100000 }] },
    choices: ["減価償却費", "減価償却累計額", "備品"],
    explanation: "間接法の場合、貸方は「減価償却累計額」を使用します。",
    mutate: (q) => {
      const cost = Randomizer.getAmount(500000, 0.2, 10000);
      const years = 5;
      const dep = Math.round(cost / years);
      q.text = `備品の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は間接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "減価償却累計額", amount: dep }] };
      q.explanationSteps = [{highlight:"間接法", entries:[{side:'credit',account:'減価償却累計額',amount:dep}], comment:"間接法なので累計額勘定を使います。"}];
      return q;
    }
  },
  // [Inventory]
  {
    id: 'cl_04', major: 'closing', sub: 'inventory',
    text: "決算整理を行う。期首商品棚卸高 50,000円、期末商品棚卸高 60,000円 であった。売上原価は「仕入」の行で計算する。",
    correctEntries: { 
      debit: [{ accountName: "仕入", amount: 50000 }, { accountName: "繰越商品", amount: 60000 }], 
      credit: [{ accountName: "繰越商品", amount: 50000 }, { accountName: "仕入", amount: 60000 }] 
    },
    choices: ["仕入", "繰越商品", "売上", "棚卸減耗費"],
    explanation: "「し・くり・くり・し」（仕入/繰商、繰商/仕入）の仕訳です。",
    mutate: (q) => {
      const start = Randomizer.getAmount(50000, 0.2, 1000);
      const end = Randomizer.getAmount(60000, 0.2, 1000);
      q.text = `決算整理を行う。期首商品棚卸高 ${Randomizer.fmt(start)}円、期末商品棚卸高 ${Randomizer.fmt(end)}円 であった。売上原価は「仕入」の行で計算する。`;
      q.correctEntries = { 
        debit: [{ accountName: "仕入", amount: start }, { accountName: "繰越商品", amount: end }], 
        credit: [{ accountName: "繰越商品", amount: start }, { accountName: "仕入", amount: end }] 
      };
      q.explanationSteps = [
        {highlight:"期首商品", entries:[{side:'debit',account:'仕入',amount:start},{side:'credit',account:'繰越商品',amount:start}], comment:"期首在庫を仕入に振り替えます。"},
        {highlight:"期末商品", entries:[{side:'debit',account:'繰越商品',amount:end},{side:'credit',account:'仕入',amount:end}], comment:"期末在庫を仕入から控除します。"}
      ];
      return q;
    }
  },
  // [Deferral/Accrual]
  {
    id: 'cl_05', major: 'closing', sub: 'deferral_accrual',
    text: "家賃の未払分 30,000円 を計上する。",
    correctEntries: { debit: [{ accountName: "支払家賃", amount: 30000 }], credit: [{ accountName: "未払家賃", amount: 30000 }] },
    choices: ["支払家賃", "未払家賃", "未払金", "現金"],
    explanation: "費用の見越し計上です。当期の費用として加算し、未払家賃（負債）を立てます。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(30000, 0.2, 1000);
      q.text = `家賃の未払分 ${Randomizer.fmt(amt)}円 を計上する。`;
      q.correctEntries = { debit: [{ accountName: "支払家賃", amount: amt }], credit: [{ accountName: "未払家賃", amount: amt }] };
      q.explanationSteps = [{highlight:"未払分", entries:[{side:'debit',account:'支払家賃',amount:amt},{side:'credit',account:'未払家賃',amount:amt}], comment:"サービスの提供を受けているが未払いの分を計上します。"}];
      return q;
    }
  },
  {
    id: 'cl_06', major: 'closing', sub: 'deferral_accrual',
    text: "地代の前払分 10,000円 を繰り延べる。",
    correctEntries: { debit: [{ accountName: "前払地代", amount: 10000 }], credit: [{ accountName: "支払地代", amount: 10000 }] },
    choices: ["前払地代", "支払地代", "前払金", "現金"],
    explanation: "費用の繰延べです。次期以降の分を費用からマイナスし、前払地代（資産）とします。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(10000, 0.2, 1000);
      q.text = `地代の前払分 ${Randomizer.fmt(amt)}円 を繰り延べる。`;
      q.correctEntries = { debit: [{ accountName: "前払地代", amount: amt }], credit: [{ accountName: "支払地代", amount: amt }] };
      q.explanationSteps = [{highlight:"前払分", entries:[{side:'debit',account:'前払地代',amount:amt},{side:'credit',account:'支払地代',amount:amt}], comment:"来期分の費用を当期の費用から除外します。"}];
      return q;
    }
  },
  {
    id: 'cl_07', major: 'closing', sub: 'deferral_accrual',
    text: "受取利息の未収分 500円 を計上する。",
    correctEntries: { debit: [{ accountName: "未収利息", amount: 500 }], credit: [{ accountName: "受取利息", amount: 500 }] },
    choices: ["未収利息", "受取利息", "未収金", "現金"],
    explanation: "収益の見越しです。当期の収益として加算し、未収利息（資産）を立てます。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(500, 0.5, 100);
      q.text = `受取利息の未収分 ${Randomizer.fmt(amt)}円 を計上する。`;
      q.correctEntries = { debit: [{ accountName: "未収利息", amount: amt }], credit: [{ accountName: "受取利息", amount: amt }] };
      q.explanationSteps = [{highlight:"未収分", entries:[{side:'debit',account:'未収利息',amount:amt},{side:'credit',account:'受取利息',amount:amt}], comment:"期間経過分の利息を収益計上します。"}];
      return q;
    }
  },
  {
    id: 'cl_08', major: 'closing', sub: 'deferral_accrual',
    text: "受取家賃の前受分 20,000円 を繰り延べる。",
    correctEntries: { debit: [{ accountName: "受取家賃", amount: 20000 }], credit: [{ accountName: "前受家賃", amount: 20000 }] },
    choices: ["受取家賃", "前受家賃", "前受金", "現金"],
    explanation: "収益の繰延べです。次期分を収益からマイナスし、前受家賃（負債）とします。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(20000, 0.2, 1000);
      q.text = `受取家賃の前受分 ${Randomizer.fmt(amt)}円 を繰り延べる。`;
      q.correctEntries = { debit: [{ accountName: "受取家賃", amount: amt }], credit: [{ accountName: "前受家賃", amount: amt }] };
      q.explanationSteps = [{highlight:"前受分", entries:[{side:'debit',account:'受取家賃',amount:amt},{side:'credit',account:'前受家賃',amount:amt}], comment:"来期分の家賃を当期の収益から除外します。"}];
      return q;
    }
  }
];
