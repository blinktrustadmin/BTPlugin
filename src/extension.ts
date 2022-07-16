// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { authenticate } from "./authenticate";
import { SidebarProvider } from "./SidebarProvider";
import { TokenManager } from "./TokenManager";
import * as os from "os";

import {
  commands,
  ExtensionContext,
  Position,
  Range,
  Selection,
  TextEditor,
  TextEditorRevealType,
  Uri,
  window,
  workspace,
} from "vscode";
import {
  COMMANDS,
  EXTENSION_ID,
  REGEX,
  TODO,
  VIEWS,
  WELCOMEMSG,
  DASHBOARDURL,
  BLINKHUB_CONTEXT,
  JsApiComment,
} from "./constants";
import { Decoration } from "./decoration";
import { TodoTreeListProvider } from "./providers";
import { TodoTreeListRegulatory } from "./regulatory";
import { TodoTreeListHelp } from "./help";
import { subscribeToDocumentChanges } from "./diagnostics";
import { Delimiter } from "./delimiter";
import * as https from "https";
import axios from "axios";

import { showErrorMessage, showInfoMessage, showWarnMessage } from "./message";
import { TodoTreeListPlatform } from "./platform";
import { start } from "repl";
import { constants } from "buffer";

var util = require("./js/decoUtil");
let machine: any = { os: {}, package: {} };

const COMMAND = "blinkhubScanner.command";
let panel: any;

