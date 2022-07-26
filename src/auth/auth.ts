import * as vscode from "vscode";
import { Server } from "http";
import { apiBaseUrl } from "../constants";
import { TokenManager } from "../state/token.manager";
import * as express from "express";

export const authenticate = (fn: () => void) => {
  const router = express.Router();
  const app = express();
  let server: Server;
  app.use("/", router);
  app.set("port", process.env.port || 54321);
  app.use(express.static(`${__dirname}/bh`));

  app.get(`/auth/:token`, async (req, res) => {
    const { token } = req.params;
    if (!token) {
      await TokenManager.setLoggedIn(false);
      res.end(`<h1>something went wrong</h1>`);
      return;
    }
    await TokenManager.setToken(token);
    await TokenManager.setLoggedIn(true);
    fn();
    res.end(`<h1>auth was successful, you can close this now</h1>`);
    try {
      server.close();
    } catch {
      (app as any).server.close();
    }
  });

  server = app.listen(app.get("port"), function () {
    TokenManager.setAuthenticated(true);

    vscode.commands.executeCommand(
      "vscode.open",
      vscode.Uri.parse(`${apiBaseUrl}/auth/github`)
    );
  });
};
