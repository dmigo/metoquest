import React, {Component, PropTypes} from 'react'
import {Quests} from '../api/quests'

export default class Quest extends Component {
    toggleDone() {
        Quests.update(this.props.quest._id, {
            $set: {done: !this.props.quest.done}
        })
    }

    delete() {
        Quests.remove(this.props.quest._id)
    }

    render() {
        const className = this.props.quest.done ? 'done' : ''
        return (<li className={className}>
                <button className="delete" onClick={this.delete.bind(this)}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.quest.done}
                    onClick={this.toggleDone.bind(this)}
                />
                <span className="text">{this.props.quest.text}</span>
            </li>
        )
    }
}

Quest.propTypes = {
    quest: PropTypes.object.isRequired,
}