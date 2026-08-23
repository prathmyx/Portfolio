const canvas = document.getElementById('dot-matrix');
const ctx = canvas.getContext('2d');

let width, height,
    gap = 25,
    baseRadius = 1.5,
    maxRadius = 3,
    maxDistance = 15;

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
            let color = `rgba(255, 255, 255, 0.25)`;
            ctx.beginPath();
            ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    requestAnimationFrame(draw);
}

resize();
draw();

