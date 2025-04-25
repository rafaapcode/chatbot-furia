import DOMPurify from "dompurify";
import { remark } from "remark";
import html from "remark-html";

export async function toHtml(content: string | undefined): Promise<string> {
  try {

    if(!content) {
      return "Estamos enfrentando problemas e não conseguimos encontrar uma resposta para a sua pergunta, tente novamente mais tarde.";
    }

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return DOMPurify.sanitize(contentHtml);
  } catch (error: any) {
    console.log(error.message);
    return "Estamos enfrentando problemas e não conseguimos encontrar uma resposta para a sua pergunta, tente novamente mais tarde.";
  }
}
