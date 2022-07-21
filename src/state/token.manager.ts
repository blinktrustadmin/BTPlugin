import path = require("path");
import { Memento } from "vscode";
import { authenticating, loggedIn, token } from "./state.keys";
export class TokenManager {
  static globalState: Memento;

  static setToken(authToken: string) {
    return this.globalState.update(token, authToken);
  }

  static getToken(): string | undefined {
    return this.globalState.get(token);
  }

  static setAuthenticated(value: boolean) {
    return this.globalState.update(authenticating, value);
  }

  static getAuthenticated(): boolean | undefined {
    return this.globalState.get(authenticating);
  }

  static setLoggedIn(value: boolean) {
    return this.globalState.update(loggedIn, value);
  }

  static getLoggedIn(): boolean | undefined {
    return this.globalState.get(loggedIn);
  }

  static get version() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require(path.join("../../../..", "package.json"));
    return version;
  }
}
