import React, {Component} from "react";
import './GameGrid.scss';
import generateLevel from "../LevelGeneration/generateLevel";

class GameGrid extends Component{
    state={
        level:[],
        size:25, //min 10 max 50
        difficulty:2 //min 1 max 6
    };
    componentDidMount(){
        window.addEventListener("keydown",(e)=>{
            if(e.code==="KeyD" || e.code==="ArrowRight"){
                this.handleMoveRight()
            }else if(e.code==="KeyA" || e.code==="ArrowLeft"){
                this.handleMoveLeft()
            }else if(e.code==="KeyW" || e.code==="ArrowUp"){
                this.handleMoveUp()
            }else if(e.code==="KeyS" || e.code==="ArrowDown"){
                this.handleMoveDown()
            }
        })
    }
    componentWillUnmount() {
        //window.removeEventListener
    }
    shouldComponentUpdate(prevProps,prevState) {
        if (this.props.start !== prevProps.start){
            this.setState({level:generateLevel(this.state.size,this.state.difficulty)});
            return true
        }else if(this.state.difficulty !== prevState.difficulty){
            this.setState({level:generateLevel(this.state.size,this.state.difficulty)});
            return true
        }else return this.state.level[0] !== prevState.level[0];
    }
    handleMoveRight=()=>{
        let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]][position[0]+1].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]][position[0]+1].hasPlayer=1;
            position=[position[0]+1,position[1]];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }
    };
    handleMoveLeft=()=>{
        let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]][position[0]-1].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]][position[0]-1].hasPlayer=1;
            position=[position[0]-1,position[1]];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }
    };
    handleMoveUp=()=>{
        let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]-1][position[0]].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]-1][position[0]].hasPlayer=1;
            position=[position[0],position[1]-1];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }
    };
    handleMoveDown=()=>{
        let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]+1][position[0]].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]+1][position[0]].hasPlayer=1;
            position=[position[0],position[1]+1];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }
    };
    handleCompleted=()=>{
        if (this.state.difficulty<6){
            console.log("Brawo, pora na kolejny poziom")
            this.setState({difficulty:this.state.difficulty+1})
        }else if (this.state.difficulty===6){
            console.log("na ten moment nie ma więcej poziomów")
        }else if (this.state.size>50){
            console.log("brawo, nie ma więcej poziomów dla Ciebie")
        }else{
            console.log("coś jest nie tak")
        }
    }
    buildLevel(level,size){
        let output;
        if (level!==undefined){
            output = level.map((elem, indexY) => {
                return (
                    elem.map((object, indexX) => {
                        if (object.isEnter===1 && object.hasPlayer===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="enter" size={size} gotPlayer={1}/>
                        }else if(object.isEnter===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="enter" size={size} gotPlayer={0}/>
                        }else if(object.isExit===1 && object.hasPlayer===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="exit" size={size} gotPlayer={1}/>
                        }else if(object.isExit===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="exit" size={size} gotPlayer={0}/>
                        }else if(object.wall===0 && object.hasPlayer===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="pass" size={size} gotPlayer={1}/>
                        }else if(object.wall===0){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="pass" size={size} gotPlayer={0}/>
                        }else{
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="wall" size={size} />
                        }}))});
        }
        return output
    }
    render() {
        return <div className="game_grid" >{this.buildLevel(this.state.level[1],this.state.size)}</div>
    }
}

class GameBlock extends Component{
    shouldComponentUpdate(prevProps) {
        if(this.props.gotPlayer !== prevProps.gotPlayer){
            return true
        }else if(this.props.size !== prevProps.size){
            return true
        }else return this.props.class !== prevProps.class

    }
    render() {
        let style={width:100/this.props.size+"%", height:100/this.props.size+"%"}
        if(this.props.gotPlayer===1){
            return(
                <div className={`game_block ${this.props.class}`}
                     style={style}>
                    <div className="player"/>
                </div>
            )
        }else{
            return(
                <div className={`game_block ${this.props.class}`}
                     style={{width:100/this.props.size+"%", height:100/this.props.size+"%"}}/>)
        }
    }
}

export default GameGrid;