import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import CodeEditor from "./editor";
import {useNavigate} from "react-router-dom";

import "../style/drawer.css";

function ResultDrawer({output, resLine, loadLine, isLoad, lang, open, setOpen, parentUrl}) {
    const navigator = useNavigate();

    if(output == "-1") {
      output = "// The input is either invalid, or has too ambuigities/error to be debugged."
    } else if(output == "-2") {
      output = "// The input code has too many ambuigities/error, and can't be debugged by the model."
    }

    return (
        <>
        <Drawer open={open} onOpenChange={setOpen} className="dr">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {!isLoad
                  ? resLine
                  : loadLine}
              </DrawerTitle>
              <DrawerDescription>
                <div style={{
                    overflow: "hidden",
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
                <div className="drawer-but-grp">
              <Button className="drawer-but" onClick={() => {
                navigator("/test", {
                  state: {
                    line: output,
                    language: lang,
                    parentPath: parentUrl
                  }
                })
              }}>Test Code</Button>
              <Button className="drawer-but" onClick={async () => {
                await window.navigator.clipboard.writeText(output);
              }}>Copy Code</Button>
              <DrawerClose>
                <Button className="drawer-but" variant="outline" onClick={() => setOpen(false)}>Close</Button>
              </DrawerClose>
                </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        </>
    )
}

export default ResultDrawer;