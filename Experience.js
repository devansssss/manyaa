import * as THREE from "three"
import Sizes from "./sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Time";
import World from "./World";
import Resources from "./Resources";
import assets from "./assets";


export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.World = new World();

        this.time.on("update", ()=>{
            this.update();
        })

        this.sizes.on("resize", ()=>{
            this.resize();
        })

    }

    update(){
        this.camera.update();
        this.renderer.update();
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
    }
}