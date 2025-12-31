import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";
import { useProducts } from "../context/ProductsProvider";
import { Link, useSearchParams } from "react-router-dom";
import {
  shortText,
  createQueryObject,
  productQuantity,
} from "../../helpers/helper";
import Loading from "./Loading";
import SearchBox from "./SearchBox";
import { useState, useEffect,} from "react";
// import { useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { useCart } from "../context/CartProvider";
import { MdDeleteOutline } from "react-icons/md";
import { useTitle } from "../../../../customHooks/useTitle";

export default function ProductsPage() {
  useTitle("Shop Market")
  // متغیر رف برای فوکوس خودکار تگ سرچ
  // const searchInput=useRef(null)
  // استیت ارسالی از ردیوسر داخل کانتکس کارت
  const { state, dispatch } = useCart();

  // ایمپورت محصولات از کانتکست
  const { products } = useProducts();
  // استیت نمایش داده ها بطور پیش فرض روی همه
  const [query, setQuery] = useState({
    category: "",
    search: "",
  });
  // استیت تنظیم کوعری روی یو ار ال
  const [searchParams, setsearchParams] = useSearchParams();
  // استیت برای مقدار دهی اولیه تگ اینپوت
  const [search, setSearch] = useState("");
  // تابع گرفتن مقادیر جدید برای رندر دوباره
  const [filteredProducts, setFilteredProducts] = useState([]);

  // یوز افکت اجرای لود اول کامپوننت
  useEffect(() => {
    // لود دیتای کل
    setFilteredProducts(products);
    // میخواهیم وقتی صفحه لود شد محتوای ما باقی بمونه
    const currnetquery = {};
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) currnetquery.category = category;
    if (search) currnetquery.search = search;

    setQuery(currnetquery);
    // دستور فوکوس برای فوکوس روی تگ و علامنت سوال برای اینکه به مقدار نال اولیه گیر نده
    // searchInput.current?.focus()
  }, [products, searchParams]);

  useEffect(() => {
    // اول از همه از products یه کپی می‌گیریم (برای اینکه اصل داده‌ها تغییر نکنه).
    let updatedProducts = [...products];

    // 🔍 فیلتر بر اساس دسته‌بندی
    //  وقتی شرط روی آل باشه همون پروداکتس قبلی یعنی دیتای کل به ست کننده داده میشه
    // یعنی این شرط اجرا نمیشه
    // گفتم اگر کتگوری وجود داشت یعنی روی allنبود
    if (query.category) {
      
      updatedProducts = updatedProducts.filter(
        (item) => item.category.toLowerCase() === query.category
      );
    }

    // 🔎 فیلتر بر اساس جستجو
    // trim() باعث میشه فاصله‌های اضافی هم نادیده گرفته بشن.
    // دوبار رو خودش فیلتر زد تا شرط اعمال بشه
    // اگر چیزی توی سرچ نباشه اجرا نمیشه
    if (query.search) {
      
      updatedProducts = updatedProducts.filter((item) =>
        item.title.toLowerCase().includes(query.search)
      );
    }
    // اعمال دیتا
    setFilteredProducts(updatedProducts);
    // میخوام اگر صفحه رفرش شد محتوای تگ اینپوت رو صفحه باشه

    setSearch(query.search || "");
    setsearchParams(query);
  }, [query, products, setsearchParams]);

  // وقتی دکمه سرچ میزنم مقادیر داخل کوِری ست میشن

  function categoryHandler(event) {
    // دسترسی به نام تگ که اگر کاربر روی تگ کلیک نکرد اتفاقی نیافته
    const name = event.target.tagName.toLowerCase();
    const category = event.target.innerText.toLowerCase().trim();
    // شرط بررسی اینکه حتما روی تگ کلیک کرده باشه تا برنامه ادامه پیدا کنه
    switch (name) {
      case "span":
        // کوءیری کتگکوری
        // ساخت یک کلید به نام خودش
        setQuery((query) => createQueryObject(query, { category }));
        break;

      default:
        return;
    }
  }

  return (
    <>
      {products.length ? (
        <>
          <SearchBox
            setQuery={setQuery}
            search={search}
            setSearch={setSearch}
            // searchInput={searchInput}
          />
          <div className="w-full max-2xl:flex-col-reverse  flex gap-2  py-10 ">
            <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 max-xl:gap-x-10 xl:grid-cols-3 gap-y-10 gap-x-20 max-2xl:w-full 2xl:w-3/4 ">
              {filteredProducts.length ? (
                filteredProducts.map((item) => {
                  // بررسی تعداد هر محصول در سبد خودش برای نمایش داده ها و نوعی استیت
                  const quantity = productQuantity(state, item.id);
                  // چون بصورت ابجکت باز کردیم و بالا منطق نوشتیم پس اینجا از ریتورن استفاده میکنیم
                  return (
                    
                    <div
                      key={item.id}
                      className="border-2  bg-[#fff] border-[#e2e2e2] border-dashed p-4 group flex flex-col rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className=" flex my-10 justify-center">
                        <img
                          className="w-56 h-56  transition-transform duration-300 group-hover:scale-105"
                          src={item.image}
                          alt={shortText(item.title)}
                      
                        />
                      </div>
                      <span className="text-[#f8310e] font-bold text-xl">
                        {/* استفاده از تابع کوتاه کننده */}
                        {shortText(item.title)}
                      </span>
                      <span className="text-[#666] font-semibold my-3">
                        $ {item.price}
                      </span>
                      <div className="flex justify-between mt-5">
                        <Link to={`/products/${item.id}`}>
                          <TbListDetails className="text-[#ff310d] w-8 h-8 transition-all duration-150 hover:scale-110" />
                        </Link>
                        {quantity === 0 ? (
                          // اگر محصول هنوز در سبد نیست:
                          <button
                            onClick={() =>
                              dispatch({ type: "ADD_ITEM", payload: item })
                            }
                          >
                            <TbShoppingBagCheck className="bg-[#fa3d1c] text-white rounded-sm p-[1px] w-8 h-8 cursor-pointer transition-all duration-150 hover:scale-105" />
                          </button>
                        ) : (
                          // اگر محصول در سبد هست:
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                dispatch({ type: "INCREASE", payload: item })
                              }
                              className="bg-green-500 text-white rounded-sm w-8 h-8 text-2xl flex justify-center items-center cursor-pointer"
                            >
                              +
                            </button>

                            <span className="font-semibold size-5 flex justify-center items-center ">
                              {quantity}
                            </span>

                            {quantity > 1 ? (
                              <button
                                onClick={() =>
                                  dispatch({ type: "DECREASE", payload: item })
                                }
                                className="bg-[#fa3d1c] text-white rounded-sm p-[1px] w-8 h-8 cursor-pointer text-2xl"
                              >
                                −
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE_ITEM",
                                    payload: item,
                                  })
                                }
                                className="bg-red-500 text-white rounded-sm w-8 h-8 transition-all duration-150 hover:scale-110 cursor-pointer"
                              >
                                <MdDeleteOutline className=" w-8 h-8" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center h-[60vh] bg-[#fff] rounded-2xl shadow-inner border border-gray-200">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486742.png"
                    alt="No results"
                    className="w-28 h-28 opacity-60 mb-6"
                  />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    No Results Found
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search or category filters
                  </p>
                </div>
              )}
            </div>
            <aside className="2xl:pl-10 max-sm:px-10 2xl:w-1/4 pb-5">
              <div className="flex sm:w-[300px] flex-col px-4 py-5  bg-white rounded-xl border-dashed border-[#e2e2e2] border-2 ">
                <div className="flex justify-start items-center gap-x-5 text-[#f8310e] ">
                  <span>
                    <FaListUl className="text-xl -mb-1" />
                  </span>
                  <span className="text-xl">Categories</span>
                </div>
                <div
                  onClick={categoryHandler}
                  className="grid mt-2 [&>*]:p-2 [&>*]:rounded-xl   sm:grid-cols-1  gap-y-2 [&>*]:hover:text-red-500 [&>*]:hover:cursor-pointer  [&>*]:transition-all [&>*]:duration-200  "
                >
                  <span
                    className={
                      !query.category
                        ? "bg-red-200 text-red-600 "
                        : " bg-transparent "
                    }
                  >
                    All
                  </span>
                  <span
                    className={
                      query.category === "electronics"
                        ? "bg-red-200 text-red-600 "
                        : "bg-transparent "
                    }
                  >
                    Electronics
                  </span>
                  <span
                    className={
                      query.category === "jewelery"
                        ? "bg-red-200 text-red-600 "
                        : "bg-transparent "
                    }
                  >
                    Jewelery
                  </span>
                  <span
                    className={
                      query.category === "men's clothing"
                        ? "bg-red-200 text-red-600 "
                        : "bg-transparent "
                    }
                  >
                    Men's Clothing
                  </span>
                  <span
                    className={
                      query.category === "women's clothing"
                        ? "bg-red-200 text-red-600 "
                        : "bg-transparent "
                    }
                  >
                    Women's Clothing
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
