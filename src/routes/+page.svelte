<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import copyToClipboard from "$lib/copyToClipboard";
  import type { ActionData } from "./$types";

  let loading = false;
  export let form: ActionData;

  function handleCopy() {
    if (form?.result) copyToClipboard(form?.result);
  }
</script>

<main>
  <h1 class="text-6xl font-bold mb-12">urls.wtf</h1>

  <div class="space-y-1">
    <p>minimalistic url shortener.</p>
    <p>no tracking.</p>
    <p>no ads.</p>
  </div>

  <form
    class="text-bluePlaza flex items-center space-x-6 mt-12"
    method="POST"
    use:enhance={() => {
      loading = true;

      return async ({ result }) => {
        await applyAction(result);
        loading = false;
      };
    }}
  >
    <!-- svelte-ignore a11y-autofocus -->
    <input
      name="url"
      placeholder="Type in your url..."
      aria-label="Enter an URL to shorten"
      class="p-2 w-full rounded"
      autofocus
    />

    <button class="bg-white p-2 rounded h-full" type="submit"> Go! </button>
  </form>

  <div class="mt-6">
    <div class="h-8">
      {#if loading}
        <p>loading</p>
      {:else if form?.result}
        <div class="flex items-center space-x-2">
          <a class="underline" href={form?.result} target="_blank" rel="noopener noreferrer">
            {form?.result}
          </a>

          <button class="bg-white text-bluePlaza px-2 rounded h-6" on:click={handleCopy}>
            copy
          </button>
        </div>
      {:else if form?.error}
        <p>{form?.error}</p>
      {/if}
    </div>
  </div>
</main>

<footer class="mt-24">
  <a class="block underline mt-2" href="https://github.com/jfranciscosousa/urls.wtf">
    View Github
  </a>

  <a class="block underline mt-2" href="/terms">Terms of Service</a>
</footer>
