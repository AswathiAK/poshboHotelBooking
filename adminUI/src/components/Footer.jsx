import React from 'react'

const Footer = () => {
  return (
    <footer className="py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
      <p className="text-gray-700 mb-6 lg:mb-0 text-sm font-medium">
        Copyright &copy; {new Date().getFullYear()}{' '}
        <a href="#" className="text-light-blue-500 hover:text-light-blue-700">
          Poshbo
        </a>
      </p>
      <ul className="list-unstyled flex">
        <li className="mr-6">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium block text-sm" >
            About Us
          </a>
        </li>
        <li className="mr-6">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium block text-sm" >                        
            Blog
          </a>
        </li>  
        <li>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium block text-sm" >
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
