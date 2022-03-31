const fs = require("fs");
// ディレクトリ内のファイルを取得
const files = fs.readdirSync(__dirname);
// ファイルのフィルタリング
const filteredFiles = files.filter((file) =>
  /rinsyo[0-9]{2}[APM]{2}.json/.test(file)
);
// 書き込む配列
const outputAry = [];

for (const file of filteredFiles) {
  // ファイルの中身を取得
  const text = fs.readFileSync(`${__dirname}/${file}`, "utf8");
  // JSONに変換
  const json = JSON.parse(text);
  outputAry.push(json);
}

// 全てのデータを書き込む
fs.writeFileSync(`${__dirname}/rinsyoAll.json`, JSON.stringify(outputAry), { flag: "w" });
