/**
 * CodeEditor.jsx
 * ---------------------------------------
 * A reusable code editor component built using Monaco Editor.
 * 
 * Features:
 * - Supports multiple languages (Python, Java, C++, JavaScript)
 * - Optional language dropdown
 * - Theme customization
 * - Submission handling via callback
 * 
 * Component Type: Functional React Component
 */

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { defaultLines, buttonLabels } from "../languages";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "../style/editor.css";

/**
 * CodeEditor Component
 * ---------------------------------------
 * @param {Object} props - Component props
 * @param {string} [props.language="python"] - Default programming language of the editor.
 * @param {boolean} [props.disableDropDown=false] - Whether to disable the language selector.
 * @param {boolean} [props.disbaleSubmission=false] - Whether to hide the submission button.
 * @param {string} [props.theme="vs-dark"] - Theme of the Monaco editor.
 * @param {string} [props.line] - Initial code content (optional).
 * @param {string} [props.mode] - The mode of operation (e.g., "run", "save" — used with button label map).
 * @param {Function} [props.sendValue=(v, l)=>{}] - Callback triggered on submission, receives (code, language).
 * @param {string} [props.height="65vh"] - Height of the editor in viewport height units.
 * 
 * @returns {JSX.Element} React component for rendering a Monaco code editor.
 */
function CodeEditor({
  language = "python",
  disableDropDown = false,
  disbaleSubmission = false,
  theme = "vs-dark",
  line,
  mode,
  sendValue = (v, l) => {},
  height = "65vh"
}) {
  
  // ------------------ Lifecycle Hooks ------------------

  // On first render: if no line prop is passed, take default snippet for that language & mode
  useEffect(() => {
    if (!line) {
      line = defaultLines.get(language).defaultLine.get(mode);
    }
  }, []);

  // When the 'line' prop changes, update editor content
  useEffect(() => {
    setValue(line);
  }, [line]);


  // ------------------ State & References ------------------

  const editorRef = useRef(null);   // To access the editor instance
  const [value, setValue] = useState(line);  // Current editor content
  const [lang, setLang] = useState(language); // Currently selected language


  // ------------------ Editor Setup ------------------

  /**
   * Called when Monaco Editor mounts.
   * Sets reference and disables validation warnings for JS/TS.
   */
  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    // Disable validation errors for JS/TS
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };


  // ------------------ Event Handlers ------------------

  /**
   * Handles language change from dropdown.
   * Updates both the selected language and the editor content with a default snippet.
   */
  const languageChange = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    setValue(defaultLines.get(selectedLang).defaultLine.get(mode));
    console.log("Language switched to:", selectedLang);
  };

  /**
   * Handles submission of code.
   * Sends current code and language to parent component via `sendValue`.
   */
  const handleSubmission = async () => {
    sendValue(value, lang);
  };


  // ------------------ Render ------------------

  return (
    <>
      {/* Language Selector Dropdown */}
      {!disableDropDown && (
        <form onChange={languageChange}>
          <Select>
            <SelectTrigger
              className="w-[200px]"
              style={{ border: 0, color: "white" }}
            >
              <SelectValue placeholder="Select the language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      )}

      {/* Monaco Code Editor */}
      <Editor
        height={height}
        language={lang}
        theme={theme}
        value={value}
        onChange={(v) => setValue(v)}
        options={{
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
        }}
        onMount={handleMount}
      />

      <br />

      {/* Action Button (Submit/Run etc.) */}
      {!disbaleSubmission && (
        <Button className="action-but" onClick={handleSubmission}>
          {buttonLabels.get(mode)}
        </Button>
      )}
    </>
  );
}

export default CodeEditor;