
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Data Module
 */

// --- Helpers for Randomization ---
// This needs to be available globally for the QUESTIONS mutate functions.
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
  { id: 1, name: "現金", rarity: 1, icon: "💰", desc: "通貨（硬貨・紙幣）および、通貨代用証券（他人振出小切手、送金小切手など）。簿記上の「現金」は範囲が広いのが特徴。" },
  { id: 2, name: "小切手", rarity: 1, icon: "🎫", desc: "銀行に支払いを委託する証券。受け取った場合は直ちに現金化できるため「現金」、振り出した場合は「当座預金」の減少となる。" },
  { id: 3, name: "当座預金", rarity: 1, icon: "🏦", desc: "小切手の支払いに充てられる無利息の預金。企業活動の決済に必須の口座。" },
  { id: 4, name: "商品", rarity: 1, icon: "📦", desc: "販売目的で所有する物品。期末に残った在庫は棚卸資産として計上される。" },
  { id: 5, name: "仕入", rarity: 1, icon: "🚚", desc: "商品を調達する費用。三分法では、期中取引はすべて「仕入」勘定で処理する。" },
  { id: 6, name: "売上", rarity: 1, icon: "🏷️", desc: "商品販売など、主たる営業活動から得られる収益。企業の稼ぐ力を示す重要指標。" },
  { id: 7, name: "通信費", rarity: 1, icon: "📮", desc: "電話代、インターネット料金、切手、ハガキ代など。連絡にかかる費用。" },
  { id: 8, name: "消耗品費", rarity: 1, icon: "✏️", desc: "事務用品や文房具など、短期間で消費される物品の購入費用。" },
  { id: 9, name: "旅費交通費", rarity: 1, icon: "🚕", desc: "電車、バス、タクシー代や宿泊費など。出張にかかる費用も含まれる。" },
  { id: 10, name: "借入金", rarity: 1, icon: "💸", desc: "金銭消費貸借契約に基づき借り入れたお金。返済義務がある負債。" },
  { id: 11, name: "貸付金", rarity: 1, icon: "🤝", desc: "金銭を貸し付けた場合に生じる債権。後で利息と共に返済してもらう権利。" },
  { id: 12, name: "受取手形", rarity: 1, icon: "📜", desc: "商品代金などの受取として受け取った約束手形。期日に現金を受け取る権利。" },
  { id: 13, name: "支払手形", rarity: 1, icon: "✍️", desc: "代金支払いのために振り出した約束手形。期日に現金を支払う義務。" },
  { id: 14, name: "売掛金", rarity: 1, icon: "📓", desc: "商品の掛け売りによって生じた、代金を後で受け取る権利（債権）。" },
  { id: 15, name: "買掛金", rarity: 1, icon: "🧾", desc: "商品の掛け仕入れによって生じた、代金を後で支払う義務（債務）。" },
  
  // Rare (10)
  { id: 16, name: "引出金", rarity: 2, icon: "👜", desc: "個人商店主が店のお金を私用で使った場合に用いる勘定。資本金のマイナス勘定。" },
  { id: 17, name: "租税公課", rarity: 2, icon: "🏛️", desc: "固定資産税、印紙税、自動車税などの税金や、商工会議所会費などの公的な負担金。" },
  { id: 18, name: "商品券", rarity: 2, icon: "🎁", desc: "自治体やデパートなどが発行する金券。他店商品券を受け取った場合は資産計上する。" },
  { id: 19, name: "前払金", rarity: 2, icon: "🔜", desc: "商品購入の手付金として、商品を受け取る前に支払った代金。内金ともいう。" },
  { id: 20, name: "前受金", rarity: 2, icon: "🔙", desc: "注文を受けた際に、商品を引き渡す前に受け取った手付金。" },
  { id: 21, name: "未払金", rarity: 2, icon: "🛒", desc: "商品以外の物品（備品など）を購入し、代金が後払いの場合に用いる負債勘定。" },
  { id: 22, name: "備品", rarity: 2, icon: "💻", desc: "パソコン、机、棚など、1年以上使用する目的で購入した資産。" },
  { id: 23, name: "車両運搬具", rarity: 2, icon: "🚛", desc: "営業用のトラック、社用車、フォークリフトなどの陸上運搬具。" },
  { id: 24, name: "貸倒引当金", rarity: 2, icon: "🛡️", desc: "将来の貸倒れ（回収不能）に備えて、あらかじめ見積もって計上するマイナス資産。" },
  { id: 25, name: "減価償却費", rarity: 2, icon: "📉", desc: "固定資産の使用や時の経過による価値の減少分を、各会計期間に配分する費用。" },

  // Super Rare (5)
  { id: 26, name: "資本金", rarity: 3, icon: "👑", desc: "開業時に店主が元手として出した財産。事業の元手となる純資産。" },
  { id: 27, name: "土地", rarity: 3, icon: "🏰", desc: "店舗や事務所の敷地。減価償却を行わない（価値が減少しない）固定資産。" },
  { id: 28, name: "建物", rarity: 3, icon: "🏢", desc: "店舗、事務所、倉庫などの建物。減価償却の対象となる。" },
  { id: 29, name: "損益", rarity: 3, icon: "⚖️", desc: "決算時に収益と費用の諸勘定を集計するために設ける集合勘定。" },
  { id: 30, name: "純利益", rarity: 3, icon: "💎", desc: "一会計期間のすべての収益から費用を差し引いた残額。お店の正味の儲け。" }
];

