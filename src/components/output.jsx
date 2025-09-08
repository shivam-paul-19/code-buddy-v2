import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

import "../style/output.css";
import { useEffect, useState } from "react";

function OutputTerminal({ output }) {
    let [result, setResult] = useState(output);

    useEffect(() => {
        setResult(output);
    }, [output]);

  return (
    <>
      <div className="w-full h-[30vh] overflow-hidden flex items-center justify-center">
      <Terminal className="terminal">
        <TypingAnimation duration={15}>{`> ${result}`}</TypingAnimation>
      </Terminal>
      </div>
    </>
  );
}

export default OutputTerminal;