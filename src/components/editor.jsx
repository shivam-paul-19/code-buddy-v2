import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { defaultLines, buttonLabels } from "../languages";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "../style/editor.css";

function CodeEditor({
  language = "python",
  disableDropDown = false,
  disbaleSubmission = false,
  theme = "vs-dark",
  line,
  mode,
  sendValue = ((v, l) => {}),
  height = "65vh"
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
  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  const languageChange = (e) => {
    setLang(e.target.value);
    setValue(defaultLines.get(e.target.value).defaultLine.get(mode));
    setValue(value);
    console.log(e.target.value);
  };

  const handleSubmission = async () => {
    sendValue(value, lang);
  };

  return (
    <>
      {!disableDropDown ? (
        <form onChange={languageChange}>
        <Select>
        <SelectTrigger className="w-[200px]" style={{
            border: 0,
            color: "white"
          }}>
          <SelectValue placeholder="Select the langauge"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectGroup>
        </SelectContent>
        </Select>
        </form>
      ) : null}

      <Editor
        height={height}
        language={lang}
        theme={theme}
        value={value}
        onChange={(value) => setValue(value)}
        options={{ 
          quickSuggestions: false,
          suggestOnTriggerCharacters: false
        }}
        onMount={handleMount}
      />
      <br />
      {
        (!disbaleSubmission)? (
          <Button className="action-but" onClick={handleSubmission}>{buttonLabels.get(mode)}</Button>
        ) : null
      }
      
    </>
  );
}

export default CodeEditor;