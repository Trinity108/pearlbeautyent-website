// Pearl Beauty Frontend JavaScript
// Handles product loading, quiz functionality, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pearl Beauty app loaded 🌴');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Detect which page we're on and load appropriate content
    const currentPath = window.location.pathname;
    
    if (currentPath === '/products') {
        // Load all products on products page
        loadAllProducts();
    } else {
        // Load homepage content
        loadBestSellers();
        loadBundles();
    }
    
    // Initialize interactive elements
    initializeQuiz();
    initQuizNavigation(); // Initialize quiz navigation ONCE on page load
    initializeEmailCapture();
    
    // Toggle sections functionality (Before & After, Ingredients)
    initializeCollapsibleSections();
    
    // Initialize cookie consent banner
    initializeCookieBanner();
    
    // Smooth scrolling for anchor links (exclude #quiz which opens modal)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip #quiz - it's handled by initializeQuiz()
            if (href === '#quiz') return;
            
            // Check if it's a collapsible section link
            if (href === '#before-after' || href === '#ingredients') {
                e.preventDefault();
                toggleSection(href.replace('#', ''));
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Load best-selling products
async function loadBestSellers() {
    try {
        const response = await axios.get('/api/products');
        const { products } = response.data;
        
        const container = document.getElementById('best-sellers');
        if (!container) return;
        
        // Show top 4 products
        const topProducts = products.slice(0, 4);
        
        container.innerHTML = topProducts.map(product => `
            <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div class="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg mb-4 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=&quot;fas fa-bottle-water text-teal-600 text-3xl flex items-center justify-center h-full&quot;></i>'">
                </div>
                
                <div class="flex items-center gap-1 mb-2">
                    ${generateStarRating(product.rating)}
                    <span class="text-sm text-gray-500 ml-2">(${product.reviews})</span>
                </div>
                
                <h3 class="font-semibold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-3">${product.description}</p>
                
                <!-- Product Benefits (Quick Win) -->
                <div class="mb-3 space-y-1">
                    ${product.benefits.slice(0, 3).map(benefit => `
                        <div class="flex items-start gap-2 text-xs text-gray-700">
                            <i class="fas fa-check-circle text-teal-600 mt-0.5 flex-shrink-0"></i>
                            <span>${benefit}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-xs bg-teal-50 text-teal-700 px-3 py-2 rounded-lg mb-3 font-medium">
                    <i class="fas fa-droplet mr-1"></i>
                    ${product.climate_tested}
                </div>
                
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-lg font-bold text-gray-800">$${product.price}</span>
                        <span class="text-sm text-gray-500 ml-1">${product.size}</span>
                    </div>
                    ${product.in_stock ? 
                        `<a href="https://pearlbeautyent.com/products/${product.shopify_handle || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" target="_blank" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block">
                            Shop Now
                        </a>` :
                        `<span class="text-coral-500 text-sm font-medium">Back in Stock Soon</span>`
                    }
                </div>
                
                <div class="mt-3 pt-3 border-t text-xs text-gray-600">
                    <span class="font-semibold text-gray-700">Works for:</span> ${product.hair_types.slice(0, 3).join(', ')} curls
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load all products for /products page
async function loadAllProducts() {
    try {
        const response = await axios.get('/api/products');
        const { products } = response.data;
        
        const container = document.getElementById('all-products');
        const countElement = document.getElementById('product-count');
        
        if (!container) return;
        
        // Update product count
        if (countElement) {
            countElement.textContent = `(${products.length})`;
        }
        
        // Show ALL products
        container.innerHTML = products.map(product => `
            <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer group">
                <div class="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg mb-4 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=&quot;fas fa-bottle-water text-teal-600 text-3xl flex items-center justify-center h-full&quot;></i>'">
                </div>
                
                <div class="flex items-center gap-1 mb-2">
                    ${generateStarRating(product.rating)}
                    <span class="text-sm text-gray-500 ml-2">(${product.reviews})</span>
                </div>
                
                <h3 class="font-semibold text-gray-800 mb-2 text-lg">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.description}</p>
                
                <!-- Product Benefits (Quick Win) -->
                <div class="mb-3 bg-gray-50 rounded-lg p-3 space-y-1.5">
                    <div class="text-xs font-semibold text-gray-700 mb-2">
                        <i class="fas fa-sparkles text-teal-600 mr-1"></i>
                        What It Does:
                    </div>
                    ${product.benefits.slice(0, 3).map(benefit => `
                        <div class="flex items-start gap-2 text-xs text-gray-700">
                            <i class="fas fa-check-circle text-teal-600 mt-0.5 flex-shrink-0"></i>
                            <span>${benefit}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mb-3">
                    <div class="text-xs bg-teal-50 text-teal-700 px-3 py-2 rounded-lg font-medium">
                        <i class="fas fa-droplet mr-1"></i>
                        ${product.climate_tested}
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="text-xl font-bold text-gray-800">$${product.price}</span>
                        <span class="text-sm text-gray-500 ml-1">${product.size}</span>
                    </div>
                    ${product.in_stock ? 
                        `<span class="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">
                            <i class="fas fa-check-circle mr-1"></i>In Stock
                        </span>` :
                        `<span class="text-xs bg-coral-100 text-coral-600 px-2 py-1 rounded font-medium">
                            <i class="fas fa-clock mr-1"></i>Restocking
                        </span>`
                    }
                </div>
                
                <a href="https://pearlbeautyent.com/products/${product.shopify_handle || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" 
                   target="_blank" 
                   class="block w-full text-center ${product.in_stock ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'} text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors">
                    ${product.in_stock ? '<i class="fas fa-shopping-cart mr-2"></i>Shop Now' : 'Notify When Available'}
                </a>
                
                <div class="mt-3 pt-3 border-t text-xs text-gray-600">
                    <div class="font-semibold text-gray-700 mb-2">
                        <i class="fas fa-user-check mr-1 text-teal-600"></i>
                        Perfect for:
                    </div>
                    <div class="flex flex-wrap gap-1">
                        ${product.hair_types.map(type => `
                            <span class="bg-teal-50 text-teal-700 px-2 py-1 rounded font-medium">${type}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading all products:', error);
        const container = document.getElementById('all-products');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-triangle text-coral-500 text-4xl mb-4"></i>
                    <p class="text-gray-600">Unable to load products. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Load bundle options
function loadBundles() {
    const bundles = [
        {
            name: 'Frizz-Control Trio',
            description: 'Beat halo-frizz and keep glossy definition in sticky weather.',
            products: ['Leave-In Conditioner', 'Curl Defining Gel', 'Moisturizing Shine Spray'],
            originalPrice: 67.97,
            salePrice: 57.77,
            savings: 15,
            ideal_for: 'High humidity, outdoor lifestyle'
        },
        {
            name: 'Hydration Wash-Day Kit', 
            description: 'Reset, rehydrate, and soften so curls start smooth and stay smooth.',
            products: ['Shampoo', 'Conditioner', 'Softening Hair Moisturizer'],
            originalPrice: 74.97,
            salePrice: 63.72,
            savings: 15,
            ideal_for: 'Dry, coarse textures'
        },
        {
            name: 'Define & Shine Set',
            description: 'Touchably defined curls with flexible hold and healthy bounce.',
            products: ['Leave-In Conditioner', 'Curl Defining Gel', 'Conditioner'],
            originalPrice: 72.97,
            salePrice: 62.02,
            savings: 15,
            ideal_for: 'All curl types, daily styling'
        }
    ];
    
    const container = document.getElementById('bundles');
    if (!container) return;
    
    container.innerHTML = bundles.map(bundle => `
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-teal-300 transition-colors">
            <div class="bg-gradient-to-br from-coral-100 to-coral-200 rounded-lg p-4 mb-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${bundle.name}</h3>
                <p class="text-sm text-gray-600">${bundle.description}</p>
            </div>
            
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-700 mb-2">Includes:</div>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${bundle.products.map(product => `
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check text-teal-600 text-xs"></i>
                            ${product}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="border-t pt-4 mb-4">
                <div class="text-xs text-gray-500 mb-1">Ideal for:</div>
                <div class="text-sm font-medium text-teal-700">${bundle.ideal_for}</div>
            </div>
            
            <div class="flex items-center justify-between mb-4">
                <div>
                    <span class="text-2xl font-bold text-gray-800">$${bundle.salePrice}</span>
                    <span class="text-sm text-gray-500 line-through ml-2">$${bundle.originalPrice}</span>
                </div>
                <span class="bg-coral-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Save ${bundle.savings}%
                </span>
            </div>
            
            <button class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Add Bundle to Cart
            </button>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star text-yellow-400 text-sm"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt text-yellow-400 text-sm"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star text-yellow-400 text-sm"></i>';
    }
    
    return starsHtml;
}

// Initialize quiz functionality
function initializeQuiz() {
    // Add click handlers for quiz buttons and links
    document.addEventListener('click', function(e) {
        const target = e.target;
        const text = target.textContent?.trim();
        
        // Check if it's a quiz trigger button or link
        if (text === 'Take the Quiz' || text === 'Find Your Routine') {
            e.preventDefault(); // Prevent default link behavior
            showQuizModal();
        }
        
        // Also check for links with href="#quiz"
        if (target.tagName === 'A' && target.getAttribute('href') === '#quiz') {
            e.preventDefault();
            showQuizModal();
        }
    });
}

// Show quiz modal
function showQuizModal() {
    // Check if modal already exists
    const existingModal = document.getElementById('quiz-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHtml = `
        <div id="quiz-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="handleModalBackdropClick(event)">
            <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Find Your Routine</h2>
                        <button onclick="closeQuizModal()" class="text-gray-400 hover:text-gray-600 transition-colors" title="Close quiz">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div id="quiz-content">
                        ${getQuizStep1()}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add ESC key listener to close modal
    document.addEventListener('keydown', handleEscapeKey);
}

// Handle backdrop click to close modal
function handleModalBackdropClick(event) {
    // Only close if clicking the backdrop (not the modal content)
    if (event.target.id === 'quiz-modal') {
        closeQuizModal();
    }
}

// Handle ESC key to close modal
function handleEscapeKey(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        const modal = document.getElementById('quiz-modal');
        if (modal) {
            closeQuizModal();
        }
    }
}

// Quiz state management
let quizAnswers = {
    texture: null,
    concern: null,
    lifestyle: null,
    location: null  // NEW: track user location for personalized advice
};

// Initialize quiz button handlers (ONLY CALLED ONCE!)
let quizNavigationInitialized = false;

function initQuizNavigation() {
    // Prevent multiple listeners - only initialize once
    if (quizNavigationInitialized) return;
    quizNavigationInitialized = true;
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quiz-option') || e.target.closest('.quiz-option')) {
            const button = e.target.classList.contains('quiz-option') ? e.target : e.target.closest('.quiz-option');
            const value = button.dataset.value;
            const content = document.getElementById('quiz-content');
            
            if (!content) return;
            
            // Determine current step and save answer
            if (content.querySelector('[data-value="wavy"]')) {
                // Step 1 - texture
                quizAnswers.texture = value;
                content.innerHTML = getQuizStep2();
            } else if (content.querySelector('[data-value="frizz"]')) {
                // Step 2 - concern
                quizAnswers.concern = value;
                content.innerHTML = getQuizStep3();
            } else if (content.querySelector('[data-value="outdoors"]')) {
                // Step 3 - lifestyle
                quizAnswers.lifestyle = value;
                content.innerHTML = getQuizStep4();
            } else if (content.querySelector('[data-value="houston"]') || content.querySelector('[data-value="caribbean"]')) {
                // Step 4 - location
                quizAnswers.location = value;
                showQuizResults();
            }
        }
    });
}

// Quiz step 1 - Hair texture
function getQuizStep1() {
    return `
        <div class="quiz-step">
            <div class="mb-6">
                <div class="text-sm text-teal-600 font-medium mb-2">Step 1 of 4</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 25%"></div>
                </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-4">What's your hair texture?</h3>
            
            <div class="space-y-3">
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="wavy">
                    <div class="font-medium">Wavy (2A-2C)</div>
                    <div class="text-sm text-gray-600">Loose waves to more defined S-patterns</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="curly">
                    <div class="font-medium">Curly (3A-3C)</div>
                    <div class="text-sm text-gray-600">Springy curls from loose to tight corkscrews</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="coily">
                    <div class="font-medium">Coily (4A-4C)</div>
                    <div class="text-sm text-gray-600">Tight coils and zigzag patterns</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="not-sure">
                    <div class="font-medium">Not sure</div>
                    <div class="text-sm text-gray-600">Help me figure it out</div>
                </button>
            </div>
        </div>
    `;
}

// Quiz step 2 - Main concern
function getQuizStep2() {
    return `
        <div class="quiz-step">
            <div class="mb-6">
                <div class="text-sm text-teal-600 font-medium mb-2">Step 2 of 4</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 50%"></div>
                </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-4">What's your main concern?</h3>
            
            <div class="space-y-3">
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="frizz">
                    <div class="font-medium">Frizz in humidity</div>
                    <div class="text-sm text-gray-600">Hair gets puffy and undefined in sticky weather</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="dryness">
                    <div class="font-medium">Dryness / moisture</div>
                    <div class="text-sm text-gray-600">Hair feels rough, brittle, or thirsty</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="definition">
                    <div class="font-medium">Definition & hold</div>
                    <div class="text-sm text-gray-600">Want curls to stay shaped and defined all day</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="shine">
                    <div class="font-medium">Shine & finish</div>
                    <div class="text-sm text-gray-600">Hair looks dull, want healthy gloss</div>
                </button>
            </div>
        </div>
    `;
}

// Quiz step 3 - Lifestyle
function getQuizStep3() {
    return `
        <div class="quiz-step">
            <div class="mb-6">
                <div class="text-sm text-teal-600 font-medium mb-2">Step 3 of 4</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 75%"></div>
                </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-4">What's your lifestyle like?</h3>
            
            <div class="space-y-3">
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="outdoors">
                    <div class="font-medium">Mostly outdoors</div>
                    <div class="text-sm text-gray-600">Beach, pool, hiking, outdoor work</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="active">
                    <div class="font-medium">Gym/sweat often</div>
                    <div class="text-sm text-gray-600">Regular workouts, active lifestyle</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="office">
                    <div class="font-medium">Air-conditioning all day</div>
                    <div class="text-sm text-gray-600">Office work, indoor environment</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="commute">
                    <div class="font-medium">City commute</div>
                    <div class="text-sm text-gray-600">Transit, walking, variable conditions</div>
                </button>
            </div>
        </div>
    `;
}

// Quiz step 4 - Location (NEW)
function getQuizStep4() {
    return `
        <div class="quiz-step">
            <div class="mb-6">
                <div class="text-sm text-teal-600 font-medium mb-2">Step 4 of 4</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 100%"></div>
                </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-4">Where do you live?</h3>
            <p class="text-sm text-gray-600 mb-4">Climate matters! We'll give you tips for your weather.</p>
            
            <div class="space-y-3">
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="houston">
                    <div class="font-medium">🌡️ Houston / Gulf Coast</div>
                    <div class="text-sm text-gray-600">Hot, humid, 80-90% humidity</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="miami">
                    <div class="font-medium">🌴 Miami / South Florida</div>
                    <div class="text-sm text-gray-600">Tropical, year-round humidity</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="atlanta">
                    <div class="font-medium">🌳 Atlanta / Southeast</div>
                    <div class="text-sm text-gray-600">Humid summers, mild winters</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="dc">
                    <div class="font-medium">🏛️ DC / Mid-Atlantic</div>
                    <div class="text-sm text-gray-600">Humid summers, cold dry winters</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="nyc">
                    <div class="font-medium">🗽 NYC / Northeast</div>
                    <div class="text-sm text-gray-600">Humid hot summers, harsh winters</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="la">
                    <div class="font-medium">☀️ LA / West Coast</div>
                    <div class="text-sm text-gray-600">Dry heat, low humidity</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="caribbean">
                    <div class="font-medium">🏝️ Caribbean / Islands</div>
                    <div class="text-sm text-gray-600">Where it all started!</div>
                </button>
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="other">
                    <div class="font-medium">📍 Somewhere else</div>
                    <div class="text-sm text-gray-600">We'll give you general tips</div>
                </button>
            </div>
        </div>
    `;
}

// Close quiz modal
function closeQuizModal() {
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.remove();
    }
    // Reset quiz answers
    quizAnswers = { texture: null, concern: null, lifestyle: null, location: null };
    
    // Remove ESC key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

// OLD showQuizResults REMOVED - Using new smart personalization version below

// OLD API-based quiz logic removed - using new client-side smart personalization

// Initialize email capture
function initializeEmailCapture() {
    // Add submit handler for email forms
    document.addEventListener('submit', function(e) {
        if (e.target.querySelector('input[type="email"]')) {
            e.preventDefault();
            handleEmailSubmit(e.target);
        }
    });
    
    // Add click handler for email buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Get Guide') {
            e.preventDefault();
            const email = e.target.parentElement.querySelector('input[type="email"]').value;
            if (email) {
                handleEmailCapture(email);
            }
        }
    });
}

function handleEmailCapture(email) {
    // Simulate email capture
    console.log('Email captured:', email);
    
    // Show success message
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Success! ✓';
    button.style.backgroundColor = '#10B981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

// Product Page Tab Functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-tab')) {
        e.preventDefault();
        
        // Remove active state from all tabs
        document.querySelectorAll('.product-tab').forEach(tab => {
            tab.classList.remove('active', 'border-teal-600', 'text-teal-600');
            tab.classList.add('border-transparent', 'text-gray-500');
        });
        
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Activate clicked tab
        e.target.classList.add('active', 'border-teal-600', 'text-teal-600');
        e.target.classList.remove('border-transparent', 'text-gray-500');
        
        // Show corresponding content
        const tabId = e.target.dataset.tab;
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.remove('hidden');
        }
    }
});

