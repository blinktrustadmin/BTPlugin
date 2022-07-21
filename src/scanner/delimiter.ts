export class Delimiter {
  static getDelimiter(language: string): string {
    let delimiter: string = "// text";
    switch (language) {
      case "asciidoc":
        delimiter = "// text";
        break;
      case "typescriptreact":
        delimiter = "/* text */";
        break;
      case "javascriptreact":
        delimiter = "/* text */";
        break;
      case "html":
        delimiter = "<!-- text -->";
        break;
      case "python":
        delimiter = `""" text """`;
        break;
      case "javascript":
        delimiter = "/* text */";
        break;
      case "typescript":
        delimiter = "/* text */";
        break;
      default:
        delimiter = "// text";
    }
    return delimiter;
  }
}
