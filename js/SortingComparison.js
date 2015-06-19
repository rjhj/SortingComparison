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

function jsSort(listOrig) {
	var list = listOrig.slice();
	list.sort();
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
var algsList = [];
algsList.push(new algorithm("selectionAlgorithm", selectionAlgorithm));
algsList.push(new algorithm("bubbleSort", bubbleSort));
algsList.push(new algorithm("jsSort", jsSort));


