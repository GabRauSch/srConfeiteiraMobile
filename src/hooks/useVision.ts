import { useState } from 'react';

const useVision = () => {
    const [vision, setVision] = useState(true);

    const toggleVision = () => {
        setVision(!vision);
    };

    return { vision, toggleVision };
};

export default useVision;
