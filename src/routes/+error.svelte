<script>
  import { page } from "$app/stores";

  $: console.log($page.error);
</script>

{#if $page.status === 404}
  <div>
    <h1 class="text-2xl font-bold">Not found</h1>

    <h2 class="mb-4">Hmmm this page doesn't exist. Double check if the URL is correct!</h2>
  </div>
{:else}
  <div>
    <h1 class="text-2xl font-bold">Oh god everything is on fire please help.</h1>

    <h2 class="mb-4">A massive error exploded our servers. We are trying to fix it!</h2>
  </div>
{/if}

<a href="/" class="underline">Go back home</a>
