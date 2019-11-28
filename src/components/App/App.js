import React, {Component} from "react";
import './App.scss';
import GameGrid from "../GameGrid/GameGrid";

class App extends Component{
    state={
        restarted:0
    };
    handleCLick = ()=>{
        this.setState({restarted:this.state.restarted+1})
    };
    render() {
            return (
                <>
                    <button onClick={this.handleCLick}>Generate Level</button>
                    <GameGrid start={this.state.restarted}/>
                </>
            )
    }
}

export default App;