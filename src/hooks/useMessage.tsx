import { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const useMessage = () => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'error' | 'success'>('error');
    const [visible, setVisible] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        let animation: Animated.CompositeAnimation | null = null;

        if (visible) {
            animation = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            });
        } else {
            animation = Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            });
        }

        if (animation) {
            animation.start(() => {
                if (!visible) {
                    setMessage('');
                }
            });
        }

        return () => {
            if (animation) {
                animation.stop();
            }
        };
    }, [visible]);

    const setMessageWithTimer = (msg: string, msgType: 'error' | 'success', time = 2500) => {
        setMessage(msg);
        setType(msgType);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, time);
    };

    const MessageDisplay = () => {
        return (
            message && (
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [
                            {
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-50, 0],
                                }),
                            },
                        ],
                        zIndex: 999,
                        position: 'absolute', 
                        width: '100%', 
                        alignItems: 'center', 
                    }}
                >
                    <View style={{ backgroundColor: type === 'error' ? '#f65' : '#6c5', padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: '#fff' }}>{message}</Text>
                    </View>
                </Animated.View>
            )
        );
    };

    return { setMessageWithTimer, MessageDisplay };
};

export default useMessage;
