window.addEventListener("load",function(){
	var cardDeck = [
	{id:1,name:"card1",image:"./images/dog.png"},
	{id:2,name:"card1",image:"./images/dog.png"},
	{id:3,name:"card2",image:"./images/dog2.jpg"},
	{id:4,name:"card2",image:"./images/dog2.jpg"},
	{id:5,name:"card3",image:"./images/dog3.jpg"},
	{id:6,name:"card3",image:"./images/dog3.jpg"},
	{id:7,name:"card4",image:"./images/dog4.jpg"},
	{id:8,name:"card4",image:"./images/dog4.jpg"}];
	var gameTable = document.getElementById("table"); 
	var scoreBoard = document.getElementById("score-board");
	var cardsVisible = [];


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
function addClassToElements(classN,elements){
	for (var i = 0; i <= elements.length; i++) {
		addClassToElement(classN,elements[i])
	};
}
function removeClassFromElement(classN,element){

		if( element != undefined && element.classList.contains(classN)){
			element.classList.remove(classN);
		}
		
}
function removeClassFromElements(classN , elements = null){
	if(elements == null){
		elements = document.getElementsByClassName(classN);
	}
	var length = elements.length;
	for (var i = 0; i <= length; i++) {
		removeClassFromElement(classN,elements[0]);
	};
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
function getCardImageSrc(dataValue){
	return cardDeck.filter((c)=>c.id == dataValue)[0].image;
}
function createCardImage(dataValue){
	src = getCardImageSrc(dataValue);
	image = new Image();

	image.src = src;
	return image;
}
function createDragimage(e){ 
	var dragIcon = document.createElement('img');
    dragIcon.src = 'Transparent.gif';
    dragIcon.height = 100;
    dragIcon.width = 100;
    e.dataTransfer.setDragImage(dragIcon, -10, -10);
}
function toggleClass(classN,element){
        if(elementHasClassName(classN,element)){
        	 removeClassFromElement(classN,element);
        }else{
        	addClassToElement(classN,element);
        }   
}
function followMouse(e){
	if(e.clientX == 0 || e.clientY == 0){
				return false;
	}
	addClassToElement("no-trans",e.target);
	e.target.style.left = e.clientX + "px" ;
	e.target.style.top = e.clientY + "px" ;
}
function cardIsShowing(element){
	return elementHasClassName("show",element);
}
function addToDraws(){

	draws = scoreBoard.children[0].innerHTML;
	draws = parseInt(draws.match("[0-9]{1,}")[0]);
	scoreBoard.children[0].innerHTML = "Draws:" + (draws + 1); 
}
function numberOfCardsShowing(){
 return document.getElementsByClassName("card show").length;
}
function cardsShowingAreTheSame(){
	cardsShowing = document.getElementsByClassName("card show");
		if(getCardImageSrc(cardsShowing[0].dataset.cardId) == getCardImageSrc(cardsShowing[1].dataset.cardId)){
			return true;
		}
		
		return false;
}
function removeElementsFromDoc(elements){
	while(elements.length != 0){
		elements[0].parentNode.removeChild(elements[0]);
	}

}
function putCardsOnStartPosition(){
	addClassToElement("show",scoreBoard);
	cardDeck.forEach((card)=>{
		var cardEl  = createCard(card);
		cardEl.addEventListener("dragstart",createDragimage,false);
        
        cardEl.addEventListener("dblclick",function(e){
        	if( numberOfCardsShowing() == 2){
        		return false;
        	}
        	
        	if( !cardIsShowing(e.target)){
        		addToDraws();
        		toggleClass("show",e.target);
        	}
     
        	if(numberOfCardsShowing() == 2){
        		if(cardsShowingAreTheSame()){
        			var showing = document.getElementsByClassName("card show");
        			setTimeout(function(){
        				setTimeout(function(){
        					removeElementsFromDoc(showing);
        					if(document.getElementsByClassName("card").length == 0){
        						alert("the game is over");
        					}
        				},2000);
        				addClassToElements("implode",showing);
        			},2000)
        			addClassToElements("success",showing);
        		}else{
        			setTimeout(function(){

        				removeClassFromElements("show",showing);
        				removeClassFromElements("failure");
        			},2000)
        			var showing = document.getElementsByClassName("card show");
        			addClassToElements("failure",showing);
        			
        		}
        	}

        },false);

		cardEl.addEventListener("drag",followMouse,false);
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
		front.appendChild(createCardImage(cardEl.dataset.cardId)); 
	var back = document.createElement("div");
		addClassToElement("back",back);
		

		 
	cardEl.appendChild(front);
	cardEl.appendChild(back);

	setTimeout(function(){
	cardEl.style.transform = "rotate("+randNumberBetween(1,360) + "deg)";
	cardEl.style.left = randNumberBetween(1,90) + "%";

	cardEl.style.top = randNumberBetween(1,90) + "%";

	},randNumberBetween(50,1000))
	



	return cardEl;
}


});