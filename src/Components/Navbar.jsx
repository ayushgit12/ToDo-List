
import React from 'react'

function Navbar() {
  return (
    <nav className="flex justify-between bg-indigo-900 text-white px-9 py-2">
        <div className='logo'>
            <span className='font-bold text-xl'>iTask</span>
        </div>
        <ul className="flex gap-8">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
