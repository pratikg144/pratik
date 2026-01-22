const board=document.getElementById('game-board');
const scoreDisplay=document.getElementById("score")

const restartButton=document.getElementById("restart");

let score=0;
let tiles=[];

function initializeGame(){
    tiles=[];
    board.innerHTML='';
    for(let i=0;i<16;i++){
        let tile=document.createElement("div");
        tile.classList.add('title');

        tile.dataset.value=0;
        tiles.push(tile);
        board.appendChild(tile)
    }
    addRandomTile();
    addRandomTile();
    updateBoard();
}


function updateBoard() {
    tiles.forEach(tile => {
        const value = parseInt(tile.dataset.value);
        tile.textContent = value > 0 ? value : '';  // <-- fixed the casing here
        tile.className = 'title';
        if (value > 0) tile.classList.add(`title-${value}`);
    });

    scoreDisplay.textContent = score;
}


function addRandomTile() {
    const emptytiles=tiles.filter(tile=>tile.dataset.value==0);
    if(emptytiles.length==0)return;
    console.log(emptytiles);
    const randomTile=emptytiles[Math.floor(Math.random()*emptytiles.length)]
    randomTile.dataset.value=Math.random()<0.9?2:4;
    
}

function move(direction) {
    let moved = false;
    console.log(`\nMoving: ${direction}`);

    for (let i = 0; i < 4; i++) {
        let line = [];

        for (let j = 0; j < 4; j++) {
            const index = direction === "up" || direction === "down" ? i + j * 4 : j + i * 4;
            const value = parseInt(tiles[index].dataset.value);
            if (value !== 0) line.push(value);
        }

        if (direction === "right" || direction === "down") {
            line.reverse();
        }

        let margedline = mergedLine(line);

        if (direction === "right" || direction === "down") {
            margedline.reverse();
        }

        for (let j = 0; j < 4; j++) {
            const index = direction === "up" || direction === "down" ? i + j * 4 : j + i * 4;
            const newvalue = margedline[j] || 0;

            if (parseInt(tiles[index].dataset.value) !== newvalue) {
                tiles[index].dataset.value = newvalue;
                moved = true;
            }
        }
    }

    if (moved) {
        console.log("Move successful, adding new tile");
        addRandomTile();
        updateBoard();
    } else {
        console.log("No tile moved");
    }
}

  function mergedLine(line){
    //224
    for(let i=0;i<line.length-1;i++){
        if(line[i]==line[i+1]){
            line[i]*=2;
            score +=line[i];
            line.splice(i+1,1);
        }

    }
    // 44
    while(line.length<4){
     line.push(0);    
    }
    //4400
    return line;
   }


document.addEventListener("keydown",(e)=>{
    switch (e.key) {
        case "ArrowUp":
           
            move("up");
            break;
        case "ArrowDown":
            move("down");
            break;
        case "ArrowLeft":
            move("left");
            break;
        case "ArrowRight":
            move("right");
            break;
    
        default:
           console.log("wrong input! ");
    }

});



initializeGame();
restartButton.addEventListener("click",initializeGame);


 











