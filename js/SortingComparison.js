
function sortByFindingSmallest(listOrig){
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
				noChanges = false
			}
		}
		if (noChanges){
			unsorted = false;
		}
	}
	return list;
}


var list = [6,4,3,2,4,3,3,4,5,5,5,3,2,5,6,7,3,9,8,4,5,6,3,2,4,3,5,3,6,3,6,3,6,3,6,3,7,9,4,2,1,4,5,6,3,1];

//alert(sortByFindingSmallest(list));

//alert(bubbleSort(list));