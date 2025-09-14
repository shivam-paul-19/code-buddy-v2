// This file implements the DSA Solver page in React.
// Users can input problem links from platforms like LeetCode or GeeksForGeeks,
// select a programming language for the output, and get a structured answer
// including explanation, code, dry run, and complexity analysis.

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { marked } from "marked"; // converts markdown to HTML
import { getResponse } from "./generate"; // API call to OpenAI via Lambda

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "./style/pages.css";
import ProgressBar from "./components/progress";

function Solver() {
  const navigator = useNavigate();

  // Component state
  let [solved, setSolved] = useState(false); // indicates if the problem is solved
  let [output, setOutput] = useState("");    // stores HTML-rendered output
  let [code, setCode] = useState("");        // extracted code from AI response
  let [lang, setLang] = useState("python");  // selected output language
  let [load, setLoad] = useState(false);     // loading state
  let [valid, setValid] = useState(true);    // input validity flag
  let [disable, setDisable] = useState(false);
  let [showProg, setShowProg] = useState(false);

  /**
   * Handles problem submission.
   * - Calls OpenAI via Lambda to solve the DSA problem.
   * - Extracts the code block from the AI response.
   * - Converts AI markdown response to HTML using marked().
   * 
   * @param {Event} e - Form submission event
   */
  const handleSumbission = async (e) => {
    e.preventDefault();
    setLoad(true);
    setSolved(false);
    setDisable(true);
    setShowProg(true);

    // Call API to get AI response for the problem
    let res = await getResponse(e.target[0].value, "solve", lang);

    if (res == "-1") {
      // Invalid link handling
      setOutput(
        marked(
          "## The input link is either an invalid link or can't be accessed by our model :(\n Kindly check the link."
        )
      );
      setValid(false);
    } else {
      setValid(true);
      // Extract the code from the markdown response
      let start = res.indexOf("```") + lang.length + 3;
      let end = res.lastIndexOf("```");
      let code = res.substring(start, end);
      setCode(code);

      // Convert full markdown response to HTML
      setOutput(marked(res));
    }

    setShowProg(false);
    setTimeout(() => {
      setLoad(false);
      setSolved(true);
      setDisable(false);
    }, 500); 
  };

  /**
   * Updates the selected language for output.
   * Triggered when the user changes the language in the dropdown.
   * 
   * @param {Event} e - Change event
   */
  const languageChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <>
      <div className="page">
        <h1 className="page-title">DSA Solver</h1>
        <p className="page-tag">
          Drop any problem link of LeetCode, GeekForGeeks etc. and get
          structured answers
          <br />
          (Select the language of the output, by default it is <b>Python</b> if not selected)
        </p>
        <br />
        <div className="dsa-link-input">
          {/* Language selector dropdown */}
          <div className="lang-selector input-elements">
            <form onChange={languageChange}>
              <Select>
                <SelectTrigger
                  className="w-[200px]"
                  style={{
                    border: 0,
                    color: "white",
                  }}
                >
                  <SelectValue placeholder="Select the language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </form>
          </div>

          {/* Input form for DSA problem link */}
          <form onSubmit={handleSumbission} className="link-input">
            <Input
              className="input-elements"
              type="text"
              placeholder="Put the link here"
              required
            />
            {
              (disable)? (
                <Button className="input-elements white-but" type="submit" disabled>
                  Solve
                </Button>
              ) : (
                <Button className="input-elements white-but" type="submit">
                  Solve
                </Button>
              )
            }
          </form>
        </div>
        <br />
        <br />
        {/* Output section */}
        {solved ? (
          <>
            {valid ? (
              <>
                {/* Test and Copy buttons */}
                <Button
                  className="white-but"
                  onClick={() => {
                    navigator("/test", {
                      state: {
                        line: code,
                        language: lang,
                        parentPath: "/solve",
                      },
                    });
                  }}
                >
                  Test code
                </Button>
                <Button
                  variant="outline white-but"
                  onClick={async () => {
                    await window.navigator.clipboard.writeText(code);
                  }}
                >
                  Copy code
                </Button>
              </>
            ) : null}
            <div className="dsa-output-outer">
              <div
                className="dsa-output markdown"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          </>
        ) : load ? (
          <div className="loading-solve-box">
          "Your Problem is being solved, it can take some time"
          <ProgressBar theme="light" expectedTime={15} load={showProg}/>
          </div>
        ) : null}
        <br />

        {/* Back button */}
        <Button
          onClick={() => {
            navigator("/");
          }}
          style={{ margin: "10px" }}
        >
          back
        </Button>
      </div>
    </>
  );
}

export default Solver;