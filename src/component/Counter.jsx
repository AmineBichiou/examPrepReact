import { useState } from 'react'

const Counter = () =>{
    const i = 0;
    const [counter,setCounter] = useState(i);

    const inc = ()=> {
        setCounter(counter + 1)
    }
    const dec = () => {
        setCounter(counter - 1)
    }
    return(
        <div><p>counter  {counter} </p>
        <button onClick={dec}>-1</button>
        <button onClick={inc}>+1</button>
        </div>
    )

}
export default Counter;