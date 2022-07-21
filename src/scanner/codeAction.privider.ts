import { EXTENSION_ID } from "./../constants/index";
import { treeViewTitle } from "./../constants/treeview_strings";
import { createDiagnostic } from "./scanner";
import {
  CancellationToken,
  CodeAction,
  CodeActionContext,
  CodeActionKind,
  CodeActionProvider,
  Diagnostic,
  languages,
  Range,
  Selection,
  TextDocument,
  WorkspaceEdit,
} from "vscode";
import { Delimiter } from "./delimiter";

export class BlinkCodeActionProvider implements CodeActionProvider {
  public static readonly providedCodeActionKinds = [CodeActionKind.QuickFix];

  provideCodeActions(
    document: TextDocument,
    range: Range | Selection,
    context: CodeActionContext,
    token: CancellationToken
  ): CodeAction[] {
    const ignoreLine = this.createFix(document, range, "IGNORE_LINE");
    const ignoreFile = this.createFix(document, range, "IGNORE_FILE");

    const createCommandCodeAction = this.createCommandCodeAction(
      context.diagnostics[0]
    );

    return [ignoreLine, ignoreFile, createCommandCodeAction];
  }

  private createCommandCodeAction(diagnostic: Diagnostic): CodeAction {

    let path: any;

    if (diagnostic.code) {
      let target:any = diagnostic.code.valueOf();
      console.log(target["target"]);
      path = target["target"] ?? undefined;
    }

    const action = new CodeAction(
      "Show more details and suggestions (Blink Trust AI)",
      CodeActionKind.QuickFix
    );
    action.command = {
      command: EXTENSION_ID + ".openPage",
      title: "Learn more about fixes",
      tooltip: "This will open the unicode fixme page.",
      arguments: [path],
    };
    action.diagnostics = [diagnostic];
    action.isPreferred = true;
    return action;
  }

  private createFix(
    document: TextDocument,
    range: Range,
    type: string
  ): CodeAction {
    let fix: CodeAction;

    if (type === "IGNORE_LINE") {
      fix = new CodeAction(
        `Ignore this suggestion (BlinkTrustAi)`,
        CodeActionKind.QuickFix
      );

      fix.edit = new WorkspaceEdit();
      let editText = Delimiter.getDelimiter(document.languageId).replace(
        "text",
        "@bt-ignore for this line\r\n"
      );
      let newRange: Range = new Range(
        range.start.line - 1,
        0,
        range.start.line,
        editText.length
      );
      fix.edit.insert(document.uri, newRange.start, editText);
    } else {
      fix = new CodeAction(
        `Ignore suggestions for current file (BlinkTrust AI)`,
        CodeActionKind.QuickFix
      );
      let editText = Delimiter.getDelimiter(document.languageId).replace(
        "text",
        "@bt-ignore-file for this file \r\n"
      );
      let newRange: Range = new Range(0, 0, 0, editText.length);
      fix.edit = new WorkspaceEdit();
      fix.edit.insert(document.uri, newRange.start, editText);
    }
    return fix;
  }
}
