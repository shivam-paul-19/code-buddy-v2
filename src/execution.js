// This module handles code execution by sending the given source code 
// to the Piston API and returning the output.

import axios from "axios";
import { defaultLines } from "./languages";

// Base URL of the Piston API (used for running code snippets)
const baseURL = "https://emkc.org/api/v2/piston/execute";

/**
 * Executes the given code in the specified language using the Piston API.
 *
 * @async
 * @function executeCode
 * @param {string} source - The actual source code written by the user.
 * @param {string} language - Programming language in which the code is written 
 *                            (must match a key from defaultLines).
 * @returns {Promise<string>} The standard output (stdout) of the executed code.
 *
 * @example
 * const output = await executeCode("print('Hello World')", "python");
 * console.log(output); // "Hello World\n"
 */
export const executeCode = async (source, language) => {
    // Prepare the request body for Piston API
    let body = {
      language: language,
      version: defaultLines.get(language).version, // version info for the language
      files: [
        {
          content: source, // user-provided source code
        },
      ],
    };

    // Send the code execution request
    let res = await axios.post(baseURL, body);

    // Return only the execution output part
    return res.data.run.output;
};
