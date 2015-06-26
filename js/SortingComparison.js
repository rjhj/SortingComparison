var rangeMin = [1, 2, 0, 1];
var rangeMax = [500, 1000, 9999, 10000];
var rangeValue = [10, 20, 0, 500];


function showValue(newValue, sliderNumber)
{
  document.getElementById("range"+sliderNumber).innerHTML=newValue;

}


$( document ).ready(function() {

        $("button[name='start']").prop('disabled', false);
 
        //if max >= min --> max = min+1
        $("#slider3").change(function(){
        var min = parseInt($("#range3").text());
        var max = parseInt($("#range4").text());
        if (min >= max){
          document.getElementById("slider4").value = min+1;
          document.getElementById("range4").innerHTML = min+1;
        }
         });

        //if min >= max --> min = max-1
        $("#slider4").change(function(){
        var min = parseInt($("#range3").text());
        var max = parseInt($("#range4").text());
        if (max <= min){
          document.getElementById("slider3").value = max-1;
          document.getElementById("range3").innerHTML = max-1;
        }
      });

 
});


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

function qsort(listOrig) {
	var a = listOrig;
    if (a.length == 0) return [];
 
    var left = [], right = [], pivot = a[0];
 
    for (var i = 1; i < a.length; i++) {
        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
    }
 
    return qsort(left).concat(pivot, qsort(right));
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
algsList.push(new algorithm("quickSort", qsort));


$("button[name='clear']").click(function(){
	
	// clear algsList instances
	for(var iAlg = 0; iAlg < algsList.length;iAlg++){
		algsList[iAlg].sortedLists = [];
		algsList[iAlg].sortingTimes = [];
		algsList[iAlg].slowestTime = 0;
		algsList[iAlg].fastestTime = 0;
		algsList[iAlg].averageTime = 0;
	}

	// clear log
	$("p[class='log']").html("");

	// clear table
	$("td").html("");
	
	$("button[name='start']").prop('disabled', false);
});

$("button[name='defaults']").click(function(){
	
	// slider default values
	for(var i = 0; i < 4; i++){
     document.getElementById("slider"+(i+1)).value = rangeValue[i];
     document.getElementById("range"+(i+1)).innerHTML = rangeValue[i];
     }
     
 

});


$("button[name='start']").click(function(){

	$("button[name='start']").prop('disabled', true);
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
