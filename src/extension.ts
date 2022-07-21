import { getPath } from "./scanner/utils";
import { loggedIn } from "./state/state.keys";
import { BtDataComplianceTreeProvider } from "./treeview/bt.dataCompliance";
import { BtHelpTreeProvider } from "./treeview/bt.help";
import * as vscode from "vscode";
import { extensionViewIds } from "./constants/view_id";
import { EXTENSION_ID, welcomeMessage } from "./constants";
import { BtPlatformTreeProvider } from "./treeview/bt.platform";
import { TokenManager } from "./state/token.manager";
import { authenticate } from "./auth/auth";
import { BTIssueTreeProvider } from "./treeview/bt.issues";
import { subscribeToDocumentChanges } from "./scanner/diagnostics.provider";
import { BlinkCodeActionProvider } from "./scanner/codeAction.provider";

export function activate(context: vscode.ExtensionContext) {
  // Global State defined
  TokenManager.globalState = context.globalState;
  // Show Intro Message
  vscode.window.showInformationMessage(welcomeMessage);
  let editor = vscode.window.activeTextEditor;

  // Tree Providers
  const helpTreeProvider = new BtHelpTreeProvider();
  const btPlatformTreeProvider = new BtPlatformTreeProvider();
  const btDataComplianceTreeProvider = new BtDataComplianceTreeProvider();
  const btIssueTreeProvider = new BTIssueTreeProvider();

  // Tree Provider Registrations
  vscode.window.registerTreeDataProvider(
    extensionViewIds.helpTreeViewId,
    helpTreeProvider
  );

  // Registered Commands
  // Authenticate User
  context.subscriptions.push(
    vscode.commands.registerCommand(
      EXTENSION_ID + ".authenticate",
      async () => {
        try {
          authenticate(async () => {
            console.log(`Authenticate Triggered`);
            await vscode.commands.executeCommand("setContext", loggedIn, true);
          });
          // Register Tree Providers
          vscode.window.registerTreeDataProvider(
            extensionViewIds.btPlatformTreeViewId,
            btPlatformTreeProvider
          );
          vscode.window.registerTreeDataProvider(
            extensionViewIds.btPrivacyDataComplianceTreeViewId,
            btDataComplianceTreeProvider
          );
          vscode.window.registerTreeDataProvider(
            extensionViewIds.dataPrivacyTreeViewId,
            btIssueTreeProvider
          );

          context.subscriptions.push(
            vscode.commands.registerCommand(
              EXTENSION_ID + ".refreshList",
              async () => {
                btPlatformTreeProvider.refresh();
                btDataComplianceTreeProvider.refresh();
                helpTreeProvider.refresh();
                btIssueTreeProvider.refresh();
              }
            )
          );

          context.subscriptions.push(
            vscode.commands.registerCommand(
              EXTENSION_ID + ".openFile",
              (uri: vscode.Uri, col: number) => {
                vscode.window
                  .showTextDocument(uri)
                  .then((editor: vscode.TextEditor) => {
                    const pos = new vscode.Position(col, 0);
                    const pos2 = new vscode.Position(col + 1, 0);
                    editor.revealRange(
                      new vscode.Range(pos, pos2),
                      vscode.TextEditorRevealType.InCenterIfOutsideViewport
                    );
                    editor.selection = new vscode.Selection(pos, pos2);
                    editor.setDecorations(highlightDecoration, [
                      new vscode.Range(pos, pos2),
                    ]);
                  });
              }
            )
          );

          const diagnostics =
            vscode.languages.createDiagnosticCollection("blinktrust");
          context.subscriptions.push(diagnostics);
          subscribeToDocumentChanges(context, diagnostics);

          vscode.window.onDidChangeActiveTextEditor((e) => {
            if (e) {
              editor = e;
              subscribeToDocumentChanges(context, diagnostics);
            }
          });

          vscode.workspace.onDidChangeTextDocument(async () => {
            subscribeToDocumentChanges(context, diagnostics);
          });

          // Tree refresh here
          vscode.workspace.onDidSaveTextDocument(() => {
            btPlatformTreeProvider.refresh();
            btDataComplianceTreeProvider.refresh();
            helpTreeProvider.refresh();
            btIssueTreeProvider.refresh();
            subscribeToDocumentChanges(context, diagnostics);
          });
          vscode.workspace.onDidChangeConfiguration(async () => {
            btPlatformTreeProvider.refresh();
            btDataComplianceTreeProvider.refresh();
            helpTreeProvider.refresh();
            btIssueTreeProvider.refresh();
            subscribeToDocumentChanges(context, diagnostics);
          });

          context.subscriptions.push(
            vscode.languages.registerCodeActionsProvider(
              "*",
              new BlinkCodeActionProvider(),
              {
                providedCodeActionKinds:
                  BlinkCodeActionProvider.providedCodeActionKinds,
              }
            )
          );

          // Dashboard command register
          context.subscriptions.push(
            vscode.commands.registerCommand(
              EXTENSION_ID + ".dashboard",
              async () => {}
            )
          );

          // Scan command register
          context.subscriptions.push(
            vscode.commands.registerCommand(
              EXTENSION_ID + ".scan",
              async () => {
                btIssueTreeProvider.refresh();
                subscribeToDocumentChanges(context, diagnostics);
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      }
    )
  );

  // Open external page command registration
  context.subscriptions.push(
    vscode.commands.registerCommand(
      EXTENSION_ID + ".openPage",
      async (path: vscode.Uri) => {
        vscode.env.openExternal(path);
      }
    )
  );

  // Refresh views
  context.subscriptions.push(
    vscode.commands.registerCommand(EXTENSION_ID + ".refresh", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.blinktrust"
      );
    })
  );

  const highlightDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: "#C2DED1",
  });
}

export function deactivate() {}
