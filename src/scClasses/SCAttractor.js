export default class SCAttractor {
    constructor(position, ctx) {
        this.position = position;
        this.ctx = ctx;
        this.reached = false;
        this.influencingNodes = [];
    }

    drawAttractor(colour = 'rgba(0,0,0,0.2)') {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.ellipse(this.position.x, this.position.y, 2, 2, 0, 0, Math.PI*2);
        this.ctx.stroke();
    }
}
