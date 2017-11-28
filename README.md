# Data Picker for React Native

## Installation
`npm install react-native-hardskilled-picker --save`

## Example
```jsx
import Picker from 'react-native-hardskilled-picker';

const upButton = () => (<Text>Woo UP!</Text>);
const downButton = () => (<Text>Woo DOWN!</Text>);

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillMount() {
    const array = [];
    for (let i = 0; i < 24; i++) {
        array.push({ value: i, label: `It's ${i}` });
    }

    this.setState({
      messages: array,
    });
  }

  handlerOnChange(item) {
    console.warn(item.value);
    console.warn(item.label);
  }

  render() {
    return (
      <Picker
          array={this.state.array}
          elements={5}
          onChange={this.handlerOnChange}
          upButton={this.upButton()}
          downButton={this.downButton()}
          buttonsStyles={{ backgroundColor: 'red' }}
          currentTextStyles={{ color: 'orange' }}
          currentTopStyles={{ borderTopColor: 'orange' }}
          currentBottomStyles={{ borderBottomColor: 'orange' }}
          textItem={{ fontSize: 20 }}
          viewItem={{ height: 26 }}
          value={5}
        />
    );
  }
}
```
