
function Stage(scene) {
	this.scene = scene;
	this.entities = [];
};

Stage.prototype = {
	constructor: Stage,

	init: function() {
		var earth = this.addEntity(ASSET.ball);
		
	},
	
	update: function(delta) {
		for (var i=0; i<this.entities.length; i++) {
			this.entities[i].update(delta);
		}
	},
	
	addEntity: function(asset) {
		var sprite = asset.sprite.clone();	
		this.scene.add(sprite);
		
		var entity = new Entity(sprite);
		this.entities.push(entity);
		
		return entity;
	}
};
