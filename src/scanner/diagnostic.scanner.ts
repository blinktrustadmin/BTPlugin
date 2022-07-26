import { REGEX_SET, REGEX_SET_KEYS } from "./../regex/regex";
import { REGEX_LEVEL } from "../regex/regex.level";
import { REGEX_MESSAGE } from "../regex/regex.message";
import { REGEX_REASON } from "../regex/regex.reason";
import { REGEX_SEVERITY_ICON } from "../regex/regex.severity.icon";
import { Diagnostic, TextDocument } from "vscode";
import { createDiagnostic, DiagnosticsContent } from "./diagnostics.provider";

export const diagnosticScanner = async (
  doc: TextDocument
): Promise<Diagnostic[]> => {
  var diagnostics: Diagnostic[] = [];

  for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
    // Get text of the line
    var text = doc.lineAt(lineIndex).text.trim();
    var textLine = doc.lineAt(lineIndex);
    var found = false;

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
      lineIndex = doc.lineCount;
      continue;
    }

    // Otherwise check the regex patterns
    const textString = text.replace(".", "");

    // Traverse through all regex
    for (let regexIndex = 0; regexIndex < REGEX_SET_KEYS.length; regexIndex++) {
      let regexKey = REGEX_SET_KEYS[regexIndex];
      let testingRegex = new RegExp(REGEX_SET[regexKey], "i");

      var diagnosticContent: any;

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
          // Creating diagnostic entry
          diagnosticContent = new DiagnosticsContent(
            message,
            lineIndex,
            level,
            responseText,
            reason,
            regexKey
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
                diagnosticContent = new DiagnosticsContent(
                  message,
                  lineIndex,
                  level,
                  element,
                  reason,
                  regexKey
                );
                found = true;
              }
            }
          } else if (element.length === 12) {
            // France Id Regex
            if (regexKey === "nationalIdFrance") {
              if (testingRegex.test(element)) {
                diagnosticContent = new DiagnosticsContent(
                  message,
                  lineIndex,
                  level,
                  element,
                  reason,
                  regexKey
                );
                found = true;
              }
            }
          } else if (element.length >= 10 && element.length <= 14) {
            // Check for UK phone number
          } else if (element.length === 16) {
            if (regexKey === "ukDriverLicense") {
              if (testingRegex.test(element)) {
                diagnosticContent = new DiagnosticsContent(
                  message,
                  lineIndex,
                  level,
                  element,
                  reason,
                  regexKey
                );
                found = true;
              }
            }
          }
          else {
            if (
              regexKey !== "nationalIdFrance" &&
              regexKey !== "indianMobile" &&
              regexKey !== "address" &&
              regexKey !== "ukAddress" &&
              regexKey !== "usAddress"
            ) {
              if (testingRegex.test(element)) {
                diagnosticContent = new DiagnosticsContent(
                  message,
                  lineIndex,
                  level,
                  element,
                  reason,
                  regexKey
                );
                found = true;
              }
            }
          }
        });
      }

      if (found) {
        if (diagnosticContent === undefined) {
          continue;
        }

        let newDiagnostic: Diagnostic = createDiagnostic(
          textLine,
          diagnosticContent,
          lineIndex
        );

        if (newDiagnostic !== undefined) {
          diagnostics.push(newDiagnostic);
        }

        break;
      }
    }
  }
  return diagnostics;
};
