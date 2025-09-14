import { useState } from "react";

import CodeEditor from "./components/editor";        // Custom code editor component
import OutputTerminal from "./components/output";    // Terminal-like component to show execution result
import { useNavigate, useLocation } from "react-router"; // React Router hooks for navigation & state handling

import { executeCode } from "./execution";           // Utility function to send code for execution

import "./style/pages.css";                          // Page-level styles
import { Button } from "@/components/ui/button";     // UI library Button component

function EditorPage() {
  // React Router: `location` gives state passed from navigation
  let location = useLocation();
  const navigator = useNavigate();

  // Local state to hold execution output
  let [output, setOutput] = useState("Output will here shown here");

  // Destructure values passed from previous page
  // - line: initial code snippet
  // - language: programming language
  // - parentPath: route to go back
  let { line, language, parentPath } = location.state;

  // Function to execute code and update output
  const extractValue = async (value, lang) => {
    let res = await executeCode(value, lang);  // Execute given code
    setOutput(res);                            // Store result in state
  }

  return (
    <>
      <div className="page">
        {/* Title and Tagline */}
        <h1 className="page-title">Run and Test your code here</h1>
        <p className="page-tag">&nbsp;</p>

        <div>
          {/* Code editor where user writes/edits code */}
          <CodeEditor 
            sendValue={extractValue}   // Callback to execute code
            mode="execution"           // Execution mode (not editing problem statements etc.)
            line={line}                // Preloaded code snippet
            language={language}        // Language to highlight and execute
            height="40vh"              // Editor height
            disableDropDown={true}     // Dropdown disabled in execution mode
          />

          {/* Back button to navigate to parent page */}
          &nbsp;&nbsp;&nbsp;
          <Button onClick={() => {
            navigator(parentPath);     // Go back to parent route
          }}>back</Button>

          <br /><br />
        </div>

        {/* Terminal to show program output */}
        <OutputTerminal output={output} />
      </div>
    </>
  );
}

export default EditorPage;