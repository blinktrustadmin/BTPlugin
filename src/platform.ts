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
import { TokenManager } from "./TokenManager";

export class TodoTreeListPlatform implements TreeDataProvider<Todo> {
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
    const parentTreeItem: Todo[] = [];
    const childTreeItemLevelDE: Todo[] = [];
    const childTreeItemLevelVault: Todo[] = [];
    const childTreeItemLevelPrivacy: Todo[] = [];
    let totalError = 0;
    const files = await workspace.findFiles(
      pattern(Decoration.include(), INCLUDE),
      pattern(Decoration.exclude(), EXCLUDE),
      MAX_RESULTS
    );

    const parentLevel2One = "BlinkTrust Discovery engine";
    const parentLevel2OneChildOne =
      "Discover Pii data across enterprise and fix it";
    childTreeItemLevelDE.push(
      new Todo(parentLevel2OneChildOne, undefined, undefined, 0)
    );
    parentTreeItem.push(
      new Todo(parentLevel2One, childTreeItemLevelDE, undefined, 0)
    );

    const parentLevel2Two = "BlinkTrust Vault";
    const parentLevel2TwoChildOne =
      "Offload sensitive Pii to our vault to get compliance";
    childTreeItemLevelVault.push(
      new Todo(parentLevel2TwoChildOne, undefined, undefined, 0)
    );
    parentTreeItem.push(
      new Todo(parentLevel2Two, childTreeItemLevelVault, undefined, 0)
    );

    const parentLevel2Three = "BlinkTrust Privacy API's";
    const parentLevel2ThreeChildOne = "Use our API's to manage tokenized data";
    childTreeItemLevelPrivacy.push(
      new Todo(parentLevel2ThreeChildOne, undefined, undefined, 0)
    );
    parentTreeItem.push(
      new Todo(parentLevel2Three, childTreeItemLevelPrivacy, undefined, 0)
    );

    return parentTreeItem.sort(({ label: label1 }, { label: label2 }) => {
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

    if (label === "Discover Pii data across enterprise and fix it") {
      routingPath = vscode.Uri.parse(`https://www.blinktrust.com/integration?t=` + TokenManager.getToken());
    } else if (
      label === "Offload sensitive Pii to our vault to get compliance"
    ) {
      routingPath = vscode.Uri.from({
        scheme: "https",
        authority: "www.blinktrust.com",
        path: "report.html",
      });
    } else {
      routingPath = vscode.Uri.from({
        scheme: "https",
        authority: "www.blinktrust.com",
        path: "btvault",
      });
    }

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
          title: "Open Link",
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
