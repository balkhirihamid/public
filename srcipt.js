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


const bagDrawer = document.getElementById('bagDrawer');
const overlay = document.getElementById('overlay');
const bagToggle = document.getElementById('bagToggle');
const closeBag = document.getElementById('closeBag');

bagToggle.addEventListener('click', openBag);
closeBag.addEventListener('click', closeBagDrawer);
overlay.addEventListener('click', closeBagDrawer);
const bag = document.getElementById('bagItems');

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
        <button onclick="removeFromBag(${i})" class="text-white bg-red-500 p-1 hover:text-red-600 hover:bg-white ring-red-500 rounded  hover:ring-2 text-sm mt-2 transition-colors">
          Remove
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



const _ = (e) => document.querySelector(e); const __ = (e) => document.querySelectorAll(e);
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

const addToCard = (ref, img, desc, prix, one=false) => {
  var s = localStorage.getItem("pannier")??'[]';
  pannier = JSON.parse(s);
  const index = pannier.findIndex(x => x.ref == ref.trim());
  if(!one){
    index == -1 ? pannier.push({img:img, ref:ref, desc:desc.trim(), color:_('input[name="color"]:checked').value, prix:prix, qte:qte}) : (pannier[index].qte=qte, pannier[index].color=_('input[name="color"]:checked').value ); 
  } else{
    index == -1 ? pannier.push({img:img, ref:ref, desc:desc.trim(), color:'#0000', prix:prix, qte:qte}) : null;
  }
  localStorage.setItem("pannier", JSON.stringify(pannier));
  notification(); renderBagItems();
}

GetPannier();


const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
  });

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