// ساخت کانتکس کارد برای قسمت سبد خرید
import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../../helpers/helper";

const CartContext = createContext();

export default function CartProvider({ children }) {

  const objects = {
  // ایتم های انتخاب شده توسط کاربر
  selectedItems: [],
  // تعداد کل محصولات انخاب شده رو اینجا نشون میده
  itemsCounter: 0,
  // مجموع کل محصولات انتخاب شده
  total: 0,
  // ساخت چک اوت برای پرداخت محصولات
  checkout: false,
};

  const [state, dispatch] = useReducer(reducer, objects);


function reducer(state, action) {
  switch (action.type) {

    case "ADD_ITEM": {

      const exist = state.selectedItems.find((item) => item.id === action.payload.id);

      // اگر وجود نداشت، آیتم جدید اضافه کن
      let updatedItems;
      !exist ? updatedItems = [...state.selectedItems, {...action.payload, quantity: 1,checkout:false}] : updatedItems = [...state.selectedItems];
      
        

      return {...state,selectedItems: updatedItems,...sumProducts(updatedItems)
      };
      
    }
        case "REMOVE_ITEM": {
      const newSelectedItems = state.selectedItems.filter((item) => item.id !== action.payload.id);

      return {...state,selectedItems:newSelectedItems,...sumProducts(newSelectedItems)};
    }


    case "INCREASE": {
      const updatedItems = state.selectedItems.map((item) =>(
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      );

      return {
        ...state,
        selectedItems: updatedItems,
        ...sumProducts(updatedItems),
      };
    }

    case "DECREASE": {
      let decrease;
      decrease=state.selectedItems.map(item =>item.id === action.payload.id ? { ...item, quantity: Math.max(0,item.quantity-1)}: {...item})
      decrease=decrease.filter(item=>item.quantity > 0)
    

      return {
        ...state,
        selectedItems: decrease,
        ...sumProducts(decrease),
      };
    }

    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };

    default:
      return state;
  }
}



  return (
    <CartContext.Provider value={{state, dispatch}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  // از این هوک همینجا استفاده میکنیم
  // چیزی که بر میگردونه عملا همون مقادیر value هست
  // برای خروجی destructure کن
  const {state, dispatch} = useContext(CartContext);
  // داخل یک آرایه قرار بده و پاس بده بره
  return {state, dispatch};
}
