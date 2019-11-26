let gameContainer = document.querySelector(".game_grid");

function generateLevel(size,difficulty){
    let gridArray = newLevel(size);
    return createRoute(gridArray,difficulty*size);

}

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
                         isExit: false
                        });
        }
        level.push(levelY)
    }
    return level;
}

/*function createRoute(array) {
    let passArray=[];
    while(passArray.length<100 ){
            //Entrance generation
            let ranInY = Math.round(Math.random() * (array.length -1));
            let ranInX = Math.round(Math.random() * (array.length -1));
            passArray = [ranInX,ranInY];
            let errorCount=0;
            let errorState=false;
            //sets entrance
            array[ranInY][ranInX].isEnter=true;
            array[ranInY][ranInX].wall=false;
            array[ranInY][ranInX].isEdited=true;
            while (passArray.length<100 && errorState==true){
                let setTurn = Math.ceil(Math.random() * 4);
                ranInX = passArray[passArray.length-2];
                ranInY = passArray[passArray.length-1];
                if (setTurn===1 && array[ranInY+1][ranInX]!==undefined && array[ranInY+2][ranInX]!==undefined){
                   if(array[ranInY+1][ranInX].wall===false && array[ranInY+2][ranInX].wall===false){
                       continue;
                   }else{
                       array[ranInY+1][ranInX].isEdited=true;
                       array[ranInY+1][ranInX].wall=false;
                       array[ranInY+2][ranInX].isEdited=true;
                       array[ranInY+2][ranInX].wall=false;
                       passArray.push(ranInX, ranInY+1, ranInX, ranInY+2);
                       errorCount=0;
                   }
                }else if(setTurn===2 && array[ranInY-1][ranInX]!=undefined && array[ranInY-2][ranInX]!=undefined){

                    if(array[ranInY-1][ranInX].wall===false && array[ranInY-2][ranInX].wall===false){
                        continue;
                    }else{
                        array[ranInY-1][ranInX].isEdited=true;
                        array[ranInY-1][ranInX].wall=false;
                        array[ranInY-2][ranInX].isEdited=true;
                        array[ranInY-2][ranInX].wall=false;
                        passArray.push(ranInX, ranInY-1, ranInX, ranInY-2);
                        errorCount=0;
                    }
                }else if(setTurn===3 && array[ranInY][ranInX+1]!=undefined && array[ranInY][ranInX+2]!=undefined ){

                    if(array[ranInY][ranInX+1].wall===false && array[ranInY][ranInX+2].wall===false){
                        continue;
                    }else{
                        array[ranInY][ranInX+1].isEdited=true;
                        array[ranInY][ranInX+1].wall=false;
                        array[ranInY][ranInX+2].isEdited=true;
                        array[ranInY][ranInX+2].wall=false;
                        passArray.push(ranInX+1, ranInY, ranInX+2, ranInY);
                        errorCount=0;
                    }
                }else if(setTurn===4 && array[ranInY][ranInX-1]!=undefined && array[ranInY][ranInX-2]!=undefined){

                    if(array[ranInY][ranInX-1].wall===false && array[ranInY][ranInX-2].wall===false){
                        continue;
                    }else{
                        array[ranInY][ranInX-1].isEdited=true;
                        array[ranInY][ranInX-1].wall=false;
                        array[ranInY][ranInX-2].isEdited=true;
                        array[ranInY][ranInX-2].wall=false;
                        passArray.push(ranInX-1, ranInY, ranInX-2, ranInY);
                        errorCount=0;
                    }
                }else{
                    errorCount++;
                    if (errorCount>4){
                        errorState=true
                        return passArray;
                    }

                }
            }
            array[passArray[passArray.length-1]][passArray[passArray.length-2]].isExit=true;
            array[passArray[passArray.length-1]][passArray[passArray.length-2]].isEdited=true;

        console.log(passArray)
    }


}*/

function createRoute(entryArray,length) {
    let passArray=[];
    let filledArray;
    let returnedObject;
    let array=entryArray;
    while(passArray.length<length) {
        returnedObject=newRoute(array,length);
        filledArray=returnedObject.filledLevel;
        passArray=returnedObject.routePositions;
        array=newLevel(entryArray.length) //czy jest efektywniejsza metoda, zeby nie generowac jeszcze raz tego samego

    }
        return fillSpaces(returnedObject);
}

