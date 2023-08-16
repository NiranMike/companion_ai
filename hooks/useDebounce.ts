import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // This effect runs whenever 'value' or 'delay' changes.
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500); // If delay is not provided, default to 500 milliseconds.

        // This cleanup function is called when the component unmounts or 'value' and 'delay' change.
        return () => {
            clearTimeout(timer); // This clears the timeout to avoid memory leaks.
        };
    }, [value, delay]);

    return debouncedValue; // Return the debounced value to the component.
}