// FAQ Accordion Functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-item button')) {
        e.preventDefault();
        
        const button = e.target.closest('.faq-item button');
        const faqItem = button.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = button.querySelector('i');
        
        // Toggle answer visibility
        answer.classList.toggle('hidden');
        
        // Toggle icon rotation
        if (answer.classList.contains('hidden')) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }
});

// Size selector functionality
document.addEventListener('change', function(e) {
    if (e.target.tagName === 'SELECT' && e.target.closest('select')) {
        const selectedOption = e.target.value;
        const priceMatch = selectedOption.match(/\$(\d+\.\d+)/);
        
        if (priceMatch) {
            const price = priceMatch[1];
            
            // Update main price display
            const priceDisplays = document.querySelectorAll('.text-3xl.font-bold');
            priceDisplays.forEach(display => {
                if (display.textContent.includes('$')) {
                    display.textContent = `$${price}`;
                }
            });
            
            // Update add to cart button
            const addToCartBtn = document.querySelector('button[class*="Add to Cart"]');
            if (addToCartBtn && addToCartBtn.textContent.includes('Add to Cart')) {
                addToCartBtn.textContent = `Add to Cart - $${price}`;
            }
            
            // Update sticky cart (mobile)
            const stickyPrice = document.querySelector('.fixed .font-semibold');
            if (stickyPrice && stickyPrice.textContent.includes('$')) {
                stickyPrice.textContent = `$${price}`;
            }
        }
    }
});

