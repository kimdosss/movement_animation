import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import * as d3 from 'd3';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-webgl-chart',
  templateUrl: './webgl-chart.component.html',
  styleUrls: ['./webgl-chart.component.scss']
})
export class WebglChartComponent implements OnInit, AfterViewInit {
  controls: OrbitControls;
  cameraPosition = {
    x: 0,
    y: 0,
    z: 5
  };
  renderer: any;
  scene: any;
  camera: any;
  preTime: any;
  colorScale: any;
  yScale: d3.ScaleLinear<number, number>;
  
  viewSettings = {
    height: 5
  }
  xScale: d3.ScaleLinear<number, number>;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    // setTimeout(() => {
      this.initGraph();
    // }, 2000)
    this.colorScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0xffffff, 0x000000]);
    
  }

  initGraph() {
    this.renderer = new THREE.WebGLRenderer()
    const width = window.innerWidth, height = window.innerHeight;
    this.renderer.setClearColor(0x000000, 1.0)
    this.renderer.setSize( width, height );
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1500 );
    this.camera.lookAt(new THREE.Vector3(
      -this.cameraPosition.x,
      -this.cameraPosition.y,
      -this.cameraPosition.z
    ))
    this.camera.position.set(
      this.cameraPosition.x, 
      this.cameraPosition.y, 
      this.cameraPosition.z
    );
    this.scene.add( this.camera );    
    
    

    const light = new THREE.AmbientLight(0xffffff, 0.2);
    // light.position.set(30, 0, 0);
    this.scene.add( light );
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    this.scene.add( pointLight );

    document.body.appendChild( this.renderer.domElement );
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.animate();

    // Load data service
    d3.json('/assets/data/data1.json')
      .then(this.renderData.bind(this))

  }

  setAxisScale(data) {
    const dataLength = data.length;
    // this.xScale = d3.scaleLinear()
    //   .domain(
    //     [-dataLength / 2, dataLength / 2]
    //   )
    //   .range([this.viewSettings.height, 0 ]);

    this.yScale = d3.scaleLinear()
      .domain(
        [d3.max(data, d => +d['value']), 0]
      )
      .range([this.viewSettings.height, 0 ]);
  }

  renderData(data) {
    console.log(data)
    this.setAxisScale(data);

    const dataLength = data.length;
    d3.select('g')
      .data(data)
      .enter()
      // .append("p")
      .text((data, index) => {
        this.addComponent(data['value'], index, dataLength);
        return '1'
      })
  }

  addComponent(data, index, dataLength) {


    const boxHeight = this.yScale(data);
    const geometry = new THREE.BoxGeometry(1, boxHeight, 1);
     const material = new THREE.MeshPhongMaterial({
      color: this.colorScale(index),
      // shininess: 10
    });
    const objMesh = new THREE.Mesh(geometry, material);
    objMesh.position.x = index * 2 - dataLength;
    objMesh.position.y = boxHeight / 2;
    this.scene.add(objMesh);

  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}
