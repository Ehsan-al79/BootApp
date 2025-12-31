import { useCart } from "../context/CartProvider";
import { MdDeleteOutline } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { productQuantity, shortText} from "../../helpers/helper";
import{Link} from "react-router-dom"
import { TbListDetails } from "react-icons/tb";

export default function BasketPage() {
  const {state, dispatch } = useCart();

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center md:py-10 md:px-5">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-[#f84f31] flex items-center gap-2 mb-6">
          <FaShoppingCart className="text-3xl" />
          Shopping Basket
        </h1>

        {/* اگر سبد خالیه */}
        {state.selectedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
                alt="Empty cart"
                className="w-32 h-32 opacity-70 mb-5"
              />



            <p className="text-gray-600 text-lg font-medium">
              Your cart is empty !!
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Add some products to see them here!
            </p>
           <Link
            to="/products"
            className="mt-6 flex w-44 text-sm justify-center  hover:bg-red-700 shadow-xl transition-color duration-200 bg-[#fa3815] py-2 rounded-2xl text-white"
          >
            ← Back to Products
          </Link>
          </div>
        ) : (
          <>
            {/* لیست محصولات داخل سبد */}
            <ul className="flex flex-col gap-4">
              {state.selectedItems.map((item) => {
                const quantity=productQuantity(state,item.id)
                return(
                  
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row justify-center md:justify-between items-center bg-[#fafafa] border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24  rounded-lg"
                    />
                    <div className="flex flex-col max-md:items-center gap-y-1">
                      <span className="font-semibold text-gray-800 text-sm">
                        {shortText(item.title)}
                      </span>
                      <span className="text-blue-600 font-semibold  text-[15px]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center  mt-2  gap-2 max-md:w-full max-md:relative ">
                       <div className="flex items-center justify-center gap-x-2 ">
                        <button
                      onClick={() =>
                        dispatch({ type: "INCREASE", payload: item })
                      }
                      className="bg-green-500 text-white  px-3 py-1 rounded-md text-lg hover:bg-green-600 transition-all duration-200 flex justify-center items-center cursor-pointer"
                    >
                      +
                    </button>

                    <span className="font-semibold text-gray-700 size-5 flex items-center justify-center">
                      {quantity}
                    </span>
                    
                   <button
                      onClick={() =>
                        dispatch({ type: "DECREASE", payload: item })
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-lg hover:bg-red-700 transition-all cursor-pointer"
                    >
                      −
                    </button>
                   
                    </div>
        
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item })
                      }
                      className="text-red-500 hover:text-red-700 transition-all cursor-pointer max-md:absolute max-md:right-0"
                    >
                      <MdDeleteOutline size={24} />
                    </button>
                  </div>
                </li>)
})}
            </ul>

            {/* ناحیه جمع کل و دکمه‌ها */}
            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Total Items:{" "}
                  <span className="text-[#f84f31]">{state.itemsCounter}</span>
                </p>
                <p className="text-xl font-bold text-[#f84f31] mt-1">
                  Total Price: <span>${state.total}</span>
                </p>
              </div>

              <button
                onClick={() => dispatch({ type: "CHECKOUT" })}
                className="bg-[#f84f31] text-white font-semibold px-6 py-2 rounded-xl hover:bg-[#d73a1e] transition-all shadow-md"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
