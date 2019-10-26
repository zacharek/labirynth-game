let gameBlock = document.querySelectorAll(".game_block");
let gameContainer = document.querySelector(".game_grid");
let griddSize = 25;
console.log("start")
for (let y=1;y<=griddSize;y++){
    for (let x=1;x<=griddSize;x++){
        let newBlock = document.createElement("div");
        newBlock.classList.add("game_block")
        newBlock.classList.add(`posX-${x}`);
        newBlock.classList.add(`posY-${y}`);
        gameContainer.appendChild(newBlock)
    }
}
console.log("stop")
let charPos = document.querySelector(".posX-1");
let char = document.createElement("div");
char.classList.add("char");
charPos.appendChild(char);

document.addEventListener("keydown", function (elem) {
    if (elem.key==="ArrowRight"){
        let posX = char.parentElement.classList.value
        console.log(posX)

    }
    if (elem.key==="ArrowLeft"){
        console.log("w lewo")
    }
    if (elem.key==="ArrowUp"){
        console.log("w góre")
    }
    if (elem.key==="ArrowDown"){
        console.log("w dół")
    }
})


function newLevel(gridSize){
    console.log("start")
    let level =[];
    for (let y=1;y<=gridSize;y++){
        let levelY=[];
        for (let x=1;x<=gridSize;x++){
            levelY.push({top: true, right: true, bottom: true, left:true})
            let newBlock = document.createElement("div");
            newBlock.classList.add("game_block")
            newBlock.classList.add(`posX-${x}`);
            newBlock.classList.add(`posY-${y}`);
            gameContainer.appendChild(newBlock)
        }
        level.push(levelY)
    }
    console.log("stop");
    return level;
}

console.log(newLevel(25))

function combinations(levels){
    console.log("start")
    let output=[];
    for (let i=0;i<=levels;i++){
        let output1=[];
        for (let j=0;j<=levels;j++){
            let output2=[];
            for (let k=0;k<=levels;k++){
                let output3=[];
                for (let l=0;l<=levels;l++){
                    output3.push(l);
                }
                output2.push(output3)
            }
            output1.push(output2)
        }
        output.push(output1)
    }
    console.log("stop")
    return output;
}
console.log(combinations(1));