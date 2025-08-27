import { useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import CodeEditor from "./components/editor";

import { defaultLines } from "./languages";

const OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

function EditorPage() {
  let divStyle = {
    backgroundColor: "black",
    height: "60vh",
    weight: "80vw",
  };

  return (
    <>
      <div style={divStyle}>
        <CodeEditor />
      </div>

      <div>
        output: <br/>

      </div>
    </>
  );
}

export default EditorPage;