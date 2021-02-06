import settings from "./settings";
import { Rectangle, Circle, QuadTree, Point } from "./Quadtree";

export default class SCNetwork {
  constructor(attractors, nodes, ctx, networkSettings) {
    this.attractors = attractors;
    this.nodes = nodes;
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.boundary = new Rectangle(this.width/2, this.height/2, this.width, this.height);
    this.qt = new QuadTree(this.boundary, 4);
    this.settings = {
      ...settings,
      ...networkSettings,
    };
  }

  draw() {

    if (this.settings.showAttractorDots) {
      this.attractors.forEach((a) => a.drawAttractor());
    }
    this.nodes.forEach((n) => {
      n.drawNode();
      n.drawNodeLinks();
    });
  }

  addNode(node) {
    let { x, y } = node.position;
    this.qt.insert(new Point(x, y, node)); // Add a point to the quadtree with the node's position and a reference to the node
    this.nodes.push(node);
  }

  // Return a normalised vector - the average of all influencing attractor positions
  getAverageDirection(node, influencers) {
    if (this.settings.showInfluencingAttractorDots) {
      influencers.forEach((i) => i.drawAttractor("yellow"));
    }

    let influencerVectors = influencers.map((i) => i.position.clone());

    let totalVec = influencerVectors.reduce((acc, curr) => {
      return curr.add(acc);
    });
    let avg = totalVec.div(influencers.length);

    let dirNormalised = node.position.clone().sub(avg).norm();
    return dirNormalised;
  }

  // Return the closest node to an attractor, or null if there are none within attractionDistance.
  // Also remove an attractor if there is a node within killDistance
  getClosestNode(attractor, points) {
    let closestNode = null;
    let record = this.settings.attractionDistance;

    points.forEach((point) => {
      let node = point.userData;
      let distance = node.position.dist(attractor.position);

      if (distance < this.settings.killDistance) {
        attractor.killAttractor();
        closestNode = null;
      } else if (distance < record) {
        closestNode = node;
        record = distance;
      }
    });

    return closestNode;
  }

  grow() {
    if (this.attractors.length < 40) return;

    // Associate attractors with nearby nodes to figure out where growth should occur
    this.attractors.forEach((attractor, i) => {

      // Get positions of nodes that are nearby by querying the quadtree
      let attractorRange = new Circle(attractor.position.x, attractor.position.y, this.settings.killDistance * 4);
      let closePoints = this.qt.query(attractorRange, []);
      if (!closePoints.length) return;

      let closestNode = this.getClosestNode(attractor, closePoints);

      if (closestNode != null) {
        // console.log(closestNode);
        closestNode.influencers.push(attractor.id);
        attractor.influencingNodes = [closestNode];
      }
    });

    // Grow the network by adding new nodes onto any nodes being influenced by attractors
    this.nodes.forEach((node) => {
      if (node.influencers.length > 0) {
        let nodesAttractors = node.influencers.map((id) =>
          this.attractors.find((a) => a.id === id)
        );

        if (this.settings.showInfluencingAttractorRings) {
          nodesAttractors.forEach((i) =>
            i.drawAttractor("rgba(255, 0, 0, 0.2)", 6)
          );
        }

        let averageDirection = this.getAverageDirection(node, nodesAttractors);

        let multied = averageDirection.mult(this.settings.segmentLength);
        let nextPosition = node.position.clone().sub(multied);
        let nextNode = node.getNextNode(nextPosition);

        this.addNode(nextNode);
      }

      // Reset node influencers for next iteration
      node.influencers = [];
    });

    // Remove any attractors that have been reached by their associated nodes
    this.removeReachedAttractors();
  }

  removeReachedAttractors() {
    this.attractors = this.attractors.filter((a) => !a.reached);
  }

  getNumberAttractors() {
    return this.attractors.length;
  }

  getNumberNodes() {
    return this.nodes.length;
  }
}
