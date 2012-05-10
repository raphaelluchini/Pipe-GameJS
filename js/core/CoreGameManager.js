var CoreGameManager = Class.create({
	/**
	 * The constructor method needs the piece x and y for know where the pieces is added
	 */
  initialize: function(coreGame) {
   	/**
		* Duration of piece animation in ms
		*/
		this.pieaceTime = 3;
		this.coreGame = coreGame;
		this.timer;

		this.quadrantManager;
		
		
		/**
		 * Current quadrand to verify.
		 */
		this.currentQuad;
		
		this.currentExit;
		this.currentEntrance;
		this.nextEntrance;
  },
  /**
	 * Init a especif game
	 */
  initGame: function() {
		this.coreGame.createStageQuadrant(40, 40);
		this.coreGame.createDefaultPieces();
		this.coreGame.createPiece();
		this.quadrantManager = this.coreGame.quadrantManager;
		this.initVerification();
  },
  /**
	 * Inities varifications of pieces
	 */
  initVerification: function(){
		this.currentQuad = this.quadrantManager.getQuadrant(this.coreGame.initQuadrant[0], this.coreGame.initQuadrant[1]);
		this.currentQuad.piece.executePiece(-1);
		var _this = this;
		this.timer = new PeriodicalExecuter(function(pe){
			if (_this.currentQuad.piece.getPieceType() == new PieceType().START)
			{
				_this.currentEntrance = _this.currentQuad.piece.pieceData.path[0][0];
				_this.currentExit = _this.currentQuad.piece.pieceData.path[0][1];
				
			}
			else
			{
				_this.currentEntrance = _this.nextEntrance;
				_this.currentExit = _this.currentQuad.piece.pieceData.getExitSide(_this.currentEntrance);
			}
			
			_this.nextEntrance = _this.currentQuad.piece.pieceData.getEntraceSide(_this.currentExit);
			
			var nextQuad = _this.quadrantManager.getNext(_this.currentQuad, _this.currentExit);

			if (nextQuad == null) return
			if (nextQuad.piece != null)
			{
				if (nextQuad.piece.pieceData.isEntraceSideValid(_this.nextEntrance))
				{
					if (nextQuad.piece.getPieceType() == new PieceType().FINISH)
					{
						nextQuad.piece.executePiece(-1);
						pe.stop();
						console.log("WIN");
						return
					}
					else
					{
						_this.currentQuad = nextQuad;
						nextQuad = null;
						_this.currentQuad.piece.executePiece(_this.nextEntrance);
						console.log("CHANGE");
						return
					}
					
				}
				else
				{
					console.log("LOSE");
					pe.stop();
					return
				}
			}
			
			console.log("HAVENT_NEXT_PIECE");
			pe.stop();
			
		}, this.pieaceTime);
  },
});