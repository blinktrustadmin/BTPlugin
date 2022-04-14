import * as vscode from "vscode";
import * as path from "path";
import { BLINKHUB_CONTEXT } from './constants';

const KEY = "vstodotoken";

export class TokenManager {
  static globalState: vscode.Memento;

  static setToken(token: string) {
    return this.globalState.update(KEY, token);
  }

  static getToken(): string | undefined {
    return this.globalState.get(KEY);
  }

  static setAuthenticated(value: boolean) {
    return this.globalState.update(BLINKHUB_CONTEXT.AUTHENTICATING, value);
  }

  static getAuthenticated(): string | undefined {
    return this.globalState.get(BLINKHUB_CONTEXT.AUTHENTICATING);
  }

  static setLoggedIn(value: boolean) {
    return this.globalState.update(BLINKHUB_CONTEXT.LOGGEDIN, value);
  }

  static sgetLoggedIn(): string | undefined {
    return this.globalState.get(BLINKHUB_CONTEXT.LOGGEDIN);
  }

  static get version() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require(path.join('../../../..', 'package.json'));
    return version;
 }
 
}
