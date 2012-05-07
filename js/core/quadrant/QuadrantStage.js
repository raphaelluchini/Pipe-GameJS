var QuadrantStage = Class.create({
  initialize: function(view) {
   	this.quadrantManager;
		this.created;
		this.view = view;
		this.widthQuad;
		this.heightQuad;
  },
	/**
	 * Create the visual stageQuadrant
	 * You need set the width and height of yours quadrants
	 * All quadrants needs have the same sizes
	 * @param	xRef number of quadrants by X
	 * @param	yRef number of quadrants by Y
	 * @param	widthQuad height of quadrants by Y
	 * @param	heightQuad width of quadrants by Y
	 */
	createStageQuadrant: function(xRef, yRef, widthQuad, heightQuad) 
	{
		this.widthQuad = widthQuad;
		this.heightQuad = heightQuad;
		this.quadrantManager = new QuadrantManager();
		var arrManager = this.quadrantManager.newGame(xRef, yRef, widthQuad, heightQuad);
		
		for (var i = 0; i < arrManager.length; i++) 
		{
			for (var j = 0; j < arrManager[i].length; j++) 
			{
				var quad = arrManager[i][j];
				quad.skin.x = Math.round(widthQuad * i);
				quad.skin.y = Math.round(heightQuad * j);
				this.view.addChild(quad.skin);
			}
		}
	},
	/**
		* Removes and clear of memory all objects
		*/
	dispose: function()
	{			
		for (var i = 0; i < this.quadrantManager.stageRef.length; i++) 
		{
			for (var j = 0; j < this.quadrantManager.stageRef[i].length; j++) 
			{
				removeChild(this.quadrantManager.stageRef[i][j]);
				this.quadrantManager.stageRef[i][j] = null;
			}
		}
		this.quadrantManager = null;
	}
});