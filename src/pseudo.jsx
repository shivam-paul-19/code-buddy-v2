import {useNavigate} from "react-router-dom";
import CodeEditor from "./components/editor";

function Pseudo() {
    const navigator = useNavigate();
    return (
        <>
            <h1>this is Pseudo code translator</h1>
            <CodeEditor disableDropDown={true} line="# Drop the pseudo code here" mode="pseudo_in"/>
            <CodeEditor mode="pseudo_out"/>
            <button onClick={() => {
                navigator('/')
            }}>back</button>
        </>
    );
}

export default Pseudo;