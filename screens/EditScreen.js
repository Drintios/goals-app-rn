import React from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Button,
  Textarea
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { addItem } from '../services/itemService';
import { db } from '../config/db';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let itemId = this.props.navigation.getParam('itemId');
    if (itemId !== 'create') {
      let itemRef = db.ref('/items/' + itemId);

      itemRef.on('value', (snapshot) => {
        let data = snapshot.val();
        this.setState({
          name: data.name,
          description: data.description
        });
      });
    }
  }

  handleChange = (type) => (event) => {
    this.setState({
      [type]: event.nativeEvent.text
    });
  }

  handleSubmit() {
    addItem({
      name: this.state.name,
      description: this.state.description
    }, this.props.navigation.getParam('itemId'));
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Home'
    }));
    console.log('Button Pressed');
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');

    return (
      <Container>
        <Content>
          {this.renderEditOrCreate(itemId)}
        </Content>
      </Container>
    );
  }

  renderEditOrCreate(itemId, requestedGoal) {
    if (itemId === 'create' && !requestedGoal) {
      return (
        <Form>
          <Item>
            <Input
              placeholder="Goal name"
              onChange={this.handleChange('name')} />
          </Item>
          <Textarea
            style={{marginTop: 20}}
            rowspan={5}
            bordered
            placeholder="Description"
            onChange={this.handleChange('description')} />
          <Button
            full
            style={{marginTop: 80}}
            onPress={this.handleSubmit}>
            <Text>Create goal...</Text>
          </Button>
        </Form>
      );
    } else {
      return (
        <Form>
          <Item>
            <Input
              placeholder="Goal name"
              onChange={this.handleChange('name')}
              value={this.state.name} />
          </Item>
          <Textarea
            style={{marginTop: 20}}
            rowspan={5}
            bordered
            placeholder="Description"
            onChange={this.handleChange('description')}
            value={this.state.description} />
          <Button
            full
            style={{marginTop: 80}}
            onPress={this.handleSubmit}>
            <Text>Save goal...</Text>
          </Button>
        </Form>
      );
    }
  }
}

