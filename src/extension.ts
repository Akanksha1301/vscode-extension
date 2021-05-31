
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';
import { showQuickPick, showInputBox } from './basicInput';
import { multiStepInput } from './multiStepInput';
import { quickOpen } from './quickOpen';
import { ExtensionContext } from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { FtpExplorer } from "./ftpExplorer";
import { DepNodeProvider,Dependency } from "./NodeDepenciesProvider";
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';
import axios from "axios"



export function activate(context: vscode.ExtensionContext) {

	
	console.log('Congratulations, your extension "firstextension" is now active!');
	console.log(vscode.workspace.rootPath)

	const sidebarProvider = new SidebarProvider(context.extensionUri);
  	context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "sidebar",
      sidebarProvider
    )
  	)

const NodeDependenciesProvider=new DepNodeProvider(vscode.workspace.rootPath)
console.log(vscode.workspace.rootPath)
	vscode.window.registerTreeDataProvider(
		'sidebar',
		new NodeDependenciesProvider(vscode.workspace.rootPath)
	) ;
	
	vscode.window.createTreeView('nodeDependencies', {
		treeDataProvider: new NodeDependenciesProvider(vscode.workspace.rootPath)
	  })













	// vscode.window.createTreeView('ftpExplorer', {
	// 	treeDataProvider: new FtpTreeDataProvider()
	//   });






	  
 
	context.subscriptions.push(
	vscode.commands.registerCommand('firstextension.Hello', async() => {
		const panel= vscode.window.createWebviewPanel(
			"sample",
			"Akanksha Jain ",
			vscode.ViewColumn.One,
			{}
		)
// console.log("morning")		
// var url="http://localhost:3000";

// axios.get(url+'/olympic/2016/ranking/4')
// .then(function(response){
//     console.log(response.data);
// })
// .catch(function (error) {
//     console.log(error)
// })
		// const message ='Hello World';
		// console.log(message)
		// vscode.window.showInformationMessage(message);
		panel.webview.html = getWebviewContent();
	})
	)


	context.subscriptions.push(
		vscode.commands.registerCommand('firstextension.askQuestion',async()=>{
		const ans=await vscode.window.showInformationMessage("How's your day?","Good","Bad");
			if (ans=="Bad") {
				vscode.window.showInformationMessage("Sorry to hear that");
			}
			else{
				vscode.window.showInformationMessage("coooool!!!");
				console.log({ans})
			}
		})
	)

	context.subscriptions.push(
		vscode.commands.registerCommand('firstextension.helloWorld',async () => {
			HelloWorldPanel.createOrShow(context.extensionUri)
		})
	)


	context.subscriptions.push(
		vscode.commands.registerCommand('firstextension.quickInput', async () => {
			console.log("xyzzz")
		const options: { [key: string]: (context: ExtensionContext) => Promise<void> } = {
			showQuickPick,
			showInputBox,
			multiStepInput,
			quickOpen,
		};
		const quickPick =vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context)
					.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));

//var url="http://localhost:3000";
	// axios.get(url+'/student/Akanksha')
	// 	.then(function(response:any){
	// 		console.log(response.data);
	// 		window.showInformationMessage(response.data)
	// 	})

	// context.subscriptions.push(
	// 	vscode.commands.registerCommand('firstextension.boilerplate',async () => {
	// 		const htmlContent=`
	// 		<!DOCTYPE html>
	// <html lang="en">

	// <head>
	// 	<meta charset="UTF-8" />
	// 	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	// 	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	// 	<link rel="stylesheet" href="" />
	// 	<title>Document</title>
	// head>

	// <body>
    // 	<script src="main.js "></script>
	// </body>

	// </html> `


	// //doubt
	// // const workspace.workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined
	// const folderPath= vscode.workspace.workspaceFolders[0].uri
	// 	.toString()
	// 	.split(":")[1];

	// 	// let path: string;
    //     // if (!vscode.workspace.workspaceFolders) {
    //     //     path =vscode.workspace.rootPath;
    //     // } else {
    //     //     let root: vscode.WorkspaceFolder;
    //     //     if (vscode.workspace.workspaceFolders.length === 1) {
    //     //         root = vscode.workspace.workspaceFolders[0];
    //     //     } else {
    //     //         root =vscode. workspace.getWorkspaceFolder(resource);
    //     //     }

    //     //     path = root.uri.fsPath;
    //     // }
		
	
	// fs.writeFile(path.join(folderPath,"html.html"),htmlContent,error=>{
	// 	if(error){
	// 		console.log(error);
	// 		return vscode.window.showErrorMessage("Failed to create boiler plate")

	// 	}
	// 	return vscode.window.showInformationMessage("Created boilerplate")
	// })
	// 	})
	// )


}


function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>sample</title>
  </head>
  <body>
  <h1>Hello !!!</h1>
	  <p>Trying something new :)<p>
	  <input/>
	  
  </body>
  </html>`;
  }
// this method is called when your extension is deactivated
export function deactivate() {}
function resource(resource: any): vscode.WorkspaceFolder {
	throw new Error('Function not implemented.');
}

