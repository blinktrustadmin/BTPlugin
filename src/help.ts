import {
  EventEmitter,
  GlobPattern,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  Uri,
  workspace,
} from "vscode";
import {
  COMMANDS,
  EXCLUDE,
  INCLUDE,
  MAX_RESULTS,
  REGEX,
  TODO,
  VALIDATOR_ERROR_MESSAGES,
  VALIDATOR_ERROR_REASONS,
  VALIDATOR_REGEXPS,
  VALIDATOR_REGEXPS_KEYS,
  VALIDATOR_SEVERTY_ICON,
} from "./constants";
import { Decoration } from "./decoration";
import * as vscode from "vscode";

export class TodoTreeListHelp implements TreeDataProvider<Todo> {
  private _onDidChangeTreeData = new EventEmitter<
    Todo | undefined | null | void
  >();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(element: Todo): TreeItem {
    return element;
  }

  async getChildren(element?: Todo): Promise<Todo[]> {
    if (!element) {
      return Promise.resolve(await this.getTodoList());
    }
    return Promise.resolve(element.children ?? []);
  }

  private async getTodoList(): Promise<Todo[]> {
    const arr1: Todo[] = [];
    const childToDo: Todo[] = [];
    let totalError = 0;
    const files = await workspace.findFiles(
      pattern(Decoration.include(), INCLUDE),
      pattern(Decoration.exclude(), EXCLUDE),
      MAX_RESULTS
    );

    let product = "Help BlinkTrust AI to make a better product for you!";
    arr1.push(new Todo(product, undefined, undefined));

    let experience = "Share your experience with us!";
    arr1.push(new Todo(experience, undefined, undefined));

    let bug = "Send your feedback & suggestions or report a bug!";
    arr1.push(new Todo(bug, undefined, undefined));

    let faq1 = "How to install BlinkTrust AI's Extension?";
    childToDo.push(new Todo(faq1, undefined, undefined, 0, "warning"));

    let faq2 = "How to uninstall BlinkTrust AI's Extension?";
    childToDo.push(new Todo(faq2, undefined, undefined, 0, "warning"));

    let faq3 = "How to scan with BlinkTrust AI's Extension?";
    childToDo.push(new Todo(faq3, undefined, undefined, 0, "warning"));

    let todo = "FQA - top 10 frequently asked interview questions!";
    arr1.push(new Todo(todo, childToDo, undefined));

    // TODO: find a better way
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

class Todo extends TreeItem {
  label: string;
  children: Todo[] | undefined;

  constructor(
    label: string,
    children?: Todo[],
    path?: Uri,
    col?: number,
    icon?: string,
    description?: string
  ) {
    super(
      {
        label: label,
        highlights: [
          [0, 5],
          [9, 12],
        ],
      },
      children
        ? TreeItemCollapsibleState.Collapsed
        : TreeItemCollapsibleState.None
    );

    let iconSvg = undefined;
    let routingPath = undefined;

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
      iconSvg = icon ? new ThemeIcon(icon) : undefined; //new ThemeIcon(icon);
    }

    if (label === "How to install BlinkTrust AI's Extension?") {
      routingPath = vscode.Uri.parse(`https://github.com/blinktrustadmin/BTPlugin#install-the-extension`);
    } else if (label === "How to uninstall BlinkTrust AI's Extension?") {
      routingPath = vscode.Uri.parse(`https://github.com/blinktrustadmin/BTPlugin#uninstall-the-extension`);
    } else if (label === "How to scan with BlinkTrust AI's Extension?") {
      routingPath = vscode.Uri.parse(`https://github.com/blinktrustadmin/BTPlugin#run-analysis`);
    } else if (
      label === "Help BlinkTrust AI to make a better product for you!"
    ) {
    } else if (label === "Send your feedback & suggestions or report a bug!") {
    } else {
    }

    this.label = label;
    this.children = children;
    this.iconPath = children
      ? icon
        ? iconSvg
        : new ThemeIcon("file")
      : icon
      ? iconSvg
      : undefined;
    this.resourceUri = children ? path : undefined;
    this.description = description ? description : !!children;
    this.command = !children
      ? {
          command: COMMANDS.OPEN_LINK,
          title: "Open link",
          arguments: [routingPath],
        }
      : undefined;
  }
}

function pattern(glob: string[], def: string[]): GlobPattern {
  if (Array.isArray(glob) && glob.length) {
    return "{" + glob.join(",") + "}";
  }

  return "{" + def.join(",") + "}";
}
