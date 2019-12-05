import React, {Component} from "react";
import './GameContainer.scss'
import GameGrid from "../GameGrid/GameGrid";
import generateLevel from "../LevelGeneration/generateLevel";

class GameContainer extends Component{
    state={
        singleBlockSize:window.innerHeight*0.88/this.props.genSettings.entrySize,
        level:[],
        size:this.props.genSettings.entrySize, //min 10 max 50
        difficulty:this.props.genSettings.entryDifficulty, //min 1 max 6
        player1positionAbsolute:[0,0],
        player1positionRelative:[0,0],
        player1moving:"standby"

    };
    shouldComponentUpdate(prevProps, prevState) {
        let lvl;
        let singleBlockSize=this.state.singleBlockSize;
        if (this.props.start !== prevProps.start) {
            lvl = generateLevel(this.state.size, this.state.difficulty);
        }else if (this.state.difficulty !== prevState.difficulty && this.state.size !== prevState.size) {
            lvl = generateLevel(this.state.size + 5, 3);
            singleBlockSize=window.innerHeight*0.88/(this.state.size+5)
        } else if (this.state.size !== prevState.size) {
            lvl = generateLevel(this.state.size + 5, this.state.difficulty);
            singleBlockSize=window.innerHeight*0.88/(this.state.size+5)
        } else if (this.state.difficulty !== prevState.difficulty) {
            lvl = generateLevel(this.state.size, this.state.difficulty + 1)
        }else if(this.state.player1positionRelative!==prevState.player1positionRelative){
            return true
        }else {
            return this.state.level[0] !== prevState.level[0];
        }
        this.setState({
            singleBlockSize: singleBlockSize,
            level: lvl,
            player1positionAbsolute:lvl[0],
            player1positionRelative:[this.state.singleBlockSize/8,this.state.singleBlockSize/2],
            player1moving:"standby"});
        return true

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
        });
        window.addEventListener("resize", ()=>{
            let singleBlockSize;
            if (this.state.size!==this.props.genSettings.entrySize){
                singleBlockSize=window.innerHeight*0.88/this.state.size
            }else{
                singleBlockSize=window.innerHeight*0.88/this.props.genSettings.entrySize
            }
            this.setState({
                singleBlockSize:singleBlockSize
            })
        })
    }
    handleMoveRight=()=>{
        let singleBlockSize = this.state.singleBlockSize;
        let positionAbsolute= this.state.player1positionAbsolute;
        let positionRelative= [this.state.player1positionRelative[0]+4,
            this.state.player1positionRelative[1]];
        if (positionRelative[0]+(singleBlockSize*0.75)>singleBlockSize && (positionRelative[1]<0 || positionRelative[1]+(singleBlockSize*0.25)>singleBlockSize)){
            positionRelative=this.state.player1positionRelative
        }else if(positionRelative[0]+(singleBlockSize*0.75)>singleBlockSize){
            let offset = positionRelative[0]-(singleBlockSize*0.25);
            positionAbsolute=[positionAbsolute[0]+1,positionAbsolute[1]];
            positionRelative=[offset-(singleBlockSize*0.75),positionRelative[1]]
        }
        if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].isExit===1){
            this.handleCompleted()
        }else if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].wall===0){
            this.setState({player1positionAbsolute: positionAbsolute, player1positionRelative: positionRelative, player1moving:"move-right"})
        }
    };
    handleMoveLeft=()=>{
        let singleBlockSize = this.state.singleBlockSize;
        let positionAbsolute= this.state.player1positionAbsolute;
        let positionRelative= [this.state.player1positionRelative[0]-4,
            this.state.player1positionRelative[1]];
        if (positionRelative[0]<0 && (positionRelative[1]<0 || positionRelative[1]+(singleBlockSize*0.25)>singleBlockSize)){
            positionRelative=this.state.player1positionRelative
        }else if(positionRelative[0]<0){
            let offset = singleBlockSize;
            positionAbsolute=[positionAbsolute[0]-1,positionAbsolute[1]];
            positionRelative=[offset,positionRelative[1]]
        }
        if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].isExit===1){
            this.handleCompleted()
        }else if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].wall===0){
            this.setState({player1positionAbsolute: positionAbsolute, player1positionRelative: positionRelative, player1moving:"move-left"})
        }
    };
    handleMoveUp=()=>{
        let singleBlockSize = this.state.singleBlockSize;
        let positionAbsolute= this.state.player1positionAbsolute;
        let positionRelative= [this.state.player1positionRelative[0],
            this.state.player1positionRelative[1]-4];
        if (positionRelative[1]<0 && (positionRelative[0]<0 || positionRelative[0]+(singleBlockSize*0.75)>singleBlockSize)){
            positionRelative=this.state.player1positionRelative
        }else if(positionRelative[1]<0){
            let offset = singleBlockSize;
            positionAbsolute=[positionAbsolute[0],positionAbsolute[1]-1];
            positionRelative=[positionRelative[0],offset]
        }
        if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].isExit===1){
            this.handleCompleted()
        }else if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].wall===0){
            this.setState({player1positionAbsolute: positionAbsolute, player1positionRelative: positionRelative, player1moving:"move-up"})
        }
    };
    handleMoveDown=()=>{
        let singleBlockSize = this.state.singleBlockSize;
        let positionAbsolute= this.state.player1positionAbsolute;
        let positionRelative= [this.state.player1positionRelative[0],
            this.state.player1positionRelative[1]+4];
        if (positionRelative[1]+(singleBlockSize*0.25)>singleBlockSize && (positionRelative[0]<0 || positionRelative[0]+(singleBlockSize*0.75)>singleBlockSize)){
            positionRelative=this.state.player1positionRelative
        }else if(positionRelative[1]+(singleBlockSize*0.25)>singleBlockSize){
            let offset = positionRelative[1]-(singleBlockSize*0.75);
            positionAbsolute=[positionAbsolute[0],positionAbsolute[1]+1];
            positionRelative=[positionRelative[0],offset-(singleBlockSize*0.25)]
        }
        if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].isExit===1){
            this.handleCompleted()
        }else if (this.state.level[1][positionAbsolute[1]][positionAbsolute[0]].wall===0){
            this.setState({player1positionAbsolute: positionAbsolute, player1positionRelative: positionRelative, player1moving:"move-down"})
        }
    };
    handleCompleted=()=>{
        if (this.state.difficulty<6){
            console.log("Brawo, pora na kolejny poziom");
            this.setState({difficulty:this.state.difficulty+1})
        }else if (this.state.difficulty===6){
            console.log("Brawo, pora na kolejny poziom");
            this.setState({difficulty:3, size:this.state.size+5, singleBlockSize:window.innerHeight*0.88/(this.state.size+5)})
        }else if (this.state.size>60){
            console.log("brawo, ale nie ma więcej poziomów dla Ciebie")
        }else{
            console.log("coś jest nie tak")
        }
    };
    render() {
        if(this.state.level.length!==0){
            let posTop = (this.state.player1positionAbsolute[1] * this.state.singleBlockSize + this.state.player1positionRelative[1]) - this.state.singleBlockSize*this.state.size;
            let posLeft = this.state.player1positionAbsolute[0] * this.state.singleBlockSize + this.state.player1positionRelative[0];
            let playerShadow = this.state.singleBlockSize/4;
            let playerShadowWidth = playerShadow*3;
            let offsetTop = -(playerShadow*2)+32*((10/this.state.size)-1);
            let offsetLeft = 32*((10/this.state.size)-1);
            return(
                <div className="game__container">
                    <GameGrid level={this.state.level[1]} size={this.state.singleBlockSize}/>
                    <div className="player__shadow" style={{top:posTop+"px", left:posLeft+"px", height:playerShadow, width:playerShadowWidth}}>
                        <div className={`character ${this.state.player1moving}`} style={{top:offsetTop, left:offsetLeft, transform:`scale(${10/this.state.size})`}}/>
                    </div>
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