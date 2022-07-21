import { TokenManager } from "./../state/token.manager";
import * as vscode from "vscode";
import { EventEmitter } from "vscode";
import { EXTENSION_ID } from "../constants";
import {
  accessRegulatoryAndReportsChildItems,
  btDataPrivacyComplianceTreeItems,
} from "../constants/treeview_strings";
import { btDataComplianceTreeViewUri } from "../constants/treeview_uri";

export class BtDataComplianceTreeProvider
  implements vscode.TreeDataProvider<any>
{
  private _onDidChangeTreeData = new EventEmitter<
    BtDataComplianceTreeItem | undefined | null | void
  >();

  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(
    element: BtDataComplianceTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(
    element?: BtDataComplianceTreeItem
  ): Promise<BtDataComplianceTreeItem[]> {
    if (!element) {
      return Promise.resolve(await this.getBtDataComplianceTreeItemList());
    }
    return Promise.resolve(element.children ?? []);
  }

  private async getBtDataComplianceTreeItemList(): Promise<
    BtDataComplianceTreeItem[]
  > {
    const parent: BtDataComplianceTreeItem[] = [];

    parent.push(
      new BtDataComplianceTreeItem(
        btDataPrivacyComplianceTreeItems.accessRegulatoryAndReports,
        [
          new BtDataComplianceTreeItem(
            accessRegulatoryAndReportsChildItems.gDPR,
            undefined,
            vscode.Uri.parse(
              `${btDataComplianceTreeViewUri.gDPR}${TokenManager.getToken()}`
            )
          ),
          new BtDataComplianceTreeItem(
            accessRegulatoryAndReportsChildItems.cCPA,
            undefined,
            vscode.Uri.parse(
              `${btDataComplianceTreeViewUri.cCPA}${TokenManager.getToken()}`
            )
          ),
          new BtDataComplianceTreeItem(
            accessRegulatoryAndReportsChildItems.india,
            undefined,
            vscode.Uri.parse(
              `${btDataComplianceTreeViewUri.india}${TokenManager.getToken()}`
            )
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

class BtDataComplianceTreeItem extends vscode.TreeItem {
  label: string = "";
  children?: BtDataComplianceTreeItem[] | undefined;

  constructor(
    label: string,
    children?: BtDataComplianceTreeItem[],
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
