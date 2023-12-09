import renderContent from "../renderContent";
import App from "./App.svelte";
import setupAdWatcher from "./adWatcher";
import setupNetworkListener from "./networkListener";
import generateQuiz from "./quizGenerator";

setupAdWatcher();
setupNetworkListener(generateQuiz);

let app: App;

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
  app = new App({
    target: appRoot,
    props: {
      question: {
        text: "What is the meaning of life?",
        answers: ["42", "To be happy", "To be sad", "To be"],
        correctAnswer: 0,
      },
    },
  });
});

window.setTimeout(() => {
  app.$set({
    question: {
      text: "What is the meaning of life?",
      answers: ["42", "To be happy", "To be sad", "To be"],
      correctAnswer: 0,
    },
  });
}, 3000);
