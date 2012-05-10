var Piece = Class.create({
  initialize: function(path, pathName) {
   		this.path = path;		
		/**
		 * The name of type path.
		 */
		this.pathName = pathName;
		
		/**
		 * The number of rotations (max 3)
		 */
		this.rotationNumber = 0;
		
		/**
		 * Defines if is a new piece (never added in a quadrant).
		 */
		this.isNew = true;
		
		/**
		 * Defines if the piece was used (liquid passed)
		 */
		this.used = false;
  },
  rotateRight: function() {
		for (var i = 0; i < this.path.length; i++) 
		{
			for (var j = 0; j < this.path[i].length; j++) 
			{
					path[i][j] += 1;
					
					if (path[i][j] > 3)
					{
						path[i][j] = 0;
					}
			}
		}
		this.rotationNumber += 1;
		if (this.rotationNumber > 3)
		{
			this.rotationNumber = 0;
		}
  },
  rotateLeft: function(){
  	for (var i = 0; i < this.path.length; i++) 
			{
				for (var j = 0; j < this.path[i].length; j++) 
				{
					this.path[i][j] -= 1;
					
					if (this.path[i][j] < 0)
					{
						this.path[i][j] = 3;
					}
				}
			}
			this.rotationNumber -= 1;
			if (this.rotationNumber < 0)
			{
				this.rotationNumber = 3;
			}
  },
  /**
	 * Get the the opposite side of exit
	 * else returns -1 (dont have a valid path)
	 * @param	pieceExitSide
	 * @return entrance of piece
	 */
  getEntraceSide: function(pieceExitSide){
  	//opposite side of piece
		if ((pieceExitSide + 2) > 3)
		{
			return (pieceExitSide + 2) - 4;
		}
		else
		{
			return pieceExitSide + 2;
		}
		return -1;
  },
  /**
	 * With the entrance side, get the exit of path.
	 * @param	entraceSide
	 * @return the exit of path if exist a path
	 */
  getExitSide: function(entraceSide){
  	for (var i = 0; i < this.path.length; i++) 
		{
			for (var j = 0; j < this.path[i].length; j++) 
			{
				if (entraceSide == this.path[i][j])
				{
					var value = j == 0?  entraceSide = 1 : entraceSide = 0;
					return this.path[i][value];
				}
			}
		}
		return -1
  },
  /**
	 * The number of entry path
	 * @param	entraceSide
	 * @return umber of entry path
	 */
  getEnterNum: function(entraceSide){
  	for (var i = 0; i < this.path.length; i++) 
		{
			for (var j = 0; j < this.path[i].length; j++) 
			{
				if (this.entraceSide == this.path[i][j])
				{
					return j;
				}
			}
		}
		return -1
  },
	/**
	 * Verify if the entrance have a path to continue
	 * @param	entranceSideNumber
	 * @return if have path in this side
	 */
  isEntraceSideValid: function(entranceSideNumber){
  	if (entranceSideNumber == -1)
		{
			return false;
		}
		
		for (var i = 0; i < this.path.length; i++) 
		{
			for (var j = 0; j < this.path[i].length; j++) 
			{
				if (this.path[i][j] == entranceSideNumber)
				{
					return true;
				}
			}
		}
		
		return false;
  }
});