export function activate(context: vscode.ExtensionContext) {
  TokenManager.globalState = context.globalState;
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const todoTreeList = new TodoTreeListProvider();
  const regulatory = new TodoTreeListRegulatory();
  const help = new TodoTreeListHelp();
  const blinkPlatform = new TodoTreeListPlatform();

  let editor = window.activeTextEditor;
  let timeout: NodeJS.Timeout | null = null;

  let isCaseSensitive: any,
    assembledData: { [x: string]: any },
    decorationTypes: { [x: string]: vscode.TextEditorDecorationType },
    pattern: string | RegExp,
    styleForRegExp: vscode.DecorationRenderOptions,
    keywordsPattern: string;
  let workspaceState = context.workspaceState;
  let settings = workspace.getConfiguration("blinkhubScanner");

  //Get/Set Settings
  showInfoMessage(WELCOMEMSG, undefined);

  const information = os.networkInterfaces();
  //Set Commands
  //context.subscriptions.push(
  //  vscode.window.registerWebviewViewProvider("blinkhubScanner", sidebarProvider)
  //);

  context.subscriptions.push(
    vscode.commands.registerCommand("blinkhubScanner.dashboard", () => {
      vscode.env.openExternal(
        vscode.Uri.parse(DASHBOARDURL + "?token=" + TokenManager.getToken())
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("blinkhubScanner.authenticate", () => {
      try {
        authenticate(async function () {
          console.log("authenticate");

          await vscode.commands.executeCommand(
            "setContext",
            BLINKHUB_CONTEXT.LOGGEDIN,
            true
          );
          vscode.window.registerTreeDataProvider(VIEWS.TODO_LIST, todoTreeList);
          vscode.window.registerTreeDataProvider(
            VIEWS.TODO_REGULATORY,
            regulatory
          );
          vscode.window.registerTreeDataProvider(
            VIEWS.TODO_PLATFORM,
            blinkPlatform
          );
          vscode.window.registerTreeDataProvider(VIEWS.TODO_HELP, help);
          Decoration.config(workspace.getConfiguration(EXTENSION_ID));

          context.subscriptions.push(
            commands.registerCommand(COMMANDS.REFRESH, () => {
              todoTreeList.refresh();
              regulatory.refresh();
              blinkPlatform.refresh();
              help.refresh();
            })
          );

          context.subscriptions.push(
            commands.registerCommand(
              COMMANDS.OPEN_FILE,
              (uri: Uri, col: number) => {
                window.showTextDocument(uri).then((editor: TextEditor) => {
                  const pos = new Position(col, 0);
                  const pos2 = new Position(col + 1, 0);
                  editor.revealRange(
                    new Range(pos, pos2),
                    TextEditorRevealType.InCenterIfOutsideViewport
                  );
                  editor.selection = new Selection(pos, pos2);
                  editor.setDecorations(highlightDecoration, [
                    new Range(pos, pos2),
                  ]);
                });
              }
            )
          );

          vscode.window.onDidChangeActiveTextEditor((e) => {
            if (e) {
              editor = e;
              //styleText(e);
              //triggerUpdateDecorations();
            }
          });

          workspace.onDidChangeTextDocument(() => {
            //styleText(editor);
            //triggerUpdateDecorations();
          });

          workspace.onDidSaveTextDocument(() => {
            todoTreeList.refresh();
            regulatory.refresh();
            blinkPlatform.refresh();
            help.refresh();
          });

          workspace.onDidChangeConfiguration(async () => {
            Decoration.config(workspace.getConfiguration(EXTENSION_ID));
            //styleText(editor);
            todoTreeList.refresh();
            regulatory.refresh();
            blinkPlatform.refresh();
            help.refresh();
          });

          context.subscriptions.push(
            vscode.languages.registerCodeActionsProvider("*", new Emojizer(), {
              providedCodeActionKinds: Emojizer.providedCodeActionKinds,
            })
          );

          const emojiDiagnostics =
            vscode.languages.createDiagnosticCollection("blinkhubScanner");
          context.subscriptions.push(emojiDiagnostics);
          subscribeToDocumentChanges(context, emojiDiagnostics);

          context.subscriptions.push(
            vscode.languages.registerCodeActionsProvider("*", new Emojinfo(), {
              providedCodeActionKinds: Emojinfo.providedCodeActionKinds,
            })
          );

          context.subscriptions.push(
            vscode.commands.registerCommand(
              "blinkhubScanner.showOutputChannel",
              function () {
                var annotationList = workspaceState.get("annotationList", []);
                util.showOutputChannel(annotationList);
              }
            )
          );

          /*context.subscriptions.push(vscode.commands.registerCommand(COMMAND, function () {
             panel = vscode.window.createWebviewPanel(
                'openWebview', // Identifies the type of the webview. Used internally
                'Suggestion', // Title of the panel displayed to the user
                vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
                { // Enable scripts in the webview
                  enableScripts: true //Set this to true if you want to enable Javascript. 
                }
              );
          }));*/

          if (editor) {
            triggerUpdateDecorations();
          }
        });
      } catch (err) {
        console.log(err);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("blinkhubScanner.refresh", async () => {
      // HelloWorldPanel.kill();
      // HelloWorldPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.blinkhubScanner"
      );
      /*setTimeout(() => {
         vscode.commands.executeCommand(
           "workbench.action.webview.openDeveloperTools"
         );
       }, 500);*/
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "blinkhubScanner.openlink",
      async (data) => {
        vscode.env.openExternal(vscode.Uri.parse(data));
      }
    )
  );

  const highlightDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: "#C2DED1",
    // backgroundColor: "red",
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("blinkhubScanner.apiSnippet", async () => {
      const { activeTextEditor } = vscode.window;
      if (!activeTextEditor) {
        vscode.window.showErrorMessage("No active text editor");
        return;
      }

      activeTextEditor.edit((builder) => {
        builder.insert(
          new Position(0, 0),
          "// export const apiCall = (data) =>  {"
        );
        builder.insert(new Position(0, 0), "\n");
        builder.insert(
          new Position(0, 0),
          "//  const { data } = axios.post(`https://api.blinktrustai.com/api/v1/vault-service/tokenize`, data);"
        );
        builder.insert(new Position(0, 0), "\n");
        builder.insert(new Position(0, 0), "// }");
        builder.insert(new Position(0, 0), "\n");
      });
    })
  );

  function init(settings: any) {
    var customDefaultStyle = settings.get("defaultStyle");
    keywordsPattern = settings.get("keywordsPattern");
    isCaseSensitive = settings.get("isCaseSensitive", true);

    // @ts-ignore
    if (!window.statusBarItem) {
      // @ts-ignore
      window.statusBarItem = util.createStatusBarItem();
    }
    // @ts-ignore
    if (!window.outputChannel) {
      // @ts-ignore
      window.outputChannel = window.createOutputChannel("blinkhubScanner");
    }

    decorationTypes = {};

    if (keywordsPattern.trim()) {
      styleForRegExp = Object.assign(
        {},
        util.defaultStyle,
        customDefaultStyle,
        {
          overviewRulerLane: vscode.OverviewRulerLane.Right,
        }
      );
      pattern = keywordsPattern;
    } else {
      assembledData = util.getAssembledData(
        settings.get("keywords"),
        customDefaultStyle,
        isCaseSensitive
      );
      Object.keys(assembledData).forEach((v) => {
        if (!isCaseSensitive) {
          v = v.toUpperCase();
        }
        var mergedStyle = Object.assign(
          {},
          {
            overviewRulerLane: vscode.OverviewRulerLane.Right,
          },
          assembledData[v]
        );

        if (!mergedStyle.overviewRulerColor) {
          // use backgroundColor as the default overviewRulerColor if not specified by the user setting
          mergedStyle.overviewRulerColor = mergedStyle.backgroundColor;
        }

        decorationTypes[v] = window.createTextEditorDecorationType(mergedStyle);
      });

      pattern = Object.keys(assembledData)
        .map((v) => {
          return util.escapeRegExp(v);
        })
        .join("|");
    }

    pattern = new RegExp(pattern, "gi");
    if (isCaseSensitive) {
      pattern = new RegExp(pattern, "g");
    }
  }

  function updateDecorations() {
    if (!editor || !editor.document) {
      return;
    }

    var text = editor.document.getText();
    var mathes: any = {},
      match;
    if (typeof pattern === "string") {
      return;
    }

    while ((match = pattern.exec(text))) {
      var startPos = editor.document.positionAt(match.index);
      var endPos = editor.document.positionAt(match.index + match[0].length);
      var decoration = {
        range: new vscode.Range(startPos, endPos),
      };

      var matchedValue = match[0];
      if (!isCaseSensitive) {
        matchedValue = matchedValue.toUpperCase();
      }

      if (mathes[matchedValue]) {
        mathes[matchedValue].push(decoration);
      } else {
        mathes[matchedValue] = [decoration];
      }

      if (keywordsPattern.trim() && !decorationTypes[matchedValue]) {
        decorationTypes[matchedValue] =
          window.createTextEditorDecorationType(styleForRegExp);
      }
    }

    Object.keys(decorationTypes).forEach((v) => {
      if (!isCaseSensitive) {
        v = v.toUpperCase();
      }
      var rangeOption = settings.get("isEnable") && mathes[v] ? mathes[v] : [];
      var decorationType = decorationTypes[v];
      if (editor !== undefined) {
        editor.setDecorations(decorationType, rangeOption);
      }
    });
  }

  function triggerUpdateDecorations() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(updateDecorations, 0);
  }
}

function styleText(editor: vscode.TextEditor | undefined) {
  if (!editor) {
    return;
  }
  const doc = editor.document;
  const str = doc.getText();
  let match;

  while ((match = REGEX.exec(str))) {
    editor.setDecorations(
      window.createTextEditorDecorationType(Decoration.decoration()),
      [
        new Range(
          doc.positionAt(match.index),
          doc.positionAt(match.index + TODO.length)
        ),
      ]
    );
  }
}

/**
 * Provides code actions for converting :) to a smiley emoji.
 */
export class Emojizer implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
  ];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    //if (!this.isAtStartOfSmiley(document, range)) {
    //return;
    //}
    //const replaceWithSmileyCatFix = this.createFix(document, range, 'SHOW');

    const replaceWithSmileyFix = this.createFix(document, range, "IGNORE");
    // Marking a single fix as `preferred` means that users can apply it with a
    // single keyboard shortcut using the `Auto Fix` command.
    replaceWithSmileyFix.isPreferred = true;

    const replaceWithSmileyHankyFix = this.createFix(document, range, "FILE");

    const replaceWithAPI = this.createFix(document, range, "API");

    const commandAction = this.createCommand();

    return [
      commandAction,
      replaceWithSmileyFix,
      replaceWithSmileyHankyFix,
      replaceWithAPI,
    ];
  }

  private isAtStartOfSmiley(
    document: vscode.TextDocument,
    range: vscode.Range
  ) {
    const start = range.start;
    const line = document.lineAt(start.line);
    return (
      line.text[start.character] === ":" &&
      line.text[start.character + 1] === ")"
    );
  }

  private async commentLine(url: string): Promise<void> {
    //await vscode.commands.executeCommand('editor.action.addCommentLine');
    const todos = await axios.get(url);
    //let success = await commands.executeCommand('vscode.previewHtml', todos);
    panel = vscode.window.createWebviewPanel(
      "openWebview", // Identifies the type of the webview. Used internally
      "Suggestion", // Title of the panel displayed to the user
      vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
      {
        // Enable scripts in the webview
        enableScripts: true, //Set this to true if you want to enable Javascript.
      }
    );
    panel.webview.html = todos;
  }

  private createFix(
    document: vscode.TextDocument,
    range: vscode.Range,
    emoji: string
  ): vscode.CodeAction {
    let fix: vscode.CodeAction;
    if (emoji === "IGNORE") {
      fix = new vscode.CodeAction(
        `Ignore this suggestion (BlinkTrust AI)`,
        vscode.CodeActionKind.QuickFix
      );

      fix.edit = new vscode.WorkspaceEdit();
      let editText = Delimiter.getDelimiter(document.languageId).replace(
        "text",
        "@bt-ignore <please let us the reason to ignore>\r\n"
      );
      let newRange: vscode.Range = new Range(
        range.start.line - 1,
        0,
        range.start.line,
        editText.length
      );
      fix.edit.insert(document.uri, newRange.start, editText);
    } else if (emoji === "API") {
      fix = new vscode.CodeAction(
        `Insert Vault API (BlinkTrust AI)`,
        vscode.CodeActionKind.QuickFix
      );

      fix.edit = new vscode.WorkspaceEdit();

      const fileExtension = document.fileName
        .split("/")
        .reverse()[0]
        .split(".")
        .reverse()[0]
        .toLocaleLowerCase();

      if (fileExtension === "py") {
        let editText = `"""response = requests.post("https://api.blinktrustai.com/api/v1/vault-service/detokenize",\r\n data = {\r\n'organization': 'socommerz',\r\n'customerId': 'cust_01',\r\n'table': 'table_name'\r\n})"""`;
        let newRange: vscode.Range = new Range(
          range.start.line - 1,
          0,
          range.start.line,
          editText.length
        );
        fix.edit.insert(document.uri, newRange.start, editText);
      } else if (fileExtension === "js") {
        let editText =
          `/* export const apiCall = (payload) =>  { \r\n  const { data } = axios.post("https://api.blinktrustai.com/api/v1/vault-service/detokenize",\r\n {\r\n'organization': 'socommerz',\r\n'customerId': 'cust_01',\r\n'table': 'table_name'\r\n});\r\n} */\r\n`;
        let newRange: vscode.Range = new Range(
          range.start.line - 1,
          0,
          range.start.line,
          editText.length
        );
        fix.edit.insert(document.uri, newRange.start, editText);
      } else {
        vscode.window.showErrorMessage(`Language not supported yet.`);
      }
    } else {
      fix = new vscode.CodeAction(
        `Ignore suggestions for current file (BlinkTrust AI)`,
        vscode.CodeActionKind.QuickFix
      );
      let editText = Delimiter.getDelimiter(document.languageId).replace(
        "text",
        "@bt-ignore-file <please let us the reason to ignore>\r\n"
      );
      let newRange: vscode.Range = new Range(0, 0, 0, editText.length);
      fix.edit = new vscode.WorkspaceEdit();
      fix.edit.insert(document.uri, newRange.start, editText);
      //fix.edit.replace(document.uri, new vscode.Range(range.start, range.start.translate(0, 2)), emoji);
    }

    return fix;
  }

  private createCommand(): vscode.CodeAction {
    const action = new vscode.CodeAction(
      "Show more details and suggestions (Blink Trust AI)",
      vscode.CodeActionKind.QuickFix
    );
    action.command = {
      command: COMMAND,
      title: "Learn more about emojis",
      tooltip: "This will open the unicode emoji page.",
    };
    //this.commentLine('https://bhscanner.s3.amazonaws.com/help/ssn.html');
    return action;
  }
}

/**
 * Provides code actions corresponding to diagnostic problems.
 */
export class Emojinfo implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
  ];

  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.CodeAction[] {
    // for each diagnostic entry that has the matching `code`, create a code action command
    return context.diagnostics
      .filter((diagnostic) => diagnostic.code === "")
      .map((diagnostic) => this.createCommandCodeAction(diagnostic));
  }

  private createCommandCodeAction(
    diagnostic: vscode.Diagnostic
  ): vscode.CodeAction {
    const action = new vscode.CodeAction(
      "Show more details and suggestions (Blink Trust AI)",
      vscode.CodeActionKind.QuickFix
    );
    action.command = {
      command: COMMAND,
      title: "Learn more about fixes",
      tooltip: "This will open the unicode fixme page.",
    };
    action.diagnostics = [diagnostic];
    action.isPreferred = true;
    return action;
  }
}
/*

 if (emoji === 'SHOW'){
      fix = new vscode.CodeAction(`Show more details and suggestions (Blink Trust AI)`, vscode.CodeActionKind.QuickFix);
      //Show Webview
      this.commentLine("https://bhscanner.s3.amazonaws.com/help/ssn.html");
    }
    else

*/
// this method is called when your extension is deactivated
export function deactivate() {
  showWarnMessage("Thank you for using BlinkTrustAI Scanner!");
}
