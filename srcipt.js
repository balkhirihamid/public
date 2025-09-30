// Mobile menu toggle
tailwind.config = {
  theme: {
    extend: {
      colors: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#10B981', dark: '#1F2937', light: '#F9FAFB' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    }
  }
}

  const _ = (e) => document.querySelector(e); const __ = (e) => document.querySelectorAll(e);

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
          navbar.classList.add('bg-dark', 'bg-opacity-90');
      } else {
          navbar.classList.remove('bg-dark', 'bg-opacity-90');
      }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
          }
      });
  }, observerOptions);

  // Observe all sections for animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });


  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }


  // Function to generate HTML string for the order
  async function generateOrderHTML(pn) {
    const author = document.head.querySelector("[name=author]").content??"tender";
    const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @media print {
        body { print-color-adjust: exact; } }
        .invoice-table th { background: #667eea; 
      }
    </style>
  </head>
  <body class="bg-gray-100 min-h-screen py-8">
    <div class="container mx-auto max-w-5xl">
      <div class="bg-white rounded-lg shadow-lg sm:p-8 p-2 mb-6">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 uppercase">order</h1>
            <p class="text-gray-600 mt-2">Order #ORD-2025-001</p>
            <p class="text-gray-600">Date: <span id="current-date"></span></p>
          </div>
          <div class="text-right">
            <h2 class="text-xl font-semibold text-gray-700">${author}</h2>
            <p class="text-gray-600 adresse">123 Tech Street</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="invoice-table w-full border-collapse border border-gray-300">
            <thead>
              <tr class="text-white text-sm">
                <th class="border border-gray-300 px-4 py-3 text-left w-[81px]">Image</th>
                <th class="border border-gray-300 px-4 py-3 text-left">Référence</th>
                <th class="border border-gray-300 px-4 py-3 text-left">Description</th>
                <th class="border border-gray-300 px-4 py-3 text-center">Qté</th>
                <th class="border border-gray-300 px-4 py-3 text-right">Prix Unitaire</th>
                <th class="border border-gray-300 px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody id="products-tbody">
            </tbody>
          </table>
        </div>

        <div class="mt-8 flex justify-end">
          <div class="w-80 space-y-2">
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="font-medium text-gray-600">Sous-total:</span>
              <span id="subtotal" class="font-semibold text-gray-800">0 DH</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="font-medium text-gray-600">TVA (20%):</span>
              <span id="tax" class="font-semibold text-gray-800">0 DH</span>
            </div>
            <div class="flex justify-between py-3 border-b-2 border-gray-800">
              <span class="text-xl font-bold text-gray-800">Total TTC:</span>
              <span id="total" class="text-xl font-bold text-green-600">0 DH</span>
            </div>
          </div>
        </div>

        <div class="mt-8 bg-gray-50 p-4 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-blue-600" id="total-items">0</p>
              <p class="text-gray-600">Articles</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-purple-600" id="total-quantity">0</p>
              <p class="text-gray-600">Quantité Total</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-green-600" id="average-price">0 DH</p>
              <p class="text-gray-600">Prix Moyen</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      const products = ${JSON.stringify(pn, null, 6)};

      function formatPrice(price) {
        return price.toLocaleString('fr-FR') + ' DH';
      }

      function createProductRow(product, index) {
        const total = product.prix * product.qte;
        const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

        return \`
          <tr class="\${rowClass} hover:bg-blue-50 transition-colors">
            <td class="border border-gray-300 p-2">
              <img src="\${product.img}" 
                alt="\${product.desc}" 
                class="w-16 h-16 object-cover rounded border shadow-sm"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNiAyNkgzOFYzOEgyNlYyNloiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo='">
            </td>
            <td class="border border-gray-300 px-4 py-3">
              <span class="font-semibold text-blue-600 uppercase">\${product.ref}</span>
            </td>
            <td class="border border-gray-300 px-4 py-3">
              <span class="font-medium text-gray-800 capitalize">\${product.desc}</span>
            </td>
            <td class="border border-gray-300 px-4 py-3 text-center">
              <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">\${product.qte}</span>
            </td>
            <td class="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">
              \${formatPrice(product.prix)}
            </td>
            <td class="border border-gray-300 px-4 py-3 text-right font-bold text-green-600">
              \${formatPrice(total)}
            </td>
          </tr>
      \`;
      }

      function calculateTotals() {
        const subtotal = products.reduce((sum, product) => sum + (product.prix * product.qte), 0);
        const total = subtotal;
        const totalItems = products.length;
        const totalQuantity = products.reduce((sum, product) => sum + product.qte, 0);

        document.getElementById('subtotal').textContent = formatPrice(subtotal);
        document.getElementById('total').textContent = formatPrice(subtotal);
        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-quantity').textContent = totalQuantity;
        document.getElementById('average-price').textContent = formatPrice(subtotal);
      }

      function renderInvoice() {
        const today = new Date();
        document.getElementById('current-date').textContent = today.toLocaleDateString('fr-FR');

        const tbody = document.getElementById('products-tbody');
        tbody.innerHTML = products.map(createProductRow).join('');
        calculateTotals();
        document.querySelector(".adresse").textContent = ${document.head.querySelector("[name=address]")?.content??"not avilable"};
      }
      
      document.addEventListener('DOMContentLoaded', renderInvoice);
    </script>
    </body>
    </html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const base64 = await blobToBase64(blob);
    const orderId = Date.now();

    const sendedUrl = `https://tendergh.github.io/client/${orderId}/`;

    const url = `https://api.github.com/repos/tendergh/client/contents/${orderId}/index.html`;

    // 3. PUT request to GitHub
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Authorization": `token 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`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "upload file via JS",
        content: base64
      })
    });

    if (res.ok) {
      const aw = document.createElement('a'); 
      aw.href = `https://wa.me/+212641550703?text=${encodeURIComponent(sendedUrl)}`; 
      aw.target = '_blank'; aw.click();
    }
    else{ 
      alert("Error Please try again.");
      console.error("GitHub API error:", await res.json());}
  }

  function formatNumber(n){
    return n.toLocaleString(undefined, {maximumFractionDigits:0});
  }

    // === build the message string from items ===
  function generateMessage(list){
    let lines = [];
    lines.push("Commande / Request");
    lines.push("-------------------");

    let total = 0;
    list.forEach((it, idx) => {
      // compute subtotal
      const unit = Number(it.prix) || 0;
      const q = Number(it.qte) || 0;
      const sub = unit * q;

      total += sub;

      // a single line per item
      lines.push(`${idx+1}. ${it.ref} — ${it.desc}`);
      lines.push(`   qte: ${q}  |  prix: ${formatNumber(unit)}  |  subtotal: ${formatNumber(sub)}`);
      // optional: include image link (comment out if you don't want links)
      //lines.push(`   img: ${it.img}`);
      lines.push(""); // blank line between items
    });

    lines.push("-------------------");
    lines.push(`Total: ${formatNumber(total)}`);
    lines.push(""); // empty line
    lines.push("Notes:"); // placeholder for extra notes
    // join with newline
    return lines.join("\n");
  }

