import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button"

function Home() {
  const navigator = useNavigate();
  const buttonStyle = {
    backgroundColor: "#002200",
    color: "white"
  }
  return (
    <>
      <Button style={buttonStyle}
        onClick={() => {
          navigator("/pseudo");
        }}
      >
        Pseudo to actual code
      </Button>
      <Button style={buttonStyle}
        onClick={() => {
          navigator("/enhancer");
        }}
      >
        Code enhancer
      </Button>
      <Button style={buttonStyle}
        onClick={() => {
          navigator("/solve");
        }}
      >
        DSA Solver
      </Button>
    </>
  );
}

export default Home;