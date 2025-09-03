// this file is for the interaction with the openAI API and manage prompts

import OpenAI from "openai";

/**
 * Calls the OpenAI API with a given prompt.
 * 
 * @param {string} key   - OpenAI API key.
 * @param {string|object} prompt - The prompt or structured input.
 * @returns {Promise<string>} - The text output from the model.
 */
const callAPI = async (key, prompt) => {
    const client = new OpenAI({
        apiKey: key
    });
    
    const response = await client.responses.create({
        model: 'gpt-5-nano',
        input: prompt,
    });

    return response;
}

/**
 * Builds a prompt based on the mode of operation.
 * 
 * Modes:
 * - "solve"   : DSA problem solving (returns explanation + code + analysis).
 * - "enhance" : Enhance given code (returns only improved code).
 * - "pseudo"  : Convert pseudo-code into actual code (returns only code).
 * 
 * @param {string} mode  - Operation type ("solve" | "enhance" | "pseudo").
 * @param {string} lang  - Target programming language.
 * @param {string} input - Problem statement or code snippet.
 * @returns {string} - The final prompt string.
 */
const getPrompt = (mode, lang, input) => {
    if (mode == "solve") {
        // dsa solver
        return `Answer this coding problem: ${input} in ${lang}. 
                Follow this exact structure:

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
    } else if (mode == "enhance") {
        // prompt to enhance code
        return `Enhance this ${lang} code by improving readability, and optimising it:
                ${input}

                Return ONLY the improved ${lang} code.
                No markdown, no explanation text outside code.
                Subtle comments inside code are allowed.`;
    } else if (mode == "pseudo") {
            // prompt to convert pseudo code into actual code
            return `Convert this pseudo code into ${lang}, keep the logic same by understanding the pseudo code:
                    ${input}

                    Return ONLY valid ${lang} code.
                    No markdown, no explanation text outside code.
                    Subtle comments inside code are allowed.
                    If OOP, define a class named "Solution".`;
    }
};

/**
 * Wrapper function to generate the prompt and fetch the response.
 * 
 * @param {string} input - The problem statement or code snippet.
 * @param {string} mode  - Operation type ("solve" | "enhance" | "pseudo").
 * @param {string} key   - OpenAI API key.
 * @param {string} lang  - Target programming language.
 * @returns {Promise<string>} - The model's response as plain text.
 */
export const getResponse = async (input, mode, key, lang) => {
    // make the prompt according to the requirement
    let prompt = getPrompt(mode, lang, input);
    // get the response
    let response = await callAPI(key, prompt);
    return response;
};
