const readline = require('readline');

module.exports = class ConsoleUtils {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  printLine(...args) {
    console.log(...args);
  }
  getLine(prompt, cb) {
    this.rl.question(prompt, cb);
  }
  clear() {
    process.stdout.write('\x1B[2J\x1B[0f');
  }
};
