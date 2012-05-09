var PieceView = Class.create({
	/**
	 * The constructor method needs the piece x and y for know where the pieces is added
	 */
  initialize: function(json) {
  		this.json = json;
		this.view = new BitmapAnimation(new SpriteSheet(json));
		this.view.width = 40;
		this.view.height = 40;
		this.view.regX = 20;
		this.view.regY = 20;
		this.view.snapToPixel = false;
		this.view.gotoAndStop(0);
  },
});