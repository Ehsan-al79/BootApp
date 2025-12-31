import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProductsPage from "./Projects/project BootApp/components/pages/ProductsPage";
import DetailProductPage from "./Projects/project BootApp/components/pages/DetailProductPage";
import BasketPage from "./Projects/project BootApp/components/pages/BasketPage";
import NotFound from "./Projects/project BootApp/components/pages/NotFound";
import ProductsProvider from "./Projects/project BootApp/components/context/ProductsProvider";
import CartProvider from "./Projects/project BootApp/components/context/CartProvider";
import Layout from "./Projects/project BootApp/components/pages/Layout";

function App() {
  return (
    <>
      {/*   در تمامی این روت ها به به محتوای این کانتکست دسترسی دارم*/}
      {/* کلا هر چی کانتکس باشه رپ میشه دور روت ها و اولویت کانتکس ها هم بر اساس دیتایی که داریم */}
      <CartProvider>
        <ProductsProvider>
           <BrowserRouter>
          <Layout>
           
          <Routes>
            {/* در صفحه اصلی میخوام ادرس نویگیت بشه به صفحه پروداکتس یعنی کاربر پاس بخوره به صفحه پروداکتس */}
            <Route path="/" element={<Navigate to="/products" replace />} />
            {/* صفحه اصلی که در اون محصولات نمایش میدیم */}
            <Route path="/products" element={<ProductsPage />} />
            {/* صفحه جزییات هر محصول */}
            <Route path="/products/:id" element={<DetailProductPage />} />
            {/* صفحه سبد خرید */}
            <Route path="/basketpage" element={<BasketPage />} />
            {/* صفحه 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          </Layout>
          </BrowserRouter>
        </ProductsProvider>
        </CartProvider>
   
    </>
  );
}

export default App;
