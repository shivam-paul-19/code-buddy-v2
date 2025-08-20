import { useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import CodeEditor from "./components/editor";

function App() {
  let [lang, setLang] = useState("python");
  let [def, setDefaut] = useState(
    '# This is Python code editor\nprint("My own code Editor");'
  );
  const editorRef = useRef(null);
  let defaultVal = '# This is Python code editor\nprint("My own code Editor");';
  let divStyle = {
    backgroundColor: "black",
    height: "60vh",
    weight: "80vw",
  };

  const languageChange = (e) => {
    setLang(e.target.value);
    console(e.target.value);
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
      <button>Run</button>
      <div style={divStyle}>
        <CodeEditor language={lang} line={def}/>
      </div>
    </>
  );
}

export default App;