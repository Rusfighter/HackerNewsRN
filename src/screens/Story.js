import React from 'react';
import {
  View,
  Text,
  InteractionManager,
  StyleSheet,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Screen from '../components/Screen';
import CommentList from './story/List';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class Story extends React.PureComponent {
  state = {
    loadingComponent: true
  };

  /* componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.state.loadingComponent) {
        this.setState({ loadingComponent: false });
      }
    });
  } */

  _openLink = () => {
    const { item } = this.props;
    if (item && item.url && item.url !== '') {
      Linking.openURL(item.url).catch(err =>
        console.error('An error occurred', err)
      );
    }
  };

  popScreen = () => {
    this.props.actions.popScreen();
  };

  _rightButtons =
    this.props.item && this.props.item.url
      ? [
          {
            icon: 'tab',
            action: this._openLink
          }
        ]
      : [];

  render() {
    const { item, ...screenProps } = this.props;
    return (
      <Screen {...screenProps}>
        <View style={styles.container}>
          <Header
            popScreen={this.popScreen}
            title={item.title}
            backButton
            rightButtons={this._rightButtons}
          />
          <CommentList data={item.kids || []} />
        </View>
      </Screen>
    );
  }
}

const StoryWithData = connect((state, props) => {
  const id = props.data.id;
  return {
    item: state.stories.byId[id]
  };
})(Story);

// get ID
export default StoryWithData;
