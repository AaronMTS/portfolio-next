#!/usr/bin/env node

/**
 * Minimal stdio-to-HTTP proxy for Google Stitch MCP.
 *
 * Cursor currently has trouble registering Stitch's tools because the
 * tools/list response is very large. This proxy removes outputSchema
 * from the tools/list response before returning it to Cursor.
 */

import { createInterface } from "readline";
import { request } from "https";

const API_KEY = process.env.STITCH_API_KEY;
const STITCH_URL = "https://stitch.googleapis.com/mcp";

if (!API_KEY) {
  process.stderr.write("STITCH_API_KEY env var is required\n");
  process.exit(1);
}

function postToStitch(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const parsed = new URL(STITCH_URL);

    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        "X-Goog-Api-Key": API_KEY,
      },
    };

    const req = request(options, (res) => {
      let raw = "";

      res.on("data", (chunk) => {
        raw += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(raw));
        } catch (error) {
          reject(
            new Error(
              `JSON parse error: ${error.message}\n${raw.slice(0, 200)}`
            )
          );
        }
      });
    });

    req.on("error", reject);

    req.write(data);
    req.end();
  });
}

function stripOutputSchema(response) {
  if (
    response?.result?.tools &&
    Array.isArray(response.result.tools)
  ) {
    response.result.tools = response.result.tools.map((tool) => {
      const { outputSchema, ...rest } = tool;
      return rest;
    });
  }

  return response;
}

const readline = createInterface({
  input: process.stdin,
  terminal: false,
});

readline.on("line", async (line) => {
  const trimmed = line.trim();

  if (!trimmed) {
    return;
  }

  let message;

  try {
    message = JSON.parse(trimmed);
  } catch {
    return;
  }

  // Notifications don't have an ID and don't require a response.
  if (message.id === undefined) {
    postToStitch(message).catch(() => {});
    return;
  }

  try {
    let response = await postToStitch(message);

    if (message.method === "tools/list") {
      response = stripOutputSchema(response);
    }

    process.stdout.write(JSON.stringify(response) + "\n");
  } catch (error) {
    const errorResponse = {
      jsonrpc: "2.0",
      id: message.id,
      error: {
        code: -32603,
        message: String(error.message),
      },
    };

    process.stdout.write(JSON.stringify(errorResponse) + "\n");
  }
});