(function(){
  const footer = document.createElement("footer");
  const drawer = document.createElement("div");

  drawer.className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col";
  drawer.id="bagDrawer";
  footer.className="bg-dark text-white py-16";
  
  drawer.innerHTML = `<!-- Drawer Header -->
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0">
    <div class="flex items-center space-x-2">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
      <h2 class="text-lg font-semibold">Shopping Bag</h2>
      <span id="drawerItemCount" class="bg-white/20 text-sm px-2 py-1 rounded-full">3 items</span>
    </div>
    <button id="closeBag" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <!-- Bag Items (Scrollable) -->
  <div id="bagItems" class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
    <!-- Sample items will be populated by JavaScript -->
  </div>

  <!-- Empty State -->
  <div id="emptyBag" class="flex-1 flex flex-col items-center justify-center p-8 text-center hidden">
    <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
    </svg>
    <h3 class="text-lg font-semibold text-gray-600 mb-2">Your bag is empty</h3>
    <p class="text-gray-500 text-sm">Add some products to get started!</p>
  </div>

  <!-- Drawer Footer -->
  <div class="border-t bg-gray-50 p-4 space-y-4 flex-shrink-0">
    <!-- Subtotal -->
    <div class="flex items-center justify-between text-lg font-semibold">
      <span>Subtotal:</span>
      <span id="subtotal">0.00</span>
    </div>
    
    <!-- Action Buttons -->
    <div class="space-y-2">
      <div class="flex items-center justify-center gap-4">
        <span onclick="wsend()" class="Vwhatsapp flex flex-1 justify-center items-center ring-2 bg-green-600 p-2 rounded-md gap-2 text-white cursor-pointer"><i class="fa-brands fa-whatsapp"></i></i>Whatsapp</span>
        <a class="Vmail flex flex-1 justify-center items-center ring-2 text-red-600 p-2 rounded-md gap-2 bg-white cursor-pointer"><i class="fa-regular fa-envelope"></i>Email</a>
        <span onclick="clearBag()" class="flex justify-center items-center ring-2 ring-red-500 text-red-600 p-2 rounded-md gap-2 bg-white cursor-pointer"><i class="fa-regular fa-trash-can"></i></span>
      </div>
    </div>
  </div>`;
  document.body.appendChild(drawer);
}());

  const bagDrawer = document.getElementById('bagDrawer');
  const overlay = document.getElementById('overlay');
  const bagToggle = document.getElementById('bagToggle');
  const closeBag = document.getElementById('closeBag');

  bagToggle.addEventListener('click', openBag);
  closeBag.addEventListener('click', closeBagDrawer);
  overlay.addEventListener('click', closeBagDrawer);
  const bag = document.getElementById('bagItems');

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });

  const removeFromBag = (index) =>{ index==0?pannier.shift():pannier.splice(index,1); localStorage.setItem("pannier", JSON.stringify(pannier)); GetPannier(); }

  const wsend = () =>{
    generateOrderHTML(pannier);
  }

  function renderBagItems() {
    bag.innerHTML = '';

    pannier.forEach((item, i) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'flex items-center space-x-4 bg-gray-50 p-2 rounded-lg';
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.desc}" class="w-20 h-20 object-cover rounded-lg bg-gray-200">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-gray-900 truncate">${item.desc}</h4>
          <p class="text-sm text-gray-600">$${item.prix.toFixed(2)}</p>
          <div class="flex items-center space-x-2 mt-2">
            <button onclick="updateQuantity(${i}, -1)" class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
              </svg>
            </button>
            <span class="w-8 text-center font-medium">${item.qte}</span>
            <button onclick="updateQuantity(${i}, 1)" class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
            <span class="w-8 h-8 flex items-center justify-center border border-gray-700 hover:bg-gray-300 rounded-full" style="background:${item.color}"></span>
          </div>
        </div>
        <div class="text-right">
          <p class="font-semibold text-gray-900">$${(item.prix * item.qte).toFixed(2)}</p>
          <button onclick="removeFromBag(${i})" class="p-1 hover:text-red-600 bg-white ring-red-500 rounded  hover:ring-1 text-sm mt-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EA3323"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      `;
      bag.appendChild(itemElement);
    });

    const total = pannier.reduce((sum, x) => sum + (x.prix * x.qte), 0);
    _('#subtotal').textContent = `${total.toFixed(2)} MAD`;
  }

  const updateQuantity = (i,q) =>{
    q>0?pannier[i].qte++:pannier[i].qte>1?pannier[i].qte--:null;
    localStorage.setItem("pannier", JSON.stringify(pannier));
    notification(); renderBagItems();
  }

  function openBag() {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.add('opacity-100');
      bagDrawer.classList.remove('translate-x-full');
    }, 10);
  }

  function closeBagDrawer() {
    overlay.classList.remove('opacity-100');
    bagDrawer.classList.add('translate-x-full');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }

  function clearBag() {
    localStorage.clear(); GetPannier();
  }

  __('[data-target]').forEach(x=>{
    x.addEventListener("click",(e)=>{ _('#mainImage').src = e.target.src; 
    __('[data-target]').forEach(y=>y.classList.replace("border-blue-500","border-gray-200")); e.target.classList.replace("border-gray-200","border-blue-500") });
  })

  var qte = 1, pannier = [];

  const refresh 	= () =>{ !! _("#quantity")?_("#quantity").innerText = qte:null }
  const decrease 	= () =>{ qte>1?qte--:qte=1; refresh() }
  const increase 	= () =>{ qte++; refresh() }

  const selectColor  = (e)=>{ e.querySelector('[data-color]').click(); }

  const GetPannier   = () =>{ 
    var s = localStorage.getItem("pannier")??'[]'; pannier = JSON.parse(s);
    const id = !!_("#ref")?_("#ref").innerText:0;
    
    if(!!pannier.find(x=>x.ref.trim()==id)){
      const current = pannier.find(x=>x.ref.trim()==id);
      qte = current.qte; _(`input[value="${current.color}"]`).checked=true;
    }
    refresh(); notification(); renderBagItems(); // notification();
  }

  const notification = () =>{ 
    _('#drawerItemCount').innerText = pannier.length;
    !_(".notif .badge")? _(".notif").innerHTML += '<span class="badge absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">'+pannier.length+'</span>':_(".badge").innerText=pannier.length; 
  }

  const addToCard = (ref, img, desc, prix, one=false, color) => {
    var s = localStorage.getItem("pannier")??'[]';
    pannier = JSON.parse(s);
    const index = pannier.findIndex(x => x.ref == ref.trim());
    if(!one){
      index == -1 ? pannier.push({img:img, ref:ref, desc:desc.trim(), color:_('input[name="color"]:checked').value, prix:prix, qte:qte}) : (pannier[index].qte=qte, pannier[index].color=_('input[name="color"]:checked').value ); 
    } else{
      index == -1 ? pannier.push({img:img, ref:ref, desc:desc.trim(), color:color, prix:prix, qte:qte}) : null;
    }
    localStorage.setItem("pannier", JSON.stringify(pannier));
    notification(); renderBagItems();
  }
  const showTab = (e, id) =>{
    document.querySelectorAll('.tab-button').forEach((x)=>{x!=e?x.classList.remove("border-blue-500"):x.classList.add("border-blue-500")})
    document.querySelectorAll(".tab-content").forEach(x=>x.className="tab-content hidden");
    _('#'+id).className="tab-content";
  }
  
  GetPannier();
