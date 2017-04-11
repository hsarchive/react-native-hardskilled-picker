# Data Picker for React Native

## Installation
`npm install react-native-hardskilled-picker --save`

## Example
```jsx
import Picker from 'react-native-hardskilled-picker';

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

  upButton {
    return <Text>Woo UP!</text>;
  }

  downButton {
    return <Text>Woo DOWN!</text>;
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
        />
    );
  }
}
```
