import {useState, useContext} from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

import logo from '../../images/NewCred.png';
import { TransactionContext } from "../context/TransactionContext";

const NavbarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
       {title}
    </li>
  )
}

const Navbar = () => {
 
  //const { connectWallet } = useContext(TransactionContext);

  const [toggleMenu, setToggleMenu] = useState(false)
    return (
        <nav className='navbar navbar-dark flex-top fixed-top-0 gradient-bg-main2 flex-md-nowrap shadow'>
          <div className="md:flex-[0.5]  ml-9 flex-initial justify-self-end items-center">
            <img src={logo} alt="logo" className='w-32  cursor-pointer'/>
            </div>  
            <ul className='text-dark md:flex hidden list-none flex-row justify-between items-center flex-initial'>
              {["Documentation", "About Us", "Customer care", "News","" , "  "].map((item, index) => (
                <NavbarItem key={item + index} title={item} />
              ))}
            
              { (<button
                            type="button"
                            // onClick={}
                            className="bg-[#32a852] py-2 px-7 ml-20 rounded-full cursor-pointer hover:bg-[#2546bd] "
                        >
                            <p className="text-white text-base font-semibold"> Connect Wallet  </p>
                        </button>)}
               
            </ul>
            <div className='flex sticky'>
                    {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-dark md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className="text-dark md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                    }
                    {toggleMenu && (
                      <ul 
                        className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
                      >
                        <li className='text-xl w-full my-2'>
                          <AiOutlineClose onClick={ () => setToggleMenu(false)} />
                        </li>
                        {["Documentation", "About Us", "Customer care", "News"].map((item, index) => (
                <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />
              ))}
                      </ul>
                    )}
                    
            </div>

        </nav>
    );
}

export default Navbar;