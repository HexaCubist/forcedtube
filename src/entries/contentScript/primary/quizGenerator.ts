import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: 'My API Key',
});

const prompt = (transcript) => `
here is the transcript for an Add
 "${transcript}"
write me three difficult multi-choice questions to test the viwers comprehension of this and indicate the correct answer
`

const generateQuiz = async (transcript: string) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'user', content: prompt(transcript) },
        ],
        model: 'gpt-4-turbo',
    });
}

export default generateQuiz;
