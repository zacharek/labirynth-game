import React, {Component} from "react";
import './App.scss';
import GameGrid from "../GameGrid/GameGrid";
import generateLevel from "../LevelGeneration/generateLevel";

class App extends Component{
    state={
        level:[]
    };
    handleCLick = ()=>{
        this.setState({level:generateLevel(50,6)})
    };
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

export default App;