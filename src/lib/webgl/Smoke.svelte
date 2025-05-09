<script>
	import { getContext } from 'svelte';

	import { createParticles, createDrawFunction } from './utils';

	const { origin = [0, 0], color } = $props();
	const { regl, width, height } = $derived(getContext('smoke-regl')());

	const n = 1000;

	const particles = $derived(
		createParticles(regl, { n, width, height, origin, color })
	);
	const drawParticles = $derived(createDrawFunction(regl));

	$effect(() => {
		const tick = regl.frame(({ tick }) => {
			regl.clear({ color: [0, 0, 0, 0] });
			drawParticles({
				n,
				particles,
				tick
			});
		});

		return () => tick.cancel();
	});
</script>
