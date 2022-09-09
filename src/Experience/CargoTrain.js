import Experience from "./Experience.js";

import * as THREE from "three";

const speed = 0.07;

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

    let rotation = [0, Math.PI / 2, 0];
    this.model.group.rotation.set(...rotation);
    this.model.group.scale.set(scale, scale, scale);
    this.model.group.position.set(0, 0.16, 0);

    const localPlane = new THREE.Plane(new THREE.Vector3(5, 5, 5), 0.8);

    this.resources.items.cargoTrainModel.scene.children.forEach((item) => {
      let currentItem = item;
      if (currentItem.material) {
        currentItem.material.clippingPlanes = [localPlane];
      }
      // currentItem.material.clippingPlanes = [localPlane];

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
