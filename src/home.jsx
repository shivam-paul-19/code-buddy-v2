import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";

import "./style/home.css";

function Home() {
  const navigator = useNavigate();

  return (
    <>
      <div className="home-container relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          )}
          width={30}
          height={30}
          squares={[80, 80]}
          squaresClassName="stroke-slate-800 hover:fill-slate-500"
        />
        <p className="home-title">
          <b>&lt;</b>
          <AuroraText>Code buddy</AuroraText>
          <b>/&gt;</b>
        </p>
        <p className="home-tag">
          Your one step coding assistant.
          <br />
          Now better! and more powerful!
        </p>
        <br />
        <br />
        <div className="home-but-grp">
          <Button
            className="home-but"
            onClick={() => {
              navigator("/pseudo");
            }}
          >
            PSEUDO TO CODE
          </Button>
          <Button
            className="home-but"
            onClick={() => {
              navigator("/enhancer");
            }}
          >
            CODE ENHANCER
          </Button>
          <Button
            className="home-but"
            onClick={() => {
              navigator("/solve");
            }}
          >
            DSA SOLVER
          </Button>
        </div>
        <br /><br />
        <p className="disclaimer">
          <i>Disclaimer</i>
          <br />
          Inputs provided here may be accessed by OpenAI for monitoring or research purposes.
          <br />
          Please avoid sharing any personal, sensitive, or confidential information.
        </p>
      </div>
    </>
  );
}

export default Home;
