function generateLevel(size,difficulty){
    let gridArray = newLevel(size);
    return createRoute(gridArray,difficulty*size);
}
function newLevel(gridSize){
    let level =[];
    for (let y=1;y<=gridSize;y++){
        let levelY=[];
        for (let x=1;x<=gridSize;x++){
            levelY.push({wall: 1,
                isEnter: 0,
                isExit: 0,
                hasPlayer:0
            });
        }
        level.push(levelY)
    }
    return level;
}
function createRoute(entryArray,length) {
    let passArray=[];
    let returnedObject;
    let array=entryArray;
    while(passArray.length<length) {
        returnedObject=newRoute(array,length);
        passArray=returnedObject.routePositions;
        array=newLevel(entryArray.length)
    }
    console.log()
    return [[passArray[0],passArray[1]], fillSpaces(returnedObject)];
}
function newRoute(entryArray,length) {
    let array=entryArray;
    //Entrance generation
    let ranInY = Math.floor(Math.random() * (array.length -2)+1);
    let ranInX = Math.floor(Math.random() * (array.length -2)+1);
    let passArray = [ranInX,ranInY];
    let errorCount=0;
    //sets entrance
    array[ranInY][ranInX].isEnter=1;
    array[ranInY][ranInX].hasPlayer=1;
    array[ranInY][ranInX].wall=0;
    while (passArray.length<length){
        let setTurn = Math.ceil(Math.random() * 4);
        ranInX = passArray[passArray.length-2];
        ranInY = passArray[passArray.length-1];
        if (errorCount>10){
            return {filledLevel:entryArray, routePositions:passArray};
        }else if (setTurn===1){
            if (array[ranInY+1]!==undefined && array[ranInY+1][ranInX]!==undefined) {
                if (array[ranInY + 2] !== undefined && array[ranInY + 2][ranInX] !== undefined) {
                    if (array[ranInY + 1][ranInX].wall === 1 && array[ranInY + 2][ranInX].wall === 1) {
                        if (array[ranInY + 1][ranInX - 1] === undefined || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === 1)) {
                            if (array[ranInY + 1][ranInX + 1] === undefined || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === 1)) {
                                array[ranInY + 1][ranInX].wall = 0;
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
                    if (array[ranInY - 1][ranInX].wall === 1 && array[ranInY - 2][ranInX].wall === 1) {
                        if (array[ranInY - 1][ranInX - 1] === undefined || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === 1)) {
                            if (array[ranInY - 1][ranInX + 1] === undefined || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === 1)) {
                                array[ranInY - 1][ranInX].wall = 0;
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
                    if (array[ranInY][ranInX+1].wall === 1 && array[ranInY][ranInX+2].wall === 1) {
                        if ((array[ranInY + 1] === undefined || array[ranInY + 1][ranInX + 1] === undefined) || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === 1)) {
                            if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX + 1] === undefined) || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === 1)) {
                                array[ranInY][ranInX + 1].wall = 0;
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
                    if (array[ranInY][ranInX-1].wall === 1 && array[ranInY][ranInX-2].wall === 1) {
                        if ((array[ranInY + 1] === undefined ||array[ranInY + 1][ranInX - 1] === undefined) || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === 1)) {
                            if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX - 1] === undefined) || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === 1)) {
                                array[ranInY][ranInX - 1].wall = 0;
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
    array[passArray[passArray.length-1]][passArray[passArray.length-2]].isExit=1;
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
            let setTurn = Math.ceil(Math.random() * 4);
            ranInX = mazeArray[mazeArray.length-2];
            ranInY = mazeArray[mazeArray.length-1];
            if (setTurn===1){
                if (array[ranInY+1]!==undefined && array[ranInY+1][ranInX]!==undefined) {
                    if (array[ranInY + 2] !== undefined && array[ranInY + 2][ranInX] !== undefined) {
                        if (array[ranInY + 1][ranInX].wall === 1 && array[ranInY + 2][ranInX].wall === 1) {
                            if (array[ranInY + 1][ranInX - 1] === undefined || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === 1)) {
                                if (array[ranInY + 1][ranInX + 1] === undefined || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === 1)) {
                                    array[ranInY + 1][ranInX].wall = 0;
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
                        if (array[ranInY - 1][ranInX].wall === 1 && array[ranInY - 2][ranInX].wall === 1) {
                            if (array[ranInY - 1][ranInX - 1] === undefined || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === 1)) {
                                if (array[ranInY - 1][ranInX + 1] === undefined || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === 1)) {
                                    array[ranInY - 1][ranInX].wall = 0;
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
                        if (array[ranInY][ranInX+1].wall === 1 && array[ranInY][ranInX+2].wall === 1) {
                            if ((array[ranInY + 1] === undefined || array[ranInY + 1][ranInX + 1] === undefined) || (array[ranInY + 1][ranInX + 1] !== undefined && array[ranInY + 1][ranInX + 1].wall === 1)) {
                                if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX + 1] === undefined) || (array[ranInY - 1][ranInX + 1] !== undefined && array[ranInY - 1][ranInX + 1].wall === 1)) {
                                    array[ranInY][ranInX + 1].wall = 0;
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
                        if (array[ranInY][ranInX-1].wall === 1 && array[ranInY][ranInX-2].wall === 1) {
                            if ((array[ranInY + 1] === undefined ||array[ranInY + 1][ranInX - 1] === undefined) || (array[ranInY + 1][ranInX - 1] !== undefined && array[ranInY + 1][ranInX - 1].wall === 1)) {
                                if ((array[ranInY - 1] === undefined ||array[ranInY - 1][ranInX - 1] === undefined) || (array[ranInY - 1][ranInX - 1] !== undefined && array[ranInY - 1][ranInX - 1].wall === 1)) {
                                    array[ranInY][ranInX - 1].wall = 0;
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

export default generateLevel;