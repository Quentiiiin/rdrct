<script lang="ts">
	import '../app.css';
	let { children } = $props();

</script>


<div class=" bg-zinc-900  text-green-300 h-8 flex items-center justify-start px-4">
	<a href="/">go.quentins.space</a>
</div>
<div class=" bg-zinc-800 content text-zinc-50 overflow-hidden">
	{@render children()}
</div>

<style>
	.content {
		min-height: calc(100vh - 2rem);
	}
</style>

<svelte:head>
	<title>go.quentins.space</title>
</svelte:head>