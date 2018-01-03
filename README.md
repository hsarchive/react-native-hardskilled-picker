# Data Picker for React Native

![Example](https://media.giphy.com/media/xUNd9ZX5sD8XxTu0Vi/giphy.gif)

## Installation
`npm install react-native-hardskilled-picker --save`

## Example
```jsx
import React, { Component } from 'react';
import { Text } from 'react-native';
import Picker from 'react-native-hardskilled-picker';

export default class Example extends Component {
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
        console.warn(item);
    }

    render() {
        return (
            <Picker
                array={this.state.array} // List of elements
                elements={5} // Number of elements shown
                onChange={this.handlerOnChange} // onChange callback
                upButton={<Text>Woo UP!</Text>} // Component for "up" button
                downButton={<Text>Woo Down!</Text>} // Component for "down" button
                buttonsStyles={{ backgroundColor: '#ccc' }} // Style for button
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
