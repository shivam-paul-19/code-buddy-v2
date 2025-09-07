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

let key = import.meta.env.VITE_OPEN_AI_API_KEY;

function Pseudo() {
  const navigator = useNavigate();

  // gets value from the input code editor's value
  // and also get's response from OpenAI API
  const convertPseudo = async (value, lang) => {
    SetOpen(true);
    setIsLoad(true);
    let res = await getResponse(value, "pseudo", key, lang);
    setIsLoad(false);
    setOutput(res);
    setLang(lang);
  };

  let [output, setOutput] = useState("");
  let [isLoad, setIsLoad] = useState(false);
  let [open, SetOpen] = useState(false);
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
          back
        </Button>

        <Drawer open={open} onOpenChange={SetOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {!isLoad
                  ? "Here's the actual code"
                  : "Your code is being prepared, it may take some seconds..."}
              </DrawerTitle>
              <DrawerDescription>
                <div
                  style={{
                    overflowX: "scroll",
                    maxHeight: "320px",
                  }}
                >
                  {!isLoad ? (
                    <CodeEditor disableDropDown={true} line={output} />
                  ) : null}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={() => {
                  navigator("/test", {
                    state: {
                      line: output,
                      language: lang,
                      parentPath: "/pseudo",
                    },
                  });
                }}
              >
                Test Code
              </Button>
              <Button
                onClick={async () => {
                  await window.navigator.clipboard.writeText(output);
                }}
              >
                Copy Code
              </Button>
              <DrawerClose>
                <Button variant="outline" onClick={() => SetOpen(false)}>
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default Pseudo;
