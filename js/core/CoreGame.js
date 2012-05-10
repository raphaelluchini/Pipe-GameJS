var CoreGame = Class.create(QuadrantStage,{
	/**
	 * The constructor method needs the piece x and y for know where the pieces is added
	 */
  initialize: function($super, view, map, pieceX, pieceY, skinJson) {
  		$super(view, map);
   		this.piece;
		this.pieceX = pieceX;
		this.pieceY = pieceY;
		this.cacheX;
		this.cacheY;
		this.cacheQuadrant;
		this.cachePiece;
		this.skinJson = skinJson;
	  },
  /**
	 * Create a piece using the class UIPiece.
	 * The piece have automatically a listeners
	 * @return a UIPiece
	 */
  createPiece: function() {
		this.piece = new PieceFactory().createRandomPiece(this.skinJson);
		this.piece.skin.x = this.pieceX;
		this.piece.skin.y = this.pieceY;
		var currentClass = this;
		//onMouseDown
		this.piece.mouseDownSignal.add(function(event){
		  	var currentPiece = event;//as UIPiece
				if (currentPiece.isInteractive)
				{
					//stage.addEventListener(MouseEvent.MOUSE_UP, mUp);
					currentClass.cachePiece = event //as UIPiece;
					//DepthManager.bringToTop(currentPiece);
					currentClass.cacheX = currentPiece.skin.x;
					currentClass.cacheY = currentPiece.skin.y;
					
					var xGrid = currentClass.quadrantManager.quadrantsWidth;
					var yGrid = currentClass.quadrantManager.quadrantsHeight;
					var xQuadRef = Math.floor(currentClass.view.mouseX / xGrid);
					var yQuadRef = Math.floor(currentClass.view.mouseY / yGrid);
					currentClass.cacheQuadrant = currentClass.quadrantManager.getQuadrant(xQuadRef, yQuadRef);
					if (currentClass.cacheQuadrant)
					{
						currentClass.cacheQuadrant.piece = null;
					}
				}
		  }
		)
		//onMouseUP

		this.piece.mouseUpSignal.add(function(){
				var xGrid = currentClass.quadrantManager.quadrantsWidth;
				var yGrid = currentClass.quadrantManager.quadrantsHeight;
				var xQuadRef = Math.floor((currentClass.cachePiece.skin.x) / xGrid);
				var yQuadRef = Math.floor((currentClass.cachePiece.skin.y) / yGrid);

				var quad = currentClass.quadrantManager.getQuadrant(xQuadRef, yQuadRef);
				//verifica se está dentro do quadrant
				if (quad != null)
				{
					if (quad.piece == null)
					{
						currentClass.addToQuadrant(currentClass.cachePiece, quad);
					}
					else
					{
						currentClass.cachePiece.skin.x = currentClass.cacheX;
						currentClass.cachePiece.skin.y = currentClass.cacheY;
						if (currentClass.cacheQuadrant)
						{
							currentClass.cacheQuadrant.piece = currentClass.cachePiece;
						}
					}
				}
				else
				{
					currentClass.cachePiece.skin.x = currentClass.cacheX;
					currentClass.cachePiece.skin.y = currentClass.cacheY;
					if (currentClass.cacheQuadrant)
					{
						currentClass.cacheQuadrant.piece = currentClass.cachePiece;
					}
				}
				currentClass.cacheQuadrant = null;
				currentClass.cachePiece = null;
	  		}
	 	)

		this.view.addChild(this.piece.skin);
		return this.piece
  },
  createDefaultPieces: function(){
  	for (var i = 0; i < this.map.length; i++) 
	{
		for (var j = 0; j < this.map[i].length; j++) 
		{
			var pieceType = this.map[i][j];
			switch(pieceType)
			{
				case new PieceType().START:
				{
					this.initQuadrant = [j, i]
					this._createInitPiece(j, i);
					break;
				}
				case new PieceType().FINISH:
				{
					this._createFinishPiece(j, i);
					break;
				}
				case new PieceType().BLOCK:
				{
					this._createBlockPiece(j, i);
					break;
				}	
			}			
		}
	}
  },
  /**
	 * Create the initial piece, where the game starts
	 * @param	xRef
	 * @param	yRef
	 * @return the same piece object
	 */
  _createInitPiece: function(xRef, yRef){
  		var initPiece = new PieceFactory().createInitPiece(this.skinJson);
		this.view.addChild(initPiece.skin);
		var quad = this.quadrantManager.getQuadrant(xRef, yRef);
		this.addToQuadrant(initPiece, quad);
		return initPiece
  },
  /**
	 * Create the finish piece, where the game ends
	 * @param	xRef
	 * @param	yRef
	 * @return the same piece object
	 */
  _createFinishPiece: function(xRef, yRef){
  		var initPiece = new PieceFactory().createFinishPiece(this.skinJson);
		this.view.addChild(initPiece.skin);
		var quad = this.quadrantManager.getQuadrant(xRef, yRef);
		this.addToQuadrant(initPiece, quad);
		return initPiece
  },
  _createBlockPiece: function(xRef, yRef){
  		var initPiece = new PieceFactory().createBlockPiece(this.skinJson);
		this.view.addChild(initPiece.skin);
		var quad = this.quadrantManager.getQuadrant(xRef, yRef);
		this.addToQuadrant(initPiece, quad);
		return initPiece
  },
	/**
	 * Adds the piece at defined quadrant
	 * @param	piece UIPiece
	 * @param	xRef Quadrant xRef
	 * @param	yRef Quadrant yRef
	 */
  addToQuadrant: function(piece, quad){	
		piece.skin.x = quad.skin.x + this.widthQuad/2;
		piece.skin.y = quad.skin.y + this.heightQuad/2;
		quad.piece = piece;
		if (piece.pieceData.isNew)
		{
			piece.pieceData.isNew = false;
			this.createPiece();
		}
  }
});