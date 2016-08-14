import React, {Component, PropTypes} from 'react'
import Quest from './Quest'

export default class Quests extends Component {
    render() {
        let filtered = this.props.quests
        if (this.props.hideDone)
            filtered = filtered.filter(quest =>!quest.done)

        return (
            <ul>
                {
                    filtered.map(quest=>(
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
