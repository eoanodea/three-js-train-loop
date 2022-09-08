import Experience from "./Experience.js";

import * as THREE from "three";

export default class TrainTrack {
  constructor(_position) {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.position = _position;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "trainTrack",
        expanded: false,
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};
    const scale = 0.4;

    this.model.group = new THREE.Group();
    console.log(this.resources.items.trainTrackModel.scene.children);
    let rotation = [0, 1.6, 0];
    this.model.group.rotation.set(...rotation);
    this.model.group.scale.set(scale, scale, scale);
    this.model.group.position.set(...this.position);

    this.resources.items.trainTrackModel.scene.children.forEach((item) => {
      this.model.group.add(item);
    });

    this.scene.add(this.model.group);
  }

  update() {
    for (const _item of this.model.items) {
      _item.material.opacity =
        Math.sin(this.time.elapsed * 0.002 - _item.index * 0.5) * 0.5 + 0.5;
    }
  }
}
