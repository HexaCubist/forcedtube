<script lang="ts">
  import "../app.postcss";
  // import logo from "~/assets/logo.svg";
  import Portal from "svelte-portal";

  // const logoImageUrl = new URL(logo, import.meta.url).href;
</script>

<Portal target="#player">
  <div class="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md">
    <!--  -->
    <h1 class="text-xl text-center m-3">You have been served</h1>
  </div>
</Portal>
<div class="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md">
  <!--  -->
  <h1 class="text-xl text-center m-3">You have been served</h1>
</div>

<style>
</style>
