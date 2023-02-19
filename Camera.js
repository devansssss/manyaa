import {EventEmitter} from 'events';
import * as THREE from 'three'
import Experience from "./experience";
import { Triangle } from 'three';
import studio from '@theatre/studio'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getProject, types } from '@theatre/core';
import gsap from 'gsap';
import projectState from './state.json'




export default class Camera extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        studio.initialize()
        this.createcamera();
    }


    createcamera(){
        this.pcamera = new THREE.PerspectiveCamera(
            70,
            this.sizes.aspect,
            0.5,
            500
        )
        this.scene.add(this.pcamera);
        this.pcamera.position.set(0.6,0,0);
        const project = getProject("manya", {state: projectState})
        const sheet = project.sheet('Animated Scene')
        const cam = sheet.object('this.pcamera', {
            position: types.compound({
              x: types.number(this.pcamera.position.x, { range: [-10, 10] }),
              y: types.number(this.pcamera.position.y, { range: [-10, 10] }),
              z: types.number(this.pcamera.position.z, { range: [-10, 10] }),
            }),
          })
          cam.onValuesChange((values) => {
            const { x, y, z } = values.position
          
            this.pcamera.position.set(x , y , z )
          })
        project.ready.then(() => sheet.sequence.play({ iterationCount: 1 }))

    }

    resize(){
        this.pcamera.aspect = this.sizes.aspect;
        this.pcamera.updateProjectionMatrix;
    }
    update(){

    }
}

