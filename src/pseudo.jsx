import { useNavigate } from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";
import { getResponse } from "./generate";

import "./style/pages.css";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ResultDrawer from "./components/drawer";

let key = import.meta.env.VITE_OPEN_AI_API_KEY;

function Pseudo() {
  const navigator = useNavigate();

  // gets value from the input code editor's value
  // and also get's response from OpenAI API
  const convertPseudo = async (value, lang) => {
    setOpen(true);
    setIsLoad(true);
    let res = await getResponse(value, "pseudo", key, lang);
    setIsLoad(false);
    setOutput(res);
    setLang(lang);
  };

  let [output, setOutput] = useState("");
  let [isLoad, setIsLoad] = useState(false);
  let [open, setOpen] = useState(false);
  let [lang, setLang] = useState("Python");

  return (
    <>
      <div className="page">
        <h1 className="page-title">Pseudo code translator</h1>
        <p className="page-tag">
          Drop your pseudo code and get it converted into actual code.
          <br />
          (Select the language of the output, by default it is <b>Python</b> if not selected)
        </p>
        <CodeEditor
          line="# Drop the pseudo code here"
          mode="pseudo_in"
          sendValue={convertPseudo}
        />
        <Button
          className="back-but"
          onClick={() => {
            navigator("/");
          }}
        >
          Back
        </Button>

        <ResultDrawer output={output} resLine={"Here's the translated code!"} loadLine={"The Pseudo code is being analysed, it can take some time..."} isLoad={isLoad} lang={lang} open={open} setOpen={setOpen} parentUrl="/pseudo"/>
      </div>
    </>
  );
}

export default Pseudo;
