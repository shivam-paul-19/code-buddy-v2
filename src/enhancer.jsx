import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";
import { getResponse } from "./generate";

import "./style/pages.css";

import { Button } from "@/components/ui/button";
import ResultDrawer from "./components/drawer";

let key = import.meta.env.VITE_OPEN_AI_API_KEY;

function Enhancer() {
    const navigator = useNavigate();

    // gets value from the input code editor's value
    // and also get's response from OpenAI API
    const enhanceCode = async (value, lang) => {
        setIsLoad(true);
        setOpen(true);
        let res = await getResponse(value, "enhance", key, lang);
        setIsLoad(false);
        setOutput(res);
        setLang(lang);
    }
    
    let [output, setOutput] = useState("");
    let [isLoad, setIsLoad] = useState(false);
    let [open, setOpen] = useState(false);
    let [lang, setLang] = useState("Python");

    return (
      <>
        <div className="page">
        <h1 className="page-title">Code Enhancer</h1>
        <p className="page-tag">Drop your code here and enhance it.<br/>
        (Select the language of the output, by default it is <b>Python</b> if not selected)</p>
        <CodeEditor line="# Drop the code here" mode="enhance_in" sendValue={enhanceCode}/>
        <Button className="back-but" onClick={() => {
            navigator('/')
        }}>back</Button>
        <ResultDrawer output={output} resLine={"sample line"} loadLine={"loading"} isLoad={isLoad} lang={lang} open={open} setOpen={setOpen} parentUrl="/enhancer"/>
        </div>
      </>
    );
}

export default Enhancer;