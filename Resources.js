import { EventEmitter } from "events";
import Experience from "./experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three"


export default class Resources extends EventEmitter{
    constructor(assets){
        super()
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        this.scene = this.experience.scene;
        this.assets = assets;
        this.items = {}
        this.queue = this.assets.length;
        this.loaded = 0;
        console.log(this.actualroom)
        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();

        this.loaders.dracoLoader.setDecoderPath("/draco");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }


    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;
        if(this.loaded===this.queue){
            this.emit("ready");
            this.actualroom = this.items.cake.scene;
            this.scene.add(this.actualroom)
        }
    }
}