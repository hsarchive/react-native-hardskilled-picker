import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

const styles = {
    container: {
        flexDirection: 'column'
    },
    containerWithScroll: {
        height: 50,
        overflow: 'hidden',
        position: 'relative',
        flexDirection: 'row'
    },
    textItem: {
        fontSize: 24,
        height: 35
    },
    containerScrollable: {
        position: 'relative',
    },
    viewItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: 2,
        borderTopColor: 'red',
    },
    currentBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    currentText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttons: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

let timer;

const calculatePosition = (event) => {
    const height = styles.textItem.height;
    const offset = event.nativeEvent.contentOffset.y;

    return {
        offset,
        height,
        item: parseInt((offset + height / 2) / height)
    }
};

const prepareStyle = (countElements, offsetElement, props) => {
    styles.buttons = Object.assign(styles.buttons, props.buttonsStyles)
    styles.currentText = Object.assign(styles.currentText, props.currentTextStyles)
    styles.currentTop = Object.assign(styles.currentTop, props.currentTopStyles)
    styles.currentBottom = Object.assign(styles.currentBottom, props.currentBottomStyles)
    styles.textItem = Object.assign(styles.textItem, props.textItemStyles)
    styles.viewItem = Object.assign(styles.viewItem, props.viewItemStyles)

    styles.containerWithScroll.height = styles.textItem.height * countElements;
    
    const currentPositionBlock = parseInt(styles.containerWithScroll.height / 2);
    styles.currentTop = Object.assign(styles.currentTop, {
        top: currentPositionBlock - styles.textItem.height / 2
    })

    styles.currentBottom = Object.assign(styles.currentBottom, {
        top: currentPositionBlock + styles.textItem.height / 2
    })

    styles.emptyBlock = {
        paddingTop: offsetElement * styles.textItem.height
    };

    return StyleSheet.create(styles);
};

const upButton = () => (<Text>Up!</Text>);
const downButton = () => (<Text>Down!</Text>);

export default class ReactNativeHardskilledPicker extends Component {
    constructor(props) {
        super(props);

        this.countElements = props.elements || 3;
        this.offsetElement = (this.countElements - 1) / 2;
        this.styles = prepareStyle(this.countElements, this.offsetElement, props);
        this.currentIndex = props.array.findIndex((element) => element.value === props.value) || 0;

        this.state = {
            array: props.array,
            height: styles.textItem.height,
            upButton: props.upButton || upButton,
            downButton: props.downButton || downButton,
            onChange: props.onChange
        };
    }

    componentDidMount() {
        this.setInitialItem(this.currentIndex)
    }

    componentWillReceiveProps(props) {
        const item = this.state.array.findIndex((element) => element.value === props.value);

        if (item !== this.currentIndex) {
            this.setInitialItem(item)
        }
    }

    renderList(array) {
        return array.map((value, index) => {
            const current = (index === this.currentIndex) ? styles.currentText : {};

            return (
                <View style={this.styles.viewItem} key={index}>
                    <Text style={[styles.textItem, current]}>{value.label}</Text>
                </View>
            );
        });
    }

    setInitialItem(item) {
        this.currentIndex = item;

        setTimeout(() => (
            this.refs.ScrollContainer.scrollTo({ y: item * this.state.height }, { animated: false })
        ), 0);
    }

    selectItem(item) {
        this.currentIndex = item;
        this.state.onChange(this.state.array[item]);
    }

    clearTimeoutAction() {
        clearTimeout(timer);
        timer = null;
    }

    handlerMomentumScrollBegin() {
        this.clearTimeoutAction();
    }

    handlerMomentumScrollEnd(event, immediate) {
        const position = calculatePosition(event);

        const momentum = () => {
            this.refs.ScrollContainer.scrollTo({ y: position.item * position.height });

            if (this.currentIndex === position.item) {
                this.selectItem(position.item);
            }
        };

        this.clearTimeoutAction();

        if (immediate) {
            momentum();
        } else {
            timer = setTimeout(momentum, 200);
        }
    }

    handlerScrollUp() {
        if (this.currentIndex === 0) return;

        const item = this.currentIndex - 1;

        this.refs.ScrollContainer.scrollTo({ y: this.state.height * item });
        this.selectItem(item);
    }

    handlerScrollDown() {
        if (this.currentIndex === this.state.array.length - 1) return;

        const item = this.currentIndex + 1;

        this.refs.ScrollContainer.scrollTo({ y: this.state.height * item });
        this.selectItem(item);
    }

    handlerScroll(event) {
        const position = calculatePosition(event);
        this.currentIndex = position.item;
    }

    render() {
        const renderList = this.renderList(this.state.array);

        return (
            <View style={this.styles.container}>
                <TouchableOpacity
                    onPress={() => this.handlerScrollUp()}
                    style={this.styles.buttons}>
                    {this.state.upButton}
                </TouchableOpacity>
                <View style={this.styles.containerWithScroll}>
                    <ScrollView
                        ref="ScrollContainer"
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        style={this.styles.containerScrollable}
                        onMomentumScrollBegin={(event) => this.handlerMomentumScrollBegin()}
                        onMomentumScrollEnd={(event) => this.handlerMomentumScrollEnd(event, true)}
                        onScrollEndDrag={(event) => this.handlerMomentumScrollEnd(event)}
                        onScroll={(event) => this.handlerScroll(event)}
                        overScrollMode="never">
                        <View style={this.styles.emptyBlock} />
                        {renderList}
                        <View style={this.styles.emptyBlock} />
                    </ScrollView>
                    <View style={this.styles.currentTop} />
                    <View style={this.styles.currentBottom} />
                </View>
                <TouchableOpacity
                    onPress={() => this.handlerScrollDown()}
                    style={this.styles.buttons}>
                    {this.state.downButton}
                </TouchableOpacity>
            </View>
        );
    }
}
