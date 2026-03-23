<script lang="ts">
	import { onMount } from 'svelte';
	import YoutubeEmbed from './YoutubeEmbed.svelte';
	import 'vidstack/bundle';
	import type { MediaPlayerElement } from 'vidstack/elements';
	import 'vidstack/player';
	
	let { id, title, description, onclick } = $props();
	let player:MediaPlayerElement;

	onMount(() => {
		player.addEventListener('media-play-request', () => {
			console.log("playing");
		});
	});
</script>

<div class="projectShowcaseBox">
	<div class="projectShowcaseVisual">
		<!--<Youtube id="6-RV5cZRCXs" />-->
		<media-player autoplay load="play" poster="https://files.vidstack.io/sprite-fight/poster.webp" crossOrigin title="Sprite Fight" src="youtube/6-RV5cZRCXs" bind:this={player}>
			<media-provider></media-provider>
			<media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"></media-video-layout>
		</media-player>
	</div>
	<div class="project-showcase-content">
		<h2 class="card-title">{title}</h2>
		<p class="card-description">{@html description}</p>
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
		background-color: rgba(0, 0, 0, 0.02);
		border: 2px solid rgba(0, 0, 0, 0.02);
		/*border-collapse: collapse;*/
		display: flex;
		flex-direction: row;
		border-radius: 20px;
		padding: 20px;
		transition: background-color 500ms, border-color 500ms, box-shadow 500ms;
	}
	.projectShowcaseBox:hover {
		box-shadow: 
			var(--shadow-color) 0px 0px 16px,
			var(--shadow-color) 0px 0px 32px,
			var(--shadow-color) 0px 0px 64px
		;
		border-color: lightblue;
		background: white;
	}
	.projectShowcaseVisual {
		margin-right: 20px;
		width: 280px;
		height: 158px;
	}
	media-player {
		width: 280px;
		height: 158px;
		border-radius: 20px;
	}
</style>