// Image gallery functionality (placeholder for when real images are added)
document.addEventListener('click', function(e) {
    if (e.target.closest('.grid.grid-cols-4 > div')) {
        const thumbnail = e.target.closest('div');
        const mainImage = document.querySelector('.aspect-square.bg-gradient-to-br.from-teal-100');
        
        // Visual feedback for selected thumbnail
        document.querySelectorAll('.grid.grid-cols-4 > div').forEach(thumb => {
            thumb.classList.remove('border-2', 'border-teal-600');
        });
        
        thumbnail.classList.add('border-2', 'border-teal-600');
        
        // In a real implementation, you'd update the main image src here
        console.log('Image gallery: thumbnail clicked');
    }
});

// Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent?.includes('Add to Cart') || 
        e.target.textContent?.includes('Add Bundle')) {
        
        e.preventDefault();
        
        // Get product details
        const productName = document.querySelector('h1')?.textContent || 'Product';
        const price = document.querySelector('.text-3xl.font-bold')?.textContent || '$0.00';
        const size = document.querySelector('select')?.value || 'Standard';
        
        // Visual feedback
        const button = e.target;
        const originalText = button.textContent;
        button.textContent = 'Added! ✓';
        button.style.backgroundColor = '#10B981';
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
        
        // Track event
        trackEvent('add_to_cart', {
            item_name: productName,
            price: price.replace('$', ''),
            size: size
        });
        
        console.log('Added to cart:', { productName, price, size });
    }
});

