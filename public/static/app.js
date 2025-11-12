// Pearl Beauty Frontend JavaScript
// Handles product loading, quiz functionality, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pearl Beauty app loaded 🌴');
    
    // Load products on homepage
    loadBestSellers();
    loadBundles();
    
    // Initialize interactive elements
    initializeQuiz();
    initializeEmailCapture();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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
                
                <div class="text-xs text-teal-600 font-medium mb-3">
                    <i class="fas fa-shield-alt mr-1"></i>
                    Humidity help: keeps definition without crunch
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
                
                <div class="mt-3 text-xs text-gray-500">
                    Perfect for: ${product.hair_types.join(', ')} curls
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading products:', error);
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
    // Add click handlers for quiz buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Take the Quiz' || e.target.textContent === 'Find Your Routine') {
            showQuizModal();
        }
    });
}

// Show quiz modal
function showQuizModal() {
    // Create modal HTML
    const modalHtml = `
        <div id="quiz-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Find Your Routine</h2>
                        <button onclick="closeQuizModal()" class="text-gray-400 hover:text-gray-600">
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
}

// Quiz step 1 - Hair texture
function getQuizStep1() {
    return `
        <div class="quiz-step">
            <div class="mb-6">
                <div class="text-sm text-teal-600 font-medium mb-2">Step 1 of 3</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 33%"></div>
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
                <div class="text-sm text-teal-600 font-medium mb-2">Step 2 of 3</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 67%"></div>
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
                <div class="text-sm text-teal-600 font-medium mb-2">Step 3 of 3</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: 100%"></div>
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
                
                <button class="quiz-option w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-teal-300 transition-colors" data-value="high-humidity">
                    <div class="font-medium">Tropical / high humidity</div>
                    <div class="text-sm text-gray-600">Miami, Houston, New Orleans, or similar</div>
                </button>
            </div>
        </div>
    `;
}

// Quiz results
function showQuizResults(texture, concern, lifestyle) {
    return `
        <div class="quiz-results text-center">
            <div class="mb-6">
                <i class="fas fa-check-circle text-teal-600 text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Your Island-Proof Routine</h3>
                <p class="text-gray-600">Personalized for ${texture} hair with ${concern} concerns</p>
            </div>
            
            <div id="routine-result" class="mb-6">
                <!-- Will be populated by API call -->
            </div>
            
            <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Add Bundle & Save 15%
                </button>
                <button onclick="closeQuizModal()" class="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors">
                    Browse Products
                </button>
            </div>
        </div>
    `;
}

// Handle quiz navigation
let quizData = {};

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quiz-option')) {
        e.preventDefault();
        const value = e.target.dataset.value;
        const step = getCurrentQuizStep();
        
        // Store answer
        if (step === 1) {
            quizData.texture = value;
            document.getElementById('quiz-content').innerHTML = getQuizStep2();
        } else if (step === 2) {
            quizData.concern = value;
            document.getElementById('quiz-content').innerHTML = getQuizStep3();
        } else if (step === 3) {
            quizData.lifestyle = value;
            showQuizResultsFromAPI();
        }
    }
});

function getCurrentQuizStep() {
    const stepText = document.querySelector('.quiz-step .text-teal-600')?.textContent;
    if (stepText?.includes('Step 1')) return 1;
    if (stepText?.includes('Step 2')) return 2;
    if (stepText?.includes('Step 3')) return 3;
    return 1;
}

async function showQuizResultsFromAPI() {
    try {
        const response = await axios.get(`/api/quiz-results?texture=${quizData.texture}&concern=${quizData.concern}&lifestyle=${quizData.lifestyle}`);
        const result = response.data;
        
        document.getElementById('quiz-content').innerHTML = `
            <div class="quiz-results text-center">
                <div class="mb-6">
                    <i class="fas fa-check-circle text-teal-600 text-4xl mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Your Island-Proof Routine</h3>
                    <p class="text-gray-600">Personalized for ${result.texture} hair</p>
                </div>
                
                <div class="bg-teal-50 rounded-lg p-4 mb-6 text-left">
                    <h4 class="font-semibold text-teal-800 mb-3">${result.bundleName}</h4>
                    <div class="space-y-2">
                        ${result.routine.map(step => `
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    ${step.step}
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium text-gray-800">${step.action}</div>
                                    <div class="text-sm text-gray-600">${step.product}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${result.climate_tip ? `
                        <div class="mt-4 p-3 bg-coral-100 rounded border-l-4 border-coral-500">
                            <div class="text-sm font-medium text-coral-800">💡 Climate Tip:</div>
                            <div class="text-sm text-coral-700">${result.climate_tip}</div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="flex flex-col sm:flex-row gap-3">
                    <button class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-colors">
                        Add Bundle & Save ${result.savingsPercent}%
                    </button>
                    <button onclick="closeQuizModal()" class="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors">
                        Browse Products
                    </button>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error getting quiz results:', error);
    }
}

// Close quiz modal
window.closeQuizModal = function() {
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.remove();
    }
    quizData = {}; // Reset quiz data
}

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
}