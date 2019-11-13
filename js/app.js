let gameBlock = document.querySelectorAll(".game_block");
let gameContainer = document.querySelector(".game_grid");
let gridArray = newLevel(25);
createInOut(gridArray);
createPass(gridArray);
createGrid(gridArray);
/*let griddSize = 25;
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
charPos.appendChild(char);*/

/*document.addEventListener("keydown", function (elem) {
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
})*/

function newLevel(gridSize){
    let level =[];
    for (let y=1;y<=gridSize;y++){
        let levelY=[];
        for (let x=1;x<=gridSize;x++){
            levelY.push({wall: true,
                         isEnter: false,
                         isExit: false});
        }
        level.push(levelY)
    }
    return level;
}

function createInOut(array) {
    let ranInY = Math.round(Math.random() * (array.length -1));
    let ranInX= Math.round(Math.random() * (array.length -1));
    let ranOutY= Math.round(Math.random() * (array.length -1));
    let ranOutX= Math.round(Math.random() * (array.length -1));
    array[ranInY][ranInX].isEnter=true;
    array[ranInY][ranInX].wall=false;
    array[ranOutY][ranOutX].isExit=true;
    array[ranOutY][ranOutX].wall=false;
    /*need to add condition when enter is same as exit*/
    console.log(array[ranInY][ranInX], array[ranOutY][ranOutX]);
}

function createPass(array, callback) {

}

function createGrid(array) {
    array.forEach(function (elem, indexy) {
        elem.forEach(function (object, indexx) {
            let newBlock = document.createElement("div");
            newBlock.classList.add("game_block");
            newBlock.classList.add(`posX-${indexx}`);
            newBlock.classList.add(`posY-${indexy}`);
            if (object.isEnter===true){
                newBlock.classList.add("enter");
            }else if(object.isExit===true){
                newBlock.classList.add("exit");
            }else if(object.wall===false){
                newBlock.classList.add("pass");
            }else if(object.wall===true){
                newBlock.classList.add("wall");
            }else{
                console.log("coś poszło nie tak podczas generacji poziomu");
            }
            gameContainer.appendChild(newBlock);
        })
    })
}

