import { useParams, Link } from "react-router-dom";
import api from "../../services/config";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function DetailPage() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`);
        setProductDetail(res);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProduct();
  }, [id]);


  return (
    productDetail ? ( 
    <div className="bg-gradient-to-b from-[#f8f8f8] to-[#ffffff] flex justify-center items-center md:px-8 rounded-2xl max-md:py-10 md:py-32">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 max-md:p-5 p-[72px] flex flex-col md:flex-row gap-10">
      
        <div className="flex justify-center items-center ">
          <img
            src={productDetail.image}
            alt={productDetail.title}
            className="w-72 h-72 rounded-2xl shadow-md border border-gray-100 hover:scale-105 transition-transform duration-300 p-3"
          />
        </div>

        
        <div className="flex-1 flex flex-col justify-center gap-5">
          <h2 className="text-2xl font-bold text-gray-800 leading-snug">
            {productDetail.title}
          </h2>
          <p className="text-gray-600 text-[16px] leading-relaxed">
            {productDetail.description}
          </p>
          <p className="text-3xl font-semibold text-red-500 mt-2">
            ${productDetail.price}
          </p>


          <Link
            to="/products"
            className="mt-6  text-sm text-center hover:bg-red-700 transition-color duration-200 bg-[#fa3815] py-2 rounded-2xl text-white"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>) : (<Loading/>)
   
  );
}
