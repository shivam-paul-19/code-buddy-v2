import { useNavigate } from "react-router-dom";

function Home() {
  const navigator = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigator("/pseudo");
        }}
      >
        Pseudo to actual code
      </button>
      <button
        onClick={() => {
          navigator("/enhancer");
        }}
      >
        Code enhancer
      </button>
      <button
        onClick={() => {
          navigator("/solve");
        }}
      >
        DSA Solver
      </button>
    </>
  );
}

export default Home;