/*
function newRoute(entryArray,length) {
    let array=entryArray;
    //Entrance generation
    let ranInY = Math.round(Math.random() * (array.length -1));
    let ranInX = Math.round(Math.random() * (array.length -1));
    let passArray = [ranInX,ranInY];
    let errorCount=0;
    //sets entrance
    array[ranInY][ranInX].isEnter=true;
    array[ranInY][ranInX].wall=false;
    array[ranInY][ranInX].isEdited=true;
    while (passArray.length<length){
        let setTurn = Math.ceil(Math.random() * 4);
        ranInX = passArray[passArray.length-2];
        ranInY = passArray[passArray.length-1];
        if (errorCount>20){
            return {filledLevel:entryArray, routePositions:passArray};
        }else if (setTurn===1){
            if (array[ranInY+1]!==undefined && array[ranInY+1][ranInX]!==undefined && array[ranInY+2]!==undefined && array[ranInY+2][ranInX]!==undefined){
                if(array[ranInY+1][ranInX].wall===true && array[ranInY+2][ranInX].wall===true){
                    array[ranInY+1][ranInX].isEdited=true;
                    array[ranInY+1][ranInX].wall=false;
                    array[ranInY+2][ranInX].isEdited=true;
                    array[ranInY+2][ranInX].wall=false;
                    passArray.push(ranInX, ranInY+1, ranInX, ranInY+2);
                    errorCount=0;
                }else{
                    errorCount++;
                }
            }else{
                errorCount++;
            }
        }else if(setTurn===2){
            if (array[ranInY-1]!==undefined && array[ranInY-1][ranInX]!==undefined && array[ranInY-2]!==undefined && array[ranInY-2][ranInX]!==undefined){
                if(array[ranInY-1][ranInX].wall===true && array[ranInY-2][ranInX].wall===true){
                    array[ranInY-1][ranInX].isEdited=true;
                    array[ranInY-1][ranInX].wall=false;
                    array[ranInY-2][ranInX].isEdited=true;
                    array[ranInY-2][ranInX].wall=false;
                    passArray.push(ranInX, ranInY-1, ranInX, ranInY-2);
                    errorCount=0;
                }else{
                    errorCount++;
                }
            }else{
                errorCount++;
            }
        }else if(setTurn===3){
            if (array[ranInY]!==undefined && array[ranInY][ranInX+1]!==undefined && array[ranInY]!==undefined && array[ranInY][ranInX+2]!==undefined){
                if(array[ranInY][ranInX+1].wall===true && array[ranInY][ranInX+2].wall===true){
                    array[ranInY][ranInX+1].isEdited=true;
                    array[ranInY][ranInX+1].wall=false;
                    array[ranInY][ranInX+2].isEdited=true;
                    array[ranInY][ranInX+2].wall=false;
                    passArray.push(ranInX+1, ranInY, ranInX+2, ranInY);
                    errorCount=0;
                }else{
                    errorCount++;
                }
            }else{
                errorCount++;
            }
        }else if(setTurn===4){
            if (array[ranInY]!==undefined && array[ranInY][ranInX-1]!==undefined && array[ranInY]!==undefined && array[ranInY][ranInX-2]!==undefined){
                if(array[ranInY][ranInX-1].wall===true && array[ranInY][ranInX-2].wall===true){
                    array[ranInY][ranInX-1].isEdited=true;
                    array[ranInY][ranInX-1].wall=false;
                    array[ranInY][ranInX-2].isEdited=true;
                    array[ranInY][ranInX-2].wall=false;
                    passArray.push(ranInX-1, ranInY, ranInX-2, ranInY);
                    errorCount=0;
                }else{
                    errorCount++;
                }
            }else{
                errorCount++;
            }
        }
    }
    array[passArray[passArray.length-1]][passArray[passArray.length-2]].isExit=true;
    array[passArray[passArray.length-1]][passArray[passArray.length-2]].isEdited=true;
    return {filledLevel:array, routePositions:passArray};
}
*/

