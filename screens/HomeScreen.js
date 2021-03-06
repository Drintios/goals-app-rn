import React from 'react';
import { WebBrowser } from 'expo';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Icon,
  Body,
  Right
} from 'native-base';

import { db } from '../config/db';

let itemsRef = db.ref('/items');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let itemsKeys = Object.keys(data);
      let items = itemsKeys.map((key) => {
        data[key].id = key
        key = data[key]
        return key
      });
      this.setState({items});
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem icon onPress={() => {this.props.navigation.navigate('Edit', {
              itemId: 'create'
            })}}>
              <Left>
                <Icon active name="add" />
              </Left>
              <Body>
                <Text>
                  Create new objective...
                </Text>
              </Body>
            </ListItem>

            {this.state.items.map((data, indx) =>
              <ListItem avatar key={indx} onPress={() => {
                this.props.navigation.navigate('Edit', {
                  itemId: data.id,
                })
              }}>
                <Body>
                  <Text>{data.name}</Text>
                  <Text>{data.description}</Text>
                </Body>
                <Right>
                  <Text note>createdAt</Text>
                </Right>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

