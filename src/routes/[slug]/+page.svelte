<script lang="ts">
  import { onMount } from 'svelte';

    const { data } = $props();

    onMount(() => {
        if(data.url && URL.canParse(data.url)) {
            window.location.href = data.url;
        }
    });


</script>

<div class=" m-6">
    {#if data.error}
    <div class=" text-red-300">
        An error occured: {data.error}
    </div>
    <div>
        <a href="https://www.quentins.space" class=" text-green-300 hover:underline">go to my homepage</a>
    </div>
{/if}

{#if data.url}
    <a class=" text-green-300 hover:underline" href={data.url}>Click here if you are not being redirected</a>
{/if}
</div>
