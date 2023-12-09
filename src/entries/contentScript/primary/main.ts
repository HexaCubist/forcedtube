import renderContent from "../renderContent";
import App from "./App.svelte";
import setupAdWatcher from "./adWatcher";
import setupNetworkListener from "./networkListener";
import generateQuiz from "./quizGenerator";
function launchApp(player) {
  renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
    app = new App({
      target: appRoot,
      props: {
        show: true,
      },
    });
    app.$on("finish", (event) => {
      console.log("Answered", event.detail);
      player.play();
      app.$destroy();
    });
  });
}

setupAdWatcher(launchApp);

setupNetworkListener(generateQuiz);

let app: App;
