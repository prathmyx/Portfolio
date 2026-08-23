const canvas = document.getElementById('dot-matrix');
const ctx = canvas.getContext('2d');

let width, height,
    gap = 20,
    baseRadius = 1.5,
    maxRadius = 2,
    maxDistance = 100;

let mouse = {x: -1000, y: -1000};

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
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

function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let x = gap/2; x < width; x += gap) {
        for (let y = gap/2; y < height; y += gap) {
            let dx = mouse.x - x;
            let dy = mouse.y - y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            let radius = baseRadius;
            let alpha = 0.1;
            let color = `rgba(255, 255, 255, ${alpha})`;

            if (dist < maxDistance) {
                let factor = 1 - dist/ maxDistance;

                radius += (maxRadius - baseRadius) * factor;
                alpha += 0.8 * factor;
                color = `rgba(56, 189, 248, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    requestAnimationFrame(draw);
}

resize();
draw();

