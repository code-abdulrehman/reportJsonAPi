import React from 'react'
import { FaCircleExclamation } from 'react-icons/fa6'

function Error({children, className}) {
  return (
    <div className={`p-4 text-red-500 flex items-center gap-2 text-lg ${className}`}><FaCircleExclamation />
    {children}</div>
  )
}

export default Error