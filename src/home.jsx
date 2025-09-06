import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

import "./style/home.css";

function Home() {
  const navigator = useNavigate();
  
  return (
    <>
      <div className="home-container">
        <h1 className="home-title">&lt; Code buddy &gt;</h1>
      <div className="home-but-grp">

      <Button className="home-but"
        onClick={() => {
          navigator("/pseudo");
        }}
        >
        Pseudo to actual code
      </Button>
      <Button className="home-but"
        onClick={() => {
          navigator("/enhancer");
        }}
        >
        Code enhancer
      </Button>
      <Button className="home-but"
        onClick={() => {
          navigator("/solve");
        }}
        >
        DSA Solver
      </Button>
          </div>
        </div>
    </>
  );
}

export default Home;