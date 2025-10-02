import { counter } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import { counterContext } from '../context/context'
import { useContext } from 'react'
const Component1 = () => {
    const value = useContext(counterContext);
  return (
    <div>
        {value.count}
    </div>
  )
}

export default Component1