// import { window } from 'vscode';

// /**
//  * Shows a pick list using window.showQuickPick().
//  */
// export async function showQuickPick() {
// 	let i = 0;
// 	const result = await window.showQuickPick(['One', 'Two', 'Three'], {
// 		placeHolder: 'one,Two or three',
// 		onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
// 	});
// 	window.showInformationMessage(`Got: ${result}`);
// }

// /**
//  * Shows an input box using window.showInputBox().
//  */
// export async function showInputBox() {
// 	const result = await window.showInputBox({
// 		value: 'abcdef',
// 		valueSelection: [2, 4],
// 		placeHolder: 'For example: fedcba. But not: 123',
// 		validateInput: text => {
// 			window.showInformationMessage(`Validating: ${text}`);
// 			return text === '123' ? 'Not 123!' : null;
// 		}
// 	});
// 	window.showInformationMessage(`Got: ${result}`);
// }

import { window } from 'vscode';

var express=require('express');
import axios from "axios";
var url="http://localhost:3000";
var app=express();

/**
 * Shows a pick list using window.showQuickPick().
 */

 
 var olympic_ranking=[
	{"Ranking":3,"Country":"China"},
	{"Ranking":4,"Country":"Russia"},
	{"Ranking":5,"Country":"Germany"},
	{"Ranking":6,"Country":"Japan"},
	{"Ranking":7,"Country":"France"}
   ]



function isEmpty(obj:any) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
	}
	return true;
}


function get_rank(rank:any){
	var data={};
	for(var i=0,len=olympic_ranking.length;i<len;i++){
	  if(olympic_ranking[i]['Ranking'] == rank){
		data=olympic_ranking[i];
		break;
	  }
	}
	return data;
}


export async function showQuickPick() {
	let i = 0;
	const result = await window.showQuickPick(['ADD STUDENT', 'UPDATE', 'DELETE','GET DATA'], {
		placeHolder: 'ADD,DELETE,UPDATE,GET DATA',
		onDidSelectItem: item =>app.get('/olympic/2016/ranking/:rank',function(req:any,res:any){
			var result=get_rank(req.params.rank);
			if( !isEmpty(result) ){
				res.status(200).send(result);
			}else{
				res.status(404).send('Record does not exist');
			}
	   })
		
		
		
		
		
		
		
		
		//  window.showInformationMessage(`Focus ${++i}: ${item}`)
	});
	
	window.showInformationMessage(`Got: ${result}`);
}

/**
 * Shows an input box using window.showInputBox().
 */
export async function showInputBox() {
	const result = await window.showInputBox({
		value: 'abcdef',
		valueSelection: [2, 4],
		placeHolder: 'For example: fedcba. But not: 123',
		validateInput: text => {
			window.showInformationMessage(`Validating: ${text}`);
			return text === '123' ? 'Not 123!' : null;
		}
	});
	window.showInformationMessage(`Got: ${result}`);
}