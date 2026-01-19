<script lang="ts">
    import YoutubeEmbed from "./YoutubeEmbed.svelte";
	//const linkTitle = "click here";
	let { id, title, description, onclick } = $props();
</script>

<div class="projectShowcaseBox">
	<div class="projectShowcaseVisual">
        <YoutubeEmbed videoId="6-RV5cZRCXs" />
	</div>
	<div class="project-showcase-content">
		<h2 class="card-title">{title}</h2>
		<p class="card-description">{@html description}</p>
	</div>
</div>

<style>
	/*.card-title { color: red !important; }*/
	* {
		color: black !important;
	}

	.projectShowcaseBox {
		background-color: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: row;
		border-radius: 20px;
		padding: 20px;
	}
	.projectShowcaseVisual {
		margin-right: 20px;
	}
</style>
