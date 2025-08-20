import Editor from '@monaco-editor/react';

function CodeEditor({language, line}) {
    return (
        <>
            <Editor height="60vh" language={language} theme='vs-dark' defaultValue={line} options={{quickSuggestions: false}}/>
        </>
    );
}

export default CodeEditor;