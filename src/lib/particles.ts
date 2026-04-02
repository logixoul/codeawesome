/**
 * Particle Animation System
 * Creates floating particles that interact with cursor movement
 */

class Particle {
    private canvas: HTMLCanvasElement;
    public x: number;
    public y: number;
    private size: number;
    private speedX: number;
    private speedY: number;
    private opacity: number;
    private targetOpacity: number;
    private color: string;
    private distance: number;
    private displayOpacity: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.targetOpacity = this.opacity;
        this.color = this.getRandomColor();
        this.distance = 0;
        this.displayOpacity = this.opacity;
    }

    private getRandomColor(): string {
        const colors = [
            "rgba(96, 165, 250, ",   // Blue
            "rgba(167, 139, 250, ",  // Purple
            "rgba(244, 114, 182, ",  // Pink
            "rgba(34, 197, 94, ",    // Green
            "rgba(59, 130, 246, ",   // Bright Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX: number, mouseY: number): void {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > this.canvas.width) {
            this.speedX *= -1;
            this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.speedY *= -1;
            this.y = Math.max(0, Math.min(this.canvas.height, this.y));
        }

        // Cursor interaction - repel particles
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        this.distance = Math.sqrt(dx * dx + dy * dy);

        const interactionDistance = 150;
        if (this.distance < interactionDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - this.distance / interactionDistance) * 2;
            this.speedX += Math.cos(angle) * force * 0.1;
            this.speedY += Math.sin(angle) * force * 0.1;
            this.targetOpacity = 0.8;
        } else {
            this.targetOpacity = this.opacity;
        }

        // Smooth opacity transition
        const matches = this.color.match(/[\d.]+/g);
        const opacityToken = matches?.[3] ?? matches?.[2];
        const currentOpacity = opacityToken ? parseFloat(opacityToken) : this.opacity;
        const newOpacity = currentOpacity + (this.targetOpacity - currentOpacity) * 0.1;
        this.displayOpacity = Math.max(0.1, Math.min(1, newOpacity));

        // Limit speed
        const maxSpeed = 2;
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speed > maxSpeed) {
            this.speedX = (this.speedX / speed) * maxSpeed;
            this.speedY = (this.speedY / speed) * maxSpeed;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color + this.displayOpacity + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class ParticleSystem {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private mouseX = 0;
    private mouseY = 0;
    private particleCount = 80;

    constructor() {
        const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement | null;
        const ctx = canvas?.getContext("2d") ?? null;
        if (!canvas || !ctx) {
            return;
        }

        this.canvas = canvas;
        this.ctx = ctx;

        // Set canvas size
        this.resizeCanvas();

        // Initialize particles
        this.initializeParticles();

        // Event listeners
        window.addEventListener("resize", () => this.resizeCanvas());
        document.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
        document.addEventListener("mouseleave", () => this.onMouseLeave());

        // Start animation loop
        this.animate();
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private initializeParticles(): void {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    private onMouseMove(e: MouseEvent): void {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    private onMouseLeave(): void {
        this.mouseX = -500;
        this.mouseY = -500;
    }

    private connectParticles(): void {
        const connectionDistance = 200;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    this.ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    private animate(): void {
        // Clear canvas with fade effect
        //this.ctx.fillStyle = "rgba(10, 14, 39, 0.1)";
        //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (const particle of this.particles) {
            particle.update(this.mouseX, this.mouseY);
            //particle.draw(this.ctx);
        }

        // Draw connections between particles
        //this.connectParticles();

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}
