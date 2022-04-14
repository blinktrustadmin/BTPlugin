export class Delimiter {
    public static getDelimiter(languageCode: string): string {
        let delimiter: string = "//";

        switch (languageCode) {

            case "asciidoc":
                //this.setCommentFormat("//", "////", "////");
                delimiter =  "// text";
                break;
            case "apex":
            case "javascript":
            case "javascriptreact":
            case "typescript":
            case "typescriptreact":
                //this.setCommentFormat("//", "/*", "*/");
                //this.highlightJSDoc = true;
                delimiter =  "// text";
                break;

            case "al":
            case "c":
            case "cpp":
            case "csharp":
            case "dart":
            case "flax":
            case "fsharp":
            case "go":
            case "groovy":
            case "haxe":
            case "java":
            case "jsonc":
            case "kotlin":
            case "less":
            case "pascal":
            case "objectpascal":
            case "php":
            case "rust":
            case "scala":
            case "sass":
            case "scss":
            case "shaderlab":
            case "stylus":
            case "swift":
            case "verilog":
            case "vue":
                delimiter =  "// text";
                //this.setCommentFormat("//", "/*", "*/");
                break;
            
            case "css":
                delimiter =  "/* text";
                //this.setCommentFormat("/*", "/*", "*/");
                break;

            case "coffeescript":
            case "dockerfile":
            case "gdscript":
            case "graphql":
            case "julia":
            case "makefile":
            case "perl":
            case "perl6":
            case "puppet":
            case "r":
            case "ruby":
            case "shellscript":
            case "tcl":
            case "yaml":
                delimiter = "# text";
                break;
            case "elixir":
            case "python":
                //this.setCommentFormat("#", '"""', '"""');
                //this.ignoreFirstLine = true;
                delimiter = "# text";
                break;
            
            case "nim":
                //this.setCommentFormat("#", "#[", "]#");
                delimiter = "# text";
                break;

            case "powershell":
                //this.setCommentFormat("#", "<#", "#>");
                delimiter = "# text";
                break;

            case "ada":
            case "hive-sql":
            case "pig":
            case "plsql":
            case "sql":
                //this.delimiter = "--";
                delimiter = "-- text";
                break;
            
            case "lua":
                //this.setCommentFormat("--", "--[[", "]]");
                delimiter = "-- text";
                break;

            case "elm":
            case "haskell":
                //this.setCommentFormat("--", "{-", "-}");
                delimiter = "-- text";
                break;

            case "brightscript":
            case "diagram": // ? PlantUML is recognized as Diagram (diagram)
            case "vb":
                //this.delimiter = "'";
                delimiter = "' text";
                break;

            case "bibtex":
            case "erlang":
            case "latex":
            case "matlab":
                //this.delimiter = "%";
                delimiter = "% text";
                break;

            case "clojure":
            case "racket":
            case "lisp":
                delimiter = "; text";
                break;

            case "terraform":
                //this.setCommentFormat("#", "/*", "*/");
                delimiter = "# text";
                break;

            case "COBOL":
                delimiter = "*> text";//this.escapeRegExp("*>");
                break;

            case "fortran-modern":
                delimiter = "c text";
                //this.delimiter = "c";
                break;
            
            case "SAS":
            case "stata":
                delimiter = "*";
                //this.setCommentFormat("*", "/*", "*/");
                break;
            
            case "html":
            case "markdown":
            case "xml":
                delimiter = "<!-- text -->";
                //this.setCommentFormat("<!--", "<!--", "-->");
                break;
            
            case "twig":
                delimiter = "{# text #}";
                //this.setCommentFormat("{#", "{#", "#}");
                break;

            case "genstat":
                delimiter = "\\";
                //this.setCommentFormat("\\", '"', '"');
                break;
            
            case "cfml":
                delimiter = "<!--- text --->";
                //this.setCommentFormat("<!---", "<!---", "--->");
                break;

            case "plaintext":
                delimiter = "<!--- text --->";
                break;

            default:
                delimiter = " text ";
                //this.supportedLanguage = false;
                break;
        }

        return delimiter;
    }
}