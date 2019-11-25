import { Component, OnInit } from '@angular/core';
// const OrbitControls = require('three-orbit-controls')(THREE)
import * as THREE from 'three';
import { Material } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-d3-test2',
  templateUrl: './d3-test2.component.html',
  styleUrls: ['./d3-test2.component.scss']
})
export class D3Test2Component implements OnInit {
  cloudMesh: THREE.Mesh;
  earthMesh: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  meshSize = 1.2;
  delta = 0;
  cameraPosition = {
    x: 0,
    y: 3,
    z: 5
  }
  controls: OrbitControls;

  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
      this.renderGraph()
    // }, 2000)
  }

  renderGraph() {
    const renderer = new THREE.WebGLRenderer()
    const width = 1000, height = 500
    renderer.setClearColor(0x000000, 1.0)
    renderer.setSize( width, height );
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1500 );
    // camera.position.set(0, 1, 3)
    // camera.lookAt(new THREE.Vector3())

    const texture = new THREE.TextureLoader().load('/assets/earthmap1k.jpg');
    const bumpMap = new THREE.TextureLoader().load('/assets/earthbump1k.jpg');
    const specularMap  = new THREE.TextureLoader().load('/assets/earthspec1k.png');

    var geometry = new THREE.SphereGeometry(this.meshSize, 32, 32);
    const material = new THREE.MeshPhongMaterial(
      { 
        color: '#fff',
        map: texture,
        bumpMap: bumpMap,
        bumpScale: 0.1,
        transparent: true,
        specular: new THREE.Color('grey'),
        specularMap: specularMap,
        shininess: 5
      }
    );
 
    this.earthMesh = new THREE.Mesh(geometry, material);


    const cloudGeometry   = new THREE.SphereGeometry(this.meshSize + 0.01, 32, 32)
    const cloudMaterial  = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/assets/earthcloudmap.jpg'),
      alphaMap: new THREE.TextureLoader().load('/assets/earthcloudmaptrans.jpg'),
      side        : THREE.DoubleSide,
      opacity     : 0.8,
      transparent : true,
      depthWrite  : false,
    });
    this.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    this.earthMesh.add(this.cloudMesh)






    // const light = new THREE.DirectionalLight(0xffffff, 1);
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    // const light = new THREE.SpotLight(0xffffff, 1, 1000)
    // var light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(0, 0, 0);
    scene.add( light );

    camera.lookAt(new THREE.Vector3(
      -this.cameraPosition.x,
      -this.cameraPosition.y,
      -this.cameraPosition.z
    ))
    camera.position.set(
      this.cameraPosition.x, 
      this.cameraPosition.y, 
      this.cameraPosition.z
    );

    // const lightHelper = new THREE.DirectionalLightHelper(light);
    const lightHelper = new THREE.PointLightHelper(light);
    // const lightHelper = new THREE.SpotLightHelper(light);
    scene.add( lightHelper );

    const light2 = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add( light2 );


    scene.add( camera ); 
     
    scene.add(this.earthMesh)
    setTimeout(() => {
      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      renderer.render(scene, camera);
      this.setRotation();
    }, 2000)
    

    document.body.appendChild( renderer.domElement );
    this.controls = new OrbitControls( camera, renderer.domElement );
  }

  // animate() {
  //   requestAnimationFrame(this.animate);
  
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  
  //   ;
  // }

  setRotation() {
    requestAnimationFrame(this.setRotation.bind(this));
    const speed = 0.01;
    this.delta += 0.005
    this.earthMesh.rotation.y += speed;
    this.cloudMesh.rotation.y -= speed * 1.1;

    this.earthMesh.position.x = Math.sin(this.delta) * 3;
    this.earthMesh.position.z = Math.cos(this.delta) * 3;


    // this.camera.position.x = Math.sin(this.delta) * 2 + this.cameraPosition.x;
    // this.camera.position.z = Math.cos(this.delta) * 2 + this.cameraPosition.z;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}
