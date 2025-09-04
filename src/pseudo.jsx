import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";

function Pseudo() {
    const navigator = useNavigate();
    
    // gets value from the input code editor's value
    const extractValue = (value) => {
        setOutput(value);
    }

    let [output, setOutput] = useState("");
    
    return (
        <>
            <h1>this is Pseudo code translator</h1>
            <CodeEditor line="# Drop the pseudo code here" mode="pseudo_in" sendValue={extractValue}/>
            <CodeEditor mode="pseudo_out" line={output} sendValue={extractValue} disableDropDown={true}/>
            <button onClick={() => {
                navigator('/')
            }}>back</button>
        </>
    );
}

export default Pseudo;