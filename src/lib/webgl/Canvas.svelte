<script>
	import { onMount, setContext } from 'svelte';
	import createREGL from 'regl';

	const { width, height, children } = $props();

	let canvas;
	let regl = $state();

	setContext('smoke-regl', () => ({ regl, width, height }));

	onMount(() => {
		regl = createREGL({
			canvas
		});
	});
</script>

<canvas
	width={width * 2}
	height={height * 2}
	style:width="{width}px"
	style:height="{height}px"
	bind:this={canvas}
></canvas>
{#if regl}
	{@render children?.()}
{/if}

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>
