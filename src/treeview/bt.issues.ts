import { getPath } from "./../scanner/utils";
import * as vscode from "vscode";
import { EventEmitter } from "vscode";
import { EXTENSION_ID } from "../constants";
import { REGEX_SET, REGEX_SET_KEYS } from "../regex/regex";
import { REGEX_MESSAGE } from "../regex/regex.message";
import { REGEX_REASON } from "../regex/regex.reason";
import { REGEX_SEVERITY_ICON } from "../regex/regex.severity.icon";
import { fileScanner } from "../scanner/scanner";

export class BTIssueTreeProvider implements vscode.TreeDataProvider<any> {
  private _onDidChangeTreeData = new EventEmitter<
    BTIssueTreeProviderItem | undefined | null | void
  >();

  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(
    element: BTIssueTreeProviderItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(
    element?: BTIssueTreeProviderItem
  ): Promise<BTIssueTreeProviderItem[]> {
    if (!element) {
      return Promise.resolve(await this.getBTIssueTreeProviderItemList());
    }
    return Promise.resolve(element.children ?? []);
  }

  private async getBTIssueTreeProviderItemList(): Promise<
    BTIssueTreeProviderItem[]
  > {
    let parent: BTIssueTreeProviderItem[] = [];

    const { totalErrors, returningParent } = await fileScanner();

    if (totalErrors > 0) {
      parent.push(
        new BTIssueTreeProviderItem(
          "BlinkTrust AI found " + totalErrors + " data security issues!⚠️",
          returningParent,
          undefined,
          undefined
        )
      );
    } else {
      parent.push(
        new BTIssueTreeProviderItem(
          "BlinkTrust AI found no data security issue!✅",
          undefined,
          undefined
        )
      );
    }

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

export class BTIssueTreeProviderItem extends vscode.TreeItem {
  label: string = "";
  children?: BTIssueTreeProviderItem[] | undefined;

  constructor(
    label: string,
    children?: BTIssueTreeProviderItem[],
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

    let iconSvg = undefined;

    if (icon === "critical") {
      iconSvg = vscode.Uri.from({
        scheme: "data",
        path: 'image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="2" fill="#AD1A1A"/><path d="M5 3H12V5H8C6.4 5 6 6.33333 6 7V9C6 10.6 7.33333 11 8 11H12V13H5C3.4 13 3 11.6667 3 11V5C3 3.4 4.33333 3 5 3Z" fill="white"/></svg>',
      });
    } else if (icon === "high") {
      iconSvg = vscode.Uri.from({
        scheme: "data",
        path: 'image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="2" fill="#CE5019"/><path d="M3 3H6V7H10V3H13V13H10V9H6V13H3V3Z" fill="white"/><path d="M3 3H6V7H10V3H13V13H10V9H6V13H3V3Z" fill="white"/><path d="M3 3H6V7H10V3H13V13H10V9H6V13H3V3Z" fill="white"/><path d="M3 3H6V7H10V3H13V13H10V9H6V13H3V3Z" fill="white"/></svg>',
      });
    } else if (icon === "medium") {
      iconSvg = vscode.Uri.from({
        scheme: "data",
        path: 'image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="2" fill="#D68000"/><rect x="3" y="3" width="3" height="10" fill="white"/><rect x="10" y="3" width="3" height="10" fill="white"/><path d="M8 7L6 3V7L7 10H8V7Z" fill="white"/><path d="M8 7L10 3V7L9 10H8V7Z" fill="white"/></svg>',
      });
    } else if (icon === "low") {
      iconSvg = vscode.Uri.from({
        scheme: "data",
        path: 'image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="2" fill="#88879E"/><path d="M8 3H5V13H12V10H8V3Z" fill="white"/></svg>',
      });
    } else {
      iconSvg = icon ? new vscode.ThemeIcon(icon) : undefined; //new ThemeIcon(icon);
    }

    this.label = label;
    this.children = children;
    this.resourceUri = children ? path : undefined;
    this.description = description ? description : !!children;
    this.iconPath = children
      ? icon
        ? iconSvg
        : new vscode.ThemeIcon("file")
      : icon
      ? iconSvg
      : undefined;
    this.command = !children
      ? {
          command: EXTENSION_ID + ".openFile",
          title: "Open File",
          arguments: [path, line],
        }
      : undefined;
  }
}
