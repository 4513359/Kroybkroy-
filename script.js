*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:Arial}
.topBarWrap{background:#0a0a0a;overflow:hidden;white-space:nowrap;position:sticky;top:0;z-index:200}
.topBarTrack{display:inline-block;animation:run 25s linear infinite;color:#ffb02e;font-size:11px;padding:6px 0}
.topBarTrack span{padding-right:50px}
@keyframes run{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
header{display:flex;justify-content:space-between;align-items:center;padding:8px;background:#000;position:sticky;top:21px;z-index:199;border-bottom:1px solid #222}
.left{display:flex;align-items:center;gap:6px}
.logoB{height:65px;width:65px;object-fit:cover;border-radius:50%;cursor:pointer;background:#fff;border:2px solid #ff8c00;display:block}
.logoText{display:flex;flex-direction:column;line-height:1.1}
.logoBiddut{font-size:22px;font-weight:900;background:linear-gradient(90deg,#2ecc71,#ff8c00);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.logoBn{font-size:13px;font-weight:700;background:linear-gradient(90deg,#2ecc71,#ff8c00);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.right{display:flex;gap:4px;flex-wrap:wrap}.right button{background:linear-gradient(#ff8c00,#2e8b57);border:0;color:#fff;padding:6px 9px;border-radius:16px;font-size:11px;cursor:pointer}
.fixedWrap{position:sticky;top:68px;z-index:150;background:#000}
.bannerFixed img{width:100%;height:280px;object-fit:cover;display:block}
.catBar{display:flex;gap:6px;padding:8px;overflow-x:auto;background:#111;border-bottom:1px solid #333;white-space:nowrap}
.catBar::-webkit-scrollbar{display:none}
.catBar button{background:#1a1a1a;border:1px solid #333;color:#ccc;padding:7px 12px;border-radius:18px;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer;flex-shrink:0}
.catBar button.active{background:#ff8c00;color:#fff}
.box{padding:0}.sec{padding:12px 8px;min-height:60vh;background:#0a0a0a;border-top:2px solid #ff8c00;margin-top:10px}.hidden{display:none !important}
h3{color:#ff8c00;font-size:13px;margin:10px 0 8px;text-align:center}
h4{color:#0f0;text-align:center;margin:10px 0}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:12px 4px}
.card{background:#111;border:1px solid #222;border-radius:12px;text-align:center;overflow:hidden;padding-bottom:8px;cursor:pointer;margin:0;box-shadow:0 2px 8px rgba(0,0,0,0.2)}
.card img{width:100%;height:130px;object-fit:contain;background:#fff}
.card p{font-size:11px;margin:4px 0}.card span{color:#ff8c00;font-size:11px}
.card button{background:#ff5a00;border:0;color:#fff;width:90%;padding:6px;border-radius:6px;font-weight:700;margin-top:3px;cursor:pointer}
.formBox{background:#111;border:1px solid #333;border-radius:12px;padding:12px;max-width:400px;margin:10px auto}
.formBox input,.formBox select,.formBox textarea{width:100%;padding:10px;margin:6px 0;border-radius:8px;border:1px solid #333;background:#000;color:#fff}
.formBox button{width:100%;padding:10px;margin-top:8px;background:#ff8c00;border:0;border-radius:8px;color:#fff;font-weight:700;cursor:pointer}
.formBox .note{font-size:10px;color:#888;margin:8px 0;text-align:center}
.passWrap{position:relative;display:flex;align-items:center;width:100%}
.passWrap input{padding-right:40px !important}
.eyeBtn{position:absolute;right:10px;cursor:pointer;font-size:18px;user-select:none;background:#222;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #444}
.profileCard{background:linear-gradient(#1a1a1a,#222);border:1px solid #ff8c00;border-radius:12px;padding:15px;text-align:center;max-width:400px;margin:10px auto}
.profileCard h2{color:#ffb02e;font-size:18px}.profileCard p{font-size:12px;color:#ccc;margin:4px 0;word-break:break-all}
.orderList{max-width:400px;margin:10px auto}.orderItem{background:#111;border:1px solid #333;border-radius:8px;padding:8px;margin:6px 0;font-size:11px}
#chatBtn{position:fixed;bottom:20px;right:20px;width:70px;height:70px;background:linear-gradient(135deg,#25D366,#128C7E);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;z-index:1000;box-shadow:0 6px 20px rgba(37,211,102,0.6);border:3px solid #fff}
.chatBtnPulse{position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(37,211,102,0.4);animation:pulseRing 2s infinite;pointer-events:none}
@keyframes pulseRing{0%{transform:scale(0.8);opacity:1}100%{transform:scale(1.4);opacity:0}}
.chatBtnIcon{font-size:26px;position:relative;z-index:1}
.chatBtnText{font-size:9px;color:#fff;font-weight:700;position:relative;z-index:1}
#chatBox{position:fixed;bottom:100px;right:20px;width:340px;height:460px;background:#111;border:2px solid #25D366;border-radius:20px;z-index:99999;display:flex;flex-direction:column;overflow:hidden}
.chatHeader{background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;padding:12px 15px;display:flex;justify-content:space-between;align-items:center}
.chatHeader h4{color:#fff;margin:0;font-size:14px}
#closeChatBtn{background:#fff !important;color:#ff0000 !important;width:38px !important;height:38px !important;border-radius:50% !important;border:2px solid #fff !important;font-size:22px !important;font-weight:900 !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;flex-shrink:0 !important}
.chatMessages{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;background:#0a0a0a}
.chatMsg{padding:10px 14px;border-radius:18px;max-width:80%;font-size:12px;word-break:break-word}
.chatMsg.customer{background:linear-gradient(135deg,#ff8c00,#ff5a00);color:#fff;align-self:flex-end}
.chatMsg.admin{background:#222;color:#fff;align-self:flex-start;border:1px solid #333}
.chatMsg small{font-size:9px;opacity:0.7;display:block;margin-top:4px}
.quickReply{display:flex;gap:5px;padding:8px;background:#111;border-top:1px solid #222;overflow-x:auto}
.quickReply button{background:#1a1a1a;border:1px solid #333;color:#ccc;padding:6px 10px;border-radius:15px;font-size:10px;white-space:nowrap;cursor:pointer}
.chatInput{display:flex;gap:6px;padding:10px;background:#000;border-top:1px solid #333}
.chatInput input{flex:1;padding:12px 15px;border-radius:25px;border:1px solid #333;background:#111;color:#fff;font-size:12px}
.chatInput button{background:linear-gradient(135deg,#25D366,#128C7E);border:0;color:#fff;width:45px;height:45px;border-radius:50%;cursor:pointer}
.bottomGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;background:#0a0a0a;border-top:2px solid #ff8c00;padding:12px 4px}
@media(max-width:700px){.bottomGrid{grid-template-columns:1fr}}
.addressBox{background:#1a1a1a;border:1px solid #ff8c00;border-radius:15px;padding:12px;display:flex;gap:10px;margin-top:8px}
.addrIcon{font-size:30px;background:#222;width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid #ff8c00}
.addrInfo h4{color:#ff8c00;font-size:13px;margin-bottom:6px;text-align:left}
.addrInfo p{font-size:11px;color:#fff;margin:3px 0;text-align:left}
.paymentSection{background:#0f0f0f;border-top:2px solid #ff8c00;padding:12px 8px;margin-top:10px}
.payGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:10px 0;padding:10px 4px}
.payCard{background:#fff !important;border:0 !important;border-radius:10px !important;padding:12px 8px !important;text-align:center !important}
.payCard span{color:#000 !important;font-size:18px !important;font-weight:900 !important;display:block !important}
.payCard p{color:#000 !important}
.payIcon{font-weight:900;font-size:14px;padding:6px;border-radius:6px;margin-bottom:5px;color:#fff}
.payIcon.bkash{background:#e2136e}.payIcon.nagad{background:#f6921e}.payIcon.rocket{background:#8a2be2}.payIcon.cod{background:#2e8b57}
.socialGrid{display:flex !important;flex-direction:column !important;gap:8px !important;margin-top:10px !important}
.socialBtn{display:flex;align-items:center;gap:8px;background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:10px;text-decoration:none;color:#fff;width:100% !important;justify-content:flex-start !important}
.socialBtn span{font-size:20px;background:#222;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.footer{background:#000;border-top:1px solid #222;margin-top:5px;padding:12px;text-align:center}
.footerBox h4{color:#ff8c00;font-size:14px}.footerBox p{color:#ccc;font-size:11px;margin:4px 0}
#adminFullPage{position:fixed;top:0;left:0;width:100%;height:100vh;background:#000;z-index:9999;overflow-y:auto;padding:0}
.adminFullHeader{background:#111;border-bottom:2px solid #0f0;padding:12px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}
.adminFullHeader h2{color:#0f0;font-size:16px}
.adminLogoutBtn{background:#d93025!important;color:#fff!important;padding:8px 14px!important;border-radius:20px!important;font-size:12px!important;width:auto!important;margin:0!important}
.adminTabs{display:flex;gap:4px;overflow-x:auto;padding:10px;background:#0a0a0a;white-space:nowrap;border-bottom:1px solid #222;position:sticky;top:52px;z-index:9}
.adminTabs::-webkit-scrollbar{display:none}
.adminTabs button{background:#222;border:1px solid #333;color:#ccc;padding:8px 12px;border-radius:20px;font-size:11px;white-space:nowrap;cursor:pointer;flex-shrink:0}
.adminTabs button.active{background:#0f0;color:#000;font-weight:700}
.adminSec{padding:12px}
.dashGrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
.dashCard{background:#111;border:1px solid #0f0;border-radius:12px;padding:15px;text-align:center}
.dashCard h2{color:#0f0;font-size:28px}.dashCard p{color:#ccc;font-size:11px;margin-top:5px}
.infoBox{background:#111;border:1px solid #222;border-radius:8px;padding:10px;margin:10px auto;max-width:500px}
.adminItem{background:#111;border:1px solid #333;border-radius:10px;padding:10px;margin:8px 0;display:flex;gap:10px;align-items:center}
.adminItem img{width:60px;height:60px;object-fit:cover;border-radius:8px}
.adminItemInfo{flex:1}
.adminItemInfo p{font-size:11px;color:#fff;margin:2px 0}
.adminItemInfo span{font-size:10px;color:#aaa}
.adminItem button{padding:6px 10px;border:0;border-radius:6px;font-size:10px;cursor:pointer}
.btnDel{background:#d93025;color:#fff}
#buySec,#sellSec,#accountSec,#loginSec{position:fixed !important;top:0 !important;left:0 !important;width:100% !important;height:100vh !important;background:rgba(0,0,0,0.92) !important;z-index:5000 !important;overflow-y:auto !important;padding:15px 8px 30px !important;margin-top:0 !important;border-top:0 !important}
.closeOverlay{display:block;margin:5px auto 10px auto;background:#d93025 !important;color:#fff !important;padding:8px 20px !important;border:0 !important;border-radius:20px !important;font-weight:700 !important;cursor:pointer !important;width:auto !important}
.addressBox{flex-direction:column !important;align-items:center !important;justify-content:center !important;text-align:center !important;padding:16px 12px !important}
.addrIcon{margin:0 auto 8px auto !important}
.addrInfo{width:100% !important;text-align:center !important}
.addrInfo h4{text-align:center !important;font-size:14px !important}
.addrInfo p{text-align:center !important}
.socialMapSection{background:#0a0a0a;border-top:2px solid #ff8c00;padding:12px 10px 15px;margin-top:10px;text-align:center}
.socialIconsRow{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:10px 0}
.sIcon{display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none;color:#fff;background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:10px 8px;width:68px;font-size:22px}
.sIcon span{font-size:10px;color:#ccc}
.sIcon.fb{border-color:#1877f2}.sIcon.wa{border-color:#25D366}.sIcon.mail{border-color:#ea4335}.sIcon.call{border-color:#ff8c00}.sIcon.msg{border-color:#0084ff}
.mapBox{background:#1a1a1a;border:1px solid #ff8c00;border-radius:15px;padding:10px;max-width:600px;margin:10px auto}
.mapBox iframe{width:100%;height:250px;border:0;border-radius:12px}
.mapText{font-size:11px;color:#fff;margin:8px 0;text-align:center}
.mapBtnBig{display:block;background:#1877f2;color:#fff;text-decoration:none;padding:10px;border-radius:20px;font-weight:700;font-size:12px;margin-top:8px;text-align:center}
body{background:linear-gradient(180deg,#0b2a5b,#071a3a) !important}
.topBarWrap{background:#ff6a00 !important}
.topBarTrack{color:#fff !important}
header{background:#0b2a5b !important;border-bottom:2px solid #ff6a00 !important}
.fixedWrap{background:#0b2a5b !important}
.catBar{background:#0a7a42 !important;border-bottom:2px solid #ff6a00 !important}
.catBar button{background:#fff !important;color:#0b2a5b !important;border:0 !important;padding:7px 12px !important;border-radius:18px !important;font-size:12px !important;font-weight:600 !important}
.catBar button.active{background:#ff6a00 !important;color:#fff !important}
.sec{background:#0b2a5b !important;border-top:2px solid #ff6a00 !important}
.card{background:#fff !important;border:0 !important}
.card p{color:#111 !important}
.formBox{background:#fff !important;border:0 !important}
.formBox input,.formBox select,.formBox textarea{background:#fff !important;color:#000 !important;border:1px solid #ccc !important}
.profileCard{background:#fff !important;border:0 !important}
.profileCard p{color:#333 !important}
.paymentSection{background:#0a7a42 !important;border-top:2px solid #ff6a00 !important}
.payCard{background:#fff !important;border:0 !important}
.bottomGrid{background:#0b2a5b !important;border-top:2px solid #ff6a00 !important}
.socialBtn{background:#fff !important;color:#000 !important}
.addressBox{background:#fff !important;border:0 !important}
.addrInfo p{color:#111 !important}
.socialMapSection{background:#0a7a42 !important;border-top:2px solid #ff6a00 !important}
.mapBox{background:#fff !important;border:0 !important}
.mapText{color:#111 !important}
.footer{background:#071a3a !important}
#adminFullPage{background:#0b2a5b !important}
.adminFullHeader{background:#ff6a00 !important;border-bottom:0 !important}
.adminFullHeader h2{color:#fff !important}
/* বামে-ডানে চাপানো + মাঝে গ্যাপ - ফাইনাল */
.grid{grid-template-columns:1fr 1fr !important;gap:16px !important;padding:12px 4px !important}
.box{padding:0 !important}
.card{margin:0 !important;border-radius:12px !important}
.payGrid{gap:14px !important;padding:10px 4px !important}
.bottomGrid{gap:12px !important;padding:12px 4px !important}
