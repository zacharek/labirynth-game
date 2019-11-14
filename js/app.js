let gameContainer = document.querySelector(".game_grid");
let gridArray = newLevel(25);
passLengthen(createPass(createInOut(gridArray), gridArray));
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

document.addEventListener("keydown", function (elem) {
    if (elem.key==="ArrowRight"){
        console.log("w prawo")
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
    let level =[];
    for (let y=1;y<=gridSize;y++){
        let levelY=[];
        for (let x=1;x<=gridSize;x++){
            levelY.push({wall: true,
                         isEnter: false,
                         isExit: false,
                         isEdited:false});
        }
        level.push(levelY)
    }
    return level;
}

function createInOut(array) {
    //Entrance generation
    let ranInY = Math.round(Math.random() * (array.length -3))+1;  //temp change to fix bug when pos is next to edge
    let ranInX = Math.round(Math.random() * (array.length -3))+1;  //Math.round(Math.random() * (array.length -1))
    //Exit generation
    let ranOutY = Math.round(Math.random() * (array.length -3))+1;
    let ranOutX = Math.round(Math.random() * (array.length -3))+1;
    //condition if pos x of entrance is too close to pos x of exit
    while (Math.abs(ranInX-ranOutX)<4){
        ranOutX = Math.round(Math.random() * (array.length -3))+1;
    }
    //condition if pos y of entrance is too close to pos y of exit
    while (Math.abs(ranInY-ranOutY)<4){
        ranOutY = Math.round(Math.random() * (array.length -3))+1;
    }
    //setting enter position into x:[0] and y:[1]  of array and exit x:[2] and y:[3]
    let inOutArr = [ranInX, ranInY, ranOutX, ranOutY];
    //putting entrance position into generator
    array[ranInY][ranInX].isEnter=true;
    array[ranInY][ranInX].wall=false;
    array[ranInY][ranInX].isEdited=true;
    //putting exit position into generator
    array[ranOutY][ranOutX].isExit=true;
    array[ranOutY][ranOutX].wall=false;
    array[ranOutY][ranOutX].isEdited=true;
    console.log(inOutArr);
    return inOutArr;
}

function createPass(inOutArr, levelArray) { //needs reworking
    let counterX = 0;
    let counterY = 0;
    let tempX =0;
    while (inOutArr[0]+counterX<inOutArr[2]) { //creating pass when exit is to the right of entrance
        counterX++;
        //creating enter border
        //top border
        levelArray[inOutArr[1]+1][inOutArr[0]].wall=true;
        levelArray[inOutArr[1]+1][inOutArr[0]].isEdited=true;
        //left border
        levelArray[inOutArr[1]][inOutArr[0]-1].wall=true;
        levelArray[inOutArr[1]][inOutArr[0]-1].isEdited=true;
        //bottom border
        levelArray[inOutArr[1]-1][inOutArr[0]].wall=true;
        levelArray[inOutArr[1]-1][inOutArr[0]].isEdited=true;
        //creating pass
        levelArray[inOutArr[1]][inOutArr[0]+counterX].wall=false;
        levelArray[inOutArr[1]][inOutArr[0]+counterX].isEdited=true;
        //creating top border
        levelArray[inOutArr[1]-1][inOutArr[0]+counterX].wall=true;
        levelArray[inOutArr[1]-1][inOutArr[0]+counterX].isEdited=true;
        //creating right border
        levelArray[inOutArr[1]][inOutArr[0]+1+counterX].wall=true;
        levelArray[inOutArr[1]][inOutArr[0]+1+counterX].isEdited=true;
        //creating bottom border
        levelArray[inOutArr[1]+1][inOutArr[0]+counterX].wall=true;
        levelArray[inOutArr[1]+1][inOutArr[0]+counterX].isEdited=true;
        tempX=inOutArr[0]+counterX;
    }
    while (inOutArr[0]+counterX>inOutArr[2]) { //creating pass when exit is to the left of entrance
        counterX--;
        //creating enter border
        //top border
        levelArray[inOutArr[1]+1][inOutArr[0]].wall=true;
        levelArray[inOutArr[1]+1][inOutArr[0]].isEdited=true;
        //right border
        levelArray[inOutArr[1]][inOutArr[0]+1].wall=true;
        levelArray[inOutArr[1]][inOutArr[0]+1].isEdited=true;
        //bottom border
        levelArray[inOutArr[1]-1][inOutArr[0]].wall=true;
        levelArray[inOutArr[1]-1][inOutArr[0]].isEdited=true;
        //creating pass
        levelArray[inOutArr[1]][inOutArr[0]+counterX].wall=false;
        levelArray[inOutArr[1]][inOutArr[0]+counterX].isEdited=true;
        //creating top border
        levelArray[inOutArr[1]-1][inOutArr[0]+counterX].wall=true;
        levelArray[inOutArr[1]-1][inOutArr[0]+counterX].isEdited=true;
        //creating left border
        levelArray[inOutArr[1]][inOutArr[0]-1+counterX].wall=true;
        levelArray[inOutArr[1]][inOutArr[0]-1+counterX].isEdited=true;
        //creating bottom border
        levelArray[inOutArr[1]+1][inOutArr[0]+counterX].wall=true;
        levelArray[inOutArr[1]+1][inOutArr[0]+counterX].isEdited=true;
        tempX=inOutArr[0]+counterX;
    }
    while (inOutArr[1]+counterY<inOutArr[3]) { //creating pass when exit is lower than entrance
        counterY++;
        //creating pass
        levelArray[inOutArr[1]+counterY][tempX].wall=false;
        levelArray[inOutArr[1]+counterY][tempX].isEdited=true;
        //creating left border
        levelArray[inOutArr[1]+counterY][tempX-1].wall=true;
        levelArray[inOutArr[1]+counterY][tempX-1].isEdited=true;
        //creating right border
        levelArray[inOutArr[1]+counterY][tempX+1].wall=true;
        levelArray[inOutArr[1]+counterY][tempX+1].isEdited=true;
        //creating bottom border
        levelArray[inOutArr[1]+1+counterY][tempX].wall=true;
        levelArray[inOutArr[1]+1+counterY][tempX].isEdited=true;
    }
    while (inOutArr[1]+counterY>inOutArr[3]) { //creating pass when exit is higher than entrance
        counterY--;
        //creating pass
        levelArray[inOutArr[1]+counterY][tempX].wall=false;
        levelArray[inOutArr[1]+counterY][tempX].isEdited=true;
        //creating top border
        levelArray[inOutArr[1]-1+counterY][tempX].wall=true;
        levelArray[inOutArr[1]-1+counterY][tempX].isEdited=true;
        //creating left border
        levelArray[inOutArr[1]+counterY][tempX-1].wall=true;
        levelArray[inOutArr[1]+counterY][tempX-1].isEdited=true;
        //creating right border
        levelArray[inOutArr[1]+counterY][tempX+1].wall=true;
        levelArray[inOutArr[1]+counterY][tempX+1].isEdited=true;
    }
    return inOutArr;
}

function passLengthen(inOutArr,) {
    let passLength = Math.abs(inOutArr[0]-inOutArr[2])+Math.abs(inOutArr[1]-inOutArr[3])-1;
    console.log(passLength)
}

function createGrid(array) {
    array.forEach(function (elem, indexy) {
        elem.forEach(function (object, indexx) {
            let newBlock = document.createElement("div");
            newBlock.classList.add("game_block");
            //adding class positions for troubleshooting
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

function clearGrid() {
    let gameBlock = document.querySelectorAll(".game_block");
    gameBlock.forEach(function (element) {
        element.parentElement.firstElementChild.remove();
    })
}