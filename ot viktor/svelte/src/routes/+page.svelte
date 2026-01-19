<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import Slideout from '$lib/components/Slideout.svelte';

    function test(e:Event) { alert(5); e.preventDefault(); return false; }
    function test2(val : string) { alert(val); }

    var currentSlideout = $state("portfolio");
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
            <Card id="portfolio" title="Примери" description="Вдъхнови се" onclick={
                () => {
                    test2("hi");
                }
            }></Card>
            <Card id="blog" title="Статии" description="Почети" onclick={() => test2(7)}></Card>
            <Card id="mentoring" title="Менторство" description="Работѝ с мен" onclick={() => test2(8)}></Card>
        </div>

        <Slideout html="<h1>HI!</h1>" isCurrent="true"></Slideout>
    </div>
</div>
