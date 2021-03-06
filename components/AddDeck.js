import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from './Button';
import { gray, green, white } from '../utils/colors';
import { addDeck } from '../actions/deck';
import { saveDeck } from '../utils/api';

/**
 * @description Renders a view with input to create a deck. 
 * @constructor
 * @extends React.Component.
 * @param {object} props An object with no relevant properties in this case.
 */
class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  toDeckView = (id) => {
    this.props.navigation.navigate(
      'DeckList',
    );
    this.props.navigation.navigate(
      'Deck',
      { id }
    );
  }

 /**
 * @description Adds the deck to the phone's storage, 
 * updates the redux state and navigates back to the deck list view.
 * @return {Void}
 */
  handleAddDeck = () => {
    const deck = this.state;
    const { dispatch } = this.props;

    if (deck.title !== '') {
      dispatch(addDeck(deck));

      saveDeck(deck);

      this.setState({
        title: ''
      });

      this.toDeckView(deck.title);

    } else {
      ToastAndroid.show('You must give the new deck a title!', ToastAndroid.SHORT)
    }
  }

  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.titleText}>Give your deck a title</Text>
        <TextInput
          style={styles.inputText}
          value={title}
          onChangeText={(text) => this.setState({ title: text })}
        />
        <Button
          disabled={true}
          textColor={white}
          backgroundColor={green}
          onPress={this.handleAddDeck}>
          Add Deck
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 35,
    paddingLeft: 30,
    paddingRight: 30
  },
  inputText: {
    textAlign: 'center',
    fontSize: 25,
    height: 50,
    width: 300,
    borderColor: gray,
    borderWidth: 0
  }
})

export default connect()(AddDeck)