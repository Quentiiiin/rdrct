<script lang="ts">

    const { data } = $props();


</script>

<svelte:head>
    <meta name="robots" content="noindex">
</svelte:head>

{#if data.isFlagged}
<div class=" m-6 flex items-center justify-center flex-col">
    <h3 class=" text-3xl uppercase">
        The linked page was flagged for unsafe content!!
    </h3>
    <div class="flex flex-wrap items-center justify-center">
        <a class=" m-4 text-green-300 font-black text-xl" href="https://quentins.space">
            go back
        </a>
        <a class=" m-4 text-gray-300" href={data.url ?? '/'} rel=" noreferrer noopener nofollow">
            ignore risk and continue
        </a>
    </div>
</div>
{:else}
    <div class=" m-6">
        {#if data.error}
            <div class=" text-red-300">
                An error occured: {data.error}
            </div>
            <div>
                <a
                    href="https://www.quentins.space"
                    class=" text-green-300 hover:underline">go to my homepage</a
                >
            </div>
        {/if}

        {#if data.url}
            <a class=" text-green-300 hover:underline" href={data.url}
                >Click here if you are not being redirected</a
            >
        {/if}
    </div>
{/if}
