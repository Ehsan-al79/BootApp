import axios from "axios";
// فچ کردن ای پی ای توسط اکسیوس و ساخت یک سو ار ال جدید
const api = axios.create({ baseURL: "https://fakestoreapi.com" });
// اینجا میخوام تعیین کنم که فقط دیتایی که ما میخوایم بیاد
// چون داخل اروفانکشن هست نیاز به نوشتن ریترن نیست
api.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

export default api