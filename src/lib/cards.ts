/**
 * Card Interaction System
 * Handles hover effects, tilt effects, and cursor interactions for cards
 */

export class CardSystem {
    private cards: NodeListOf<HTMLElement>;
    private mouseX = 0;
    private mouseY = 0;

    constructor() {
        this.cards = document.querySelectorAll<HTMLElement>(".card");

        // Attach event listeners
        this.cards.forEach((card) => {
            card.addEventListener("mousemove", (e: MouseEvent) => this.onCardMouseMove(e));
            card.addEventListener("mouseleave", (e: MouseEvent) => this.onCardMouseLeave(e));
            card.addEventListener("mouseenter", (e: MouseEvent) => this.onCardMouseEnter(e));
        });

        document.addEventListener("mousemove", (e: MouseEvent) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    private onCardMouseEnter(e: MouseEvent): void {
        const card = e.currentTarget as HTMLElement;
        card.style.opacity = "0.95";
    }

    private onCardMouseMove(e: MouseEvent): void {
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();

        // Calculate tilt based on cursor position
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 10;
        const rotateY = (centerX - e.clientX) / 10;

        // Apply 3D tilt transform
        //card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

        // Update mouse position for gradient background effect
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
    }

    private onCardMouseLeave(e: MouseEvent): void {
        const card = e.currentTarget as HTMLElement;
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        card.style.opacity = "1";
    }
}
