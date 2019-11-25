import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as THREE from 'three';
import { style } from '@angular/animations';
import { BaseType } from 'd3';

@Component({
  selector: 'app-d3-test1',
  templateUrl: './d3-test1.component.html',
  styleUrls: ['./d3-test1.component.scss']
})
export class D3Test1Component implements OnInit {

  data = [1, 2, 3, 5, 6];

  @ViewChild('chart') private chartContainer: ElementRef;
  cube: any;
  renderer: any;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  isActive: any;
  lastPosition: { x: any; y: any; };
  cube2: THREE.Mesh;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.test1()
      // this.animate()//.call(this)
    })
  }

  ngAfterViewInit() {
    // this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );

    // this.renderer = new THREE.WebGLRenderer({ antialias: true });

    // // Camera frustum aspect ratio
    // this.camera.aspect = window.innerWidth / window.innerHeight;
    // // After making changes to aspect
    // this.camera.updateProjectionMatrix();
    // // Reset size
    // this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    // d3.select(this.chartContainer.nativeElement)
    //   .append(() => this.renderer.domElement as any)

    // // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // // const texture = new THREE.TextureLoader().load('/assets/texture1.jpg');
    // // const material = new THREE.MeshBasicMaterial({ map: texture });

    // var geometry = new THREE.SphereGeometry(1, 32, 32);
    // var material = new THREE.MeshPhongMaterial();
    // var earthmesh = new THREE.Mesh(geometry, material);
    // material.map    = THREE.ImageUtils.loadTexture('/assets/earthmap1k.jpg');
    // this.scene.add(earthmesh)
    
    // this.cube = new THREE.Mesh(geometry, material);
    // this.cube2 = new THREE.Mesh(geometry, material);

    // this.cube.rotation.y = 10;
    // this.cube2.rotation.y = 10;

    // this.cube.position.y = 0.8;
    // this.cube2.position.y = -0.8;


    // this.scene.add(this.cube);
    // this.scene.add(this.cube2);
    // this.camera.position.z = 5;

    // this.renderer.render(this.scene, this.camera);

    // setTimeout(() => {    
      
    //   // this.cube.position.x = -5;

    //   // this.cube2.position.y = 5;
    //   // this.cube2.position.x = 5;


    //   this.renderer.render(this.scene, this.camera);
    // }, 1000)
    

    // .append(() => testEl.domElement as any)
      //  .append('svg')
      //   .attr('width', 500)
      //   .attr('height', 300)
      // .append("g")
      // .selectAll()
      //   .data(this.data)
      // .enter()
      // .append(
      //   function (d, i): BaseType {
      //     var bar = new THREE.Mesh() as any;
      //     bar.position.x = 30 * i;
      //     bar.position.y = d;
      //     bar.scale.y = d / 10;
      //     console.log(bar)
      //     return bar;
      //   }
      // );

        // .append((d, i): BaseType => {
        //   console.log(d, i)
        //   return document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        // })

        // // .append('rect')
        // .style('height', 20)
        // .style("width", (d) => +d * 10 + "px")
        // .style('transform', (d, i) => `translateY(${i * 30}px)`)
        // .style('fill', 'red')
        // .text((d) => +d);
  }

  // animate() {
  //   requestAnimationFrame.call(this, this.animate.bind(this));
  //   // Rotate cube (Change values to change speed)
  //   this.cube.rotation.x += 0.01;
  //   this.cube.rotation.y += 0.01;
  
  //   this.renderer.render(this.scene, this.camera);
  // }

  startRotate(e) {
    this.isActive = true;
    this.lastPosition = {
      x: e.clientX,
      y: e.clientY
    }
  }

  endRotate(e) {
    this.isActive = false;
  }

  rotate(e) {
    event.preventDefault();
    if (this.isActive) {
      const deltaX = this.lastPosition.x - e.clientX,
      deltaY = this.lastPosition.y - e.clientY;
      // this.cube.rotation.y = deltaX / 100;
      // this.cube.rotation.x = deltaY / 100;
      // this.cube.position.x = deltaX / 100;
      // this.cube.position.y = deltaY / 100;
      console.log(deltaY/200)
      this.camera.position.x += deltaX / 100;
      this.renderer.render(this.scene, this.camera);

    }
    
  }


  test1() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshPhongMaterial();
var earthmesh = new THREE.Mesh(geometry, material);
material.map    = THREE.ImageUtils.loadTexture('/assets/earthmap1k.jpg');
  }

  wheelRotate(e) {
    // const delta = e.wheelDelta / 100;
    
    // console.log(delta)
    // this.camera.position.x += delta;
    // this.renderer.render(this.scene, this.camera);
  }

  testEvent(e) {
    console.log(e.wheelDelta)
  }

}
