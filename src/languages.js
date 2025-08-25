export const languages = {
  javascript: {
    version: "18.15.0",
  },
  python: {
    version: "3.10.0",
  },
  java: {
    version: "15.0.2",
  },
};

export const defaultLines = new Map([
    [
        "javascript",
        {
            version: "18.15.0",
            defaultLine: '// This is javaScript code editor\n\nconsole.log("My own code editor");'
        }
    ],
    [
        "python",
        {   
            version: "3.10.0",
            defaultLine: '# This is python code editor\n\nprint("My own code Editor");'
        } 
        
    ],
    [
        "java",
        {
            version: "15.0.2",
            defaultLine: '// This is java code editor\n\npublic class Code {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("My Own code editor");\n\t}\n}' 
        }
        
    ],
]);
