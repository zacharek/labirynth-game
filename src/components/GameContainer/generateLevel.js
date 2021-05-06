function generateLevel(size, difficulty) {
    let gridArray = newLevel(size);
    return createRoute(gridArray, difficulty * size);
}
function newLevel(gridSize) {
    let level = [];
    for (let y = 1; y <= gridSize; y++) {
        let levelY = [];
        for (let x = 1; x <= gridSize; x++) {
            levelY.push({
                wall: 1,
                isEnter: 0,
                isExit: 0
            });
        }
        level.push(levelY)
    }
    return level;
}
function caclRandNum (min = 1, max = 2) {
  return Math.floor(Math.random() * max + min)
}
function createRoute(entryArray, length) {
    let passArray = [];
    let returnedObject;
    let array = entryArray;
    while (passArray.length < length) {
        returnedObject = newRoute(array, length);
        passArray = returnedObject.routePositions;
        array = newLevel(entryArray.length)
    }
    return [[passArray[0], passArray[1]], fillSpaces(returnedObject)];
}
function calcRandTurnDirection(){
  const possibleTurns = ['up', 'down', 'left', 'right']
  const index = caclRandNum(0, 3)

  return possibleTurns[index]
}
function newRoute(entryArray, length) {
    let array = entryArray;
    //Entrance generation
    let randInY = caclRandNum(1, array.length - 2)
    let randInX = caclRandNum(1, array.length - 2)
    let passArray = [randInX, randInY];
    let errorCount = 0;
    //sets entrance
    array[randInY][randInX].isEnter = 1;
    array[randInY][randInX].wall = 0;
    while (passArray.length < length) {
        const setTurn = calcRandTurnDirection()
        randInX = passArray[passArray.length - 2];
        randInY = passArray[passArray.length - 1];
        // TODO: move all conditionals into switch, make independet fn from it
        // switch(setTurn) {
        //   case 'up':

        //     break
        //   case 'down':

        //     break
        //   case 'left':

        //     break
        //   case 'right':

        //     break
        //   default:
        //     errorCount++
        // }
        if (errorCount > 10) {
            return { filledLevel: entryArray, routePositions: passArray };
        } else if (setTurn === 'down') {
            if (array[randInY + 1] !== undefined && array[randInY + 1][randInX] !== undefined) {
                if (array[randInY + 2] !== undefined && array[randInY + 2][randInX] !== undefined) {
                    if (array[randInY + 1][randInX].wall === 1 && array[randInY + 2][randInX].wall === 1) {
                        if (array[randInY + 1][randInX - 1] === undefined || (array[randInY + 1][randInX - 1] !== undefined && array[randInY + 1][randInX - 1].wall === 1)) {
                            if (array[randInY + 1][randInX + 1] === undefined || (array[randInY + 1][randInX + 1] !== undefined && array[randInY + 1][randInX + 1].wall === 1)) {
                                array[randInY + 1][randInX].wall = 0;
                                passArray.push(randInX, randInY + 1);
                                errorCount = 0;
                            }
                        }
                    } else {
                        errorCount++;
                    }
                }
            } else {
                errorCount++;
            }
        } else if (setTurn === 'up') {
            if (array[randInY - 1] !== undefined && array[randInY - 1][randInX] !== undefined) {
                if (array[randInY - 2] !== undefined && array[randInY - 2][randInX] !== undefined) {
                    if (array[randInY - 1][randInX].wall === 1 && array[randInY - 2][randInX].wall === 1) {
                        if (array[randInY - 1][randInX - 1] === undefined || (array[randInY - 1][randInX - 1] !== undefined && array[randInY - 1][randInX - 1].wall === 1)) {
                            if (array[randInY - 1][randInX + 1] === undefined || (array[randInY - 1][randInX + 1] !== undefined && array[randInY - 1][randInX + 1].wall === 1)) {
                                array[randInY - 1][randInX].wall = 0;
                                passArray.push(randInX, randInY - 1);
                                errorCount = 0;
                            }
                        }
                    } else {
                        errorCount++;
                    }
                }
            } else {
                errorCount++;
            }
        } else if (setTurn === 'right') {
            if (array[randInY] !== undefined && array[randInY][randInX + 1] !== undefined) {
                if (array[randInY] !== undefined && array[randInY][randInX + 2] !== undefined) {
                    if (array[randInY][randInX + 1].wall === 1 && array[randInY][randInX + 2].wall === 1) {
                        if ((array[randInY + 1] === undefined || array[randInY + 1][randInX + 1] === undefined) || (array[randInY + 1][randInX + 1] !== undefined && array[randInY + 1][randInX + 1].wall === 1)) {
                            if ((array[randInY - 1] === undefined || array[randInY - 1][randInX + 1] === undefined) || (array[randInY - 1][randInX + 1] !== undefined && array[randInY - 1][randInX + 1].wall === 1)) {
                                array[randInY][randInX + 1].wall = 0;
                                passArray.push(randInX + 1, randInY);
                                errorCount = 0;
                            }
                        }
                    } else {
                        errorCount++;
                    }
                }
            } else {
                errorCount++;
            }
        } else if (setTurn === 'left') {
            if (array[randInY] !== undefined && array[randInY][randInX - 1] !== undefined) {
                if (array[randInY] !== undefined && array[randInY][randInX - 2] !== undefined) {
                    if (array[randInY][randInX - 1].wall === 1 && array[randInY][randInX - 2].wall === 1) {
                        if ((array[randInY + 1] === undefined || array[randInY + 1][randInX - 1] === undefined) || (array[randInY + 1][randInX - 1] !== undefined && array[randInY + 1][randInX - 1].wall === 1)) {
                            if ((array[randInY - 1] === undefined || array[randInY - 1][randInX - 1] === undefined) || (array[randInY - 1][randInX - 1] !== undefined && array[randInY - 1][randInX - 1].wall === 1)) {
                                array[randInY][randInX - 1].wall = 0;
                                passArray.push(randInX - 1, randInY);
                                errorCount = 0;
                            }
                        }
                    } else {
                        errorCount++;
                    }
                }
            } else {
                errorCount++;
            }
        }
    }
    array[passArray[passArray.length - 1]][passArray[passArray.length - 2]].isExit = 1;
    return { filledLevel: array, routePositions: passArray };
}

