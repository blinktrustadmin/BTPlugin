import * as vscode from "vscode";
import { apiBaseUrl } from "./constants";
import * as polka from "polka";
import { TokenManager } from "./TokenManager";
import * as express from "express";
import * as path from "path";
import { Server } from "http";


export const authenticate = (fn: () => void) => {
  
  const router = express.Router();
  const app = express();
  let server: Server;
  app.use('/', router);
  app.set('port', process.env.port || 54321);
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
    
    //res.end(html);
    // console.log(__dirname + "bh/index.html");
    // res.sendFile(path.join(__dirname+'/bh/index.html'));
    res.end(`<h1>auth was successful, you can close this now</h1>`);
    try{
      server.close();
    }
    catch{(app as any).server.close();}

  });

  server = app.listen(app.get('port'), function () {
     
    if (false) {
      vscode.window.showErrorMessage("Hello....");
    } else {
      TokenManager.setAuthenticated(true);
      vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse(`${apiBaseUrl}/auth/github`)
      );
    }

  });
};
