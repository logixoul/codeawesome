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
		<img alt="Проекти" src="/images/projects-header.png" width="230" height="auto" style="display: block; margin: 0 auto 40px;" />
		<div class="cards-grid">
			<ProjectShowcaseBox
				title="Стъкло"
                videoUrl="http://nesuho.stefanteaches.eu/videos/glass-modeling.mp4"
				description='
                <p>Моделиране на капки разтопено стъкло</p>
                <p>Не-физично-базиран алгоритъм, базиран на "image processing" техники (blur, contrast curves).</p>
                <a href="https://experiments.stefanteaches.eu/glass-modeling/">Пробвай го в браузъра си!</a>
                <p><strong>Език</strong>: TypeScript</p>
                <p><strong>Библиотеки:</strong> Three.js, WebGL 2</p>
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
				title="Мултимащабен/фрактален растеж на кристали"
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

    .landingContainer .content {
        background-color: #00000080;
    }

    :root {
        --blue-gradient-start: #1e63e3;
        --blue-gradient-end: #00d7ff;
    }

    .title {
        font-size: 3.5rem;
        font-weight: 700;
        font-family: 'Monaco';
        margin-bottom: 10px;
        background: linear-gradient(135deg, var(--blue-gradient-start) 0%, var(--blue-gradient-end) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -1px;
        filter:
            drop-shadow(0 1px 0px #ffffff)
            drop-shadow(0 5px 1px #00000080);
    }


	.sectionPortfolio {
		width: 100dvw;
		min-height: 100dvh;
		background-color: #ffffff;
        background-image: url('/images/watercolor.jpg');
        background-size: cover;
	}

    .sectionPortfolio h2 {
        background: linear-gradient(135deg, var(--blue-gradient-start) 0%, var(--blue-gradient-end) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        font-size: 3.5rem;
        font-weight: 700;

        font-family: "Monaco";
        text-align: center;
        margin-bottom: 20px;
        letter-spacing: -1px;
        filter:
            drop-shadow(0 1px 0px #000000);

    }

    .sectionPortfolio .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
        .sectionPortfolio .cards-grid {
            grid-template-columns: 1fr;
        }
    }

    .subtitle {
        font-size: 1.1rem;
        color: white;
        font-weight: 300;
        letter-spacing: 0.5px;
        margin-bottom: 40px;
        filter:
            drop-shadow(0 5px 1px #00000080);

    }

    .subtitle2 {
        font-size: 1.1rem;
        color: white;
        font-weight: bold;
        letter-spacing: 0.5px;
        filter:
            drop-shadow(0 5px 1px #00000080);
    }

    /* Cards Grid */
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 30px;
    }

</style>
