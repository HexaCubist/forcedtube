import renderContent from "../renderContent";
import App from "./App.svelte";
import setupAdWatcher from "./adWatcher";
import setupBlacklist from "./blacklist";
import setupNetworkListener from "./networkListener";
import generateQuiz from "./quizGenerator";

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
  console.log("initialising app");
  app = new App({
    target: appRoot,
    props: {
      show: false,
    },
  });
  app.$on("finish", (event) => {
    console.log("Answered", event.detail);
    const player = document.querySelector("video");
    player.play();
    // reset props
    app.$set({
      show: false,
      error: false,
      question: [],
      questionNumber: 0
    })
  });
});

// for development
chrome.storage.sync.set({gptKey: import.meta.env.VITE_OPENAI_API_KEY})

setupAdWatcher(() => {
  app.$set({show: true})
});

setupBlacklist();

let app: App;

setupNetworkListener(generateQuiz(() => app));
