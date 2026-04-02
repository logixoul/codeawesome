/**
 * Particle Animation System
 * Falling snowflake-like glowing particles with wind turbulence
 */

const GLOW_SPRITE_RES = 64;

function createGlowSprite(): HTMLCanvasElement {
    const offscreen = document.createElement("canvas");
    offscreen.width = GLOW_SPRITE_RES;
    offscreen.height = GLOW_SPRITE_RES;
    const ctx = offscreen.getContext("2d")!;
    const imageData = ctx.createImageData(GLOW_SPRITE_RES, GLOW_SPRITE_RES);
    const half = GLOW_SPRITE_RES / 2;
    for (let py = 0; py < GLOW_SPRITE_RES; py++) {
        for (let px = 0; px < GLOW_SPRITE_RES; px++) {
            const dx = (px + 0.5 - half) / half;
            const dy = (py + 0.5 - half) / half;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist >= 1.0) continue;
            const alpha = Math.pow(1.0 - dist, 2.0);
            const idx = (py * GLOW_SPRITE_RES + px) * 4;
            const brightness = Math.round(alpha * 255);
            imageData.data[idx]     = brightness;
            imageData.data[idx + 1] = brightness;
            imageData.data[idx + 2] = brightness;
            imageData.data[idx + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    return offscreen;
}

class Particle {
    private canvas: HTMLCanvasElement;
    public x: number;
    public y: number;
    private size: number;
    private speedY: number;
    private opacity: number;
    private driftAmp: number;
    private driftPhase: number;
    private driftFreq: number;

    constructor(canvas: HTMLCanvasElement, randomY = true) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = randomY ? Math.random() * canvas.height : -Math.random() * 20;
        this.size = Math.random() * 1.8 + 0.6;
        this.size *= 6; // Scale up for better visibility
        this.speedY = Math.random() * 0.7 + 0.25;
        this.opacity = Math.random() * 0.55 + 0.25;
        this.driftAmp = Math.random() * 0.7 + 0.15;
        this.driftPhase = Math.random() * Math.PI * 2;
        this.driftFreq = Math.random() * 0.018 + 0.004;
    }

    update(): void {
        this.y += this.speedY;

        this.driftPhase += this.driftFreq;
        this.x += Math.sin(this.driftPhase) * this.driftAmp;

        // Wrap left/right
        if (this.x < 0) this.x += this.canvas.width;
        if (this.x > this.canvas.width) this.x -= this.canvas.width;

        // Wrap bottom → top
        if (this.y > this.canvas.height) {
            this.y = -4;
            this.x = Math.random() * this.canvas.width;
        }
    }

    draw(ctx: CanvasRenderingContext2D, glowSprite: HTMLCanvasElement): void {
        //ctx.globalAlpha = this.opacity;
        ctx.drawImage(glowSprite, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
}

export class ParticleSystem {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private particleCount = 80;
    private glowSprite!: HTMLCanvasElement;

    constructor() {
        const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement | null;
        const ctx = canvas?.getContext("2d") ?? null;
        if (!canvas || !ctx) {
            return;
        }

        this.canvas = canvas;
        this.ctx = ctx;
        this.glowSprite = createGlowSprite();

        this.resizeCanvas();
        this.initializeParticles();

        window.addEventListener("resize", () => this.resizeCanvas());

        this.animate();
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private initializeParticles(): void {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, true));
        }
    }

    private animate(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const particle of this.particles) {
            particle.update();
            particle.draw(this.ctx, this.glowSprite);
        }
        this.ctx.globalAlpha = 1;

        requestAnimationFrame(() => this.animate());
    }
}
