import React, {Component} from "react";
import ReactDOM from "react-dom";

class GameGrid extends Component{
    render() {
        return (<div className="game_grid">
            {this.props.level.map((elem, indexY) => {
                return (
                    elem.map((object, indexX) => {
                        if (object.isEnter===true){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="enter"/>
                        }else if(object.isExit===true){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="exit"/>
                        }else if(object.wall===false){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="pass"/>
                        }else{
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="wall"/>
                        }}))})}
        </div>)
    }
}
class GameBlock extends Component{

    render() {
        return <div className={`game_block ${this.props.class}`}/>
    }
}


class App extends Component{
    state={
        level:[]
    }
    handleCLick = ()=>{
        this.setState({level:generateLevel(50,6)})
    }
    render() {
        return (
            <>
                <div className="main-panel">
                    <p className="highscore">Higscore:</p>
                    <p className="score">Score:</p>
                    <p className="time">Time left:</p>
                    <button onClick={this.handleCLick}>Generate Level</button>
                </div>
                <GameGrid level={this.state.level}/>
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

function generateLevel(size,difficulty){
    let gridArray = newLevel(size);
    return createRoute(gridArray,difficulty*size);

}
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