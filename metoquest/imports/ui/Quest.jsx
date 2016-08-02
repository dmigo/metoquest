import React, {Component, PropTypes} from 'react'

export default class Quest extends Component {
    render() {
        return (<li>{this.props.quest.text}</li>)
    }
}

Quest.propTypes = {
    quest: PropTypes.object.isRequired,
}