//hämtar alla element som ska användas

let callback = function(event) {

let canvas = document.getElementById("myCanvas");
let c = canvas.getContext('2d');

let menuButton = document.getElementById("bars");
let menu = document.getElementById("menu");

//hämter input 
let status = document.getElementById("status");
let inbox = document.getElementById('statusText'); 

//hämtar form-knappar
let C = document.getElementById("C");
let T = document.getElementById("T");
let R = document.getElementById("R");
    
let clear = document.getElementById("clear");   
    
//let select = document.getElementsByTagName('select')[0]; 
let writeColor = document.getElementById("writeColor"); 
let addButton = document.getElementById("addButton"); 
let colorPicker = document.getElementById("colorPicker");
let options = document.getElementById("options");
let breakButton = document.getElementById("break");
    


//********************************************
    
//har skapat 2 listor     
   let myDrawing = [];  
   let clickPositions = [];
   
  //gör att man kan lägga till en färg i färg-listan  
     addButton.addEventListener('click',function() {
      if ( writeColor.value.length ==7 && writeColor.value.charAt(0)=='#'){

          //skapar ett element som ska vara den nya färgen
            let colorInput = document.createElement('option');
          //pushar nya färgen till färg listan
            options.appendChild(colorInput);
          //hexadecimala värdet ska stå som namnet i färg listan
            colorInput.innerHTML=writeColor.value;
          //bakrundsfärgen av nya färgen, i färg listan
            colorInput.style.backgroundColor=writeColor.value;

            
          }
      
              });  
 
 //ansluter colorpicker och färglistan   
    options.addEventListener('click', function(){
        colorPicker.value = options.value;
    });
        
    
//css styling för menuKnappen
menuButton.style.border = "1px solid hotpink";
menuButton.style.padding = "10px";
menuButton.style.borderRadius = "8px";
menuButton.style.backgroundColor = "hotpink";
menuButton.style.color ="white";

//gör så att meny knappen visar menyn o sen gömmer den om man klickar på den igen + status-baren
let clickMenuButton = function () {

    if( menu.style.display == 'block' ){
      menu.style.display = 'none'; 
        inbox.style.display = 'none'; 
        
    }
    else {
      menu.style.display = "block";
     inbox.style.display = 'block';
    }
  
  
};
menuButton.addEventListener("click", clickMenuButton);


//*********************************************************
//gör så att det ska synas på vilken knapp man har klickat på
//och vad det ska stå i status-baren    
C.addEventListener('click', function(){
   C.disabled = true;
   T.disabled = false;
   R.disabled = false;
   circleClicked = true;
   triangleClicked = false;
   rectangleClicked = false;
   inbox.innerHTML=" Start by clicking on canvas to choose the center of your circle."
//tömmer click listan   
   clickPositions=[];
});

T.addEventListener('click', function(){
   C.disabled = false;
   T.disabled = true;
   R.disabled = false;
   circleClicked = false;
   triangleClicked = true;
   rectangleClicked = false;
   inbox.innerHTML = "Start by clicking on canvas to choose the first corner of your triangle."    
   clickPositions=[];
    
});

R.addEventListener('click', function(){
  C.disabled = false;
  T.disabled = false;
  R.disabled = true;
  circleClicked = false;
  triangleClicked = false;
  rectangleClicked = true;
  inbox.innerHTML= "Start by clicking on canvas to choose the upper-left corner of your rectangle."
  clickPositions=[];    
});
    
       
    
 

//hämtar positionerna på mus-klick 
canvas.addEventListener('click', function(event) {
    let x = event.clientX;
    let y = event.clientY;
    let coordinate = event.target.getBoundingClientRect();

    //gör så att det räknar ut koordinaterna på canvas bara 
    x -= coordinate.left;
    y -= coordinate.top;
    let xy = {x:x, y:y};
    clickPositions.push(xy);

console.log(clickPositions);

 
  //vad som händer när man klickar på triangel-knappen  
    if (triangleClicked) {
        if(clickPositions.length === 1) {
                inbox.innerHTML = "Choose your second corner."
            }
        else if (clickPositions.length === 2) {
                inbox.innerHTML = "Choose your third corner."
            }
        else if (clickPositions.length === 3){
            //på tredje klick skapas det en ny triangel
                let newTriangle = new Triangle (clickPositions[0].x, clickPositions[0].y, clickPositions[1].x, clickPositions[1].y, clickPositions[2].x, clickPositions[2].y);

                newTriangle.draw();
            
         //pushar up nya triangeln till myDrawing lista för att sedan använda den med JSON
                myDrawing.push(newTriangle);
                clickPositions=[];
                inbox.innerHTML = "You just drew a triangle! ;)"
                }
            
        }
    
      //vad som händer när man klickar på circel-knappen  

    else if (circleClicked) {

          if(clickPositions.length === 1) {
            inbox.innerHTML = "Choose your second point that will define the length of the radius."
            }
          else if (clickPositions.length === 2){
               
                let crclRadius = 
                Math.sqrt(((clickPositions[0].x - clickPositions[1].x)*(clickPositions[0].x - clickPositions[1].x))+
                ((clickPositions[0].y - clickPositions[1].y)*(clickPositions[0].y - clickPositions[1].y)));
                
                let newCircle = new Circle(clickPositions[0].x,clickPositions[0].y,crclRadius);
                newCircle.draw();
                myDrawing.push(newCircle);
                clickPositions=[];
                inbox.innerHTML = "You just drew a circle! ;)"
                }
          
    }
      //vad som händer när man klickar på rectangel-knappen  

    else if (rectangleClicked) {
            if (clickPositions.length === 1) {
                inbox.innerHTML = "Choose your second point that will be the lower-right corner."
            }
            else if (clickPositions.length === 2) {
                
                let newRectangle = new Rectangle(clickPositions[0].x,clickPositions[0].y,clickPositions[1].x,clickPositions[1].y);
                newRectangle.draw();
                myDrawing.push(newRectangle);
                clickPositions=[];
                inbox.innerHTML = "You just drew a rectangle! ;)"

            }
            
 }
});
           
    
    
//vad som ska stå i status-baren när man klickar på knapparna     
    let clickBreakButton = function () {
          clickPositions=[];
          inbox.innerHTML = "You have called off your drawing."
        
    }
    breakButton.addEventListener('click', clickBreakButton);
    
    
    let clickClearButton = function () {
        c.clearRect(0, 0, canvas.width, canvas.height);
        clickPositions=[];
        inbox.innerHTML = "Your canvas is clear."

    }
    
    clear.addEventListener('click', clickClearButton);

    
//*************************************************************  //exporterar våra nya object till JSON  
    let jasonButton = document.getElementById('jason');
let exportText = document.getElementById('export');
 
    
 jasonButton.addEventListener('click', function() {   

     let jason = JSON.stringify(myDrawing);
     exportText.innerHTML = jason;
 

 });


//koder från lab2    
//***************circle*******************************
function Circle (centerX, centerY, radius) {
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
        this.color = colorPicker.value;
		
        this.area = function() {
			return Math.PI *(this.radius * this.radius); // π * (radius*radius)
		};
		
		this.move = function(dx, dy) {
            this.centerX = this.centerX + dx; 
            this.centerY = this.centerY + dy;
            
        };
        
        this.points = function() {
        	
		     return [{x: this.centerX, y: this.centerY}];

		};

		this.distanceTo = function(otherCircle) {

			 var A = this.centerX - otherCircle.centerX;// x2-x1
			 var B = this.centerY - otherCircle.centerY;// y2-y1
			 var distanceC = Math.sqrt( A*A + B*B ); // radical of (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)
			
			distanceC = distanceC -this.radius - otherCircle.radius;// minus båda circlars radius
			
			if (distanceC<0) { //när circlarna överlappar ska vi returnera 0
			 return 0;
			 
			}
			else {   //annars returnerar vi avståndet 
			return distanceC; 
			}
		};
		
		
       this.boundingBox = function() {
       	
       let boundingRec = new Rectangle (this.centerX - this.radius, this.centerY + this.radius, this.centerX + this.radius, this.centerY - this.radius);
       return boundingRec;
       	
       	
       };
  //ny function som ritar ut figuren
        this.draw = function() {
            c.beginPath();
            c.strokeStyle = this.color;
            c.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
            c.stroke();
            clickPositions = [];
        };
}

//******************************triangle****************************************
function Triangle (x1, y1, x2, y2, x3, y3) {
	    
	    this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
        this.color = colorPicker.value;
		// http://www.mathopenref.com/coordtrianglearea.html
		this.area = function() {
			return Math.sqrt((this.x1*(this.y2-this.y3)+this.x2*(this.y3-this.y1)+this.x3*(this.y1-this.y2))/2*(this.x1*(this.y2-this.y3)+this.x2*(this.y3-this.y1)+this.x3*(this.y1-this.y2))/2);
		};
		
		this.move = function(dx, dy) {
			this.x1 = this.x1 + dx; 
            this.y1 = this.y1 + dy;
            this.x2 = this.x2 + dx;
            this.y2 = this.y2 + dy;
            this.x3 = this.x3 + dx;
            this.y3 = this.y3 + dy;
		};
		
		this.points = function() {
		     return [{x: this.x1, y: this.y1}, {x: this.x2, y: this.y2}, {x: this.x3, y: this.y3}];

		};
		
		//hittar alla maximum och minimum trangel points för att sedan skapa rectangle points
		this.boundingBox = function() {
       		
       		let minpointX = Math.min(this.x1, this.x2, this.x3);
       		let minpointY = Math.min(this.y1, this.y2, this.y3);
       		let maxpointX = Math.max(this.x1, this.x2, this.x3);
       		let maxpointY = Math.max(this.y1, this.y2, this.y3);
       		let boundingRec = new Rectangle (x1 = minpointX, y1 = maxpointY, x2 = maxpointX, y2 = minpointY);
       		return boundingRec;
       	
       	
       };
  
            this.draw = function() {
              c.beginPath();
              c.strokeStyle = this.color;
              c.moveTo(this.x1, this.y1);
              c.lineTo(this.x2, this.y2);
              c.lineTo(this.x3, this.y3);
              c.closePath();
              c.stroke();
        };
} 

//**************************************rectangle***************************************
function Rectangle (x1, y1, x2, y2) {
	
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
    this.color = colorPicker.value;
	
	//length*height
	this.area = function () {
		return Math.abs((this.x1 - this.x2)*(this.y1 - this.y2));
	};
	
	this.move = function(dx, dy) {
		this.x1 = this.x1 + dx; 
        this.y1 = this.y1 + dy;
        this.x2 = this.x2 + dx;
        this.y2 = this.y2 + dy;
	};
	
	this.points = function() {
		     return [{x: this.x1, y: this.y1},  {x: this.x2, y: this.y1}, {x: this.x2, y: this.y2}, {x: this.x1, y: this.y2}];

		};
		
  	this.distanceTo = function(otherRectangle) {

	//hittar mittpunkten på båda rectangle
         centerAx = (this.x1 + this.x2)/2;
         centerAy = (this.y1 + this.y2)/2;
	     centerBx = (otherRectangle.x1 + otherRectangle.x2)/2; 
	     centerBy = (otherRectangle.y1 + otherRectangle.y2)/2;
	        
	 //använder samma som i circel för att hitta avståndet mellan två punkter       
	    return Math.sqrt(((centerBx - centerAx)*(centerBx - centerAx)) + ((centerBy - centerAy)*(centerBy - centerAy)));
	
		};
         
        this.draw = function() {
            
        c.strokeStyle = this.color;   
        c.strokeRect(this.x1, this.y1, this.x1 - this.x2, this.y1 - this.y2);

           /* c.beginPath();
            c.strokeStyle = this.color;
            c.moveTo(this.x1, this.y1);
            c.lineTo(this.x3, this.y3);
            c.lineTo(this.x2, this.y2);
            c.lineTo(this.x4, this.y4);
            c.closePath();
            c.stroke();*/
        };
}



};
window.addEventListener('load', callback);
