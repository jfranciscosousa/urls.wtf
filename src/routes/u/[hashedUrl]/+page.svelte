<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1 class="text-6xl font-bold mb-12">urls.wtf</h1>

	<div class="flex flex-col gap-2">
		<p class="bold">Click the link below if you wish to be redirected!</p>
		<p>Make sure you trust the following website! Double-check the url!</p>
	</div>

	<a href={data.url} class="underline block mt-8">
		{data.url}
	</a>
</main>
