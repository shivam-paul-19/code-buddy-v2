import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";

function Solver() {
    const navigator = useNavigate();
    let [solved, setSolved] = useState(false);
    let [output, setOutput] = useState("");

    const handleSumbission = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        setSolved(true);
        setOutput("here");
    }

    return (
        <>
            <h1>this is DSA solver</h1>
            <form onSubmit={handleSumbission}>
                <input type="text" />
                <button type="submit">Solve</button>
            </form>
            {
                (solved)? (
                    <div>
                        {output}
                    </div>
                ) : null
            }
            <button onClick={() => {
                navigator('/')
            }}>back</button>
        </>
    );
}

export default Solver;