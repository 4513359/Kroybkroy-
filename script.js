const WEB3FORMS_KEY = "5d0eaf6c-d337-4d68-a7f9-ab5e00687b8e";
let DARAZ_AFF_ID = "170792315";
let ALI_AFF_ID = "bd1255724598ozuae";

// ===== লিংক থেকে অটো তথ্য আনা =====
let _autoImg = "";
let _autoLink = "";
let _autoFetching = false;

function buildAffiliateLink(link){
  if(!link) return link;
  try{
    let u = new URL(link);
    if(u.hostname.includes('daraz.com') && !u.searchParams.has('aff_id')){
      u.searchParams.set('aff_id', DARAZ_AFF_ID);
    }
    if(u.hostname.includes('aliexpress.com') && !u.searchParams.has('aff_fcid')){
      u.searchParams.set('aff_fcid', ALI_AFF_ID);
    }
    return u.toString();
  }catch(e){ return link; }
}

async function autoFillFromLink(link){
  _autoLink = (link||"").trim();
  if(!_autoLink || _autoLink.length < 15) return null;
  let st = document.getElementById('linkStatus');
  if(st) st.innerText = '⏳ Daraz থেকে তথ্য আনতেছি...';
  _autoFetching = true;
  try{
    let res = await fetch('https://api.allorigins.win/raw?url='+encodeURIComponent(_autoLink));
    let html = await res.text();
    let doc = new DOMParser().parseFromString(html,'text/html');
    let title = doc.querySelector('meta[property="og:title"]')?.content || doc.title || '';
    let img = doc.querySelector('meta[property="og:image"]')?.content || '';
    let m = html.match(/"price"\s*:\s*"?([\d,\.]+)/) || html.match(/৳\s*([\d,]+)/) || html.match(/\$([\d,\.]+)/);
    let price = m ? m[1].replace(/,/g,'') : '';
    let nEl = document.getElementById('aName');
    let pEl = document.getElementById('aPrice');
    if(title && nEl && !nEl.value) nEl.value = title.replace(' | Daraz.com.bd','').replace(' | AliExpress','').slice(0,60);
    if(price && pEl && !pEl.value) pEl.value = price;
    if(img){
      img = img.replace(/_220x220\.jpg/g,'_720x720.jpg').replace(/_200x200/g,'_720x720');
      _autoImg = img;
      let pv = document.getElementById('adminPreview');
      if(pv) pv.src = img;
    }
    if(st) st.innerText = '✅ হয়ে গেছে! এখন শুধু ✅ যোগ করুন চাপেন';
    _autoFetching = false;
    return {title, price, img};
  }catch(e){
    if(st) st.innerText = '⚠️ অটো আসলো না, স্মার্ট পেস্ট বাক্সে কপি করে পেস্ট করেন';
    _autoFetching = false;
    return null;
  }
}

function createLinkInput(){
  let desc = document.getElementById('aDesc');
  if(!desc || document.getElementById('aLink')) return;
  let inp = document.createElement('input');
  inp.id = 'aLink';
  inp.placeholder = '🔗 শুধু Daraz / AliExpress লিংক বসান - বাকিটা অটো আসবে';
  inp.style.cssText = 'width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #555;background:#222;color:#fff;';
  let st = document.createElement('p');
  st.id = 'linkStatus';
  st.style.cssText = 'color:#ffe600;font-size:11px;text-align:center;margin:2px 0;';
  st.innerText = 'লিংক বসালেই নাম-দাম-ছবি অটো আসবে';
  desc.parentNode.insertBefore(inp, desc);
  desc.parentNode.insertBefore(st, desc);
  inp.addEventListener('input', e=> autoFillFromLink(e.target.value));
  inp.addEventListener('change', ()=>{
    let v = inp.value.toLowerCase();
    let pl = document.getElementById('aPlatform');
    if(pl){
      if(v.includes('daraz')) pl.value = 'daraz';
      else if(v.includes('aliexpress') || v.includes('aliex')) pl.value = 'ali';
    }
  });
}

// ===== স্মার্ট পেস্ট - কপি করা লেখা থেকে সব ফরম অটো পূরণ =====
function createSmartPaste(){
  let desc = document.getElementById('aDesc');
  if(!desc || document.getElementById('smartPaste')) return;
  let box = document.createElement('textarea');
  box.id = 'smartPaste';
  box.placeholder = '📋 এখানে Daraz থেকে কপি করা পুরা লেখাটা পেস্ট করেন - নাম, দাম, লিংক, বিবরণ সব অটো পূরণ হবে';
  box.style.cssText = 'width:100%;height:80px;padding:10px;margin:5px 0;border-radius:8px;border:2px dashed #ff8c00;background:#222;color:#fff;';
  let tip = document.createElement('p');
  tip.style.cssText = 'color:#ffe600;font-size:11px;text-align:center;margin:2px 0;';
  tip.innerText = '👆 উপরের বাক্সে পেস্ট করলেই নিচের সব ঘর অটো ভরে যাবে';
  let linkEl = document.getElementById('aLink');
  let target = linkEl ? linkEl : desc;
  target.parentNode.insertBefore(box, target);
  target.parentNode.insertBefore(tip, target);
  box.addEventListener('paste', (e)=>{ setTimeout(()=> smartParse(box.value), 100); });
  box.addEventListener('input', ()=> smartParse(box.value));
}

function smartParse(text){
  if(!text || text.length < 10) return;
  let nameEl = document.getElementById('aName');
  let priceEl = document.getElementById('aPrice');
  let linkEl = document.getElementById('aLink');
  let descEl = document.getElementById('aDesc');
  let catEl = document.getElementById('aCat');
  let platEl = document.getElementById('aPlatform');
  let pv = document.getElementById('adminPreview');
  let linkMatch = text.match(/https?:\/\/[^\s]+/);
  if(linkMatch && linkEl){
    let link = linkMatch[0].replace(/[),.]+$/,'');
    // ছবির লিংক হইলে আলাদা
    if(link.match(/\.(jpg|jpeg|png|webp)/i)){
      _autoImg = link; tempAdminPhoto = link; if(pv) pv.src = link;
    } else {
      linkEl.value = link;
      if(platEl){
        if(link.toLowerCase().includes('daraz')) platEl.value = 'daraz';
        else if(link.toLowerCase().includes('aliexpress')||link.toLowerCase().includes('aliex')) platEl.value = 'ali';
      }
    }
    text = text.replace(link,'');
  }
  let priceMatch = text.match(/(?:৳|Tk\.?|BDT|Rs\.?|Price:?)\s*([\d,]{3,6})/i) || text.match(/([\d,]{3,6})\s*(?:টাকা|৳)/);
  if(priceMatch && priceEl){
    priceEl.value = priceMatch[1].replace(/,/g,'');
  }
  let lines = text.split('\n').map(s=>s.trim()).filter(s=>s.length>3 && !/^(৳|Tk|BDT|Price|https)/i.test(s));
  if(lines.length && nameEl){
    let name = lines.sort((a,b)=>b.length-a.length)[0];
    name = name.replace(/(৳|Tk|BDT).*$/,'').trim().slice(0,80);
    if(name) nameEl.value = name;
  }
  if(descEl){
    let clean = text.replace(/\n{3,}/g,'\n').trim().slice(0,300);
    if(clean) descEl.value = clean;
  }
  if(catEl){
    let low = text.toLowerCase();
    if(low.includes('watch')||low.includes('ঘড়ি')) catEl.value = 'watch';
    else if(low.includes('shoe')||low.includes('জুতা')||low.includes('sneaker')) catEl.value = 'shoe';
    else if(low.includes('bag')||low.includes('ব্যাগ')) catEl.value = 'bag';
    else if(low.includes('mobile')||low.includes('phone')||low.includes('মোবাইল')) catEl.value = 'mobile';
    else if(low.includes('dress')||low.includes('shirt')||low.includes('ফ্যাশন')) catEl.value = 'fashion';
    else if(low.includes('toy')||low.includes('খেলনা')) catEl.value = 'toy';
    else if(low.includes('beauty')||low.includes('makeup')||low.includes('বিউটি')) catEl.value = 'beauty';
    else if(low.includes('home')||low.includes('হোম')) catEl.value = 'home';
    else if(low.includes('kid')||low.includes('baby')||low.includes('বাচ্চা')) catEl.value = 'kids';
    else if(low.includes('electronic')||low.includes('ইলেকট্রনিক')) catEl.value = 'elect';
    else if(low.includes('sport')) catEl.value = 'sports';
  }
  let st = document.getElementById('linkStatus');
  if(st) st.innerText = '✅ সব ফরম অটো পূরণ হইছে! এখন শুধু ✅ যোগ করুন চাপেন';
}