// Wishlist functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent?.includes('Save for Later')) {
        e.preventDefault();
        
        const button = e.target;
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('fa-heart')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('bg-coral-50', 'border-coral-500', 'text-coral-600');
            button.textContent = '♥ Saved';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('bg-coral-50', 'border-coral-500', 'text-coral-600');
            button.innerHTML = '<i class="fas fa-heart mr-2"></i>Save for Later';
        }
        
        trackEvent('add_to_wishlist', {
            item_name: document.querySelector('h1')?.textContent || 'Product'
        });
    }
});

// Share functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent?.includes('Share')) {
        e.preventDefault();
        
        if (navigator.share) {
            navigator.share({
                title: document.querySelector('h1')?.textContent || 'Check out this product',
                text: 'Island-proof curl care from Caribbean Players',
                url: window.location.href
            });
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                const button = e.target;
                const originalText = button.textContent;
                button.textContent = 'Link Copied!';
                
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        }
    }
});

// Product bundle functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent?.includes('Add to Bundle')) {
        e.preventDefault();
        
        const productCard = e.target.closest('.bg-white');
        const productName = productCard.querySelector('h4')?.textContent || 'Product';
        
        // Visual feedback
        e.target.textContent = 'Added ✓';
        e.target.style.color = '#10B981';
        
        setTimeout(() => {
            e.target.textContent = 'Add to Bundle';
            e.target.style.color = '';
        }, 2000);
        
        console.log('Added to bundle:', productName);
    }
});

