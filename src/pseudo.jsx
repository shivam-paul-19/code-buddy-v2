// pseudo.jsx
// --------------------------------------------
// This component translates pseudo-code into actual programming code.
// It takes pseudo-code input from the user, sends it to OpenAI via getResponse,
// and displays the translated code in a drawer.
// --------------------------------------------

import { useNavigate } from "react-router-dom";
import CodeEditor from "./components/editor";   // Custom code editor input
import { useState } from "react";
import { getResponse } from "./generate";       // Function to interact with OpenAI API

import "./style/pages.css";

import { Button } from "@/components/ui/button"; 
import ResultDrawer from "./components/drawer"; // Drawer component for showing results

function Pseudo() {
  const navigator = useNavigate(); // Used to navigate between routes

  // -------------------------------
  // Function: convertPseudo
  // -------------------------------
  // Converts pseudo-code into actual code using OpenAI API.
  //
  // Parameters:
  // value - The pseudo-code input provided by the user.
  // lang  - The language to which pseudo-code will be translated (default: Python).
  //
  // Flow:
  // 1. Open the result drawer.
  // 2. Show loading state while waiting for API response.
  // 3. Call getResponse with input and type "pseudo".
  // 4. Update state with the translated code and language.
  // 5. Hide loading state once response is received.
  const convertPseudo = async (value, lang) => {
    setOpen(true);     // Open drawer immediately to show loading state
    setIsLoad(true);   // Indicate translation is in progress
    setShowProg(true);

    let res = await getResponse(value, "pseudo", lang); // Get translated code

    setShowProg(false);
    setTimeout(() => {
      setIsLoad(false);  // Hide loading once done
      setOutput(res);    // Store translated code
      setLang(lang);     // Save the chosen language
    }, 500);
  };

  // -------------------------------
  // Component State
  // -------------------------------
  let [output, setOutput] = useState("");   // Stores translated code output
  let [isLoad, setIsLoad] = useState(false); // Loading indicator
  let [open, setOpen] = useState(false);    // Controls drawer visibility
  let [lang, setLang] = useState("Python"); // Default output language
  let [showProg, setShowProg] = useState(false);

  return (
    <>
      <div className="page">
        {/* Page Title */}
        <h1 className="page-title">Pseudo code translator</h1>

        {/* Page Tagline */}
        <p className="page-tag">
          Drop your pseudo code and get it converted into actual code.
          <br />
          (Select the language of the output, by default it is <b>Python</b> if not selected)
        </p>

        {/* Input Editor for pseudo-code */}
        <CodeEditor
          line="# Drop the pseudo code here" // Placeholder text
          mode="pseudo_in"                   // Custom editor mode for pseudo-code
          sendValue={convertPseudo}          // Callback on submission
        />

        {/* Back Button */}
        <Button
          className="back-but"
          onClick={() => {
            navigator("/"); // Navigate back to home
          }}
        >
          Back
        </Button>

        {/* Result Drawer showing translated code */}
        <ResultDrawer 
          output={output}  // The translated code
          resLine={"Here's the translated code!"} // Header text in drawer
          loadLine={"The Pseudo code is being analysed, it can take some time..."} // Loading message
          isLoad={isLoad}  // Loading state
          lang={lang}      // Language of translated code
          open={open}      // Drawer visibility
          setOpen={setOpen} // Function to control drawer open/close
          parentUrl="/pseudo" // Context for drawer (useful for navigation)
          showLoad={showProg}
        />
      </div>
    </>
  );
}

export default Pseudo;
