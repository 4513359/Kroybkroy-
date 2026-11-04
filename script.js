let products = JSON.parse(localStorage.getItem('products')) || [{id:1,name:"লুঙ্গি",price:500,img:"https://i.imgur.com/Qk0p2bO.jpg"},{id:2,name:"গামছা",price:150,img:"https://i.imgur.com/Qk0p2bO.jpg"}];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentUser=null;
const ADMIN={user:"admin",pass:"Bd#2026@Kroy!123"}; // এডমিন পাসওয়ার্ড চেঞ্জ করে দিন

function save(){localStorage.setItem('products',JSON.stringify(products));localStorage.setItem('cart',JSON.stringify(cart));localStorage.setItem('users',JSON.stringify(users));localStorage.setItem('orders',JSON.stringify(orders));}
function renderProducts(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  const list=document.getElementById('productList'); list.innerHTML='';
  products.filter(p=>p.name.toLowerCase().includes(q)).forEach(p=>{
    list.innerHTML+=`<div class="product"><img src="${p.img}"><h4>${p.name}</h4><p>${p.price} টাকা</p><button onclick="addToCart(${p.id})">কার্টে যোগ</button></div>`;
  });
}
function addToCart(id){const p=products.find(x=>x.id===id); cart.push(p); save(); document.getElementById('cartCount').innerText=cart.length; alert('কার্টে যোগ হয়েছে');}
function openCart(){renderCart(); document.getElementById('cartModal').style.display='block';}
function closeCart(){document.getElementById('cartModal').style.display='none';}
function renderCart(){const div=document.getElementById('cartItems'); div.innerHTML=''; let total=0; cart.forEach((c,i)=>{total+=c.price; div.innerHTML+=`<p>${c.name} - ${c.price} Tk <button onclick="removeCart(${i})">X</button></p>`;}); document.getElementById('cartTotal').innerText=total;}
function removeCart(i){cart.splice(i,1); save(); renderCart(); document.getElementById('cartCount').innerText=cart.length;}
function placeOrder(){
  const name=document.getElementById('cName').value, phone=document.getElementById('cPhone').value, addr=document.getElementById('cAddress').value, pay=document.getElementById('cPay').value;
  if(!name||!phone){alert('নাম ফোন দিন'); return;}
  const total=cart.reduce((s,c)=>s+c.price,0);
  orders.push({name,phone,addr,pay,items:[...cart],total,date:new Date().toLocaleString()});
  save(); cart=[]; save(); alert('অর্ডার হয়েছে! আমরা কল দেব'); closeCart(); renderProducts();
}
function openAuth(){document.getElementById('authModal').style.display='block';}
function closeAuth(){document.getElementById('authModal').style.display='none';}
function register(){
  const name=document.getElementById('aName').value, phone=document.getElementById('aPhone').value, pass=document.getElementById('aPass').value;
  if(!name||!phone||!pass){document.getElementById('authMsg').innerText='সব পূরণ করুন'; return;}
  users.push({name,phone,pass,nid:document.getElementById('aNID').value}); save(); document.getElementById('authMsg').innerText='রেজিস্টার হয়েছে, লগইন করুন';
}
function login(){
  const phone=document.getElementById('aPhone').value, pass=document.getElementById('aPass').value;
  const u=users.find(x=>x.phone===phone&&x.pass===pass);
  if(u){currentUser=u; document.getElementById('authMsg').innerText='লগইন সফল: '+u.name; setTimeout(closeAuth,1000);}else{document.getElementById('authMsg').innerText='ভুল ফোন/পাসওয়ার্ড';}
}
function openAdmin(){document.getElementById('adminModal').style.display='block';}
function closeAdmin(){document.getElementById('adminModal').style.display='none';}
function adminLogin(){
  if(document.getElementById('adminPass').value===ADMIN.pass){document.getElementById('adminLogin').style.display='none'; document.getElementById('adminPanel').style.display='block'; renderAdmin();}
  else{alert('ভুল পাসওয়ার্ড');}
}
function renderAdmin(){
  document.getElementById('totalCustomers').innerText=users.length; document.getElementById('totalOrders').innerText=orders.length;
  document.getElementById('customerList').innerHTML=users.map(u=>`<p>👤 ${u.name} - ${u.phone} - Pass: •••••• (সুরক্ষিত)</p>`).join('');
  document.getElementById('orderList').innerHTML=orders.map(o=>`<p>🛒 ${o.name} ${o.phone} - ${o.total}Tk - ${o.pay}</p>`).join('');
  document.getElementById('adminProductList').innerHTML=products.map(p=>`<p>${p.name} - ${p.price} <button onclick="delProduct(${p.id})">ডিলিট</button></p>`).join('');
}
function addProduct(){
  const name=document.getElementById('pName').value, price=parseInt(document.getElementById('pPrice').value), img=document.getElementById('pImg').value||'https://i.imgur.com/Qk0p2bO.jpg';
  if(!name||!price){alert('নাম দাম দিন'); return;}
  products.push({id:Date.now(),name,price,img}); save(); renderProducts(); renderAdmin();
}
function delProduct(id){products=products.filter(p=>p.id!==id); save(); renderProducts(); renderAdmin();}
renderProducts(); document.getElementById('cartCount').innerText=cart.length;
// PWA
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').then(()=>console.log('App Ready')); }
let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e; const b=document.createElement('button'); b.innerText='📲 অ্যাপ ইন্সটল করুন'; b.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#ff8c00;color:#000;padding:12px 20px;border:none;border-radius:25px;font-weight:bold;z-index:9999'; b.onclick=()=>{deferredPrompt.prompt();}; document.body.appendChild(b);});
