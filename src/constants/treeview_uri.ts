import { Uri } from "vscode";

export const helpTreeViewUri: any = {
  installPlugin: Uri.parse(
    `https://github.com/blinktrustadmin/BTPlugin#install-the-extension`
  ),
  uninstallPlugin: Uri.parse(
    `https://github.com/blinktrustadmin/BTPlugin#uninstall-the-extension`
  ),
  howToScan: Uri.parse(
    `https://github.com/blinktrustadmin/BTPlugin#run-analysis`
  ),
};

export const btPlatformTreeViewUri: any = {
  discoverPiiData: Uri.parse(`https://www.blinktrust.com/integration?t=`),
  useOurApi: Uri.parse(`https://www.blinktrust.com/report.html`),
  offloadSensitiveData: Uri.parse(`https://www.blinktrust.com/btvault`),
};

export const btDataComplianceTreeViewUri: any = {
  gDPR: Uri.parse(`https://www.blinktrust.com/question?type=gdpr&t=`),
  cCPA: Uri.parse(`https://www.blinktrust.com/question?type=ccpa&t=`),
  india: Uri.parse(`https://www.blinktrust.com/question?type=india&t=`),
};
