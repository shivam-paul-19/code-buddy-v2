import { useState } from "react";

import CodeEditor from "./components/editor";
import OutputTerminal from "./components/output";
import { useNavigate, useLocation } from "react-router";

import { executeCode } from "./execution";

import "./style/pages.css";
import { Button } from "@/components/ui/button";

function EditorPage() {
  let location = useLocation();
  const navigator = useNavigate();

  let [output, setOutput] = useState("Output will here shown here");
  let {line, language, parentPath} = location.state;

  const extractValue = async (value, lang) => {
    let res = await executeCode(value, lang);
    setOutput(res);
  }

  return (
    <>
      <div className="page">
        <h1 className="page-title">Run and Test your code here</h1>
        <p className="page-tag">&nbsp;</p>
      <div>
        <CodeEditor sendValue={extractValue} mode="execution" line={line} language={language} height="40vh" disableDropDown={true}/>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={() => {
          navigator(parentPath);
        }}>back</Button>
        <br /><br />
      </div>
        <OutputTerminal output={output}/>
      </div>
    </>
  );
}

export default EditorPage;