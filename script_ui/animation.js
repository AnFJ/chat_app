function appearDiv(target)
{
	var targetDiv=document.getElementById(target);
	targetDiv.style.display="block";
	targetDiv.style.animationName="showDiv";
	targetDiv.style.animationDuration="0.3s";
	targetDiv.style.animationTimingFunction="ease-in";
	 //alert("ok");
}
function disappearDiv(target)
{
	var targetDiv=document.getElementById(target);

	targetDiv.style.animationName="notShowDiv";
	targetDiv.style.animationDuration="0.3s";
	targetDiv.style.animationTimingFunction="ease-in";
	//targetDiv.style.display="none";
	setTimeout(function(){
		targetDiv.style.display="none";	
	},290);
}