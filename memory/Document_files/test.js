window.addEventListener("load",function(){
	var cardDeck = [
	{id:1,name:"card1",image:"./images/dog.png"},
	{id:2,name:"card1",image:"./images/dog.png"},
	{id:3,name:"card2",image:"./images/dog2.png"},
	{id:4,name:"card2",image:"./images/dog2.png"},
	{id:5,name:"card3",image:"./images/dog3.png"},
	{id:6,name:"card3",image:"./images/dog3.png"},
	{id:7,name:"card4",image:"./images/dog4.png"},
	{id:8,name:"card4",image:"./images/dog4.png"}];
	var gameTable = document.getElementById("table"); 


function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
cardDeck = shuffle(cardDeck);
function addClassToElement(classN,element){
	if(element != undefined && !element.classList.contains(classN)){
		element.classList.add(classN);
	}
		
}
function removeClassFromElement(classN,element){

		if( element != undefined && element.classList.contains(classN)){
			element.classList.remove(classN);
		}
		
}
function elementHasClassName(classN,element){
		if( element != undefined && element.classList.contains(classN)){
			return true;
		}
		return false;
}
function addDataAttributeToElement(dataKey,dataValue,element){
	
	string = dataKey.toString();
	element.setAttribute("data-" + dataKey ,dataValue);
		
}
function getCardImage(dataValue){
	src = cardDeck.filter((c)=>c.id == dataValue)[0];
	image = new Image();
	console.log(dataValue);
	image.src = src.image;
	return image;
}
function putCardsOnStartPosition(){
	cardDeck.forEach((card)=>{
		var cardEl  = createCard(card);
		cardEl.addEventListener("dragstart",(e)=>{ 
			var dragIcon = document.createElement('img');
            dragIcon.src = 'Transparent.gif';
            dragIcon.height = 100;
            dragIcon.width = 100;
            e.dataTransfer.setDragImage(dragIcon, -10, -10);
        },false);
        cardEl.addEventListener("dblclick",function(e){
        if(elementHasClassName("show",e.target)){
        	 removeClassFromElement("show",e.target);
        }else{
        	addClassToElement("show",e.target);
        }
	    
	    e.target.style.transform += "rotate3d(1,0,0,-180deg)";        

        });

		cardEl.addEventListener("drag",function(e){
			if(e.clientX == 0 || e.clientY == 0){
				return false;
			}
			addClassToElement("no-trans",e.target);
			e.target.style.left = e.clientX + "px" ;
			e.target.style.top = e.clientY + "px" ;
		});
		cardEl.addEventListener("dragend",function(e){
			removeClassFromElement("no-trans",e.target)
		},false)
		
		table.addEventListener("dragenter",function(e){e.preventDefault()},false)
		table.addEventListener("drop",(e)=>{e.preventDefault()} , false)
	});
}

putCardsOnStartPosition();
function pausecomp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}
function randNumberBetween(min,max){
	return Math.floor(Math.random() * (max - min))
}
function createCard(card){
	var cardEl  = document.createElement("div");

	addClassToElement("card",cardEl);
	addDataAttributeToElement("card-id",card.id,cardEl);
	cardEl.setAttribute("draggable",true)
	cardEl.style.left =  "40%";
	cardEl.style.top =  "40%";
	table.appendChild(cardEl);
	var front = document.createElement("div");
		addClassToElement("front",front);
		front.appendChild(getCardImage(cardEl.dataset.cardId)); 
	var back = document.createElement("div");
		addClassToElement("back",back);
		

		 
	cardEl.appendChild(front);
	cardEl.appendChild(back);

	setTimeout(function(){
	cardEl.style.transform = "rotate("+randNumberBetween(1,100) + "deg)";
	cardEl.style.left = Math.floor(Math.random() * (80 - 1)) + "%";
	cardEl.style.right = Math.floor(Math.random() * (80 - 1)) + "%";
	cardEl.style.top = Math.floor(Math.random() * (80 - 1)) + "%";
	cardEl.style.bottom = Math.floor(Math.random() * (80 - 1)) + "%";
	},randNumberBetween(50,1000))
	



	return cardEl;
}


});