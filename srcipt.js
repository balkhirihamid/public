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
      <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
        Proceed to Checkout
      </button>
      <button onclick="clearBag()" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors">
        Clear Bag
      </button>
    </div>
  </div>`;
  
  footer.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="col-span-1 md:col-span-2">
        <h3 class="text-2xl font-bold mb-4">TechFlow</h3>
        <p class="text-gray-400 mb-6 max-w-md">
          Nous créons des solutions technologiques innovantes pour transformer la façon dont les entreprises
          travaillent et grandissent.
        </p>
        <div class="flex space-x-4">
          <a href="#"
            class="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#"
            class="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
            </svg>
          </a>
          <a href="#"
            class="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4">Produit</h4>
        <ul class="space-y-2 text-gray-400">
          <li><a href="#" class="hover:text-accent transition-colors">Fonctionnalités</a></li>
          <li><a href="#" class="hover:text-accent transition-colors">Tarifs</a></li>
          <li><a href="#" class="hover:text-accent transition-colors">API</a></li>
          <li><a href="#" class="hover:text-accent transition-colors">Documentation</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4">Support</h4>
        <ul class="space-y-2 text-gray-400">
          <li><a href="#" class="hover:text-accent transition-colors">Centre d'aide</a></li>
          <li><a href="#" class="hover:text-accent transition-colors">Contact</a></li>
          <li><a href="#" class="hover:text-accent transition-colors">Statut</a></li>
          <li><a href="#" class="hover:text-accent transition-colors">Communauté</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-400 text-sm">
        © 2024 TechFlow. Tous droits réservés.
      </p>
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="#" class="text-gray-400 hover:text-accent text-sm transition-colors">Politique de confidentialité</a>
        <a href="#" class="text-gray-400 hover:text-accent text-sm transition-colors">Conditions d'utilisation</a>
        <a href="#" class="text-gray-400 hover:text-accent text-sm transition-colors">Cookies</a>
      </div>
    </div>
  </div>`;

  document.body.appendChild(drawer);
  document.body.appendChild(footer);
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

  const switchOpt = hex => hex.slice(2) + hex.slice(0, 2);

  const addToCard = (ref, img, desc, prix, one=false) => {
    var s = localStorage.getItem("pannier")??'[]';
    pannier = JSON.parse(s);
    const index = pannier.findIndex(x => x.ref == ref.trim());
    if(!one){
      index == -1 ? pannier.push({img:img, ref:ref, desc:desc.trim(), color:_('input[name="color"]:checked').value, prix:prix, qte:qte}) : (pannier[index].qte=qte, pannier[index].color=_('input[name="color"]:checked').value ); 
    } else{
      index == -1 ? pannier.push({img:img, ref:ref, desc:desc.trim(), color:x.color.split(',')[0].includes('#')?x.color.split(',')[0]:`#${switchOpt(x.color.split(',')[0])}`, prix:prix, qte:qte}) : null;
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
