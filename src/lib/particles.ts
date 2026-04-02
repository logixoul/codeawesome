/**
 * Particle Animation System
 * Falling snowflake-like glowing particles with wind turbulence
 */

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
        this.size *= 3; // Scale up for better visibility
        this.speedY = Math.random() * 0.7 + 0.25;
        this.speedY *= 2.0; // faster fall speed for more dynamic effect
        this.opacity = Math.random() * 0.55 + 0.25;
        this.driftAmp = Math.random() * 0.7 + 0.15;
        this.driftAmp *= 2.0; // stronger horizontal drift for more dynamic effect
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

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        //ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = this.size;
        ctx.shadowColor = `rgba(0, 255, 255)`;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

export class ParticleSystem {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private particleCount = 80;

    constructor() {
        const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement | null;
        const ctx = canvas?.getContext("2d") ?? null;
        if (!canvas || !ctx) {
            return;
        }

        this.canvas = canvas;
        this.ctx = ctx;

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
            particle.draw(this.ctx);
        }

        requestAnimationFrame(() => this.animate());
    }
}
