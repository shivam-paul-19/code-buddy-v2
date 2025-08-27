import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";
import { useState } from "react";

function Solver() {
    const navigator = useNavigate();
    let [solved, setSolved] = useState(false);

    const handleSumbission = (e) => {
        e.preventDefault();
        setSolved(true);
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
                    <CodeEditor mode="solve"/>
                ) : null
            }
            <button onClick={() => {
                navigator('/')
            }}>back</button>
        </>
    );
}

export default Solver;