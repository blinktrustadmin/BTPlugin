# BlinkTrustAI for Visual Studio Code

BlinkTrustAI's Sencitive Data Discovery provided by <a href="https://www.blinktrustai.com">BlinkTrustAI.com</a> helps you find helps you discover, monitor & prevent data privacy & compliance issues for 50+ global data privacy regulations. Within a few seconds, the extension will provide a list of all the different types of Data identified  and with audit reports.

- **Automate** - We automate privacy and compliance with integrations to existing Software and IT lifecycle management tools like Jira.
- **Integrate** - We integrate with existing Integrated development environments (Visual Studio, Eclipse, etc) to ensure data privacy & compliance is addressed in design, development, pre-deployment stage in the Software lifecycle.
- **Multi-cloud** - We support on-premises, cloud, multi-cloud, and hybrid with one common platform with AI and ML-powered data privacy.

# Table of Contents

- [Introduction](#introduction)
  - [Supported languages](#supported-languages)
- [Install the extension](#install-the-extension)
- [Authentication](#authentication)
- [Uninstall the extension](#uninstall-the-extension)
- [Run analysis](#run-analysis)

## Introduction

BlinkTrustAI helps you discover, monitor & prevent data privacy & compliance issues for 50+ global data privacy regulations.

### Supported Data Source
Currently supported languages for BlinkTrustAI file are CSV, TXT, JavaScript, TypeScript, Java, Python and C#, PHP, MongoDB, MsSQL, MySQL, many other. We analyze files as defined by the following list: `csv`, `txt`, `md`, `aspx`, `CS`, `ejs`, `.es`, `.es6`, `.htm`, `.html`, `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.py`, `.java`.

## Install the extension
You can find the [BlinkTrustAI Extension](https://marketplace.visualstudio.com/items?itemName=BlinkTrustAI.blinktrust) in the Visual Studio Code Marketplace. To install, either:

- Navigate to the [BlinkTrustAI Extension on the Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=BlinkTrustAI.blinktrust)
  and follow the instructions for the BlinkTrustAI extension. The docs from VS Code help you trigger the installation process from Visual Studio Code and guide you through the installation steps.

- Browse for the extension as advised [here](https://www.blinktrustai.com/)
  and search for BlinkTrustAI, then install (as described [here](https://marketplace.visualstudio.com/items?itemName=BlinkTrustAI.blinktrust)).

Once installed you can find a BlinkTrustAI icon in the sidebar ![extension icon](https://bhscanner.s3.amazonaws.com/icons/blinkhub.png).

BlinkTrustAI's extension provides all the suggestions in a concise and clean view containing all information:

![Suggestion example](https://bt-plugin-resource.s3.ap-south-1.amazonaws.com/images/home.png)

## Authentication
To authenticate follow the steps:

1. Once the extension is installed, click on the BlinkTrustAI Icon in the left navigation bar, to show the following screen:
   ![Authentication](https://bt-plugin-resource.s3.ap-south-1.amazonaws.com/images/auth.png)

2. Click **Get Started**. The extension relies on the GitHub authentication API and it will ask you
   to authenticate you against ypur GitHub's credentials:
   ![Authentication](https://bhscanner.s3.amazonaws.com/icons/github_login.png)

3. Authorize the BlinkTrustAI App **Authenticate**.
 ![Authentication](https://bhscanner.s3.amazonaws.com/icons/auth_app_github.png)

4. After successful authentication, you will see a confirmation message:
   ![Authentication](https://bhscanner.s3.amazonaws.com/icons/authenticated.png)

5. Close the browser window and return to VS Code.
   VS Code is now reading and saving the authentication on your local machine.


## Run analysis
In the IDE you will notice that the extension is already picking up the files and uploading them for analysis.

![Run analysis](https://bt-plugin-resource.s3.ap-south-1.amazonaws.com/images/home.png)

![Audit Report](https://bt-plugin-resource.s3.ap-south-1.amazonaws.com/images/report.png)

-----------------------------------------------------------------------------------------------------------


## Uninstall the extension
To uninstall extension follow the steps:

1. Navigate to extensions from sidebar.

2. Search for the extension. And open the plugin.
 ![Uninstall the extension](https://bt-plugin-resource.s3.ap-south-1.amazonaws.com/images/uninstall.png)

3. There will be an option to uninstall plugin. Click on uninstall and reload the vscode.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
