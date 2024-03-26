const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");

function StartGame(){
    const gridSize = 30;
    const snake = [ {x: 100 , y: 100 }];
    let direction = "down";
    let food = foodPosition();

    pic = new Image();
    pic.src =    'https://yandex.ru/images/search?text=%D1%8D%D0%BC%D0%BE%D0%B4%D0%B7%D0%B8+%D1%8F%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0&img_url=https%3A%2F%2Fsun9-51.userapi.com%2Fimpg%2FHcu2vFK4GrobbHvRvqLuOMe9pgPSgbn6uvPQuw%2FGp6wFM-BdHo.jpg%3Fsize%3D604x604%26quality%3D95%26sign%3D56782a2e1e5fd39ac137ce2b79084de0%26c_uniq_tag%3D2-6ZJneMbxBPrFTtgCum0WCAhBx2aPUQ0UAFqHTkTOo%26type%3Dalbum&pos=0&rpt=simage&stype=image&lr=74&parent-reqid=1711413625709080-17133500974377386471-balancer-l7leveler-kubr-yp-sas-90-BAL&source=serp';

    function foodPosition(){
        max_x = (canvas.width / gridSize) - 1
        max_y = (canvas.height / gridSize) -1

        grid_x = Math.floor(Math.random() * max_x) - 0;
        grid_y = Math.floor(Math.random() * max_y) - 0;

        const x = grid_x*gridSize
        const y = grid_y*gridSize

        return { x, y };

        

    }

    function draw(){
        context.clearRect(0,0,canvas.width, canvas.height);

        context.fillStyle ="green"

        snake.forEach (function(segment){context.fillRect(segment.x, segment.y, gridSize, gridSize);});

        context.fillStyle = "red";
        context.fillRect(food.x, food.y, gridSize, gridSize)

    }

    function move(){
        const head = {...snake[0]}
        switch(direction){
            case "up":
                head.y -= gridSize;
                break
            case "down":
                head.y += gridSize;
                break
            case "left":
                head.x -= gridSize;
                break
            case "right":
                head.x += gridSize;
                break
        }

        if (head.x === food.x && head.y === food.y) {
            snake.unshift(food);
            food = foodPosition();
        }
        else{
            snake.pop();
        }

        if(head.x <0){
            head.x = canvas.width
        }

        if(head.x > canvas.width){
            head.x = 0;
        }

        if(head.y <0){
            head.y = canvas.height
        }

        if(head.y > canvas.height){
            head.y = 0;
        }

        if (collisionItself(head)){
            alert("GAME OVER");
            location.reload();
        }


        snake.unshift(head)
   
    }

    function collisionItself(head){
        return snake.slice(1).some( segment=> segment.x === head.x && segment.y === head.y)
    }


    function onKeyPress(event){
        const key = event.key.toLowerCase();

        if(["w", "a", "s", "d"]. includes(key)){
            if ( key === "w" && direction !== "down"){direction = "up"}
            if ( key === "s" && direction !== "up"){direction = "down"}
            if ( key === "a" && direction !== "right"){direction = "left"}
            if ( key === "d" && direction !== "left"){direction = "right"}
        }
    }

    window.addEventListener('keydown' , onKeyPress);

    function LoopGame(){
        move();
        draw();

    }

    setInterval(LoopGame, 150);
}