import {useEffect, useState} from "react";

export const useDebounceInput = (func, time) => {
    const [value, setValue] = useState('')
    useEffect(() => {
        const timer = setTimeout(() => {
            func(value)
        }, time)
        return () => {
            clearTimeout(timer)
        }
    }, [value, func, time])
    const onChange = (e) => {
        setValue(e.target.value)
    }
    return {
        value,
        onChange
    }
}