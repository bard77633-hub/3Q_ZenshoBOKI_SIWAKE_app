
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Question Definitions - Complete Version v2.1
 */

const RAW_QUESTIONS = [
  // --- 1. CASH & SAVINGS ---
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
    id: 'cs_01b', major: 'cash_savings', sub: 'cash_basic',
    text: "家賃 50,000円 を、送金小切手で受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 50000 }], credit: [{ accountName: "受取家賃", amount: 50000 }] },
    choices: ["現金", "受取家賃", "当座預金", "雑益"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `家賃 ${Randomizer.fmt(amt)}円 を、送金小切手で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "受取家賃", amount: amt }] };
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
    id: 'cs_02b', major: 'cash_savings', sub: 'cash_basic',
    text: "貸付金の利息 2,000円 を、他人振出小切手で受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 2000 }], credit: [{ accountName: "受取利息", amount: 2000 }] },
    choices: ["現金", "受取利息", "当座預金", "雑益"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(2000, 0.5, 100);
      q.text = `貸付金の利息 ${Randomizer.fmt(amt)}円 を、他人振出小切手で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "受取利息", amount: amt }] };
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
    id: 'cs_03b', major: 'cash_savings', sub: 'cash_basic',
    text: "商品 15,000円 を売り上げ、代金は郵便為替証書で受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 15000 }], credit: [{ accountName: "売上", amount: 15000 }] },
    choices: ["現金", "売上", "当座預金", "受取手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(15000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は郵便為替証書で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
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
    id: 'cs_04b', major: 'cash_savings', sub: 'checking',
    text: "売掛金 200,000円 が、得意先より当座預金口座に振り込まれた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 200000 }], credit: [{ accountName: "売掛金", amount: 200000 }] },
    choices: ["当座預金", "売掛金", "現金", "受取手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.3, 1000);
      q.text = `売掛金 ${Randomizer.fmt(amt)}円 が、得意先より当座預金口座に振り込まれた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_04c', major: 'cash_savings', sub: 'checking',
    text: "銀行から 1,000,000円 を借り入れ、全額が当座預金口座に振り込まれた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 1000000 }], credit: [{ accountName: "借入金", amount: 1000000 }] },
    choices: ["当座預金", "借入金", "現金", "手形借入金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000000, 0.2, 100000);
      q.text = `銀行から ${Randomizer.fmt(amt)}円 を借り入れ、全額が当座預金口座に振り込まれた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "借入金", amount: amt }] };
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
    id: 'cs_05b', major: 'cash_savings', sub: 'checking',
    text: "水道光熱費 15,000円 が、当座預金口座から引き落とされた。",
    correctEntries: { debit: [{ accountName: "水道光熱費", amount: 15000 }], credit: [{ accountName: "当座預金", amount: 15000 }] },
    choices: ["水道光熱費", "当座預金", "現金", "通信費"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(15000, 0.2, 1000);
      q.text = `水道光熱費 ${Randomizer.fmt(amt)}円 が、当座預金口座から引き落とされた。`;
      q.correctEntries = { debit: [{ accountName: "水道光熱費", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
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
    id: 'cs_07b', major: 'cash_savings', sub: 'petty_cash',
    text: "小口現金を増額するため、小切手 20,000円 を振り出して小口係に手渡した。",
    correctEntries: { debit: [{ accountName: "小口現金", amount: 20000 }], credit: [{ accountName: "当座預金", amount: 20000 }] },
    choices: ["小口現金", "当座預金", "現金", "雑費"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(20000, 0.2, 1000);
      q.text = `小口現金を増額するため、小切手 ${Randomizer.fmt(amt)}円 を振り出して小口係に手渡した。`;
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
    id: 'cs_08b', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係より、通信費 2,000円、雑費 1,000円 の支払報告を受けた（補給は行っていない）。",
    correctEntries: { debit: [{ accountName: "通信費", amount: 2000 }, { accountName: "雑費", amount: 1000 }], credit: [{ accountName: "小口現金", amount: 3000 }] },
    choices: ["通信費", "雑費", "小口現金", "当座預金"],
    mutate: (q) => {
      const v1 = Randomizer.getAmount(2000, 0.2, 100);
      const v2 = Randomizer.getAmount(1000, 0.2, 100);
      const total = v1 + v2;
      q.text = `小口係より、通信費 ${Randomizer.fmt(v1)}円、雑費 ${Randomizer.fmt(v2)}円 の支払報告を受けた（補給は行っていない）。`;
      q.correctEntries = { debit: [{ accountName: "通信費", amount: v1 }, { accountName: "雑費", amount: v2 }], credit: [{ accountName: "小口現金", amount: total }] };
      return q;
    }
  },
  {
    id: 'cs_08c', major: 'cash_savings', sub: 'petty_cash',
    text: "小口係より、旅費交通費 5,000円 の支払報告を受け、直ちに同額の小切手を振り出して補給した。",
    correctEntries: { debit: [{ accountName: "旅費交通費", amount: 5000 }], credit: [{ accountName: "当座預金", amount: 5000 }] },
    choices: ["旅費交通費", "当座預金", "小口現金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(5000, 0.2, 100);
      q.text = `小口係より、旅費交通費 ${Randomizer.fmt(amt)}円 の支払報告を受け、直ちに同額の小切手を振り出して補給した。`;
      q.correctEntries = { debit: [{ accountName: "旅費交通費", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_08d', major: 'cash_savings', sub: 'petty_cash',
    text: "定額資金前渡法を廃止し、手元の小口現金残高 20,000円 を当座預金に預け入れた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 20000 }], credit: [{ accountName: "小口現金", amount: 20000 }] },
    choices: ["当座預金", "小口現金", "現金", "雑損"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(20000, 0.2, 1000);
      q.text = `定額資金前渡法を廃止し、手元の小口現金残高 ${Randomizer.fmt(amt)}円 を当座預金に預け入れた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: amt }], credit: [{ accountName: "小口現金", amount: amt }] };
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
    id: 'cs_09b', major: 'cash_savings', sub: 'short_over',
    text: "決算において、現金過不足（借方残高） 1,000円 の原因が不明のため、雑損として処理する。",
    correctEntries: { debit: [{ accountName: "雑損", amount: 1000 }], credit: [{ accountName: "現金過不足", amount: 1000 }] },
    choices: ["雑損", "現金過不足", "雑益", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000, 0.5, 100);
      q.text = `決算において、現金過不足（借方残高） ${Randomizer.fmt(amt)}円 の原因が不明のため、雑損として処理する。`;
      q.correctEntries = { debit: [{ accountName: "雑損", amount: amt }], credit: [{ accountName: "現金過不足", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_09c', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高が帳簿より 500円 少なかった。調査の結果、通信費の記入漏れと判明した。",
    correctEntries: { debit: [{ accountName: "通信費", amount: 500 }], credit: [{ accountName: "現金", amount: 500 }] },
    choices: ["通信費", "現金", "現金過不足", "雑損"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(500, 0.2, 100);
      q.text = `現金の実際有高が帳簿より ${Randomizer.fmt(amt)}円 少なかった。調査の結果、通信費の記入漏れと判明した。`;
      q.correctEntries = { debit: [{ accountName: "通信費", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
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
  {
    id: 'cs_10b', major: 'cash_savings', sub: 'short_over',
    text: "決算において、現金過不足（貸方残高） 2,000円 の原因が不明のため、雑益として処理する。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 2000 }], credit: [{ accountName: "雑益", amount: 2000 }] },
    choices: ["現金過不足", "雑益", "雑損", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(2000, 0.5, 100);
      q.text = `決算において、現金過不足（貸方残高） ${Randomizer.fmt(amt)}円 の原因が不明のため、雑益として処理する。`;
      q.correctEntries = { debit: [{ accountName: "現金過不足", amount: amt }], credit: [{ accountName: "雑益", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cs_10c', major: 'cash_savings', sub: 'short_over',
    text: "現金の実際有高が帳簿より 3,000円 多かった。調査の結果、受取手数料の記入漏れと判明した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 3000 }], credit: [{ accountName: "受取手数料", amount: 3000 }] },
    choices: ["現金", "受取手数料", "現金過不足", "雑益"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(3000, 0.2, 100);
      q.text = `現金の実際有高が帳簿より ${Randomizer.fmt(amt)}円 多かった。調査の結果、受取手数料の記入漏れと判明した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "受取手数料", amount: amt }] };
      return q;
    }
  },

  // --- 2. MERCHANDISE ---
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
    id: 'md_01b', major: 'merchandise', sub: 'trade_basic',
    text: "東京商店より商品 300,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 300000 }], credit: [{ accountName: "買掛金", amount: 300000 }] },
    choices: ["仕入", "買掛金", "売掛金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.3, 1000);
      q.text = `東京商店より商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は掛けとした。`;
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
    id: 'md_02b', major: 'merchandise', sub: 'trade_basic',
    text: "大阪商店へ商品 500,000円 を売り上げ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 500000 }], credit: [{ accountName: "売上", amount: 500000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(500000, 0.3, 1000);
      q.text = `大阪商店へ商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は掛けとした。`;
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
    id: 'md_05b', major: 'merchandise', sub: 'returns_discounts',
    text: "以前に掛けで仕入れた商品の一部（10,000円）を品違いのため返送した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 10000 }], credit: [{ accountName: "仕入", amount: 10000 }] },
    choices: ["買掛金", "仕入", "現金", "売掛金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(10000, 0.2, 1000);
      q.text = `以前に掛けで仕入れた商品の一部（${Randomizer.fmt(amt)}円）を品違いのため返送した。`;
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
    id: 'md_06b', major: 'merchandise', sub: 'returns_discounts',
    text: "得意先より、掛け売上商品の一部（12,000円）について返品の申し出があり、これを受け入れた。",
    correctEntries: { debit: [{ accountName: "売上", amount: 12000 }], credit: [{ accountName: "売掛金", amount: 12000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(12000, 0.2, 1000);
      q.text = `得意先より、掛け売上商品の一部（${Randomizer.fmt(amt)}円）について返品の申し出があり、これを受け入れた。`;
      q.correctEntries = { debit: [{ accountName: "売上", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_13', major: 'merchandise', sub: 'returns_discounts',
    text: "掛けで仕入れた商品に傷があったため、代金から 2,000円 の値引きを受けた。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 2000 }], credit: [{ accountName: "仕入", amount: 2000 }] },
    choices: ["買掛金", "仕入", "現金", "売掛金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(2000, 0.2, 100);
      q.text = `掛けで仕入れた商品に傷があったため、代金から ${Randomizer.fmt(amt)}円 の値引きを受けた。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "仕入", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_14', major: 'merchandise', sub: 'returns_discounts',
    text: "掛けで売り上げた商品に汚れがあったため、代金から 3,000円 を値引きした。",
    correctEntries: { debit: [{ accountName: "売上", amount: 3000 }], credit: [{ accountName: "売掛金", amount: 3000 }] },
    choices: ["売上", "売掛金", "仕入", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(3000, 0.2, 100);
      q.text = `掛けで売り上げた商品に汚れがあったため、代金から ${Randomizer.fmt(amt)}円 を値引きした。`;
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
    id: 'md_07b', major: 'merchandise', sub: 'advance',
    text: "商品 100,000円 を注文し、内金として 20,000円 を小切手を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 20000 }], credit: [{ accountName: "当座預金", amount: 20000 }] },
    choices: ["前払金", "当座預金", "買掛金", "仕入"],
    mutate: (q) => {
      const total = Randomizer.getAmount(100000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(total)}円 を注文し、内金として ${Randomizer.fmt(adv)}円 を小切手を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "前払金", amount: adv }], credit: [{ accountName: "当座預金", amount: adv }] };
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
    id: 'md_08b', major: 'merchandise', sub: 'advance',
    text: "商品 200,000円 の注文を受け、内金として 40,000円 を現金で受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 40000 }], credit: [{ accountName: "前受金", amount: 40000 }] },
    choices: ["現金", "前受金", "売上", "売掛金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(200000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(total)}円 の注文を受け、内金として ${Randomizer.fmt(adv)}円 を現金で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: adv }], credit: [{ accountName: "前受金", amount: adv }] };
      return q;
    }
  },
  {
    id: 'md_08c', major: 'merchandise', sub: 'advance',
    text: "注文していた商品 150,000円 を受け取り、代金は支払っていた内金 30,000円 を差し引き、残額を掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 150000 }], credit: [{ accountName: "前払金", amount: 30000 }, { accountName: "買掛金", amount: 120000 }] },
    choices: ["仕入", "前払金", "買掛金", "現金"],
    mutate: (q) => {
      const total = Randomizer.getAmount(150000, 0.2, 1000);
      const adv = Randomizer.round(total * 0.2, 1000);
      const bal = total - adv;
      q.text = `注文していた商品 ${Randomizer.fmt(total)}円 を受け取り、代金は支払っていた内金 ${Randomizer.fmt(adv)}円 を差し引き、残額を掛けとした。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: total }], credit: [{ accountName: "前払金", amount: adv }, { accountName: "買掛金", amount: bal }] };
      return q;
    }
  },
  {
    id: 'md_08d', major: 'merchandise', sub: 'advance',
    text: "営業用トラックを注文し、手付金 300,000円 を小切手を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 300000 }], credit: [{ accountName: "当座預金", amount: 300000 }] },
    choices: ["前払金", "当座預金", "車両運搬具", "未払金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.1, 10000);
      q.text = `営業用トラックを注文し、手付金 ${Randomizer.fmt(amt)}円 を小切手を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "前払金", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
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
    id: 'md_09b', major: 'merchandise', sub: 'shipping',
    text: "商品を売り上げ、代金 50,000円 は掛けとした。なお、発送運賃（当社負担）1,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 50000 }, { accountName: "発送費", amount: 1000 }], credit: [{ accountName: "売上", amount: 50000 }, { accountName: "現金", amount: 1000 }] },
    choices: ["売掛金", "発送費", "売上", "現金"],
    mutate: (q) => {
      const goods = Randomizer.getAmount(50000, 0.2, 1000);
      const ship = 1000;
      q.text = `商品を売り上げ、代金 ${Randomizer.fmt(goods)}円 は掛けとした。なお、発送運賃（当社負担）${Randomizer.fmt(ship)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: goods }, { accountName: "発送費", amount: ship }], credit: [{ accountName: "売上", amount: goods }, { accountName: "現金", amount: ship }] };
      return q;
    }
  },
  {
    id: 'md_09c', major: 'merchandise', sub: 'shipping',
    text: "商品発送のための運賃（当社負担）2,500円 を小切手を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "発送費", amount: 2500 }], credit: [{ accountName: "当座預金", amount: 2500 }] },
    choices: ["発送費", "当座預金", "売上", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(2500, 0.2, 100);
      q.text = `商品発送のための運賃（当社負担）${Randomizer.fmt(amt)}円 を小切手を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "発送費", amount: amt }], credit: [{ accountName: "当座預金", amount: amt }] };
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
  {
    id: 'md_10b', major: 'merchandise', sub: 'shipping',
    text: "先方負担の発送運賃 1,500円 を現金で立て替えた。（「立替金」勘定を使用する）",
    correctEntries: { debit: [{ accountName: "立替金", amount: 1500 }], credit: [{ accountName: "現金", amount: 1500 }] },
    choices: ["立替金", "現金", "売掛金", "発送費"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(1500, 0.2, 100);
      q.text = `先方負担の発送運賃 ${Randomizer.fmt(amt)}円 を現金で立て替えた。（「立替金」勘定を使用する）`;
      q.correctEntries = { debit: [{ accountName: "立替金", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_10c', major: 'merchandise', sub: 'shipping',
    text: "商品を仕入れ、代金 60,000円 は掛けとした。なお、引取運賃（当社負担）2,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 62000 }], credit: [{ accountName: "買掛金", amount: 60000 }, { accountName: "現金", amount: 2000 }] },
    choices: ["仕入", "買掛金", "現金", "発送費"],
    mutate: (q) => {
      const goods = Randomizer.getAmount(60000, 0.2, 1000);
      const ship = 2000;
      const totalCost = goods + ship;
      q.text = `商品を仕入れ、代金 ${Randomizer.fmt(goods)}円 は掛けとした。なお、引取運賃（当社負担）${Randomizer.fmt(ship)}円 を現金で支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: totalCost }], credit: [{ accountName: "買掛金", amount: goods }, { accountName: "現金", amount: ship }] };
      return q;
    }
  },
  {
    id: 'md_11', major: 'merchandise', sub: 'other_pay',
    text: "商品 45,000円 を売り上げ、代金は全額クレジットカード払い（信販会社への債権）となった。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 45000 }], credit: [{ accountName: "売上", amount: 45000 }] },
    aliases: { debit: [{"売掛金": ["クレジット売掛金"]}] },
    choices: ["売掛金", "売上", "クレジット売掛金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(45000, 0.2, 1000);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を売り上げ、代金は全額クレジットカード払い（信販会社への債権）となった。`;
      q.correctEntries = { debit: [{ accountName: "売掛金", amount: amt }], credit: [{ accountName: "売上", amount: amt }] };
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
  },
  {
    id: 'md_11c', major: 'merchandise', sub: 'other_pay',
    text: "商品 30,000円 を売り上げ、代金のうち 10,000円 は共通商品券で受け取り、残額は現金で受け取った。",
    correctEntries: { debit: [{ accountName: "商品券", amount: 10000 }, { accountName: "現金", amount: 20000 }], credit: [{ accountName: "売上", amount: 30000 }] },
    choices: ["商品券", "現金", "売上", "受取手形"],
    mutate: (q) => {
      const total = Randomizer.getAmount(30000, 0.2, 1000);
      const gift = 10000;
      const cash = total - gift;
      q.text = `商品 ${Randomizer.fmt(total)}円 を売り上げ、代金のうち ${Randomizer.fmt(gift)}円 は共通商品券で受け取り、残額は現金で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "商品券", amount: gift }, { accountName: "現金", amount: cash }], credit: [{ accountName: "売上", amount: total }] };
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
      return q;
    }
  },
  {
    id: 'md_12b', major: 'merchandise', sub: 'other_pay',
    text: "商品 5,000円 を仕入れ、代金は手持ちの共通商品券で支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 5000 }], credit: [{ accountName: "商品券", amount: 5000 }] },
    choices: ["仕入", "商品券", "現金", "買掛金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(5000, 0.2, 100);
      q.text = `商品 ${Randomizer.fmt(amt)}円 を仕入れ、代金は手持ちの共通商品券で支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "商品券", amount: amt }] };
      return q;
    }
  },
  {
    id: 'md_12c', major: 'merchandise', sub: 'other_pay',
    text: "所有する商品券 50,000円 を精算し、現金を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 50000 }], credit: [{ accountName: "商品券", amount: 50000 }] },
    choices: ["現金", "商品券", "当座預金", "売上"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `所有する商品券 ${Randomizer.fmt(amt)}円 を精算し、現金を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "商品券", amount: amt }] };
      return q;
    }
  },

  // --- 3. NOTES ---
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
    id: 'nt_02', major: 'notes', sub: 'notes_trade',
    text: "売掛金 350,000円 の回収として、得意先振出しの約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 350000 }], credit: [{ accountName: "売掛金", amount: 350000 }] },
    choices: ["受取手形", "売掛金", "支払手形", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(350000, 0.2, 1000);
      q.text = `売掛金 ${Randomizer.fmt(amt)}円 の回収として、得意先振出しの約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "受取手形", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'nt_01b', major: 'notes', sub: 'notes_trade',
    text: "仕入先に対する買掛金 100,000円 について、約束手形を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 100000 }], credit: [{ accountName: "支払手形", amount: 100000 }] },
    choices: ["買掛金", "支払手形", "当座預金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(100000, 0.2, 1000);
      q.text = `仕入先に対する買掛金 ${Randomizer.fmt(amt)}円 について、約束手形を振り出して支払った。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "支払手形", amount: amt }] };
      return q;
    }
  },
  {
    id: 'nt_02b', major: 'notes', sub: 'notes_trade',
    text: "得意先より、売掛金の支払いとして約束手形 200,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 200000 }], credit: [{ accountName: "売掛金", amount: 200000 }] },
    choices: ["受取手形", "売掛金", "現金", "支払手形"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.2, 1000);
      q.text = `得意先より、売掛金の支払いとして約束手形 ${Randomizer.fmt(amt)}円 を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "受取手形", amount: amt }], credit: [{ accountName: "売掛金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'nt_09', major: 'notes', sub: 'notes_transfer',
    text: "買掛金 150,000円 の支払いとして、所有する約束手形を裏書譲渡した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 150000 }], credit: [{ accountName: "受取手形", amount: 150000 }] },
    choices: ["買掛金", "受取手形", "支払手形", "当座預金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(150000, 0.2, 1000);
      q.text = `買掛金 ${Randomizer.fmt(amt)}円 の支払いとして、所有する約束手形を裏書譲渡した。`;
      q.correctEntries = { debit: [{ accountName: "買掛金", amount: amt }], credit: [{ accountName: "受取手形", amount: amt }] };
      return q;
    }
  },
  {
    id: 'nt_09b', major: 'notes', sub: 'notes_transfer',
    text: "備品 300,000円 を購入し、代金は所有する約束手形を裏書譲渡した。",
    correctEntries: { debit: [{ accountName: "備品", amount: 300000 }], credit: [{ accountName: "受取手形", amount: 300000 }] },
    choices: ["備品", "受取手形", "支払手形", "当座預金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(300000, 0.2, 1000);
      q.text = `備品 ${Randomizer.fmt(amt)}円 を購入し、代金は所有する約束手形を裏書譲渡した。`;
      q.correctEntries = { debit: [{ accountName: "備品", amount: amt }], credit: [{ accountName: "受取手形", amount: amt }] };
      return q;
    }
  },
  {
    id: 'nt_09c', major: 'notes', sub: 'notes_transfer',
    text: "商品を仕入れ、代金 80,000円 は所有する約束手形を裏書譲渡して支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 80000 }], credit: [{ accountName: "受取手形", amount: 80000 }] },
    choices: ["仕入", "受取手形", "支払手形", "買掛金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(80000, 0.2, 1000);
      q.text = `商品を仕入れ、代金 ${Randomizer.fmt(amt)}円 は所有する約束手形を裏書譲渡して支払った。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "受取手形", amount: amt }] };
      return q;
    }
  },
  {
    id: 'nt_10', major: 'notes', sub: 'notes_transfer',
    text: "約束手形 300,000円 を取引銀行で割り引き、割引料 5,000円 を差し引かれた残額を当座預金とした。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 295000 }, { accountName: "手形売却損", amount: 5000 }], credit: [{ accountName: "受取手形", amount: 300000 }] },
    choices: ["当座預金", "手形売却損", "受取手形", "支払利息"],
    mutate: (q) => {
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
  {
    id: 'nt_10c', major: 'notes', sub: 'notes_transfer',
    text: "借入金の返済として、所有する約束手形 200,000円 を裏書譲渡した。",
    correctEntries: { debit: [{ accountName: "借入金", amount: 200000 }], credit: [{ accountName: "受取手形", amount: 200000 }] },
    choices: ["借入金", "受取手形", "支払手形", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(200000, 0.2, 1000);
      q.text = `借入金の返済として、所有する約束手形 ${Randomizer.fmt(amt)}円 を裏書譲渡した。`;
      q.correctEntries = { debit: [{ accountName: "借入金", amount: amt }], credit: [{ accountName: "受取手形", amount: amt }] };
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
      return q;
    }
  },
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
  {
    id: 'nt_08', major: 'notes', sub: 'loan_notes',
    text: "手形貸付金 300,000円 が期日となり、利息 3,000円 とともに現金で回収した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 303000 }], credit: [{ accountName: "手形貸付金", amount: 300000 }, { accountName: "受取利息", amount: 3000 }] },
    choices: ["現金", "手形貸付金", "受取利息", "当座預金"],
    mutate: (q) => {
      const principal = Randomizer.getAmount(300000, 0.2, 10000);
      const rate = 0.01 + (Math.floor(Math.random() * 4) * 0.005);
      const interest = Math.round(principal * rate);
      const total = principal + interest;
      q.text = `手形貸付金 ${Randomizer.fmt(principal)}円 が期日となり、利息 ${Randomizer.fmt(interest)}円 とともに現金で回収した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: total }], credit: [{ accountName: "手形貸付金", amount: principal }, { accountName: "受取利息", amount: interest }] };
      return q;
    }
  },
  {
    id: 'nt_07b', major: 'notes', sub: 'loan_notes',
    text: "借入金 100,000円 の支払いとして、約束手形を振り出した。",
    correctEntries: { debit: [{ accountName: "借入金", amount: 100000 }], credit: [{ accountName: "手形借入金", amount: 100000 }] },
    choices: ["借入金", "手形借入金", "支払手形", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(100000, 0.2, 1000);
      q.text = `借入金 ${Randomizer.fmt(amt)}円 の支払いとして、約束手形を振り出した。`;
      q.correctEntries = { debit: [{ accountName: "借入金", amount: amt }], credit: [{ accountName: "手形借入金", amount: amt }] };
      return q;
    }
  },
  {
    id: 'nt_08b', major: 'notes', sub: 'loan_notes',
    text: "従業員への貸付金 50,000円 について、約束手形を受け取った。",
    correctEntries: { debit: [{ accountName: "手形貸付金", amount: 50000 }], credit: [{ accountName: "貸付金", amount: 50000 }] },
    choices: ["手形貸付金", "貸付金", "受取手形", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `従業員への貸付金 ${Randomizer.fmt(amt)}円 について、約束手形を受け取った。`;
      q.correctEntries = { debit: [{ accountName: "手形貸付金", amount: amt }], credit: [{ accountName: "貸付金", amount: amt }] };
      return q;
    }
  },

  // --- 4. ASSETS & EXPENSES ---
  {
    id: 'ae_01', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用のパソコン 160,000円 を購入し、代金は翌月払いとした。",
    correctEntries: { debit: [{ accountName: "備品", amount: 160000 }], credit: [{ accountName: "未払金", amount: 160000 }] },
    choices: ["備品", "未払金", "買掛金", "仕入"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(160000, 0.2, 1000);
      q.text = `営業用のパソコン ${Randomizer.fmt(amt)}円 を購入し、代金は翌月払いとした。`;
      q.correctEntries = { debit: [{ accountName: "備品", amount: amt }], credit: [{ accountName: "未払金", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'ae_04b', major: 'assets_expenses', sub: 'fixed_assets',
    text: "所有する土地（帳簿価額 5,000,000円）を 6,000,000円 で売却し、代金は当座預金に振り込まれた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 6000000 }], credit: [{ accountName: "土地", amount: 5000000 }, { accountName: "固定資産売却益", amount: 1000000 }] },
    choices: ["当座預金", "土地", "固定資産売却益", "未収金"],
    mutate: (q) => {
      const bookVal = Randomizer.getAmount(5000000, 0.1, 100000);
      const sellVal = Randomizer.round(bookVal * 1.2, 100000);
      const profit = sellVal - bookVal;
      q.text = `所有する土地（帳簿価額 ${Randomizer.fmt(bookVal)}円）を ${Randomizer.fmt(sellVal)}円 で売却し、代金は当座預金に振り込まれた。`;
      q.correctEntries = { debit: [{ accountName: "当座預金", amount: sellVal }], credit: [{ accountName: "土地", amount: bookVal }, { accountName: "固定資産売却益", amount: profit }] };
      return q;
    }
  },
  {
    id: 'ae_04c', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用車両（帳簿価額 800,000円）を 500,000円 で売却し、代金は現金で受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 500000 }, { accountName: "固定資産売却損", amount: 300000 }], credit: [{ accountName: "車両運搬具", amount: 800000 }] },
    choices: ["現金", "固定資産売却損", "車両運搬具", "雑損"],
    mutate: (q) => {
      const bookVal = Randomizer.getAmount(800000, 0.1, 10000);
      const sellVal = Randomizer.round(bookVal * 0.6, 10000);
      const loss = bookVal - sellVal;
      q.text = `営業用車両（帳簿価額 ${Randomizer.fmt(bookVal)}円）を ${Randomizer.fmt(sellVal)}円 で売却し、代金は現金で受け取った。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: sellVal }, { accountName: "固定資産売却損", amount: loss }], credit: [{ accountName: "車両運搬具", amount: bookVal }] };
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
      return q;
    }
  },
  {
    id: 'ae_10', major: 'assets_expenses', sub: 'expenses',
    text: "事務用消耗品 10,000円 を購入し、代金は来月末払いとした。",
    correctEntries: { debit: [{ accountName: "消耗品費", amount: 10000 }], credit: [{ accountName: "未払金", amount: 10000 }] },
    choices: ["消耗品費", "未払金", "買掛金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(10000, 0.2, 1000);
      q.text = `事務用消耗品 ${Randomizer.fmt(amt)}円 を購入し、代金は来月末払いとした。`;
      q.correctEntries = { debit: [{ accountName: "消耗品費", amount: amt }], credit: [{ accountName: "未払金", amount: amt }] };
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
      return q;
    }
  },

  // --- 5. CLOSING ---
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
  {
    id: 'cl_01b', major: 'closing', sub: 'bad_debts',
    text: "決算につき、売掛金残高 1,000,000円 に対し 2% の貸倒引当金を設定する。残高は 25,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金", amount: 5000 }], credit: [{ accountName: "貸倒引当金戻入", amount: 5000 }] },
    choices: ["貸倒引当金", "貸倒引当金戻入", "貸倒引当金繰入", "売掛金"],
    mutate: (q) => {
      const receivables = Randomizer.getAmount(1000000, 0.1, 10000);
      const rate = 0.02; 
      const target = Math.round(receivables * rate); 
      const balance = target + 5000; 
      const entryAmt = balance - target; 
      q.text = `決算につき、売掛金残高 ${Randomizer.fmt(receivables)}円 に対し 2% の貸倒引当金を設定する。残高は ${Randomizer.fmt(balance)}円 である（差額補充法）。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金", amount: entryAmt }], credit: [{ accountName: "貸倒引当金戻入", amount: entryAmt }] };
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
      return q;
    }
  },
  {
    id: 'cl_02b', major: 'closing', sub: 'bad_debts',
    text: "昨年度に貸倒れ処理した売掛金 10,000円 を、小切手で回収した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 10000 }], credit: [{ accountName: "償却債権取立益", amount: 10000 }] },
    choices: ["現金", "償却債権取立益", "当座預金", "貸倒引当金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(10000, 0.2, 1000);
      q.text = `昨年度に貸倒れ処理した売掛金 ${Randomizer.fmt(amt)}円 を、小切手で回収した。`;
      q.correctEntries = { debit: [{ accountName: "現金", amount: amt }], credit: [{ accountName: "償却債権取立益", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'cl_03b', major: 'closing', sub: 'bad_debts',
    text: "売掛金 40,000円 が貸倒れとなった。貸倒引当金の残高は 10,000円 しかないため、不足分を貸倒損失とする。",
    correctEntries: { debit: [{ accountName: "貸倒引当金", amount: 10000 }, { accountName: "貸倒損失", amount: 30000 }], credit: [{ accountName: "売掛金", amount: 40000 }] },
    choices: ["貸倒引当金", "貸倒損失", "売掛金", "現金"],
    mutate: (q) => {
      const loss = Randomizer.getAmount(40000, 0.2, 1000);
      const balance = 10000;
      const extra = loss - balance;
      q.text = `売掛金 ${Randomizer.fmt(loss)}円 が貸倒れとなった。貸倒引当金の残高は ${Randomizer.fmt(balance)}円 しかないため、不足分を貸倒損失とする。`;
      q.correctEntries = { debit: [{ accountName: "貸倒引当金", amount: balance }, { accountName: "貸倒損失", amount: extra }], credit: [{ accountName: "売掛金", amount: loss }] };
      return q;
    }
  },
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
    id: 'cl_04b', major: 'closing', sub: 'depreciation',
    text: "建物の減価償却を行う。取得原価 5,000,000円、残存価額ゼロ、耐用年数50年、定額法。記帳方法は間接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "減価償却累計額", amount: 100000 }] },
    choices: ["減価償却費", "減価償却累計額", "建物"],
    mutate: (q) => {
      const years = 50;
      const dep = Randomizer.getAmount(100000, 0.2, 1000);
      const cost = dep * years;
      q.text = `建物の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は間接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "減価償却累計額", amount: dep }] };
      return q;
    }
  },
  {
    id: 'cl_05', major: 'closing', sub: 'depreciation',
    text: "備品の減価償却を行う。取得原価 600,000円、残存価額ゼロ、耐用年数6年、定額法。記帳方法は間接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "減価償却累計額", amount: 100000 }] },
    choices: ["減価償却費", "減価償却累計額", "備品"],
    mutate: (q) => {
      const years = 6;
      const dep = Randomizer.getAmount(100000, 0.2, 1000);
      const cost = dep * years;
      q.text = `備品の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は間接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "減価償却累計額", amount: dep }] };
      return q;
    }
  },
  {
    id: 'cl_05b', major: 'closing', sub: 'depreciation',
    text: "備品の減価償却を行う。取得原価 300,000円、残存価額ゼロ、耐用年数5年、定額法。記帳方法は直接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 60000 }], credit: [{ accountName: "備品", amount: 60000 }] },
    choices: ["減価償却費", "備品", "減価償却累計額"],
    mutate: (q) => {
      const years = 5;
      const dep = Randomizer.getAmount(60000, 0.2, 1000);
      const cost = dep * years;
      q.text = `備品の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は直接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "備品", amount: dep }] };
      return q;
    }
  },
  {
    id: 'cl_05c', major: 'closing', sub: 'depreciation',
    text: "車両運搬具の減価償却を行う。取得原価 2,400,000円、残存価額ゼロ、耐用年数6年、定額法。記帳方法は間接法とする。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 400000 }], credit: [{ accountName: "減価償却累計額", amount: 400000 }] },
    choices: ["減価償却費", "減価償却累計額", "車両運搬具"],
    mutate: (q) => {
      const years = 6;
      const dep = Randomizer.getAmount(400000, 0.2, 1000);
      const cost = dep * years;
      q.text = `車両運搬具の減価償却を行う。取得原価 ${Randomizer.fmt(cost)}円、残存価額ゼロ、耐用年数${years}年、定額法。記帳方法は間接法とする。`;
      q.correctEntries = { debit: [{ accountName: "減価償却費", amount: dep }], credit: [{ accountName: "減価償却累計額", amount: dep }] };
      return q;
    }
  },
  {
    id: 'cl_05d', major: 'closing', sub: 'depreciation',
    text: "当期首に購入した備品（取得原価 1,200,000円、耐用年数5年、残存価額ゼロ、定額法）について、9ヶ月分の減価償却を行う（間接法）。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 180000 }], credit: [{ accountName: "減価償却累計額", amount: 180000 }] },
    choices: ["減価償却費", "減価償却累計額", "備品"],
    mutate: (q) => {
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
      return q;
    }
  },
  {
    id: 'cl_06b', major: 'closing', sub: 'inventory',
    text: "決算整理を行う。期首商品棚卸高 50,000円、期末商品棚卸高 40,000円 であった。売上原価は「仕入」の行で計算する。",
    correctEntries: { 
      debit: [{ accountName: "仕入", amount: 50000 }, { accountName: "繰越商品", amount: 40000 }], 
      credit: [{ accountName: "繰越商品", amount: 50000 }, { accountName: "仕入", amount: 40000 }] 
    },
    choices: ["仕入", "繰越商品", "売上", "損益"],
    mutate: (q) => {
      const start = Randomizer.getAmount(50000, 0.2, 1000);
      const end = Randomizer.getAmount(40000, 0.2, 1000);
      q.text = `決算整理を行う。期首商品棚卸高 ${Randomizer.fmt(start)}円、期末商品棚卸高 ${Randomizer.fmt(end)}円 であった。売上原価は「仕入」の行で計算する。`;
      q.correctEntries = { 
        debit: [{ accountName: "仕入", amount: start }, { accountName: "繰越商品", amount: end }], 
        credit: [{ accountName: "繰越商品", amount: start }, { accountName: "仕入", amount: end }] 
      };
      return q;
    }
  },
  {
    id: 'cl_06c', major: 'closing', sub: 'inventory',
    text: "売上原価を算定する。期首棚卸高 100,000円、期末棚卸高 120,000円。勘定科目は「仕入」と「繰越商品」を使用する。",
    correctEntries: { 
      debit: [{ accountName: "仕入", amount: 100000 }, { accountName: "繰越商品", amount: 120000 }], 
      credit: [{ accountName: "繰越商品", amount: 100000 }, { accountName: "仕入", amount: 120000 }] 
    },
    choices: ["仕入", "繰越商品", "売上", "現金"],
    mutate: (q) => {
      const start = Randomizer.getAmount(100000, 0.2, 1000);
      const end = Randomizer.getAmount(120000, 0.2, 1000);
      q.text = `売上原価を算定する。期首棚卸高 ${Randomizer.fmt(start)}円、期末棚卸高 ${Randomizer.fmt(end)}円。勘定科目は「仕入」と「繰越商品」を使用する。`;
      q.correctEntries = { 
        debit: [{ accountName: "仕入", amount: start }, { accountName: "繰越商品", amount: end }], 
        credit: [{ accountName: "繰越商品", amount: start }, { accountName: "仕入", amount: end }] 
      };
      return q;
    }
  },
  {
    id: 'cl_06d', major: 'closing', sub: 'inventory',
    text: "決算整理：期首商品棚卸高 60,000円 を仕入勘定に振り替える。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 60000 }], credit: [{ accountName: "繰越商品", amount: 60000 }] },
    choices: ["仕入", "繰越商品", "売上", "損益"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(60000, 0.2, 1000);
      q.text = `決算整理：期首商品棚卸高 ${Randomizer.fmt(amt)}円 を仕入勘定に振り替える。`;
      q.correctEntries = { debit: [{ accountName: "仕入", amount: amt }], credit: [{ accountName: "繰越商品", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cl_06e', major: 'closing', sub: 'inventory',
    text: "決算整理：期末商品棚卸高 90,000円 を繰越商品勘定に計上する。",
    correctEntries: { debit: [{ accountName: "繰越商品", amount: 90000 }], credit: [{ accountName: "仕入", amount: 90000 }] },
    choices: ["繰越商品", "仕入", "売上", "損益"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(90000, 0.2, 1000);
      q.text = `決算整理：期末商品棚卸高 ${Randomizer.fmt(amt)}円 を繰越商品勘定に計上する。`;
      q.correctEntries = { debit: [{ accountName: "繰越商品", amount: amt }], credit: [{ accountName: "仕入", amount: amt }] };
      return q;
    }
  },
  {
    id: 'cl_06f', major: 'closing', sub: 'inventory',
    text: "期首商品 20,000円、期末商品 25,000円。売上原価の算定仕訳を行う。",
    correctEntries: { 
      debit: [{ accountName: "仕入", amount: 20000 }, { accountName: "繰越商品", amount: 25000 }], 
      credit: [{ accountName: "繰越商品", amount: 20000 }, { accountName: "仕入", amount: 25000 }] 
    },
    choices: ["仕入", "繰越商品", "売上", "現金"],
    mutate: (q) => {
      const start = Randomizer.getAmount(20000, 0.2, 1000);
      const end = Randomizer.getAmount(25000, 0.2, 1000);
      q.text = `期首商品 ${Randomizer.fmt(start)}円、期末商品 ${Randomizer.fmt(end)}円。売上原価の算定仕訳を行う。`;
      q.correctEntries = { 
        debit: [{ accountName: "仕入", amount: start }, { accountName: "繰越商品", amount: end }], 
        credit: [{ accountName: "繰越商品", amount: start }, { accountName: "仕入", amount: end }] 
      };
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
      return q;
    }
  },
  {
    id: 'cl_08b', major: 'closing', sub: 'deferral_accrual',
    text: "保険料の前払分 12,000円 を次期に繰り延べる。",
    correctEntries: { debit: [{ accountName: "前払保険料", amount: 12000 }], credit: [{ accountName: "保険料", amount: 12000 }] },
    choices: ["前払保険料", "保険料", "現金", "前払金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(12000, 0.2, 1000);
      q.text = `保険料の前払分 ${Randomizer.fmt(amt)}円 を次期に繰り延べる。`;
      q.correctEntries = { debit: [{ accountName: "前払保険料", amount: amt }], credit: [{ accountName: "保険料", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'cl_09b', major: 'closing', sub: 'deferral_accrual',
    text: "受取家賃の未収分 50,000円 を計上する。",
    correctEntries: { debit: [{ accountName: "未収家賃", amount: 50000 }], credit: [{ accountName: "受取家賃", amount: 50000 }] },
    choices: ["未収家賃", "受取家賃", "未収金", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(50000, 0.2, 1000);
      q.text = `受取家賃の未収分 ${Randomizer.fmt(amt)}円 を計上する。`;
      q.correctEntries = { debit: [{ accountName: "未収家賃", amount: amt }], credit: [{ accountName: "受取家賃", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'cl_11b', major: 'closing', sub: 'tax',
    text: "確定した未払法人税等 90,000円 を現金で納付した。",
    correctEntries: { debit: [{ accountName: "未払法人税等", amount: 90000 }], credit: [{ accountName: "現金", amount: 90000 }] },
    choices: ["未払法人税等", "現金", "法人税等", "租税公課"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(90000, 0.2, 1000);
      q.text = `確定した未払法人税等 ${Randomizer.fmt(amt)}円 を現金で納付した。`;
      q.correctEntries = { debit: [{ accountName: "未払法人税等", amount: amt }], credit: [{ accountName: "現金", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'cl_12b', major: 'closing', sub: 'tax',
    text: "購入時に費用処理していた収入印紙の未使用分 1,000円 を貯蔵品に振り替える。",
    correctEntries: { debit: [{ accountName: "貯蔵品", amount: 1000 }], credit: [{ accountName: "租税公課", amount: 1000 }] },
    choices: ["貯蔵品", "租税公課", "消耗品費", "現金"],
    mutate: (q) => {
      const amt = Randomizer.getAmount(1000, 0.2, 100);
      q.text = `購入時に費用処理していた収入印紙の未使用分 ${Randomizer.fmt(amt)}円 を貯蔵品に振り替える。`;
      q.correctEntries = { debit: [{ accountName: "貯蔵品", amount: amt }], credit: [{ accountName: "租税公課", amount: amt }] };
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
      return q;
    }
  },
  {
    id: 'cl_13b', major: 'closing', sub: 'tax',
    text: "消費税の決算整理を行う。当期の仮受消費税 30,000円 に対し、仮払消費税が 40,000円 であったため、差額を未収消費税とする。",
    correctEntries: { debit: [{ accountName: "仮受消費税", amount: 30000 }, { accountName: "未収消費税", amount: 10000 }], credit: [{ accountName: "仮払消費税", amount: 40000 }] },
    choices: ["仮受消費税", "仮払消費税", "未収消費税", "未払消費税"],
    mutate: (q) => {
      const received = Randomizer.getAmount(30000, 0.2, 1000);
      const paid = Randomizer.round(received * 1.3, 1000);
      const refund = paid - received;
      q.text = `消費税の決算整理を行う。当期の仮受消費税 ${Randomizer.fmt(received)}円 に対し、仮払消費税が ${Randomizer.fmt(paid)}円 であったため、差額を未収消費税とする。`;
      q.correctEntries = { debit: [{ accountName: "仮受消費税", amount: received }, { accountName: "未収消費税", amount: refund }], credit: [{ accountName: "仮払消費税", amount: paid }] };
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
      return q;
    }
  }
];
