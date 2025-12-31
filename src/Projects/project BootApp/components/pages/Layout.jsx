import {PiShoppingCartSimpleBold } from "react-icons/pi"
import { useCart } from "../context/CartProvider"
import { Link } from "react-router"


export default function Layout({children}) {
    const {state}=useCart()
  return (
   <div className="w-full flex flex-col bg-[#f7f7f7] h-full max-xl:px-5 xl:px-32">
    <header className='w-full 2xl:w-[94%] bg-[#fa3815] max-sm:px-4 px-8 py-4 flex items-center justify-between mb-20 mt-10 text-white rounded-2xl'>
        <Link to="/"><span className='text-3xl'>BootShop</span></Link>
      <Link to="/basketpage">
        <div className="flex relative ">
            <PiShoppingCartSimpleBold className="size-12 bg-white text-red-500 p-1 rounded-xl"/>
            <span className={`${state.itemsCounter === 0 ? " hidden " : "absolute -top-3 -right-2.5 bg-black size-5 items-center flex justify-center rounded-sm"} `}>{state.itemsCounter}</span>
        </div>
      </Link>
    </header>
        {children}
    <footer className='w-full 2xl:w-[94%] bg-[#fa3815] max-sm:px-0 px-8 py-4 flex justify-center items-center mt-10 mb-10 text-white rounded-2xl text-2xl '><span>Developed By Ehsan with <span className="text-purple-700">♥</span></span></footer>
   </div>
  
  )
}
