"use server";
import { messagePromptError, promptFan } from "@/constants";
import { OpenAI } from "openai";
import {
  ResponseFunctionToolCall,
  ResponseInput
} from "openai/resources/responses/responses.mjs";
import { Tool } from "openai/src/resources/responses/responses.js";
import search_info from "./search_info";

interface ResponseApi {
  error: { isError: boolean; message?: string };
  data: null | string;
}

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const tools: Tool[] = [
  {
    type: "function",
    name: "search_info",
    description:
      "Busca informações sobre todo o time de CSGO da FURIA, como: estatiscas, jogadores, proximos , etc ...",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description:
            "O que o usuário deseja saber sobre o time de CSGO da FURIA.",
        },
      },
      required: ["content"],
      additionalProperties: false,
    },
    strict: true,
  },
];

const getChatCompletion = async (content: string): Promise<ResponseApi> => {
  try {
    const input: ResponseInput = [
      {
        role: "developer",
        content: promptFan,
      },
      {
        role: "user",
        content,
      },
    ];
    const response = await openai.responses.create({
      model: "o4-mini-2025-04-16",
      input,
      tools: tools,
    });


    const isFnCall = response.output[1].type === "function_call";

    if (isFnCall) {
      const fn = response.output[1] as ResponseFunctionToolCall;

      const parsedArgs = JSON.parse(fn.arguments);

      const responseTool = await search_info(parsedArgs.content);

      if (responseTool.error.isError || !responseTool.data) {
        throw new Error(responseTool.error.message);
      }
      input.push({
        type: 'function_call',
        call_id: fn.call_id,
        name: fn.name,
        arguments: fn.arguments
      });
      input.push({
        type: 'function_call_output',
        call_id: fn.call_id,
        output: responseTool.data
      })
    }

    const outputResponse = await openai.responses.create({
      model: "o4-mini-2025-04-16",
      input,
      tools: tools,
    });

    return {
      error: { isError: false },
      data: outputResponse.output_text,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      error: { isError: true },
      data: messagePromptError,
    };
  }
};

export default getChatCompletion;