function newRoute(entryArray,length) {
    let array=entryArray;
    //Entrance generation
    let ranInY = Math.round(Math.random() * (array.length -1));
    let ranInX = Math.round(Math.random() * (array.length -1));
    let passArray = [ranInX,ranInY];
    let errorCount=0;
    //sets entrance
    array[ranInY][ranInX].isEnter=true;
    array[ranInY][ranInX].wall=false;
    while (passArray.length<length){
        let setTurn = Math.ceil(Math.random() * 4);
        ranInX = passArray[passArray.length-2];
        ranInY = passArray[passArray.length-1];
        if (errorCount>10){
            return {filledLevel:entryArray, routePositions:passArray};
        }else if (setTurn===1){
            if (array[ranInY+1]!==undefined && array[ranInY+1][ranInX]!==undefined) {
                if (array[ranInY + 2] !== undefined && array[ranInY + 2][ranInX] !== undefined) {
                    if (array[ranInY + 1][ranInX].wall === true && array[ranInY + 2][ranInX].wall === true) {
                        if (array[ranInY + 1][ranInX - 1] === undefined || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === true)) {
                            if (array[ranInY + 1][ranInX + 1] === undefined || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === true)) {
                                array[ranInY + 1][ranInX].wall = false;
                                passArray.push(ranInX, ranInY + 1);
                                errorCount = 0;
                            }
                        }
                    }else{
                        errorCount++;
                    }
                }
            }else{
                errorCount++;
            }
        }else if(setTurn===2){
            if (array[ranInY-1]!==undefined && array[ranInY-1][ranInX]!==undefined) {
                if (array[ranInY - 2] !== undefined && array[ranInY - 2][ranInX] !== undefined) {
                    if (array[ranInY - 1][ranInX].wall === true && array[ranInY - 2][ranInX].wall === true) {
                        if (array[ranInY - 1][ranInX - 1] === undefined || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === true)) {
                            if (array[ranInY - 1][ranInX + 1] === undefined || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === true)) {
                                array[ranInY - 1][ranInX].wall = false;
                                passArray.push(ranInX, ranInY - 1);
                                errorCount = 0;
                            }
                        }
                    }else{
                        errorCount++;
                    }
                }
            }else{
                errorCount++;
            }
        }else if(setTurn===3){
            if (array[ranInY]!==undefined && array[ranInY][ranInX+1]!==undefined) {
                if (array[ranInY] !== undefined && array[ranInY][ranInX+2] !== undefined) {
                    if (array[ranInY][ranInX+1].wall === true && array[ranInY][ranInX+2].wall === true) {
                        if ((array[ranInY + 1] === undefined || array[ranInY + 1][ranInX + 1] === undefined) || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === true)) {
                            if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX + 1] === undefined) || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === true)) {
                                array[ranInY][ranInX + 1].wall = false;
                                passArray.push(ranInX + 1, ranInY);
                                errorCount = 0;
                            }
                        }
                    }else{
                        errorCount++;
                    }
                }
            }else{
                errorCount++;
            }
        }else if(setTurn===4){
            if (array[ranInY]!==undefined && array[ranInY][ranInX-1]!==undefined) {
                if (array[ranInY] !== undefined && array[ranInY][ranInX-2] !== undefined) {
                    if (array[ranInY][ranInX-1].wall === true && array[ranInY][ranInX-2].wall === true) {
                        if ((array[ranInY + 1] === undefined ||array[ranInY + 1][ranInX - 1] === undefined) || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === true)) {
                            if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX - 1] === undefined) || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === true)) {
                                array[ranInY][ranInX - 1].wall = false;
                                passArray.push(ranInX - 1, ranInY);
                                errorCount = 0;
                            }
                        }
                    }else{
                        errorCount++;
                    }
                }
            }else{
                errorCount++;
            }
        }
    }
    array[passArray[passArray.length-1]][passArray[passArray.length-2]].isExit=true;
    return {filledLevel:array, routePositions:passArray};
}

