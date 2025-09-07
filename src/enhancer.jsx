import {useNavigate} from "react-router-dom";
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
  DrawerTitle
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

let key = import.meta.env.VITE_OPEN_AI_API_KEY;

function Enhancer() {
    const navigator = useNavigate();

    // gets value from the input code editor's value
    // and also get's response from OpenAI API
    const enhanceCode = async (value, lang) => {
        setIsLoad(true);
        SetOpen(true);
        let res = await getResponse(value, "enhance", key, lang);
        setIsLoad(false);
        setOutput(res);
        setLang(lang);
    }
    
    let [output, setOutput] = useState("");
    let [isLoad, setIsLoad] = useState(false);
    let [open, SetOpen] = useState(false);
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

        <Drawer open={open} onOpenChange={SetOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {!isLoad
                  ? "Here's the enhanced code"
                  : "Your code is being enhanced, it may take some seconds..."}
              </DrawerTitle>
              <DrawerDescription>
                <div style={{
                    overflowX: "scroll",
                    maxHeight: "320px"
                }}>
                    {
                        (!isLoad)? (
                            <CodeEditor disableDropDown={true} line={output}/>
                        ) : (
                            null
                        )
                    }
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => {
                navigator("/test", {
                  state: {
                    line: output,
                    language: lang,
                    parentPath: '/enhancer'
                  }
                })
              }}>Test Code</Button>
              <Button onClick={async () => {
                await window.navigator.clipboard.writeText(output);
              }}>Copy Code</Button>
              <DrawerClose>
                <Button variant="outline" onClick={() => SetOpen(false)}>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        </div>
      </>
    );
}

export default Enhancer;