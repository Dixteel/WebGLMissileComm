
export class Entity {

	constructor(visual) {
	  this.visual = visual;
	}

	update() {
		console.log('update...');
		this.visual.updateMatrix();
	}

	setPos(pos) {
		this.visual.position.set(pos.x, pos.y, 0);
	}

}

/*
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
*/
