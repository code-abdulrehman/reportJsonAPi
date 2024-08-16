import React from 'react'
import { FaRightToBracket } from 'react-icons/fa6'

function Header() {
  return (
    <div className='w-full h-12 bg-slate-600 flex justify-start items-center shadow-sm shadow-yellow-500'> 
    <div className="container mx-auto px-4 flex justify-start items-center ">
        <span className='text-yellow-500 font-bold text-2xl'>

    &#123;<b className='text-gray-100 shadow-md font-mono '>Json</b>&#125;
        </span>
        </div>
        </div>
  )
}

export default Header