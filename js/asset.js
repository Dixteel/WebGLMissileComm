var ASSET = {
	ball: {
		url: "res/sprite0.png"
	},
	
	indicator: {
		url: "res/Indicator.png",
	},
	
	missile: {
		url: "res/missile.png"
	}
};






function LoadAsset(callBack) {
	var loadCounter = 0;
	var textureLoader = new THREE.TextureLoader();

	var _setupAsset = function (asset, callBack) {
		return function (texture) {
			var material = new THREE.SpriteMaterial( { map: texture } );
			var width = material.map.image.width;
			var height = material.map.image.height;
			 
			asset.sprite = new THREE.Sprite(material);
			asset.sprite.scale.set( width, height, 1 );
			
			loadCounter --;
			
			if (loadCounter === 0){
				callBack();
			}
		}
	}
	
	for (var property in ASSET) {
		if (ASSET.hasOwnProperty(property)) {
			loadCounter ++;
			textureLoader.load( ASSET[property].url, _setupAsset(ASSET[property], callBack));
		}
	}
}


/*
var AssetManager = (function () {
    "use strict";
    var instance; //prevent modification of "instance" variable
    
	function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
		
        //Singleton initialization code
		this.assets = [];
    }
    
	//instance accessor
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
	
	
	Singleton.prototype = {
		constructor: Singleton,

		load: function(delta) {
			
		},
		
		get: function() {
			
		}
	};
	
    return Singleton;
}());
*/
