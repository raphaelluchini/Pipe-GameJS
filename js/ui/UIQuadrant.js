var UIQuadrant = Class.create({
  initialize: function() {
   	this.quadrantData;
		this.piece;

		var target = new Shape();
		target.graphics.beginFill(Graphics.getRGB(115,0,0,1)).drawRect(0,0,40,40).beginFill("#FFF");
		this.skin = target;
  }
});