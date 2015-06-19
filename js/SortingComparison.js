function algorithm(name, alg){
	this.name = name;
	this.alg = alg;
	this.sortedLists = [];
	this.sortingTimes = [];
	this.slowestTime = 0;
	this.fastestTime = 0;
	this.averageTime = 0;
}


function selectionAlgorithm(listOrig){
	var list = listOrig.slice();
	var orderedList = [];

	while (list.length > 0){
		var smallest = list[0];
		var smallestIndex = 0;
		for(var i = 0; i < list.length; i++){
			if (smallest > list[i]){
				smallest = list[i];
				smallestIndex = i;
			}
		}

		// removes 1 from position smallestIndex
		// and pushes that to orderedList
		orderedList.push(list.splice(smallestIndex, 1));
	}

	return orderedList;
}

function bubbleSort(listOrig){
	var list = listOrig.slice();
	var unsorted = true;
	var tmp = 0;
    var noChanges = true;
	while (unsorted) {
		noChanges = true;
		for(var i = 0; i < list.length-1; i++){
			if (list[i] > list[i+1]){
				tmp = list[i];
				list[i] = list[i+1];
				list[i+1] = tmp;
				noChanges = false;
			}
		}
		if (noChanges){
			unsorted = false;
		}
	}
	return list;
}


function createList(numberOfElements, smallestElement, largestElement){
	var list = []
	for(var i = 0; i < numberOfElements; i++){
		list.push(Math.floor((Math.random()*(largestElement+1-smallestElement)+smallestElement)))
	}
	return list;
}


function createLists(numberOfLists,numberOfElements, smallestElement, largestElement){
	lists = []
	for(var i = 0; i < numberOfLists; i++){
		lists.push(createList(numberOfElements, smallestElement, largestElement));
	}
	return lists
}


// create instances of algorithms
var algsList = []
algsList.push(new algorithm("selectionAlgorithm", selectionAlgorithm));
algsList.push(new algorithm("bubbleSort", bubbleSort));




var list = [6,4,3,2,4,3,3,4,5,5,5,5,6,2,1,3,4,7,9,1,9,3,7,7,1,2,3,3,3,9,
			8,5,8,3,5,2,6,3,3,2,6,7,4,4,2,2,1,3,3,2,5,6,7,3,9,8,4,5,6,3,
			2,4,3,5,3,6,3,6,3,6,3,6,3,7,9,4,2,1,4,5,6,3,1,3,5,3,5,6,7,2,
			9,9,6,3,5,2,6,4,6,7,3,2,5,6,8,4,2,5,6,7,3,2,5,7,8,4,2,5,6,7,
			1,2,4,7,6,3,6,8,4,8,3,9,3,6,2,6,7,3,6,7,3,1,2,3,6,3,7,9,4,2];
