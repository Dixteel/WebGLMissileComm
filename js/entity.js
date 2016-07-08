
function Entity(visual) {
	this.visual = visual;
}

Entity.prototype = {
	constructor: Entity,

	update: function() {
		this.visual.updateMatrix();
	},
	
	setPos: function(pos) {
		this.visual.position.set(pos.x, pos.y, 0); 
	}
};
