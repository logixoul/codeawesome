<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Slideout from '$lib/components/Slideout.svelte';
    import ProjectShowcaseBox from '$lib/components/ProjectShowcaseBox.svelte';
    import { ParticleSystem } from '$lib/particles';
    import { CardSystem } from '$lib/cards';
	import { onMount } from 'svelte';

	var currentSlideout = $state('portfolio');
	function setCurrentSlideout(val: string) {
		currentSlideout = val;
	}

    onMount(() => {
            new ParticleSystem();
            new CardSystem();

    });
</script>

<canvas id="particleCanvas"></canvas>

<div class="landingContainer topLevelSection">
	<div class="content">
		<header class="header">
			<h1 class="title">Не-сухо програмиране</h1>
			<p class="subtitle">Възможно ли е?</p>
			<p class="subtitle2">Аз съм Стефан. Хайде да програмираме заедно.</p>
		</header>

		<div class="cards-grid">
			<Card id="portfolio" title="Примери" description="Вдъхнови се" onclick={() => {
                document.getElementsByClassName("sectionPortfolio")[0].scrollIntoView({
                    behavior: 'smooth'
                });
                }
            }
			></Card>
			<!--<Card id="blog" title="Статии" description="Почети" onclick={setCurrentSlideout}></Card>-->
			<Card
				id="mentoring"
				title="Уроци/Менторство"
				description="Работѝ с мен"
				onclick={setCurrentSlideout}
			></Card>
		</div>

		<!--<Slideout html="<h1>{currentSlideout} active</h1>" isCurrent="true"></Slideout>-->
	</div>
</div>
<div class="sectionPortfolio topLevelSection">
	<div class="content">
		<h2>Проекти</h2>
		<div class="cards-grid">
			<ProjectShowcaseBox
				title="Стъкло"
                videoUrl="http://nesuho.stefanteaches.eu/videos/glass-modeling.mp4"
				description='
                <p>Моделиране на капки разтопено стъкло</p>
                <p>Не-физично-базиран алгоритъм, базиран на "image processing" техники (blur, contrast curves).</p>
                <p><strong>Език</strong>: TypeScript</p>
                <p><strong>Библиотеки:</strong> Three.js, WebGL 2</p>
                <p><a href="
                '
				onclick={setCurrentSlideout}
			></ProjectShowcaseBox>
			<ProjectShowcaseBox
				title="Флуидна симулация"
                videoUrl="http://nesuho.stefanteaches.eu/videos/grid-based-fluid-purple.mp4"
				description="
                    <p>Базирана на двумерен масив, а не на частици (particles).</p>
                    <p><strong>Език</strong>: C++</p>
                    <p><strong>Библиотеки</strong>: libcinder, OpenGL</p>
                    "
				onclick={setCurrentSlideout}
			></ProjectShowcaseBox>
            <ProjectShowcaseBox
				title="BlurWorld"
                videoUrl="http://nesuho.stefanteaches.eu/videos/blurworld.mp4"
				description="
                    <p>Игра тип 'platformer'/'2d shooter'. </p>
                    <p><strong>Език</strong>: C#</p>
                    <p><strong>Библиотеки</strong>: OpenGL, Qt</p>
                    "
				onclick={setCurrentSlideout}
			></ProjectShowcaseBox>
            <ProjectShowcaseBox
				title="Мултимащабен растеж на кристали"
                videoUrl="http://nesuho.stefanteaches.eu/videos/multiscale-growth-sharp.mp4"
				description="
                    <p>Визуален експеримент. Работи едновременно на различни мащаби - фин, среден, едър.</p>
                    <p><strong>Език</strong>: C++</p>
                    <p><strong>Библиотеки</strong>: libcinder, OpenGL</p>
                    "
				onclick={setCurrentSlideout}
			></ProjectShowcaseBox>
		</div>
	</div>
</div>

<style>
    /* Header */
    .header {
        text-align: center;
        margin-bottom: 60px;
        animation: fadeInDown 0.8s ease-out;
    }

    .title {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 10px;
        background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -1px;
    }


	.sectionPortfolio {
		width: 100dvw;
		min-height: 100dvh;
		background-color: #f0f0eb;
	}

    .sectionPortfolio h2 {
        color: black;
        font-style: italic;
        margin-bottom: 20px;
    }

    .sectionPortfolio .cards-grid {
        grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr));
    }

    .subtitle {
        font-size: 1.1rem;
        color: #a0aec0;
        font-weight: 300;
        letter-spacing: 0.5px;
        margin-bottom: 40px;
    }

    .subtitle2 {
        font-size: 1.1rem;
        color: #c0cef0;
        font-weight: bold;
        letter-spacing: 0.5px;
    }

    /* Cards Grid */
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 30px;
    }

</style>
