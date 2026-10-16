// zipdash-db.js - shared data layer for index.html and admin.html (keep this file next to them)
// To share data between phones: create a free Firebase project, enable Firestore, paste the web config below.
// While FIREBASE_CONFIG is null, everything is saved only in this browser (same as before).
const FIREBASE_CONFIG = null; // e.g. { apiKey:"...", authDomain:"...", projectId:"..." }
const SEED_PRODUCTS = [
  // Snacks & Instant
  { id: 1, name: "Kurkure Solid Masti", category: "Snacks & Instant", weight: "Standard Pack", price: 20, mrp: 25, badge: "CRUNCHY", brand: "Kurkure", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Rice meal, edible vegetable oil, corn meal, spices and condiments.", image: "assets/solid masti.jpg" },
  { id: 2, name: "Kurkure Masala Munch", category: "Snacks & Instant", weight: "Standard Pack", price: 20, mrp: 25, badge: "50% EXTRA", brand: "Kurkure", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Rice meal, corn meal, edible vegetable oil, masala munch seasoning.", image: "assets/kurkure masala munch.jpg" },
  { id: 3, name: "Tedhe Medhe", category: "Snacks & Instant", weight: "Standard Pack", price: 20, mrp: 25, badge: "MASALA TADKA", brand: "Bingo", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Rice meal, corn meal, gram meal, edible oil, spices.", image: "assets/tedhe medhe.jpg" },
  { id: 4, name: "Singbhujia", category: "Snacks & Instant", weight: "Standard Pack", price: 30, mrp: 35, badge: "NAMKEEN", brand: "Balaji", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Peanuts, gram flour, edible oil, spices and condiments.", image: "assets/Sing bhujia.jpg" },
  { id: 5, name: "Aloo Sev", category: "Snacks & Instant", weight: "Standard Pack", price: 30, mrp: 35, badge: "BALAJI", brand: "Balaji", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Tepary bean flour, potato solids, edible vegetable oil, spices.", image: "assets/Aloo sev.jpg" },
  { id: 6, name: "Ratlami Sev", category: "Snacks & Instant", weight: "Standard Pack", price: 35, mrp: 40, badge: "SPICY", brand: "Balaji", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Gram flour, edible vegetable oil, clove powder, spices and condiments.", image: "assets/ratlami sev.jpg" },
  { id: 7, name: "Tomato Chips", category: "Snacks & Instant", weight: "Standard Pack", price: 20, mrp: 25, badge: "TOMATO TWIST", brand: "Balaji", shelfLife: "4 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Potato, edible vegetable oil, sugar, tomato powder, salt, spices.", image: "assets/Tomato Chips.jpg" },
  { id: 8, name: "Mad Angels", category: "Snacks & Instant", weight: "Standard Pack", price: 20, mrp: 25, badge: "MMMM MASALA", brand: "Bingo", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Rice meal, corn meal, edible oil, seasoning, spices.", image: "assets/MAD Angels.jpg" },
  { id: 9, name: "Crunchex Chili Tadka", category: "Snacks & Instant", weight: "Standard Pack", price: 30, mrp: 35, badge: "CRUNCHEX", brand: "Balaji", shelfLife: "4 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Potato, edible oil, chili spices, salt.", image: "assets/Crunchex.jpg" },
  { id: 10, name: "Crunchex Simply Salted", category: "Snacks & Instant", weight: "Standard Pack", price: 30, mrp: 35, badge: "SALTED", brand: "Balaji", shelfLife: "4 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Potato, edible vegetable oil, iodised salt.", image: "assets/Chrunchex(simply salted).jpg" },
  { id: 11, name: "Crunchem Masala Masti", category: "Snacks & Instant", weight: "Standard Pack", price: 30, mrp: 35, badge: "MASALA", brand: "Balaji", shelfLife: "4 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Potato, edible vegetable oil, spices and condiments.", image: "assets/Chrunchem(masala masti).jpg" },
  { id: 12, name: "Crunchem Cream & Onion", category: "Snacks & Instant", weight: "Standard Pack", price: 30, mrp: 35, badge: "CREAM & ONION", brand: "Balaji", shelfLife: "4 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Potato, edible vegetable oil, milk solids, onion powder, herbs.", image: "assets/Chrunchem(cream & onion).jpg" },

  // Drinks & Beverages
  { id: 13, name: "Maaza", category: "Drinks & Beverages", weight: "600 ml Bottle", price: 40, mrp: 45, badge: "MANGO DRINK", brand: "Coca-Cola", shelfLife: "180 Days", preference: "Vegetarian", cooking: "Chill and enjoy", ingredients: "Water, mango pulp, sugar, acidity regulator, ascorbic acid.", image: "assets/Maza.jpg" },
  { id: 14, name: "Fanta", category: "Drinks & Beverages", weight: "750 ml Bottle", price: 45, mrp: 50, badge: "ORANGE SODA", brand: "Coca-Cola", shelfLife: "120 Days", preference: "Vegetarian", cooking: "Serve chilled", ingredients: "Carbonated water, sugar, orange juice concentrate, citric acid.", image: "assets/Fanta.jpg" },
  { id: 15, name: "Frooti", category: "Drinks & Beverages", weight: "600 ml Bottle", price: 40, mrp: 45, badge: "MANGO DRINK", brand: "Parle Agro", shelfLife: "180 Days", preference: "Vegetarian", cooking: "Chill before drinking", ingredients: "Water, mango pulp, sugar, acidity regulator, vitamin C.", image: "assets/Frooti.jpg" },
  { id: 16, name: "Sosyo", category: "Drinks & Beverages", weight: "600 ml Bottle", price: 40, mrp: 45, badge: "CARBONATED", brand: "Sosyo", shelfLife: "120 Days", preference: "Vegetarian", cooking: "Serve chilled", ingredients: "Carbonated water, sugar, fruit juices, permitted colors and flavors.", image: "assets/sosyo.jpg" },
  { id: 17, name: "Thumbs Up", category: "Drinks & Beverages", weight: "750 ml Bottle", price: 45, mrp: 50, badge: "THUNDER", brand: "Coca-Cola", shelfLife: "120 Days", preference: "Vegetarian", cooking: "Serve ice cold", ingredients: "Carbonated water, sugar, caffeine, acidity regulator, approved flavors.", image: "assets/Thumbsup.jpg" },

  // Dairy & Breakfast
  { id: 18, name: "Amul Processed Cheese Cubes", category: "Dairy & Breakfast", weight: "200 g Box", price: 135, mrp: 140, badge: "PURE MILK", brand: "Amul", shelfLife: "9 Months", preference: "Vegetarian", cooking: "Ready to consume", ingredients: "Cheese, Sodium Citrate, Common Salt, Citric Acid, Permitted Natural Colour.", image: "assets/cheese cube.jpg" },
  { id: 19, name: "Amul Mozzarella Diced Cheese", category: "Dairy & Breakfast", weight: "200 g Pack", price: 125, mrp: 130, badge: "PIZZA CHEESE", brand: "Amul", shelfLife: "6 Months", preference: "Vegetarian", cooking: "Melt on food", ingredients: "Mozzarella Cheese, Cheddar Cheese Blend, Common Salt.", image: "assets/mozrella cheese.jpg" },
  { id: 20, name: "Amul Cheese Slices", category: "Dairy & Breakfast", weight: "200 g (10 Slices)", price: 140, mrp: 145, badge: "RICH TASTE", brand: "Amul", shelfLife: "9 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Milk, Cheese, Emulsifying Salts, Iodised Salt.", image: "assets/cheese slice.jpg" },
  { id: 21, name: "Amul Butter Cubes", category: "Dairy & Breakfast", weight: "100 g Box", price: 58, mrp: 60, badge: "UTTERLY BUTTERLY", brand: "Amul", shelfLife: "12 Months", preference: "Vegetarian", cooking: "Ready to spread", ingredients: "Butter, Common Salt, Permitted Natural Colour.", image: "assets/amul butter cube.jpg" },

  // Biscuits & Chocolates
  { id: 22, name: "Cadbury Dairy Milk Silk Chocolate", category: "Biscuits & Chocolates", weight: "150 g Bar", price: 175, mrp: 180, badge: "SILK SMOOTH", brand: "Cadbury", shelfLife: "12 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Sugar, Milk Solids, Cocoa Butter, Cocoa Solids, Emulsifiers.", image: "assets/dairymilk silk.jpg" },
  { id: 23, name: "Oreo Original Chocolate Biscuits", category: "Biscuits & Chocolates", weight: "120 g Pack", price: 26, mrp: 30, badge: "SANDWICH", brand: "Cadbury Oreo", shelfLife: "9 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Refined Wheat Flour, Sugar, Edible Vegetable Fat, Cocoa Solids, Invert Sugar.", image: "assets/oreo.jpg" },
  { id: 24, name: "Cadbury Dairy Milk Silk Hazelnut", category: "Biscuits & Chocolates", weight: "143 g Bar", price: 185, mrp: 190, badge: "HAZELNUT", brand: "Cadbury", shelfLife: "12 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Sugar, Milk Solids, Hazelnuts, Cocoa Butter, Cocoa Solids, Emulsifiers.", image: "assets/dairymilk heazulnuts.jpg" },
  { id: 25, name: "Dark Fantasy Bourbon Biscuits", category: "Biscuits & Chocolates", weight: "100 g Pack", price: 10, mrp: 15, badge: "CLASSIC CHOCO", brand: "Sunfeast", shelfLife: "9 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Wheat Flour, Sugar, Refined Palm Oil, Cocoa Solids, Starch, Emulsifiers.", image: "assets/bourborn.jpg" },
  { id: 26, name: "Cadbury Dairy Milk Chocolate", category: "Biscuits & Chocolates", weight: "50 g Bar", price: 45, mrp: 50, badge: "CLASSIC", brand: "Cadbury", shelfLife: "12 Months", preference: "Vegetarian", cooking: "Ready to eat", ingredients: "Sugar, Milk Solids, Cocoa Butter, Cocoa Solids, Emulsifiers.", image: "assets/dairymilk.jpg" }
];
const INV_KEY='zipdash_inventory_v3', ORD_KEY='zipdash_all_orders', SET_KEY='zipdash_settings';
const DEFAULT_SETTINGS={lat:null,lng:null,radiusKm:5,deliveryFee:20,freeAbove:100,pinHash:'',
 categories:[{name:'Snacks & Instant',group:'Snacks & Drinks',icon:'🍿'},{name:'Drinks & Beverages',group:'Snacks & Drinks',icon:'🥤'},{name:'Biscuits & Chocolates',group:'Snacks & Drinks',icon:'🍫'},{name:'Dairy & Breakfast',group:'Grocery & Kitchen',icon:'🥛'},{name:'Atta & Rice & Daal',group:'Grocery & Kitchen',icon:'🌾'}],
 containers:['Bottle','Can','Packet','Pouch','Box','Jar','Tetra Pack','Bar']};
const seeded=()=>SEED_PRODUCTS.map((p,i)=>({...p,id:'p'+p.id,stock:20,order:i+1}));
const byOrder=(a,b)=>(a.order??0)-(b.order??0);
const jget=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const jset=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function take(inv,lines){
  for(const l of lines){const p=inv.find(x=>x.id===l.id),h=p&&!p.oos?(Number(p.stock)||0):0;
    if(!p||h<l.qty)throw new Error(h>0?`Sorry, only ${h} of "${p.name}" left. Please reduce the quantity.`:`Sorry, "${p?p.name:'an item'}" just went out of stock.`);}
  lines.forEach(l=>{const p=inv.find(x=>x.id===l.id);p.stock=(Number(p.stock)||0)-l.qty;});
}
function giveBack(inv,lines){(lines||[]).forEach(l=>{const p=inv.find(x=>x.id===l.id);if(p)p.stock=(Number(p.stock)||0)+l.qty;});}
function watchLocal(read,cb){let last=null;const tick=()=>{const v=read(),s=JSON.stringify(v);if(s!==last){last=s;cb(v);}};tick();
  const t=setInterval(tick,1000);window.addEventListener('storage',tick);return()=>{clearInterval(t);window.removeEventListener('storage',tick);};}
const LOCAL={
  watchProducts:cb=>watchLocal(()=>{let v=jget(INV_KEY,null);if(!Array.isArray(v)||!v.length){v=seeded();jset(INV_KEY,v);}return v.slice().sort(byOrder);},cb),
  async mutateProducts(fn){const v=jget(INV_KEY,null)||seeded();fn(v);jset(INV_KEY,v);},
  async placeOrder(order,lines){const inv=jget(INV_KEY,null)||seeded();take(inv,lines);const docId='o'+Date.now()+Math.floor(Math.random()*1000);
    const o=jget(ORD_KEY,[]);o.push({...order,lines,docId});jset(INV_KEY,inv);jset(ORD_KEY,o);return docId;},
  async cancelOrder(id){const o=jget(ORD_KEY,[]),x=o.find(q=>q.docId===id);if(!x)return;
    if(x.status!=='Pending'||x.riderName)throw new Error('This order can no longer be cancelled.');
    const inv=jget(INV_KEY,[]);giveBack(inv,x.lines);x.status='Cancelled';jset(INV_KEY,inv);jset(ORD_KEY,o);},
  watchOrder:(id,cb)=>watchLocal(()=>jget(ORD_KEY,[]).find(o=>o.docId===id)||null,cb),
  watchMyOrders:(ph,cb)=>watchLocal(()=>jget(ORD_KEY,[]).filter(o=>ph&&o.customerPhone===ph),cb),
  watchOrders:cb=>watchLocal(()=>jget(ORD_KEY,[]),cb),
  async updateOrder(id,patch){const o=jget(ORD_KEY,[]),x=o.find(q=>q.docId===id);if(x){Object.assign(x,patch);jset(ORD_KEY,o);}},
  async addChat(id,m){const o=jget(ORD_KEY,[]),x=o.find(q=>q.docId===id);if(x){(x.chat=x.chat||[]).push(m);jset(ORD_KEY,o);}},
  watchSettings:cb=>watchLocal(()=>({...DEFAULT_SETTINGS,...jget(SET_KEY,{})}),cb),
  async saveSettings(p){jset(SET_KEY,{...jget(SET_KEY,{}),...p});}
};
let _db;
function db(){return _db||(_db=new Promise((res,rej)=>{
  const ld=s=>new Promise((a,b)=>{const e=document.createElement('script');e.src=s;e.onload=a;e.onerror=b;document.head.appendChild(e);});
  const u=n=>`https://www.gstatic.com/firebasejs/10.12.2/firebase-${n}-compat.js`;
  ld(u('app')).then(()=>ld(u('firestore'))).then(()=>{firebase.initializeApp(FIREBASE_CONFIG);res(firebase.firestore());}).catch(rej);}));}
const sub=mk=>{let off=null,dead=false;db().then(d=>{if(!dead)off=mk(d);}).catch(e=>console.error('Firebase',e));return()=>{dead=true;if(off)off();};};
const INV=d=>d.collection('store').doc('inventory'), ORD=d=>d.collection('orders');
const CLOUD={
  watchProducts:cb=>sub(d=>INV(d).onSnapshot(s=>{if(!s.exists){INV(d).set({items:seeded()});return;}cb(s.data().items.slice().sort(byOrder));})),
  async mutateProducts(fn){const d=await db();await d.runTransaction(async t=>{const s=await t.get(INV(d));const it=s.exists?s.data().items:seeded();fn(it);t.set(INV(d),{items:it});});},
  async placeOrder(order,lines){const d=await db(),ref=ORD(d).doc();
    await d.runTransaction(async t=>{const s=await t.get(INV(d));const it=s.exists?s.data().items:seeded();take(it,lines);t.set(INV(d),{items:it});t.set(ref,{...order,lines,docId:ref.id});});return ref.id;},
  async cancelOrder(id){const d=await db(),ref=ORD(d).doc(id);
    await d.runTransaction(async t=>{const o=await t.get(ref),s=await t.get(INV(d));if(!o.exists)return;const x=o.data();
      if(x.status!=='Pending'||x.riderName)throw new Error('This order can no longer be cancelled.');
      const it=s.data().items;giveBack(it,x.lines);t.set(INV(d),{items:it});t.update(ref,{status:'Cancelled'});});},
  watchOrder:(id,cb)=>sub(d=>ORD(d).doc(id).onSnapshot(s=>cb(s.exists?s.data():null))),
  watchMyOrders:(ph,cb)=>sub(d=>ORD(d).where('customerPhone','==',ph||'-').onSnapshot(q=>cb(q.docs.map(x=>x.data())))),
  watchOrders:cb=>sub(d=>ORD(d).onSnapshot(q=>cb(q.docs.map(x=>x.data()).sort((a,b)=>(a.date||'')<(b.date||'')?-1:1)))),
  async updateOrder(id,patch){(await db()).collection('orders').doc(id).update(patch);},
  async addChat(id,m){(await db()).collection('orders').doc(id).update({chat:firebase.firestore.FieldValue.arrayUnion(m)});},
  watchSettings:cb=>sub(d=>d.collection('store').doc('settings').onSnapshot(s=>cb({...DEFAULT_SETTINGS,...(s.exists?s.data():{})}))),
  async saveSettings(p){(await db()).collection('store').doc('settings').set(p,{merge:true});}
};
window.ZD=FIREBASE_CONFIG?CLOUD:LOCAL;
window.ZD_CLOUD=!!FIREBASE_CONFIG;