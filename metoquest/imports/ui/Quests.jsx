import React, {Component, PropTypes} from 'react'
import Quest from './Quest'

export default class Quests extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.quests.map(quest=>(
                        <Quest key={quest._id} quest={quest}/>
                    ))
                }
            </ul>
        )
    }
}

Quests.propTypes = {
    quests: PropTypes.array.isRequired,
}
