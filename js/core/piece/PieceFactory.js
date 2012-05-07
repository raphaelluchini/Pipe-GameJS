var PieceFactory = Class.create({
  initialize: function() {
   	this.ONE_LINE_NAME = "one-line";
		this.TWO_LINES_NAME = "two-lines";
		this.ONE_CURVE_NAME = "one-curve";
		this.TWO_CURVES_NAME = "two-curves";
		
		this.START_NAME = "start";
		this.FINISH_NAME = "finish";
  }
});

/**
 * Create the finish piece, where the game ends
 * @return the same piece object
 */
PieceFactory.prototype.createFinishPiece = function(json)
{
	var pieceView = new PieceView(json["pieces"][4]);
	var FINISH_PATH = [[2, -1]];
	return new UIPiece(new Piece(FINISH_PATH, this.FINISH_NAME), new PieceType().FINISH, pieceView)
}

/**
 * Create the initial piece, where the game starts
 * @return the same piece object
 */
PieceFactory.prototype.createInitPiece = function(json)
{
	var pieceView = new PieceView(json["pieces"][3]);
	var START_PATH = [[-1, 2]];
	return new UIPiece(new Piece(START_PATH,  this.START_NAME), new PieceType().START, pieceView)
}

/**
 * Create a random piece using the class UIPiece.
 * @return a UIPiece
 */
PieceFactory.prototype.createRandomPiece = function(json) 
{
	var oneLine = [[0, 2]];
	var oneCurve = [[0, 1]];
	var twoCurves = [[0, 3], [1, 2]];

	var paths = [oneLine, oneCurve, twoCurves];
	var paths_names = [this.ONE_LINE_NAME, this.ONE_CURVE_NAME, this.TWO_CURVES_NAME];

	var rand = new PieceFactory().randNumber(0, paths.length-1);
	var pieceView = new PieceView(json["pieces"][rand]);
	var path = paths.concat();
	return new UIPiece(new Piece(path[rand],  paths_names[rand]), new PieceType().NORMAL, pieceView)
}

/**
 * Generate the random number with a range
 * @param	low
 * @param	high
 * @return random number with range
 */
PieceFactory.prototype.randNumber = function(low, high)
{
	return Math.floor(Math.random() * (1+high-low)) + low;
}