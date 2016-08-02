import React, {Component, PropTypes} from 'react'
import Quests from './Quests'

export default class App extends Component {
    getQuests() {
        return [
            {_id: 1, text: 'This is quest 1'},
            {_id: 2, text: 'This is quest 2'},
            {_id: 3, text: 'This is quest 3'}
        ]
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>Metoquests</h1>
                </header>
                <Quests quests={this.getQuests()}/>
            </div>
        )
    }
}