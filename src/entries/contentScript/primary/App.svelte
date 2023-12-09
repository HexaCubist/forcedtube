<script lang="ts">
  import "../app.postcss";
  import { autoUpdate } from "@floating-ui/dom";
  import { onMount } from "svelte";
  // import logo from "~/assets/logo.svg";
  import Portal from "svelte-portal";
  import { fade } from "svelte/transition";

  export let question: {
    text: string;
    answers: string[];
    correctAnswer: number;
  } | null = null;

  // const logoImageUrl = new URL(logo, import.meta.url).href;
  let videoPlayer: HTMLDivElement;
  let floatingEl: HTMLDivElement;

  onMount(() => {
    videoPlayer = document.querySelector("#player");
  });
  // Get position of video player to position the overlay
  const player = {
    Top: 0,
    Left: 0,
    Width: 0,
    Height: 0,
  };
  let cleanup;
  $: if (videoPlayer && floatingEl) {
    const getPos = () => {
      videoPlayer = document.querySelector("#player");
      const videoPlayerRect = videoPlayer.getBoundingClientRect();
      player.Top = videoPlayerRect.top;
      player.Left = videoPlayerRect.left;
      player.Width = videoPlayerRect.width;
      player.Height = videoPlayerRect.height;
    };
    getPos();
    if (cleanup) cleanup();
    cleanup = autoUpdate(videoPlayer, floatingEl, getPos);
  }
</script>

<div
  class="absolute"
  bind:this={floatingEl}
  style:top="{player.Top}px"
  style:left="{player.Left}px"
  style:width="{player.Width}px"
  style:height="{player.Height}px"
>
  {#if question}
    <div
      transition:fade
      class=" w-full h-full rounded-xl bg-black bg-opacity-40 backdrop-blur-md p-20"
    >
      <div class="bg-white text-black rounded-xl p-14 shadow w-full h-full">
        <h1 class="text-3xl font-light text-center mb-4">
          Thank you for watching another advertisment!
        </h1>
        <p class="text-xl">
          We value our customers
          <i>almost</i> as much as we value making money. To prove that you are a
          valuable customer, please answer the following question:
        </p>
        <p class="text-xl">
          {question.text}
        </p>
        <div class="grid grid-cols-2 grid-rows-2 gap-8 mt-4">
          {#each question.answers as answer, i}
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              on:click={() => {
                if (i === question.correctAnswer) {
                  alert("Correct!");
                } else {
                  alert("Incorrect!");
                }
              }}
            >
              {answer}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
</style>
