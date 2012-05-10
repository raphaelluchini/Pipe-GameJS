var UIPiece = Class.create({
	/**
	 * The constructor method needs the piece x and y for know where the pieces is added
	 */
  initialize: function(pieceData, type, skinView) {
  		this.pieceData = pieceData;
		this.isDrag;
		this.isInteractive = false;
		this.skin;
		this.pieceType;
		this.addedOnStage;
		this.mouseDownSignal = new signals.Signal();
    	this.mouseUpSignal = new signals.Signal();
	
		this.skin = skinView.view;
		this.setPieceType(type);
		
		this.skin.setParentObj = function(obj)
		{
			this.parentObj = obj;
		}
		this.skin.setParentObj(this);

		if(this.isInteractive)
		{
			this.addInteraction();
		}
  },
  /**
	 * Dispatched when added to Stage
	 * add listeners of interaction if have permition
	 * @param	event
	 */
	onAddedToStage: function(event) {
		this.addedOnStage = true;
		if (this.isInteractive)
		{
			this.addInteraction();
		}
 	 },
  /**
    * Add the listeners for mouse interactions
    */
	addInteraction: function() {
		var _this = this;
			this.skin.onPress = function(eventPress) {
				var offset = {x:eventPress.target.x-eventPress.stageX, y:eventPress.target.y-eventPress.stageY};
      			eventPress.target.parentObj.mouseDownSignal.dispatch(eventPress.target.parentObj);
      			eventPress.target.scaleX = eventPress.target.scaleY = 1.2;
				eventPress.onMouseMove = function(eventMove) {
					eventPress.target.x = eventMove.stageX+offset.x;
					eventPress.target.y = eventMove.stageY+offset.y;
				}
				eventPress.onMouseUp = function(event) {
					eventPress.target.parentObj.isDrag = false;
          			eventPress.target.parentObj.mouseUpSignal.dispatch();
					Event.stopObserving(document, 'keypress', getKey);
					eventPress.target.scaleX = eventPress.target.scaleY = 1;
			  }
			  Event.observe(document, 'keypress', getKey);
			}

		this.skin.onMouseOver = function(mouseOver){
			document.body.style.cursor = "move";
		}

		this.skin.onMouseOut = function(mouseOut){
			document.body.style.cursor = "default";
		}

	  	function getKey(e){ 
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code);
			if(character.toLowerCase() == "r")
			{
				_this.onMouseWheel(1)
			}
		}
  },
  /**
	 * Dispatched when use the Wheel of mouse
	 * Used for rotation the object
	 * @param	event
	 */
	onMouseWheel: function(side) {
			if (side > 0)
				this.pieceData.rotateLeft();
			else
				this.pieceData.rotateRight();

			//Pixel Rotation Fix
			if(this.pieceData.rotationNumber == 3)
			{
				this.skin.regX = 21;
				this.skin.regY = 20;
			}

			if(this.pieceData.rotationNumber == 2)
			{
				this.skin.regX = 21;
				this.skin.regY = 21;
			}

			if(this.pieceData.rotationNumber == 1)
			{
				this.skin.regX = 20;
				this.skin.regY = 21;
			}
			if(this.pieceData.rotationNumber == 0)
			{
				this.skin.regX = 20;
				this.skin.regY = 20;
			}
			this.skin.rotation = this.pieceData.rotationNumber * 90;
  },
  /**
	 * Get type of piece ( PieceType.as )
	 * @see PieceType.as
	 * @return nae of type
	 */
  getPieceType: function() {
		return this.pieceType;
  },
  /**
	 * Set the type of piece ( PieceType.as )
	 * @see PieceType.as
	 * @param value
	 */
  setPieceType: function(value) {
		this.pieceType = value;
			
		switch (this.pieceType) 
		{
			case new PieceType().FINISH:
			{
				this.pieceData.isNew = false;
				this.isInteractive = false;
				this.killInteraction();
				break;
			}
			case new PieceType().START:
			{
				this.pieceData.isNew = false;
				this.isInteractive = false;
				this.killInteraction();
				break;
			}
			case new PieceType().BLOCK:
			{
				this.pieceData.isNew = false;
				this.isInteractive = false;
				break;
			}
			default:
			{
				this.pieceData.isNew = true;
				this.isInteractive = true;
				break;
			}
		}
		this.skin.gotoAndStop(0);
  },
  executePiece: function(side) {
		this._isInteractive(false);
		if (this.pieceData.pathName == new PieceFactory().ONE_LINE_NAME || this.pieceData.pathName == new PieceFactory().ONE_CURVE_NAME)
		{
			if (this.pieceData.rotationNumber != side)
			{
				//console.log(">");
				this.skin.gotoAndPlay("init_2");
			}
			else
			{
				//console.log(">>");
				this.skin.gotoAndPlay("init_1");
			}
		}
		else if (this.pieceData.pathName == new PieceFactory().TWO_CURVES_NAME)
		{				
			var paths = [ { path:1, side:2 }, { path:2, side:1 }, { path:2, side:2 }, { path:1, side:1 } ];
			var value = side - this.pieceData.rotationNumber;
			if (value < 0)
			{
				value = value + 4;
			}
			
			this.skin.gotoAndPlay("init" + paths[value].path + "_" + paths[value].side);
		}
		else if (this.pieceData.pathName == new PieceFactory().START_NAME || this.pieceData.pathName == new PieceFactory().FINISH_NAME)
		{
			this.skin.gotoAndPlay("init");
		}
  },
  /**
	 * Execute the animations 
	 * @param	side of enter liquid
	 */
  _isInteractive: function(value) {
		this.isInteractive = value;
		if (this.isInteractive == true)
		{
			if (this.addedOnStage)
			{
				this.addInteraction();
			}
		}
		else
		{
			this.killInteraction();
		}
  },
  killInteraction: function(){
  	if (this.skin)
		{
			this.skin.onPress = null;
			this.skin.onMouseOver = null;
			this.skin.onMouseOut = null;
			document.body.style.cursor = "default";
		}    
  }
});