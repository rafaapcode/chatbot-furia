"use server";

import { promptSystem } from "@/constants";
import { ApiFormatResponse } from "@/types";


interface ResponseApi {
  error: { isError: boolean; message?: string };
  data: null | ApiFormatResponse;
}

// function toPerplexity(messages: Message[]): ApiFormat[] {
//   return messages.map((msg) => ({
//     role: 'user',
//     content: msg.content
//   }))
// }

export const getChatCompletion = async (content: string): Promise<ResponseApi> => {
  try {
    const body = {
      temperature: 0.2,
      top_p: 0.9,
      return_images: false,
      return_related_questions: false,
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1,
      web_search_options: { search_context_size: "medium" },
      model: "sonar",
      messages: [
        { role: "system", content: promptSystem },
        { role: "user", content },
      ],
    };

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${process.env.PERPLEXITY_TOKEN}`)
    headers.append("Content-Type", "application/json")

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    };

    const res = await fetch(
      process.env.BASE_URL as string,
      options
    );

    if (!res.ok) {
      return {
        error: {
          isError: true,
          message: "Erro ao realizar a busca",
        },
        data: null,
      };
    }

    const response = await res.json();
    
    return {
      error: { isError: false },
      data: response as ApiFormatResponse,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error('error');
  }
};
