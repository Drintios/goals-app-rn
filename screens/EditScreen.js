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

export default class EditScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    }
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

  renderEditOrCreate(itemId) {
    if (itemId === 'create') {
      return (
        <Form>
          <Item>
            <Input placeholder="Goal name" />
          </Item>
          <Textarea
            style={{marginTop: 20}}
            rowspan={5}
            bordered
            placeholder="Description" />
          <Button full style={{marginTop: 80}}>
            <Text>Create goal...</Text>
          </Button>
        </Form>
      );
    } else {
      return (
        <Text>This is the ID: {itemId}</Text>
      );
    }
  }
}

