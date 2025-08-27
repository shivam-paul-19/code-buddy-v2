import {useNavigate} from "react-router-dom";
import EditorPage from "./editorpage";
import CodeEditor from "./components/editor";

function Enhancer() {
    const navigator = useNavigate();
    return (
        <>
            <h1>this is code enhancer</h1>
            <CodeEditor mode="enhance_in"/>
            <CodeEditor mode="enhance_out"/>
            <button onClick={() => {
                navigator('/')
            }}>back</button>
        </>
    );
}

export default Enhancer;