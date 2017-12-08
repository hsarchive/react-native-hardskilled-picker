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
    this.state = { array: [] };
  }

  componentWillMount() {
    const array = [];
    for (let i = 0; i < 24; i++) {
        array.push({ value: i, label: `It's ${i}` });
    }

    this.setState({
      array: array
    });
  }

  handlerOnChange(item) {
    console.warn(item.value);
    console.warn(item.label);
  }

  render() {
    return (
      <Picker
          array={this.state.array} // List of elements
          elements={5} // Number of elements shown 
          onChange={this.handlerOnChange} // onChange callback
          upButton={this.upButton()} // Component for "up" button
          downButton={this.downButton()} // Component for "down" button
          buttonsStyles={{ backgroundColor: 'red' }} // Style for button
          currentTextStyles={{ color: 'orange' }} // Style for current element
          currentTopStyles={{ borderTopColor: 'orange' }} // Style for top border
          currentBottomStyles={{ borderBottomColor: 'orange' }} // Style for bottom border
          textItem={{ fontSize: 20 }} // Text item style
          viewItem={{ height: 26 }} // View item style
          value={5} // Default value
        />
    );
  }
}
```

[Hire us via Upwork!](https://www.upwork.com/o/companies/_~01b5cde52d5f4ead84/) | [Our website](https://hardskilled.com)
