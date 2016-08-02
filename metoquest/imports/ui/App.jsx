import React, {Component, PropTypes} from 'react'
import {createContainer} from 'react-meteor-data'
import {Quests} from '../imports/api/quests'
import QuestList from './Quests'

class App extends Component {
    render() {
        return (
            <div className='container'>
                <header>
                    <h1>Metoquests</h1>
                </header>
                <QuestList quests={this.props.quests}/>
            </div>
        )
    }
}

App.propTypes = {
    quests: PropTypes.array.isRequired
}

export default createContainer(
    ()=>({quests: Quests.find({}).fetch()}),
    App)
