// This file handles interactions with OpenAI API via AWS Lambda
// and constructs appropriate prompts based on the operation mode.

import OpenAI from "openai";
import axios from "axios";

/**
 * Calls the OpenAI API through an AWS Lambda endpoint.
 * Using Lambda helps hide the API key from client-side exposure.
 * 
 * @param {string|object} prompt - The prompt to send to the model.
 * @returns {Promise<string>} - The raw response text from the API.
 */
const callAPI = async (prompt) => {
    console.log("called this function");

    // AWS Lambda endpoint which internally calls OpenAI
    let response = await axios.post(
        "https://iz8hfkucrj.execute-api.ap-south-1.amazonaws.com/default/openai-response/", 
        { prompt: prompt }
    );

    console.log(response.data);
    return response.data;
};

/**
 * Generates a structured prompt based on the mode of operation.
 * 
 * Modes:
 * - "solve"   : DSA problem solver (explanation + code + complexity + dry run)
 * - "enhance" : Code enhancer (returns improved code only)
 * - "pseudo"  : Converts pseudo-code into actual code
 * 
 * @param {string} mode  - Mode of operation ("solve", "enhance", "pseudo")
 * @param {string} lang  - Programming language for code output
 * @param {string} input - Problem statement, code snippet, or pseudo code
 * @returns {string} - The final prompt to be sent to OpenAI
 */
const getPrompt = (mode, lang, input) => {
    if (mode === "solve") {
        // Construct DSA solver prompt
        return `If "${input}" is NOT a valid DSA problem link 
                (from platforms like LeetCode, GeeksforGeeks, etc.), 
                then return ONLY "-1" with no explanation.

                Otherwise, answer this coding problem in ${lang} following this structure:

                # Question: <name>

                ## Explanation
                (Plain text, no code)

                ## Data Structures Used
                (List + short explanation)

                ## Optimized Code (${lang})
                (Write the code inside a markdown code block. 
                Add subtle comments. If OOP, use class "Solution".)

                ## Dry Run
                (Step-by-step with small input)

                ## Time and Space Complexity
                - Time: O(...)
                - Space: O(...)

                ## Other Approaches
                (Brief list, no code)`;
    } else if (mode === "enhance") {
        // Construct code enhancer prompt
        return `If the following input is NOT valid ${lang} code, 
                return ONLY "-1" with no explanation.

                If it is valid ${lang} code but has too many errors or 
                is too ambiguous for you to debug/understand, 
                return ONLY "-2" with no explanation.

                Otherwise, enhance this ${lang} code by:
                - Improving readability with proper naming conventions
                - Optimizing performance
                - Debugging if needed
                - Adding comments for documentation
                - Removing or reducing code duplication

                Code to enhance:
                ${input}

                Return ONLY valid ${lang} code.
                No markdown, no extra explanation outside the code.
                Subtle inline comments are allowed.`;
    } else if (mode === "pseudo") {
        // Construct pseudo-code to code prompt
        return `If the following input is NOT pseudo code, 
                return ONLY "-1" with no explanation.

                If it looks like pseudo code but has too many errors 
                or is too ambiguous for you to convert into ${lang}, 
                return ONLY "-2" with no explanation.

                Otherwise, convert this pseudo code into ${lang}, 
                keeping the logic same by understanding the pseudo code:
                ${input}

                Return ONLY valid ${lang} code.
                No markdown, no explanation text outside code.
                Subtle comments inside code are allowed.
                If OOP, define a class named "Solution".`;
    }
};

/**
 * Main wrapper to generate prompt and fetch response from OpenAI via Lambda.
 * 
 * @param {string} input - User input (problem, code, pseudo code)
 * @param {string} mode  - Operation type ("solve", "enhance", "pseudo")
 * @param {string} key   - OpenAI API key (used in Lambda, not exposed)
 * @param {string} lang  - Target programming language for code output
 * @returns {Promise<string>} - AI-generated response (plain text/code)
 */
export const getResponse = async (input, mode, lang) => {
    // Build the appropriate prompt
    let prompt = getPrompt(mode, lang, input);
    console.log(prompt);

    // Fetch the response from AWS Lambda (which internally calls OpenAI)
    let response = await callAPI(prompt);

    // Return the AI-generated response
    return response;
};