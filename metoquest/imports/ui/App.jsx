import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {Quests} from '../api/quests'
import QuestList from './Quests'
import Cavabunga from './AccountsUIWrapper'

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

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Quests.insert({
            text,
            createdAt: new Date(), // Todo take time from the server
            owner: Meteor.userId(),
            userName: Meteor.user().username
        });

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

                    <Cavabunga/>
                    {this.props.currentUser ?
                        <form className="new-quest"
                              onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text"
                                   ref="textInput"
                                   placeholder="Type to add new quest"/>
                        </form> : ''
                    }

                </header>
                <QuestList quests={this.props.quests}
                           hideDone={this.state.hideDone}/>
            </div>
        )
    }
}

App.propTypes = {
    quests: PropTypes.array.isRequired,
    amountOfDone: PropTypes.number.isRequired,
    currentUser: PropTypes.object
}

export default createContainer(
    ()=>({
        quests: Quests.find({}, {sort: {createAt: -1}}).fetch(),
        amountOfDone: Quests.find({done: true}).count(),
        currentUser: Meteor.user()
    }), App)
