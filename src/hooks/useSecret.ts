import { useState } from 'react';

const useSecret = () => {
    const [isSecret, setIsSecret] = useState(false);

    const toggleSecret = () => {
        setIsSecret(!isSecret);
    };

    return { isSecret, toggleSecret };
};

export default useSecret;
