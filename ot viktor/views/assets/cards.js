/**
 * Card Interaction System
 * Handles hover effects, tilt effects, and cursor interactions for cards
 */

class CardSystem {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.mouseX = 0;
        this.mouseY = 0;

        // Attach event listeners
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.onCardMouseMove(e));
            card.addEventListener('mouseleave', (e) => this.onCardMouseLeave(e));
            card.addEventListener('mouseenter', (e) => this.onCardMouseEnter(e));
        });

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    onCardMouseEnter(e) {
        const card = e.currentTarget;
        card.style.opacity = '0.95';
    }

    onCardMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        // Calculate tilt based on cursor position
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 10;
        const rotateY = (centerX - e.clientX) / 10;

        // Apply 3D tilt transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

        // Update mouse position for gradient background effect
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    }

    onCardMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.opacity = '1';
    }
}

// Initialize card system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});
