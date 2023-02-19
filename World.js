import * as THREE from 'three'
import Experience from "./Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap';

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;


        this.wall();
        this.lights();
    

    }



    wall(){
        const wall = new THREE.PlaneGeometry(100,100)
        const col = new THREE.MeshBasicMaterial({color: 0xB67AF2});
        const wal = new THREE.Mesh(wall,col)
        this.scene.add(wal);
        wal.rotateX(-Math.PI)
        wal.rotateY(Math.PI)
        wal.position.set(-.5,-.6,-10)
    }

    lights(){
        const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
        this.scene.add( light );
        const dlight = new THREE.DirectionalLight(0x505050, 3);
        dlight.position.set(2,2,2);
        this.scene.add(dlight)
    }

    resize(){
    }

    update(){
        this.scene.rotation.set(this.scene.rotation + 10);
    }
}

