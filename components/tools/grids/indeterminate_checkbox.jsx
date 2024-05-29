import { useEffect, useRef } from "react"
import './indeterminate_checkbox.css'

const IndeterminateCheckbox = ({ indeterminate, className="", ...rest }) => {
    const ref = useRef()

    useEffect(()=>{
        if(typeof indeterminate === 'boolean'){
            ref.current.indeterminate = indeterminate
        }
    },[ref, indeterminate])

    return (
        <input
        type="checkbox"
        ref={ref}
        className={className+ ' cursor-pointer checkboxEx'}
        {...rest}
        />
    )
}
export default IndeterminateCheckbox