

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
	 
	    return qsort(left).concat(pivot, qsort(right));
	},
	/*** end of all the sorting algorithms ***/

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

// 
var sliderModel = {



};


// 
var generalModel = {

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
			lists.push(generalModel.createList(numberOfElements, smallestElement, largestElement));
		}
		return lists;
	}

};




/* ====== Octopus ====== */

var octopus = {

    init: function() {
    	algModel.init();
    	viewButtons.init();
    },

    start: function() {

    	// Get values from sliders
    	var numberOfLists = viewSliders.getNumberOfLists();
    	var numberOfElements = viewSliders.getNumberOfElements();
    	var smallestElement = viewSliders.getSmallestElement();
    	var largestElement = viewSliders.getLargestElement();

    	// Create unsorted lists
		generalModel.unsortedLists = generalModel.createLists(numberOfLists,numberOfElements,
			smallestElement, largestElement);

		viewLog.printLists(generalModel.unsortedLists);


    },

    getUnsortedLists: function() {
        return generalModel.unsortedLists;
    },


};


/* ====== View ====== */

var viewSliders = {

    init: function() {
    
    },

    render: function() {
      
    },

    // returns how many lists will be created
    getNumberOfLists: function() {
		return parseInt($("#range1").text());
    },

	// returns how many elements will be in a list
    getNumberOfElements: function() {
		return parseInt($("#range2").text());
    },

	// returns the smallest possible value in a list
    getSmallestElement: function() {
		return parseInt($("#range3").text());
    },

	// returns the largest possible value in a list
    getLargestElement: function() {
		return parseInt($("#range4").text());
    }

};

var viewButtons = {

    init: function() {
    	
    	// Add listeners

    	// Start-button
    	$("button[name='start']").click(function(){

    		// Disable start after being pressed
			$("button[name='start']").prop('disabled', true);

			// tell octopus to start
			octopus.start();



			

/*
			var timeStart = 0;
			var timeEnd = 0;



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
			} */

		});

    },

    render: function() {
      
    }
};

var viewTable = {

    init: function() {
    
    },

    render: function() {
      
    }
};


var viewLog = {

	// prints lists that need to be sorted
    printLists: function(lists) {

		$("p[class='log']").html("<p>Created lists:</p>");
		for(var i = 0; i<lists.length; i++){
			$("p[class='log']").append("<p> List " + (i+1) + ": " + lists[i] +"</p>");
		}
      
    }
};


octopus.init();
/*
alert(algModel.algsList[0].name);

alert(algModel.algsList[0].alg([3,4,1]));*/