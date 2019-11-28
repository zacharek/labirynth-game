import React, {Component} from "react";
import './GameContainer.scss'
import GameGrid from "../GameGrid/GameGrid";

class GameContainer extends Component{
    render() {
        return(
            <div className="game__container">
                <GameGrid start={this.props.start} genSettings={this.props.genSettings}/>
            </div>
        )
    }
}

export default GameContainer;