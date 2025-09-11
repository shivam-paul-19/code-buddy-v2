import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";

import "./style/home.css";

function Home() {
  const navigator = useNavigate();

  return (
    <>
      <div className="home-container relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background">
          <a href="https://github.com/shivam-paul-19/code-buddy-v2" target="blank" className="git-link"><i class="fa-brands fa-github"></i></a>
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
          <TextAnimate animation="fadeIn" by="line">
            {`Your coding sidekick.\nNow better! smarter! and more powerful!`}
          </TextAnimate>
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
            <TextAnimate animation="scaleUp" by="character">PSEUDO TO CODE</TextAnimate>
          </Button>
          <Button
            className="home-but"
            onClick={() => {
              navigator("/enhancer");
            }}
          >
            <TextAnimate animation="scaleUp" by="character">CODE ENHANCER</TextAnimate>
          </Button>
          <Button
            className="home-but"
            onClick={() => {
              navigator("/solve");
            }}
          >
            <TextAnimate animation="scaleUp" by="character">DSA SOLVER</TextAnimate>
          </Button>
        </div>
        <br /><br />
        <p className="disclaimer">
          <i>Disclaimer</i>
          <TextAnimate animation="fadeIn" by="line">
            {`- Inputs provided here may be accessed by OpenAI for monitoring or research purposes.\nPlease avoid sharing any personal, sensitive, or confidential information.\n- It is owered by OpenAI’s gpt-5-nano. Responses are AI-generated and may\ncontain inaccuracies, use with discretion.`}
          </TextAnimate>
        </p>
      </div>
    </>
  );
}

export default Home;
