import { useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import CodeEditor from "./components/editor";

import { defaultLines } from "./languages";

const OPEN_AI_KEY = import.meta.env;
console.log(OPEN_AI_KEY);

function App() {
  let [lang, setLang] = useState("python");
  let [def, setDefault] = useState(
    '# This is Python code editor\n\nprint("My own code Editor");'
  );
 

  let divStyle = {
    backgroundColor: "black",
    height: "60vh",
    weight: "80vw",
  };

  const languageChange = (e) => {
    setLang(e.target.value);
    setDefault(defaultLines.get(e.target.value).defaultLine);
  };

  return (
    <>
      <form onChange={languageChange}>
        <label htmlFor="lang">Choose langauge</label>
        <select name="lang" id="lang">
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </form>

      <div style={divStyle}>
        <CodeEditor language={lang} line={def}/>
      </div>
    </>
  );
}

export default App;