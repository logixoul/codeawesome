/**
 * Particle Animation System
 * Creates floating particles that interact with cursor movement
 */

class Particle {
    constructor(canvas) {
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
    }

    getRandomColor() {
        const colors = [
            'rgba(96, 165, 250, ',   // Blue
            'rgba(167, 139, 250, ',  // Purple
            'rgba(244, 114, 182, ',  // Pink
            'rgba(34, 197, 94, ',    // Green
            'rgba(59, 130, 246, ',   // Bright Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY) {
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
        const currentOpacity = parseFloat(this.color.match(/[\d.]+/g)[3] || this.color.match(/[\d.]+/g)[2]);
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

    draw(ctx) {
        ctx.fillStyle = this.color + this.displayOpacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.particleCount = 80;

        // Set canvas size
        this.resizeCanvas();

        // Initialize particles
        this.initializeParticles();

        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseleave', () => this.onMouseLeave());

        // Start animation loop
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    onMouseLeave() {
        this.mouseX = -500;
        this.mouseY = -500;
    }

    connectParticles() {
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

    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let particle of this.particles) {
            particle.update(this.mouseX, this.mouseY);
            particle.draw(this.ctx);
        }

        // Draw connections between particles
        this.connectParticles();

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
