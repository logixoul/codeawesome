<script lang="ts">
    import Card from '$lib/components/Card.svelte';
</script>
<canvas id="particleCanvas"></canvas>

<div class="landingContainer">
    <div class="content">
        <header class="header">
            <h1 class="title">Не-сухо програмиране</h1>
            <p class="subtitle">Възможно ли е?</p>
            <p class="subtitle2">Аз съм Стефан. Хайде да програмираме заедно.</p>
        </header>

        <div class="cards-grid">
            <Card id="portfolio" title="Примери" description="Вдъхнови се"></Card>
            <Card id="blog" title="Статии" description="Почети"></Card>
            <Card id="mentoring" title="Менторство" description="Работѝ с мен"></Card>
        </div>
    </div>
</div>
