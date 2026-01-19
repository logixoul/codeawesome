<script lang="ts">
    //const linkTitle = "click here";
    let { id, title, description } = $props();
</script>

<a
    href="."
    class="card"
    data-title="{id}"
    target="_blank"
    rel="noopener noreferrer"
    >
    <div class="card-inner">
        <div class="card-icon">
            <img src="/images/icon-{id}.png" alt={id} loading="lazy" />
        </div>
        <div class="card-content">
            <h2 class="card-title">{title}</h2>
            <p class="card-description">{description}</p>
        </div>
    </div>
    <div class="card-border"></div>
</a>

<style>
    /*.card-title { color: red !important; }*/
</style>