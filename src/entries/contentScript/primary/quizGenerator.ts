import OpenAI from "openai";

const prompt = (transcript) => `Here is the transcript for an ad:
 "${transcript}"
Write up to three difficult multi-choice questions to test the viwers comprehension of this and indicate the correct answer. Your response should be in JSON with the following schema:

[
  {
    "text": "string",
    "answers": "string[]",
    "correctAnswer": "number"
  },
  ...
]
`

const generateQuiz = (app) => async (id: string, transcript: Array<string>) => {
  const gptKey = await chrome.storage.sync.get("gptKey");
  console.log("using openai api key:", gptKey);
  const openai = new OpenAI({
    apiKey: gptKey["gptKey"],
    dangerouslyAllowBrowser: true
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: prompt(transcript.join("").substring(0, 500)) },
    ],
    model: 'gpt-4-1106-preview',
    top_p: 1,
    max_tokens: 512,
    response_format: { type: "json_object" }
  });

  console.log("generated quiz", chatCompletion);

  let questions = JSON.parse(chatCompletion.choices[0].message.content);

  if (questions.length === undefined) {
    questions = [questions];
  }

  console.log("parsed quiz", questions)

  // filter for valid questions
  questions = questions.filter(q => q.text && q.answers && q.correctAnswer);

  if (questions.length > 0) {
    app().$set({
      question: questions
    })
  } else {
    console.log("did not generate valid questions :(")
    app().$set({
      error: true
    })
  }

}

export default generateQuiz;
