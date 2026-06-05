export const defineMonacoTheme = (monaco) => {
  monaco.editor.defineTheme("custom-dark", {
    base: "vs-dark", // can also be vs or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
      { token: "variable", foreground: "9cdcfe" }, // Light blue for variables
      { token: "variable.predefined", foreground: "4FC1FF" },
      { token: "variable.parameter", foreground: "9cdcfe" },
      { token: "type", foreground: "4ec9b0" }, // Cyan for types/classes
      { token: "keyword", foreground: "c586c0" }, // Purple/Pink for keywords
      { token: "string", foreground: "ce9178" }, // Orange for strings
      { token: "number", foreground: "b5cea8" }, // Light green for numbers
      { token: "comment", foreground: "6a9955", fontStyle: "italic" }, // Green for comments
      { token: "function", foreground: "dcdcaa" }, // Yellow for functions
      { token: "operator", foreground: "d4d4d4" },
      { token: "identifier", foreground: "9cdcfe" }, // Default identifier color
      { token: "constant", foreground: "4FC1FF" },
    ],
    colors: {
      "editor.background": "#1e1e1e",
      "editor.foreground": "#d4d4d4",
      "editorLineNumber.foreground": "#858585",
      "editor.selectionBackground": "#264f78",
      "editor.lineHighlightBackground": "#2a2d2e",
      "editorCursor.foreground": "#aeafad",
      "editorWhitespace.foreground": "#3b3a32",
    },
  });
};
