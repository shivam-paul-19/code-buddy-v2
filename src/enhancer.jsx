import {useNavigate} from "react-router-dom";
import EditorPage from "./editorpage";
import CodeEditor from "./components/editor";
import { useState } from "react";
import { getResponse } from "./generate";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
        console.log(res);
        setOutput(res);
    }
    
    let [output, setOutput] = useState("");
    let [isLoad, setIsLoad] = useState(false);
    let [open, SetOpen] = useState(false);

    return (
      <>
        <h1>this is code enhancer</h1>
        <CodeEditor mode="enhance_in" sendValue={enhanceCode} />
        <button
          onClick={() => {
            navigator("/");
          }}
        >
          back
        </button>

        <Drawer open={open} onOpenChange={SetOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Here's the enhanced Code</DrawerTitle>
              <DrawerDescription>
                <div style={{
                    overflowX: "scroll",
                    maxHeight: "320px"
                }}>
                    {
                        (!isLoad)? (
                            <CodeEditor disableDropDown={true} line={output}/>
                        ) : (
                            <p>Loading</p>
                        )
                    }
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Test Code</Button>
              <Button>Copy Code</Button>
              <DrawerClose>
                <Button variant="outline" onClick={() => SetOpen(false)}>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
}

export default Enhancer;