// ===== ছবি - Daraz ব্লক করলেও লিংক থেকে ছবি আনা + স্ক্রিনশট / পেস্ট =====
function createFetchImageBtn(){
  let linkEl = document.getElementById('aLink');
  let pv = document.getElementById('adminPreview');
  if(!linkEl || !pv || document.getElementById('fetchImgBtn')) return;
  let btn = document.createElement('button');
  btn.id = 'fetchImgBtn';
  btn.type = 'button';
  btn.innerText = '🖼️ লিংক থেকে ছবি অটো আনুন (কপি লাগবো না)';
  btn.style.cssText = 'width:100%;padding:12px;margin:5px 0;border-radius:8px;border:0;background:#ff8c00;color:#000;font-weight:700;';
  linkEl.parentNode.insertBefore(btn, linkEl.nextSibling);
  btn.onclick = async ()=>{
    let link = linkEl.value.trim();
    if(!link){ alert('আগে লিংক বসান'); return; }
    btn.innerText = '⏳ ছবি আনতেছি...';
    try{
      let res = await fetch('https://api.allorigins.win/raw?url='+encodeURIComponent(link));
      let html = await res.text();
      let doc = new DOMParser().parseFromString(html,'text/html');
      let img = doc.querySelector('meta[property="og:image"]')?.content
             || doc.querySelector('meta[name="og:image"]')?.content
             || (html.match(/https:\/\/[^"]+\.(jpg|jpeg|png|webp)/i)||[])[0]
             || '';
      if(img){
        img = img.replace(/_220x220\.jpg/g,'_720x720.jpg').replace(/_200x200/g,'_720x720');
        _autoImg = img; tempAdminPhoto = img; pv.src = img;
        btn.innerText = '✅ ছবি চলে আসছে!';
      }else{
        btn.innerText = '⚠️ ছবি পাইলাম না, স্ক্রিনশট দেন';
        alert('Daraz ছবি ব্লক করছে, স্ক্রিনশট দেন');
      }
    }catch(e){
      btn.innerText = '⚠️ হয় নাই, স্ক্রিনশট দেন';
    }
  };
}

function createImagePaste(){
  let pv = document.getElementById('adminPreview');
  if(!pv || document.getElementById('imgUrlInput')) return;
  let urlInp = document.createElement('input');
  urlInp.id = 'imgUrlInput';
  urlInp.placeholder = '🖼️ ছবির লিংক বসান (যদি থাকে) - অথবা নিচের বাক্সে ছবি / স্ক্রিনশট Paste করেন';
  urlInp.style.cssText = 'width:100%;padding:10px;margin:5px 0;border-radius:8px;border:1px solid #555;background:#222;color:#fff;';
  pv.parentNode.insertBefore(urlInp, pv);
  urlInp.addEventListener('input', ()=>{
    let v = urlInp.value.trim();
    if(v.startsWith('http') && (v.includes('.jpg')||v.includes('.png')||v.includes('.webp')||v.includes('.jpeg')||v.includes('alicdn')||v.includes('daraz'))){
      _autoImg = v; pv.src = v; tempAdminPhoto = v;
    }
  });
  let pasteBox = document.createElement('div');
  pasteBox.id = 'imgPasteBox';
  pasteBox.contentEditable = true;
  pasteBox.innerHTML = '📋 এখানে ক্লিক করে <b>Paste</b> করেন - স্ক্রিনশট / কপি করা ছবি এখানে বসে যাবে। Daraz ছবি না দিলে স্ক্রিনশট নিয়ে এখানে Paste করেন।';
  pasteBox.style.cssText = 'width:100%;min-height:60px;padding:12px;margin:5px 0;border-radius:8px;border:2px dashed #0f9d58;background:#1a2a1a;color:#fff;text-align:center;font-size:13px;';
  pv.parentNode.insertBefore(pasteBox, pv);
  pasteBox.addEventListener('paste', (e)=>{
    let items = e.clipboardData.items;
    for(let it of items){
      if(it.type.indexOf('image') !== -1){
        let file = it.getAsFile();
        let r = new FileReader();
        r.onload = ev=>{
          tempAdminPhoto = ev.target.result;
          _autoImg = ev.target.result;
          pv.src = ev.target.result;
          pasteBox.innerHTML = '✅ ছবি বসে গেছে!';
        };
        r.readAsDataURL(file);
        e.preventDefault();
        return;
      }
    }
    setTimeout(()=>{
      let t = pasteBox.innerText.trim();
      if(t.startsWith('http') && t.includes('.')){
        _autoImg = t; tempAdminPhoto = t; pv.src = t;
        pasteBox.innerHTML = '✅ ছবির লিংক বসে গেছে!';
      }
    }, 100);
  });
  let sp = document.getElementById('smartPaste');
  if(sp){
    sp.addEventListener('input', ()=>{
      let m = sp.value.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp)/i);
      if(m){ _autoImg = m[0]; tempAdminPhoto = m[0]; pv.src = m[0]; }
    });
  }
}

function initAdminHelpers(){
  createLinkInput();
  createSmartPaste();
  createFetchImageBtn();
  createImagePaste();
}

// ===== এডমিন ফিঙ্গার / Face ID লগইন =====
async function registerFingerprint(){
  if(!window.PublicKeyCredential){ alert('❌ এই ফোন/ব্রাউজারে ফিঙ্গার চলবে না'); return; }
  try{
    let challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    let cred = await navigator.credentials.create({
      publicKey:{
        challenge: challenge,
        rp:{ name:"ক্রয় বিক্রয় ডটকম" },
        user:{ id:new Uint8Array([1,2,3,4]), name:"admin", displayName:"Admin" },
        pubKeyCredParams:[{alg:-7,type:"public-key"},{alg:-257,type:"public-key"}],
        authenticatorSelection:{ authenticatorAttachment:"platform", userVerification:"required" },
        timeout:60000
      }
    });
    localStorage.setItem('adminFinger','1');
    localStorage.setItem('adminFingerId', btoa(String.fromCharCode(...new Uint8Array(cred.rawId))));
    alert('✅ ফিঙ্গার সেভ হইছে! এখন থেকে আঙুল দিলেই ঢুকতে পারবেন');
    updateFingerBtn();
  }catch(e){ alert('❌ ফিঙ্গার বসানো যায় নাই, আবার চেষ্টা করেন'); }
}
async function loginWithFingerprint(){
  if(localStorage.getItem('adminFinger')!=='1'){ alert('আগে পাসওয়ার্ড দিয়ে ঢুকে ফিঙ্গার চালু করেন'); return; }
  try{
    let challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    await navigator.credentials.get({
      publicKey:{ challenge: challenge, userVerification:"required", timeout:60000 }
    });
    document.getElementById('siteWrap').classList.add('hidden');
    document.getElementById('adminFullPage').classList.remove('hidden');
    updateAdmin(); updateGmailLog(); initAdminHelpers();
    alert('✅ ফিঙ্গার দিয়ে লগইন হইছে!');
  }catch(e){ alert('❌ ফিঙ্গার মিলে নাই'); }
}
function updateFingerBtn(){
  let btn = document.getElementById('fingerLoginBtn');
  if(btn) btn.innerText = localStorage.getItem('adminFinger')==='1' ? '👆 ফিঙ্গার দিয়ে ঢুকুন' : '👆 ফিঙ্গার দিয়ে ঢুকুন (আগে চালু করেন)';
}
function createFingerButtons(){
  let passInput = document.getElementById('lPass');
  if(!passInput || document.getElementById('fingerLoginBtn')) return;
  let wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:8px;margin-top:10px;';
  wrap.innerHTML = `
    <button id="fingerLoginBtn" onclick="loginWithFingerprint()" style="flex:1;background:#1a73e8;color:#fff;padding:12px;border-radius:8px;border:0;font-weight:700">👆 ফিঙ্গার দিয়ে ঢুকুন</button>
    <button onclick="registerFingerprint()" style="flex:1;background:#0f9d58;color:#fff;padding:12px;border-radius:8px;border:0;font-weight:700">🖐️ ফিঙ্গার চালু করুন</button>
  `;
  passInput.parentNode.insertBefore(wrap, passInput.nextSibling);
  updateFingerBtn();
}

function openShop(name){
  window.open("https://www.daraz.com.bd/catalog/?q=" + encodeURIComponent(name) + "&aff_id=" + DARAZ_AFF_ID + "&ali_id=" + ALI_AFF_ID, '_blank');
}
function openDaraz(name){ openShop(name); }
function openAli(name){ openShop(name); }
function buyDarazAffiliate(name, price){ openShop(name); }
function buyAliAffiliate(name, price){ openShop(name); }
function openProductLink(p){
  if(p && p.link){
    window.open(buildAffiliateLink(p.link), '_blank');
  } else if(p){
    openShop(p.name);
  }
}
const products={
offer:Array.from({length:6},(_,i)=>({name:`অফার ${i+1}`,price:500+i*50,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",platform:"both"})),
daraz:Array.from({length:8},(_,i)=>({name:`দারাজ পণ্য ${i+1}`,price:900+i*100,img:"https://images.unsplash.com/photo-1608231387042-66d1773070a?w=400",platform:"daraz"})),
ali:Array.from({length:8},(_,i)=>({name:`AliExpress পণ্য ${i+1}`,price:800+i*100,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",platform:"ali"})),
fashion:Array.from({length:6},(_,i)=>({name:`ফ্যাশন ${i+1}`,price:700+i*50,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",platform:"both"})),
mobile:Array.from({length:6},(_,i)=>({name:`মোবাইল ${i+1}`,price:5000+i*500,img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",platform:"both"})),
home:Array.from({length:6},(_,i)=>({name:`হোম ${i+1}`,price:300+i*30,img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",platform:"both"})),
kids:Array.from({length:6},(_,i)=>({name:`বাচ্চা ${i+1}`,price:400+i*40,img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",platform:"both"})),
shoe:Array.from({length:6},(_,i)=>({name:`জুতা ${i+1}`,price:900+i*80,img:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",platform:"both"})),
watch:Array.from({length:6},(_,i)=>({name:`ঘড়ি ${i+1}`,price:1500+i*100,img:"https://images.unsplash.com/photo-1524805444973-bf35f8dcc3dc?w=400",platform:"both"})),
bag:Array.from({length:6},(_,i)=>({name:`ব্যাগ ${i+1}`,price:600+i*50,img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",platform:"both"})),
elect:Array.from({length:6},(_,i)=>({name:`ইলেকট্রনিক্স ${i+1}`,price:2000+i*200,img:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",platform:"both"})),
beauty:Array.from({length:6},(_,i)=>({name:`বিউটি ${i+1}`,price:350+i*30,img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",platform:"both"})),
grocery:Array.from({length:6},(_,i)=>({name:`গ্রোসারি ${i+1}`,price:250+i*20,img:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",platform:"both"})),
sports:Array.from({length:6},(_,i)=>({name:`স্পোর্টস ${i+1}`,price:700+i*60,img:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",platform:"both"})),
toy:Array.from({length:6},(_,i)=>({name:`খেলনা ${i+1}`,price:300+i*30,img:"https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",platform:"both"}))
};
let customer=JSON.parse(localStorage.getItem('customer')||'null');let orders=JSON.parse(localStorage.getItem('orders')||'[]');let allCustomers=JSON.parse(localStorage.getItem('allCustomers')||'[]');let chats=JSON.parse(localStorage.getItem('chats')||'[]');let pendingProducts=JSON.parse(localStorage.getItem('pendingProducts')||'[]');let settings=JSON.parse(localStorage.getItem('siteSettings')||'null')||{siteName:"ক্রয় বিক্রয় ডটকম",phone:"01637554829",email:"begumemali43@gmail.com",id:"170792315",fb:"https://www.facebook.com/share/1QLMRz81yZ/",wa:"8801637554829",bkash:"01637554829",nagad:"01637554829",rocket:"01637554829",pass:"b13967890",banner:"banner.jpg",darazId:"170792315",aliId:"bd1255724598ozuae"};let tempPhoto='',tempSellPhoto='',tempAdminPhoto='',tempSetBanner='';
let autoReplyDone = localStorage.getItem('autoReplyDone') === '1';
function previewPhoto(i){const f=i.files[0];if(f){const r=new FileReader();r.onload=e=>{tempPhoto=e.target.result;document.getElementById('previewImg').src=tempPhoto;};r.readAsDataURL(f);}}
function previewSell(i){const f=i.files[0];if(f){const r=new FileReader();r.onload=e=>{tempSellPhoto=e.target.result;document.getElementById('sellPreview').src=tempSellPhoto;};r.readAsDataURL(f);}}
function previewAdmin(i){const f=i.files[0];if(f){const r=new FileReader();r.onload=e=>{tempAdminPhoto=e.target.result;document.getElementById('adminPreview').src=tempAdminPhoto;};r.readAsDataURL(f);}}
function previewSetBanner(i){const f=i.files[0];if(f){const r=new FileReader();r.onload=e=>{tempSetBanner=e.target.result;document.getElementById('setBannerPreview').src=tempSetBanner;};r.readAsDataURL(f);}}
function applySettings(){if(settings.darazId) DARAZ_AFF_ID=settings.darazId; if(settings.aliId) ALI_AFF_ID=settings.aliId; const fn=document.getElementById('footerName');if(fn) fn.innerText=settings.siteName;document.getElementById('topTrack').innerHTML=`<span>🇧🇩 ${settings.phone} | ${settings.email} | ID:${settings.id} | </span><span>🇧🇩 ${settings.phone} | ${settings.email} | ID:${settings.id} | </span>`;document.getElementById('payBkash').innerText=settings.bkash;document.getElementById('payNagad').innerText=settings.nagad;document.getElementById('payRocket').innerText=settings.rocket;document.getElementById('contactPhone').href=`tel:${settings.phone}`;document.getElementById('contactPhoneText').innerText=settings.phone;document.getElementById('contactEmail').href=`mailto:${settings.email}`;document.getElementById('contactEmailText').innerText=settings.email;document.getElementById('contactFb').href=settings.fb;document.getElementById('contactWa').href=`https://wa.me/${settings.wa}`;document.getElementById('contactWaText').innerText=settings.phone;const waMain=document.getElementById('waMainBtn'); if(waMain) waMain.href=`https://wa.me/${settings.wa}`;document.getElementById('mainBanner').src=settings.banner;document.getElementById('sPhoneShow').innerText=settings.phone;document.getElementById('sEmailShow').innerText=settings.email;const b1=document.getElementById('sBkashShow'); if(b1) b1.innerText=settings.bkash;const b2=document.getElementById('sNagadShow'); if(b2) b2.innerText=settings.nagad;const b3=document.getElementById('sWaShow'); if(b3) b3.innerText=settings.phone;}
function saveSettings(){settings.siteName=document.getElementById('setSiteName').value||settings.siteName;settings.phone=document.getElementById('setPhone').value||settings.phone;settings.email=document.getElementById('setEmail').value||settings.email;settings.id=document.getElementById('setId').value||settings.id;settings.fb=document.getElementById('setFb').value||settings.fb;settings.wa=document.getElementById('setWa').value||settings.wa;settings.bkash=document.getElementById('setBkash').value||settings.bkash;settings.nagad=document.getElementById('setNagad').value||settings.nagad;settings.rocket=document.getElementById('setRocket').value||settings.rocket;settings.darazId=document.getElementById('setDarazId').value||settings.darazId;settings.aliId=document.getElementById('setAliId').value||settings.aliId;settings.pass=document.getElementById('setPass').value||settings.pass;if(tempSetBanner) settings.banner=tempSetBanner;localStorage.setItem('siteSettings',JSON.stringify(settings));applySettings();alert('✅ সেভ হয়েছে!');}
function getAutoReply(msg){msg=msg.toLowerCase();if(msg.includes('দাম')) return `💰 দাম জানতে পণ্যের নাম বলুন! 🔥 📞 ${settings.phone}`;if(msg.includes('ডেলিভারি')) return `🚚 সারা বাংলাদেশ ডেলিভারি! 📞 ${settings.phone}`;if(msg.includes('বিকাশ')||msg.includes('নগদ')) return `💳 বিকাশ: ${settings.bkash} | নগদ: ${settings.nagad} | 💬 হোয়াটসঅ্যাপ: ${settings.phone}`;return `✅ মেসেজ পেয়েছি! এডমিন একটু পরেই রিপ্লাই দিবে 🙏 📞 ${settings.phone}`;}
function quickChat(t){document.getElementById('chatInput').value=t;sendChat();}
function closeChat(){document.getElementById('chatBox').classList.add('hidden');}
function toggleChat(){const box=document.getElementById('chatBox');if(box.classList.contains('hidden')){box.classList.remove('hidden');box.style.display='flex';if(chats.length===0){chats.push({from:'admin',name:'এডমিন',text:`👋 আসসালামু আলাইকুম! ক্রয় বিক্রয় ডটকমে স্বাগতম! 📞 ${settings.phone} | 💳 বিকাশ: ${settings.bkash}`,time:new Date().toLocaleTimeString(),date:Date.now()});localStorage.setItem('chats',JSON.stringify(chats));}renderChat();}else closeChat();}
function sendChat(){
  const input=document.getElementById('chatInput');
  const msg=input.value.trim();
  if(!msg) return;
  const name=customer?customer.name:'কাস্টমার';
  chats.push({from:'customer',name:name,text:msg,time:new Date().toLocaleTimeString(),date:Date.now()});
  localStorage.setItem('chats',JSON.stringify(chats));
  input.value='';
  renderChat();
  updateAdminChat();
  if(!autoReplyDone){
    autoReplyDone=true;
    localStorage.setItem('autoReplyDone','1');
    setTimeout(()=>{
      chats.push({from:'admin',name:'এডমিন (Auto)',text:getAutoReply(msg),time:new Date().toLocaleTimeString(),date:Date.now()});
      localStorage.setItem('chats',JSON.stringify(chats));
      renderChat();
      updateAdminChat();
    },1000);
  }
}
function adminSendChat(){
  const input=document.getElementById('adminChatInput');
  const msg=input.value.trim();
  if(!msg) return;
  chats.push({from:'admin',name:'এডমিন',text:msg,time:new Date().toLocaleTimeString(),date:Date.now()});
  localStorage.setItem('chats',JSON.stringify(chats));
  input.value='';
  renderChat();
  updateAdminChat();
}
function clearChatForNewCustomer(){
  if(confirm('নতুন কাস্টমারের জন্য চ্যাট ক্লিয়ার করবেন? অটো রিপ্লাই আবার চালু হবে।')){
    chats=[];
    localStorage.setItem('chats',JSON.stringify(chats));
    autoReplyDone=false;
    localStorage.removeItem('autoReplyDone');
    renderChat();
    updateAdminChat();
    alert('✅ চ্যাট ক্লিয়ার! এখন আবার ১ বার অটো রিপ্লাই দিবে।');
  }
}
function renderChat(){const div=document.getElementById('chatMessages');if(!div) return;div.innerHTML='';chats.forEach(c=>{const cls=c.from=='customer'?'customer':'admin';div.innerHTML+=`<div class="chatMsg ${cls}">${c.text}<small>${c.name} - ${c.time}</small></div>`;});div.scrollTop=div.scrollHeight;}
function updateAdminChat(){const div=document.getElementById('adminChatMessages');if(!div) return;div.innerHTML='';chats.forEach(c=>{const cls=c.from=='customer'?'customer':'admin';div.innerHTML+=`<div class="chatMsg ${cls}">${c.text}<small>${c.name} - ${c.time}</small></div>`;});div.scrollTop=div.scrollHeight;const b=document.getElementById('adminChatBadge');if(b) b.innerText=chats.length?`(${chats.length})`:'';}
function makeCard(p){return `<div class="card" onclick="buyNow('${p.name.replace(/'/g,"\\'")}',${p.price},'${(p.link||'').replace(/'/g,'')}')" style="cursor:pointer"><img src="${p.img}"><p>${p.name}</p><div style="background:#ff5a00;color:#fff;font-weight:900;font-size:15px;padding:7px 5px;margin:5px 8px;border-radius:8px">৳${p.price} &nbsp; | &nbsp; 🛒 কিনুন</div></div>`;}
function render(cat){const g=document.getElementById('productGrid');const dg=document.getElementById('darazGrid');const ag=document.getElementById('aliGrid');if(!g) return;g.innerHTML='';if(!products[cat]) cat='offer';products[cat].forEach(p=>{g.innerHTML+=makeCard(p);});if(dg){dg.innerHTML='';products.daraz.forEach(p=>{dg.innerHTML+=makeCard(p);});}if(ag){ag.innerHTML='';products.ali.forEach(p=>{ag.innerHTML+=makeCard(p);});}const titles={offer:'🔥 অফার',daraz:'🛒 দারাজ পণ্য',ali:'🌍 AliExpress পণ্য',fashion:'👗 ফ্যাশন',mobile:'📱 মোবাইল',home:'🏠 হোম',kids:'👶 বাচ্চা',shoe:'👟 জুতা',watch:'⌚ ঘড়ি',bag:'👜 ব্যাগ',elect:'🔌 ইলেকট্রনিক্স',beauty:'💄 বিউটি',grocery:'🛒 গ্রোসারি',sports:'⚽ স্পোর্টস',toy:'🧸 খেলনা'};document.getElementById('catTitle').innerText=titles[cat]||'🔥 অফার';}
function renderBuy(){const g=document.getElementById('buyGrid');if(!g) return;g.innerHTML='';Object.values(products).flat().slice(0,20).forEach(p=>{g.innerHTML+=makeCard(p);});}
function hideAll(){['homeSec','buySec','sellSec','accountSec','loginSec'].forEach(id=>{const el=document.getElementById(id);if(el) el.classList.add('hidden')});}
function goHome(){document.getElementById('siteWrap').classList.remove('hidden');document.getElementById('adminFullPage').classList.add('hidden');hideAll();document.getElementById('homeSec').classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});}
function goBuy(){document.getElementById('siteWrap').classList.remove('hidden');document.getElementById('adminFullPage').classList.add('hidden');hideAll();document.getElementById('buySec').classList.remove('hidden');renderBuy();document.getElementById('buySec').scrollIntoView({behavior:'smooth'});}
function goSell(){document.getElementById('siteWrap').classList.remove('hidden');document.getElementById('adminFullPage').classList.add('hidden');hideAll();document.getElementById('sellSec').classList.remove('hidden');document.getElementById('sellSec').scrollIntoView({behavior:'smooth'});}
function goAccount(){document.getElementById('siteWrap').classList.remove('hidden');document.getElementById('adminFullPage').classList.add('hidden');hideAll();document.getElementById('accountSec').classList.remove('hidden');checkCustomer();document.getElementById('accountSec').scrollIntoView({behavior:'smooth'});}
function goLogin(){document.getElementById('siteWrap').classList.remove('hidden');document.getElementById('adminFullPage').classList.add('hidden');hideAll();document.getElementById('loginSec').classList.remove('hidden');document.getElementById('loginSec').scrollIntoView({behavior:'smooth'});}
function sendToGmail(subject, data){const fullMessage=`বিষয়: ${subject}\n${Object.entries(data).map(([k,v])=>`${k}: ${v}`).join('\n')}\nসময়: ${new Date().toLocaleString()}`;fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:subject,from_name:"ক্রয় বিক্রয় ডটকম",message:fullMessage,...data})}).then(r=>r.json()).then(res=>{let log=JSON.parse(localStorage.getItem('gmailLog')||'[]');log.unshift({subject,date:new Date().toLocaleString(),status:res.success?"✅ Sent":"❌"});localStorage.setItem('gmailLog',JSON.stringify(log.slice(0,20)));updateGmailLog();}).catch(()=>{});}
function updateGmailLog(){const div=document.getElementById('gmailLogList');if(!div) return;const log=JSON.parse(localStorage.getItem('gmailLog')||'[]');div.innerHTML=log.length?log.map(l=>`<div>${l.status} ${l.subject} - ${l.date}</div>`).join(''):'<div>কোন মেইল নেই</div>';}
function togglePass(inputId, eye){const input=document.getElementById(inputId);if(input.type==="password"){input.type="text";eye.innerText="🙈";}else{input.type="password";eye.innerText="👁️";}}
function isValidPhone(p){return /^01[0-9]{9}$/.test(p);}
function isValidNID(n){return /^[0-9]{10,17}$/.test(n);}
function isValidEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);}
function createCustomer(){const name=document.getElementById('cName').value.trim(),phone=document.getElementById('cPhone').value.trim(),email=document.getElementById('cEmail').value.trim(),nid=document.getElementById('cNID').value.trim(),addr=document.getElementById('cAddr').value.trim(),pass=document.getElementById('cPass').value.trim();if(name.length<3){alert('❌ নাম ৩+ অক্ষর');return;}if(!isValidPhone(phone)){alert('❌ মোবাইল ভুল! 01XXXXXXXXX');return;}if(!isValidEmail(email)){alert('❌ জিমেইল ভুল! example@gmail.com');return;}if(!isValidNID(nid)){alert('❌ NID ১০-১৭ ডিজিট');return;}if(addr.length<5){alert('❌ ঠিকানা ৫+ অক্ষর');return;}if(pass.length<6){alert('❌ পাসওয়ার্ড ৬+');return;}if(allCustomers.find(c=>c.phone==phone)){alert('❌ এই মোবাইলে একাউন্ট আছে');return;}if(allCustomers.find(c=>c.nid==nid)){alert('❌ এই NID তে একাউন্ট আছে');return;}customer={name,phone,email,nid,addr,pass,photo:tempPhoto||'https://via.placeholder.com/150?text=Photo',id:'C'+Date.now()};localStorage.setItem('customer',JSON.stringify(customer));allCustomers.push(customer);localStorage.setItem('allCustomers',JSON.stringify(allCustomers));sendToGmail(`🔥 নতুন কাস্টমার: ${name}`,{নাম:name,মোবাইল:phone,জিমেইল:email,NID:nid,ঠিকানা:addr,ID:customer.id});alert('✅ একাউন্ট তৈরি!');checkCustomer();}
function loginCustomer(){const ph=document.getElementById('clPhone').value.trim(),pa=document.getElementById('clPass').value.trim();if(!ph||!pa){alert('❌ তথ্য দিন');return;}const found=allCustomers.find(c=>(c.phone==ph||c.nid==ph||c.email==ph)&&c.pass==pa);const saved=JSON.parse(localStorage.getItem('customer')||'null');if(found){customer=found;localStorage.setItem('customer',JSON.stringify(customer));alert(`✅ স্বাগতম ${customer.name}!`);checkCustomer();goAccount();}else if(saved&&(saved.phone==ph||saved.nid==ph||saved.email==ph)&&saved.pass==pa){customer=saved;alert(`✅ স্বাগতম ${customer.name}!`);checkCustomer();goAccount();}else alert('❌ ভুল তথ্য!');}
function checkCustomer(){const custBtn=document.getElementById('customerAccountBtn'),accBtn=document.getElementById('accountBtn'),custBtnName=document.getElementById('custBtnName');if(customer){custBtn.classList.remove('hidden');accBtn.classList.add('hidden');custBtnName.innerText=customer.name.split(' ')[0];document.getElementById('noAccount').classList.add('hidden');document.getElementById('hasAccount').classList.remove('hidden');document.getElementById('pPhoto').src=customer.photo;document.getElementById('pName').innerText=customer.name;document.getElementById('pPhone').innerText='📞 '+customer.phone;document.getElementById('pEmail').innerText='✉️ '+customer.email;document.getElementById('pNID').innerText='🪪 NID: '+customer.nid;document.getElementById('pAddr').innerText='📍 '+customer.addr;document.getElementById('pId').innerText='🆔 '+customer.id;document.getElementById('pPassShow').innerHTML=`🔑 পাসওয়ার্ড: •••••• <button onclick="showPassword()" style="background:#333;color:#fff;padding:2px 8px;border-radius:10px;border:1px solid #555;font-size:10px;margin-left:5px;cursor:pointer">👁️ দেখুন</button>`;const oDiv=document.getElementById('myOrders');oDiv.innerHTML=orders.length?orders.map(o=>`<div class="orderItem">📦 ${o.name} - <b>৳${o.price}</b> - ${o.date}</div>`).join(''):'<p style="text-align:center;color:#888">কোন অর্ডার নেই</p>';}else{custBtn.classList.add('hidden');accBtn.classList.remove('hidden');document.getElementById('noAccount').classList.remove('hidden');document.getElementById('hasAccount').classList.add('hidden');}}
function logoutCustomer(){if(confirm('লগআউট?')){localStorage.removeItem('customer');customer=null;checkCustomer();goHome();}}
function editCustomer(){const n=prompt('নাম',customer.name);if(n&&n.length>=3) customer.name=n;localStorage.setItem('customer',JSON.stringify(customer));checkCustomer();}
function changePhoto(){const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.onchange=e=>{const f=e.target.files[0];const r=new FileReader();r.onload=ev=>{customer.photo=ev.target.result;localStorage.setItem('customer',JSON.stringify(customer));checkCustomer();};r.readAsDataURL(f);};inp.click();}
let passVisible=false;function showPassword(){const el=document.getElementById('pPassShow');if(!passVisible){el.innerHTML=`🔑 পাসওয়ার্ড: ${customer.pass} <button onclick="showPassword()" style="background:#d93025;color:#fff;padding:2px 8px;border-radius:10px;border:1px solid #555;font-size:10px;margin-left:5px;cursor:pointer">🙈 লুকান</button>`;passVisible=true;}else{el.innerHTML=`🔑 পাসওয়ার্ড: •••••• <button onclick="showPassword()" style="background:#333;color:#fff;padding:2px 8px;border-radius:10px;border:1px solid #555;font-size:10px;margin-left:5px;cursor:pointer">👁️ দেখুন</button>`;passVisible=false;}}
function buyNow(name,price,link){if(!customer){alert('আগে একাউন্ট খুলুন!');goAccount();return;}orders.push({name,price,date:new Date().toLocaleDateString(),customer:customer.name,phone:customer.phone});localStorage.setItem('orders',JSON.stringify(orders));sendToGmail(`🛒 অর্ডার: ${name} - ৳${price}`,{পণ্য:name,দাম:'৳'+price,কাস্টমার:customer.name,মোবাইল:customer.phone,NID:customer.nid});alert(name+' - ৳'+price+' অর্ডার হয়েছে! ✅ আপনার ID সহ দোকানে নিয়ে যাচ্ছি...');if(link){window.open(buildAffiliateLink(link),'_blank');}else{openShop(name);}checkCustomer();}
function addProductFull(){const name=document.getElementById('sName').value,price=document.getElementById('sPrice').value,cat=document.getElementById('sCat').value,cond=document.getElementById('sCondition').value,stock=document.getElementById('sStock').value,desc=document.getElementById('sDesc').value,loc=document.getElementById('sLocation').value,phone=document.getElementById('sPhone').value;if(!name||!price||!cat||!cond||!stock||!desc||!loc||!phone){alert('❌ সব তথ্য দিন');return;}if(!isValidPhone(phone)){alert('❌ ফোন ভুল!');return;}const np={name,price:parseInt(price),cat,condition:cond,stock,desc,location:loc,phone,img:tempSellPhoto||"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",customer:customer?customer.name:'Guest',date:new Date().toLocaleDateString(),id:Date.now()};pendingProducts.push(np);localStorage.setItem('pendingProducts',JSON.stringify(pendingProducts));sendToGmail(`⏳ পেন্ডিং: ${name} - ৳${price}`,{পণ্য:name,দাম:price,ক্যাটাগরি:cat,অবস্থা:cond,পরিমাণ:stock,বিবরণ:desc,লোকেশন:loc,ফোন:phone,কাস্টমার:np.customer});alert('✅ পণ্য পাঠানো হয়েছে! এডমিন এপ্রুভ করবে!');tempSellPhoto='';document.getElementById('sellPreview').src='https://via.placeholder.com/200x150?text=পণ্যের+ছবি';goHome();}
function approveProduct(id){const p=pendingProducts.find(x=>x.id==id);if(p){if(!products[p.cat]) products[p.cat]=[];products[p.cat].unshift(p);products.offer.unshift(p);pendingProducts=pendingProducts.filter(x=>x.id!=id);localStorage.setItem('pendingProducts',JSON.stringify(pendingProducts));sendToGmail(`✅ এপ্রুভ: ${p.name}`,{পণ্য:p.name,দাম:p.price,স্ট্যাটাস:"এপ্রুভ - লাইভ"});alert('✅ এপ্রুভ হয়েছে!');updateAdmin();render('offer');}}
function rejectProduct(id){if(confirm('বাতিল?')){pendingProducts=pendingProducts.filter(x=>x.id!=id);localStorage.setItem('pendingProducts',JSON.stringify(pendingProducts));updateAdmin();}}
function doLogin(){const p=document.getElementById('lPass').value;if(p==settings.pass){document.getElementById('siteWrap').classList.add('hidden');document.getElementById('adminFullPage').classList.remove('hidden');updateAdmin();updateGmailLog();initAdminHelpers();}else alert('❌ ভুল পাসওয়ার্ড');}
function adminLogout(){document.getElementById('adminFullPage').classList.add('hidden');document.getElementById('siteWrap').classList.remove('hidden');goHome();}
function adminTab(btn,tab){document.querySelectorAll('.adminTabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.adminSec').forEach(s=>s.classList.add('hidden'));document.getElementById('admin'+tab.charAt(0).toUpperCase()+tab.slice(1)).classList.remove('hidden');updateAdmin();if(tab=='dash') updateGmailLog();initAdminHelpers();}
function updateAdmin(){const allProd=Object.values(products).flat();document.getElementById('dProd').innerText=allProd.length;document.getElementById('dOrder').innerText=orders.length;document.getElementById('dCust').innerText=allCustomers.length||(customer?1:0);document.getElementById('dPending').innerText=pendingProducts.length;const pb=document.getElementById('pendingBadge');if(pb) pb.innerText=pendingProducts.length?`(${pendingProducts.length})`:'';const pList=document.getElementById('adminPendingList');if(!pList) return;if(pendingProducts.length==0){pList.innerHTML='<p style="text-align:center;color:#888">কোন পেন্ডিং নেই</p>';}else{pList.innerHTML=pendingProducts.map(p=>`<div class="adminItem" style="flex-direction:column;align-items:start;border:2px solid #ff8c00"><div style="display:flex;gap:10px;width:100%"><img src="${p.img}" style="width:90px;height:90px;object-fit:cover;border-radius:8px"><div class="adminItemInfo"><p>📦 ${p.name} - ৳${p.price}</p><span>👤 ${p.customer} | 📞 ${p.phone}</span><br><span>📍 ${p.location} | ${p.condition}</span><br><span>📝 ${p.desc}</span></div></div><div style="display:flex;gap:8px;width:100%;margin-top:10px"><button onclick="approveProduct(${p.id})" style="flex:1;background:#0f0;color:#000;padding:10px;border-radius:8px;border:0;font-weight:700">✅ এপ্রুভ</button><button onclick="rejectProduct(${p.id})" style="flex:1;background:#d93025;color:#fff;padding:10px;border-radius:8px;border:0">❌ বাতিল</button></div></div>`).join('');}const prodList=document.getElementById('adminProdList');if(prodList){prodList.innerHTML='';allProd.slice(0,50).forEach(p=>{prodList.innerHTML+=`<div class="adminItem"><img src="${p.img}"><div class="adminItemInfo"><p>${p.name} - ${p.platform||'both'}</p><span>৳${p.price} ${p.link?'🔗':''}</span></div><button class="btnDel" onclick="delProd('${p.name}')">ডিলিট</button></div>`;});}const oList=document.getElementById('adminOrderList');if(oList) oList.innerHTML=orders.length?orders.map((o,i)=>`<div class="adminItem"><div class="adminItemInfo"><p>📦 ${o.name} - <b>৳${o.price}</b></p><span>👤 ${o.customer} | ${o.date}</span></div><button class="btnDel" onclick="delOrder(${i})">ডিলিট</button></div>`).join(''):'<p style="text-align:center;color:#888">কোন অর্ডার নেই</p>';const cList=document.getElementById('adminCustList');if(cList){const custs=allCustomers.length?allCustomers:(customer?[customer]:[]);cList.innerHTML=custs.length?custs.map(c=>`<div class="adminItem"><img src="${c.photo}" style="width:70px;height:70px;border-radius:50%;border:2px solid #ff8c00"><div class="adminItemInfo"><p>👤 ${c.name}</p><span>📞 ${c.phone} | NID: ${c.nid}</span><br><span>✉️ ${c.email} | 📍 ${c.addr}</span><br><span>🆔 ${c.id}</span></div></div>`).join(''):'<p style="text-align:center;color:#888">কোন কাস্টমার নেই</p>';}updateAdminChat();}
function delProd(name){if(confirm('ডিলিট?')){Object.keys(products).forEach(k=>{products[k]=products[k].filter(p=>p.name!==name);});updateAdmin();render('offer');}}
function delOrder(i){if(confirm('ডিলিট?')){orders.splice(i,1);localStorage.setItem('orders',JSON.stringify(orders));updateAdmin();}}
async function adminAddProduct(){
  let linkEl = document.getElementById('aLink');
  let link = linkEl ? linkEl.value.trim() : _autoLink;
  let name=document.getElementById('aName').value.trim();
  let price=document.getElementById('aPrice').value;
  let cat=document.getElementById('aCat').value;
  let platform=document.getElementById('aPlatform').value;
  let desc=document.getElementById('aDesc').value.trim();
  if(link && (!name || !price)){
    let st = document.getElementById('linkStatus');
    if(st) st.innerText = '⏳ লিংক থেকে আনতেছি, একটু দাঁড়ান...';
    await autoFillFromLink(link);
    name=document.getElementById('aName').value.trim();
    price=document.getElementById('aPrice').value;
  }
  if(link && !name){
    try{
      let u = new URL(link);
      let slug = decodeURIComponent(u.pathname.split('/').filter(Boolean).pop()||'Daraz পণ্য');
      name = slug.replace(/-/g,' ').replace(/_/g,' ').slice(0,60);
    }catch(e){ name = 'Daraz পণ্য'; }
  }
  if(!name){ alert('লিংক বসান অথবা নাম দিন'); return; }
  if(!price){ price = 0; }
  if(link){
    if(link.toLowerCase().includes('daraz')) platform='daraz';
    else if(link.toLowerCase().includes('aliexpress')||link.toLowerCase().includes('aliex')) platform='ali';
  }
  const np={name,price:parseInt(price)||0,cat,platform:platform,desc:desc,link:buildAffiliateLink(link),img:_autoImg || tempAdminPhoto || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"};
  if(!products[cat]) products[cat]=[];
  products[cat].unshift(np);
  if(cat!=='daraz'&&cat!=='ali') products.offer.unshift(np);
  alert('✅ যোগ হয়েছে! '+name);
  document.getElementById('aName').value='';
  document.getElementById('aPrice').value='';
  document.getElementById('aDesc').value='';
  let sp = document.getElementById('smartPaste'); if(sp) sp.value='';
  let iu = document.getElementById('imgUrlInput'); if(iu) iu.value='';
  let ib = document.getElementById('imgPasteBox'); if(ib) ib.innerHTML='📋 এখানে ক্লিক করে Paste করেন - স্ক্রিনশট / ছবি এখানে বসে যাবে।';
  if(linkEl) linkEl.value='';
  tempAdminPhoto=''; _autoImg=''; _autoLink='';
  updateAdmin();render(cat);
}
function loadCat(btn,cat){document.querySelectorAll('.catBar button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('homeSec').classList.remove('hidden');['buySec','sellSec','accountSec','loginSec'].forEach(id=>document.getElementById(id).classList.add('hidden'));render(cat);window.scrollTo({top:0,behavior:'smooth'});}
applySettings();render('offer');renderChat();checkCustomer();updateGmailLog();initAdminHelpers();createFingerButtons();
document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(createFingerButtons, 500); setTimeout(initAdminHelpers, 500); });
