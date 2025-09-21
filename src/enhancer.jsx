// Enhancer.jsx
// This component provides a UI for code enhancement using OpenAI API via the getResponse function.
// Users can input their code, choose a target language, and get an enhanced version of their code.
// The enhanced code is displayed in a drawer for viewing, testing, or copying.

import { useNavigate } from "react-router-dom";
import CodeEditor from "./components/editor"; // Custom code editor component
import { useState } from "react";
import { getResponse } from "./generate"; // API call to generate enhanced code
import "./style/pages.css";

import { Button } from "@/components/ui/button"; // UI Button component
import ResultDrawer from "./components/drawer"; // Drawer to show enhanced code

function Enhancer() {
    const navigator = useNavigate(); // Hook to navigate programmatically between pages

    // -------------------------------
    // Function: enhanceCode
    // -------------------------------
    // Called when the user submits code from CodeEditor.
    // It sends the code to OpenAI for enhancement and updates the state for display.
    //
    // Parameters:
    // value - The code input by the user.
    // lang  - The programming language selected by the user.
    const enhanceCode = async (value, lang) => {
        setOpen(true);   // Open the result drawer
        setIsLoad(true); // Show loading state
        setShowProg(true);

        let res = await getResponse(value, "enhance", lang); // Fetch enhanced code

        setShowProg(false);
        setTimeout(() => {
          setIsLoad(false); // Hide loading
          setOutput(res);   // Set the enhanced code to state
          setLang(lang);    // Update selected language in state
        }, 500);
    }
    
    // -------------------------------
    // Component State
    // -------------------------------
    let [output, setOutput] = useState(""); // Stores the enhanced code
    let [isLoad, setIsLoad] = useState(false); // Tracks if enhancement is in progress
    let [open, setOpen] = useState(false); // Controls drawer visibility
    let [lang, setLang] = useState("Python"); // Stores the selected language (default Python)
    let [showProg, setShowProg] = useState(false);

    return (
      <>
        <div className="page">
          {/* Page Title */}
          <h1 className="page-title">Code Enhancer</h1>
          
          {/* Page Tagline */}
          <p className="page-tag">
            Drop your code here and enhance it.<br/>
            (Select the language of the output, by default it is <b>Python</b> if not selected)
          </p>

          {/* Code Editor Input */}
          <CodeEditor 
            line="# Drop the code here" // Placeholder line in the editor
            mode="enhance_in"           // Mode for the editor (custom mode for input code)
            sendValue={enhanceCode}     // Callback when user submits code
          />

          {/* Back Button */}
          <Button 
            className="back-but" 
            onClick={() => {
                navigator('/') // Navigate back to home page
            }}
          >
            back
          </Button>

          {/* Result Drawer to display enhanced code */}
          <ResultDrawer 
            output={output}          // Enhanced code output
            resLine={"Here's the enhanced code!"}  // Placeholder / sample line while loading or showing drawer
            loadLine={"Your code is being enhanced, it can take some time..."}     // Text to display while loading
            isLoad={isLoad}          // Loading state
            lang={lang}              // Programming language of the output
            open={open}              // Drawer visibility
            setOpen={setOpen}        // Function to toggle drawer visibility
            parentUrl="/enhancer"    // Parent page route (used for navigation or context)
            showLoad={showProg}
          />
        </div>
      </>
    );
}

export default Enhancer;