import React from 'react'

const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 select-none cursor-pointer ${className}`}>
      {/* Logo Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M12 6v12" />
      </svg>

      {/* Logo Text */}
      <h1 className="text-xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 drop-shadow-lg">
        SJ-Cart
      </h1>
    </div>
  )
}

export default Logo
