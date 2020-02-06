import React, {Component} from "react";
import './App.scss';
import EntryUI from "../EntryUI/EntryUI";
import MenuStandard from "../Menu/Standard/MenuStandard";
import GameUI from "../GameUI/GameUI";

class App extends Component{
    state={
        firstEntry:1,
        inGame:0,
        generationSettings:{
            entryDifficulty:2,
            entrySize:10
        },
        difficulty:1
    };
    handleClickEntry = ()=>{
        this.setState({firstEntry:0})
    };
    handleClickPlay = ()=>{
        this.setState({inGame:1})
    };
    handleClickMenu = ()=>{
        this.setState({inGame:0})
    };
    handleSetDifficulty=(e)=>{
        let genSettings ={
            entryDifficulty:2,
            entrySize:10
        };
        if (e===2){
            genSettings ={
                entryDifficulty:3,
                entrySize:20
            }
        }else if(e===3){
            genSettings ={
                entryDifficulty:3,
                entrySize:30
            }
        }
        this.setState({generationSettings:genSettings, difficulty:e})
    };
    render() {
        if (this.state.firstEntry!==0){
            return <EntryUI handleClick={this.handleClickEntry}/>
        }else if(this.state.inGame!==0){
            return <GameUI handleExit={this.handleClickMenu} genSettings={this.state.generationSettings}/>
        }else{
            return <MenuStandard handlePlay={this.handleClickPlay} handleDifficulty={this.handleSetDifficulty} difficulty={this.state.difficulty}/>
        }
    }
}

export default App;