import React, {Component} from "react";
import './GameGrid.scss';


class GameGrid extends Component{
    render() {
        return (<div className="game_grid">
            {this.props.level.map((elem, indexY) => {
                return (
                    elem.map((object, indexX) => {
                        if (object.isEnter===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="enter"/>
                        }else if(object.isExit===1){
                            return <GameBlock key={`X${indexX}Y${indexY}`} class="exit"/>
                        }else if(object.wall===0){
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

export default GameGrid;