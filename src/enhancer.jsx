import {useNavigate} from "react-router-dom";
import EditorPage from "./editorpage";
import CodeEditor from "./components/editor";
import { useState } from "react";

function Enhancer() {
    const navigator = useNavigate();

     // gets value from the input code editor's value
    const extractValue = (value) => {
        setOutput(value);
    }
    
    let [output, setOutput] = useState("");

    return (
        <>
            <h1>this is code enhancer</h1>
            <CodeEditor mode="enhance_in" sendValue={extractValue}/>
            <CodeEditor mode="enhance_out" line={output} sendValue={extractValue}/>
            <button onClick={() => {
                navigator('/')
            }}>back</button>
        </>
    );
}

export default Enhancer;