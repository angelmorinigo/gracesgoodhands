const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

let espumaArray = [];
let conteoEspuma = 20;
let frame = 0;

class Espuma {
	constructor(x, y, size, direccionx, direcciony, color) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.direccionx = direccionx;
		this.direcciony = direcciony;
		this.color = color;
	}

	draw() {
		ctx.beginPath();

		// Ajusta el valor alfa para hacer la burbuja semi-transparente
		const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
		gradient.addColorStop(0, `rgba(${this.color}, 0.3)`);
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
		ctx.fillStyle = gradient;

		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();

		this.x += this.direccionx;
		this.y += this.direcciony;

		if (this.x + this.size > cw || this.x - this.size < 0) {
			this.direccionx = -this.direccionx;
		}

		if (this.y + this.size > ch || this.y - this.size < 0) {
			this.direcciony = -this.direcciony;
		}
	}
}

let crearBurbujas = () => {
	for (let i = 0; i < conteoEspuma; i++) {
		let x = Math.random() * cw;
		let y = Math.random() * ch;
		let size = Math.random() * 20 + 10;
		let direccionx = (Math.random() * 2) - 1;
		let direcciony = (Math.random() * 2) - 1;
		let color = '255, 255, 255';

		let espuma = new Espuma(x, y, size, direccionx, direcciony, color);
		espumaArray.push(espuma);
	}
}

let update = () => {
	ctx.clearRect(0, 0, cw, ch);

	for (let i = 0; i < espumaArray.length; i++) {
		espumaArray[i].draw();
	}

	requestAnimationFrame(update);
	frame++;
}

crearBurbujas();
update();
