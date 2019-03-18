var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "scream", 10, 120);
    myGamePiece2 = new component(30, 30, "dw", 600, 120);
    myGamePiece3 = new component(30, 30, "kd", 600, 440);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1440;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, who, x, y) {
	this.deadman=false;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        //ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
	var img = document.getElementById(who);
	ctx.drawImage(img, this.x,this.y);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
	this.deadman = function() {
	    this.speedX = 0;
		this.speedY = 0;
		this.x=0;
		this.y=0;
		this.deadman=true;
	}
}

function updateGameArea() {
    if (myGamePiece.crashWith(myGamePiece2)) {
        //alert("Survivor 1 is dead");
        //myGameArea.stop();
        myGameArea.clear();
        myGamePiece.newPos();     
        myGamePiece.update();
        myGamePiece2.deadman();
        myGamePiece3.newPos();     
        myGamePiece3.update();
    }
    else if (myGamePiece.crashWith(myGamePiece3)) {
        //alert("Survivor 2 is dead");
        //myGameArea.stop();
        myGameArea.clear();
        myGamePiece.newPos();     
        myGamePiece.update();
        myGamePiece3.deadman();     
        myGamePiece2.newPos();     
        myGamePiece2.update();
    }
    else {
        myGameArea.clear();
        myGamePiece.newPos();     
        myGamePiece.update();
        myGamePiece2.newPos();     
        myGamePiece2.update();
        myGamePiece3.newPos();     
        myGamePiece3.update();
    }
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        myGamePiece.speedY = 0;
        myGamePiece.speedY -= 3;
    }
    else if (e.keyCode == '83') {
        myGamePiece.speedY = 0;
        myGamePiece.speedY += 3;
    }
    else if (e.keyCode == '65') {
       myGamePiece.speedX = 0;
       myGamePiece.speedX -= 3;
    }
    else if (e.keyCode == '68') {
       myGamePiece.speedX = 0;
       myGamePiece.speedX += 3;
    }
    else if (e.keyCode == '38' && (myGamePiece2.deadman!=true)) {
       myGamePiece2.speedY = 0;
       myGamePiece2.speedY -= 3;
    }
    else if (e.keyCode == '40' && (myGamePiece2.deadman!=true)) {
       myGamePiece2.speedY = 0;
       myGamePiece2.speedY += 3;
    }
    else if (e.keyCode == '37' && (myGamePiece2.deadman!=true)) {
       myGamePiece2.speedX = 0;
       myGamePiece2.speedX -= 3;
    }
    else if (e.keyCode == '39' && (myGamePiece2.deadman!=true)) {
       myGamePiece2.speedX = 0;
       myGamePiece2.speedX += 3;
    }
    else if (e.keyCode == '36' && (myGamePiece3.deadman!=true)) {
       myGamePiece3.speedY = 0;
       myGamePiece3.speedY -= 3;
    }
    else if (e.keyCode == '35' && (myGamePiece3.deadman!=true)) {
       myGamePiece3.speedY = 0;
       myGamePiece3.speedY += 3;
    }
    else if (e.keyCode == '46' && (myGamePiece3.deadman!=true)) {
       myGamePiece3.speedX = 0;
       myGamePiece3.speedX -= 3;
    }
    else if (e.keyCode == '34' && (myGamePiece3.deadman!=true)) {
       myGamePiece3.speedX = 0;
       myGamePiece3.speedX += 3;
    }
}
