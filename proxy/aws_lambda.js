// ---------------- AWS Lambda Function ----------------
//
// Purpose:
// This function exposes an API endpoint (via AWS Lambda) that takes a prompt 
// from the client, calls the OpenAI API (gpt-4.1-mini), and returns the response.
//
// Notes:
// - This Lambda function expects the OPEN_AI_API_KEY to be stored in AWS Lambda environment variables.
// - Deployed with proper `package.json` and dependencies bundled (OpenAI SDK).
// - Supports CORS so it can be called directly from frontend apps.
//
// ------------------------------------------------------

import OpenAI from "openai"; 

// Load OpenAI API key from environment variables.
// Ensure you set this securely in AWS Lambda configuration.
const key = process.env.OPEN_AI_API_KEY;

// ---------------- Helper Function ----------------
//
// callAPI(prompt):
// - Creates an OpenAI client using the provided API key.
// - Calls the `responses.create` endpoint with model "gpt-4.1-mini".
// - Returns the text output from the model.
//
// Parameters:
//   prompt (string): Input string for the AI model.
//
// Returns:
//   (string): AI-generated output text OR error message.
//
const callAPI = async (prompt) => {
  try {
    const client = new OpenAI({ apiKey: key });
    const response = await client.responses.create({
      model: "gpt-4.1-mini",   // Chosen model for coding/DSA tasks
      input: prompt,           // User-provided input
    });

    return response.output_text; // Extract text output from response
  } catch (error) {
    // Return error as string for easier debugging
    return `Error: ${error.message}`;
  }
};

// ---------------- Main Lambda Handler ----------------
//
// handler(event):
// - Entry point for AWS Lambda execution.
// - Expects an HTTP POST event with a JSON body containing { "prompt": "..." }.
// - Calls `callAPI()` with the extracted prompt.
// - Returns the AI response wrapped in an HTTP response object with CORS enabled.
//
// Parameters:
//   event (object): AWS Lambda event containing HTTP request data.
//
// Returns:
//   (object): HTTP response with statusCode, headers, and body.
//
export const handler = async (event) => {
  try {
    // Parse request body; default to empty object if not provided
    const body = JSON.parse(event.body || "{}");

    // Extract prompt or use default test prompt
    const prompt = body.prompt || "Default test prompt";

    // Call the helper function to query OpenAI API
    const res = await callAPI(prompt);

    // Return successful response with CORS headers
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",         // Allow all origins
        "Access-Control-Allow-Headers": "Content-type",
        "Access-Control-Allow-Methods": "POST"
      },
      body: res, // AI-generated text
    };
  } catch (error) {
    // Handle unexpected errors at handler level
    return `Error in handler: ${error.message}`;
  }
};