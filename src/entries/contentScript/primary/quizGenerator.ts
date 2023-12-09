import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: 'My API Key',
  dangerouslyAllowBrowser: true
});

const prompt = (transcript) => `Here is the transcript for an ad:
 "${transcript}"
Write three difficult multi-choice questions to test the viwers comprehension of this and indicate the correct answer. Your response should be in JSON:
`

const generateQuiz = async (transcript: string) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'user', content: prompt(transcript) },
        ],
        model: 'gpt-4-turbo',
        response_format: {type: "json_object"}
    });

    return chatCompletion.choices[0].message.content;
}

export default generateQuiz;
