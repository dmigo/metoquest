import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data'
import {Quests} from '../api/quests'
import QuestList from './Quests'

//TODO add support for mobile apps https://www.meteor.com/tutorials/react/running-on-mobile

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hideDone: false
        }
    }

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

    toggleHideDone() {
        this.setState({
            hideDone: !this.state.hideDone
        })
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>Metoquests. Done: {this.props.amountOfDone}</h1>

                    <label className="hide-done">
                        <input type="checkbox"
                               readOnly
                               checked={this.state.hideDone}
                               onClick={this.toggleHideDone.bind(this)}
                        />
                        Hide done
                    </label>

                    <form className="new-task"
                          onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text"
                               ref="textInput"
                               placeholder="Type to add new quest"
                        />
                    </form>

                </header>
                <QuestList quests={this.props.quests}
                           hideDone={this.state.hideDone}/>
            </div>
        )
    }
}

App.propTypes = {
    quests: PropTypes.array.isRequired
}

export default createContainer(
    ()=>({
        quests: Quests.find({}, {sort: {createAt: -1}}).fetch(),
        amountOfDone: Quests.find({done: true}).count()
    }), App)
