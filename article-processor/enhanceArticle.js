// const { Configuration, OpenAIApi } = require('openai');
// require('dotenv').config();

// const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
// const openai = new OpenAIApi(configuration);

// async function rewriteArticle(original, references) {
//   const prompt = `
// You are an expert content writer.

// Original Article:
// ${original}

// References (for style and content inspiration):
// ${references.map((r, i) => `Reference ${i + 1}:\n${r}`).join('\n\n')}
// `;

//   const response = await openai.createChatCompletion({
//     model: 'gpt-4',
//     messages: [{ role: 'user', content: prompt }],
//     temperature: 0.7,
//     max_tokens: 2000
//   });

//   return response.data.choices[0].message.content;
// }

// Local LLM version using GPT4All because no API KEY FOR OPENAI;
async function rewriteArticle(original, references) {
  let enhanced = original + "\n\n---\nReferences used:\n";
  references.forEach((r, i) => {
    enhanced += `Reference ${i + 1}:\n${r.slice(0, 300)}...\n\n`;
  });
  enhanced += "Note: Article enhancement simulated (mock) - no AI was used.\n";
  return enhanced;
}

module.exports = rewriteArticle;
