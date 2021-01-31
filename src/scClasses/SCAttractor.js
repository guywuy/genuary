import { v4 as uuidv4 } from 'uuid';

export default class SCAttractor {
    constructor(position, ctx) {
        this.position = position;
        this.ctx = ctx;
        this.id = uuidv4();
        this.reached = false;
        this.influencingNodes = [];
    }

    drawAttractor(colour = 'rgba(0,0,0,0.2)', size = 2) {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.ellipse(this.position.x, this.position.y, size, size, 0, 0, Math.PI*2);
        this.ctx.stroke();
    }

    killAttractor() {
        this.reached = true;
    }
}
