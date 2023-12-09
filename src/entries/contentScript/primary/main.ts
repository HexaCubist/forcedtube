import renderContent from "../renderContent";
import App from "./App.svelte";
import setupAdWatcher from "./adWatcher";
import generateQuiz from "./quizGenerator";

setupAdWatcher();
// generateQuiz(transcript);

let app: App;

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
  app = new App({
    target: appRoot,
  });
  return app;
});
