import React, {Component} from "react";
import './App.scss';
import GameGrid from "../GameGrid/GameGrid";
import generateLevel from "../LevelGeneration/generateLevel";



class App extends Component{
    state={
        level:[],
        size:10,
        difficulty:6,
    };
    handleCLick = ()=>{
        this.setState({level:generateLevel(this.state.size,this.state.difficulty)})
    };
    render() {
        if(this.state.level.length!==0){
            return (
                <>
                    <button onClick={this.handleCLick}>Generate Level</button>
                    <GameGrid level={this.state.level[1]} size={this.state.size} enter={this.state.level[0]}/>
                </>
            )
        }else{
            return (
                <>
                    <button onClick={this.handleCLick}>Generate Level</button>
                </>
            )
        }
    }
}

export default App;