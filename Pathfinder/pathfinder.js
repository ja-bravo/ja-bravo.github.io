var openList      = [];
var closedList    = [];
var path          = [];
var NORMAL_COST   = 10;
var DIAGONAL_COST = 14;
var TOTALCOST     = 0;
function GetNeighbors(cell)
{
	var neighbors = [];
	var allowDiagonal = document.getElementById("allowDiagonal").checked;
	// UNCOMMENT TO ALLOW DIAGONAL MOVEMENT
	if (cell.column === 0 && cell.row > 0 && cell.row < gridHeight-1) // Left wall with out top/bottom
	{
		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row][cell.column+1]);
		neighbors.push(cells[cell.row+1][cell.column]);	

		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row-1][cell.column+1]);
			neighbors.push(cells[cell.row+1][cell.column+1]);
		}
	}
	else if (cell.column === 0 && cell.row === 0) // Left top
	{
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row+1][cell.column+1]);
		}
	}
	else if (cell.column === 0 && cell.row === gridHeight-1) // Left bottom
	{
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row-1][cell.column]);
		
		if(allowDiagonal)
		{
		}
	}
	else if (cell.column === gridWidth-1 && cell.row > 0 && cell.row < gridHeight-1) // Right wall with out top/bottom
	{
		neighbors.push(cells[cell.row-1][cell.column]);
		

		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row-1][cell.column-1]);
			neighbors.push(cells[cell.row+1][cell.column-1]);
		}
	}
	else if (cell.column === gridWidth-1 && cell.row === 0) // Right top
	{
		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row+1][cell.column]);
	
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row+1][cell.column-1]);
		}
	}
	else if (cell.column === gridWidth-1 && cell.row === gridHeight-1) // Right bottom
	{
		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row-1][cell.column]);
		
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row-1][cell.column-1]);
		}
	}
	else if (cell.column >= 1 && cell.column < gridWidth-1 && cell.row === 0) // Top wall with out left/right tile
	{
		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		
		neighbors.push(cells[cell.row+1][cell.column]);
		
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row+1][cell.column-1]);
			neighbors.push(cells[cell.row+1][cell.column+1]);
		}
	}
	else if (cell.column >= 1 && cell.column < gridWidth-1 && cell.row === gridHeight-1) // Bottom wall with out left/right tile
	{
		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		
		neighbors.push(cells[cell.row-1][cell.column]);
		
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row-1][cell.column-1]);
			neighbors.push(cells[cell.row-1][cell.column+1]);
		}
	}
	else
	{
		
		neighbors.push(cells[cell.row+1][cell.column]);

		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);
		
		neighbors.push(cells[cell.row-1][cell.column]);
		
		if(allowDiagonal)
		{
			neighbors.push(cells[cell.row+1][cell.column-1]);
			neighbors.push(cells[cell.row+1][cell.column+1]);
			neighbors.push(cells[cell.row-1][cell.column-1]);
			neighbors.push(cells[cell.row-1][cell.column+1]);
		}
	}

	return neighbors;
}

function GetHCost(cell)
{
	var hCost = 0;
	
	var dx = Math.abs(cell.column - endCell.column);
	var dy = Math.abs(cell.row - endCell.row);


	return NORMAL_COST * (dx + dy) + (DIAGONAL_COST -  2 * NORMAL_COST) * Math.min(dx,dy);
}

function GetGCost(startingCell,destCell)
{
	var gCost = 0;
	if(startingCell.row == destCell.row ||
	   startingCell.column == destCell.column )
	{
		gCost = startingCell.gCost + NORMAL_COST;
	}
	else
	{
		gCost = startingCell.gCost + DIAGONAL_COST;
	}

	return gCost;
}

function GetLowestFIndex()
{
	var index = 0;
	for (var i = 0; i < openList.length; i++)
	{
		if(openList[i].gCost + openList[i].hCost <
		   openList[index].gCost + openList[index].hCost && openList[i].type != "blocked")
		{
			index = i;
		}
	}

	return index;
}

