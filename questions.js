
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Question Definitions
 */

const RAW_QUESTIONS = [
  // ==========================================
  // 1. CASH & SAVINGS
  // ==========================================
  {
    id: 'cs_01', major: 'cash_savings', sub: 'cash_basic',
    text: "現金 1,000,000円 を元入れして営業を開始した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 1000000 }], credit: [{ accountName: "資本金", amount: 1000000 }] },
    choices: ["現金", "資本金", "借入金", "当座預金"],
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
    text: "売掛金の回収として、以前に当店が振り出した小切手 40,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 40000 }], credit: [{ accountName: "売掛金", amount: 40000 }] },
    choices: ["当座預金", "現金", "売掛金", "受取手形"],
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
    mutate: (q) => {
      const diff = Randomizer.getAmount(1000, 0.3, 100);
      q.text = `現金の実際有高が帳簿より ${Randomizer.fmt(diff)}円 多かった。原因不明のため適切に処理する。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: diff }], credit: [{ accountName: "現金過不足", amount: diff }] };
      q.explanationSteps = [{highlight:"多かった", entries:[{side:'debit',account:'現金',amount:diff}]}];
      return q;
    }
  },

  // ==========================================
  // 2. MERCHANDISE
  // ==========================================
  {
    id: 'md_01', major: 'merchandise', sub: 'trade_basic',
    text: "商品 400,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 400000 }], credit: [{ accountName: "買掛金", amount: 400000 }] },
    choices: ["仕入", "買掛金", "売掛金", "現金"],
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
    mutate: (q) => {
      const amt = Randomizer.getAmount(12000, 0.3, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は共通商品券で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "商品券", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
      q.explanationSteps = [{highlight:"商品券", entries:[{side:'debit',account:'商品券',amount:amt}]}];
      return q;
    }
  },

  // ==========================================
  // 3. NOTES
  // ==========================================
  {
    id: 'nt_01', major: 'notes', sub: 'notes_trade',
    text: "買掛金 250,000円 の支払いとして、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 250000 }], credit: [{ accountName: "支払手形", amount: 250000 }] },
    choices: ["買掛金", "支払手形", "当座預金", "受取手形"],
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
  // 4. ASSETS & EXPENSES
  // ==========================================
  {
    id: 'ae_01', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用のパソコン 160,000円 を購入し、代金は翌月払いとした。",
    correctEntries: { debit: [{ accountName: "備品", amount: 160000 }], credit: [{ accountName: "未払金", amount: 160000 }] },
    choices: ["備品", "未払金", "買掛金", "仕入"],
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
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.2, 1000);
      q.text = `従業員の給料 ${Randomizer.fmt(amt)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "給料", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      q.explanationSteps = [{highlight:"給料", entries:[{side:'debit',account:'給料',amount:amt}]}];
      return q;
    }
  },

  // ==========================================
  // 5. CLOSING
  // ==========================================
  {
    id: 'cl_01', major: 'closing', sub: 'bad_debts',
    text: "決算につき、売掛金残高 1,500,000円 に対し 2% の貸倒引当金を設定する。残高は 10,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金繰入", amount: 20000 }], credit: [{ accountName: "貸倒引当金", amount: 20000 }] },
    choices: ["貸倒引当金繰入", "貸倒引当金", "売掛金", "貸倒損失"],
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
    mutate: (q) => {
      const profit = Randomizer.getAmount(200000, 0.5, 10000);
      q.text = `当期純利益 ${Randomizer.fmt(profit)}円 を資本金勘定に振り替える。`;
      q.correctEntries = { debit: [{ accountName: "損益", amount: profit }], credit: [{ accountName: "資本金", amount: profit }] };
      q.explanationSteps = [{highlight:"資本金勘定に振り替える", entries:[{side:'debit',account:'損益',amount:profit}, {side:'credit',account:'資本金',amount:profit}]}];
      return q;
    }
  }
];
