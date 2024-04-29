import { useState } from 'react';
import { View } from 'react-native';
import Message from '../modals/Message';

const useMessage = () => {
    const [message, setMessage] = useState('Erro: Algum problema ocorreu');
    const [backgroundColor, setBackgroundColor] = useState('red');

    const MessageDisplay = ()=>{
        return(
            <Message backgroundColor={backgroundColor} message={message} />
        )
    }

    return { message, setMessage, MessageDisplay, setBackgroundColor };
};

export default useMessage;
