

/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Logic Controller - V9.2 (Full Question Data)
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
  console.log("App Initializing V9.2...");
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

  // Bonus Game
  document.getElementById('anim-claim-btn').addEventListener('click', () => {
    const scorePct = state.sessionStats.total > 0 ? (state.sessionStats.correct / state.sessionStats.total) : 0;
    drawGachaItem(scorePct);
  });
  document.getElementById('gacha-close-btn').addEventListener('click', () => {
    document.getElementById('gacha-result-modal').classList.add('hidden');
    document.getElementById('gacha-result-modal').classList.remove('opacity-100');
    document.getElementById('gacha-result-modal').classList.add('opacity-0');
    
    document.getElementById('animation-screen').classList.add('hidden');
    showHomeScreen();
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
        // If not enough questions, repeat them to reach 5
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
  document.getElementById('animation-screen').classList.add('hidden');
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

// --- Game End & Animation Logic ---
function finishSession() {
  if (state.currentGenreId && state.currentMode !== 'comprehensive') {
    userStats.categoryScores[state.currentGenreId] = { correct: state.sessionStats.correct, total: state.sessionStats.total };
    saveStats();
  }
  playEndGameAnimation(state.sessionStats.correct, state.sessionStats.total);
}

function playEndGameAnimation(score, total) {
  const screen = document.getElementById('animation-screen');
  const batter = document.getElementById('anim-batter');
  const ball = document.getElementById('anim-ball');
  const distEl = document.getElementById('anim-distance');
  const msgEl = document.getElementById('anim-message');
  const btnArea = document.getElementById('anim-result-btn-area');

  // Reset
  screen.classList.remove('hidden');
  batter.classList.remove('swing-anim');
  ball.classList.remove('ball-fly');
  ball.classList.add('hidden');
  msgEl.classList.add('hidden');
  btnArea.classList.add('hidden');
  distEl.textContent = '0';

  const percentage = total > 0 ? (score / total) : 0;
  // Calculate distance based on performance
  let distance = 0;
  if (percentage === 1.0) distance = 130 + Math.floor(Math.random() * 20); // 130-150m
  else if (percentage >= 0.8) distance = 100 + Math.floor(Math.random() * 20); // 100-120m
  else if (percentage >= 0.4) distance = 50 + Math.floor(Math.random() * 40); // 50-90m
  else distance = Math.floor(Math.random() * 20); // 0-20m

  setTimeout(() => {
    // 1. Swing
    batter.classList.add('swing-anim');
    
    // 2. Ball Fly (Wait for contact point approx 150ms)
    setTimeout(() => {
      ball.classList.remove('hidden');
      ball.classList.add('ball-fly');
      
      // 3. Count distance
      let currentDist = 0;
      const duration = 2000; 
      const stepTime = 20;
      const steps = duration / stepTime;
      const inc = distance / steps;
      
      const counterId = setInterval(() => {
        currentDist += inc;
        if (currentDist >= distance) {
          currentDist = distance;
          clearInterval(counterId);
          // 4. Finish
          if (distance >= 100) {
             msgEl.classList.remove('hidden');
          }
          btnArea.classList.remove('hidden');
        }
        distEl.textContent = Math.floor(currentDist);
      }, stepTime);
    }, 150);
  }, 500);
}

// --- Gacha Logic ---
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