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
        return (<li className={className}
                    onClick={this.toggleDone.bind(this)}>
                <button className="delete" onClick={this.delete.bind(this)}>
                    &times;
                </button>
                <span className="text">
                    <strong>
                        {this.props.quest.username}
                    </strong>
                    {this.props.quest.text}
                </span>
            </li>
        )
    }
}

Quest.propTypes = {
    quest: PropTypes.object.isRequired,
}