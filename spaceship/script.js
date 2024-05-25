let canvas = document.getElementById("canvas").getContext("2d");
canvas.imageSmoothingEnabled = false

document.addEventListener("click",function(e){
   if(currentScene.click){
    currentScene.click()
   }
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

let bullets = 1

let pts = 0

let groupShoot = []
let shoots ={
    draw(){
        groupShoot.forEach((shoot)=>{
            shoot.draw()
        })
    },
    update(){
        groupShoot.forEach((shoot)=>{
            shoot.move();

        if(shoot.y <= -20){
            groupShoot.splice(shoot[0],1)
            bullets = 1
        }
       })
    }
}

let groupMeteors =[]
let meteors ={
    time:0,
    spawMeteors(){
        this.time+=1
        
        size = Math.random() * (50 - 25) + 25
        posx = Math.random() * (300 - 10) + 10
        if(this.time>=60){
            this.time =0
            groupMeteors.push(new Meteor(posx,-100,size,size,"assets/meteoro.png"))
        }
    },
    destroyMeteors(){
        groupShoot.forEach((shoot) =>{
            groupMeteors.forEach((meteors)=>{
                if(shoot.collide(meteors)){
                    groupShoot.splice(groupShoot.indexOf(shoot),1)
                    groupMeteors.splice(groupMeteors.indexOf(meteors),1)
                    bullets = 1
                    pts += 1
                }
            })
      })
    },
    draw(){
        groupMeteors.forEach((meteor)=>{
            meteor.draw()
        })
    },
    update(){
        this.spawMeteors()
        this.destroyMeteors()
        groupMeteors.forEach((meteor)=>{
            meteor.move();

            if(meteor.y >= 600){
                groupMeteors.splice(groupMeteors.indexOf(meteor),1)
                changeScene(gameOver)
            }
       })
    }
}

let menu = {
    title : new Text("SpaceShip"),
    label : new Text("Click to Play"),
    ship : new Shooter(150,550,45,40,"assets/nave.png"),

    click(){
        changeScene(game)
    },
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
    score : new Text("0"),
    ship : new Obj(150,500,45,40,"assets/nave.png"),

    click(){
        if(bullets > 0){
            groupShoot.push(new Shooter((this.ship.x+22),this.ship.y,2,10,"assets/tiro.png"))
            bullets -=1
        }
    },
    draw(){
        infinityBG.draw()
        this.score.drawText(30,"Arial","white",25,25)
        this.ship.draw()
         shoots.draw()
         meteors.draw()
    },

    moveShip(event){
        this.ship.x = event.offsetX - this.ship.width/2
        this.ship.y = event.offsetY - 30
       
    },
    update(){
       infinityBG.move()
       shoots.update()
       meteors.update()
       this.score.updateText(pts)
    },
}

let gameOver = {

    score : new Text("0"),
    label_text : new Text("GameOver"),
    draw(){
        infinityBG.draw()
        this.score.drawText(30,"Arial","white",25,25)
        this.label_text.drawText(50,"Arial","white",90,350)
    },
    cleanScene(){
        pts =0;
        bullets = 1;
        groupShoot = []
        groupMeteors =[]
    },
    click(){
        this.cleanScene()
        changeScene(menu)
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