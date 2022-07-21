import { getPath } from "./../scanner/utils";
import * as vscode from "vscode";
import { EventEmitter } from "vscode";
import { EXTENSION_ID } from "../constants";
import { REGEX_SET, REGEX_SET_KEYS } from "../regex/regex";
import { REGEX_MESSAGE } from "../regex/regex.message";
import { REGEX_REASON } from "../regex/regex.reason";
import { REGEX_SEVERITY_ICON } from "../regex/regex.severity.icon";

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
    const arr1: BTIssueTreeProviderItem[] = [];
    let totalError = 0;

    const configurations = vscode.workspace.getConfiguration("blinktrust");

    const includePatterns = getPath(configurations.get("include"));
    const excludePatterns = getPath(configurations.get("exclude"));
    const maxFileSearch = configurations.get("maxFilesForSearch", 5120);

    const files = await vscode.workspace.findFiles(
      includePatterns,
      excludePatterns,
      maxFileSearch
    );

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const arr2: BTIssueTreeProviderItem[] = [];
        const file = files[i];
        const doc = await vscode.workspace.openTextDocument(file);
        const docUri = doc.uri;
        const fileName =
          doc.fileName.replace(/\\/g, "/").split("/").pop() ?? "unknown";
        let k = 1;

        for (let j = 0; j < doc.lineCount; j++) {
          var text = doc.lineAt(j).text;
          if (doc.fileName.endsWith("html")) {
            text = text
              .replace(/<[^>]+>/g, "")
              .replace(/=/g, " ")
              .replace(/"/g, "")
              .replace(/;/g, "");
          }
          text = text.trim();
          if (text === "") {
            continue;
          }

          const strToTest = text.replace(".", "");

          // Quick Fix Breaks for file
          if (text.split('@').pop() === "bt-ignore for this file") {
            j = doc.lineCount;
            break;
          }

          let key: string;
          for (let i = 0; i < REGEX_SET_KEYS.length; i++) {
            key = REGEX_SET_KEYS[i];
            var REGEX_NEW = REGEX_SET[key];
            var found = false;

            if (
              key === "PROPERTY_UNIT_NUMBER" ||
              key === "PROPERTY_STREET_ADDRESS" ||
              key === "PROPERTY_ADDRESS" ||
              key === "POSTAL_CODE_US" ||
              key === "POSTAL_CODE_UK"
            ) {
              if (REGEX_NEW.test(strToTest)) {
                var message = REGEX_MESSAGE[key];
                var toDoError = REGEX_REASON[key];
                var childToDo: BTIssueTreeProviderItem[] = [];
                var m = REGEX_NEW.exec(text);
                var s = "";
                if (m !== null) {
                  s = m !== undefined && m.length ? m[0] : undefined;
                } else {
                  s = text;
                }

                childToDo.push(
                  new BTIssueTreeProviderItem(
                    `${toDoError}`,
                    undefined,
                    docUri,
                    j,
                    "warning"
                  )
                );
                arr2.push(
                  new BTIssueTreeProviderItem(
                    `${s}`,
                    childToDo,
                    docUri,
                    j,
                    REGEX_SEVERITY_ICON[key].toLocaleLowerCase(),
                    message
                  )
                );
                found = true;
              }
            } else {
              var words = text.split(" ");
              words.forEach((element) => {
                if (REGEX_NEW.test(element)) {
                  //const todoText = text.slice(text.indexOf(element) + element.length + 1, text.length);
                  if (element) {
                    if (key === "PHONE" && element.length > 12) {
                      console.log("Phone Number", key);
                    } else {
                      var message = REGEX_MESSAGE[key];
                      var toDoError = REGEX_REASON[key];
                      var childToDo: BTIssueTreeProviderItem[] = [];

                      childToDo.push(
                        new BTIssueTreeProviderItem(
                          `${toDoError}`,
                          undefined,
                          docUri,
                          j,
                          "warning"
                        )
                      );

                      arr2.push(
                        new BTIssueTreeProviderItem(
                          `${element}`,
                          childToDo,
                          docUri,
                          j,
                          REGEX_SEVERITY_ICON[key].toLocaleLowerCase(),
                          message
                        )
                      );
                      k++;
                      found = true;
                    }
                  }
                }
              });
            }
            if (found) {
              break;
            }
          }
        }

        if (arr2.length) {
          arr1.push(new BTIssueTreeProviderItem(fileName, arr2, docUri));
          totalError += arr2.length - 1;
        }
      }
    }

    if (totalError > 0) {
      let fileNameMsg =
        totalError === 1
          ? "BlinkTrust AI found only 1 data security issue!⚠️"
          : "BlinkTrust AI found " + totalError + " data security issues!⚠️";
      arr1.push(new BTIssueTreeProviderItem(fileNameMsg, undefined, undefined));
    } else {
      arr1.push(
        new BTIssueTreeProviderItem(
          "BlinkTrust AI found no data security issue!✅",
          undefined,
          undefined
        )
      );
    }

    return arr1.sort(({ label: label1 }, { label: label2 }) => {
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

class BTIssueTreeProviderItem extends vscode.TreeItem {
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
