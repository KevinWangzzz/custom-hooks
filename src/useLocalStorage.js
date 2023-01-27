import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const cachedValue = window.localStorage.getItem(key);
        if (cachedValue !== null) return JSON.parse(cachedValue);

        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });

    useEffect(() => {
        if (value === undefined) window.localStorage.removeItem(key);
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
