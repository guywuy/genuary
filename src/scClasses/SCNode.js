// import PVector from 'pvectorjs';
import settings from "./settings";

export default class SCNode {
  constructor(parent, position, isTip, ctx) {
    this.parent = parent;
    this.position = position;
    this.isTip = isTip;
    this.ctx = ctx;
    this.settings = settings;
    this.childNodes = [];

    this.influencers = [];
  }

  drawNode() {
    this.ctx.fillStyle = this.parent ? "black" : "orange";
    // this.ctx.beginPath();
    // this.ctx.ellipse(this.position.x, this.position.y, 1, 1, 0, 0, Math.PI * 2);
    // this.ctx.fill();

    this.drawNodeLinks();
  }

  drawNodeLinks() {
    if (!this.parent) return;
    this.ctx.strokeStyle = "black";
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    this.ctx.lineTo(this.parent.position.x, this.parent.position.y);
    this.ctx.stroke();
  }

  getNextNode(nextPosition) {
    this.isTip = false;
    let newNode = new SCNode(this, nextPosition, true, this.ctx);
    this.childNodes.push(newNode);
    return newNode;
  }
}
