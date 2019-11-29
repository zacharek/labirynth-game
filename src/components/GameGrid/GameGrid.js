import React, {Component} from "react";
import './GameGrid.scss';

class GameGrid extends Component{
    handleCompleted=()=>{
        if (this.state.difficulty<6){
            console.log("Brawo, pora na kolejny poziom")
            this.setState({difficulty:this.state.difficulty+1})
        }else if (this.state.difficulty===6){
            console.log("na ten moment nie ma więcej poziomów")
            this.setState({difficulty:3, size:this.state.size+5})
        }else if (this.state.size>50){
            console.log("brawo, ale nie ma więcej poziomów dla Ciebie")
        }else{
            console.log("coś jest nie tak")
        }
    };
    shouldComponentUpdate(prevProps) {
        if (this.props.level!==prevProps.level){
            return true
        }else return false
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
        return <div className="game_grid" >{this.buildLevel(this.props.level,this.props.size)}</div>
    }
}

class GameBlock extends Component{
    shouldComponentUpdate(prevProps) {
        if(this.props.size !== prevProps.size){
            return true
        }else return this.props.class !== prevProps.class

    }
    render() {
        return(
            <div className={`game_block ${this.props.class}`}
                 style={{width:100/this.props.size+"%", height:100/this.props.size+"%"}}/>)

    }
}

export default GameGrid;