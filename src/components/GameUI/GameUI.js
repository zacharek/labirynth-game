import React, {Component} from "react";
import './GameUI.scss'
import GameContainer from "../GameContainer/GameContainer";

class GameUI extends Component{
    state={
        restarted:0
    }
    handleClickRestart = ()=>{
        this.setState({restarted:this.state.restarted+1})
    };
    render() {
        return(
            <div className="game__ui">
                <div className="menu__content">
                    <h2>MENU</h2>
                    <button onClick={this.handleClickRestart}>RESTART</button>
                    <button onClick={this.props.handleExit}>EXIT</button>
                </div>
                <div className="main">
                    <GameContainer start={this.state.restarted} genSettings={this.props.genSettings}/>
                </div>
                <div className="players__info">
                    <h2>PLAYER</h2>
                    <p>SCORE</p>
                    <p>0</p>
                </div>
            </div>
        )
    }
}

export default GameUI;