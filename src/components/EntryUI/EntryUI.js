import React, {Component} from "react";
import './EntryUI.scss'

class EntryUI extends Component{
    render() {
        return(
            <div className="entry__UI">
                <div className="logo"></div>
                <h2>LABYRINTH</h2>
                <h1>GAME</h1>
                <div className="button" onClick={this.props.handleClick}>CONTINUE</div>
            </div>
        )
    }
}

export default EntryUI;