
$("button[name='start']").click(function(){

	//getting need variables
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

	// sort lists with bubbleSort
	for(var i = 0; i<lists.length; i++){
			timeStart = performance.now();
			sortedBubble.push(bubbleSort(lists[i]));
			timeEnd = performance.now();
			timesBubble.push(timeEnd - timeStart);
		}

	// sort lists with sortByFindingSmallest
	for(var i = 0; i<lists.length; i++){
			timeStart = performance.now();
			sortedSmallest.push(sortByFindingSmallest(lists[i]));
			timeEnd = performance.now();
			timesSmallest.push(timeEnd - timeStart);
		}
	
	
	// write to log
	$("p[class='log']").append("<br><p> Lists sorted by BubbleSort:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> List " + (i+1) + ": " 
			+ sortedBubble[i] +" t = " + timesBubble[i] + "</p>");
	}

	// write to log
	$("p[class='log']").append("<br><p> Lists sorted by FindSmallest:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> List " + (i+1) + ": " 
			+ sortedSmallest[i] +" t = " + timesSmallest[i] + "</p>");
	}

	// write to table
	//alert(Math.max.apply(Math, [2,3,4,5,2,]));
	//alert(Math.min.apply(Math, [2,3,4,5,2,]));
	//alert(average([2,9,1,0,0,0]));


});


function sorter(alg, list){}

function average(list){
	sum = 0;
	for(e in list){
		console.log(list[e]);
		sum = sum + list[e];
	}
	return sum/list.length;
}