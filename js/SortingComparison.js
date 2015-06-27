
/* ====== Model ====== */

// All algorithm related
var algModel = {

	// All Algorithm objects are stored here
	algsList: [],

	// Algorithm object
	Algorithm: function(name, alg){
		this.name = name;
		this.alg = alg;
		this.sortedLists = [];
		this.sortingTimes = [];
		this.slowestTime = 0;
		this.fastestTime = 0;
		this.averageTime = 0;
	},

	// returns initial algorithms to be used
	getInitialAlgList: function(){
		return [

			["selectionAlgorithm", algModel.selectionAlgorithm],

			["bubbleSort", algModel.bubbleSort],

			["jsSort", algModel.jsSort],

			["quickSort", algModel.quickSort],

	];},

	/*** All the sorting algorithms ***/

	selectionAlgorithm: function(listOrig){

		var list = listOrig.slice();
		var orderedList = [];

		while (list.length > 0) {
			var smallest = list[0];
			var smallestIndex = 0;
			for(var i = 0; i < list.length; i++){
				if (smallest > list[i]){
					smallest = list[i];
					smallestIndex = i;
				}
			}

			// removes 1 from position smallestIndex and push it
			orderedList.push(list.splice(smallestIndex, 1));
		}

		return orderedList;
	},

	bubbleSort: function(listOrig){		
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
	},

	jsSort: function(listOrig) {
		var list = listOrig.slice();
		list.sort();
		return list;
	},

	quickSort: function(listOrig) {
		var a = listOrig;
	    if (a.length == 0) return [];
	 
	    var left = [], right = [], pivot = a[0];
	 
	    for (var i = 1; i < a.length; i++) {
	        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
	    }
	 
	    return algModel.quickSort(left).concat(pivot, algModel.quickSort(right));
	},
	/*** end of all the sorting algorithms ***/

	// clear algsList values
	clearAlglist: function(algsList) {
		for(var iAlg = 0; iAlg < algsList.length; iAlg++){
			algsList[iAlg].sortedLists = [];
			algsList[iAlg].sortingTimes = [];
			algsList[iAlg].slowestTime = 0;
			algsList[iAlg].fastestTime = 0;
			algsList[iAlg].averageTime = 0;
		}
	},

	// init
	init: function(){

		// create instances of algorithms
		var initialAlgorithmList = algModel.getInitialAlgList();
		algModel.algsList.push(new algModel.Algorithm("selec", algModel.selectionAlgorithm));
		for (var i = 0; i < initialAlgorithmList.length; i++){
			algModel.algsList.push(new algModel.Algorithm(
			 initialAlgorithmList[i][0], // name
			 initialAlgorithmList[i][1]  // algorithm
			));

		}

	}

};

// Things related to sliders
var sliderModel = {

	// Slider default values for ranges 1,2,3,4
	rangeMin:  [1, 2, 0, 1],
	rangeMax: [500, 1000, 9999, 10000],
	rangeValue: [10, 20, 0, 500],

};


// List related things
var listModel = {

	unsortedLists: [],

	createList: function(numberOfElements, smallestElement, largestElement) {
		var list = []
		for(var i = 0; i < numberOfElements; i++){
			list.push(Math.floor((Math.random()*(largestElement+1-smallestElement)+smallestElement)))
		}
		return list;
	},

	createLists: function(numberOfLists,numberOfElements, smallestElement, largestElement){
		lists = []
		for(var i = 0; i < numberOfLists; i++){
			lists.push(listModel.createList(numberOfElements, smallestElement, largestElement));
		}
		return lists;
	},

	// sort lists and record performance
	sortLists: function(algsList, unsortedLists){
		var timeStart = 0;
		var timeEnd = 0;

		// sort lists with algs
		for(var iAlg = 0; iAlg < algsList.length;iAlg++){
			for(var i = 0; i < unsortedLists.length; i++){
				timeStart = performance.now();
				algsList[iAlg].sortedLists.push(algsList[iAlg].alg(unsortedLists[i]));
				timeEnd = performance.now();
				algsList[iAlg].sortingTimes.push(timeEnd - timeStart);
			}
		}
	},

	// Calculate avg time
	averageTime: function(list){
		sum = 0;
		for(e in list){
			sum = sum + list[e];
		}
		return sum/list.length;
	},

	// Calculate min, max and average times:
	calculateTimes: function(algsList){
		for(var iAlg = 0; iAlg < algsList.length;iAlg++){
			algsList[iAlg].fastestTime = Math.min.apply(Math, algsList[iAlg].sortingTimes);
			algsList[iAlg].slowestTime = Math.max.apply(Math, algsList[iAlg].sortingTimes);
			algsList[iAlg].averageTime = listModel.averageTime(algsList[iAlg].sortingTimes);
		}
	},

	// Order algList by average time using bubbleSort.
	orderListByAverage: function(algsList){
		var unsorted = true;
		var tmp = 0;
	    var noChanges = true;
		while (unsorted) {
			noChanges = true;
			for(var i = 0; i < algsList.length-1; i++){
				if (algsList[i].averageTime > algsList[i+1].averageTime){
					tmp = algsList[i];
					algsList[i] = algsList[i+1];
					algsList[i+1] = tmp;
					noChanges = false;
				}
			}
			if (noChanges){
				unsorted = false;
			}
		}
	}
	
};


