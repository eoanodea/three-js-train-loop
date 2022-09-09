import * as THREE from "three";
import Experience from "./Experience.js";

import CargoTrain from "./CargoTrain.js";
import TrainTrack from "./TrainTrack.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setDummy();
        this.CargoTrain();
        this.TrainTrack();
      }
    });
  }

  setDummy() {
    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(light);

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(15, 0.2, 15),
      new THREE.MeshBasicMaterial({
        color: 0xaacd69,
        // map: this.resources.items.birchTree1Texture,
        alphaMap: this.resources.items.birchTreeNormal,
      })
    );
    const redWall = new THREE.Mesh(
      new THREE.BoxGeometry(5, 2, 1),
      new THREE.MeshBasicMaterial({ color: 0xc32424 })
    );
    redWall.position.y = 1;
    redWall.position.z = -6.95;
    const redTunnel = new THREE.Mesh(
      new THREE.CircleGeometry(2, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    redTunnel.position.y = -0.3;
    redTunnel.position.z = -6.4;
    this.scene.add(redWall, redTunnel);

    const blueWall = new THREE.Mesh(
      new THREE.BoxGeometry(5, 2, 1),
      new THREE.MeshBasicMaterial({ color: 0xc32424 })
    );
    blueWall.position.y = 1;
    blueWall.position.z = 6.95;
    const blueTunnel = new THREE.Mesh(
      new THREE.CircleGeometry(2, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );

    blueTunnel.position.z = 6.4;
    blueTunnel.rotation.set(0, 9.4, 0);
    this.scene.add(blueWall, blueTunnel);

    this.scene.add(floor);
  }

  CargoTrain() {
    this.cargoTrain = new CargoTrain();
  }

  TrainTrack() {
    this.trainTrack = new TrainTrack([0, 0.14, -3.5]);
  }

  resize() {}

  update() {
    if (this.cargoTrain) this.cargoTrain.update();
  }

  destroy() {}
}