// --- Genre Configuration ---
const GENRE_STRUCTURE = [
  {
    id: 'cash_savings',
    title: '💰 現金・預金',
    subs: [
      { id: 'cash', title: '現金' },
      { id: 'checking', title: '当座預金・当座借越' },
      { id: 'petty_cash', title: '小口現金' },
      { id: 'over_short', title: '現金過不足' }
    ]
  },
  {
    id: 'merchandise',
    title: '📦 商品売買',
    subs: [
      { id: 'purchase_sales', title: '仕入・売上 (掛・返品)' },
      { id: 'credit_gift', title: 'クレジット・商品券' },
      { id: 'advance', title: '前受金・前払金' },
      { id: 'shipping', title: '諸掛り (発送費など)' }
    ]
  },
  {
    id: 'notes',
    title: '💴 手形・貸借',
    subs: [
      { id: 'promissory', title: '約束手形' },
      { id: 'loan', title: '貸付金・借入金' }
    ]
  },
  {
    id: 'assets_expenses',
    title: '🏢 固定資産・経費',
    subs: [
      { id: 'fixed_assets', title: '固定資産・未払金' },
      { id: 'expenses_taxes', title: '経費・税金' }
    ]
  },
  {
    id: 'closing',
    title: '📊 決算整理',
    subs: [
      { id: 'bad_debts', title: '貸倒引当金' },
      { id: 'depreciation', title: '減価償却' },
      { id: 'accruals', title: '見越・繰延・消耗品' }
    ]
  }
];

