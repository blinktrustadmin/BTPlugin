import { REGEX_REASON } from "../regex/regex.reason";
import {
  Diagnostic,
  DiagnosticCollection,
  DiagnosticSeverity,
  ExtensionContext,
  Range,
  TextDocument,
  TextLine,
  window,
  workspace,
} from "vscode";
import { REGEX_SET, REGEX_SET_KEYS } from "../regex/regex";
import { REGEX_MESSAGE } from "../regex/regex.message";
import { REGEX_LEVEL } from "../regex/regex.level";

export const refreshDiagnostics = (
  doc: TextDocument,
  diagnosticsCollection: DiagnosticCollection
): void => {
  const diagnostics: Diagnostic[] = [];

  for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
    const lineOfText = doc.lineAt(lineIndex);

    let text = lineOfText.text
      .replace(/<[^>]+>g/, "")
      .replace(/=/g, " ")
      .replace(/"/g, "")
      .replace(/;/g, "");
    text = text.trim();
    if (text === "") {
      continue;
    }

    const strToTest = text.replace(".", "");

    for (let i = 0; i < REGEX_SET_KEYS.length; i++) {
      let childDiagnostics: any;

      let key = REGEX_SET_KEYS[i];
      var regex = REGEX_SET[key];

      if (regex.test(strToTest)) {
        if (text !== "") {
          var message = REGEX_MESSAGE[key];
          var error = REGEX_REASON[key];
          var errorLevel = REGEX_LEVEL[key];
          var result = regex.exec(text);
          var temp = "";
          if (result !== null) {
            temp =
              result !== undefined && result.length ? result[0] : undefined;
          } else {
            temp = text;
          }
          childDiagnostics = new DiagnosticsContent(
            message,
            lineIndex,
            errorLevel.toLowerCase(),
            temp,
            error,
            key
          );
          console.log('CHild Diag IF ++', childDiagnostics);
        }
      } else {
        var words = text.split(" ");
        words.forEach((element: any) => {
          if (regex.test(element)) {
            var message = REGEX_MESSAGE[key];
            var error = REGEX_REASON[key];
            var errorLevel = REGEX_LEVEL[key];
            childDiagnostics = new DiagnosticsContent(
              message,
              lineIndex,
              errorLevel.toLowerCase(),
              element,
              error,
              key
            );
            console.log('CHild Diag', childDiagnostics);
          }
        });
      }

      if (childDiagnostics === undefined) {
        continue;
      }

      let diagnostic: Diagnostic = createDiagnostic(
        lineOfText,
        childDiagnostics,
        lineIndex
      );

      if (diagnostic !== undefined) {
        diagnostics.push(diagnostic);
      }
    }
  }
  diagnosticsCollection.set(doc.uri, diagnostics);
};

export const createDiagnostic = (
  lineOfText: TextLine,
  child: DiagnosticsContent,
  lineIndex: number
): any => {
  if (child !== undefined && child.lineContent === undefined) {
    return undefined;
  }

  const index = lineOfText.text.indexOf(child.lineContent);

  // create range that represents, where in the document the word is
  const range = new Range(
    lineIndex,
    index,
    lineIndex,
    index + child.lineContent.length
  );
  let message = "";
  if (child.message !== undefined) {
    message = child.message;
  }

  let errorLevel = DiagnosticSeverity.Error;
  if (child.level === "error") {
    errorLevel = DiagnosticSeverity.Error;
  } else if (child.level === "warning") {
    errorLevel = DiagnosticSeverity.Warning;
  } else {
    errorLevel = DiagnosticSeverity.Information;
  }
  const diagnostic = new Diagnostic(range, message, errorLevel);
  diagnostic.code = {
    value: "more details",
    target: {
      // @ts-ignore
      $mid: 1,
      external:
        "https://blinktrustai-errors.s3.ap-south-1.amazonaws.com/" +
        child.key.toLowerCase() +
        ".html",
      path: "/" + child.key.toLowerCase() + ".html",
      scheme: "https",
      authority: "blinktrustai-errors.s3.ap-south-1.amazonaws.com",
    },
  }; //childToDo.referenceUrl;

  return diagnostic;
};

export class DiagnosticsContent {
  message: string = "";
  line: number = 0;
  level: string = "";
  lineContent: string = "";
  referenceUrl: string = "";
  key: string = "";

  constructor(
    message: string,
    line: number,
    level: string,
    lineContent: string,
    referenceUrl: string,
    key: string
  ) {
    this.message = message;
    this.line = line;
    this.level = level;
    this.lineContent = lineContent;
    this.referenceUrl = referenceUrl;
    this.key = key;
  }
}

export function subscribeToDocumentChanges(
  context: ExtensionContext,
  diagnosticCollection: DiagnosticCollection
): void {
  if (window.activeTextEditor) {
    refreshDiagnostics(window.activeTextEditor.document, diagnosticCollection);
  }
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        refreshDiagnostics(editor.document, diagnosticCollection);
      }
    })
  );

  context.subscriptions.push(
    workspace.onDidChangeTextDocument((e) =>
      refreshDiagnostics(e.document, diagnosticCollection)
    )
  );

  context.subscriptions.push(
    workspace.onDidCloseTextDocument((doc) =>
      diagnosticCollection.delete(doc.uri)
    )
  );
}
