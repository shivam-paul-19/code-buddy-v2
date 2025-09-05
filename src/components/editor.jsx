import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { executeCode } from "../execution";
import { defaultLines, buttonLabels } from "../languages";
import { getMockResponse } from "../fakeres";
import { getResponse } from "../generate";

const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

function CodeEditor({
  language = "python",
  disableDropDown = false,
  disbaleSubmission = false,
  line,
  mode,
  sendValue
}) {
  // this function will call on the first render of the page
  useEffect(() => {
    // if line isn't defined then take it from the map
    if (!line) {
      line = defaultLines.get(language).defaultLine.get(mode);
    }
  }, []);

  useEffect(() => {
    setValue(line);
  }, [line]);

  // state and reference variables
  const editorRef = useRef(null);
  let [value, setValue] = useState(line);
  let [lang, setLang] = useState(language);

  // puts focus on the editor
  const handleMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const languageChange = (e) => {
    setLang(e.target.value);
    setValue(defaultLines.get(e.target.value).defaultLine.get(mode));
    setValue(value);
  };

  const handleSubmission = async () => {
    sendValue(value, lang);
  };

  return (
    <>
      {!disableDropDown ? (
        <form onChange={languageChange}>
          <label htmlFor="lang">Choose langauge</label>
          <select name="lang" id="lang">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </form>
      ) : null}

      <Editor
        height="80vh"
        language={lang}
        theme="vs-dark"
        value={value}
        onChange={(value) => setValue(value)}
        options={{ quickSuggestions: false }}
        onMount={handleMount}
      />
      {
        (!disbaleSubmission)? (
          <button onClick={handleSubmission}>{buttonLabels.get(mode)}</button>
        ) : null
      }
      
    </>
  );
}

export default CodeEditor;