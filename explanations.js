
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Explanation Definitions
 * React 19 Migration: ES Module Format
 */

export const EXPLANATIONS = {
  // --- Cash & Savings ---
  'cs_01': { 
    explanation: "開業資金は「資本金」として処理します。",
    steps: [
      { comment: "まずは取引の「要素」を分解します。\n手元に「現金」が増えました（資産の増加）。", highlight: "現金 1,000,000円", debit: true, debitKey: "現金" },
      { comment: "次に、その現金の出所を考えます。\n店主が元入れしたものなので、「資本金」が増えます（純資産の増加）。", highlight: "元入れして営業を開始", credit: true, creditKey: "資本金" },
      { comment: "金額を一致させて、仕訳を完成させます。", highlight: "", debit: true, credit: true }
    ]
  },
  'cs_01b': { explanation: "送金小切手は通貨代用証券として「現金」で処理します。" },
  'cs_02': { explanation: "他人（得意先）振出しの小切手は、直ちに現金化できるため「現金」です。" },
  'cs_04': { 
    explanation: "手元の現金を減らし、当座預金を増やします。",
    steps: [
      { comment: "手元の「現金」を銀行に預けたので、現金が減ります（資産の減少）。", highlight: "手元の現金 150,000円", credit: true, creditKey: "現金" },
      { comment: "預け入れた先は「当座預金」口座なので、当座預金が増えます（資産の増加）。", highlight: "当座預金口座に預け入れた", debit: true, debitKey: "当座預金" },
      { comment: "仕訳の貸借を確認して完成です。", highlight: "", debit: true, credit: true }
    ]
  },
  'cs_05': { explanation: "自社で小切手を振り出した場合は「当座預金」の減少として処理します。" },
  'cs_09': { 
    explanation: "実際＜帳簿なので、帳簿の現金を減らします。",
    steps: [
      { comment: "現金の「実際有高」に合わせて帳簿を修正します。\n実際の方が少ないので、「現金」を減らします（資産の減少）。", highlight: "実際有高を調べたところ 8,000円 であり、帳簿残高 8,500円 より少なかった", credit: true, creditKey: "現金" },
      { comment: "原因が不明なので、相手科目は「現金過不足」とします。", highlight: "原因は不明", debit: true, debitKey: "現金過不足" },
      { comment: "差額の500円を記入します。", highlight: "", debit: true, credit: true }
    ]
  },

  // --- Merchandise ---
  'md_01': { 
    explanation: "商品の購入代金を後払いにした場合は「買掛金」です。",
    steps: [
      { comment: "商品を仕入れたので、費用として「仕入」を計上します。", highlight: "商品 400,000円 を仕入れ", debit: true, debitKey: "仕入" },
      { comment: "代金は後払い（掛け）なので、「買掛金」という負債が増加します。", highlight: "代金は掛けとした", credit: true, creditKey: "買掛金" },
      { comment: "貸借が一致することを確認します。", highlight: "", debit: true, credit: true }
    ]
  },
  'md_02': { 
    explanation: "商品の販売代金を後受けにした場合は「売掛金」です。",
    steps: [
      { comment: "商品を売り上げたので、収益として「売上」を計上します。", highlight: "商品 600,000円 を売り上げ", credit: true, creditKey: "売上" },
      { comment: "代金は後で受け取る（掛け）ので、「売掛金」という資産が増加します。", highlight: "代金は掛けとした", debit: true, debitKey: "売掛金" },
      { comment: "貸借の金額を確認して完了です。", highlight: "", debit: true, credit: true }
    ]
  },
  'md_09': { explanation: "仕入時の付随費用は「仕入」原価に含めます。" },
  'md_09b': { explanation: "売上時の諸掛（発送費）を当社が負担した場合、「発送費」勘定で処理します。" },
  'md_11': { explanation: "クレジット売上も3級では「売掛金」（またはクレジット売掛金）で処理します。" },

  // --- Notes ---
  'nt_01': { explanation: "手形の振出しによる債務の支払いです。" },
  'nt_02': { explanation: "手形の受取りによる債権の回収です。" },
  'nt_10': { 
    explanation: "手形を期日前に現金化（割引）した場合、割引料は「手形売却損」で処理します。",
    steps: [
      { comment: "手形を銀行に譲渡したので、「受取手形」が減少します。", highlight: "約束手形 300,000円 を取引銀行で割り引き", credit: true, creditKey: "受取手形" },
      { comment: "割引料は費用として「手形売却損」を計上します。", highlight: "割引料 5,000円", debit: true, debitKey: "手形売却損" },
      { comment: "残額が当座預金に入金されたので、「当座預金」を増やします。", highlight: "残額を当座預金とした", debit: true, debitKey: "当座預金" }
    ]
  },

  // --- Assets & Expenses ---
  'ae_01': { explanation: "商品以外の購入（後払い）は「未払金」です。" },
  'ae_02': { explanation: "自動車などは「車両運搬具」勘定で処理します。" },
  'ae_09': { explanation: "給料の支払いです。" },

  // --- Closing ---
  'cl_01': { 
    explanation: "目標額 - 現在の残高 = 差額補充額を繰り入れます。",
    steps: [
      { comment: "まずは目標とする引当金額を計算します。\n1,500,000 × 2% = 30,000円 です。", highlight: "売掛金残高 1,500,000円 に対し 2% の貸倒引当金を設定", debit: false, credit: false },
      { comment: "現在の残高との差額を計算します（差額補充法）。\n30,000 - 10,000 = 20,000円 不足しています。", highlight: "残高は 10,000円 である", debit: false, credit: false },
      { comment: "不足分を「貸倒引当金繰入」（費用）として計上し、同額を「貸倒引当金」に加算します。", highlight: "", debit: true, credit: true }
    ]
  },
  'cl_04': { explanation: "直接法なので資産科目（建物）を直接減らします。" },
  'cl_06': { 
    explanation: "「し・くり・くり・し」の仕訳です。",
    steps: [
      { comment: "まず、期首商品を「仕入」勘定に振り替えます（費用化）。\n借方：仕入／貸方：繰越商品", highlight: "期首商品棚卸高 70,000円", debit: true, debitKey: "仕入" },
      { comment: "次に、売れ残った期末商品を「繰越商品」として資産計上し、「仕入」から控除します。\n借方：繰越商品／貸方：仕入", highlight: "期末商品棚卸高 80,000円", debit: true, debitKey: "繰越商品" }
    ]
  },
  'cl_11': { explanation: "法人税等の確定処理です。仮払分を相殺し、不足分を未払法人税等とします。" },
  'cl_13': { explanation: "仮受消費税と仮払消費税を相殺し、納付額を未払消費税として計上します。" },
  'cl_14': { explanation: "個人企業の場合、当期純利益は「資本金」に加算します。" },

  // Fallback for others (Script will generate auto-steps)
  'cs_02b': { explanation: "他人振出小切手は「現金」で処理します。" },
  'cs_03': { explanation: "郵便為替証書も通貨代用証券として「現金」勘定で処理します。" },
  'cs_03b': { explanation: "郵便為替証書は「現金」として扱います。" },
  'cs_04b': { explanation: "口座振込は「当座預金」の増加として処理します。" },
  'cs_04c': { explanation: "借入により資金が増加しますが、直接当座口座に入金されています。" },
  'cs_05b': { explanation: "口座引き落としは「当座預金」の減少です。" },
  'cs_06': { explanation: "自己振出小切手を受け取った場合は、振出時の逆仕訳（当座預金の増加）を行います。" },
  'cs_07': { explanation: "資金の前渡し時は「小口現金」（資産）を増やします。" },
  'cs_07b': { explanation: "小口現金を増やす処理です。小切手振出により当座預金が減少します。" },
  'cs_08': { explanation: "「報告即補給」の場合、全商簿記では報告と補給の仕訳を合わせる形（借：費用／貸：当座預金）になります。" },
  'cs_08b': { explanation: "報告のみを行い、補給していない場合は「小口現金」を減らします。" },
  'cs_08c': { explanation: "報告を受け、直ちに補給した場合は、費用を計上しつつ当座預金を減らします。" },
  'cs_08d': { explanation: "小口現金を廃止する場合は、残高を当座預金などに戻します。" },
  'cs_09b': { explanation: "決算時に現金不足の原因が不明な場合、「雑損」として処理します。" },
  'cs_09c': { explanation: "不足の原因が判明した場合、その科目に振り替えます。" },
  'cs_10': { explanation: "実際＞帳簿なので、帳簿の現金を増やします。" },
  'cs_10b': { explanation: "決算時に現金過剰の原因が不明な場合、「雑益」として処理します。" },
  'cs_10c': { explanation: "過剰の原因が判明した場合、その科目を計上します。" },
  'md_01b': { explanation: "仕入先からの掛け仕入は「買掛金」です。" },
  'md_02b': { explanation: "得意先への掛け売上は「売掛金」です。" },
  'md_03': { explanation: "一部現金、一部掛けの複合取引です。" },
  'md_04': { explanation: "小切手の受取は「現金」で処理します。" },
  'md_05': { explanation: "仕入戻し（返品）は、仕入の減少と買掛金の減少で処理します。" },
  'md_05b': { explanation: "仕入戻し（返品）の仕訳です。仕入の逆仕訳を行います。" },
  'md_06': { explanation: "売上戻り（返品）は、売上の減少と売掛金の減少で処理します。" },
  'md_06b': { explanation: "売上戻り（返品）の仕訳です。売上の逆仕訳を行います。" },
  'md_07': { explanation: "注文時の内金払いは「前払金」（資産）です。" },
  'md_07b': { explanation: "内金の支払いを小切手で行った場合、当座預金が減少します。" },
  'md_08': { explanation: "売上計上時に「前受金」を取り崩し、残額を「売掛金」とします。" },
  'md_08b': { explanation: "内金を受け取った場合は「前受金」（負債）として処理します。" },
  'md_08c': { explanation: "仕入計上時に「前払金」を取り崩し、残額を「買掛金」とします。" },
  'md_08d': { explanation: "商品以外の購入手付金も「前払金」で処理します（建設仮勘定の場合もありますが、3級では前払金が一般的）。" },
  'md_09c': { explanation: "発送費を小切手で支払った場合です。" },
  'md_10': { explanation: "先方負担の運賃を立て替えた場合、「売掛金」に含めるか「立替金」としますが、売掛金に含めるのが一般的です。" },
  'md_10b': { explanation: "指示通り「立替金」勘定を使用します。" },
  'md_10c': { explanation: "仕入諸掛（引取運賃）は、仕入原価に含めます。" },
  'md_11b': { explanation: "クレジット代金の入金時に手数料が引かれる仕訳です。" },
  'md_11c': { explanation: "商品券と現金の複合受取です。" },
  'md_12': { explanation: "商品券は資産勘定（「商品券」または「他店商品券」）で処理します。" },
  'md_12b': { explanation: "所有する他店商品券を使用したため、資産の減少として処理します。" },
  'md_12c': { explanation: "自社発行の商品券でなければ、換金時に資産（商品券）が減少します。" },
  'md_13': { explanation: "仕入値引は、仕入代金の減額として処理します（仕入の逆仕訳）。" },
  'md_14': { explanation: "売上値引は、売上代金の減額として処理します（売上の逆仕訳）。" },
  'nt_01b': { explanation: "買掛金を約束手形で支払う場合の基本的な仕訳です。" },
  'nt_02b': { explanation: "売掛金を約束手形で回収する場合の基本的な仕訳です。" },
  'nt_03': { explanation: "仕入と同時に手形を振り出すケースです。" },
  'nt_04': { explanation: "売上と同時に手形を受け取るケースです。" },
  'nt_05': { explanation: "金銭の貸借に伴う手形振出しは「手形借入金」勘定を用います。" },
  'nt_06': { explanation: "金銭の貸借に伴う手形受取りは「手形貸付金」勘定を用います。" },
  'nt_07': { explanation: "借入金の返済と利息の支払いを同時に行う取引です。" },
  'nt_07b': { explanation: "借入金の返済（借り換え）として手形を振り出した場合は「手形借入金」に変わります。" },
  'nt_08': { explanation: "貸付金の回収と利息の受取りを同時に行う取引です。" },
  'nt_08b': { explanation: "貸付金を回収し、代わりに手形を受け取った場合は「手形貸付金」になります。" },
  'nt_09': { explanation: "所有する手形を他人に譲渡する場合、裏書譲渡となり「受取手形」の減少で処理します。" },
  'nt_09b': { explanation: "固定資産の購入代金として裏書譲渡するケースです。" },
  'nt_09c': { explanation: "仕入代金として裏書譲渡するケースです。" },
  'nt_10b': { explanation: "割引料を手形売却損として処理し、残額を現金で受け取ります。" },
  'nt_10c': { explanation: "借入金の返済に手形を裏書譲渡して充てることもあります。" },
  'ae_03': { explanation: "土地購入時の手数料は取得原価に含めます。" },
  'ae_04': { explanation: "商品以外の売却代金（後受け）は「未収金」。帳簿価額より安く売った差額は「固定資産売却損」です。" },
  'ae_04b': { explanation: "固定資産を帳簿価額より高く売った場合、差額は「固定資産売却益」となります。" },
  'ae_04c': { explanation: "固定資産売却損が発生するケースです。" },
  'ae_05': { explanation: "固定資産税は「租税公課」です。" },
  'ae_06': { explanation: "収入印紙は「租税公課」です。" },
  'ae_07': { explanation: "切手は「通信費」です。" },
  'ae_08': { explanation: "事務用品などは「消耗品費」です。" },
  'ae_10': { explanation: "商品以外の購入で、代金未払いの場合は「未払金」勘定を用います。" },
  'cl_01b': { explanation: "残高が目標額より多い場合は、差額を「貸倒引当金戻入」（収益）として処理し、引当金を減らします。" },
  'cl_02': { explanation: "過年度に処理した貸倒れの回収は「償却債権取立益」（収益）で処理します。" },
  'cl_02b': { explanation: "小切手での回収でも、科目は「償却債権取立益」です。" },
  'cl_03': { explanation: "引当金残高が十分ある場合は、全額を引当金から充当します。" },
  'cl_03b': { explanation: "引当金残高が不足する場合、不足分は「貸倒損失」として計上します。" },
  'cl_04b': { explanation: "間接法では、資産を減らさず「減価償却累計額」を使用します。" },
  'cl_05': { explanation: "間接法の場合、貸方は「減価償却累計額」を使用します。" },
  'cl_05b': { explanation: "直接法では、資産科目（備品）を直接減らします。" },
  'cl_05c': { explanation: "車両運搬具の間接法による償却です。" },
  'cl_05d': { explanation: "期中取得の場合、使用した月数分だけ償却します（月割計算）。" },
  'cl_06b': { explanation: "金額が異なる場合の「し・くり・くり・し」です。" },
  'cl_06c': { explanation: "売上原価の算定仕訳です。" },
  'cl_06d': { explanation: "期首商品の振替仕訳（し・くり）のみです。" },
  'cl_06e': { explanation: "期末商品の計上仕訳（くり・し）のみです。" },
  'cl_06f': { explanation: "「し・くり・くり・し」のセット仕訳です。" },
  'cl_07': { explanation: "費用の見越し計上です（未払費用の計上）。" },
  'cl_08': { explanation: "費用の繰延べです（前払費用の計上）。" },
  'cl_08b': { explanation: "支払済みの費用のうち、次期以降の分を繰り延べます。" },
  'cl_09': { explanation: "収益の見越しです（未収収益の計上）。" },
  'cl_09b': { explanation: "未収分の収益を計上する仕訳です。" },
  'cl_10': { explanation: "収益の繰延べです（前受収益の計上）。" },
  'cl_11b': { explanation: "確定した未払法人税等を納付する仕訳です。" },
  'cl_12': { explanation: "未使用の切手や収入印紙は、決算時に「貯蔵品」（資産）に振り替えます。" },
  'cl_12b': { explanation: "未使用の印紙も「貯蔵品」として資産計上します。" },
  'cl_13b': { explanation: "仮払消費税の方が多い場合は、還付されるため「未収消費税」となります。" }
};
