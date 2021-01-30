import settings from "./settings";

export default class SCNetwork {
  constructor(attractors, nodes, ctx) {
    this.attractors = attractors;
    this.nodes = nodes;
    this.ctx = ctx;
    this.settings = settings;
  }

  draw() {
    this.attractors.forEach((a) => a.drawAttractor());
    this.nodes.forEach((n) => {
      n.drawNode();
      n.drawNodeLinks();
    });
  }

  addNode(node) {
    this.nodes.push(node);
  }

  // Return a normalised vector - the average of all influencing attractor positions
  getAverageDirection(node, influencers) {
    influencers.forEach((i) => i.drawAttractor("red"));
    let influencerVectors = influencers.map((i) => i.position);

    let totalVec = influencerVectors.reduce((acc, curr) => {
      return curr.add(acc);
    });
    let avg = totalVec.div(influencers.length);

    let dirNormalised = node.position.clone().sub(avg).norm();
    return dirNormalised;
  }

  getClosestNode(attractor, nodes) {
    let closestNode = null;
    let record = this.settings.attractionDistance;

    let nearbyNodes = nodes.filter(
      (n) =>
        n.position.dist(attractor.position) <= this.settings.attractionDistance
    );

    nearbyNodes.forEach((node) => {
      let distance = node.position.dist(attractor.position);

      if (distance < this.settings.killDistance) {
        attractor.reached = true;
        closestNode = null;
      } else if (distance < record) {
        closestNode = node;
        record = distance;
      }
    });

    return closestNode;
  }

  grow() {
    // Associate attractors with nearby nodes to figure out where growth should occur
    this.attractors.forEach((attractor, attractorID) => {
      let closestNode = this.getClosestNode(attractor, this.nodes);

      if (closestNode != null) {
        closestNode.influencers.push(attractorID);
        attractor.influencingNodes = [closestNode];
      }
    });

    // Grow the network by adding new nodes onto any nodes being influenced by attractors
    this.nodes.forEach((node) => {
      if (node.influencers.length > 0) {
        let averageDirection = this.getAverageDirection(
          node,
          node.influencers.map((id) => this.attractors[id])
        );
        let multied = averageDirection.mult(this.settings.segmentLength);
        let nextPosition = node.position.clone().sub(multied);
        let nextNode = node.getNextNode(nextPosition);

        this.nodes.push(nextNode);
        // console.log(this.nodes);
      }

      node.influencers = [];
    });

    // Remove any attractors that have been reached by their associated nodes
    this.attractors = this.attractors.filter((attractor) => !attractor.reached);
  }

  getNumberAttractors() {
    return this.attractors.length;
  }
}
