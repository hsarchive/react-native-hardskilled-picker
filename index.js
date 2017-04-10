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
    styles.containerWithScroll.height = styles.textItem.height * countElements;

    styles.emptyBlock = {
        paddingTop: offsetElement * styles.textItem.height
    };

    const currentPositionBlock = parseInt(styles.containerWithScroll.height / 2);

    styles.currentTop = {
        ...styles.currentTop,
        top: currentPositionBlock - styles.textItem.height / 2
    };

    styles.currentBottom = {
        ...styles.currentBottom,
        top: currentPositionBlock + styles.textItem.height / 2
    };

    styles.buttons = {
        ...styles.buttons,
        ...props.buttonsStyles
    };

    styles.currentText = {
        ...styles.currentText,
        ...props.currentTextStyles
    };

    styles.currentTop = {
        ...styles.currentTop,
        ...props.currentTopStyles
    };

    styles.currentBottom = {
        ...styles.currentBottom,
        ...props.currentBottomStyles
    };

    styles.textItem = {
        ...styles.textItem,
        ...props.textItemStyles
    };

    styles.viewItem = {
        ...styles.viewItem,
        ...props.viewItemStyles
    };

    return StyleSheet.create(styles);
};

export default class RNP extends Component {
    state = {
        current: 0
    };

    constructor(props) {
        super(props);

        this.countElements = 3;
        this.offsetElement = (this.countElements - 1) / 2;
        this.array = props.array;
        this.onChange = props.onChange;

        this.upButton = props.upButton || <Text>Up</Text>;
        this.downButton = props.upButton || <Text>Down</Text>;

        this.styles = prepareStyle(this.countElements, this.offsetElement, props);
    }

    renderList(array) {
        const getStyle = (index) => {
            const current = index === this.state.current ? {
                fontWeight: 'bold'
            } : {};

            return {
                ...styles.textItem,
                ...current
            }
        };

        return array.map((value, index) =>
            <View style={this.styles.textItem} key={index}>
                <Text style={getStyle(index)}>{value.label}</Text>
            </View>
        );
    }

    selectItem(item) {
        this.onChange(this.array[item]);
        this.setState({ current: item });
    }

    handlerMomentumScrollEnd(event, immediate) {
        const _this = this;
        const position = calculatePosition(event);

        const momentum = () => {
            _this.refs.ScrollContainer.scrollTo({ y: position.item * position.height });

            if (_this.state.current === position.item) {
                _this.selectItem(position.item);
            }
        };

        clearTimeout(timer);

        if (immediate) {
            timer = null;
            momentum();
        } else {
            timer = setTimeout(momentum, 200);
        }
    }

    handlerScrollUp() {
        if (this.state.current === 0) return;

        const height = styles.textItem.height;
        const item = this.state.current - 1;

        this.selectItem(item);
        this.refs.ScrollContainer.scrollTo({ y: height * item });
    }

    handlerScrollDown() {
        if (this.state.current === this.array.length - 1) return;

        const height = styles.textItem.height;
        const item = this.state.current + 1;

        this.selectItem(item);

        this.refs.ScrollContainer.scrollTo({ y: height * item });
    }

    handlerScroll(event) {
        const position = calculatePosition(event);
        this.setState({ current: position.item });
    }

    render() {
        return (
            <View style={this.styles.container}>
                <TouchableOpacity
                    onPress={() => this.handlerScrollUp()}
                    style={this.styles.buttons}>
                    {this.upButton}
                </TouchableOpacity>
                <View style={this.styles.containerWithScroll}>
                    <ScrollView
                        ref="ScrollContainer"
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        style={this.styles.containerScrollable}
                        onMomentumScrollEnd={(event) => this.handlerMomentumScrollEnd(event, true)}
                        onScrollEndDrag={(event) => this.handlerMomentumScrollEnd(event)}
                        onScroll={(event) => this.handlerScroll(event)}
                        overScrollMode="never">
                        <View style={this.styles.emptyBlock} />
                        {this.renderList(this.array)}
                        <View style={this.styles.emptyBlock} />
                    </ScrollView>
                    <View style={this.styles.currentTop} />
                    <View style={this.styles.currentBottom} />
                </View>
                <TouchableOpacity
                    onPress={() => this.handlerScrollDown()}
                    style={this.styles.buttons}>
                    {this.downButton}
                </TouchableOpacity>
            </View>
        );
    }
}