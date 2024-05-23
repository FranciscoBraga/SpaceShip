let canvas = document.getElementById("canvas").getContext("2d");
canvas.imageSmoothingEnabled = false

document.addEventListener("click",function(e){
    changeScene(game)
})

document.addEventListener("mousemove",function(e){
    if(currentScene.moveShip){
        currentScene.moveShip(e)
    }
})

let currentScene = {}

let infinityBG = {
    bg :  new Obj(0,0,360,620,"assets/fundo.png"),
    bg2 :  new Obj(0,-360,360,620,"assets/fundo.png"),

    draw(){
        this.bg.draw();
        this.bg2.draw();
    },

    move(){
        this.bg.y +=1;
        this.bg2.y +=1;
        if(this.bg.y>=360){
           this.bg.y = -360
        }
        if(this.bg2.y>=360){
            this.bg2.y = -360
         }
    }
}

function changeScene(scene){
    currentScene = scene
}

let menu = {
    title : new Text("SpaceShip"),
    label : new Text("Click to Play"),
    ship : new Obj(150,550,45,40,"assets/nave.png"),
    draw(){
        infinityBG.draw()
        this.title.drawText(40,"Arial","white",90,275)
        this.label.drawText(20,"Arial","white",125,320)
        this.ship.draw()
    },
    update(){
        infinityBG.move()
    },
}

let game ={
    bg :  new Obj(0,0,360,620,"assets/fundo.png"),
    score : new Text("0"),
    ship : new Obj(150,550,45,40,"assets/nave.png"),
    draw(){
        infinityBG.draw()
        this.score.drawText(30,"Arial","white",25,25)
        this.ship.draw()
    },

    moveShip(event){
        this.ship.x = event.offsetX - this.ship.width/2
        this.ship.y = event.offsetY - 30
    },
    update(){
        infinityBG.move()
    },
}

let gameOver = {
    bg :  new Obj(0,0,360,620,"assets/fundo.png"),
    score : new Text("0"),
    draw(){
        infinityBG.draw()
        this.score.drawText(30,"Arial","white",25,25)
    },
    update(){
        infinityBG.move()
    },
}

function main(){
    canvas.clearRect(0,0,360,620);
    currentScene.draw();
    currentScene.update();
    requestAnimationFrame(main)
}

changeScene(menu)
main()