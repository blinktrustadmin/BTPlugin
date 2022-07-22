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
import { diagnosticScanner } from "./diagnostic.scanner";

export const refreshDiagnostics = (
  doc: TextDocument,
  diagnosticsCollection: DiagnosticCollection
): void => {
  const diagnostics = diagnosticScanner(doc);
  diagnostics
    .then((data) => {
      console.log("All Diagnostic data", data);
      diagnosticsCollection.set(doc.uri, data);
    })
    .catch((err) => console.log(err));
};

export const createDiagnostic = (
  lineOfText: TextLine,
  child: DiagnosticsContent,
  lineIndex: number
): any => {
  if (child !== undefined && child.lineContent === undefined) {
    return undefined;
  }
  let index = lineOfText.text.indexOf(child.lineContent);

  if (index === -1) {
    index = 0;
  }

 
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