function fillSpaces(object) {
    let mazeArray = object.routePositions;
    let array = object.filledLevel;
    let breakLength = 0;
    let mainErrorCount = 0;
    while (breakLength!==mazeArray.length || mainErrorCount<array.length*5){
        breakLength = mazeArray.length;
        let errorCount = 0;
        let ranPos = Math.round(Math.random() * mazeArray.length/2)*2;
        let ranInX = mazeArray[ranPos];
        let ranInY = mazeArray[ranPos+1];
        mazeArray.splice(ranPos,2);
        mazeArray.push(ranInX);
        mazeArray.push(ranInY);
        while (errorCount<10){
            ranInX = mazeArray[mazeArray.length-2];
            ranInY = mazeArray[mazeArray.length-1];
            let setTurn = Math.ceil(Math.random() * 4);
            if (setTurn===1){
                if (array[ranInY+1]!==undefined && array[ranInY+1][ranInX]!==undefined) {
                    if (array[ranInY + 2] !== undefined && array[ranInY + 2][ranInX] !== undefined) {
                        if (array[ranInY + 1][ranInX].wall === true && array[ranInY + 2][ranInX].wall === true) {
                            if (array[ranInY + 1][ranInX - 1] === undefined || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === true)) {
                                if (array[ranInY + 1][ranInX + 1] === undefined || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === true)) {
                                    array[ranInY + 1][ranInX].wall = false;
                                    mazeArray.push(ranInX, ranInY + 1);
                                    errorCount = 0;
                                }
                            }
                        }else{
                            errorCount++;
                        }
                    }
                }else{
                    errorCount++;
                }
            }else if(setTurn===2){
                if (array[ranInY-1]!==undefined && array[ranInY-1][ranInX]!==undefined) {
                    if (array[ranInY - 2] !== undefined && array[ranInY - 2][ranInX] !== undefined) {
                        if (array[ranInY - 1][ranInX].wall === true && array[ranInY - 2][ranInX].wall === true) {
                            if (array[ranInY - 1][ranInX - 1] === undefined || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === true)) {
                                if (array[ranInY - 1][ranInX + 1] === undefined || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === true)) {
                                    array[ranInY - 1][ranInX].wall = false;
                                    mazeArray.push(ranInX, ranInY - 1);
                                    errorCount = 0;
                                }
                            }
                        }else{
                            errorCount++;
                        }
                    }
                }else{
                    errorCount++;
                }
            }else if(setTurn===3){
                if (array[ranInY]!==undefined && array[ranInY][ranInX+1]!==undefined) {
                    if (array[ranInY] !== undefined && array[ranInY][ranInX+2] !== undefined) {
                        if (array[ranInY][ranInX+1].wall === true && array[ranInY][ranInX+2].wall === true) {
                            if ((array[ranInY + 1] === undefined || array[ranInY + 1][ranInX + 1] === undefined) || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === true)) {
                                if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX + 1] === undefined) || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === true)) {
                                    array[ranInY][ranInX + 1].wall = false;
                                    mazeArray.push(ranInX + 1, ranInY);
                                    errorCount = 0;
                                }
                            }
                        }else{
                            errorCount++;
                        }
                    }
                }else{
                    errorCount++;
                }
            }else if(setTurn===4){
                if (array[ranInY]!==undefined && array[ranInY][ranInX-1]!==undefined) {
                    if (array[ranInY] !== undefined && array[ranInY][ranInX-2] !== undefined) {
                        if (array[ranInY][ranInX-1].wall === true && array[ranInY][ranInX-2].wall === true) {
                            if ((array[ranInY + 1] === undefined ||array[ranInY + 1][ranInX - 1] === undefined) || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === true)) {
                                if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX - 1] === undefined) || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === true)) {
                                    array[ranInY][ranInX - 1].wall = false;
                                    mazeArray.push(ranInX - 1, ranInY);
                                    errorCount = 0;
                                }
                            }
                        }else{
                            errorCount++;
                        }
                    }
                }else{
                    errorCount++;
                }
            }
        }
        if (breakLength!==mazeArray.length){
            mainErrorCount=0
        }
        if (breakLength===mazeArray.length){
            mainErrorCount++
        }
    }
    return array
}

/*function createPass(inOutArr, levelArray) { //needs reworking
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
}*/

function drawGrid(array) {
    array.forEach(function (elem, indexY) {
        elem.forEach(function (object, indexX) {
            let newBlock = document.createElement("div");
            newBlock.classList.add("game_block");
            //adding class positions for troubleshooting
            newBlock.classList.add(`posX-${indexX}`);
            newBlock.classList.add(`posY-${indexY}`);
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

generateLevel(50,6);