import React, {Component} from "react";
import './GameContainer.scss'
import GameGrid from "../GameGrid/GameGrid";
import generateLevel from "../LevelGeneration/generateLevel";

class GameContainer extends Component{
    state={
        level:[],
        size:this.props.genSettings.entrySize, //min 10 max 50
        difficulty:this.props.genSettings.entryDifficulty, //min 1 max 6
        player1:{
            positionAbsolute:[0,0],
            positionRelative:[0,0]
        }
    };
    shouldComponentUpdate(prevProps, prevState) {
        let lvl
        if (this.props.start !== prevProps.start) {
            lvl = generateLevel(this.state.size, this.state.difficulty)
            this.setState({level: lvl,
                player1:{positionAbsolute:lvl[0],
                    positionRelative:[0,0]}})
            return true
        } else if(this.state.player1.positionRelative!==prevState.player1.positionRelative){
            return true
        }else return this.state.level[0] !== prevState.level[0];


        /*let lvl
        if (this.props.start !== prevProps.start) {
            lvl = generateLevel(this.state.size, this.state.difficulty)
        } else if (this.state.difficulty !== prevState.difficulty && this.state.size !== prevState.size) {
            lvl = generateLevel(this.state.size + 5, 3)
        } else if (this.state.size !== prevState.size) {
            lvl = generateLevel(this.state.size + 5, this.state.difficulty)
        } else if (this.state.difficulty !== prevState.difficulty) {
            lvl = generateLevel(this.state.size, this.state.difficulty + 1)
        } else {
            return this.state.level[0] !== prevState.level[0];
        }
        this.setState({level: lvl})
        return true*/
    }

    componentDidMount(){
        window.addEventListener("keydown",(e)=>{
            if(e.code==="KeyD" || e.code==="ArrowRight"){
                this.handleMoveRight()
            }else if(e.code==="KeyA" || e.code==="ArrowLeft"){
                this.handleMoveLeft()
            }else if(e.code==="KeyW" || e.code==="ArrowUp"){
                this.handleMoveUp()
            }else if(e.code==="KeyS" || e.code==="ArrowDown"){
                this.handleMoveDown()
            }
        })
    }
    handleMoveRight=()=>{
        /*let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]][position[0]+1].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]][position[0]+1].hasPlayer=1;
            position=[position[0]+1,position[1]];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }*/
        let position={ positionAbsolute:[],
            positionRelative:[this.state.player1.positionRelative[0]+10,this.state.player1.positionRelative[1]]}
        this.setState({player1:position})
    };
    handleMoveLeft=()=>{
        /*let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]][position[0]-1].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]][position[0]-1].hasPlayer=1;
            position=[position[0]-1,position[1]];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }*/
        let position={ positionAbsolute:[],
            positionRelative:[this.state.player1.positionRelative[0]-10,this.state.player1.positionRelative[1]]}
        this.setState({player1:position})
    };
    handleMoveUp=()=>{
        /*let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]-1][position[0]].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]-1][position[0]].hasPlayer=1;
            position=[position[0],position[1]-1];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }*/
        let position={ positionAbsolute:[],
            positionRelative:[this.state.player1.positionRelative[0],this.state.player1.positionRelative[1]-10]}
        this.setState({player1:position})
    };
    handleMoveDown=()=>{
        /*let level = this.state.level[1];
        let position = this.state.level[0];
        if(level[position[1]+1][position[0]].wall===0){
            level[position[1]][position[0]].hasPlayer=0;
            level[position[1]+1][position[0]].hasPlayer=1;
            position=[position[0],position[1]+1];
            this.setState({level:[position,level]})
        }
        if (level[position[1]][position[0]].isExit===1){
            this.handleCompleted()
        }*/
        let position={ positionAbsolute:[],
            positionRelative:[this.state.player1.positionRelative[0],this.state.player1.positionRelative[1]+10]}
        this.setState({player1:position})
    };
    render() {
        if(this.state.level.length!==0){
            return(
                <div className="game__container">
                    <div className="divek" style={{top:this.state.player1.positionRelative[1]+"px",left:this.state.player1.positionRelative[0]+"px"}}></div>
                    <GameGrid level={this.state.level[1]} size={this.state.size}/>
                </div>
            )
        }else{
            return(
                <div className="game__container">
                </div>
            )
        }

    }
}

export default GameContainer;