export class Delimiter {

    static getDelimiter(language: string): string {
        let delimiter: string = '// text';
        switch (language) {
            case "asciidoc":
                delimiter = "// text";
                break;
            case "ts":
                delimiter = "/* text */";
                break;
            case "js": 
                delimiter = "/* text */";
                break;
            case "html":
                delimiter = "<!-- text -->";
                break;
            default:
                delimiter = "// text";
        }
        return delimiter;
    }

}