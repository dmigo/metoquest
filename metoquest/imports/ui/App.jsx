import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data'
import {Quests} from '../api/quests'
import QuestList from './Quests'

//TODO add support for mobile apps https://www.meteor.com/tutorials/react/running-on-mobile

class App extends Component {

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Quests.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>Metoquests</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new quest"
                        />
                    </form>

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
    ()=>({quests: Quests.find({}, {sort: {createAt: -1}}).fetch()}),
    App)
