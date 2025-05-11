<script>
	import Chimney from './lib/Chimney.svelte';
	import Canvas from './lib/webgl/Canvas.svelte';
	import Smoke from './lib/webgl/Smoke.svelte';

	let width = $state();
	let height = $state();
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<Chimney />
	<Canvas
		width={width}
		height={height}
	>
		<Smoke
			origin={[height / 2 + 5, height / 2]}
			color="#000000"
		/>
	</Canvas>
</div>

<style>
	div {
		position: relative;
		width: 100%;
		height: 100px;
		border: none;
		border-radius: 1.5px;
		background: linear-gradient(to bottom, #c4ebff, #4c9fc7);
		overflow: hidden;
	}
</style>
