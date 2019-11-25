import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl',
  templateUrl: './webgl.component.html',
  styleUrls: ['./webgl.component.scss']
})
export class WebglComponent implements OnInit {

  scene;
  camera; 
  renderer; 
  cloudParticles = []; 
  flash; 
  rain; 
  rainGeo; 
  rainCount = 15000;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;
    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0,0,1);
    this.scene.add(directionalLight);
    this.flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
    this.flash.position.set(200,300,100);
    this.scene.add(this.flash);
    this.renderer = new THREE.WebGLRenderer();
    this.scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.rainGeo = new THREE.Geometry();
    for(let i=0;i<this.rainCount;i++) {
      const rainDrop = new THREE.Vector3(
        Math.random() * 400 -200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      rainDrop['velocity'] = {};
      rainDrop['velocity'] = 0;
      this.rainGeo.vertices.push(rainDrop);
    }
    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true
    });
    this.rain = new THREE.Points(this.rainGeo,rainMaterial);
    this.scene.add(this.rain);
    let loader = new THREE.TextureLoader();
    loader.load("/assets/smoke.png", (texture) => {
      const cloudGeo = new THREE.PlaneBufferGeometry(500,500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      for(let p=0; p<25; p++) {
        let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
        cloud.position.set(
          Math.random()*800 -400,
          500,
          Math.random()*500 - 450
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random()*360;
        cloud.material['opacity'] = 0.6;
        this.cloudParticles.push(cloud);
        this.scene.add(cloud);
      }
      this.animate.call(this);

      
    });
  }

  animate() {
    this.cloudParticles.forEach(p => {
      p.rotation.z -=0.002;
    });
    this.rainGeo.vertices.forEach(p => {
      p.velocity -= 0.1 + Math.random() * 0.1;
      p.y += p.velocity;
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    this.rainGeo.verticesNeedUpdate = true;
    this.rain.rotation.y +=0.002;
    if(Math.random() > 0.93 || this.flash.power > 100) {
      if(this.flash.power < 100) 
      this.flash.position.set(
          Math.random()*400,
          300 + Math.random() *200,
          100
        );
        this.flash.power = 50 + Math.random() * 500;
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

}
