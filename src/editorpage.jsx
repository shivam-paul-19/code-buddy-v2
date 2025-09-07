import { useState } from "react";

import CodeEditor from "./components/editor";
import { useNavigate, useLocation } from "react-router";

import { executeCode } from "./execution";

function EditorPage() {
  let location = useLocation();
  const navigator = useNavigate();

  let [output, setOutput] = useState("");
  let {line, language, parentPath} = location.state;

  const extractValue = async (value, lang) => {
    let res = await executeCode(value, lang);
    setOutput(res);
  }

  return (
    <>
      <div>
        <CodeEditor sendValue={extractValue} mode="execution" line={line} language={language}/>
      </div>

      <div>
        output: <br/>
        {output}
      </div>
      <button onClick={() => {
        navigator(parentPath);
      }}>back</button>
    </>
  );
}

export default EditorPage;