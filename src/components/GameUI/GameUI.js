import React, {Component} from "react";
import './GameUI.scss'
import GameContainer from "../GameContainer/GameContainer";

class GameUI extends Component{
    state={
        restarted:0,
        score:0
    };
    handleClickRestart = ()=>{
        this.setState({restarted:this.state.restarted+1})
    };
    handleScore=(size,difficulty)=>{
        let score=this.state.score + (this.props.genSettings.entrySize/10)*(size*difficulty);
        this.setState({score:score})
    };
    render() {
        return(
            <div className="game__ui">
                <div className="menu__content">
                    <h2>MENU</h2>
                    <div onClick={this.handleClickRestart}>RESTART</div>
                    <div onClick={this.props.handleExit}>EXIT</div>
                </div>
                <div className="main">
                    <GameContainer start={this.state.restarted} genSettings={this.props.genSettings} score={(size,difficulty)=>this.handleScore(size,difficulty)} startOnClick={this.handleClickRestart}/>
                </div>
                <div className="players__info">
                    <h2>PLAYER</h2>
                    <p>SCORE</p>
                    <p>{this.state.score}</p>
                </div>
            </div>
        )
    }
}

export default GameUI;