// Home.jsx
// This file defines the homepage of the application. 
// It includes links, interactive animations, buttons to navigate to different pages, and a disclaimer for users.

import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation between routes
import { Button } from "@/components/ui/button"; // Reusable Button component from UI library
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"; // Animated grid background
import { cn } from "@/lib/utils"; // Utility function for combining class names conditionally
import { AuroraText } from "@/components/magicui/aurora-text"; // Fancy gradient text component
import { TextAnimate } from "@/components/magicui/text-animate"; // Text animation component

import "./style/home.css"; // CSS specific to this page

function Home() {
  const navigator = useNavigate(); // Initialize navigation

  return (
    <>
      {/* Main container for the homepage */}
      <div className="home-container relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background">
        
        {/* GitHub link */}
        <a
          href="https://github.com/shivam-paul-19/code-buddy-v2"
          target="blank"
          className="git-link"
        >
          <i class="fa-brands fa-github"></i>
        </a>

        {/* Background interactive grid pattern */}
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          )}
          width={30}               // Grid width
          height={30}              // Grid height
          squares={[80, 80]}       // Number of squares in X and Y directions
          squaresClassName="stroke-slate-800 hover:fill-slate-500" // Styling for each square
        />

        {/* Main title with gradient effect */}
        <p className="home-title">
          <b>&lt;</b>
          <AuroraText>Code buddy</AuroraText>
          <b>/&gt;</b>
        </p>

        {/* Tagline with animation */}
        <p className="home-tag">
          <TextAnimate animation="fadeIn" by="line">
            {`Your coding sidekick.\nNow better! smarter! and more powerful!`}
          </TextAnimate>
        </p>

        <br />
        <br />

        {/* Button group for navigation */}
        <div className="home-but-grp">
          {/* Navigate to Pseudo to Code page */}
          <Button
            className="home-but"
            onClick={() => {
              navigator("/pseudo");
            }}
          >
            <TextAnimate animation="scaleUp" by="character">
              PSEUDO TO CODE
            </TextAnimate>
          </Button>

          {/* Navigate to Code Enhancer page */}
          <Button
            className="home-but"
            onClick={() => {
              navigator("/enhancer");
            }}
          >
            <TextAnimate animation="scaleUp" by="character">
              CODE ENHANCER
            </TextAnimate>
          </Button>

          {/* Navigate to DSA Solver page */}
          <Button
            className="home-but"
            onClick={() => {
              navigator("/solve");
            }}
          >
            <TextAnimate animation="scaleUp" by="character">
              DSA SOLVER
            </TextAnimate>
          </Button>
        </div>

        <br />
        <br />

        {/* Disclaimer section */}
        <p className="disclaimer">
          <i>Disclaimer</i>
          <TextAnimate animation="fadeIn" by="line">
            {`- Inputs provided here may be accessed by OpenAI for monitoring or research purposes.\nPlease avoid sharing any personal, sensitive, or confidential information.\n- It is powered by OpenAI’s gpt-4.1-mini. Responses are AI-generated and may\ncontain inaccuracies, use with discretion.`}
          </TextAnimate>
        </p>
      </div>
    </>
  );
}

export default Home;