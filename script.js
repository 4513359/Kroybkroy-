*{margin:0;padding:0;box-sizing:border-box;font-family:sans-serif}
body{background:#111;color:#fff;overflow-x:hidden}
header{background:#000;padding:15px;text-align:center;position:sticky;top:0;z-index:100;border-bottom:2px solid #ff8c00}
.logo{font-size:22px;color:#ff8c00;font-weight:bold}
.addr{font-size:13px;color:#ccc;margin:6px 0}
.top-btns button{padding:8px 14px;background:#222;color:#fff;border:1px solid #ff8c00;border-radius:6px;margin:3px;cursor:pointer}
.top-btns button:hover{background:#ff8c00;color:#000}
.banner{position:relative;text-align:center}
.banner img{width:100%;max-height:380px;object-fit:cover}
.banner h1{position:absolute;top:20px;left:50%;transform:translateX(-50%);background:linear-gradient(#c9a86a,#8a6d3b);color:#000;padding:8px 20px;border-radius:20px;font-size:22px;border:2px solid gold}
.search-box{padding:15px}
.search-box input{width:100%;padding:12px;border-radius:8px;border:none;background:#222;color:#fff;font-size:16px}
#productList{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;padding:15px}
#productList>div{background:#222;padding:10px;border-radius:12px;text-align:center;border:1px solid #333}
#productList img{width:100%;height:140px;object-fit:cover;border-radius:8px}
#productList h4{margin:8px 0;font-size:15px}
#productList p{color:#ff8c00;font-weight:bold}
#productList button{width:100%;padding:8px;background:#ff8c00;border:none;border-radius:6px;color:#fff;font-weight:bold;margin-top:6px}
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:500;overflow:auto}
.modal-box{background:#222;margin:10% auto;padding:20px;width:90%;max-width:420px;border-radius:12px;position:relative}
.admin-box{max-width:600px}
.close{position:absolute;right:15px;top:10px;font-size:28px;cursor:pointer;color:#aaa}
.modal-box input{width:100%;padding:10px;margin:6px 0;background:#333;color:#fff;border:1px solid #444;border-radius:6px}
.btn-main{width:100%;padding:10px;background:#ff8c00;border:none;border-radius:6px;color:#fff;font-weight:bold;margin-top:6px;cursor:pointer}
footer{text-align:center;padding:18px;background:#000;color:#888;font-size:12px;margin-top:20px;border-top:1px solid #222}
