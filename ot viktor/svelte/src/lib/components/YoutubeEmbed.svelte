<script lang="ts">
    var { videoId } = $props();
</script>

<iframe
    width="280"
    height="158"
    src="http://www.youtube.com/embed/{videoId}?si=PtL_OyC-aGqonjy-"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
></iframe>

<style>
    iframe {
        border-radius: 20px;
    }
</style>