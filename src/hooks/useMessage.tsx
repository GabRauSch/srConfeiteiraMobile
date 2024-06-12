import { useState } from 'react';
import { View } from 'react-native';
import Message from '../modals/Message';

type Props = {
    type: 'error' | 'success',
    message: string
}

const useMessage = () => {
    const [message, setMessage] = useState('');
    const [type, setMessageType] = useState<'error' | 'success'>('error');

    const setMessageWithTimer = (message: string, type: 'error'|'success', time?: number)=>{
        console.log(message.length)
        if(!time) {
            time = 5 * message.length
        }
        
        setMessage(message),
        setMessageType(type),
        setTimeout(()=>{setMessage('')}, time *10)
    }

    const MessageDisplay = ()=>{
        return(
            <Message type={type} message={message} />
        )
    }

    return { message, setMessage, MessageDisplay, setMessageWithTimer, setMessageType};
};

export default useMessage;
