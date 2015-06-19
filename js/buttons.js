
$("button[name='start']").click(function(){

	//getting required variables
	var numberOfLists = parseInt($("#range1").text());
	var numberOfElements = parseInt($("#range2").text());
	var smallestElement = parseInt($("#range3").text());
	var largestElement = parseInt($("#range4").text());

	// create lists that need to be sorted
	var lists = createLists(numberOfLists,numberOfElements, smallestElement, largestElement);

	var sortedBubble = [];
	var sortedSmallest = [];

	var timesBubble = [];
	var timesSmallest = [];

	var timeStart = 0;
	var timeEnd = 0;

	var results = [];

	// prints lists that need to be sorted
	$("p[class='log']").html("<p>Created lists:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> List " + (i+1) + ": " + lists[i] +"</p>");
	}

	// sort lists with algs
	for(var iAlg = 0; iAlg < algsList.length;iAlg++){
		for(var i = 0; i<lists.length; i++){
			timeStart = performance.now();
			algsList[iAlg].sortedLists.push(algsList[iAlg].alg(lists[i]));
			timeEnd = performance.now();
			algsList[iAlg].sortingTimes.push(timeEnd - timeStart);
		}
	}

	
	// write to log
	for(var iAlg = 0; iAlg < algsList.length;iAlg++){
		$("p[class='log']").append("<br><p> Lists sorted by "+ algsList[iAlg].name +"</p>");
		for(var i = 0; i<lists.length; i++){
			$("p[class='log']").append("<p> List " + (i+1) + ": " 
				+ algsList[iAlg].sortedLists[i] +" t = " + algsList[iAlg].sortingTimes[i] + "</p>");
		}
	}


	// calculate min, max and average times:
	for(var iAlg = 0; iAlg < algsList.length;iAlg++){
		algsList[iAlg].fastestTime = Math.min.apply(Math, algsList[iAlg].sortingTimes);
		algsList[iAlg].slowestTime = Math.max.apply(Math, algsList[iAlg].sortingTimes);
		algsList[iAlg].averageTime = average(algsList[iAlg].sortingTimes);
	}

	bubbleSortObjectsByAvgTime(algsList);
	
	// add values to results table
	for(var iAlg = 0; iAlg < algsList.length;iAlg++){
		// rank (1., 2.,..)
		$( "td:eq( "+ iAlg*5 +" )" ).html( iAlg+1);
		// name 
		$( "td:eq( "+ (iAlg*5+1)+" )" ).html( algsList[iAlg].name);
		// fastest
		$( "td:eq( "+ (iAlg*5+2)+" )" ).html( algsList[iAlg].fastestTime);
		// slowest
		$( "td:eq( "+ (iAlg*5+3)+" )" ).html( algsList[iAlg].slowestTime);
		// average
		$( "td:eq( "+ (iAlg*5+4)+" )" ).html( algsList[iAlg].averageTime);
	}

});


function average(list){
	sum = 0;
	for(e in list){
		sum = sum + list[e];
	}
	return sum/list.length;
}


function bubbleSortObjectsByAvgTime(list){
	var unsorted = true;
	var tmp = 0;
    var noChanges = true;
	while (unsorted) {
		noChanges = true;
		for(var i = 0; i < list.length-1; i++){
			if (list[i].averageTime > list[i+1].averageTime){
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
}
