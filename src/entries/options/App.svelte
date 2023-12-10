<script lang="ts">
  import "$lib/app.postcss";
  import OpenAI from "openai";

  let key = "";
  let keyInput: HTMLInputElement;
  chrome.storage.sync.get("gptKey", (data) => {
    key = data.gptKey;
  });
  let validating: boolean | "success" | "fail" = false;
  const validate = async () => {
    validating = true;
    if (!keyInput.reportValidity()) return;
    chrome.runtime.sendMessage({ type: "validate" });

    const openai = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true
    })

    try {
      await openai.models.list()
      validating = "success";
      chrome.storage.sync.set({ gptKey: key });
    } catch (e) {
      validating = "fail";
    }
  };
</script>

<main>
  <div class="card">
    <h1>App Settings</h1>
    <div class="chatGPT">
      <label for="gpt-key">Chat GPT Key</label>
      <input
        required
        pattern="[a-zA-Z0-9]{'{2}'}-[a-zA-Z0-9]{'{48}'}"
        title="Please enter a valid Chat GPT key"
        type="text"
        name="gpt-key"
        id="gpt-key"
        bind:value={key}
        bind:this={keyInput}
      />
    </div>
    <button
      disabled={validating === true}
      on:click={() => {
        validate();
      }}
    >
      {#if validating === true}
        <svg
          class="animate-spin -ml-1 h-[1em] w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Validating...
      {:else if validating === "success"}
        Success!
      {:else if validating === "fail"}
        Fail!
      {:else}
        Validate
      {/if}
    </button>
    {#if validating === "fail"}
      <p class="text-red-500 text-sm mt-3">
        Please check your key and try again.
      </p>
    {:else if validating === "success"}
      <p class="text-green-500 text-sm mt-3">
        Success! You can now use our enhanced YouTube experience.
      </p>{/if}
  </div>
</main>

<style lang="postcss">
  main {
    @apply w-full h-screen bg-gradient-to-br from-slate-950 to-blue-950 p-4 pt-10;
  }
  .card {
    @apply w-full max-w-prose mx-auto p-8 rounded-xl shadow bg-white;
  }
  h1 {
    @apply text-3xl font-bold text-center;
  }
  input {
    @apply w-full p-2 rounded-md border border-gray-300;
  }

  button {
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded transition mt-2;
    @apply flex items-center justify-center w-full;
    &[disabled] {
      @apply opacity-50 cursor-not-allowed;
    }
    &:hover {
      @apply bg-blue-700;
    }
  }
</style>
