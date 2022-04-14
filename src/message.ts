import * as vscode from "vscode";

export function showInfoMessage(msg: string, title:string|undefined) {
    if (title !== undefined){
        vscode.window.showInformationMessage(
            msg,
            { title: title }
        );
    } 
    else{
        vscode.window.showInformationMessage(
            msg
        );
    }
}

export function showWarnMessage(msg: string) {
	vscode.window.showWarningMessage(
		msg,
		{ title: "Yes" },
		{ title: "No" }
	);
}

export function showErrorMessage(msg: string) {
	vscode.window.showErrorMessage(
		msg,
		{ title: "Yes" },
		{ title: "No" }
	);
}