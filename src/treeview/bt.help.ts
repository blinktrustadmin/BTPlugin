import { TokenManager } from './../state/token.manager';
import * as vscode from "vscode";
import { EventEmitter } from "vscode";
import { EXTENSION_ID } from "../constants";
import {
  faqChildItems,
  helpAndFeedbackTreeItems,
} from "../constants/treeview_strings";
import { helpTreeViewUri } from "../constants/treeview_uri";

export class BtHelpTreeProvider implements vscode.TreeDataProvider<any> {
  private _onDidChangeTreeData = new EventEmitter<
    HelpTreeItem | undefined | null | void
  >();

  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(
    element: HelpTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(element?: HelpTreeItem): Promise<HelpTreeItem[]> {
    if (!element) {
      return Promise.resolve(await this.getHelpTreeItemList());
    }
    return Promise.resolve(element.children ?? []);
  }

  private async getHelpTreeItemList(): Promise<HelpTreeItem[]> {
    const parent: HelpTreeItem[] = [];

    parent.push(
      new HelpTreeItem(
        helpAndFeedbackTreeItems.helpBlinkTrustAi,
        undefined,
        vscode.Uri.parse(`${helpTreeViewUri.shareFeedback}${TokenManager.getToken()}`)
      )
    );
    parent.push(
      new HelpTreeItem(
        helpAndFeedbackTreeItems.sendYourFeedback,
        undefined,
        vscode.Uri.parse(`${helpTreeViewUri.shareFeedback}${TokenManager.getToken()}`)
      )
    );
    parent.push(
      new HelpTreeItem(
        helpAndFeedbackTreeItems.shareYourExperience,
        undefined,
        vscode.Uri.parse(`${helpTreeViewUri.shareFeedback}${TokenManager.getToken()}`)
      )
    );

    parent.push(
      new HelpTreeItem(
        helpAndFeedbackTreeItems.faq,
        [
          new HelpTreeItem(
            faqChildItems.installPlugin,
            undefined,
            helpTreeViewUri.installPlugin
          ),
          new HelpTreeItem(
            faqChildItems.uninstallPlugin,
            undefined,
            helpTreeViewUri.uninstallPlugin
          ),
          new HelpTreeItem(
            faqChildItems.howToScan,
            undefined,
            helpTreeViewUri.howToScan
          ),
        ],
        undefined
      )
    );

    return parent.sort(({ label: label1 }, { label: label2 }) => {
      const l1 = label1.toLowerCase();
      const l2 = label2.toLowerCase();

      if (l1 < l2) {
        return -1;
      }
      if (l1 > l2) {
        return 1;
      }
      return 0;
    });
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class HelpTreeItem extends vscode.TreeItem {
  label: string = "";
  children?: HelpTreeItem[] | undefined;

  constructor(
    label: string,
    children?: HelpTreeItem[],
    path?: vscode.Uri,
    line?: number,
    icon?: string,
    description?: string
  ) {
    super(
      {
        label: label,
      },
      children
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );

    this.label = label;
    this.children = children;
    this.resourceUri = children ? path : undefined;
    this.description = description ? description : !!children;
    this.command = !children
      ? {
          command: EXTENSION_ID + ".openPage",
          title: "Open Page",
          arguments: [path],
        }
      : undefined;
  }
}
