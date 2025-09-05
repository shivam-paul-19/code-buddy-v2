import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";
import { getResponse } from "./generate";

let key = import.meta.env.VITE_OPEN_AI_API_KEY;

function Pseudo() {
    const navigator = useNavigate();
    
    // gets value from the input code editor's value
    // and also get's response from OpenAI API
    const convertPseudo = async (value, lang) => {
        let res = await getResponse(value, "pseudo", key, lang);
        console.log(res);
    }

    let [output, setOutput] = useState("");
    
    return (
        <>
            <h1>this is Pseudo code translator</h1>
            <CodeEditor line="# Drop the pseudo code here" mode="pseudo_in" sendValue={convertPseudo}/>
            <button onClick={() => {
                navigator('/')
            }}>back</button>
            <button onClick={() => {
                navigator('/test');
            }}>Test code</button>
        </>
    );
}

export default Pseudo;