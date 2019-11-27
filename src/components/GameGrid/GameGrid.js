import React, {Component} from "react";
import './GameGrid.scss';
import generateLevel from "../LevelGeneration/generateLevel";


class GameGrid extends Component{


    /*shouldComponentUpdate(prevProps) {
        if (this.props.enter !== prevProps.enter){
            return true
        }else{
            return false
        }
    }*/
    componentDidMount() {
        window.addEventListener("keydown",(e)=>{
            if(this.props.level.length!==0){
                if(e.code==="KeyD" || e.code==="ArrowRight"){
                    //this.handleMoveRight(e.code)
                    this.handleMove(e.code)
                }else if(e.code==="KeyA" || e.code==="ArrowLeft"){
                    //this.handleMoveLeft(e.code)
                    this.handleMove(e.code)

                }else if(e.code==="KeyW" || e.code==="ArrowUp"){
                    //this.handleMoveUp(e.code)
                    this.handleMove(e.code)

                }else if(e.code==="KeyS" || e.code==="ArrowDown"){
                    //this.handleMoveDown(e.code)
                    this.handleMove(e.code)

                }
            }
        })
    }
    componentWillUnmount() {

    }

    handleMoveRight=(e)=> {
        console.log(this)
    }
    handleMoveLeft=(e)=>{
        console.log("toje: ",e)
    }
    handleMoveUp=(e)=>{
        console.log("toje: ",e)
    }
    handleMoveDown=(e)=>{
        console.log("toje: ",e)
    }
    handleMove=(e)=>{
        console.log("tojeja i :", e)
        console.log(this)
    }
    render() {
        let grid = this.props.level.map((elem, indexY) => {
            return (
                elem.map((object, indexX) => {
                    if (object.isEnter===1){
                        return <GameBlock key={`X${indexX}Y${indexY}`} class="enter" size={this.props.size} gotPlayer={1}/>
                    }else if(object.isExit===1){
                        return <GameBlock key={`X${indexX}Y${indexY}`} class="exit" size={this.props.size} gotPlayer={0}/>
                    }else if(object.wall===0){
                        return <GameBlock key={`X${indexX}Y${indexY}`} class="pass" size={this.props.size} gotPlayer={0}/>
                    }else{
                        return <GameBlock key={`X${indexX}Y${indexY}`} class="wall" size={this.props.size} />
                    }}))});

        console.log(grid[4][4])
        console.log(grid[this.props.enter[1]][this.props.enter[0]].props.gotPlayer)

        return <div className="game_grid" >{grid}</div>
    }
}

class GameBlock extends Component{
    shouldComponentUpdate(prevProps) {
        if (this.props.gotPlayer !== prevProps.gotPlayer ||
            this.props.class !== prevProps.class) {
            //this.fetchData(this.props.gotPlayer);
            //console.log("update")
            return true
        }else{
            return false
        }
    }

    render() {
        if(this.props.gotPlayer===1){
            return(
                <div className={`game_block ${this.props.class}`}
                     style={{width:100/this.props.size+"%", height:100/this.props.size+"%"}}>
                    <Player/>
                </div>
            )
        }else{
            return(
                <div className={`game_block ${this.props.class}`}
                     style={{width:100/this.props.size+"%", height:100/this.props.size+"%"}}>
                </div>
            )
        }
    }
}

function Player(){
    return <div className="player"/>
}

export default GameGrid;