/* ====== Octopus ====== */

var octopus = {

    init: function() {
    	algModel.init();
    	viewSliders.init();
    	viewButtons.init();
    },

    start: function() {

    	// Get values from sliders
    	var numberOfLists = viewSliders.getNumberOfLists();
    	var numberOfElements = viewSliders.getNumberOfElements();
    	var smallestElement = viewSliders.getSmallestElement();
    	var largestElement = viewSliders.getLargestElement();

    	// Create unsorted lists
		listModel.unsortedLists = listModel.createLists(numberOfLists,numberOfElements,
			smallestElement, largestElement);

		// Write unsorted lists to log
		viewLog.printUnsortedLists(listModel.unsortedLists);

		// Sort lists
		listModel.sortLists(algModel.algsList, listModel.unsortedLists);

		// Write sorted lists to log
		viewLog.printSortedListsAndTimes(algModel.algsList);

		// Calcluate min, max, avg times
		listModel.calculateTimes(algModel.algsList);

		// Order algs by avg time
		listModel.orderListByAverage(algModel.algsList);

		// Print results to the table
		viewTable.printValuesToTable(algModel.algsList);

    },

 	// Restores starting state
    clear: function(){
    	algModel.clearAlglist(algModel.algsList);
    	viewLog.clear();
    	viewTable.clear();
    },

    // Restore sliders to default
    setSlidersToDefault: function() {
    	viewSliders.setSliderValuesToDefault(sliderModel.rangeValue);
    },

   // Return unsorted lists
    getUnsortedLists: function() {
        return listModel.unsortedLists;
    }

};


/* ====== View ====== */

var viewSliders = {

    init: function() {

    	// Create on change listeners for sliders
    	for (var i = 1; i < 5; i++){
	   		$("#slider"+i).change(function(ind){
	   			return function(){
	   				$("#range"+ind).html($("#slider"+ind).val());
	   			};
	   		}(i));
   		}

   		/*** Set listeners to make sure min <= max ***/
   		    
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

    
    },

    // Returns how many lists will be created
    getNumberOfLists: function() {
		return parseInt($("#range1").text());
    },

	// Returns how many elements will be in a list
    getNumberOfElements: function() {
		return parseInt($("#range2").text());
    },

	// Returns the smallest possible value in a list
    getSmallestElement: function() {
		return parseInt($("#range3").text());
    },

	// Returns the largest possible value in a list
    getLargestElement: function() {
		return parseInt($("#range4").text());
    },

    setSliderValuesToDefault: function(rangeValue) {
    	for(var i = 0; i < 4; i++){
		     document.getElementById("slider"+(i+1)).value = rangeValue[i];
		     document.getElementById("range"+(i+1)).innerHTML = rangeValue[i];
	     }
	}

};

var viewButtons = {

    init: function() {

    	// Enable start button (to avoid a rare bug where start is disabled)
    	$("button[name='start']").prop('disabled', false);
    	
    	/*** Add listeners ***/

    	// Start button
    	$("button[name='start']").click(function(){

    		// Disable start after being pressed
			$("button[name='start']").prop('disabled', true);

			// tell octopus to start
			octopus.start();

		});

    	// Clear button
		$("button[name='clear']").click(function(){

			// Clears values
			octopus.clear();
			
			// Enables start
			$("button[name='start']").prop('disabled', false);
		});


		// Default sliders button
		$("button[name='defaults']").click(function(){

			octopus.setSlidersToDefault();
     
		});

		/*** End of add listeners ***/

    },

};

var viewTable = {


	printValuesToTable: function(algsList) {

		// Add values to results table
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
    },

    // Clear table
    clear: function(){
		$("td").html("");
    }
};


var viewLog = {

	// Prints unsorted lists
    printUnsortedLists: function(lists) {

		$("p[class='log']").html("<p>Created lists:</p>");
		for(var i = 0; i<lists.length; i++){
			$("p[class='log']").append("<p> List " + (i+1) + ": " + lists[i] +"</p>");
		}
      
    },


    // Prints sorted lists and sorting times to the log
    printSortedListsAndTimes: function(algsList){

		for(var iAlg = 0; iAlg < algsList.length;iAlg++){
			$("p[class='log']").append("<br><p> Lists sorted by "+ algsList[iAlg].name +"</p>");
			for(var i = 0; i<lists.length; i++){
				$("p[class='log']").append("<p> List " + (i+1) + ": " 
					+ algsList[iAlg].sortedLists[i] +" t = " + algsList[iAlg].sortingTimes[i] + "</p>");
			}
		}
	},

	// clears printed log
	clear: function(){
		$("p[class='log']").html("");	
	}

};


octopus.init();