// Smooth scrolling for product page navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Utility functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function trackEvent(eventName, data) {
    // GA4 event tracking placeholder
    console.log('Event tracked:', eventName, data);
    
    // In production, this would send to Google Analytics 4
    // gtag('event', eventName, data);
}// Smart personalization functions for Pearl Beauty Quiz

// Show quiz results with smart personalization
function showQuizResults() {
    const content = document.getElementById('quiz-content');
    if (!content) return;
    
    // Get personalized routine based on answers
    const routine = getPersonalizedRoutine(quizAnswers);
    const advice = getLocationAdvice(quizAnswers);
    const testimonial = getRelevantTestimonial(quizAnswers);
    
    content.innerHTML = `
        <div class="quiz-results text-center">
            <div class="mb-6">
                <i class="fas fa-check-circle text-teal-600 text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${routine.title}</h3>
                <p class="text-gray-600">${routine.subtitle}</p>
            </div>
            
            <div id="routine-result" class="mb-6 text-left">
                <div class="space-y-3">
                    ${routine.products.map((product, index) => `
                        <div class="p-4 bg-white border-2 border-teal-100 rounded-lg hover:border-teal-300 transition-colors">
                            <div class="flex items-start gap-3">
                                <div class="flex-shrink-0">
                                    <span class="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">${index + 1}</span>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-gray-800 mb-1">${product.name}</h4>
                                    <p class="text-sm text-gray-600 mb-2">${product.benefit}</p>
                                    <div class="flex items-center gap-2 text-xs text-teal-700">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${product.why}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Location-specific advice -->
                <div class="mt-4 p-4 bg-gradient-to-br from-coral-50 to-orange-50 rounded-lg border-l-4 border-coral-500">
                    <div class="flex items-start gap-3">
                        <i class="fas fa-lightbulb text-coral-600 text-xl mt-1"></i>
                        <div>
                            <div class="text-sm font-bold text-coral-800 mb-1">${advice.title}</div>
                            <div class="text-sm text-gray-700">${advice.tip}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Social proof testimonial -->
                <div class="mt-4 p-4 bg-teal-50 rounded-lg">
                    <div class="flex items-center gap-1 mb-2">
                        ${Array(5).fill('<i class="fas fa-star text-yellow-400 text-xs"></i>').join('')}
                    </div>
                    <p class="text-sm text-gray-700 italic mb-2">"${testimonial.quote}"</p>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            ${testimonial.initial}
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-800">${testimonial.name}</p>
                            <p class="text-xs text-gray-500">${testimonial.location}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Savings callout -->
                <div class="mt-4 p-4 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-lg shadow-md">
                    <div class="text-center">
                        <div class="text-2xl font-bold mb-1">$${routine.bundlePrice}</div>
                        <div class="text-sm opacity-90 line-through mb-2">Regular: $${routine.regularPrice}</div>
                        <div class="flex items-center justify-center gap-2">
                            <i class="fas fa-tag"></i>
                            <span class="font-semibold">Save $${(routine.regularPrice - routine.bundlePrice).toFixed(2)} (15% OFF)</span>
                        </div>
                        <div class="text-xs mt-2 opacity-90">🚚 FREE shipping on orders $50+</div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-3">
                <a href="https://pearlbeautyent.com/collections/bundles" target="_blank" class="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block">
                    <i class="fas fa-shopping-cart mr-2"></i>Get This Routine Now
                </a>
                <button onclick="closeQuizModal()" class="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors">
                    Browse All Products
                </button>
            </div>
        </div>
    `;
}

// Smart routine builder based on hair texture + concern + lifestyle
function getPersonalizedRoutine(answers) {
    const { texture, concern, lifestyle } = answers;
    
    // Base routine structure
    let products = [];
    let title = '';
    let subtitle = '';
    let regularPrice = 0;
    let bundlePrice = 0;
    
    // Personalize based on texture + concern combination
    if (texture === 'wavy') {
        // Wavy hair needs lightweight products
        if (concern === 'frizz') {
            title = 'Your Lightweight Frizz-Control Routine';
            subtitle = 'Designed for wavy hair that needs definition without weight';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Lightweight moisture prep', why: 'Won\'t weigh down your waves' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Flexible hold for soft waves', why: 'Defines without stiffness' },
                { name: 'Caribbean Players Shine Spray', benefit: 'Adds gloss and fights humidity', why: 'Perfect finishing touch' }
            ];
            regularPrice = 67.97;
            bundlePrice = 57.77;
        } else if (concern === 'dryness') {
            title = 'Your Hydration-Boost Routine';
            subtitle = 'Moisture for wavy hair without losing volume';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Deep hydration base layer', why: 'Penetrates without heaviness' },
                { name: 'Caribbean Players Softening Hair Moisturizer', benefit: 'Seals in moisture', why: 'Softens rough texture' },
                { name: 'Caribbean Players Shine Spray', benefit: 'Locks in hydration + shine', why: 'Prevents moisture loss' }
            ];
            regularPrice = 69.97;
            bundlePrice = 59.47;
        } else {
            title = 'Your Wave-Enhancing Routine';
            subtitle = 'Definition and hold for beautiful beachy waves';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Prep and protect', why: 'Creates smooth base' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Enhances natural wave pattern', why: 'Lightweight definition' },
                { name: 'Caribbean Players Shine Spray', benefit: 'Adds healthy gloss', why: 'Finishing perfection' }
            ];
            regularPrice = 67.97;
            bundlePrice = 57.77;
        }
    } else if (texture === 'curly') {
        // Curly hair (3A-3C) needs balanced moisture + definition
        if (concern === 'frizz') {
            title = 'Your Humidity-Proof Curl Routine';
            subtitle = 'Tested for 3A-3C curls in extreme humidity';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Creates humidity barrier', why: 'Stops frizz before it starts' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Strong hold without crunch', why: 'Locks curls in place all day' },
                { name: 'Caribbean Players Shine Spray', benefit: 'Seals cuticle + adds gloss', why: 'Final frizz defense' }
            ];
            regularPrice = 67.97;
            bundlePrice = 57.77;
        } else if (concern === 'dryness') {
            title = 'Your Deep Moisture Curl Routine';
            subtitle = 'Quench thirsty 3A-3C curls';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Intense hydration', why: 'Penetrates curl structure' },
                { name: 'Caribbean Players Softening Hair Moisturizer', benefit: 'Rich moisture seal', why: 'Softens + defines together' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Holds moisture in', why: 'Locks in hydration' }
            ];
            regularPrice = 74.97;
            bundlePrice = 63.72;
        } else if (concern === 'definition') {
            title = 'Your Maximum Definition Routine';
            subtitle = 'Poppin\' curls that last all day';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Smooth curl foundation', why: 'Preps for definition' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Strong curl definition', why: 'Shapes and holds pattern' },
                { name: 'Caribbean Players Shine Spray', benefit: 'Glossy finish', why: 'Makes curls pop' }
            ];
            regularPrice = 67.97;
            bundlePrice = 57.77;
        } else {
            title = 'Your Shine & Definition Routine';
            subtitle = 'Healthy-looking 3A-3C curls with gloss';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Moisture prep', why: 'Adds shine foundation' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Definition + hold', why: 'Keeps curls formed' },
                { name: 'Caribbean Players Shine Spray', benefit: 'High-gloss finish', why: 'Healthy shine without grease' }
            ];
            regularPrice = 67.97;
            bundlePrice = 57.77;
        }
    } else if (texture === 'coily') {
        // Coily hair (4A-4C) needs maximum moisture
        if (concern === 'dryness') {
            title = 'Your Maximum Moisture Routine';
            subtitle = 'Deep hydration for 4A-4C coils';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Moisture foundation', why: 'Penetrates tight coils' },
                { name: 'Caribbean Players Softening Hair Moisturizer', benefit: 'Rich moisture seal', why: 'Softens and hydrates deep' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Defines + locks moisture', why: 'Holds hydration in' }
            ];
            regularPrice = 74.97;
            bundlePrice = 63.72;
        } else if (concern === 'definition') {
            title = 'Your Coil Definition Routine';
            subtitle = 'Defined, moisturized 4A-4C coils';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Hydrating prep', why: 'Softens before styling' },
                { name: 'Caribbean Players Softening Hair Moisturizer', benefit: 'Elongates coils', why: 'Adds slip for definition' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Strong coil definition', why: 'Holds pattern all day' }
            ];
            regularPrice = 74.97;
            bundlePrice = 63.72;
        } else {
            title = 'Your Coil Care Routine';
            subtitle = 'Soft, defined, moisturized 4A-4C coils';
            products = [
                { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Deep moisture base', why: 'Hydrates from within' },
                { name: 'Caribbean Players Softening Hair Moisturizer', benefit: 'Softens coarse texture', why: 'Makes styling easier' },
                { name: 'Caribbean Players Curl Defining Gel', benefit: 'Definition without crunch', why: 'Holds coils beautifully' }
            ];
            regularPrice = 74.97;
            bundlePrice = 63.72;
        }
    } else {
        // Not sure / default routine
        title = 'Your Personalized Curl Routine';
        subtitle = 'A great starting point for any curl type';
        products = [
            { name: 'Caribbean Players Leave-In Conditioner', benefit: 'Moisture prep and protection', why: 'Works for all curl types' },
            { name: 'Caribbean Players Curl Defining Gel', benefit: 'Define and hold', why: 'Flexible for any texture' },
            { name: 'Caribbean Players Shine Spray', benefit: 'Finishing shine', why: 'Perfect last step' }
        ];
        regularPrice = 67.97;
        bundlePrice = 57.77;
    }
    
    return { products, title, subtitle, regularPrice, bundlePrice };
}

// Location-based haircare advice
function getLocationAdvice(answers) {
    const { location, lifestyle, concern } = answers;
    
    const adviceMap = {
        'houston': {
            title: '🌡️ Houston Climate Tips',
            tip: 'With 80-90% humidity year-round, apply products to soaking wet hair. Air dry when possible—diffusing in Houston heat can cause more frizz. Refresh mid-day with shine spray.'
        },
        'miami': {
            title: '🌴 Miami Climate Tips',
            tip: 'Tropical humidity + salt air = extra moisture needed. Layer products heavier than you think. Protect hair at beach with leave-in conditioner before swimming. Rinse salt water ASAP.'
        },
        'atlanta': {
            title: '🌳 Atlanta Climate Tips',
            tip: 'Summer humidity rivals the tropics, but winter is drier. Switch to lighter products in winter to avoid buildup. Use humidity-proof gel May-September, lighter cream rest of year.'
        },
        'dc': {
            title: '🏛️ DC Climate Tips',
            tip: 'Humid summers, brutally dry winters. Summer: full routine as recommended. Winter: skip gel, add extra moisturizer. Indoor heating dries curls fast—refresh with leave-in spray.'
        },
        'nyc': {
            title: '🗽 NYC Climate Tips',
            tip: 'Humidity swings are extreme. Summer subway steam = frizz city. Use strongest hold gel June-August. Winter wind + heating = dry curls. Add hair oil in cold months.'
        },
        'la': {
            title: '☀️ LA Climate Tips',
            tip: 'Low humidity means you can use lighter products! Focus on moisture over frizz control. Sun exposure is your enemy—use products with UV protection. Drink more water for hair health.'
        },
        'caribbean': {
            title: '🏝️ Caribbean Climate Tips',
            tip: 'You know the drill! These products were MADE for island weather. High humidity + heat = needs strong hold. Protect from salt water and sun. Refresh often, especially after beach days.'
        },
        'other': {
            title: '📍 General Climate Tips',
            tip: 'High humidity areas: use full routine as recommended. Dry climates: focus more on moisturizer, less on gel. Always adjust based on YOUR environment—your hair will tell you what it needs.'
        }
    };
    
    return adviceMap[location] || adviceMap['other'];
}

// Get relevant testimonial based on quiz answers
function getRelevantTestimonial(answers) {
    const { location, texture, concern } = answers;
    
    const testimonials = {
        'houston': { quote: 'Finally found products that handle Houston humidity! My 3C curls stay defined all day, even in 90% humidity.', name: 'Tamika J.', location: 'Houston, TX', initial: 'T' },
        'miami': { quote: 'Miami heat used to destroy my curls by noon. Not anymore! This routine is legit.', name: 'Sofia R.', location: 'Miami, FL', initial: 'S' },
        'atlanta': { quote: 'Atlanta summers are brutal, but my curls stay poppin\' with this routine. No crunch, just definition!', name: 'Jasmine W.', location: 'Atlanta, GA', initial: 'J' },
        'dc': { quote: 'DC humidity doesn\'t stand a chance! Love that these products work year-round.', name: 'Aisha M.', location: 'Washington, DC', initial: 'A' },
        'nyc': { quote: 'NYC subway humidity used to wreck my hair. This gel holds through EVERYTHING.', name: 'Brooklyn T.', location: 'Brooklyn, NY', initial: 'B' },
        'la': { quote: 'Even in dry LA, my curls need moisture. This routine gives me soft, defined curls without the weight.', name: 'Maya L.', location: 'Los Angeles, CA', initial: 'M' },
        'caribbean': { quote: 'Born and raised in Trinidad. These products KNOW Caribbean weather. Finally, something that works for us!', name: 'Kesia A.', location: 'Port of Spain, Trinidad', initial: 'K' },
    };
    
    // Return location-specific testimonial or default
    return testimonials[location] || {
        quote: 'I\'ve tried everything for my curls. This routine finally delivered—no crunch, just beautiful definition!',
        name: 'Michelle D.',
        location: 'Verified Customer',
        initial: 'M'
    };
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    // Hide sections initially
    const beforeAfterSection = document.getElementById('before-after');
    const ingredientsSection = document.getElementById('ingredients');
    
    if (beforeAfterSection) {
        beforeAfterSection.style.display = 'none';
        beforeAfterSection.dataset.collapsed = 'true';
    }
    
    if (ingredientsSection) {
        ingredientsSection.style.display = 'none';
        ingredientsSection.dataset.collapsed = 'true';
    }
}

// Toggle section visibility with smooth animation
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const isCollapsed = section.dataset.collapsed === 'true';
    
    if (isCollapsed) {
        // Show section
        section.style.display = 'block';
        section.dataset.collapsed = 'false';
        
        // Smooth scroll to section
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        // Update button text
        updateToggleButtonText(sectionId, false);
    } else {
        // Hide section
        section.style.display = 'none';
        section.dataset.collapsed = 'true';
        
        // Update button text
        updateToggleButtonText(sectionId, true);
        
        // Scroll to the button that triggered this
        scrollToTriggerButton(sectionId);
    }
}

// Update button text based on section state
function updateToggleButtonText(sectionId, isCollapsed) {
    const buttons = document.querySelectorAll(`a[href="#${sectionId}"]`);
    
    buttons.forEach(button => {
        if (sectionId === 'before-after') {
            button.innerHTML = isCollapsed ? 
                'View Before & After' : 
                '<i class="fas fa-chevron-up mr-2"></i>Hide Before & After';
        } else if (sectionId === 'ingredients') {
            button.innerHTML = isCollapsed ? 
                'Learn Why It Works' : 
                '<i class="fas fa-chevron-up mr-2"></i>Hide Ingredients';
        }
    });
}

// Scroll to the button that triggered the section
function scrollToTriggerButton(sectionId) {
    // Find the section before the collapsible section
    let targetElement;
    
    if (sectionId === 'before-after') {
        // Scroll to UGC section (the one with the button)
        const ugcSection = document.querySelector('section:has(a[href="#before-after"])');
        if (ugcSection) targetElement = ugcSection;
    } else if (sectionId === 'ingredients') {
        // Scroll to ingredient story section
        const storySection = document.querySelector('section:has(a[href="#ingredients"])');
        if (storySection) targetElement = storySection;
    }
    
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Cookie Consent Banner Management
function initializeCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const rejectBtn = document.getElementById('cookie-reject-btn');
    const settingsBtn = document.getElementById('cookie-settings-btn');
    
    if (!banner) return;
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    
    if (!cookieConsent) {
        // Show banner if no consent recorded
        banner.classList.remove('hidden');
    }
    
    // Accept All button
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            setCookieConsent('accepted');
            banner.classList.add('hidden');
            console.log('✅ Cookies accepted');
        });
    }
    
    // Reject button
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            setCookieConsent('rejected');
            banner.classList.add('hidden');
            console.log('❌ Cookies rejected');
        });
    }
    
    // Privacy Settings button - Opens modal
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            openCookieModal();
        });
    }
    
    // Footer Cookie Settings button - Opens modal directly
    const footerCookieBtn = document.getElementById('footer-cookie-settings');
    if (footerCookieBtn) {
        footerCookieBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCookieModal();
            console.log('🍪 Cookie settings opened from footer');
        });
    }
    
    // Alternative footer cookie settings button (in Legal section)
    const footerCookieBtnAlt = document.getElementById('footer-cookie-settings-alt');
    if (footerCookieBtnAlt) {
        footerCookieBtnAlt.addEventListener('click', function(e) {
            e.preventDefault();
            openCookieModal();
            console.log('🍪 Cookie settings opened from footer (alt)');
        });
    }
    
    // Initialize Cookie Preference Center Modal
    initializeCookieModal();
}

// Open Cookie Preference Center Modal
function openCookieModal() {
    const modal = document.getElementById('cookie-modal');
    const banner = document.getElementById('cookie-banner');
    
    if (!modal) return;
    
    // Hide banner if showing
    if (banner) {
        banner.classList.add('hidden');
    }
    
    // Load current preferences and update toggle states
    loadCookiePreferencesToModal();
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log('🍪 Cookie preference modal opened');
}

// Close Cookie Preference Center Modal
function closeCookieModal() {
    const modal = document.getElementById('cookie-modal');
    const banner = document.getElementById('cookie-banner');
    
    if (!modal) return;
    
    // Hide modal
    modal.classList.add('hidden');
    modal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Check if user has made a choice - if not, show banner again
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent && banner) {
        banner.classList.remove('hidden');
        console.log('🍪 Cookie preference modal closed - banner shown (no consent recorded)');
    } else {
        console.log('🍪 Cookie preference modal closed - consent already recorded');
    }
}

// Load current preferences into modal toggles
function loadCookiePreferencesToModal() {
    const preferencesStr = localStorage.getItem('cookie-preferences');
    
    // Default preferences if none exist
    let preferences = {
        necessary: true,
        functional: false,
        performance: false,
        targeting: false
    };
    
    // Load saved preferences
    if (preferencesStr) {
        try {
            preferences = JSON.parse(preferencesStr);
        } catch (e) {
            console.error('Failed to parse cookie preferences:', e);
        }
    }
    
    // Update toggle states
    document.getElementById('cookie-functional').checked = preferences.functional;
    document.getElementById('cookie-performance').checked = preferences.performance;
    document.getElementById('cookie-targeting').checked = preferences.targeting;
    
    console.log('📋 Loaded preferences into modal:', preferences);
}

// Save custom cookie preferences from modal
function saveCustomCookiePreferences() {
    const preferences = {
        necessary: true, // Always true
        functional: document.getElementById('cookie-functional').checked,
        performance: document.getElementById('cookie-performance').checked,
        targeting: document.getElementById('cookie-targeting').checked
    };
    
    // Save preferences
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    console.log('✅ Custom cookie preferences saved:', preferences);
    
    return preferences;
}

// Initialize Cookie Preference Center Modal
function initializeCookieModal() {
    const modal = document.getElementById('cookie-modal');
    if (!modal) return;
    
    // Close button
    const closeBtn = document.getElementById('cookie-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCookieModal);
    }
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCookieModal();
        }
    });
    
    // Reject All button
    const rejectAllBtn = document.getElementById('cookie-modal-reject-all');
    if (rejectAllBtn) {
        rejectAllBtn.addEventListener('click', function() {
            // Uncheck all optional toggles
            document.getElementById('cookie-functional').checked = false;
            document.getElementById('cookie-performance').checked = false;
            document.getElementById('cookie-targeting').checked = false;
            
            // Save rejection
            setCookieConsent('rejected');
            
            // Close modal
            closeCookieModal();
            
            console.log('❌ All cookies rejected from modal');
        });
    }
    
    // Accept All button
    const acceptAllBtn = document.getElementById('cookie-modal-accept-all');
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function() {
            // Check all optional toggles
            document.getElementById('cookie-functional').checked = true;
            document.getElementById('cookie-performance').checked = true;
            document.getElementById('cookie-targeting').checked = true;
            
            // Save acceptance
            setCookieConsent('accepted');
            
            // Close modal
            closeCookieModal();
            
            console.log('✅ All cookies accepted from modal');
        });
    }
    
    // Confirm My Choices button
    const confirmBtn = document.getElementById('cookie-modal-confirm');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            // Save custom preferences
            const preferences = saveCustomCookiePreferences();
            
            // Close modal
            closeCookieModal();
            
            console.log('🎯 Custom cookie choices confirmed:', preferences);
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeCookieModal();
        }
    });
}

// Save cookie consent preference
function setCookieConsent(consent) {
    localStorage.setItem('cookie-consent', consent);
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Store default preferences
    const preferences = {
        necessary: true, // Always true
        functional: consent === 'accepted',
        targeting: consent === 'accepted',
        performance: consent === 'accepted'
    };
    
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
}

// Get cookie consent status
function getCookieConsent() {
    return localStorage.getItem('cookie-consent');
}

// Check if specific cookie category is allowed
function isCookieAllowed(category) {
    const preferences = localStorage.getItem('cookie-preferences');
    if (!preferences) return false;
    
    try {
        const prefs = JSON.parse(preferences);
        return prefs[category] === true;
    } catch (e) {
        return false;
    }
}
