// این تابع کوتاه ککنده متن تایتل نوشته هاست
function shortText(text){
return text.split(" ").slice(0,3).join(" ")
}


// 1️⃣ text.split(" ")

// این دستور متن رو بر اساس فاصله‌ها می‌بره و یه آرایه از کلمات می‌سازه.

// مثلاً:
// اسپلیت یعنی جدا کردن
// "Hello world from GPT".split(" ")
// → ["Hello", "world", "from", "GPT"]

// 2️⃣ .slice(0, 3)

// این قسمت فقط سه تا کلمهٔ اول از آرایهٔ بالا رو نگه می‌داره.

// مثلاً:

// ["Hello", "world", "from", "GPT"].slice(0, 3)
// → ["Hello", "world", "from"]

// 3️⃣ .join("")

// حالا این قسمت اون سه کلمه رو دوباره به هم می‌چسبونه.

// کلمات بهم می‌چسبن 👇

// ["Hello", "world", "from"].join(" ")
// → "Hello world from"



        // گفتم کتگوری نیاد داخل ریسورس بقیه موارد ریتورن بشن
        // به روش دیسکراکچر
        // currentQuery = { category: "laptop", search: "asus" }
        // newQuery = { category: "all" }
        // → نتیجه: { search: "asus" }

    // گفتم سرچ اگر خالی بود نیاد داخل ابجکت بقیه موارد بیان

    // اپدیت کردن متد
    // در غیر این صورت (حالت عادی)

    // اگر فیلدی در newQuery باشد، مقدارش جایگزین مقدار قدیمی می‌شود.

    // currentQuery = { category: "laptop", search: "asus" }
    // newQuery = { search: "lenovo" }
    // → نتیجه: { category: "laptop", search: "lenovo" }



function createQueryObject(currentQuery, newQuery) {
 
  const res = { ...currentQuery, ...newQuery };

  if (newQuery.category === "all") delete res.category;
  if (newQuery.search === "") delete res.search;

  return res;
}


function sumProducts(products){
    let itemsCounter=0;
    let total=0;
    products.forEach(({price,quantity})=>{
        itemsCounter += quantity,
        total += price * quantity
})
    return{itemsCounter,total:total.toFixed(2)}
}



function productQuantity(state,id){
    // ایندکس محصول نظر منو پیدا کن 
    // ایندکس ایتمی که به عنوان ورودی بهت دادم استفاده کن
    const index= state.selectedItems.findIndex((item)=>(item.id === id))
    // ایندکس خالی باشه منفی یک برمیگردونه
    // پس تعیین میکنم که خالی بود صفر برگردونه
    if(index == -1) return 0;
    else{
        return state.selectedItems[index].quantity;
    }


}

export  {shortText,createQueryObject,sumProducts,productQuantity};