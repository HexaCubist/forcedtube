import renderContent from "../renderContent";
import App from "./App.svelte";
import setupAdWatcher from "./adWatcher";
import setupNetworkListener from "./networkListener";
import generateQuiz from "./quizGenerator";
let rendered = false;
const callback = (player) => {
  renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
    if (rendered) {
      return;
    }
    player.pause();
    rendered = true;
    app = new App({
      target: appRoot,
      props: {
        question: [
          {
            text: "What is the meaning of life?",
            answers: ["42", "To be happy", "To be sad", "To be"],
            correctAnswer: 0,
          },
        ],
      },
    });
    app.$on("finish", (event) => {
      console.log("Answered", event.detail);
      player.play();
      app.$destroy();
    });
  });
};

let lastURL = "";
const checkURL = () => {
  if (lastURL !== window.location.href) {
    console.log("URL Changed");
    lastURL = window.location.href;
    rendered = false;
    setupAdWatcher(callback);
  }
};
window.setInterval(checkURL, 400);

setupNetworkListener(generateQuiz);

let app: App;

window.setTimeout(() => {
  app.$set({
    question: [
      {
        text: "What is the meaning of life?",
        answers: ["42", "To be happy", "To be sad", "To be"],
        correctAnswer: 0,
      },
    ],
  });
}, 3000);
