"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "firstextension" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('firstextension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const message = 'Hello World';
        console.log(message);
        vscode.window.showInformationMessage(message);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('firstextension.askQuestion', () => __awaiter(this, void 0, void 0, function* () {
        const ans = yield vscode.window.showInformationMessage("How's your day?", "Good", "Bad");
        if (ans == "Bad") {
            vscode.window.showInformationMessage("Sorry to hear that");
        }
        else {
            vscode.window.showInformationMessage("coooool!!!");
            console.log("cooooool");
        }
    })));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map