<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount, tick } from "svelte";

  let { form } = $props();

  let input: HTMLInputElement| undefined = $state();
	let url: string | undefined = $state();

	let isReady = $derived((url && URL.canParse(url)));
  let hasCopied = $state(false);
  let createdUrl = $derived.by(() => {
	  if(form?.key) {
		  return `${window.location.protocol}//${window.location.host}/${form.key}`;
	  }
	  return null;
	});

  onMount(async () => {
    await tick();
	input?.focus();
  });
</script>

<form class=" m-6" method="POST" autocomplete="off" onsubmit={() => {
  hasCopied = false;
}} use:enhance>
  <h2 class=" text-xl text-green-300">Create a redirect</h2>
  <input
    type="url"
    name="url"
    bind:this={input}
    bind:value={url}
    autocomplete="off"
    class=" resize-none bg-zinc-700 textinput overflow-y-hidden w-60"
    spellcheck="false"
  />
  <button class=" pl-2 text-gray-400 cursor-not-allowed" class:ready={isReady}>
    submit
  </button>
  {#if form?.error}
  <div class=" text-red-400">
	Error: {form?.error}
  </div>
  {/if}
  {#if form?.key}
  <div class=" text-zinc-200">
	Redirect created: <a class= " text-green-300 hover:underline" target="_blank" href={createdUrl}>
		{createdUrl}
	</a>
	<button
		class=" text-green-300"
		onclick={(event) => {
      event.preventDefault();
			navigator.clipboard.writeText(createdUrl ?? '');
			hasCopied = true;
		}}
	>
{#if hasCopied}
	[copied]
	{:else}
	[copy]
{/if}


</button>
  </div>
  {/if}
</form>
<style>
  .textinput {
    -webkit-spell-check: false;
    -moz-spell-check: false;
  }
  .textinput:focus {
    outline: none;
  }
  .ready {
    @apply text-green-200 cursor-pointer;
  }
  input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: black !important;
  }
</style>
