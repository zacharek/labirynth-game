import React, {Component} from "react";
import './GameGrid.scss';

class GameGrid extends Component{
    shouldComponentUpdate(prevProps) {
        return this.props.level !== prevProps.level;
    }
    buildLevel(level){
        let output;
        if (level!==undefined){
            output = level.map((elem, indexY) => {
                return (
                    elem.map((object, indexX) => {
                        if(object.isEnter===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="enter" size={this.props.size}/>
                        }else if(object.isExit===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="exit" size={this.props.size}/>
                        }else if(object.wall===0){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="pass" size={this.props.size}/>
                        }else{
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="wall" size={this.props.size} />
                        }})

                )});
        }
        return output
    }
    render() {
        return <div className="game_grid">{this.buildLevel(this.props.level,this.props.size)}</div>
    }
}

class GameBlock extends Component{
    shouldComponentUpdate(prevProps) {
        if(this.props.size !== prevProps.size){
            return true
        }else return this.props.class !== prevProps.class

    }
    render() {
        return(<div className={`game_block ${this.props.class}`}
                    style={{width:this.props.size+"px", height:this.props.size+"px"}}/>)
    }
}

export default GameGrid;