import {inject} from 'aurelia-framework';
import io from 'socket.io-client';
import d3 from 'd3';
import THREE from 'three';
import {Entity} from '../entity';
import {Stage} from '../stage';
import {AssetLoader} from '../asset';

import {UserService} from '../services/user-service';
import {Conn} from '../services/conn';


@inject(UserService, Conn)
export class Game {

  constructor(userService, conn) {
    this.width = 500;
    this.height = 500;
    this.g_clock = new THREE.Clock();
    this.userService = userService;
    this.conn = conn;
  }

  attached() {
    this.initScene();
    this.animate();
  }

  initScene() {
	  this.cameraOrtho = new THREE.OrthographicCamera(
      -this.width/2, this.width/2,
      this.height/2, -this.height/2,
      1, 10 );

	  this.cameraOrtho.position.z = 10;
	  this.scene = new THREE.Scene();
	  this.scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );
	  this.sceneOrtho = new THREE.Scene();


	  let textureLoader = new THREE.TextureLoader();
	  textureLoader.load( "res/sprite0.png", this.createHUDSprites );

  	this.renderer = new THREE.WebGLRenderer();
  	this.renderer.setPixelRatio( window.devicePixelRatio );
  	this.renderer.setSize( this.width, this.height);
  	this.renderer.autoClear = false; // To allow render overlay on top of sprited sphere


    this.stage = new Stage(this.scene);


    this.sceneDiv.appendChild(this.renderer.domElement);
  }

  animate = ()=> {
    // console.log(this.stage);
  	requestAnimationFrame( this.animate );

    /*
  	if (indicator !== undefined) {
  		indicator.position.x = mouse.x;
  		indicator.position.y = mouse.y;
  	}

  	var delta = g_clock.getDelta();

  	update(delta);
    */
  	this.render();
  }


  render() {
  	//var time = Date.now() / 1000;
  	this.renderer.clear();
  	this.renderer.clearDepth();
  	this.renderer.render( this.sceneOrtho, this.cameraOrtho );
  }


  createHUDSprites = (texture)=> {
  	let material = new THREE.SpriteMaterial( { map: texture } );
  	let width = material.map.image.width;
  	let height = material.map.image.height;

  	this.spriteTL = new THREE.Sprite( material );
  	this.spriteTL.scale.set( width, height, 1 );
  	this.sceneOrtho.add( this.spriteTL );

  	this.spriteTR = new THREE.Sprite( material );
  	this.spriteTR.scale.set( width, height, 1 );
  	this.sceneOrtho.add( this.spriteTR );

  	this.spriteBL = new THREE.Sprite( material );
  	this.spriteBL.scale.set( width, height, 1 );
  	this.sceneOrtho.add( this.spriteBL );

  	this.spriteBR = new THREE.Sprite( material );
  	this.spriteBR.scale.set( width, height, 1 );
  	this.sceneOrtho.add( this.spriteBR );

  	this.spriteC = new THREE.Sprite( material );
  	this.spriteC.scale.set( width, height, 1 );
  	this.sceneOrtho.add( this.spriteC );

  	this.updateHUDSprites();
  }

  updateHUDSprites () {

  	var width = this.width / 2;
  	var height = this.height / 2;
  	var material = this.spriteTL.material;

  	var imageWidth = material.map.image.width / 2;
  	var imageHeight = material.map.image.height / 2;

  	this.spriteTL.position.set( - width + imageWidth,   height - imageHeight, 1 ); // top left
  	this.spriteTR.position.set(   width - imageWidth,   height - imageHeight, 1 ); // top right
  	this.spriteBL.position.set( - width + imageWidth, - height + imageHeight, 1 ); // bottom left
  	this.spriteBR.position.set(   width - imageWidth, - height + imageHeight, 1 ); // bottom right
  	this.spriteC.position.set( 0, 0, 1 ); // center
  }


}
