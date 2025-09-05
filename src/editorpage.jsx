import { useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import CodeEditor from "./components/editor";

import { defaultLines } from "./languages";
import { executeCode } from "./execution";

function EditorPage() {
  let [output, setOutput] = useState("");

  const extractValue = async (value, lang) => {
    let res = await executeCode(value, lang);
    setOutput(res);
  }

  return (
    <>
      <div>
        <CodeEditor sendValue={extractValue} mode="execution"/>
      </div>

      <div>
        output: <br/>
        {output}
      </div>
    </>
  );
}

export default EditorPage;