import Experience from "./Experience.js";

import * as THREE from "three";

const speed = 0.1;

export default class CargoTrain {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "cargoTrain",
        expanded: false,
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};
    const scale = 0.4;

    this.model.group = new THREE.Group();

    let rotation = [0, 1.6, 0];
    this.model.group.rotation.set(...rotation);
    this.model.group.scale.set(scale, scale, scale);
    this.model.group.position.set(0, 0.16, -10);

    this.resources.items.cargoTrainModel.scene.children.forEach((item) => {
      this.model.group.add(item);
    });

    this.scene.add(this.model.group);
  }

  update() {
    this.model.group.position.z = this.model.group.position.z + speed;
    if (this.model.group.position.z > 20) {
      this.model.group.position.z = -10;
    }
  }
}
