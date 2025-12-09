
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
      { comment: "貸借の金額を一致させて、仕訳を完成させます。", highlight: "", debit: true, credit: true }
    ]
  },
  'cs_01b': { 
    explanation: "送金小切手は通貨代用証券として「現金」で処理します。",
    steps: [
      { comment: "「送金小切手」を受け取りました。簿記上、これはいつでも換金できるため「現金」（資産）として扱います。", highlight: "送金小切手で受け取った", debit: true, debitKey: "現金" },
      { comment: "受け取った理由は「家賃」です。収益として「受取家賃」を計上します。", highlight: "家賃 50,000円", credit: true, creditKey: "受取家賃" }
    ]
  },
  'cs_02': { 
    explanation: "他人（得意先）振出しの小切手は、直ちに現金化できるため「現金」です。",
    steps: [
      { comment: "他人（得意先）が振り出した小切手を受け取りました。\nこれは「現金」（資産）の増加として処理します。", highlight: "同店振出しの小切手 50,000円 を受け取った", debit: true, debitKey: "現金" },
      { comment: "売掛金の回収によるものなので、「売掛金」（資産）を減少させます。", highlight: "売掛金の回収として", credit: true, creditKey: "売掛金" }
    ]
  },
  'cs_02b': { 
    explanation: "他人振出小切手は「現金」として処理します。",
    steps: [
      { comment: "他人振出小切手を受け取ったため、「現金」が増加します。", highlight: "他人振出小切手で受け取った", debit: true, debitKey: "現金" },
      { comment: "利息の受取りなので、「受取利息」（収益）が発生します。", highlight: "貸付金の利息 2,000円", credit: true, creditKey: "受取利息" }
    ]
  },
  'cs_03': { 
    explanation: "郵便為替証書も通貨代用証券として「現金」勘定で処理します。",
    steps: [
      { comment: "「郵便為替証書」を受け取りました。これも銀行ですぐに換金できるため、「現金」扱いです。", highlight: "郵便為替証書を受け取った", debit: true, debitKey: "現金" },
      { comment: "売掛金の回収なので、資産である「売掛金」を減らします。", highlight: "売掛金 30,000円 の回収", credit: true, creditKey: "売掛金" }
    ]
  },
  'cs_03b': { 
    explanation: "郵便為替証書での受取は「現金」扱いです。",
    steps: [
      { comment: "代金を「郵便為替証書」で受け取ったので、「現金」を増やします。", highlight: "郵便為替証書で受け取った", debit: true, debitKey: "現金" },
      { comment: "商品を売り上げているので、収益である「売上」を計上します。", highlight: "商品 15,000円 を売り上げ", credit: true, creditKey: "売上" }
    ]
  },
  'cs_04': { 
    explanation: "手元の現金を減らし、当座預金を増やします。",
    steps: [
      { comment: "手元の「現金」を銀行に預けたので、現金が減ります（資産の減少）。", highlight: "手元の現金 150,000円", credit: true, creditKey: "現金" },
      { comment: "預け入れた先は「当座預金」口座なので、当座預金が増えます（資産の増加）。", highlight: "当座預金口座に預け入れた", debit: true, debitKey: "当座預金" }
    ]
  },
  'cs_04b': { 
    explanation: "口座振込は「当座預金」の増加として処理します。",
    steps: [
      { comment: "口座に振り込まれたため、「当座預金」（資産）が増加します。", highlight: "当座預金口座に振り込まれた", debit: true, debitKey: "当座預金" },
      { comment: "売掛金が回収されたので、「売掛金」（資産）を減少させます。", highlight: "売掛金 200,000円", credit: true, creditKey: "売掛金" }
    ]
  },
  'cs_04c': { 
    explanation: "借入金が直接口座に入金されました。",
    steps: [
      { comment: "口座に入金されたので、「当座預金」が増加します。", highlight: "当座預金口座に振り込まれた", debit: true, debitKey: "当座預金" },
      { comment: "銀行から借り入れたお金なので、「借入金」（負債）が増加します。", highlight: "銀行から 1,000,000円 を借り入れ", credit: true, creditKey: "借入金" }
    ]
  },
  'cs_05': { 
    explanation: "自社で小切手を振り出した場合は「当座預金」の減少として処理します。",
    steps: [
      { comment: "買掛金を支払ったので、負債である「買掛金」が減少します。", highlight: "買掛金 200,000円 の支払い", debit: true, debitKey: "買掛金" },
      { comment: "小切手を振り出すと、当座預金から引き落とされるため、「当座預金」（資産）を減らします。", highlight: "小切手を振り出した", credit: true, creditKey: "当座預金" }
    ]
  },
  'cs_05b': { 
    explanation: "口座引き落としは「当座預金」の減少です。",
    steps: [
      { comment: "水道光熱費が発生したため、費用を計上します。", highlight: "水道光熱費 15,000円", debit: true, debitKey: "水道光熱費" },
      { comment: "口座から引き落とされたので、「当座預金」を減らします。", highlight: "当座預金口座から引き落とされた", credit: true, creditKey: "当座預金" }
    ]
  },
  'cs_06': { 
    explanation: "自己振出小切手が戻ってきた場合は、当座預金の減少を取り消す（増やす）処理をします。",
    steps: [
      { comment: "以前に自分が振り出した小切手が戻ってきました。これは「当座預金」にお金が戻る処理をします（預金の減少の取消＝増加）。", highlight: "以前に当店が振り出した小切手", debit: true, debitKey: "当座預金" },
      { comment: "売掛金を回収したので、「売掛金」を減らします。", highlight: "売掛金の回収", credit: true, creditKey: "売掛金" }
    ]
  },
  'cs_07': { 
    explanation: "小口係への資金の前渡しは「小口現金」勘定で処理します。",
    steps: [
      { comment: "小口係に資金を渡したため、「小口現金」（資産）が増加します。", highlight: "小口係に", debit: true, debitKey: "小口現金" },
      { comment: "小切手を振り出して渡したため、「当座預金」が減少します。", highlight: "小切手 50,000円 を振り出して", credit: true, creditKey: "当座預金" }
    ]
  },
  'cs_07b': { 
    explanation: "小口現金の増額も同様の処理です。",
    steps: [
      { comment: "増額のため資金を渡したので、「小口現金」を増やします。", highlight: "小口現金を増額するため", debit: true, debitKey: "小口現金" },
      { comment: "小切手振出により「当座預金」を減らします。", highlight: "小切手 20,000円 を振り出して", credit: true, creditKey: "当座預金" }
    ]
  },
  'cs_08': { 
    explanation: "「報告を受け、ただちに補給」する場合、費用計上と預金減少を同時に行います。",
    steps: [
      { comment: "報告された費用（旅費交通費・消耗品費）を計上します。", highlight: "交通費 6,000円、消耗品費 4,000円", debit: true, debitKey: "旅費交通費" },
      { comment: "同額の小切手を渡して補給したため、「当座預金」を減らします。", highlight: "同額の小切手を振り出して補給した", credit: true, creditKey: "当座預金" }
    ]
  },
  'cs_08b': { 
    explanation: "「補給を行っていない」場合は、小口現金の減少として処理します。",
    steps: [
      { comment: "使った分の費用（通信費・雑費）を計上します。", highlight: "通信費 2,000円、雑費 1,000円", debit: true, debitKey: "通信費" },
      { comment: "まだ補給していないため、手元の「小口現金」が減ったとして処理します。", highlight: "補給は行っていない", credit: true, creditKey: "小口現金" }
    ]
  },
  'cs_08c': { 
    explanation: "即時補給のパターンです。",
    steps: [
      { comment: "報告された「旅費交通費」を計上します。", highlight: "旅費交通費 5,000円", debit: true, debitKey: "旅費交通費" },
      { comment: "小切手で補給したため、「当座預金」を減らします。", highlight: "同額の小切手を振り出して補給", credit: true, creditKey: "当座預金" }
    ]
  },
  'cs_08d': { 
    explanation: "小口現金を廃止し、残額を預け入れた処理です。",
    steps: [
      { comment: "残額を預け入れたため、「当座預金」が増加します。", highlight: "当座預金に預け入れた", debit: true, debitKey: "当座預金" },
      { comment: "制度を廃止するので、「小口現金」勘定をゼロにします（減少）。", highlight: "小口現金残高 20,000円", credit: true, creditKey: "小口現金" }
    ]
  },
  'cs_09': { 
    explanation: "実際有高＜帳簿残高なので、帳簿の現金を減らして合わせます。",
    steps: [
      { comment: "実際の方が少ないため、帳簿の「現金」を減らします。", highlight: "帳簿残高 8,500円 より少なかった", credit: true, creditKey: "現金" },
      { comment: "原因不明のため、借方を「現金過不足」とします。", highlight: "原因は不明", debit: true, debitKey: "現金過不足" }
    ]
  },
  'cs_09b': { 
    explanation: "決算時に現金不足が解決しない場合、「雑損」にします。",
    steps: [
      { comment: "不足分（借方にある現金過不足）を消すため、貸方に「現金過不足」を記入します。", highlight: "現金過不足（借方残高）", credit: true, creditKey: "現金過不足" },
      { comment: "決算でも不明なため、費用である「雑損」に振り替えます。", highlight: "雑損として処理する", debit: true, debitKey: "雑損" }
    ]
  },
  'cs_09c': { 
    explanation: "不足の原因が判明した場合、その科目を計上します。",
    steps: [
      { comment: "帳簿より少ないため、「現金」を減らして実際にあわせます。", highlight: "帳簿より 500円 少なかった", credit: true, creditKey: "現金" },
      { comment: "原因は通信費の記入漏れだったので、費用として「通信費」を計上します。", highlight: "通信費の記入漏れ", debit: true, debitKey: "通信費" }
    ]
  },
  'cs_10': { 
    explanation: "実際有高＞帳簿残高なので、帳簿の現金を増やします。",
    steps: [
      { comment: "実際の方が多いため、帳簿の「現金」を増やします。", highlight: "帳簿より 1,000円 多かった", debit: true, debitKey: "現金" },
      { comment: "相手科目は「現金過不足」とします。", highlight: "原因不明", credit: true, creditKey: "現金過不足" }
    ]
  },
  'cs_10b': { 
    explanation: "決算時に現金過剰が解決しない場合、「雑益」にします。",
    steps: [
      { comment: "過剰分（貸方にある現金過不足）を消すため、借方に「現金過不足」を記入します。", highlight: "現金過不足（貸方残高）", debit: true, debitKey: "現金過不足" },
      { comment: "決算でも不明なため、収益である「雑益」に振り替えます。", highlight: "雑益として処理する", credit: true, creditKey: "雑益" }
    ]
  },
  'cs_10c': { 
    explanation: "過剰の原因が判明しました。",
    steps: [
      { comment: "現金が多かったので、「現金」を増やして合わせます。", highlight: "帳簿より 3,000円 多かった", debit: true, debitKey: "現金" },
      { comment: "原因は受取手数料の記入漏れだったので、収益として「受取手数料」を計上します。", highlight: "受取手数料の記入漏れ", credit: true, creditKey: "受取手数料" }
    ]
  },

  // --- Merchandise ---
  'md_01': { 
    explanation: "商品の購入代金を後払いにした場合は「買掛金」です。",
    steps: [
      { comment: "商品を仕入れたので、費用として「仕入」を計上します。", highlight: "商品 400,000円 を仕入れ", debit: true, debitKey: "仕入" },
      { comment: "代金は後払い（掛け）なので、「買掛金」という負債が増加します。", highlight: "代金は掛けとした", credit: true, creditKey: "買掛金" }
    ]
  },
  'md_01b': { 
    explanation: "仕入先からの掛け仕入は「買掛金」です。",
    steps: [
      { comment: "商品の仕入れは「仕入」（費用）です。", highlight: "商品 300,000円 を仕入れ", debit: true, debitKey: "仕入" },
      { comment: "代金未払い（掛け）のため、「買掛金」（負債）を計上します。", highlight: "代金は掛けとした", credit: true, creditKey: "買掛金" }
    ]
  },
  'md_02': { 
    explanation: "商品の販売代金を後受けにした場合は「売掛金」です。",
    steps: [
      { comment: "商品を売り上げたので、収益として「売上」を計上します。", highlight: "商品 600,000円 を売り上げ", credit: true, creditKey: "売上" },
      { comment: "代金は後で受け取る（掛け）ので、「売掛金」という資産が増加します。", highlight: "代金は掛けとした", debit: true, debitKey: "売掛金" }
    ]
  },
  'md_02b': { 
    explanation: "得意先への掛け売上は「売掛金」です。",
    steps: [
      { comment: "「売掛金」（資産）の増加を記録します。", highlight: "代金は掛けとした", debit: true, debitKey: "売掛金" },
      { comment: "「売上」（収益）の発生を記録します。", highlight: "商品 500,000円 を売り上げ", credit: true, creditKey: "売上" }
    ]
  },
  'md_03': { 
    explanation: "一部現金、一部掛けの複合取引です。",
    steps: [
      { comment: "総額で「仕入」を計上します。", highlight: "商品 150,000円 を仕入れ", debit: true, debitKey: "仕入" },
      { comment: "一部を現金で支払ったので、「現金」を減らします。", highlight: "50,000円 は現金で支払い", credit: true, creditKey: "現金" },
      { comment: "残額は「買掛金」（負債）とします。", highlight: "残額は掛けとした", credit: true, creditKey: "買掛金" }
    ]
  },
  'md_04': { 
    explanation: "小切手の受取は「現金」で処理します。",
    steps: [
      { comment: "総額で「売上」を計上します。", highlight: "商品 250,000円 を売り上げ", credit: true, creditKey: "売上" },
      { comment: "小切手の受取は「現金」（資産）の増加です。", highlight: "100,000円 は小切手で受け取り", debit: true, debitKey: "現金" },
      { comment: "残額は「売掛金」（資産）とします。", highlight: "残額は掛けとした", debit: true, debitKey: "売掛金" }
    ]
  },
  'md_05': { 
    explanation: "仕入戻し（返品）は、仕入の減少と買掛金の減少で処理します。",
    steps: [
      { comment: "返品により支払義務がなくなるため、「買掛金」（負債）を減らします。", highlight: "掛けで仕入れた商品...返品した", debit: true, debitKey: "買掛金" },
      { comment: "返品分だけ「仕入」（費用）を取り消します（貸方に記入）。", highlight: "5,000円 を返品した", credit: true, creditKey: "仕入" }
    ]
  },
  'md_05b': { 
    explanation: "仕入戻し（返品）の仕訳です。仕入の逆仕訳を行います。",
    steps: [
      { comment: "買掛金を減額します。", highlight: "以前に掛けで仕入れた", debit: true, debitKey: "買掛金" },
      { comment: "仕入高を減額します。", highlight: "返送した", credit: true, creditKey: "仕入" }
    ]
  },
  'md_06': { 
    explanation: "売上戻り（返品）は、売上の減少と売掛金の減少で処理します。",
    steps: [
      { comment: "返品されたため、「売上」（収益）を取り消します（借方に記入）。", highlight: "返品された", debit: true, debitKey: "売上" },
      { comment: "代金を受け取る権利もなくなるため、「売掛金」（資産）を減らします。", highlight: "掛けで売り上げた商品のうち", credit: true, creditKey: "売掛金" }
    ]
  },
  'md_06b': { 
    explanation: "売上戻り（返品）の仕訳です。売上の逆仕訳を行います。",
    steps: [
      { comment: "返品を受け入れたため、「売上」を減らします。", highlight: "これを受け入れた", debit: true, debitKey: "売上" },
      { comment: "「売掛金」を減らします。", highlight: "掛け売上商品の一部", credit: true, creditKey: "売掛金" }
    ]
  },
  'md_07': { 
    explanation: "注文時の内金払いは「前払金」（資産）です。",
    steps: [
      { comment: "商品を受け取る権利ができたので、「前払金」（資産）とします。", highlight: "内金として 10,000円", debit: true, debitKey: "前払金" },
      { comment: "現金を支払ったので、「現金」を減らします。", highlight: "現金で支払った", credit: true, creditKey: "現金" }
    ]
  },
  'md_07b': { 
    explanation: "内金の支払いを小切手で行った場合、当座預金が減少します。",
    steps: [
      { comment: "内金なので「前払金」です。", highlight: "内金として", debit: true, debitKey: "前払金" },
      { comment: "小切手振出なので「当座預金」を減らします。", highlight: "小切手を振り出して支払った", credit: true, creditKey: "当座預金" }
    ]
  },
  'md_08': { 
    explanation: "売上計上時に「前受金」を取り崩し、残額を「売掛金」とします。",
    steps: [
      { comment: "商品を引き渡したため、「売上」を計上します。", highlight: "商品 120,000円 を引き渡し", credit: true, creditKey: "売上" },
      { comment: "以前受け取っていた「前受金」（負債）が役割を終えたので消滅させます（借方）。", highlight: "受け取っていた内金 30,000円 を差し引き", debit: true, debitKey: "前受金" },
      { comment: "残額は掛け（売掛金）とします。", highlight: "残額を掛けとした", debit: true, debitKey: "売掛金" }
    ]
  },
  'md_08b': { 
    explanation: "内金を受け取った場合は「前受金」（負債）として処理します。",
    steps: [
      { comment: "現金を受け取ったので、「現金」を増やします。", highlight: "現金で受け取った", debit: true, debitKey: "現金" },
      { comment: "商品を渡す義務が生じたので、「前受金」（負債）を計上します。", highlight: "内金として", credit: true, creditKey: "前受金" }
    ]
  },
  'md_08c': { 
    explanation: "仕入計上時に「前払金」を取り崩し、残額を「買掛金」とします。",
    steps: [
      { comment: "商品を受け取ったので、「仕入」を計上します。", highlight: "商品 150,000円 を受け取り", debit: true, debitKey: "仕入" },
      { comment: "以前支払っていた「前払金」（資産）を消滅させます（貸方）。", highlight: "支払っていた内金 30,000円 を差し引き", credit: true, creditKey: "前払金" },
      { comment: "残額は掛け（買掛金）とします。", highlight: "残額を掛けとした", credit: true, creditKey: "買掛金" }
    ]
  },
  'md_08d': { 
    explanation: "商品以外の購入手付金も「前払金」で処理します（3級範囲では）。",
    steps: [
      { comment: "手付金を支払ったので、「前払金」とします。", highlight: "手付金 300,000円", debit: true, debitKey: "前払金" },
      { comment: "小切手振出のため「当座預金」を減らします。", highlight: "小切手を振り出して支払った", credit: true, creditKey: "当座預金" }
    ]
  },
  'md_09': { 
    explanation: "仕入時の付随費用は「仕入」原価に含めます。",
    steps: [
      { comment: "商品代金に引取運賃を加えて「仕入」とします（40,000 + 1,500）。", highlight: "代金...と引取運賃...は現金で支払った", debit: true, debitKey: "仕入" },
      { comment: "全額現金で支払ったので、「現金」を減らします。", highlight: "現金で支払った", credit: true, creditKey: "現金" }
    ]
  },
  'md_09b': { 
    explanation: "売上時の諸掛（発送費）を当社が負担した場合、「発送費」勘定で処理します。",
    steps: [
      { comment: "商品を売り上げたので「売上」を計上します。", highlight: "商品を売り上げ", credit: true, creditKey: "売上" },
      { comment: "代金は掛けなので「売掛金」とします。", highlight: "代金 50,000円 は掛け", debit: true, debitKey: "売掛金" },
      { comment: "運賃は当社負担なので、費用として「発送費」を計上し、現金を減らします。", highlight: "発送運賃（当社負担）1,000円", debit: true, debitKey: "発送費" }
    ]
  },
  'md_09c': { 
    explanation: "発送費を小切手で支払った場合です。",
    steps: [
      { comment: "当社負担の運賃なので「発送費」（費用）です。", highlight: "発送のための運賃（当社負担）", debit: true, debitKey: "発送費" },
      { comment: "小切手振出なので「当座預金」を減らします。", highlight: "小切手を振り出して支払った", credit: true, creditKey: "当座預金" }
    ]
  },
  'md_10': { 
    explanation: "先方負担の運賃を立て替えた場合、「売掛金」に含める処理が一般的です。",
    steps: [
      { comment: "売上を計上します。", highlight: "売上", credit: true, creditKey: "売上" },
      { comment: "運賃を立て替えて支払ったので、「現金」が減ります。", highlight: "現金で立て替えた", credit: true, creditKey: "現金" },
      { comment: "商品代金と立替分を合わせて、後で請求するので「売掛金」に合算します（70,000 + 1,200）。", highlight: "掛けとした...立て替えた", debit: true, debitKey: "売掛金" }
    ]
  },
  'md_10b': { 
    explanation: "指示通り「立替金」勘定を使用します。",
    steps: [
      { comment: "立替払いをしたので、「立替金」（資産）とします。", highlight: "「立替金」勘定を使用する", debit: true, debitKey: "立替金" },
      { comment: "現金が出ていったので、「現金」を減らします。", highlight: "現金で立て替えた", credit: true, creditKey: "現金" }
    ]
  },
  'md_10c': { 
    explanation: "仕入諸掛（引取運賃）は、仕入原価に含めます。",
    steps: [
      { comment: "商品代金と引取運賃を合計して「仕入」とします（60,000 + 2,000）。", highlight: "商品を仕入れ...引取運賃（当社負担）", debit: true, debitKey: "仕入" },
      { comment: "商品代金は掛けなので「買掛金」とします。", highlight: "代金 60,000円 は掛け", credit: true, creditKey: "買掛金" },
      { comment: "運賃は現金払いなので「現金」を減らします。", highlight: "2,000円 を現金で支払った", credit: true, creditKey: "現金" }
    ]
  },
  'md_11': { 
    explanation: "クレジット売上も3級では「売掛金」（またはクレジット売掛金）で処理します。",
    steps: [
      { comment: "売上を計上します。", highlight: "商品を売り上げ", credit: true, creditKey: "売上" },
      { comment: "クレジット払いは信販会社へのツケなので、「売掛金」（またはクレジット売掛金）とします。", highlight: "全額クレジットカード払い", debit: true, debitKey: "売掛金" }
    ]
  },
  'md_11b': { 
    explanation: "クレジット代金の入金時に手数料が引かれる仕訳です。",
    steps: [
      { comment: "入金があったので、元の債権である「売掛金」を消滅させます（貸方）。", highlight: "クレジット売掛金 45,000円 について", credit: true, creditKey: "売掛金" },
      { comment: "引かれた手数料は「支払手数料」（費用）とします。", highlight: "手数料 2,000円 を差し引かれた", debit: true, debitKey: "支払手数料" },
      { comment: "残額が振り込まれたので、「当座預金」を増やします。", highlight: "残額が当座預金に振り込まれた", debit: true, debitKey: "当座預金" }
    ]
  },
  'md_11c': { 
    explanation: "商品券と現金の複合受取です。",
    steps: [
      { comment: "売上を計上します。", highlight: "商品を売り上げ", credit: true, creditKey: "売上" },
      { comment: "受け取った商品券は「商品券」（資産）勘定で処理します。", highlight: "共通商品券で受け取り", debit: true, debitKey: "商品券" },
      { comment: "残りは現金なので「現金」を増やします。", highlight: "残額は現金で受け取った", debit: true, debitKey: "現金" }
    ]
  },
  'md_12': { 
    explanation: "商品券は資産勘定（「商品券」または「他店商品券」）で処理します。",
    steps: [
      { comment: "売上を計上します。", highlight: "売り上げ", credit: true, creditKey: "売上" },
      { comment: "商品券を受け取ったので、「商品券」（資産）を増やします。", highlight: "共通商品券で受け取った", debit: true, debitKey: "商品券" }
    ]
  },
  'md_12b': { 
    explanation: "所有する他店商品券を使用したため、資産の減少として処理します。",
    steps: [
      { comment: "仕入を計上します。", highlight: "仕入れ", debit: true, debitKey: "仕入" },
      { comment: "手持ちの商品券を使ったので、「商品券」（資産）を減らします。", highlight: "手持ちの共通商品券で支払った", credit: true, creditKey: "商品券" }
    ]
  },
  'md_12c': { 
    explanation: "商品券の精算（換金）です。",
    steps: [
      { comment: "現金を受け取ったので、「現金」を増やします。", highlight: "現金を受け取った", debit: true, debitKey: "現金" },
      { comment: "所有していた商品券がなくなったので、「商品券」を減らします。", highlight: "商品券 50,000円 を精算し", credit: true, creditKey: "商品券" }
    ]
  },
  'md_13': { 
    explanation: "仕入値引は、仕入代金の減額として処理します（仕入の逆仕訳）。",
    steps: [
      { comment: "値引きを受けた分、支払義務が減るので「買掛金」を減らします。", highlight: "値引きを受けた", debit: true, debitKey: "買掛金" },
      { comment: "その分だけ商品コスト（仕入）を減らします。", highlight: "代金から...値引き", credit: true, creditKey: "仕入" }
    ]
  },
  'md_14': { 
    explanation: "売上値引は、売上代金の減額として処理します（売上の逆仕訳）。",
    steps: [
      { comment: "値引きをした分、「売上」を取り消します。", highlight: "値引きした", debit: true, debitKey: "売上" },
      { comment: "受け取る代金が減るので、「売掛金」を減らします。", highlight: "代金から...値引き", credit: true, creditKey: "売掛金" }
    ]
  },

  // --- Notes ---
  'nt_01': { 
    explanation: "手形の振出しによる債務の支払いです。",
    steps: [
      { comment: "買掛金を支払ったので、「買掛金」を減らします。", highlight: "買掛金...の支払い", debit: true, debitKey: "買掛金" },
      { comment: "手形を振り出したので、「支払手形」（負債）が増加します。", highlight: "約束手形を振り出した", credit: true, creditKey: "支払手形" }
    ]
  },
  'nt_01b': { 
    explanation: "買掛金を約束手形で支払う場合の基本的な仕訳です。",
    steps: [
      { comment: "買掛金を減らします。", highlight: "買掛金...について", debit: true, debitKey: "買掛金" },
      { comment: "手形を振り出したので「支払手形」とします。", highlight: "約束手形を振り出して支払った", credit: true, creditKey: "支払手形" }
    ]
  },
  'nt_02': { 
    explanation: "手形の受取りによる債権の回収です。",
    steps: [
      { comment: "手形を受け取ったので、「受取手形」（資産）が増加します。", highlight: "約束手形を受け取った", debit: true, debitKey: "受取手形" },
      { comment: "売掛金を回収したので、「売掛金」を減らします。", highlight: "売掛金の回収として", credit: true, creditKey: "売掛金" }
    ]
  },
  'nt_02b': { 
    explanation: "売掛金を約束手形で回収する場合の基本的な仕訳です。",
    steps: [
      { comment: "手形受取により「受取手形」を増やします。", highlight: "約束手形...を受け取った", debit: true, debitKey: "受取手形" },
      { comment: "売掛金回収により「売掛金」を減らします。", highlight: "売掛金の支払いとして", credit: true, creditKey: "売掛金" }
    ]
  },
  'nt_03': { 
    explanation: "仕入と同時に手形を振り出すケースです。",
    steps: [
      { comment: "商品を仕入れたので「仕入」です。", highlight: "商品を仕入れ", debit: true, debitKey: "仕入" },
      { comment: "代金として手形を振り出したので「支払手形」です。", highlight: "約束手形を振り出して支払った", credit: true, creditKey: "支払手形" }
    ]
  },
  'nt_04': { 
    explanation: "売上と同時に手形を受け取るケースです。",
    steps: [
      { comment: "商品を売り上げたので「売上」です。", highlight: "商品を売り上げ", credit: true, creditKey: "売上" },
      { comment: "代金として手形を受け取ったので「受取手形」です。", highlight: "約束手形を受け取った", debit: true, debitKey: "受取手形" }
    ]
  },
  'nt_05': { 
    explanation: "金銭の貸借に伴う手形振出しは「手形借入金」勘定を用います。",
    steps: [
      { comment: "現金を借りたので「現金」が増えます。", highlight: "現金...を借り入れ", debit: true, debitKey: "現金" },
      { comment: "手形を振り出しましたが、商品売買ではないので「手形借入金」（負債）とします。", highlight: "約束手形を振り出した", credit: true, creditKey: "手形借入金" }
    ]
  },
  'nt_06': { 
    explanation: "金銭の貸借に伴う手形受取りは「手形貸付金」勘定を用います。",
    steps: [
      { comment: "手形を受け取りましたが、貸付金なので「手形貸付金」（資産）とします。", highlight: "同額の約束手形を受け取った", debit: true, debitKey: "手形貸付金" },
      { comment: "現金を貸し付けたので「現金」が減ります。", highlight: "現金...を貸し付け", credit: true, creditKey: "現金" }
    ]
  },
  'nt_07': { 
    explanation: "借入金の返済と利息の支払いを同時に行う取引です。",
    steps: [
      { comment: "借入金を返済するので、「手形借入金」（負債）を減らします。", highlight: "手形借入金...が期日となり", debit: true, debitKey: "手形借入金" },
      { comment: "利息を支払うので「支払利息」（費用）を計上します。", highlight: "利息...とともに", debit: true, debitKey: "支払利息" },
      { comment: "合計額を現金で支払ったので、「現金」を減らします。", highlight: "現金で返済した", credit: true, creditKey: "現金" }
    ]
  },
  'nt_07b': { 
    explanation: "借入金の返済（借り換え）として手形を振り出した場合は「手形借入金」に変わります。",
    steps: [
      { comment: "元の「借入金」を消滅させます（借方）。", highlight: "借入金...の支払いとして", debit: true, debitKey: "借入金" },
      { comment: "新たに手形債務を負うので「手形借入金」（負債）とします。", highlight: "約束手形を振り出した", credit: true, creditKey: "手形借入金" }
    ]
  },
  'nt_08': { 
    explanation: "貸付金の回収と利息の受取りを同時に行う取引です。",
    steps: [
      { comment: "現金を受け取ったので「現金」を増やします（元本＋利息）。", highlight: "現金で回収した", debit: true, debitKey: "現金" },
      { comment: "貸付金が戻ってきたので「手形貸付金」（資産）を減らします。", highlight: "手形貸付金...が期日となり", credit: true, creditKey: "手形貸付金" },
      { comment: "利息を受け取ったので「受取利息」（収益）を計上します。", highlight: "利息...とともに", credit: true, creditKey: "受取利息" }
    ]
  },
  'nt_08b': { 
    explanation: "貸付金を回収し、代わりに手形を受け取った場合は「手形貸付金」になります。",
    steps: [
      { comment: "手形を受け取ったので「手形貸付金」とします。", highlight: "約束手形を受け取った", debit: true, debitKey: "手形貸付金" },
      { comment: "元の「貸付金」を消滅させます（貸方）。", highlight: "貸付金...について", credit: true, creditKey: "貸付金" }
    ]
  },
  'nt_09': { 
    explanation: "所有する手形を他人に譲渡する場合、裏書譲渡となり「受取手形」の減少で処理します。",
    steps: [
      { comment: "買掛金を支払ったので「買掛金」を減らします。", highlight: "買掛金...の支払いとして", debit: true, debitKey: "買掛金" },
      { comment: "所有する手形を渡したので、「受取手形」を減らします（貸方）。", highlight: "所有する約束手形を裏書譲渡した", credit: true, creditKey: "受取手形" }
    ]
  },
  'nt_09b': { 
    explanation: "固定資産の購入代金として裏書譲渡するケースです。",
    steps: [
      { comment: "備品を購入したので「備品」（資産）を増やします。", highlight: "備品...を購入し", debit: true, debitKey: "備品" },
      { comment: "手形を譲渡したので「受取手形」を減らします。", highlight: "裏書譲渡した", credit: true, creditKey: "受取手形" }
    ]
  },
  'nt_09c': { 
    explanation: "仕入代金として裏書譲渡するケースです。",
    steps: [
      { comment: "仕入を計上します。", highlight: "商品を仕入れ", debit: true, debitKey: "仕入" },
      { comment: "手形を譲渡したので「受取手形」を減らします。", highlight: "裏書譲渡して支払った", credit: true, creditKey: "受取手形" }
    ]
  },
  'nt_10': { 
    explanation: "手形を期日前に現金化（割引）した場合、割引料は「手形売却損」で処理します。",
    steps: [
      { comment: "手形を銀行に譲渡したので、「受取手形」が減少します。", highlight: "約束手形...を取引銀行で割り引き", credit: true, creditKey: "受取手形" },
      { comment: "割引料は費用として「手形売却損」を計上します。", highlight: "割引料 5,000円", debit: true, debitKey: "手形売却損" },
      { comment: "残額が当座預金に入金されたので、「当座預金」を増やします。", highlight: "残額を当座預金とした", debit: true, debitKey: "当座預金" }
    ]
  },
  'nt_10b': { 
    explanation: "割引料を手形売却損として処理し、残額を現金で受け取ります。",
    steps: [
      { comment: "現金を受け取ったので「現金」を増やします。", highlight: "残額を現金で受け取った", debit: true, debitKey: "現金" },
      { comment: "割引料は「手形売却損」です。", highlight: "割引料 8,000円", debit: true, debitKey: "手形売却損" },
      { comment: "手形を渡したので「受取手形」を減らします。", highlight: "割り引き", credit: true, creditKey: "受取手形" }
    ]
  },
  'nt_10c': { 
    explanation: "借入金の返済に手形を裏書譲渡して充てることもあります。",
    steps: [
      { comment: "借入金を返済したので「借入金」を減らします。", highlight: "借入金の返済として", debit: true, debitKey: "借入金" },
      { comment: "手形を譲渡したので「受取手形」を減らします。", highlight: "裏書譲渡した", credit: true, creditKey: "受取手形" }
    ]
  },

  // --- Assets & Expenses ---
  'ae_01': { 
    explanation: "商品以外の購入（後払い）は「未払金」です。",
    steps: [
      { comment: "パソコンは「備品」（資産）として処理します。", highlight: "営業用のパソコン...を購入", debit: true, debitKey: "備品" },
      { comment: "代金後払いですが、商品ではないので「未払金」（負債）とします。", highlight: "代金は翌月払いとした", credit: true, creditKey: "未払金" }
    ]
  },
  'ae_02': { 
    explanation: "自動車などは「車両運搬具」勘定で処理します。",
    steps: [
      { comment: "トラックは「車両運搬具」（資産）です。", highlight: "営業用のトラック...を購入", debit: true, debitKey: "車両運搬具" },
      { comment: "小切手払いなので「当座預金」を減らします。", highlight: "小切手を振り出して支払った", credit: true, creditKey: "当座預金" }
    ]
  },
  'ae_03': { 
    explanation: "土地購入時の手数料は取得原価に含めます。",
    steps: [
      { comment: "土地代金と手数料を合計して「土地」（資産）として計上します（6,000,000 + 200,000）。", highlight: "土地...を購入し...仲介手数料...も", debit: true, debitKey: "土地" },
      { comment: "全額小切手払いなので「当座預金」を減らします。", highlight: "小切手で支払った", credit: true, creditKey: "当座預金" }
    ]
  },
  'ae_04': { 
    explanation: "商品以外の売却代金（後受け）は「未収金」。帳簿価額より安く売った差額は「固定資産売却損」です。",
    steps: [
      { comment: "備品を売却したので、帳簿価額分の「備品」（資産）を減らします。", highlight: "備品（帳簿価額 50,000円）", credit: true, creditKey: "備品" },
      { comment: "代金は後受けなので、「未収金」（資産）を計上します。", highlight: "代金は月末に受け取る", debit: true, debitKey: "未収金" },
      { comment: "安く売って損をしたので、「固定資産売却損」（費用）を計上します（50,000 - 30,000）。", highlight: "30,000円 で売却し", debit: true, debitKey: "固定資産売却損" }
    ]
  },
  'ae_04b': { 
    explanation: "固定資産を帳簿価額より高く売った場合、差額は「固定資産売却益」となります。",
    steps: [
      { comment: "代金が入金されたので「当座預金」を増やします。", highlight: "代金は当座預金に振り込まれた", debit: true, debitKey: "当座預金" },
      { comment: "売却した「土地」を減らします。", highlight: "土地（帳簿価額 5,000,000円）", credit: true, creditKey: "土地" },
      { comment: "高く売れた差額は「固定資産売却益」（収益）とします。", highlight: "6,000,000円 で売却し", credit: true, creditKey: "固定資産売却益" }
    ]
  },
  'ae_04c': { 
    explanation: "固定資産売却損が発生するケースです。",
    steps: [
      { comment: "現金を受け取ったので「現金」を増やします。", highlight: "現金で受け取った", debit: true, debitKey: "現金" },
      { comment: "売却損が出ているので「固定資産売却損」を計上します。", highlight: "500,000円 で売却し（帳簿80万）", debit: true, debitKey: "固定資産売却損" },
      { comment: "売却した「車両運搬具」を減らします。", highlight: "営業用車両（帳簿価額 800,000円）", credit: true, creditKey: "車両運搬具" }
    ]
  },
  'ae_05': { 
    explanation: "固定資産税は「租税公課」です。",
    steps: [
      { comment: "税金の支払いは「租税公課」（費用）で処理します。", highlight: "固定資産税", debit: true, debitKey: "租税公課" },
      { comment: "現金で支払ったので「現金」を減らします。", highlight: "現金で納付した", credit: true, creditKey: "現金" }
    ]
  },
  'ae_06': { 
    explanation: "収入印紙は「租税公課」です。",
    steps: [
      { comment: "収入印紙は「租税公課」（費用）で処理します。", highlight: "収入印紙...を購入し、ただちに使用した", debit: true, debitKey: "租税公課" },
      { comment: "現金払いなので「現金」を減らします。", highlight: "現金で購入し", credit: true, creditKey: "現金" }
    ]
  },
  'ae_07': { 
    explanation: "切手は「通信費」です。",
    steps: [
      { comment: "切手は「通信費」（費用）で処理します。", highlight: "郵便切手...を購入し、ただちに使用した", debit: true, debitKey: "通信費" },
      { comment: "現金払いなので「現金」を減らします。", highlight: "現金で購入し", credit: true, creditKey: "現金" }
    ]
  },
  'ae_08': { 
    explanation: "事務用品などは「消耗品費」です。",
    steps: [
      { comment: "文房具代などは「消耗品費」（費用）で処理します。", highlight: "コピー用紙や文房具代", debit: true, debitKey: "消耗品費" },
      { comment: "現金払いなので「現金」を減らします。", highlight: "現金で支払った", credit: true, creditKey: "現金" }
    ]
  },
  'ae_09': { 
    explanation: "給料の支払いです。",
    steps: [
      { comment: "給料を支払ったので、「給料」（費用）を計上します。", highlight: "従業員の給料", debit: true, debitKey: "給料" },
      { comment: "現金払いなので「現金」を減らします。", highlight: "現金で支払った", credit: true, creditKey: "現金" }
    ]
  },
  'ae_10': { 
    explanation: "商品以外の購入で、代金未払いの場合は「未払金」勘定を用います。",
    steps: [
      { comment: "消耗品を購入したので「消耗品費」です。", highlight: "事務用消耗品...を購入", debit: true, debitKey: "消耗品費" },
      { comment: "代金未払いですが商品ではないので「未払金」です。", highlight: "代金は来月末払いとした", credit: true, creditKey: "未払金" }
    ]
  },

  // --- Closing ---
  'cl_01': { 
    explanation: "目標額 - 現在の残高 = 差額補充額を繰り入れます。",
    steps: [
      { comment: "まずは目標とする引当金額を計算します。\n1,500,000 × 2% = 30,000円 です。", highlight: "売掛金残高 1,500,000円 に対し 2% の貸倒引当金を設定", debit: false, credit: false },
      { comment: "現在の残高との差額を計算します（差額補充法）。\n30,000 - 10,000 = 20,000円 不足しています。", highlight: "残高は 10,000円 である", debit: false, credit: false },
      { comment: "不足分を「貸倒引当金繰入」（費用）として計上し、同額を「貸倒引当金」に加算します。", highlight: "差額補充法", debit: true, credit: true }
    ]
  },
  'cl_01b': { 
    explanation: "残高が目標額より多い場合は、差額を「貸倒引当金戻入」（収益）として処理し、引当金を減らします。",
    steps: [
      { comment: "目標額を計算します。\n1,000,000 × 2% = 20,000円 です。", highlight: "1,000,000円 に対し 2%", debit: false, credit: false },
      { comment: "残高が 25,000円 なので、5,000円 多すぎます。", highlight: "残高は 25,000円 である", debit: false, credit: false },
      { comment: "多すぎる分を減らすため、「貸倒引当金」を借方に記入し、相手科目は「貸倒引当金戻入」（収益）とします。", highlight: "差額補充法", debit: true, credit: true }
    ]
  },
  'cl_02': { 
    explanation: "過年度に処理した貸倒れの回収は「償却債権取立益」（収益）で処理します。",
    steps: [
      { comment: "現金を受け取ったので「現金」を増やします。", highlight: "現金で回収された", debit: true, debitKey: "現金" },
      { comment: "前期に損失処理済みなので、今は「償却債権取立益」という特別な収益で処理します。", highlight: "前期に貸倒れ処理した", credit: true, creditKey: "償却債権取立益" }
    ]
  },
  'cl_02b': { 
    explanation: "小切手での回収でも、科目は「償却債権取立益」です。",
    steps: [
      { comment: "現金（小切手）を受け取ったので「現金」を増やします。", highlight: "小切手で回収した", debit: true, debitKey: "現金" },
      { comment: "昨年度の貸倒れ分の回収なので「償却債権取立益」です。", highlight: "昨年度に貸倒れ処理した", credit: true, creditKey: "償却債権取立益" }
    ]
  },
  'cl_03': { 
    explanation: "引当金残高が十分ある場合は、全額を引当金から充当します。",
    steps: [
      { comment: "引当金残高が 50,000円 あり、貸倒れ額 30,000円 をカバーできるため、全額を「貸倒引当金」の減少で処理します。", highlight: "残高は 50,000円 ある", debit: true, debitKey: "貸倒引当金" },
      { comment: "回収不能となった「売掛金」を減らします。", highlight: "売掛金 30,000円 が貸倒れとなった", credit: true, creditKey: "売掛金" }
    ]
  },
  'cl_03b': { 
    explanation: "引当金残高が不足する場合、不足分は「貸倒損失」として計上します。",
    steps: [
      { comment: "まず、あるだけの「貸倒引当金」を使います。", highlight: "残高は 10,000円 しかない", debit: true, debitKey: "貸倒引当金" },
      { comment: "足りない 30,000円 は「貸倒損失」（費用）とします。", highlight: "不足分を貸倒損失とする", debit: true, debitKey: "貸倒損失" },
      { comment: "貸倒れた「売掛金」を全額減らします。", highlight: "売掛金 40,000円", credit: true, creditKey: "売掛金" }
    ]
  },
  'cl_04': { 
    explanation: "直接法なので資産科目（建物）を直接減らします。",
    steps: [
      { comment: "減価償却費を計算します。\n4,000,000 ÷ 40年 = 100,000円", highlight: "定額法", debit: true, debitKey: "減価償却費" },
      { comment: "直接法なので、「建物」の金額を直接減らします。", highlight: "直接法", credit: true, creditKey: "建物" }
    ]
  },
  'cl_04b': { 
    explanation: "間接法では、資産を減らさず「減価償却累計額」を使用します。",
    steps: [
      { comment: "減価償却費を計算します。\n5,000,000 ÷ 50年 = 100,000円", highlight: "定額法", debit: true, debitKey: "減価償却費" },
      { comment: "間接法なので、貸方は「減価償却累計額」とします。", highlight: "間接法", credit: true, creditKey: "減価償却累計額" }
    ]
  },
  'cl_05': { 
    explanation: "間接法の場合、貸方は「減価償却累計額」を使用します。",
    steps: [
      { comment: "600,000 ÷ 6年 = 100,000円 を費用計上します。", highlight: "定額法", debit: true, debitKey: "減価償却費" },
      { comment: "間接法なので「減価償却累計額」を増やします。", highlight: "間接法", credit: true, creditKey: "減価償却累計額" }
    ]
  },
  'cl_05b': { 
    explanation: "直接法では、資産科目（備品）を直接減らします。",
    steps: [
      { comment: "300,000 ÷ 5年 = 60,000円 を費用計上します。", highlight: "定額法", debit: true, debitKey: "減価償却費" },
      { comment: "直接法なので「備品」を直接減らします。", highlight: "直接法", credit: true, creditKey: "備品" }
    ]
  },
  'cl_05c': { 
    explanation: "車両運搬具の間接法による償却です。",
    steps: [
      { comment: "2,400,000 ÷ 6年 = 400,000円", highlight: "定額法", debit: true, debitKey: "減価償却費" },
      { comment: "間接法で記帳します。", highlight: "間接法", credit: true, creditKey: "減価償却累計額" }
    ]
  },
  'cl_05d': { 
    explanation: "期中取得の場合、使用した月数分だけ償却します（月割計算）。",
    steps: [
      { comment: "1年分の償却費：1,200,000 ÷ 5年 = 240,000円\n9ヶ月分：240,000 × 9/12 = 180,000円", highlight: "9ヶ月分の減価償却を行う", debit: true, debitKey: "減価償却費" },
      { comment: "間接法で記帳します。", highlight: "間接法", credit: true, creditKey: "減価償却累計額" }
    ]
  },
  'cl_06': { 
    explanation: "「し・くり・くり・し」の仕訳です。",
    steps: [
      { comment: "まず、期首商品を「仕入」勘定に振り替えます（費用化）。\n借方：仕入／貸方：繰越商品", highlight: "期首商品棚卸高 70,000円", debit: true, debitKey: "仕入" },
      { comment: "次に、売れ残った期末商品を「繰越商品」として資産計上し、「仕入」から控除します。\n借方：繰越商品／貸方：仕入", highlight: "期末商品棚卸高 80,000円", debit: true, debitKey: "繰越商品" }
    ]
  },
  'cl_06b': { 
    explanation: "金額が異なる場合の「し・くり・くり・し」です。",
    steps: [
      { comment: "期首分を仕入に振り替えます。\n借方：仕入 50,000", highlight: "期首商品棚卸高 50,000円", debit: true, debitKey: "仕入" },
      { comment: "期末分を資産計上します。\n借方：繰越商品 40,000", highlight: "期末商品棚卸高 40,000円", debit: true, debitKey: "繰越商品" }
    ]
  },
  'cl_06c': { 
    explanation: "売上原価の算定仕訳です。",
    steps: [
      { comment: "期首在庫を仕入コストに加算します。\n借：仕入 / 貸：繰越商品", highlight: "期首棚卸高 100,000円", debit: true, debitKey: "仕入" },
      { comment: "期末在庫を仕入コストから控除します。\n借：繰越商品 / 貸：仕入", highlight: "期末棚卸高 120,000円", debit: true, debitKey: "繰越商品" }
    ]
  },
  'cl_06d': { 
    explanation: "期首商品の振替仕訳（し・くり）のみです。",
    steps: [
      { comment: "期首商品を「仕入」に振り替えます。", highlight: "期首商品棚卸高...を仕入勘定に振り替える", debit: true, debitKey: "仕入" },
      { comment: "「繰越商品」を減らします。", highlight: "60,000円", credit: true, creditKey: "繰越商品" }
    ]
  },
  'cl_06e': { 
    explanation: "期末商品の計上仕訳（くり・し）のみです。",
    steps: [
      { comment: "期末商品を「繰越商品」として資産計上します。", highlight: "期末商品棚卸高...を繰越商品勘定に計上", debit: true, debitKey: "繰越商品" },
      { comment: "「仕入」を減らします。", highlight: "90,000円", credit: true, creditKey: "仕入" }
    ]
  },
  'cl_06f': { 
    explanation: "「し・くり・くり・し」のセット仕訳です。",
    steps: [
      { comment: "期首分：借）仕入 / 貸）繰越商品", highlight: "期首商品 20,000円", debit: true, debitKey: "仕入" },
      { comment: "期末分：借）繰越商品 / 貸）仕入", highlight: "期末商品 25,000円", debit: true, debitKey: "繰越商品" }
    ]
  },
  'cl_07': { 
    explanation: "費用の見越し計上です（未払費用の計上）。",
    steps: [
      { comment: "当期分の費用なのに未払いのものを計上します。\n「支払家賃」（費用）を増やします。", highlight: "家賃の未払分", debit: true, debitKey: "支払家賃" },
      { comment: "まだ払っていないので「未払家賃」（負債）とします。", highlight: "計上する", credit: true, creditKey: "未払家賃" }
    ]
  },
  'cl_08': { 
    explanation: "費用の繰延べです（前払費用の計上）。",
    steps: [
      { comment: "次期以降の分を払ってしまっているので、当期の費用から除外します。\n「支払地代」（費用）を減らします（貸方）。", highlight: "地代の前払分...を繰り延べる", credit: true, creditKey: "支払地代" },
      { comment: "資産として「前払地代」を計上します。", highlight: "前払分 15,000円", debit: true, debitKey: "前払地代" }
    ]
  },
  'cl_08b': { 
    explanation: "支払済みの費用のうち、次期以降の分を繰り延べます。",
    steps: [
      { comment: "「前払保険料」（資産）を計上します。", highlight: "前払分 12,000円", debit: true, debitKey: "前払保険料" },
      { comment: "当期の「保険料」（費用）を減らします。", highlight: "次期に繰り延べる", credit: true, creditKey: "保険料" }
    ]
  },
  'cl_09': { 
    explanation: "収益の見越しです（未収収益の計上）。",
    steps: [
      { comment: "当期の収益なのにまだ貰っていないものを計上します。\n「受取利息」（収益）を増やします。", highlight: "受取利息の未収分", credit: true, creditKey: "受取利息" },
      { comment: "後で貰える権利として「未収利息」（資産）とします。", highlight: "計上する", debit: true, debitKey: "未収利息" }
    ]
  },
  'cl_09b': { 
    explanation: "未収分の収益を計上する仕訳です。",
    steps: [
      { comment: "「未収家賃」（資産）を計上します。", highlight: "未収分 50,000円", debit: true, debitKey: "未収家賃" },
      { comment: "「受取家賃」（収益）を増やします。", highlight: "受取家賃", credit: true, creditKey: "受取家賃" }
    ]
  },
  'cl_10': { 
    explanation: "収益の繰延べです（前受収益の計上）。",
    steps: [
      { comment: "次期以降の分を先に貰ってしまっているので、当期の収益から除外します。\n「受取家賃」（収益）を減らします（借方）。", highlight: "受取家賃の前受分...を繰り延べる", debit: true, debitKey: "受取家賃" },
      { comment: "負債として「前受家賃」を計上します。", highlight: "前受分 25,000円", credit: true, creditKey: "前受家賃" }
    ]
  },
  'cl_11': { 
    explanation: "法人税等の確定処理です。仮払分を相殺し、不足分を未払法人税等とします。",
    steps: [
      { comment: "確定した税額を「法人税等」（費用）として計上します。", highlight: "150,000円 と計算された", debit: true, debitKey: "法人税等" },
      { comment: "すでに払っている「仮払法人税等」を相殺して消します。", highlight: "仮払法人税等...を差し引き", credit: true, creditKey: "仮払法人税等" },
      { comment: "足りない分は「未払法人税等」（負債）とします。", highlight: "残額を未払計上する", credit: true, creditKey: "未払法人税等" }
    ]
  },
  'cl_11b': { 
    explanation: "確定した未払法人税等を納付する仕訳です。",
    steps: [
      { comment: "未払金を支払うので「未払法人税等」を減らします。", highlight: "未払法人税等...を", debit: true, debitKey: "未払法人税等" },
      { comment: "現金で支払ったので「現金」を減らします。", highlight: "現金で納付した", credit: true, creditKey: "現金" }
    ]
  },
  'cl_12': { 
    explanation: "未使用の切手や収入印紙は、決算時に「貯蔵品」（資産）に振り替えます。",
    steps: [
      { comment: "未使用分は資産価値があるので「貯蔵品」（資産）とします。", highlight: "未使用分 2,000円 を貯蔵品に", debit: true, debitKey: "貯蔵品" },
      { comment: "使っていない分だけ「通信費」（費用）を減らします。", highlight: "郵便切手の未使用分", credit: true, creditKey: "通信費" }
    ]
  },
  'cl_12b': { 
    explanation: "未使用の印紙も「貯蔵品」として資産計上します。",
    steps: [
      { comment: "「貯蔵品」を計上します。", highlight: "未使用分 1,000円", debit: true, debitKey: "貯蔵品" },
      { comment: "収入印紙代である「租税公課」（費用）を減らします。", highlight: "収入印紙の未使用分", credit: true, creditKey: "租税公課" }
    ]
  },
  'cl_13': { 
    explanation: "仮受消費税と仮払消費税を相殺し、納付額を未払消費税として計上します。",
    steps: [
      { comment: "預かっていた「仮受消費税」（負債）を借方にして消します。", highlight: "仮受消費税は 80,000円", debit: true, debitKey: "仮受消費税" },
      { comment: "支払っていた「仮払消費税」（資産）を貸方にして消します。", highlight: "仮払消費税は 50,000円", credit: true, creditKey: "仮払消費税" },
      { comment: "差額（納めるべき税額）を「未払消費税」とします。", highlight: "差額を未払消費税とする", credit: true, creditKey: "未払消費税" }
    ]
  },
  'cl_13b': { 
    explanation: "仮払消費税の方が多い場合は、還付されるため「未収消費税」となります。",
    steps: [
      { comment: "「仮受消費税」を消します。", highlight: "仮受消費税 30,000円", debit: true, debitKey: "仮受消費税" },
      { comment: "「仮払消費税」を消します。", highlight: "仮払消費税が 40,000円", credit: true, creditKey: "仮払消費税" },
      { comment: "払いすぎている分は戻ってくるので「未収消費税」（資産）とします。", highlight: "差額を未収消費税とする", debit: true, debitKey: "未収消費税" }
    ]
  },
  'cl_14': { 
    explanation: "当期純利益を繰越利益剰余金勘定に振り替えます（株式会社の処理）。",
    steps: [
      { comment: "「損益」勘定の借方に利益額を記入して、損益勘定を締め切ります。", highlight: "当期純利益 200,000円", debit: true, debitKey: "損益" },
      { comment: "その利益を「繰越利益剰余金」（純資産）に加算します。", highlight: "繰越利益剰余金勘定に振り替える", credit: true, creditKey: "繰越利益剰余金" }
    ]
  }
};
