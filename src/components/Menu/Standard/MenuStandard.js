import React, {Component} from "react";
import './MenuStandard.scss'
import Credits from "../Credits/Credits";

class MenuStandard extends Component{
    state={
        credits:false
    };
    handleCredits=()=>{
        this.setState({credits:!this.state.credits})
    };
    render() {
        if (this.state.credits!==true){
            return(
                <div className="menu__standard">
                    <h1>MAIN MENU</h1>
                    <div className="menu__content">
                        <div className="difficulty__box">
                            <h3>DIFFICULTY</h3>
                            <ul>
                                <li className={this.props.difficulty===1&&"selected"} onClick={()=>this.props.handleDifficulty(1)}>EASY</li>
                                <li className={this.props.difficulty===2&&"selected"} onClick={()=>this.props.handleDifficulty(2)}>NORMAL</li>
                                <li className={this.props.difficulty===3&&"selected"} onClick={()=>this.props.handleDifficulty(3)}>HARD</li>
                            </ul>
                        </div>
                        <div className="main">
                            <div className="play" onClick={this.props.handlePlay}>PLAY</div>
                            <div className="credits" onClick={this.handleCredits}>CREDITS</div>
                        </div>
                        <div className="character__selection">
                            <h3>CHARACTER</h3>
                            <div className="character__slider">
                                <div className="character in__menu standby"/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                //do skrócenia
                <div className="menu__standard">
                    <h1>MAIN MENU</h1>
                    <div className="menu__content">
                        <div className="difficulty__box">
                            <h3>DIFFICULTY</h3>
                            <ul>
                                <li className={this.props.difficulty===1&&"selected"} onClick={()=>this.props.handleDifficulty(1)}>EASY</li>
                                <li className={this.props.difficulty===2&&"selected"} onClick={()=>this.props.handleDifficulty(2)}>NORMAL</li>
                                <li className={this.props.difficulty===3&&"selected"} onClick={()=>this.props.handleDifficulty(3)}>HARD</li>
                            </ul>
                        </div>
                        <Credits handleCredits={this.handleCredits}/>
                        <div className="character__selection">
                            <h3>CHARACTER</h3>
                            <div className="character__slider">
                                <div className="character in__menu standby"/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default MenuStandard;