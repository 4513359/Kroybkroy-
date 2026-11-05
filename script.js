let products = JSON.parse(localStorage.getItem('products')) || [
{id:1,name:"প্রিমিয়াম লুঙ্গি",price:500,oldPrice:700,cat:"লুঙ্গি",img:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"},
{id:2,name:"সুতি গামছা - বড় সাইজ",price:150,oldPrice:200,cat:"গামছা",img:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"},
{id:3,name:"প্রিমিয়াম পাঞ্জাবি",price:1200,oldPrice:1500,cat:"পাঞ্জাবি",img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"},
{id:4,name:"সুতি শাড়ি",price:1800,oldPrice:2200,cat:"শাড়ি",img:"https://images.unsplash.com/photo-1610189844802-1c8a3b5b0c1a?w=500"},
{id:5,name:"টি-শার্ট - কটন",price:450,oldPrice:600,cat:"টি-শার্ট",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"},
{id:6,name:"জিন্স প্যান্ট",price:900,oldPrice:1100,cat:"প্যান্ট",img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"},
{id:7,name:"চেক লুঙ্গি",price:450,oldPrice:550,cat:"লুঙ্গি",img:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"},
{id:8,name:"সিল্ক শাড়ি",price:2500,oldPrice:3000,cat:"শাড়ি",img:"https://images.unsplash.com/photo-1610189844802-1c8a3b5b0c1a?w=500"}
];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentCat = 'all';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
function save(){
localStorage.setItem('products',JSON.stringify(products));
localStorage.setItem('cart',JSON.stringify(cart));
localStorage.setItem('users',JSON.stringify(users));
localStorage.setItem('orders',JSON.stringify(orders));
localStorage.setItem('currentUser',JSON.stringify(currentUser));
}
function filterCat(cat){
currentCat = cat;
document.querySelectorAll('.cats button').forEach(b=>b.classList.remove('active'));
event.target.classList.add('active');
renderProducts();
}
function renderProducts(){
const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
const l = document.getElementById('productList');
if(!l) return;
let list = products.filter(p => p.name.toLowerCase().includes(q));
if(currentCat !== 'all') list = list.filter(p => p.cat === currentCat);
document.getElementById('noProduct').style.display = list.length===0 ? 'block' : 'none';
l.innerHTML = '';
list.forEach(p=>{
l.innerHTML += `<div><img src="${p.img}" onerror="this.src='https://via.placeholder.com/500?text=${encodeURIComponent(p.name)}'"><div class="cat">${p.cat||'পণ্য'}</div><h4>${p.name}</h4><p>${p.price} Tk ${p.oldPrice?`<span class="old">${p.oldPrice} Tk</span>`:''}</p><button onclick="addToCart(${p.id})">🛒 কার্টে যোগ করুন</button></div>`;
});
}
function addToCart(id){
const p = products.find(x=>x.id===id);
cart.push(p); save();
document.getElementById('cartCount').innerText = cart.length;
alert(p.name + ' কার্টে যোগ হয়েছে!');
}
function openCart(){ renderCart(); document.getElementById('cartModal').style.display='block'; }
function closeCart(){ document.getElementById('cartModal').style.display='none'; }
function renderCart(){
let sub = 0;
document.getElementById('cartItems').innerHTML = cart.length===0 ? '<p>কার্ট খালি - পণ্য যোগ করুন</p>' : cart.map((c,i)=>{
sub += c.price;
return `<p>${c.name} - ${c.price}Tk <button onclick="removeCart(${i})">X</button></p>`;
}).join('');
let area = document.getElementById('cArea')?.value || 'মেষ্টা';
let del = area==='মেষ্টা'?30 : area==='জামালপুর সদর'?60 : 120;
document.getElementById('deliveryCharge').innerText = cart.length?del:0;
document.getElementById('cartTotal').innerText = sub + (cart.length?del:0);
if(currentUser){
document.getElementById('cName').value = currentUser.name||'';
document.getElementById('cPhone').value = currentUser.phone||'';
document.getElementById('cAddress').value = currentUser.address||'';
}
}
function removeCart(i){ cart.splice(i,1); save(); renderCart(); document.getElementById('cartCount').innerText = cart.length; }
function placeOrder(){
const n=document.getElementById('cName').value.trim();
const ph=document.getElementById('cPhone').value.trim();
const ad=document.getElementById('cAddress').value.trim();
const area=document.getElementById('cArea').value;
if(cart.length===0){ alert('কার্ট খালি!'); return; }
if(!n||!ph||!ad){ alert('নাম, ফোন, ঠিকানা সব দিন'); return; }
let sub = cart.reduce((s,c)=>s+c.price,0);
let del = area==='মেষ্টা'?30 : area==='জামালপুর সদর'?60 : 120;
orders.push({id:Date.now(),name:n,phone:ph,address:ad,area:area,total:sub+del,items:[...cart],date:new Date().toLocaleString('bn-BD'),status:'নতুন'});
save(); cart=[]; save();
alert('✅ অর্ডার সফল হয়েছে!\nমোট: '+(sub+del)+' Tk\nআমরা কল দিবো: '+ph);
closeCart(); document.getElementById('cartCount').innerText=0;
}
function openAuth(){
document.getElementById('authModal').style.display='block';
if(currentUser){
document.getElementById('userInfo').innerText = 'লগইন আছেন: '+currentUser.name+' ('+currentUser.phone+')';
document.getElementById('logoutBtn').style.display='block';
}
}
function closeAuth(){ document.getElementById('authModal').style.display='none'; }
function register(){
const n=document.getElementById('aName').value.trim();
const ph=document.getElementById('aPhone').value.trim();
const pa=document.getElementById('aPass').value.trim();
const nid=document.getElementById('aNID').value.trim();
const ad=document.getElementById('aAddress').value.trim();
if(!n||!ph||!pa){ document.getElementById('authMsg').innerText='❌ নাম, ফোন, পাসওয়ার্ড দিন'; return; }
if(users.find(u=>u.phone===ph)){ document.getElementById('authMsg').innerText='❌ এই নাম্বারে একাউন্ট আছে, লগইন করুন'; return; }
let u={name:n,phone:ph,pass:pa,nid:nid,address:ad,date:new Date().toLocaleString('bn-BD')};
users.push(u); currentUser=u; save();
document.getElementById('authMsg').innerText='✅ রেজিস্টার সফল! স্বাগতম '+n;
document.getElementById('userInfo').innerText='লগইন আছেন: '+n;
document.getElementById('logoutBtn').style.display='block';
}
function login(){
const ph=document.getElementById('aPhone').value.trim();
const pa=document.getElementById('aPass').value.trim();
const u=users.find(x=>x.phone===ph && x.pass===pa);
if(u){ currentUser=u; save(); document.getElementById('authMsg').innerText='✅ লগইন সফল: '+u.name; document.getElementById('userInfo').innerText='লগইন আছেন: '+u.name; document.getElementById('logoutBtn').style.display='block'; setTimeout(closeAuth,1000); }
else{ document.getElementById('authMsg').innerText='❌ ফোন বা পাসওয়ার্ড ভুল'; }
}
function logout(){ currentUser=null; save(); document.getElementById('authMsg').innerText='লগআউট হয়েছে'; document.getElementById('userInfo').innerText=''; document.getElementById('logoutBtn').style.display='none'; }
function openAdmin(){ document.getElementById('adminModal').style.display='block'; }
function closeAdmin(){ document.getElementById('adminModal').style.display='none'; }
function adminLogin(){
if(document.getElementById('adminPass').value==='b13967890'){
document.getElementById('adminLogin').style.display='none';
document.getElementById('adminPanel').style.display='block';
renderAdmin();
}else{ alert('❌ পাসওয়ার্ড ভুল'); }
}
function renderAdmin(){
document.getElementById('totalCustomers').innerText = users.length;
document.getElementById('totalOrders').innerText = orders.length;
document.getElementById('totalProducts').innerText = products.length;
document.getElementById('totalSale').innerText = orders.reduce((s,o)=>s+o.total,0);
document.getElementById('customerList').innerHTML = users.length===0?'<p>কোনো কাস্টমার নাই</p>':users.map(u=>`<p>👤 <b>${u.name}</b><br>📞 ${u.phone} | NID: ${u.nid||'-'}<br>📍 ${u.address||'-'}<br>📅 ${u.date||''}</p>`).join('');
document.getElementById('orderList').innerHTML = orders.length===0?'<p>কোনো অর্ডার নাই</p>':orders.map((o,i)=>`<p>🛒 <b>অর্ডার #${i+1}</b> - ${o.status}<br>👤 ${o.name} - 📞 ${o.phone}<br>📍 ${o.address} (${o.area})<br>💰 ${o.total} Tk - 📅 ${o.date}<br>📦 ${o.items.map(it=>it.name).join(', ')}<br><button onclick="delOrder(${o.id})">ডিলিট</button> <button onclick="doneOrder(${o.id})" style="background:#28a745">ডেলিভারি সম্পন্ন</button></p>`).join('');
document.getElementById('adminProductList').innerHTML = products.map(p=>`<p><img src="${p.img}" onerror="this.src='https://via.placeholder.com/50'">${p.name} - ${p.price}Tk (${p.cat}) <button onclick="delProduct(${p.id})">ডিলিট</button></p>`).join('');
}
function addProduct(){
const n=document.getElementById('pName').value.trim();
const pr=parseInt(document.getElementById('pPrice').value);
const oldP=parseInt(document.getElementById('pOldPrice').value)||0;
const img=document.getElementById('pImg').value.trim()||'https://via.placeholder.com/500?text='+encodeURIComponent(n);
const cat=document.getElementById('pCat').value.trim()||'পণ্য';
if(!n||!pr){ alert('নাম ও দাম দিন'); return; }
products.push({id:Date.now(),name:n,price:pr,oldPrice:oldP,cat:cat,img:img});
save(); renderProducts(); renderAdmin();
document.getElementById('pName').value='';document.getElementById('pPrice').value='';document.getElementById('pOldPrice').value='';document.getElementById('pImg').value='';document.getElementById('pCat').value='';
alert('✅ পণ্য যোগ হয়েছে');
}
function delProduct(id){ if(confirm('ডিলিট করবেন?')){ products=products.filter(p=>p.id!==id); save(); renderProducts(); renderAdmin(); } }
function delOrder(id){ if(confirm('অর্ডার ডিলিট করবেন?')){ orders=orders.filter(o=>o.id!==id); save(); renderAdmin(); } }
function doneOrder(id){ let o=orders.find(x=>x.id===id); if(o){o.status='ডেলিভারি সম্পন্ন'; save(); renderAdmin();} }
function clearAllData(){ if(confirm('সব ডাটা মুছবেন?')){ localStorage.clear(); location.reload(); } }
function togglePass(id,el){ const i=document.getElementById(id); if(i.type==='password'){i.type='text';el.innerText='🙈';}else{i.type='password';el.innerText='👁️';} }
renderProducts();
document.getElementById('cartCount').innerText = cart.length;
document.getElementById('cArea')?.addEventListener('change',renderCart);
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js'); }
