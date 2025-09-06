import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";
import { getMockResponse } from "./fakeres";
import { marked } from "marked";
import { getResponse } from "./generate";

const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY

function Solver() {
    const navigator = useNavigate();
    let [solved, setSolved] = useState(false);
    let [output, setOutput] = useState("");
    let [code, setCode] = useState("");
    let [lang, setLang] = useState("");

    const handleSumbission = async (e) => {
        e.preventDefault();
        setSolved(true);
        let res = await getResponse(e.target[0].value, "solve", API_KEY, e.target[1].value);
        let start = res.indexOf("```") + (`${e.target[1].value}`).length;
        let end = res.lastIndexOf("```");
        let code = res.substring(start+2, end);
        setCode(code);
        setLang(e.target[1].value);
        setOutput(marked(res));
    }

    return (
        <>
            <h1>this is DSA solver</h1>
            <form onSubmit={handleSumbission}>
                <input type="text" />
                <select>
                    <option value="python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                </select>
                <button type="submit">Solve</button>
            </form>
            {
                (solved)? (
                    <div
                        dangerouslySetInnerHTML={{ __html: output }}
                    />
                ) : null
            }
            <button onClick={() => {
                navigator('/')
            }}>back</button>
            <button onClick={() => {
                navigator('/test', {
                    state: {
                        line: code,
                        language: lang,
                        parentPath: '/solve'
                    }
                })
            }}>test code</button>
            <button onClick={async () => {
                await window.navigator.clipboard.writeText(code);
            }}>Copy code</button>
        </>
    );
}

export default Solver;