function fillSpaces(object) {
    let mazeArray = object.routePositions;
    let array = object.filledLevel;
    let breakLength = 0;
    let mainErrorCount = 0;
    while (breakLength !== mazeArray.length || mainErrorCount < array.length * 5) {
        breakLength = mazeArray.length;
        let errorCount = 0;
        let ranPos = Math.round(Math.random() * mazeArray.length / 2) * 2;
        let randInX = mazeArray[ranPos];
        let randInY = mazeArray[ranPos + 1];
        mazeArray.splice(ranPos, 2);
        mazeArray.push(randInX);
        mazeArray.push(randInY);
        while (errorCount < 10) {
            let setTurn = Math.ceil(Math.random() * 4);
            randInX = mazeArray[mazeArray.length - 2];
            randInY = mazeArray[mazeArray.length - 1];
            if (setTurn === 1) {
                if (array[randInY + 1] !== undefined && array[randInY + 1][randInX] !== undefined) {
                    if (array[randInY + 2] !== undefined && array[randInY + 2][randInX] !== undefined) {
                        if (array[randInY + 1][randInX].wall === 1 && array[randInY + 2][randInX].wall === 1) {
                            if (array[randInY + 1][randInX - 1] === undefined || (array[randInY + 1][randInX - 1] !== undefined && array[randInY + 1][randInX - 1].wall === 1)) {
                                if (array[randInY + 1][randInX + 1] === undefined || (array[randInY + 1][randInX + 1] !== undefined && array[randInY + 1][randInX + 1].wall === 1)) {
                                    array[randInY + 1][randInX].wall = 0;
                                    mazeArray.push(randInX, randInY + 1);
                                    errorCount = 0;
                                }
                            }
                        } else {
                            errorCount++;
                        }
                    }
                } else {
                    errorCount++;
                }
            } else if (setTurn === 2) {
                if (array[randInY - 1] !== undefined && array[randInY - 1][randInX] !== undefined) {
                    if (array[randInY - 2] !== undefined && array[randInY - 2][randInX] !== undefined) {
                        if (array[randInY - 1][randInX].wall === 1 && array[randInY - 2][randInX].wall === 1) {
                            if (array[randInY - 1][randInX - 1] === undefined || (array[randInY - 1][randInX - 1] !== undefined && array[randInY - 1][randInX - 1].wall === 1)) {
                                if (array[randInY - 1][randInX + 1] === undefined || (array[randInY - 1][randInX + 1] !== undefined && array[randInY - 1][randInX + 1].wall === 1)) {
                                    array[randInY - 1][randInX].wall = 0;
                                    mazeArray.push(randInX, randInY - 1);
                                    errorCount = 0;
                                }
                            }
                        } else {
                            errorCount++;
                        }
                    }
                } else {
                    errorCount++;
                }
            } else if (setTurn === 3) {
                if (array[randInY] !== undefined && array[randInY][randInX + 1] !== undefined) {
                    if (array[randInY] !== undefined && array[randInY][randInX + 2] !== undefined) {
                        if (array[randInY][randInX + 1].wall === 1 && array[randInY][randInX + 2].wall === 1) {
                            if ((array[randInY + 1] === undefined || array[randInY + 1][randInX + 1] === undefined) || (array[randInY + 1][randInX + 1] !== undefined && array[randInY + 1][randInX + 1].wall === 1)) {
                                if ((array[randInY - 1] === undefined || array[randInY - 1][randInX + 1] === undefined) || (array[randInY - 1][randInX + 1] !== undefined && array[randInY - 1][randInX + 1].wall === 1)) {
                                    array[randInY][randInX + 1].wall = 0;
                                    mazeArray.push(randInX + 1, randInY);
                                    errorCount = 0;
                                }
                            }
                        } else {
                            errorCount++;
                        }
                    }
                } else {
                    errorCount++;
                }
            } else if (setTurn === 4) {
                if (array[randInY] !== undefined && array[randInY][randInX - 1] !== undefined) {
                    if (array[randInY] !== undefined && array[randInY][randInX - 2] !== undefined) {
                        if (array[randInY][randInX - 1].wall === 1 && array[randInY][randInX - 2].wall === 1) {
                            if ((array[randInY + 1] === undefined || array[randInY + 1][randInX - 1] === undefined) || (array[randInY + 1][randInX - 1] !== undefined && array[randInY + 1][randInX - 1].wall === 1)) {
                                if ((array[randInY - 1] === undefined || array[randInY - 1][randInX - 1] === undefined) || (array[randInY - 1][randInX - 1] !== undefined && array[randInY - 1][randInX - 1].wall === 1)) {
                                    array[randInY][randInX - 1].wall = 0;
                                    mazeArray.push(randInX - 1, randInY);
                                    errorCount = 0;
                                }
                            }
                        } else {
                            errorCount++;
                        }
                    }
                } else {
                    errorCount++;
                }
            }
        }
        if (breakLength !== mazeArray.length) {
            mainErrorCount = 0
        }
        if (breakLength === mazeArray.length) {
            mainErrorCount++
        }
    }
    return array
}

export default generateLevel;