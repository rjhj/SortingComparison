
$("button[name='start']").click(function(){
	var numberOfLists = parseInt($("#range1").text());
	var numberOfElements = parseInt($("#range2").text());
	var smallestElement = parseInt($("#range3").text());
	var largestElement = parseInt($("#range4").text());

	lists = createLists(numberOfLists,numberOfElements, smallestElement, largestElement);

	$("p[class='log']").html("<p>Created lists:</p>");
	for(var i = 0; i<lists.length; i++){
		$("p[class='log']").append("<p> " + i + ". " + lists[i] +"</p>");
	}
});