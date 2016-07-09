var camera, scene, renderer;
var cameraOrtho, sceneOrtho;

var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
var indicator;

var mapC;

var group;

var mouse = {
	x: 0,
	y: 0
};

var g_stage;
var g_clock = new THREE.Clock();

init();
animate();

function begin() {
	indicator = ASSET.indicator.sprite.clone();
	sceneOrtho.add( indicator );

	g_stage.init();
}

function init() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	camera = new THREE.PerspectiveCamera( 60, width / height, 1, 2100 );
	camera.position.z = 1500;

	cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
	cameraOrtho.position.z = 10;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );

	sceneOrtho = new THREE.Scene();

	// create sprites

	var amount = 200;
	var radius = 500;

	var textureLoader = new THREE.TextureLoader();

	g_stage = new Stage(sceneOrtho);

	LoadAsset(begin);

	var mapA = textureLoader.load( "res/sprite0.png", createHUDSprites );
	//var mapB = textureLoader.load( "res/sprite1.png" );
	//mapC = textureLoader.load( "res/sprite2.png" );

	textureLoader.load( "res/Indicator.png", function (texture) {
		var material = new THREE.SpriteMaterial( { map: texture } );
		var width = material.map.image.width;
		var height = material.map.image.height;

		indicator = new THREE.Sprite(material);

		indicator.scale.set( width, height, 1 );
		sceneOrtho.add( indicator );
	});


	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.autoClear = false; // To allow render overlay on top of sprited sphere

	document.body.appendChild( renderer.domElement );

	//
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener("click", onDocumentMouseClick, false);
}

function onDocumentMouseMove( event ) {
	event.preventDefault();

	//mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	//mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	mouse.x = event.clientX - ( window.innerWidth / 2 );
	mouse.y = - event.clientY + ( window.innerHeight / 2 );


}

function onDocumentMouseClick( event ) {
	event.preventDefault();

	//mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	//mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	console.log("---->click: " + mouse.x + ", " + mouse.y);
	var missile = g_stage.addEntity(ASSET.missile);
	missile.setPos({
		x: mouse.x,
		y: mouse.y
	});
}


function createHUDSprites ( texture ) {


	var material = new THREE.SpriteMaterial( { map: texture } );

	var width = material.map.image.width;
	var height = material.map.image.height;

	spriteTL = new THREE.Sprite( material );
	spriteTL.scale.set( width, height, 1 );
	sceneOrtho.add( spriteTL );

	spriteTR = new THREE.Sprite( material );
	spriteTR.scale.set( width, height, 1 );
	sceneOrtho.add( spriteTR );

	spriteBL = new THREE.Sprite( material );
	spriteBL.scale.set( width, height, 1 );
	sceneOrtho.add( spriteBL );

	spriteBR = new THREE.Sprite( material );
	spriteBR.scale.set( width, height, 1 );
	sceneOrtho.add( spriteBR );

	spriteC = new THREE.Sprite( material );
	spriteC.scale.set( width, height, 1 );
	sceneOrtho.add( spriteC );
	updateHUDSprites();
}


function updateHUDSprites () {

	var width = window.innerWidth / 2;
	var height = window.innerHeight / 2;

	var material = spriteTL.material;

	var imageWidth = material.map.image.width / 2;
	var imageHeight = material.map.image.height / 2;

	spriteTL.position.set( - width + imageWidth,   height - imageHeight, 1 ); // top left
	spriteTR.position.set(   width - imageWidth,   height - imageHeight, 1 ); // top right
	spriteBL.position.set( - width + imageWidth, - height + imageHeight, 1 ); // bottom left
	spriteBR.position.set(   width - imageWidth, - height + imageHeight, 1 ); // bottom right
	spriteC.position.set( 0, 0, 1 ); // center

}

function onWindowResize() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	cameraOrtho.left = - width / 2;
	cameraOrtho.right = width / 2;
	cameraOrtho.top = height / 2;
	cameraOrtho.bottom = - height / 2;
	cameraOrtho.updateProjectionMatrix();

	updateHUDSprites();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	requestAnimationFrame( animate );

	if (indicator !== undefined) {
		indicator.position.x = mouse.x;
		indicator.position.y = mouse.y;
	}

	var delta = g_clock.getDelta();

	update(delta);
	render();

}

function update() {
	g_stage.update();
}

function render() {
	//var time = Date.now() / 1000;
	renderer.clear();
	renderer.render( scene, camera );
	renderer.clearDepth();
	renderer.render( sceneOrtho, cameraOrtho );
}
