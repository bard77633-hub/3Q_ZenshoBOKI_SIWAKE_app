
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Data Module - Common Data & Helpers
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
