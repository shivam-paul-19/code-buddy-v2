export const defaultLines = new Map([
  [
    "javascript",
    {
      version: "18.15.0",
      defaultLine: new Map([
        ["pseudo_out", "// The actual code will appear here"],
        ["enhance_in", "// Enter your code here"],
        ["enhance_out", "// Enhanced code will appear here"],
      ]),
    },
  ],
  [
    "python",
    {
      version: "3.10.0",
      defaultLine: new Map([
        ["pseudo_out", "# The actual code will appear here"],
        ["enhance_in", "# Enter your code here"],
        ["enhance_out", "# Enhanced code will appear here"],
      ]),
    },
  ],
  [
    "java",
    {
      version: "15.0.2",
      defaultLine: new Map([
        ["pseudo_out", "// The actual code will appear here"],
        ["enhance_in", "// Enter your code here"],
        ["enhance_out", "// Enhanced code will appear here"],
      ]),
    },
  ],
]);

export const buttonLabels = new Map([
    ["pseudo_in", "Convert"],
    ["pseudo_out", "Test Code"],
    ["solve", "Test Code"],
    ["enhance_in", "Enhance Code"],
    ["enhance_out", "Test Code"],
    ["execution", "Run Code"]
  ]
)
