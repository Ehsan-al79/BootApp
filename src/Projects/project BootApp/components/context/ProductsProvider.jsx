// این کامپوننت قراره رپ کنیم دور برناممون

import { createContext,useState,useEffect,useContext} from "react"
import api from "../../services/config";

// ساخت کانتکست اکسپورت نداریم چون همینجا از هوک یوز کانتکست استفاده میکنیم
const ProductsContext=createContext();


export default function ProductsProvider({children}) {
  // ساخت استیت برای گرفتن محصولات
  const [products, setProducts] = useState([]);
  // گرفتن دیتا از بک 

  useEffect(() => {
    // گرفتن دیتا با تابع async
    async function fetchProducts(){
      try{
        // خودش ادرس پروداکت رو به ته ادرس اصلی اضافه میکنه
      const res=await api.get("/products")
      setProducts(res)
      } catch(error){
        console.log(error.message)

      }

    }
    fetchProducts();
    
  }, []);
  return (
    // ساخت و استفاده از context
    <ProductsContext.Provider value={{products}}>
      {children}
    </ProductsContext.Provider>
  )
}
// این تابع مینویسیم برای اینکه نخواهیم هی تو هر صفحه یوزکانتکس رو ایمپورت کنیم بجاش میایم این تابع رو میگیریم
// custom hook
export function useProducts(){
  // از این هوک همینجا استفاده میکنیم
  // و مقادیرشو پاس میدیم بره
  // عملا چیزی که این تابع بر میگردونه مقدار استیت products هست
      const product=useContext(ProductsContext)
      return product;
}





