var QuadrantManager = Class.create({
  initialize: function() {
   	/**
		 * Matrix with quadrants refrencies
		 */
		this.stageRef;
		
		/**
		 * The quadrants widths
		 */
		this.quadrantsWidth;
		
		/**
		 * The quadrants heights
		 */
		this.quadrantsHeight;
		
		/**
		 * The Number of quadrant by X or stageRef.length
		 */
		this.quadrantsNumX;
		
		/**
		 * The Number of quadrant by Y or stageRef[i].length
		 */
		this.quadrantsNumY;
  },
	/**
	 * Create a matrix of quadrant with numbers of quadrants by X (xRef) and Y(yRef)
	 * You need set the width and height of yours quadrants
	 * All quadrants needs have the same sizes
	 * @param	xRef number of quadrants by X
	 * @param	yRef number of quadrants by Y
	 * @param	widthQuad height of quadrants by Y
	 * @param	heightQuad width of quadrants by Y
	 * @return Array of quadrants
	 */
	newGame: function(xRef, yRef, widthQuad, heightQuad) 
	{
			this.quadrantsNumX = xRef;
			this.quadrantsNumY = yRef;
			
			this.stageRef = [];
			var counterId = 0;
			for (var i = 0; i < xRef; i++) 
			{
				this.stageRef[i] = [];
				for (var j = 0; j < yRef; j++) 
				{
					var quad = new Quadrant();
					var uiQuadrant = new UIQuadrant();
					quad.id = counterId;
					quad.xRef = i;
					quad.yRef = j;
					uiQuadrant.quadrantData = quad;
					this.stageRef[i].push(uiQuadrant);
					counterId += 1;
				}
			}
			this.quadrantsWidth  = widthQuad;
			this.quadrantsHeight = heightQuad;
			return this.stageRef;
	},
	/**
	 * Get hte UIQuadrant with his position
	 * @param	xRef position of quadrant by X
	 * @param	yRef position of quadrant by Y
	 * @return
	 */
	getQuadrant: function(xRef, yRef)
	{			
		if (this.stageRef[xRef] == null)
		{
			return null
		}
		
		if (this.stageRef[xRef][yRef] == null)
		{
			return null
		}
		
		return this.stageRef[xRef][yRef];
	},
	/**
	 * Select the neighbors with a position
	 * Returns a array of neighbors, the index is:
	 * 0 is top
	 * 1 is left
	 * 2 is bottom
	 * 3 is right
	 * @param	xRef position of quadrant by X
	 * @param	yRef position of quadrant by Y
	 * @return array of neighbors
	 */
	getNeighbors: function(xRef, yRef)
	{			
		var arr = [
		this.stageRef[xRef][yRef - 1],
		this.stageRef[xRef + 1][yRef],
		this.stageRef[xRef][yRef + 1],
		this.stageRef[xRef - 1][yRef]
		];
		return arr;
	},
	/**
	 * Select the neighbors with a position
	 * Returns a array of neighbors, the index is:
	 * 0 is top
	 * 1 is left
	 * 2 is bottom
	 * 3 is right
	 * @param	xRef position of quadrant by X
	 * @param	yRef position of quadrant by Y
	 * @return array of neighbors
	 */
	getNext: function(quadrant, side)
	{
		if (quadrant.piece != null)
			{
				var quadData = quadrant.quadrantData;
				switch (side) 
				{
					case new PieceSide().TOP:
					{
						if (this.stageRef[quadData.xRef] != null)
						{
							if (this.stageRef[quadData.xRef][quadData.yRef - 1] != null)
							{
								//this.stageRef[quadData.xRef][quadData.yRef-1].gotoAndStop(3);
								return this.stageRef[quadData.xRef][quadData.yRef - 1];
							}
							else
							{
								return null;
							}
						}
						else
						{
							return null;
						}
						break;
					}
					
					case new PieceSide().RIGHT:
					{
						if (this.stageRef[quadData.xRef + 1] != null)
						{
							if (this.stageRef[quadData.xRef + 1][quadData.yRef] != null)
							{
								//this.stageRef[quadData.xRef+1][quadData.yRef].gotoAndStop(3);
								return this.stageRef[quadData.xRef + 1][quadData.yRef];
							}
							else
							{
								return null;
							}
						}
						else
						{
							return null;
						}
						break;
					}
					
					case new PieceSide().BOTTOM:
					{
						if (this.stageRef[quadData.xRef] != null)
						{
							if (this.stageRef[quadData.xRef][quadData.yRef + 1] != null)
							{
								//this.stageRef[quadData.xRef][quadData.yRef+1].gotoAndStop(3);
								return this.stageRef[quadData.xRef][quadData.yRef + 1];
							}
							else
							{
								return null;
							}
						}
						else
						{
							return null;
						}
						break;
					}
					
					case new PieceSide().LEFT:
					{
						if (this.stageRef[quadData.xRef - 1] != null)
						{
							if (this.stageRef[quadData.xRef - 1][quadData.yRef] != null)
							{
								//this.stageRef[quadData.xRef - 1][quadData.yRef].gotoAndStop(3);
								return this.stageRef[quadData.xRef - 1][quadData.yRef];
							}
							else
							{
								return null;
							}
						}
						else
						{
							return null;
						}
						
						break;
					}
					default:
					{
						console.log("QuadrantManager::Invalid Position")
						return null;
					}
				}
			}
			else
			{
				console.log("QuadrantManager::Haven't Piece")
				return null;
			}
	}
});