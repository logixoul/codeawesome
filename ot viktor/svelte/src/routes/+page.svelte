<script lang="ts">
    import Card from '$lib/components/Card.svelte';
</script>
<!-- Particle canvas -->
<canvas id="particleCanvas"></canvas>

<!-- Main container -->
<div class="landingContainer">
    <div class="content">
    <!-- Header -->
    <header class="header">
        <h1 class="title">Не-сухо програмиране</h1>
        <p class="subtitle">Възможно ли е?</p>
        <p class="subtitle2">Аз съм Стефан. Хайде да програмираме заедно.</p>
        <Card></Card>
    </header>

    <!-- Cards grid -->
    <div class="cards-grid">
        <a
        href="."
        class="card"
        data-title="portfolio"
        target="_blank"
        rel="noopener noreferrer"
        >
        <div class="card-inner">
            <div class="card-icon">
            <img src="/images/icon-portfolio.png" loading="lazy" />
            </div>
            <div class="card-content">
            <h2 class="card-title">Примери</h2>
            <p class="card-description">Вдъхновѝ се</p>
            </div>
        </div>
        <div class="card-border"></div>
        </a>
        <a
        href="."
        class="card"
        data-title="blog"
        target="_blank"
        rel="noopener noreferrer"
        >
        <div class="card-inner">
            <div class="card-icon">
            <img src="/images/icon-blog.png" loading="lazy" />
            </div>
            <div class="card-content">
            <h2 class="card-title">Статии</h2>
            <p class="card-description">Почети</p>
            </div>
        </div>
        <div class="card-border"></div>
        </a>
        <a
        href="."
        class="card"
        data-title="mentoring"
        target="_blank"
        rel="noopener noreferrer"
        >
        <div class="card-inner">
            <div class="card-icon">
            <img src="/images/icon-mentoring.png" loading="lazy" />
            </div>
            <div class="card-content">
            <h2 class="card-title">Менторство</h2>
            <p class="card-description">Работѝ с мен</p>
            </div>
        </div>
        <div class="card-border"></div>
        </a>
    </div>
    </div>
    </div>
