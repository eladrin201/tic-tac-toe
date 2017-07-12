const ConsoleUtils = require('./ConsoleUtils');
const myConsole = new ConsoleUtils();

myConsole.printLine('Hello, what is your name?');
myConsole.getLine('Enter your name: ', (name) => {
  myConsole.clear();
  myConsole.printLine(`Hello ${name}!`);
});
