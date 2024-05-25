class Obj{
    frame = 0
    timer = 0
    setVisible = true
    constructor(x,y,width,height, imagem){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imagem = imagem;

    }

    draw(){
        if(this.setVisible){
            let img = new Image();
            img.src = this.imagem;
            canvas.drawImage(img,this.x, this.y, this.width, this.height);
        }
    }

    animation(vel,limit, nome){
        this.timer +=1;
        if(this.timer >= vel){
            this.timer = 0;
            this.frame +=1;
        }
        if(this.frame >= limit){
            this.frame = 0
        }

        this.imagem = "assets/images/"+nome+this.frame+".png"
    }

    collide(obj){
      
            if(this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y  + obj.height &&
                this.y  + this.height > obj.y
            ){
               return true
            }else{
                return false
            }
    }  

  
}

class Text{
    text = ""  
    
    constructor(text) {
        this.text = text
    }

    drawText(size,font,color,x,y){
        canvas.font = size+"px"+" "+font
        canvas.fillStyle = color
        canvas.fillText(this.text,x,y)
    }

    updateText(pts){
        this.text = pts
    }
}

class Shooter extends Obj{
    move(){
        this.y -= 10;
    }
}

class Meteor extends Obj{
    speed = Math.random() *(10 - 2)+2
    move(){
        this.y += this.speed;
    }
}

