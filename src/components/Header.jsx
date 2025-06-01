import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-14 sm:h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-3 sm:px-4 justify-between'>

        {/* Logo */}
        <div className='flex items-center'>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Search - Desktop */}
        <div className='hidden lg:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder='Search product here...'
            className='w-full outline-none py-1 text-sm sm:text-base'
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg min-w-[40px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
            <GrSearch />
          </div>
        </div>

        {/* Right side icons */}
        <div className='flex items-center gap-4 sm:gap-7'>

          {/* Mobile Search Icon */}
          <div className='lg:hidden text-2xl cursor-pointer text-red-600' onClick={() => setMobileSearchOpen(prev => !prev)}>
            <GrSearch />
          </div>

          {/* Mobile Search Input */}
          {mobileSearchOpen && (
            <div className='absolute top-14 left-0 right-0 bg-white px-4 py-2 shadow-md z-50'>
              <input
                type='text'
                autoFocus
                placeholder='Search product here...'
                className='w-full outline-none border border-gray-300 rounded-full px-3 py-1 text-sm'
                onChange={handleSearch}
                value={search}
                onBlur={() => setMobileSearchOpen(false)}
              />
            </div>
          )}

          {/* User Icon */}
          <div className='relative flex justify-center'>
            {
              user?._id ? (
                <div
                  className='text-2xl sm:text-3xl cursor-pointer relative flex justify-center'
                  onClick={() => setMenuDisplay(preve => !preve)}
                >
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-8 h-8 sm:w-10 sm:h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              ) : null
            }

            {
              menuDisplay && (
                <div className='absolute bg-white top-11 right-0 h-fit p-2 shadow-lg rounded z-50'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link
                          to={"/admin-panel/all-products"}
                          className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                          onClick={() => setMenuDisplay(false)}
                        >
                          Admin Panel
                        </Link>
                      )
                    }
                  </nav>
                </div>
              )
            }
          </div>

          {/* Cart Icon */}
          {
            user?._id && (
              <Link to={"/cart"} className='text-xl sm:text-2xl relative'>
                <FaShoppingCart />
                <div className='bg-red-600 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full p-[2px] flex items-center justify-center absolute -top-1 -right-2 text-xs'>
                  <p>{context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }

          {/* Login/Logout Button */}
          <div>
            {
              user?._id ? (
                <button
                  onClick={handleLogout}
                  className='px-3 py-1 text-xs sm:text-sm rounded-full text-white bg-red-600 hover:bg-red-700'
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className='px-3 py-1 text-xs sm:text-sm rounded-full text-white bg-red-600 hover:bg-red-700'
                >
                  Login
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
