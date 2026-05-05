<script lang="ts">
	import { onMount } from 'svelte';
	import 'plyr/dist/plyr.css';

	let { videoUrl, title, description, onclick } = $props();
	let videoEl: HTMLVideoElement;

	onMount(async () => {
		const { default: Plyr } = await import('plyr');
		new Plyr(videoEl, {
			controls: ['play', 'progress', 'volume', 'fullscreen']
		});
	});
</script>

<div class="projectShowcaseBox">
	<div class="projectShowcaseVisual">
		<video bind:this={videoEl} playsinline data-plyr-config='hideControls: true'>
			<source src={videoUrl} type="video/mp4">
		</video>
	</div>
	<div class="project-showcase-content">
		<h2 class="card-title">{title}</h2>
		<div class="card-description">{@html description}</div>
	</div>
</div>

<style>
	/*.card-title { color: red !important; }*/
	:root {
		--shadow-color: rgba(210, 230, 255, 1.0);
	}
	* {
		color: black !important;
	}

	.projectShowcaseBox {
	    backdrop-filter: blur(20px);

		background-color: #ffffff60;
		border: 1px solid rgba(0, 0, 0, 0.2);
		/*border-collapse: collapse;*/
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 20px;
		border-radius: 8px;
		padding: 20px;
		transition: background-color 500ms, border-color 500ms, box-shadow 500ms;
	}
	.project-showcase-content {
		flex: 1;
		min-width: 0;
	}
	.projectShowcaseVisual {
		flex-shrink: 0;
		width: 280px;
		max-width: 100%;
		aspect-ratio: 16 / 9;
	}
	.projectShowcaseVisual video,
	.projectShowcaseVisual :global(.plyr) {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	@media (max-width: 900px) {
		.projectShowcaseBox {
			flex-direction: column;
			padding: 18px;
		}

		.projectShowcaseVisual {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.projectShowcaseBox {
			padding: 16px;
			gap: 16px;
		}
	}
</style>
