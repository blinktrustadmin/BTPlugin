import { REGEX_LEVEL } from "./../regex/regex.level";
import { REGEX_REASON } from "./../regex/regex.reason";
import { REGEX_MESSAGE } from "./../regex/regex.message";
import { workspace } from "vscode";
import { REGEX_SET, REGEX_SET_KEYS } from "../regex/regex";
import { BTIssueTreeProviderItem } from "../treeview/bt.issues";
import { getPath } from "./utils";
import { REGEX_SEVERITY_ICON } from "../regex/regex.severity.icon";

interface ResponseInterfaceScanner {
  returningParent: BTIssueTreeProviderItem[];
  totalErrors: number;
}

export const fileScanner = async (): Promise<ResponseInterfaceScanner> => {
  const configurations = workspace.getConfiguration("blinktrust");
  const includePatterns = getPath(configurations.get("include"));
  const excludePatterns = getPath(configurations.get("exclude"));
  const maxFileSearch = configurations.get("maxFilesForSearch", 5120);

  const files = await workspace.findFiles(
    includePatterns,
    excludePatterns,
    maxFileSearch
  );

  let returningParent: BTIssueTreeProviderItem[] = [];
  let totalErrors: number = 0;

  if (files && files.length) {
    var localParent: BTIssueTreeProviderItem[] = [];
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const doc = await workspace.openTextDocument(files[fileIndex]);
      const docUri = doc.uri;
      const fileName =
        doc.fileName.replace(/\\/g, "/").split("/").pop() ?? "unknown";
      // Fetch file content line by line
      for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
        // Captures child for this file
        var localChild: BTIssueTreeProviderItem[] = [];
        // Get text of the line
        var text = doc.lineAt(lineIndex).text.trim();

        // Format html files text
        if (doc.fileName.endsWith("html") || doc.fileName.endsWith("htm")) {
          text = text
            .replace(/<[^>]+>/g, "")
            .replace(/=/g, " ")
            .replace(/"/g, "")
            .replace(/;/g, "");
        }

        // If text is empty string skip the line
        if (text === "") {
          continue;
        }

        // Check for file ignore
        if (text.split("@bt-ignore").pop() === " for this file") {
          const index = returningParent.findIndex((e) => e.label === fileName);
          if (index >= 0) {
            returningParent.splice(index, 1);
          }
          lineIndex = doc.lineCount;
          continue;
        }

        // Otherwise check the regex patterns
        const textString = text.replace(".", "");

        // Traverse through all regex
        for (
          let regexIndex = 0;
          regexIndex < REGEX_SET_KEYS.length;
          regexIndex++
        ) {
          let regexKey = REGEX_SET_KEYS[regexIndex];
          let testingRegex = new RegExp(REGEX_SET[regexKey], "i");
          var found: boolean = false;

          //   Long string check will be on addresses
          if (
            regexKey === "usStreetAddress" ||
            regexKey === "ukAddress" ||
            regexKey === "address"
          ) {
            // Check full line for issue
            var responseText = "";
            if (testingRegex.test(textString)) {
              var message = REGEX_MESSAGE[regexKey];
              var reason = REGEX_REASON[regexKey];
              var result = testingRegex.exec(text);
              var level = REGEX_LEVEL[regexKey];
              var severityIcon = REGEX_SEVERITY_ICON[regexKey];
              if (result && result.length) {
                responseText = result[0];
              } else {
                responseText = text;
              }
              // Creating child entry
              localChild.push(
                new BTIssueTreeProviderItem(
                  reason,
                  undefined,
                  docUri,
                  lineIndex,
                  level
                )
              );
              // Adding child to its parent
              localParent.push(
                new BTIssueTreeProviderItem(
                  `${responseText}`,
                  localChild,
                  docUri,
                  lineIndex,
                  severityIcon,
                  message
                )
              );
              found = true;
            }
          } else {
            // Check for each word in line
            var words: any[] = text.split(" ");
            // Traverse words array
            words.forEach((element) => {
              //  Common Data set
              var message = REGEX_MESSAGE[regexKey];
              var reason = REGEX_REASON[regexKey];
              var level = REGEX_LEVEL[regexKey];
              var severityIcon = REGEX_SEVERITY_ICON[regexKey];

              // Check for Indian mobile number
              if (element.length >= 10 && element.length <= 14) {
                if (regexKey === "indianMobile") {
                  if (testingRegex.test(element)) {
                    localChild.push(
                      new BTIssueTreeProviderItem(
                        reason,
                        undefined,
                        docUri,
                        lineIndex,
                        level
                      )
                    );
                    localParent.push(
                      new BTIssueTreeProviderItem(
                        element,
                        localChild,
                        docUri,
                        lineIndex,
                        severityIcon,
                        message
                      )
                    );
                    found = true;
                  }
                }
              }
              if (element.length === 12) {
                // France Id Regex
                if (regexKey === "nationalIdFrance") {
                  if (testingRegex.test(element)) {
                    localChild.push(
                      new BTIssueTreeProviderItem(
                        reason,
                        undefined,
                        docUri,
                        lineIndex,
                        level
                      )
                    );
                    localParent.push(
                      new BTIssueTreeProviderItem(
                        element,
                        localChild,
                        docUri,
                        lineIndex,
                        severityIcon,
                        message
                      )
                    );
                    found = true;
                  }
                }
              }
              if (element.length >= 10 && element.length <= 14) {
                // Check for UK phone number
                if (regexKey === "ukPhone") {
                  if (testingRegex.test(element)) {
                    localChild.push(
                      new BTIssueTreeProviderItem(
                        reason,
                        undefined,
                        docUri,
                        lineIndex,
                        level
                      )
                    );
                    localParent.push(
                      new BTIssueTreeProviderItem(
                        element,
                        localChild,
                        docUri,
                        lineIndex,
                        severityIcon,
                        message
                      )
                    );
                    found = true;
                  }
                }
              }
              if (element.length === 16) {
                if (regexKey === "ukDriverLicense") {
                  if (testingRegex.test(element)) {
                    localChild.push(
                      new BTIssueTreeProviderItem(
                        reason,
                        undefined,
                        docUri,
                        lineIndex,
                        level
                      )
                    );
                    localParent.push(
                      new BTIssueTreeProviderItem(
                        element,
                        localChild,
                        docUri,
                        lineIndex,
                        severityIcon,
                        message
                      )
                    );
                    found = true;
                  }
                }

              }
              if (element.length === 10) {
            
                if (regexKey === "indianPanCard") {
                  if (testingRegex.test(element)) {
                    localChild.push(
                      new BTIssueTreeProviderItem(
                        reason,
                        undefined,
                        docUri,
                        lineIndex,
                        level
                      )
                    );
                    localParent.push(
                      new BTIssueTreeProviderItem(
                        element,
                        localChild,
                        docUri,
                        lineIndex,
                        severityIcon,
                        message
                      )
                    );
                    found = true;
                  }
                }
              }
              if (element.length >=12 && element.length <= 14) {
                if (regexKey === "indianAadhar") {
                  if (testingRegex.test(element)) {
                    localChild.push(
                      new BTIssueTreeProviderItem(
                        reason,
                        undefined,
                        docUri,
                        lineIndex,
                        level
                      )
                    );
                    localParent.push(
                      new BTIssueTreeProviderItem(
                        element,
                        localChild,
                        docUri,
                        lineIndex,
                        severityIcon,
                        message
                      )
                    );
                    found = true;
                  }
                }
              }

              if (
                regexKey !== "nationalIdFrance" &&
                regexKey !== "indianMobile" &&
                regexKey !== "address" &&
                regexKey !== "ukAddress" &&
                regexKey !== "usAddress" &&
                regexKey !== "indianAadhar" &&
                regexKey !== "indianPanCard"
              ) {
                if (testingRegex.test(element)) {
                  localChild.push(
                    new BTIssueTreeProviderItem(
                      reason,
                      undefined,
                      docUri,
                      lineIndex,
                      level
                    )
                  );
                  localParent.push(
                    new BTIssueTreeProviderItem(
                      element,
                      localChild,
                      docUri,
                      lineIndex,
                      severityIcon,
                      message
                    )
                  );
                  found = true;
                }
              }

            });
          }
          if (found) {
            break;
          }
        }
      }

      if (localParent.length) {
        returningParent.push(
          new BTIssueTreeProviderItem(fileName, localParent, docUri)
        );
        totalErrors += localParent.length;
        localParent = [];
      }
    }
  }

  return {
    returningParent,
    totalErrors,
  };
};
