export class Delimiter {
  static getDelimiter(language: string): string {
    let delimiter: string = "// text\n";
    switch (language) {
      case "asciidoc":
        delimiter = "// text\n";
        break;
      case "typescriptreact":
        delimiter = "/* text */\n";
        break;
      case "javascriptreact":
        delimiter = "/* text */\n";
        break;
      case "html":
        delimiter = "<!-- text -->\n";
        break;
      case "python":
        delimiter = `""" text """\n`;
        break;
      case "javascript":
        delimiter = "/* text */\n";
        break;
      case "typescript":
        delimiter = "/* text */\n";
        break;
      default:
        delimiter = "// text\n";
    }
    return delimiter;
  }
}
