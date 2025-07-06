const board = document.querySelector("#game-board");
const scoreDisplay = document.querySelector("#score");
const restartButton = document.querySelector("#restart-button");

let score = 0;
let tiles = [];

function initializeGame() {
    tiles = [];
    board.innerHTML = "";

    for(let i=0; i<16; i++){
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.value = 0;
        tiles.push(tile);
        board.appendChild(tile);
    }

    addRandomTile();
    addRandomTile();
    updateBoard();
    
}

function addRandomTile(){
    const emptyTiles = tiles.filter(tile => tile.dataset.value ==0);

    if(emptyTiles.length ==0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

    randomTile.dataset.value = Math.random() < 0.9 ? 2 : 4;

}

function updateBoard(){
    tiles.forEach(tile => {
        console.log(tile.dataset.value);
    })

    tiles.forEach(tile => {
        const value = parseInt(tile.dataset.value);
        tile.textContent = value > 0 ? value : "";
        tile.className = "tile";
        if(value > 0){
            tile.classList.add(`tile-${value}`)
        }
    })

    scoreDisplay.textContent = score;

}


function move(direction) {

    let moved = false;
    console.log(`\nMoving: ${direction}`);


    for (let i = 0; i < 4; i++) {
        let line = [];

        // console.log(`\nprocessing ${direction == "up" || direction == 'down'
        //     ? "column" : "row"} ${i}`)

        for (let j = 0; j < 4; j++) {
            const index = direction == "up" || direction == "down" ? i + j * 4 : j + i * 4;
            const value = parseInt(tiles[index].dataset.value);
            if (value !== 0) line.push(value)
            // line.push(value)
        }
        console.log(`Original Line: ${line}`)


        if (direction == "right" || direction == "down") {
            line.reverse();
            // console.log(`Reversed line for ${direction} : ${line}`)
        }

        let mergedLine = mergeLine(line);
        if (direction == "right" || direction == "down") {
            mergedLine.reverse();
            // console.log(`Reversed line for ${direction} : ${line}`)
        }


        for (let j = 0; j < 4; j++) {
            const index = direction == "up" || direction == "down" ? i + j * 4 : j + i * 4;
            const newValue = mergedLine[j] || 0;

            if (tiles[index].dataset.value != newValue) {
                tiles[index].dataset.value = newValue;

                moved = true;
            }
        }

    }


    if (moved) {
        console.log("Move Successful, adding a new tile");
        addRandomTile();
        updateBoard();
    }
    else {
        console.log("No tiles moved")
    }

}


function mergeLine(line) {
    // 224 
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
            line[i] *= 2;
            score += line[i];
            line.splice(i + 1, 1);
        }
    }
    // 44
    while (line.length < 4) {
        line.push(0);
    }
    // 4400
    return line;

}

document.addEventListener("keydown", (e) => {
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
    }
})

initializeGame();
restartButton.addEventListener("click",initializeGame);