// --- Data: Questions ---
// Expanded to ensure all categories have content.
const QUESTIONS = [
  // --- Cash & Savings (cash_savings) ---
  // Sub: Cash
  {
    id: 'cs_01', major: 'cash_savings', sub: 'cash',
    text: "現金 2,500,000円 を元入れして営業を開始した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 2500000 }], credit: [{ accountName: "資本金", amount: 2500000 }] },
    choices: ["現金", "資本金", "借入金", "当座預金", "備品"],
    explanation: "【開業】元手は「資本金」として処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(2500000, 0.4, 10000);
      const sAmt = Randomizer.fmt(amt);
      q.text = `現金 ${sAmt}円 を元入れして営業を開始した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "資本金", amount: amt }] };
      q.explanationSteps = [
        { highlight: `現金 ${sAmt}円`, entries: [{ side: 'debit', account: '現金', amount: amt }], comment: "資産の増加" },
        { highlight: "元入れして", entries: [{ side: 'credit', account: '資本金', amount: amt }], comment: "資本の増加" }
      ];
      return q;
    }
  },
  // Sub: Checking
  {
    id: 'cs_02', major: 'cash_savings', sub: 'checking',
    text: "現金 500,000円 を当座預金に預け入れた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 500000 }], credit: [{ accountName: "現金", amount: 500000 }] },
    choices: ["現金", "当座預金", "資本金", "借入金"],
    explanation: "手元の現金を銀行の当座口座に入金しました。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(500000, 0.5, 1000);
      q.text = `現金 ${Randomizer.fmt(amt)}円 を当座預金に預け入れた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [
         { highlight: `当座預金に預け入れた`, entries: [{ side: 'debit', account: '当座預金', amount: amt }], comment: "当座預金（資産）が増えます。" },
         { highlight: `現金 ${Randomizer.fmt(amt)}円`, entries: [{ side: 'credit', account: '現金', amount: amt }], comment: "手元の現金（資産）が減ります。" }
      ];
      return q;
    }
  },
  // Sub: Petty Cash
  {
    id: 'cs_03', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係より、通信費 5,000円、消耗品費 3,000円 の支払報告を受けたため、ただちに小切手を振り出して補給した。",
    correctEntries: { 
      debit: [{ accountName: "通信費", amount: 5000 }, { accountName: "消耗品費", amount: 3000 }], 
      credit: [{ accountName: "当座預金", amount: 8000 }] 
    },
    choices: ["通信費", "消耗品費", "小口現金", "当座預金", "現金"],
    explanation: "小口現金の補給取引です。支払報告時に費用を計上し、同額を補給します。",
    mutate: (q) => {
      const v1 = Randomizer.getAmount(5000, 0.2, 100);
      const v2 = Randomizer.getAmount(3000, 0.2, 100);
      const total = v1 + v2;
      q.text = `小口係より、通信費 ${Randomizer.fmt(v1)}円、消耗品費 ${Randomizer.fmt(v2)}円 の支払報告を受けたため、ただちに小切手を振り出して補給した。`;
      q.correctEntries = { 
        debit: [{ accountName: "通信費", amount: v1 }, { accountName: "消耗品費", amount: v2 }], 
        credit: [{ accountName: "当座預金", amount: total }] 
      };
      q.explanationSteps = [
         { highlight: `支払報告を受けた`, entries: [{ side: 'debit', account: '通信費', amount: v1 }, { side: 'debit', account: '消耗品費', amount: v2 }], comment: "使った分の費用を計上します。" },
         { highlight: `小切手を振り出して補給`, entries: [{ side: 'credit', account: '当座預金', amount: total }], comment: "使った分だけ当座預金から補給します。" }
      ];
      return q;
    }
  },
  // Sub: Over Short
  {
    id: 'cs_04', major: 'cash_savings', sub: 'over_short',
    text: "現金の実際有高を調べたところ 45,000円 であり、帳簿残高 46,000円 と不一致であった。原因は不明のため、現金過不足として処理する。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 1000 }], credit: [{ accountName: "現金", amount: 1000 }] },
    choices: ["現金", "現金過不足", "雑損", "雑益"],
    explanation: "実際 < 帳簿 のため、現金を減らして実際有高に合わせます。",
    mutate: (q) => {
      const book = Randomizer.getAmount(50000, 0.1, 1000);
      const diff = 1000;
      const actual = book - diff;
      q.text = `現金の実際有高を調べたところ ${Randomizer.fmt(actual)}円 であり、帳簿残高 ${Randomizer.fmt(book)}円 と不一致であった。原因は不明のため、現金過不足として処理する。`;
      q.correctEntries = { debit: [{ accountName: "現金過不足", amount: diff }], credit: [{ accountName: "現金", amount: diff }] };
      q.explanationSteps = [
         { highlight: "不一致であった", entries: [{ side: 'debit', account: '現金過不足', amount: diff }, { side: 'credit', account: '現金', amount: diff }], comment: "帳簿を実際に合わせるため、現金を減らします。" }
      ];
      return q;
    }
  },

  // --- Merchandise (merchandise) ---
  // Sub: Purchase/Sales
  {
    id: 'md_01', major: 'merchandise', sub: 'purchase_sales',
    text: "商品 300,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 300000 }], credit: [{ accountName: "買掛金", amount: 300000 }] },
    choices: ["仕入", "買掛金", "現金", "当座預金", "売掛金"],
    explanation: "掛けで仕入れた場合、「買掛金」の増加（負債）として処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.3, 10000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "買掛金", amount: amt }] };
      q.explanationSteps = [
        { highlight: `商品 ${Randomizer.fmt(amt)}円 を仕入れ`, entries: [{ side: 'debit', account: '仕入', amount: amt }], comment: "費用の発生です。" },
        { highlight: "代金は掛け", entries: [{ side: 'credit', account: '買掛金', amount: amt }], comment: "後で支払う義務（負債）が増えます。" }
      ];
      return q;
    }
  },
  {
    id: 'md_02', major: 'merchandise', sub: 'purchase_sales',
    text: "商品 450,000円 を売り上げ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 450000 }], credit: [{ accountName: "売上", amount: 450000 }] },
    choices: ["売上", "売掛金", "現金", "仕入", "買掛金"],
    explanation: "掛けで売り上げた場合、「売掛金」の増加（資産）として処理します。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(450000, 0.3, 10000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [
        { highlight: `商品 ${Randomizer.fmt(amt)}円 を売り上げ`, entries: [{ side: 'credit', account: '売上', amount: amt }], comment: "収益の発生です。" },
        { highlight: "代金は掛け", entries: [{ side: 'debit', account: '売掛金', amount: amt }], comment: "後で代金を受け取る権利（資産）が増えます。" }
      ];
      return q;
    }
  },
  // Sub: Credit/Gift
  {
    id: 'md_03', major: 'merchandise', sub: 'credit_gift',
    text: "商品 60,000円 を売り上げ、代金はクレジット払いの指定を受けた。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 60000 }], credit: [{ accountName: "売上", amount: 60000 }] },
    choices: ["売掛金", "売上", "現金", "クレジット売掛金"],
    explanation: "3級ではクレジット払いも「売掛金」または「クレジット売掛金」で処理しますが、ここでは「売掛金」として扱います。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(60000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金はクレジット払いの指定を受けた。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{ highlight: "クレジット払い", entries: [{ side: 'debit', account: '売掛金', amount: amt }, { side: 'credit', account: '売上', amount: amt }], comment: "クレジット売上は、通常「売掛金」または「クレジット売掛金」とします。" }];
      return q;
    }
  },
  // Sub: Advance
  {
    id: 'md_04', major: 'merchandise', sub: 'advance',
    text: "商品 200,000円 を注文し、内金として 40,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 40000 }], credit: [{ accountName: "現金", amount: 40000 }] },
    choices: ["仕入", "前払金", "現金", "買掛金"],
    explanation: "商品の引渡し前に支払った内金は「前払金」（資産）です。",
    mutate: (q) => {
      const total = Randomizer.getAmount(200000, 0.2, 10000);
      const adv = Randomizer.round(total * 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(total)}円 を注文し、内金として ${Randomizer.fmt(adv)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "前払金", amount: adv }], credit: [{ accountName: "現金", amount: adv }] };
      q.explanationSteps = [{ highlight: "内金として", entries: [{ side: 'debit', account: '前払金', amount: adv }, { side: 'credit', account: '現金', amount: adv }], comment: "まだ商品は届いていないため「仕入」ではなく「前払金」とします。" }];
      return q;
    }
  },
  // Sub: Shipping
  {
    id: 'md_05', major: 'merchandise', sub: 'shipping',
    text: "商品 100,000円 を仕入れ、代金は掛けとした。なお、引取運賃 2,000円 は現金で支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 102000 }], credit: [{ accountName: "買掛金", amount: 100000 }, { accountName: "現金", amount: 2000 }] },
    choices: ["仕入", "買掛金", "現金", "発送費"],
    explanation: "仕入時の諸掛り（引取運賃）は、仕入原価に含めます。",
    mutate: (q) => {
      const goods = Randomizer.getAmount(100000, 0.2, 1000);
      const ship = 2000;
      const total = goods + ship;
      q.text = `商品 ${Randomizer.fmt(goods)}円 を仕入れ、代金は掛けとした。なお、引取運賃 ${Randomizer.fmt(ship)}円 は現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "買掛金", amount: goods }, { accountName: "現金", amount: ship }] };
      q.explanationSteps = [
        { highlight: `引取運賃 ${Randomizer.fmt(ship)}円`, entries: [{ side: 'debit', account: '仕入', amount: total }], comment: "仕入にかかった費用は「仕入」に合算します。" },
        { highlight: "支払った", entries: [{ side: 'credit', account: '買掛金', amount: goods }, { side: 'credit', account: '現金', amount: ship }], comment: "商品代金は掛け、運賃は現金です。" }
      ];
      return q;
    }
  },

  // --- Notes (notes) ---
  // Sub: Promissory
  {
    id: 'nt_01', major: 'notes', sub: 'promissory',
    text: "買掛金 150,000円 の支払いとして、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 150000 }], credit: [{ accountName: "支払手形", amount: 150000 }] },
    choices: ["買掛金", "支払手形", "受取手形", "当座預金"],
    explanation: "手形を振り出して債務を支払ったため、「支払手形」（負債）の増加となります。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(150000, 0.3, 10000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いとして、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      q.explanationSteps = [{ highlight: "約束手形を振り出し", entries: [{ side: 'debit', account: '買掛金', amount: amt }, { side: 'credit', account: '支払手形', amount: amt }], comment: "買掛金が減少し、支払手形という別の負債に変わります。" }];
      return q;
    }
  },
  // Sub: Loan
  {
    id: 'nt_02', major: 'notes', sub: 'loan',
    text: "銀行より現金 1,000,000円 を借り入れ、利息 10,000円 を差し引かれた残額が当座預金に振り込まれた。",
    correctEntries: { 
      debit: [{ accountName: "当座預金", amount: 990000 }, { accountName: "支払利息", amount: 10000 }], 
      credit: [{ accountName: "借入金", amount: 1000000 }] 
    },
    choices: ["当座預金", "借入金", "支払利息", "現金"],
    explanation: "借入額全額を「借入金」とし、天引きされた利息は「支払利息」として処理します。",
    mutate: (q) => {
      const loan = Randomizer.getAmount(1000000, 0.1, 100000);
      const interest = Randomizer.round(loan * 0.02, 100);
      const net = loan - interest;
      q.text = `銀行より現金 ${Randomizer.fmt(loan)}円 を借り入れ、利息 ${Randomizer.fmt(interest)}円 を差し引かれた残額が当座預金に振り込まれた。`;
      q.correctEntries = { 
        debit: [{ accountName: "当座預金", amount: net }, { accountName: "支払利息", amount: interest }], 
        credit: [{ accountName: "借入金", amount: loan }] 
      };
      q.explanationSteps = [
        { highlight: "借り入れ", entries: [{ side: 'credit', account: '借入金', amount: loan }], comment: "負債の増加です。" },
        { highlight: "利息を差し引かれ", entries: [{ side: 'debit', account: '支払利息', amount: interest }], comment: "費用の発生です。" },
        { highlight: "残額が当座預金", entries: [{ side: 'debit', account: '当座預金', amount: net }], comment: "差額が入金されます。" }
      ];
      return q;
    }
  },

  // --- Assets & Expenses (assets_expenses) ---
  // Sub: Fixed Assets
  {
    id: 'ae_01', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用車両 1,500,000円 を購入し、代金は来月末払いとした。",
    correctEntries: { debit: [{ accountName: "車両運搬具", amount: 1500000 }], credit: [{ accountName: "未払金", amount: 1500000 }] },
    choices: ["車両運搬具", "未払金", "買掛金", "備品"],
    explanation: "商品以外の購入で代金後払いの場合は「未払金」を使用します。「買掛金」ではありません。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(1500000, 0.2, 100000);
      q.text = `営業用車両 ${Randomizer.fmt(amt)}円 を購入し、代金は来月末払いとした。`;
      q.correctEntries = { debit: [{ accountName: "車両運搬具", amount: amt }], credit: [{ accountName: "未払金", amount: amt }] };
      q.explanationSteps = [
        { highlight: "車両", entries: [{ side: 'debit', account: '車両運搬具', amount: amt }], comment: "固定資産の増加。" },
        { highlight: "来月末払い", entries: [{ side: 'credit', account: '未払金', amount: amt }], comment: "商品ではないので「未払金」です。" }
      ];
      return q;
    }
  },
  // Sub: Expenses
  {
    id: 'ae_02', major: 'assets_expenses', sub: 'expenses_taxes',
    text: "家賃 120,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "支払家賃", amount: 120000 }], credit: [{ accountName: "現金", amount: 120000 }] },
    choices: ["支払家賃", "現金", "地代家賃", "当座預金"],
    explanation: "費用の発生です。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(120000, 0.2, 1000);
      q.text = `家賃 ${Randomizer.fmt(amt)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "支払家賃", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{ highlight: "家賃", entries: [{ side: 'debit', account: '支払家賃', amount: amt }, { side: 'credit', account: '現金', amount: amt }], comment: "費用の支払いです。" }];
      return q;
    }
  },

  // --- Closing (closing) ---
  // Sub: Bad Debts
  {
    id: 'cl_01', major: 'closing', sub: 'bad_debts',
    text: "決算にあたり、売掛金の期末残高 2,000,000円 に対して 2% の貸倒引当金を設定する。なお、貸倒引当金の残高は 15,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金繰入", amount: 25000 }], credit: [{ accountName: "貸倒引当金", amount: 25000 }] },
    choices: ["貸倒引当金繰入", "貸倒引当金", "売掛金", "貸倒損失"],
    explanation: "目標額 (2,000,000 × 2% = 40,000) - 残高 (15,000) = 繰入額 (25,000)",
    mutate: (q) => {
      const receivables = Randomizer.getAmount(2000000, 0.1, 100000);
      const rate = 0.02; // Fixed 2% for simplicity
      const target = receivables * rate;
      const balance = Randomizer.getAmount(15000, 0.5, 1000);
      const entryAmt = target - balance; // Assuming positive
      
      q.text = `決算にあたり、売掛金の期末残高 ${Randomizer.fmt(receivables)}円 に対して 2% の貸倒引当金を設定する。なお、貸倒引当金の残高は ${Randomizer.fmt(balance)}円 である（差額補充法）。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金繰入", amount: entryAmt }], credit: [{ accountName: "貸倒引当金", amount: entryAmt }] };
      q.explanationSteps = [
        { highlight: "2% の貸倒引当金を設定", entries: [], comment: `目標額: ${Randomizer.fmt(receivables)} × 2% = ${Randomizer.fmt(target)}円` },
        { highlight: "残高", entries: [{ side: 'debit', account: '貸倒引当金繰入', amount: entryAmt }, { side: 'credit', account: '貸倒引当金', amount: entryAmt }], comment: `不足分 (${Randomizer.fmt(target)} - ${Randomizer.fmt(balance)}) を繰り入れます。` }
      ];
      return q;
    }
  },
  // Sub: Depreciation
  {
    id: 'cl_02', major: 'closing', sub: 'depreciation',
    text: "決算にあたり、備品（取得原価 500,000円、残存価額ゼロ、耐用年数5年）の減価償却を行う（定額法、直接法）。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "備品", amount: 100000 }] },
    choices: ["減価償却費", "備品", "減価償却累計額"],
    explanation: "500,000 ÷ 5年 = 100,000円。直接法なので貸方は「備品」を減らします。",
    mutate: (q) => {
      const cost = Randomizer.getAmount(500000, 0.2, 10000);
      const years = 5;
      const dep = cost / years;
      q.text = `決算にあたり、備品（取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年）の減価償却を行う（定額法、直接法）。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "備品", amount: dep }] };
      q.explanationSteps = [{ highlight: "減価償却", entries: [{ side: 'debit', account: '減価償却費', amount: dep }, { side: 'credit', account: '備品', amount: dep }], comment: `${Randomizer.fmt(cost)} ÷ ${years} = ${Randomizer.fmt(dep)}円` }];
      return q;
    }
  },
  // Sub: Accruals (from previous)
  {
    id: 'cl_03', major: 'closing', sub: 'accruals',
    text: "今月分の水道光熱費 15,000円 が未払いであり、これを計上する。",
    correctEntries: { debit: [{ accountName: "水道光熱費", amount: 15000 }], credit: [{ accountName: "未払金", amount: 15000 }] },
    choices: ["水道光熱費", "未払金", "未払費用", "現金", "当座預金"],
    explanation: "継続的なサービス契約に基づく未払費用ですが、3級では「未払金」または「未払費用」として処理されることがあります。ここでは一般的な未払金として扱います。",
    mutate: (q) => {
      const amt = Randomizer.getAmount(15000, 0.4, 1000);
      q.text = `今月分の水道光熱費 ${Randomizer.fmt(amt)}円 が未払いであり、これを計上する。`;
      q.correctEntries = { debit: [{ accountName: "水道光熱費", amount: amt }], credit: [{ accountName: "未払金", amount: amt }] };
      q.explanationSteps = [
        { highlight: `水道光熱費 ${Randomizer.fmt(amt)}円`, entries: [{ side: 'debit', account: '水道光熱費', amount: amt }], comment: "費用を計上します。" },
        { highlight: "未払いであり", entries: [{ side: 'credit', account: '未払金', amount: amt }], comment: "まだ払っていないので未払金です。" }
      ];
      return q;
    }
  }
];
