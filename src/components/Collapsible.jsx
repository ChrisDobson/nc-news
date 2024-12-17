import { useState } from 'react';

export default function Collapsible ({ children }) {
    const [isHidden, setIsHidden] = useState(false);
    const toggleIsHidden = () => {
        setIsHidden(!isHidden);
    };
    return (
        <div className='collapsibleDiv'>
            <button onClick={toggleIsHidden}>
                {`${isHidden ? 'Show Comments' : 'Hide Comments'}`}
            </button>
            {isHidden ? null : children}
        </div>
    )
}