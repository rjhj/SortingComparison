function showValue(newValue, sliderNumber)
{
  document.getElementById("range"+sliderNumber).innerHTML=newValue;
  //if max <= min --> max = min+1
  //if min >= max --> min = max-1
}