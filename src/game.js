import THREE from 'three';

export class Game {


  attached() {
    this.init();
    this.animate();
  }

  init = ()=> {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(70, this.sceneDiv.offsetWidth / this.sceneDiv.offsetHeight, 1, 1000);

      var light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 1, 1).normalize();
      this.scene.add(light);

      var textureLoader = new THREE.TextureLoader();

      var geometry = new THREE.BoxGeometry(30, 30, 30);
      var material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("res/sprite0.png") });


      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.z = -50;
      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(this.sceneDiv.offsetWidth, this.sceneDiv.offsetHeight);
      this.sceneDiv.appendChild(this.renderer.domElement);

      this.render();
  }

  animate = ()=> {
      this.mesh.rotation.x += .01;
      this.mesh.rotation.y += .005;

      this.render();
      requestAnimationFrame(this.animate);
  }

  render = ()=> {
      this.renderer.render(this.scene, this.camera);
  }
}