function GetLowestFIndex()
{
	var index = 0;
	for (var i = 0; i < openList.length; i++)
	{
		if(openList[i].gCost + openList[i].hCost <
		   openList[index].gCost + openList[index].hCost)
		{
			index = i;
		}
	}

	return index;
}

function SetGrid()
{
	TOTALCOST = 0;
	for(var i = 0; i < gridHeight; i++)
	{
		for (var j = 0; j < gridWidth; j++)
		{
			var cell = cells[i][j];

			cell.gCost = 0;
			cell.fCost = 0;
			cell.hCost = 0;
			cell.parent = null;

			if(cell.type == "start")
			{
				startCell = cell;
			}
			else if(cell.type == "end")
			{
				endCell = cell;
			}
			else if(cell.type == "passable")
			{
				PaintCell(cell.x,cell.y,"white");
			}
		}
	}
}

function Restart()
{
	startCell = null;
	endCell   = null;
	for(var i = 0; i < gridHeight; i++)
	{
		for (var j = 0; j < gridWidth; j++)
		{
			var cell = cells[i][j];

			cell.gCost = 0;
			cell.fCost = 0;
			cell.hCost = 0;
			cell.parent = null;
			cell.type = "passable";
			PaintCell(cell.x,cell.y,"white");
		}
	}
}

function IsInArray(cell,cellsToSearch)
{
	for(var i = 0; i < cellsToSearch.length; i++)
	{
		array_cell = cellsToSearch[i];
		if(array_cell == cell)
		{
			return true;
		}
	}

	return false;
}

function GetIndex(cell)
{
	for(var i = 0; i < openList.length; i++)
	{
		if(openList[i] == cell)
		{
			return i;
		}
	}

	return -1;
}

function Search()
{
	SetGrid();
	openList = [];
	closedList = [];

	startCell.gCost = 0;
	startCell.hCost = GetHCost(startCell);
	startCell.fCost = startCell.gCost + startCell.hCost;

	openList.push(startCell);
	while(openList.length > 0)
	{
		var lowCellIndex = GetLowestFIndex();
		var currentCell = openList[lowCellIndex];

		if(currentCell == endCell)
		{
			var current = currentCell.parent;
			path = [];

			while(current != startCell)
			{
				path.push(current);
				current = current.parent;
			}
			return path.reverse();
		}

		openList.splice(lowCellIndex,1);
		closedList.push(currentCell);

		var neighbors = GetNeighbors(currentCell);

		for(var i = 0; i < neighbors.length; i++)
		{	
			var neighbor = neighbors[i];
			neighbor.gCost = GetGCost(currentCell,neighbor);
			neighbor.hCost = GetHCost(neighbor);
			neighbor.fCost = neighbor.gCost + neighbor.fCost;

			if(neighbor.type == "blocked" || IsInArray(neighbor,closedList))
			{
				continue;
			}

			if(IsInArray(neighbor,openList) && currentCell.gCost < neighbor.gCost)
			{
				openList.splice(GetIndex(neighbor),1);
			}
			
			if(!IsInArray(neighbor,openList) && !IsInArray(neighbor,closedList))
			{
				neighbor.gCost = currentCell.gCost;
				neighbor.fCost = neighbor.gCost + neighbor.hCost;
				neighbor.parent = currentCell;
				openList.push(neighbor);

				if(neighbor.type == "passable")
				{
					PaintCell(neighbor.x, neighbor.y,"#A9E2F3");
				}
			}
		}
		TOTALCOST += currentCell.fCost;
	}
	return [];
}

function GetPath()
{
	path = Search();

	if(path.length === 0)
	{
		alert("Path not found!");
	}
	else
	{
		for(var i = 0; i < path.length; i++)
		{
			PaintCell(path[i].x,path[i].y,"#81F781");
		}
		alert("Movement cost: " + TOTALCOST);
	}
}