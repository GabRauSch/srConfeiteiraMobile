import React, { ReactElement } from "react";
import { StyleSheet, Text, TextProps, View, ViewProps } from "react-native";

type Props = {
    children: ReactElement;
    active: boolean;
};

type ElementProps = ViewProps | TextProps;

export const GhostPage = ({ children, active }: Props) => {
    const traverseChildren = (children: React.ReactNode): any => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                if (child.type === View) {
                    console.log('n', child.props)
                    return (
                        <View style={[styles.viewStyle, child.props.style]}>
                            {traverseChildren(child.props.children)}
                        </View>
                    );
                } else if (child.type === Text) {
                    return (
                        <Text style={[styles.textStyle, child.props.style]}>
                            {child.props.children}
                        </Text>
                    );
                } else {
                    return child;
                }
            } else {
                return child;
            }
        });
    };

    return <View style={styles.container}>{traverseChildren(children)}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStyle: {
        backgroundColor: '#777',
        padding: 10,
        margin: 5,
    },
    textStyle: {
        backgroundColor: '#555',
        padding: 5,
        margin: 2,
    },
});

export default GhostPage;
