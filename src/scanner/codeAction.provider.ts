import { EXTENSION_ID } from "../constants/index";

import {
  CancellationToken,
  CodeAction,
  CodeActionContext,
  CodeActionKind,
  CodeActionProvider,
  Diagnostic,
  Range,
  Selection,
  TextDocument,
  WorkspaceEdit,
} from "vscode";
import { Delimiter } from "./delimiter";
import {
  pyApiCallToken,
  jsApiCallToken,
  jsApiCallDetoken,
} from "../constants/api_calls";

export class BlinkCodeActionProvider implements CodeActionProvider {
  public static readonly providedCodeActionKinds = [CodeActionKind.QuickFix];

  provideCodeActions(
    document: TextDocument,
    range: Range | Selection,
    context: CodeActionContext,
    token: CancellationToken
  ): CodeAction[] {
    const apiToken = this.createFix(document, range, "API_TOKENIZE");
    const apiDetoken = this.createFix(document, range, "DE_TOKENIZE_API");
    const ignoreFile = this.createFix(document, range, "IGNORE_FILE");

    const createCommandCodeAction = this.createCommandCodeAction(
      context.diagnostics[0]
    );

    return [apiToken, apiDetoken, ignoreFile, createCommandCodeAction];
  }

  private createCommandCodeAction(diagnostic: Diagnostic): CodeAction {
    let path: any;

    if (diagnostic.code) {
      let target: any = diagnostic.code.valueOf();
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

    if (type === "API_TOKENIZE") {
      fix = new CodeAction(
        `Tokenization API (BlinkTrust)`,
        CodeActionKind.QuickFix
      );
      let editText = null;
      fix.edit = new WorkspaceEdit();
      if (document.languageId === "python") {
        editText = Delimiter.getDelimiter(document.languageId).replace(
          "text",
          pyApiCallToken
        );
      } else if (document.languageId === "javascript") {
        editText = Delimiter.getDelimiter(document.languageId).replace(
          "text",
          jsApiCallToken
        );
      } else {
        editText = Delimiter.getDelimiter(document.languageId).replace(
          "text",
          "Coming Soon"
        );
      }
      let newRange: Range = new Range(range.start.line - 1, 0, range.start.line, editText.length);
      fix.edit.insert(document.uri, newRange.start, editText);
    } else if (type === "DE_TOKENIZE_API") {
      fix = new CodeAction(
        `Detokenize API (BlinkTrust)`,
        CodeActionKind.QuickFix
      );

      fix.edit = new WorkspaceEdit();
      let editText = null;
      fix.edit = new WorkspaceEdit();
      if (document.languageId === "python") {
        editText = Delimiter.getDelimiter(document.languageId).replace(
          "text",
          jsApiCallDetoken
        );
      } else if (document.languageId === "javascript") {
        editText = Delimiter.getDelimiter(document.languageId).replace(
          "text",
          jsApiCallDetoken
        );
      } else {
        editText = Delimiter.getDelimiter(document.languageId).replace(
          "text",
          "Coming Soon"
        );
      }
      let newRange: Range = new Range(range.start.line - 1, 0, range.start.line, editText.length);
      fix.edit.insert(document.uri, newRange.start, editText);
    } else {
      fix = new CodeAction(
        `Ignore suggestions for current file (BlinkTrust AI)`,
        CodeActionKind.QuickFix
      );

      fix.edit = new WorkspaceEdit();
      let editText = Delimiter.getDelimiter(document.languageId).replace(
        "text",
        "@bt-ignore for this file\r\n"
      );
      let newRange: Range = new Range(0, 0, range.start.line, editText.length);
      fix.edit.insert(document.uri, newRange.start, editText);
    }
    return fix;
  }
}
