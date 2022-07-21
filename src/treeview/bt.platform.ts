import * as vscode from "vscode";
import { EventEmitter } from "vscode";
import { EXTENSION_ID } from "../constants";
import {
  btDiscoveryChildItems,
  btPlatformTreeItems,
  btPrivacyApisChildItem,
  btVaultChildItems,
} from "../constants/treeview_strings";
import { btPlatformTreeViewUri } from "../constants/treeview_uri";
import { TokenManager } from "../state/token.manager";

export class BtPlatformTreeProvider implements vscode.TreeDataProvider<any> {
  private _onDidChangeTreeData = new EventEmitter<
    BtPlatformTreeItem | undefined | null | void
  >();

  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(
    element: BtPlatformTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(
    element?: BtPlatformTreeItem
  ): Promise<BtPlatformTreeItem[]> {
    if (!element) {
      return Promise.resolve(await this.getBtPlatformTreeItemList());
    }
    return Promise.resolve(element.children ?? []);
  }

  private async getBtPlatformTreeItemList(): Promise<BtPlatformTreeItem[]> {
    const parent: BtPlatformTreeItem[] = [];

    parent.push(
      new BtPlatformTreeItem(
        btPlatformTreeItems.btDiscoveryEngine,
        [
          new BtPlatformTreeItem(
            btDiscoveryChildItems.discoverPiiData,
            undefined,
            vscode.Uri.parse(`${btPlatformTreeViewUri.discoverPiiData}${TokenManager.getToken()}`)
          ),
        ],
        undefined
      )
    );

    parent.push(
      new BtPlatformTreeItem(
        btPlatformTreeItems.btPrivacyApis,
        [
          new BtPlatformTreeItem(
            btPrivacyApisChildItem.useOurApi,
            undefined,
            vscode.Uri.parse(`${btPlatformTreeViewUri.useOurApi}${TokenManager.getToken()}`)
          ),
        ],
        undefined
      )
    );

    parent.push(
      new BtPlatformTreeItem(
        btPlatformTreeItems.btVault,
        [
          new BtPlatformTreeItem(
            btVaultChildItems.offloadSensitiveData,
            undefined,
            vscode.Uri.parse(`${btPlatformTreeViewUri.offloadSensitiveData}${TokenManager.getToken()}`)
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

class BtPlatformTreeItem extends vscode.TreeItem {
  label: string = "";
  children?: BtPlatformTreeItem[] | undefined;

  constructor(
    label: string,
    children?: BtPlatformTreeItem[],
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
