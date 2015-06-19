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