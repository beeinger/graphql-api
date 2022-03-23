const string = dree.parse(process.cwd(), {
  exclude: /node_modules/,
});
console.log(string);
const bootstrap = require(process.cwd() + "/dist/main.js");
bootstrap();
