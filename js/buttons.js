
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

	// prints lists that need to be sorted
	$("p[class='log']").html("<p>Created lists:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> List " + (i+1) + ": " + lists[i] +"</p>");
	}

	// sort lists with bubbleSort
	for(var i = 0; i<lists.length; i++){
			sortedBubble.push(bubbleSort(lists[i]));
		}

	// sort lists with sortByFindingSmallest
	for(var i = 0; i<lists.length; i++){
			sortedSmallest.push(sortByFindingSmallest(lists[i]));
		}
	
	$("p[class='log']").append("<br><p> Lists sorted by BubbleSort:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> List " + (i+1) + ": " + sortedBubble[i] +"</p>");
	}

	$("p[class='log']").append("<br><p> Lists sorted by FindSmallest:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> List " + (i+1) + ": " + sortedSmallest[i] +"</p>");
	}

});