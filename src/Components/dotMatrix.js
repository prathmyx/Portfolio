const canvas = document.getElementById('dot-matrix');
const ctx = canvas.getContext('2d');

let width, height,
    gap = 20,
    baseRadius = 1.5,
    maxRadius = 2,
    baseAlpha = 0.2,
    maxAlpha = 0.8,
    maxDistance = 100,
    maxRepulsion = 20,
    ease = 0.05,
    invert = 1;

let mouse = {x: -1000, y: -1000};
let dots = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initDots();
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
})
window.addEventListener('mousedown', () => {
    invert *= -1;
})

class Dot {
    constructor(originX, originY) {
        this.originX = originX;
        this.originY = originY;
        this.x = originX;
        this.y = originY;

        this.radius = baseRadius;
        this.alpha = baseAlpha;
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        let targetX = this.originX;
        let targetY = this.originY;
        let targetRadius = baseRadius;
        let targetAlpha = baseAlpha;

        this.color = `rgba(255, 255, 255, ${this.alpha})`;

        if (dist < maxDistance) {
            let factor = 1 - dist / maxDistance;

            let repel = maxRepulsion * factor,
                angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * repel * invert;
            targetY -= Math.sin(angle) * repel * invert;
            
            targetRadius += (maxRadius - baseRadius) * factor;
            targetAlpha += 0.8 * factor;

            this.color = `rgba(56, 189, 248, ${this.alpha})`;
        }

        this.x += (targetX - this.x) * ease;
        this.y += (targetY - this.y) * ease;

        this.radius += (targetRadius - this.radius) * ease;
        this.alpha += (targetAlpha - this.alpha) * ease;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


function initDots() {
    dots = [];
    for (let x = gap/2; x < width; x += gap) {
        for (let y = gap/2; y < height; y += gap) {
            dots.push(new Dot(x, y));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].update();
        dots[i].draw();
    }

    requestAnimationFrame(animate);
}

resize();
animate();