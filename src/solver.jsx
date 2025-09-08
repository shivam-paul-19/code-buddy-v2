import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { marked } from "marked";
import { getResponse } from "./generate";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "./style/pages.css";

const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

function Solver() {
    const navigator = useNavigate();
    let [solved, setSolved] = useState(false);
    let [output, setOutput] = useState("");
    let [code, setCode] = useState("");
    let [lang, setLang] = useState("python");
    let [load, setLoad] = useState(false);

    const handleSumbission = async (e) => {
        e.preventDefault();
        setLoad(true);
        let res = await getResponse(e.target[0].value, "solve", API_KEY, lang);
        let start = res.indexOf("```") + (lang).length + 3;
        let end = res.lastIndexOf("```");
        let code = res.substring(start, end);
        setCode(code);
        setOutput(marked(res));
        setLoad(false);
        setSolved(true);
    }

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
            (Select the language of the output, by default it is <b>
              Python
            </b>{" "}
            if not selected)
            </p>
            <br />
            <div className="dsa-link-input">
                <div className="lang-selector input-elements">
            <form onChange={languageChange}>
                <Select>
                <SelectTrigger className="w-[200px]" style={{
                    border: 0,
                    color: "white"
                }}>
                <SelectValue placeholder="Select the langauge"/>
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                </SelectGroup>
                </SelectContent>
                </Select>
            </form>
            </div>

          <form onSubmit={handleSumbission} className="link-input">
                <Input className="input-elements" type="text" placeholder="Put the link here" required/>
            <Button className="input-elements white-but" type="submit">Solve</Button>
          </form>
                </div>
          <br /><br />
          {solved ? (<>
            <Button className="white-but"
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
          <Button variant="outline white-but"
            onClick={async () => {
                await window.navigator.clipboard.writeText(code);
            }}
          >
            Copy code
          </Button>
          <div className="dsa-output-outer">
            <div className="dsa-output markdown" dangerouslySetInnerHTML={{ __html: output }} /> 
            </div>
          </>
        ) : (load? "Your Problem is being solved, it can take some time": null)}
          <br />
            <Button
              onClick={() => {
                navigator("/");
              }}
              style={{margin: "10px"}}
            >
              back
            </Button>
        </div>
      </>
    );
}

export default Solver;