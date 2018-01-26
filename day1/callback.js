const sum =  (a,b) =>{
    const c = a + b;
}

const sumCallBack = (a,b, suma, sumb) =>{
    var tongsum = suma(a+b)+sumb(b);
    console.log("this is function sumCall back"+tongsum);
    return suma(a+b)+sumb(b);
}
const tb=(a)=>{
    return a+8;
    }
    
sumCallBack(2, 3, tong =>{
  return tong;
}
,tb
);

