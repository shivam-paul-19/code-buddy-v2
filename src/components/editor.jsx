import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { executeCode } from "../execution";

function CodeEditor({ language, line }) {
    const editorRef = useRef(null);
    let [value, setValue] = useState(line);
    let [output, setOutput] = useState("");

    const handleMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const handleSubmission = async () => {
        let out = await executeCode(value, language);
        setOutput(out);
    }

    useEffect(() => {
        setValue(line);
    }, [line]);

    return (
        <>
        <Editor
            height="80vh"
            language={language}
            theme="vs-dark"
            value={line}
            onChange={(value) => setValue(value)}
            options={{ quickSuggestions: false }}
            onMount={handleMount}
        />
        <button onClick={handleSubmission}>run code</button>
        <div style={{backgroundColor: "#fafa", height: "100px", width: "100%"}}>
            output:<br/>{output}
        </div>
        </>
    );
}

export default CodeEditor;