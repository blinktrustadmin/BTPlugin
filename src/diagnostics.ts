import * as vscode from 'vscode';
import { COMMANDS, EXCLUDE, INCLUDE, MAX_RESULTS, REGEX, TODO, VALIDATOR_ERROR_MESSAGES, VALIDATOR_ERROR_REASONS, VALIDATOR_REGEXPS, VALIDATOR_REGEXPS_KEYS, VALIDATOR_SEVERTY_ICON, VALIDATOR_ERROR_LEVEL } from './constants';
//import * as addressparser from 'parse-address-string';
//var addressparser = require('addressparser');
//var parseAddress = require('parse-address-string');
var parser = require('./js/address');
var parser_au = require('./js/address_au');
var parser_ca = require('./js/address_ca');
var parser_uk = require('./js/address_uk');

export class DiagnosticsContent{
    message: string;
    line: number;
    level: string;
    lineContent: string;
    referenceUrl: string;
    key : string;
    constructor(message: string, line: number, level: string, lineContent: string, referenceUrl: string, key: string ) {
        this.message = message;
        this.line = line;
        this.level = level ;
        this.lineContent = lineContent ;
        this.referenceUrl = referenceUrl;
        this.key = key;
      }
}

/**
 * Analyzes the text document for problems. 
 * This demo diagnostic problem provider finds all mentions of 'emoji'.
 * @param doc text document to analyze
 * @param emojiDiagnostics diagnostic collection
 */
export function refreshDiagnostics(doc: vscode.TextDocument, emojiDiagnostics: vscode.DiagnosticCollection): void {
	const diagnostics: vscode.Diagnostic[] = [];
   
	for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
		    const lineOfText = doc.lineAt(lineIndex);
        let text = lineOfText.text.replace(/<[^>]+>/g, '').replace(/=/g, ' ').replace(/"/g, '').replace(/;/g, ''); 
        text = text.trim();
        if (text === "") { continue;}
        const strToTest = text.replace('.', '');
        
        //var parser_us_address = parser.parseLocation(strToTest);
        //var parser_au_address = parser_au.parseLocation(strToTest);
        //var parser_ca_address = parser_ca.parseLocation(strToTest);
        //var parser_uk_address = parser_uk.parseLocation(strToTest);

        for (let i = 0; i < VALIDATOR_REGEXPS_KEYS.length; i++) {
          let key = VALIDATOR_REGEXPS_KEYS[i];
          var REGEX_NEW = VALIDATOR_REGEXPS[key];
          
          let childToDo: any;
          if (key === 'PROPERTY_UNIT_NUMBER' || key === 'PROPERTY_STREET_ADDRESS' || key === 'PROPERTY_ADDRESS' || key === 'POSTAL_CODE_US' || key === 'POSTAL_CODE_UK' 
          || key === 'POSTAL_CODE_BR' || key === 'POSTAL_CODE_FR' || key === 'PROPERTY_ADDRESS_AU' || key === 'PROPERTY_ADDRESS_UK'){
          
            if (REGEX_NEW.test(strToTest)) {
              //const todoText = text.slice(text.indexOf(element) + element.length + 1, text.length);
              if (text !== "") {
                var toDoMesg = VALIDATOR_ERROR_MESSAGES[key];
                  var toDoError = VALIDATOR_ERROR_REASONS[key];
                  var toDoErrorLevel = VALIDATOR_ERROR_LEVEL[key];
                  var m = REGEX_NEW.exec(text);
                  var s = "";
                  if (m !== null){
                    s = (m !== undefined && m.length ? m[0] : undefined) ;
                  }
                  else{
                    s = text;
                  }
                  childToDo = new DiagnosticsContent(toDoMesg, lineIndex, toDoErrorLevel.toLowerCase(), s, toDoError, key);
              }
            }
          }
          else{
            var words = text.split(' ');
            words.forEach(element => {
              if (REGEX_NEW.test(element)) {
                //const todoText = text.slice(text.indexOf(element) + element.length + 1, text.length);
                if (element) {
                  if(key === "PHONE" && element.length > 12 ) {
                    console.log("Phone Number", key);
                  } 
                  else{
                    var toDoMesg = VALIDATOR_ERROR_MESSAGES[key];
                    var toDoError = VALIDATOR_ERROR_REASONS[key];
                    var toDoErrorLevel = VALIDATOR_ERROR_LEVEL[key];
                    childToDo = new DiagnosticsContent(toDoMesg, lineIndex, toDoErrorLevel.toLowerCase(), element, toDoError, key);
                  }
                }
              }
            });
          }
          
          if (childToDo === undefined) {continue;}

          let diagnostic: vscode.Diagnostic = createDiagnostic(lineOfText, childToDo, lineIndex);  
          if (diagnostic !== undefined){
            diagnostics.push(diagnostic);
          }
        }
	}
	emojiDiagnostics.set(doc.uri, diagnostics);
}

function createDiagnostic(lineOfText: vscode.TextLine, childToDo: DiagnosticsContent, lineIndex: number): any{
	// find where in the line of thet the 'emoji' is mentioned
    if (childToDo !== undefined && childToDo.lineContent === undefined) 
    {
        return undefined;
    }

	const index = lineOfText.text.indexOf(childToDo.lineContent);
    
	// create range that represents, where in the document the word is
	const range = new vscode.Range(lineIndex, index, lineIndex, index + childToDo.lineContent.length);
    let message = "";
    if (childToDo.message !== undefined) 
    {
        message = childToDo.message ;
    }

    /*const editor = vscode.window.activeTextEditor;
    if(editor){
        editor.edit(edit => {
            edit.insert(new vscode.Position(lineIndex, index + childToDo.lineContent.length + 5), "// FIXME: " + childToDo.referenceUrl);
        });
    }*/
 
  let errorLevel = vscode.DiagnosticSeverity.Error;
  if(childToDo.level === "error"){
    errorLevel = vscode.DiagnosticSeverity.Error;
  }
  else if  (childToDo.level === "warning"){
    errorLevel = vscode.DiagnosticSeverity.Warning;
  }
  else{
    errorLevel = vscode.DiagnosticSeverity.Information;
  }
	const diagnostic = new vscode.Diagnostic(range, message, errorLevel);
	diagnostic.code = {
        "value": "more details",
        "target": {
          // @ts-ignore
          "$mid": 1,
          "external": "https://bhscanner.s3.amazonaws.com/help/"+childToDo.key.toLowerCase()+".html",
          "path": "/help/"+childToDo.key.toLowerCase()+".html",
          "scheme": "https",
          "authority": "bhscanner.s3.amazonaws.com"
        }
      };//childToDo.referenceUrl;

	return diagnostic;
}

export function subscribeToDocumentChanges(context: vscode.ExtensionContext, emojiDiagnostics: vscode.DiagnosticCollection): void {
	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, emojiDiagnostics);
	}
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				refreshDiagnostics(editor.document, emojiDiagnostics);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, emojiDiagnostics))
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => emojiDiagnostics.delete(doc.uri))
	);

}