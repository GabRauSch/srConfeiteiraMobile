import { Animated, Modal, Text, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/modal.Message'
import { TouchableWithoutFeedback } from "react-native"
import { useEffect } from "react"

type Props = {
    type: 'error' | 'success',
    message: string
}

const Message = ({message, type}: Props)=>{
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: message ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }
        ).start();
      }, [message]);
    return (
        <>
            <Animated.View
                style={{opacity: fadeAnim,
                    zIndex: 999,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      },
                    ],}}
            >
                <View style={styles.cardArea}>
                    <View 
                        style={{...styles.card, backgroundColor: type == 'error' ? '#f65' : '#6c5'}}>
                            <Text style={styles.message} onPress={()=>{}}>{message}</Text>
                    </View>
                </View>
            </Animated.View>
        </>
    )
}

export default Message