import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public directory  
app.use('/static/*', serveStatic({ root: './public' }))

// Use the renderer middleware
app.use(renderer)

// API Routes
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Pearl Beauty API!' })
})

app.get('/api/products', (c) => {
  // Mock product data based on current Pearl Beauty lineup
  return c.json({
    products: [
      {
        id: 1,
        name: 'Caribbean Players Curl Defining Gel',
        price: 8.95,
        size: '8oz',
        description: 'Lightweight, clear gel that defines curls and locks shape—without crunch or flakes.',
        benefits: [
          'Shapes curls and coils for all-day definition',
          'Controls halo-frizz without stiff, crunchy cast', 
          'Adds soft, healthy shine that lasts'
        ],
        climate_tested: 'Tested in Caribbean humidity - up to 90% RH',
        hair_types: ['2C', '3A', '3B', '3C', '4A'],
        rating: 4.7,
        reviews: 127,
        in_stock: true,
        image: '/static/images/products/curl-gel-main.webp',
        shopify_handle: 'caribbean-players-curl-defining-gel'
      },
      {
        id: 2,
        name: 'Caribbean Players Leave-In Conditioner',
        price: 10.95,
        size: '8oz',
        description: 'Moisture-locking conditioner that preps curls for humidity while adding slip and protection.',
        benefits: [
          'Deep moisture without heaviness',
          'Protects against heat styling damage',
          'Detangles and adds slip for easy styling'
        ],
        climate_tested: 'Island-tested for tropical climates',
        hair_types: ['2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B'],
        rating: 4.8,
        reviews: 203,
        in_stock: true,
        image: '/static/images/products/leave-in-main.webp',
        shopify_handle: 'caribbean-players-leave-in-conditioner'
      },
      {
        id: 3,
        name: 'Caribbean Players Softening Hair Moisturizer',
        price: 8.95,
        size: '8oz', 
        description: 'Rich moisturizer that softens coarse textures while maintaining curl pattern integrity.',
        benefits: [
          'Softens without weighing down curls',
          'Seals cuticles to lock out humidity',
          'Natural oils blend for lasting hydration'
        ],
        climate_tested: 'Proven in high humidity environments',
        hair_types: ['3B', '3C', '4A', '4B', '4C'],
        rating: 4.6,
        reviews: 89,
        in_stock: true,
        image: '/static/images/products/moisturizer-main.webp',
        shopify_handle: 'caribbean-players-softening-hair-moisturizer'
      },
      {
        id: 4,
        name: 'Caribbean Players Moisturizing Shine Spray',
        price: 8.95,
        size: '6oz',
        description: 'Lightweight finishing spray that adds brilliant shine without grease or buildup.',
        benefits: [
          'Instant shine boost',
          'Refreshes day-old curls',
          'UV protection for color-treated hair'
        ],
        climate_tested: 'Won\'t attract humidity like traditional oils',
        hair_types: ['2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'],
        rating: 4.5,
        reviews: 156,
        in_stock: false, // Example of sold out handling
        image: '/static/images/products/shine-spray-main.webp',
        shopify_handle: 'caribbean-players-moisturizing-shine-spray'
      },
      {
        id: 5,
        name: 'Caribbean Players Shampoo',
        price: 8.95,
        size: '8oz',
        description: 'Gentle sulfate-free shampoo that cleanses without stripping natural oils or disrupting curl pattern.',
        benefits: [
          'Sulfate-free formula protects natural moisture',
          'Caribbean botanicals nourish scalp and hair',
          'pH-balanced for all curl types'
        ],
        climate_tested: 'Formulated for humid tropical climates',
        hair_types: ['2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'],
        rating: 4.7,
        reviews: 142,
        in_stock: true,
        image: '/static/images/products/shampoo-main.webp',
        shopify_handle: 'caribbean-players-shampoo'
      },
      {
        id: 6,
        name: 'Caribbean Players Conditioner',
        price: 8.95,
        size: '8oz',
        description: 'Rich, moisturizing conditioner that detangles and softens while preparing curls for styling.',
        benefits: [
          'Deep conditioning without buildup',
          'Detangles and adds slip for easy styling',
          'Strengthens hair with natural proteins'
        ],
        climate_tested: 'Locks in moisture in high humidity',
        hair_types: ['2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'],
        rating: 4.8,
        reviews: 168,
        in_stock: true,
        image: '/static/images/products/conditioner-main.webp',
        shopify_handle: 'caribbean-players-conditioner'
      }
    ]
  })
})

app.get('/api/quiz-results', (c) => {
  const texture = c.req.query('texture')
  const concern = c.req.query('concern')
  const lifestyle = c.req.query('lifestyle')

  // Dynamic routine builder based on quiz responses
  let routine = []
  let bundleName = ''
  
  if (concern === 'frizz') {
    routine = [
      { step: 1, product: 'Caribbean Players Shampoo', action: 'Cleanse' },
      { step: 2, product: 'Caribbean Players Leave-In Conditioner', action: 'Prep & Protect' },
      { step: 3, product: 'Caribbean Players Curl Defining Gel', action: 'Define & Hold' }
    ]
    bundleName = 'Frizz-Control Trio'
  } else if (concern === 'dryness') {
    routine = [
      { step: 1, product: 'Caribbean Players Shampoo', action: 'Gentle Cleanse' },
      { step: 2, product: 'Caribbean Players Conditioner', action: 'Deep Condition' },
      { step: 3, product: 'Caribbean Players Softening Hair Moisturizer', action: 'Seal & Soften' }
    ]
    bundleName = 'Hydration Wash-Day Kit'
  } else {
    routine = [
      { step: 1, product: 'Caribbean Players Leave-In Conditioner', action: 'Prep' },
      { step: 2, product: 'Caribbean Players Curl Defining Gel', action: 'Define' },
      { step: 3, product: 'Caribbean Players Moisturizing Shine Spray', action: 'Finish' }
    ]
    bundleName = 'Define & Shine Set'
  }

  return c.json({
    texture,
    concern,
    lifestyle,
    routine,
    bundleName,
    savingsPercent: 15,
    climate_tip: lifestyle === 'high-humidity' ? 
      'In high humidity, apply products to soaking wet hair and air dry when possible.' :
      'Layer lightweight products for flexible hold without heaviness.'
  })
})

// Product Detail Page
app.get('/product/:id', (c) => {
  const productId = c.req.param('id')
  
  return c.render(
    <div>
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
            <i className="fas fa-chevron-right mx-2 text-gray-400 text-xs"></i>
            <a href="/products" className="hover:text-teal-600 transition-colors">Products</a>
            <i className="fas fa-chevron-right mx-2 text-gray-400 text-xs"></i>
            <span className="text-gray-800 font-medium">Curl Defining Gel</span>
          </div>
        </div>
      </nav>

      {/* Product Details */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg mb-4 flex items-center justify-center">
                <i className="fas fa-bottle-water text-teal-600 text-6xl"></i>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded cursor-pointer hover:border-2 hover:border-teal-600 transition-colors flex items-center justify-center">
                    <i className="fas fa-image text-gray-400"></i>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div>
              {/* Trust Signals */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star-half-alt text-yellow-400"></i>
                  <span className="text-gray-600 ml-2">(127 reviews)</span>
                </div>
                <div className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">
                  Island Tested
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">Caribbean Players Curl Defining Gel</h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Lightweight, clear gel that defines curls and locks shape—without crunch or flakes.
              </p>

              {/* Price & Size */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-gray-800">$24.99</span>
                  <span className="text-lg text-gray-500">8oz</span>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 focus:border-transparent">
                    <option>4oz - $16.99</option>
                    <option selected>8oz - $24.99</option>
                    <option>16oz - $42.99</option>
                  </select>
                </div>
              </div>

              {/* What it Does */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">What It Does in Humidity</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check text-teal-600 mt-1"></i>
                    <span className="text-gray-700">Shapes curls and coils so they keep definition all day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check text-teal-600 mt-1"></i>
                    <span className="text-gray-700">Controls halo-frizz without a stiff, crunchy cast</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check text-teal-600 mt-1"></i>
                    <span className="text-gray-700">Adds a soft, healthy shine that lasts</span>
                  </li>
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="mb-6">
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors mb-3">
                  Add to Cart - $24.99
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-teal-600 text-teal-600 hover:bg-teal-50 py-2 rounded-lg font-medium transition-colors">
                    <i className="fas fa-heart mr-2"></i>Save for Later
                  </button>
                  <button className="border border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg font-medium transition-colors">
                    <i className="fas fa-share mr-2"></i>Share
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shipping-fast text-coral-500"></i>
                    <span>Free US Shipping $50+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-leaf text-coral-500"></i>
                    <span>Natural Ingredients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-alt text-coral-500"></i>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-island-tropical text-coral-500"></i>
                    <span>Made in Trinidad & Tobago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div id="product-tabs" className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button className="product-tab active py-4 px-1 border-b-2 border-teal-600 font-medium text-teal-600" data-tab="how-to-use">
                  How to Use
                </button>
                <button className="product-tab py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700" data-tab="ingredients">
                  Ingredients & Why
                </button>
                <button className="product-tab py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700" data-tab="pairs-with">
                  Pairs Well With
                </button>
                <button className="product-tab py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700" data-tab="reviews">
                  Reviews (127)
                </button>
                <button className="product-tab py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700" data-tab="faqs">
                  FAQs
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div id="how-to-use" className="tab-content">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Application Steps</h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <p className="font-medium text-gray-800">Prep Hair</p>
                      <p className="text-gray-600">On clean, damp hair, rake a small amount from roots to ends.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <p className="font-medium text-gray-800">Shape Curls</p>
                      <p className="text-gray-600">Scrunch or finger-coil to encourage your natural curl pattern.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <p className="font-medium text-gray-800">Dry & Finish</p>
                      <p className="text-gray-600">Air-dry or diffuse on low. For extra hold, layer over Leave-In Conditioner.</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold mb-3 text-gray-800">💡 Pro Tips for Humidity</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Apply to soaking wet hair for better hold</li>
                  <li>• Use less product in high humidity areas</li>
                  <li>• Scrunch out the cast once completely dry</li>
                  <li>• Refresh day 2-3 curls with water and shine spray</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="ingredients" className="tab-content hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Ingredients</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-gray-800">Humidity-Lock Polymers</h4>
                    <p className="text-sm text-gray-600">Create flexible film that blocks moisture while allowing curls to move naturally.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-gray-800">Caribbean Botanical Blend</h4>
                    <p className="text-sm text-gray-600">Native plant extracts provide natural hold and frizz control without buildup.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-gray-800">Lightweight Conditioning Agents</h4>
                    <p className="text-sm text-gray-600">Smooth cuticles and add shine without weighing curls down.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Full INCI List</h4>
                <div className="bg-white p-4 rounded-lg text-xs text-gray-600 font-mono">
                  Water (Aqua), Carbomer, Triethanolamine, Glycerin, Hydroxyethylcellulose, 
                  PVP, Panthenol, Hydrolyzed Wheat Protein, Phenoxyethanol, Fragrance (Parfum)
                </div>
                
                <div className="mt-6 p-4 bg-coral-50 border border-coral-200 rounded-lg">
                  <h4 className="font-medium text-coral-800 mb-2">What's NOT in it</h4>
                  <p className="text-sm text-coral-700">Sulfates • Parabens • Drying Alcohols • Heavy Silicones • Mineral Oil</p>
                </div>
              </div>
            </div>
          </div>

          <div id="pairs-with" className="tab-content hidden">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-bottle-water text-teal-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Leave-In Conditioner</h4>
                <p className="text-sm text-gray-600 mb-4">Layer underneath for extra moisture and heat protection.</p>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Add to Bundle</button>
              </div>
              
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-coral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-spray-can text-coral-500 text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Moisturizing Shine Spray</h4>
                <p className="text-sm text-gray-600 mb-4">Perfect finishing touch for brilliant shine and frizz control.</p>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Add to Bundle</button>
              </div>
              
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-pump-soap text-teal-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Softening Hair Moisturizer</h4>
                <p className="text-sm text-gray-600 mb-4">Use on wash days for deep hydration before styling.</p>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Add to Bundle</button>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-3">Complete Your Routine</h4>
              <p className="text-teal-700 mb-4">Get all three products and save 15% - perfect for humidity-proof results!</p>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Add Frizz-Control Trio & Save 15%
              </button>
            </div>
          </div>

          <div id="reviews" className="tab-content hidden">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Review Summary */}
              <div>
                <div className="bg-white p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-gray-800">4.7</div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star-half-alt text-yellow-400"></i>
                      </div>
                      <div className="text-sm text-gray-600">Based on 127 reviews</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm w-8">{star}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '8%' : '1%' }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{star === 5 ? '89' : star === 4 ? '25' : star === 3 ? '10' : '3'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full border border-teal-600 text-teal-600 hover:bg-teal-50 py-3 rounded-lg font-semibold transition-colors">
                  Write a Review
                </button>
              </div>

              {/* Recent Reviews */}
              <div>
                <h4 className="font-semibold mb-4">Recent Reviews</h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                      </div>
                      <span className="font-medium text-sm">Miami Curls</span>
                      <span className="text-xs text-gray-500">3A Hair • Verified Purchase</span>
                    </div>
                    <p className="text-sm text-gray-700">"Finally! A gel that actually works in Miami humidity. My curls stayed defined through a beach day and still looked good for dinner. No crunch, no flakes, just perfect curls."</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="far fa-star text-yellow-400 text-sm"></i>
                      </div>
                      <span className="font-medium text-sm">Jessica_NYC</span>
                      <span className="text-xs text-gray-500">4A Hair • Verified Purchase</span>
                    </div>
                    <p className="text-sm text-gray-700">"Great hold and my curls look so defined! Only issue is I need to use more product than expected for my thickness, but the results are worth it."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="faqs" className="tab-content hidden">
            <div className="space-y-4">
              <div className="faq-item bg-white rounded-lg">
                <button className="w-full p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  Will it flake?
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </button>
                <div className="faq-answer p-4 border-t">
                  <p className="text-gray-700">No! Our starch-free formula is specifically designed for a no-flake finish. The gel dries to a soft cast that scrunches out easily, leaving you with touchable, defined curls.</p>
                </div>
              </div>
              
              <div className="faq-item bg-white rounded-lg">
                <button className="w-full p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  Will my curls feel hard or crunchy?
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </button>
                <div className="faq-answer hidden p-4 border-t">
                  <p className="text-gray-700">Not when used correctly! The gel forms a flexible cast while drying. Once completely dry, gently scrunch or finger through your curls to break the cast. This leaves you with soft, bouncy curls with lasting hold.</p>
                </div>
              </div>
              
              <div className="faq-item bg-white rounded-lg">
                <button className="w-full p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  Is it safe for color-treated hair?
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </button>
                <div className="faq-answer hidden p-4 border-t">
                  <p className="text-gray-700">Yes! Our gentle formula is safe for chemically treated, colored, and relaxed hair. Always patch test if you have specific sensitivities.</p>
                </div>
              </div>
              
              <div className="faq-item bg-white rounded-lg">
                <button className="w-full p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  How much should I use?
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </button>
                <div className="faq-answer hidden p-4 border-t">
                  <p className="text-gray-700">Start with a grape-sized amount for shoulder-length hair. You can always add more, but it's harder to remove excess product. Fine hair needs less, thick or coarse hair may need slightly more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="font-semibold text-gray-800">$24.99</div>
            <div className="text-sm text-gray-600">Caribbean Players Curl Defining Gel</div>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>,
    { title: 'Curl Defining Gel – Anti-Humidity Styling Gel | Caribbean Players' }
  )
})
// All Products Page
app.get('/products', (c) => {
  return c.render(
    <div>
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/static/images/pearl-logo.webp" 
                alt="Pearl Beauty Enterprises" 
                className="h-12 w-auto"
              />
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Home</a>
              <a href="/products" className="text-teal-600 font-semibold border-b-2 border-teal-600">Products</a>
              <a href="/#quiz" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Quiz</a>
              <a 
                href="https://pearlbeautyent.com/collections/all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Shop Now
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700 hover:text-teal-600" id="mobile-menu-btn">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu (Hidden by default) */}
        <div className="hidden md:hidden bg-white border-t" id="mobile-menu">
          <div className="px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Home</a>
            <a href="/products" className="block text-teal-600 font-semibold py-2">Products</a>
            <a href="/#quiz" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Quiz</a>
            <a 
              href="https://pearlbeautyent.com/collections/all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Shop Now
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
            <i className="fas fa-chevron-right mx-2 text-gray-400 text-xs"></i>
            <span className="text-gray-800 font-medium">All Products</span>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Caribbean Players Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Complete curl care system designed for tropical humidity. Made in Trinidad & Tobago with natural Caribbean botanicals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <i className="fas fa-leaf text-teal-600"></i>
              <span>Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-island-tropical text-teal-600"></i>
              <span>Island Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-droplet text-teal-600"></i>
              <span>Humidity-Proof</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-heart text-teal-600"></i>
              <span>All Curl Types</span>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              All Products <span className="text-teal-600" id="product-count">(Loading...)</span>
            </h2>
            
            {/* Filter/Sort Options (Future Enhancement) */}
            <div className="hidden md:flex items-center gap-4">
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent">
                <option>All Hair Types</option>
                <option>Wavy (2A-2C)</option>
                <option>Curly (3A-3C)</option>
                <option>Coily (4A-4C)</option>
              </select>
            </div>
          </div>
          
          {/* Products will be loaded by JavaScript */}
          <div id="all-products" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dynamic content loaded by app.js */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-teal-50">
            Take our 2-minute quiz to find your perfect curl routine
          </p>
          <a 
            href="/#quiz" 
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            <i className="fas fa-clipboard-list mr-2"></i>
            Take the Quiz
          </a>
        </div>
      </section>
    </div>
  )
})

// Privacy Policy Page
app.get('/privacy', (c) => {
  return c.render(
    <div>
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="/static/images/pearl-logo.webp" 
                alt="Pearl Beauty Enterprises" 
                className="h-12 w-auto"
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Home</a>
              <a href="/products" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Products</a>
              <a href="/#quiz" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Quiz</a>
              <a 
                href="https://pearlbeautyent.com/collections/all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Shop Now
              </a>
            </div>
            <button className="md:hidden text-gray-700 hover:text-teal-600" id="mobile-menu-btn">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        
        <div className="hidden md:hidden bg-white border-t" id="mobile-menu">
          <div className="px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Home</a>
            <a href="/products" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Products</a>
            <a href="/#quiz" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Quiz</a>
            <a 
              href="https://pearlbeautyent.com/collections/all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Shop Now
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
            <i className="fas fa-chevron-right mx-2 text-gray-400 text-xs"></i>
            <span className="text-gray-800 font-medium">Privacy Policy</span>
          </div>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: November 19, 2024</p>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-gray-700 leading-relaxed mb-4">
              Pearl Beauty Enterprises ("we," "us," or "our") operates pearlbeautyent.com and Caribbean Players product line. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and safeguard your personal information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our site.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contents</h2>
            <ol className="space-y-2 text-teal-700">
              <li><a href="#section-1" className="hover:underline">1. What Personal Data We Collect</a></li>
              <li><a href="#section-2" className="hover:underline">2. How We Collect Your Data</a></li>
              <li><a href="#section-3" className="hover:underline">3. How We Use Your Data</a></li>
              <li><a href="#section-4" className="hover:underline">4. Who We Share Your Data With</a></li>
              <li><a href="#section-5" className="hover:underline">5. International Data Transfers</a></li>
              <li><a href="#section-6" className="hover:underline">6. How We Protect Your Data</a></li>
              <li><a href="#section-7" className="hover:underline">7. Your Privacy Rights</a></li>
              <li><a href="#section-8" className="hover:underline">8. Cookies and Tracking Technologies</a></li>
              <li><a href="#section-9" className="hover:underline">9. Children's Privacy</a></li>
              <li><a href="#section-10" className="hover:underline">10. Changes to This Policy</a></li>
              <li><a href="#section-11" className="hover:underline">11. Contact Us</a></li>
            </ol>
          </div>

          {/* Section 1 */}
          <div id="section-1" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. What Personal Data We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We may collect the following types of personal information:</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Identity Data</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>First name, last name</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Data</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Time zone setting and location</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Data</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>Pages visited on our site</li>
              <li>Products viewed</li>
              <li>Quiz responses</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Marketing Data</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Email preferences</li>
              <li>Communication preferences</li>
              <li>Newsletter subscription status</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Collect Your Data</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Direct Interactions</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You provide us data when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>Take our curl care quiz</li>
              <li>Subscribe to our newsletter</li>
              <li>Request marketing materials</li>
              <li>Contact us through our website</li>
              <li>Make purchases through our Shopify store</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Automated Technologies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              As you navigate our website, we automatically collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Technical data through cookies and similar technologies</li>
              <li>Usage data through analytics services (Google Analytics)</li>
              <li>Device and browser information</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your personal data for the following purposes:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">To Provide Our Services</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Process and fulfill orders through Shopify</li>
                  <li>Provide personalized product recommendations</li>
                  <li>Respond to customer inquiries</li>
                  <li>Deliver quiz results and routine suggestions</li>
                </ul>
              </div>

              <div className="border-l-4 border-coral-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">To Improve Our Website</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Analyze site usage and performance</li>
                  <li>Test new features and improvements</li>
                  <li>Understand customer preferences</li>
                  <li>Troubleshoot technical issues</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">For Marketing Purposes</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Send promotional emails (with your consent)</li>
                  <li>Show relevant advertisements</li>
                  <li>Conduct market research</li>
                  <li>Measure campaign effectiveness</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Legal Obligations</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Comply with legal requirements</li>
                  <li>Enforce our terms and conditions</li>
                  <li>Protect against fraud and abuse</li>
                  <li>Defend legal claims</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Who We Share Your Data With</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your personal data with the following categories of recipients:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Providers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Shopify:</strong> E-commerce platform for order processing and fulfillment</li>
                <li><strong>Cloudflare:</strong> Website hosting and security services</li>
                <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                <li><strong>Email Service Providers:</strong> Newsletter delivery and email marketing</li>
                <li><strong>Payment Processors:</strong> Secure payment processing</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Advertising Partners</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Social media advertising platforms (Facebook, Instagram, TikTok)</li>
                <li>Google Ads for targeted advertising</li>
                <li>Analytics and attribution services</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                We may disclose your data to law enforcement, regulators, or other parties when required by law or to protect our legal rights.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>We do not sell your personal data to third parties.</strong>
            </p>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pearl Beauty Enterprises is based in Trinidad & Tobago. Your data may be transferred to and processed in countries outside of your residence, including the United States and European Union.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When we transfer your data internationally, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Standard contractual clauses approved by regulatory authorities</li>
              <li>Privacy Shield certification (where applicable)</li>
              <li>Data processing agreements with service providers</li>
              <li>Compliance with GDPR and other privacy regulations</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. How We Protect Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal data:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <i className="fas fa-shield-alt text-teal-600"></i>
                  Technical Measures
                </h3>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• SSL/TLS encryption</li>
                  <li>• Secure cloud hosting (Cloudflare)</li>
                  <li>• Regular security audits</li>
                  <li>• Firewall protection</li>
                  <li>• Access controls</li>
                </ul>
              </div>
              
              <div className="bg-coral-50 border border-coral-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <i className="fas fa-users text-coral-500"></i>
                  Organizational Measures
                </h3>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Limited staff access</li>
                  <li>• Confidentiality agreements</li>
                  <li>• Staff training on data protection</li>
                  <li>• Data breach response plan</li>
                  <li>• Regular policy reviews</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              While we strive to protect your data, no internet transmission is 100% secure. We cannot guarantee absolute security but will notify you of any breach as required by law.
            </p>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-teal-600 bg-teal-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Access</h3>
                <p className="text-sm text-gray-700">Request a copy of the personal data we hold about you</p>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Rectification</h3>
                <p className="text-sm text-gray-700">Correct inaccurate or incomplete data</p>
              </div>

              <div className="border-l-4 border-purple-600 bg-purple-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Erasure</h3>
                <p className="text-sm text-gray-700">Request deletion of your personal data (subject to legal obligations)</p>
              </div>

              <div className="border-l-4 border-coral-500 bg-coral-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Restrict Processing</h3>
                <p className="text-sm text-gray-700">Limit how we use your data</p>
              </div>

              <div className="border-l-4 border-green-600 bg-green-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Data Portability</h3>
                <p className="text-sm text-gray-700">Receive your data in a structured, machine-readable format</p>
              </div>

              <div className="border-l-4 border-yellow-600 bg-yellow-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Object</h3>
                <p className="text-sm text-gray-700">Object to processing for direct marketing or legitimate interests</p>
              </div>

              <div className="border-l-4 border-red-600 bg-red-50 pl-4 py-3">
                <h3 className="font-semibold text-gray-800 mb-1">Right to Withdraw Consent</h3>
                <p className="text-sm text-gray-700">Withdraw consent where processing is based on consent</p>
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-6">
              <p className="text-gray-800 font-semibold mb-2">To Exercise Your Rights:</p>
              <p className="text-gray-700 mb-2">Contact us at: <a href="mailto:privacy@pearlbeautyent.com" className="text-teal-600 hover:underline">privacy@pearlbeautyent.com</a></p>
              <p className="text-sm text-gray-600">We will respond to your request within 30 days. You will not be charged a fee unless your request is manifestly unfounded or excessive.</p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through our cookie banner.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Types of Cookies We Use:</h3>
            
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 border-l-4 border-teal-600 p-4">
                <h4 className="font-semibold text-gray-800 mb-1">Strictly Necessary Cookies</h4>
                <p className="text-sm text-gray-700 mb-2">Essential for website functionality. These cannot be disabled.</p>
                <p className="text-xs text-gray-600">Examples: Session management, security, load balancing</p>
              </div>

              <div className="bg-gray-50 border-l-4 border-blue-600 p-4">
                <h4 className="font-semibold text-gray-800 mb-1">Functional Cookies</h4>
                <p className="text-sm text-gray-700 mb-2">Remember your preferences and choices.</p>
                <p className="text-xs text-gray-600">Examples: Language preferences, quiz responses, accessibility settings</p>
              </div>

              <div className="bg-gray-50 border-l-4 border-purple-600 p-4">
                <h4 className="font-semibold text-gray-800 mb-1">Performance Cookies</h4>
                <p className="text-sm text-gray-700 mb-2">Help us understand how visitors use our site.</p>
                <p className="text-xs text-gray-600">Examples: Google Analytics, page load times, error tracking</p>
              </div>

              <div className="bg-gray-50 border-l-4 border-coral-500 p-4">
                <h4 className="font-semibold text-gray-800 mb-1">Targeting Cookies</h4>
                <p className="text-sm text-gray-700 mb-2">Used for advertising and social media integration.</p>
                <p className="text-xs text-gray-600">Examples: Facebook Pixel, Google Ads, retargeting pixels</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-gray-800 font-semibold mb-2">Managing Cookies:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Click "Privacy Settings" in our cookie banner</li>
                <li>• Adjust your browser settings to block cookies</li>
                <li>• Use opt-out tools provided by advertising networks</li>
                <li>• Note: Disabling cookies may affect site functionality</li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are a parent or guardian and believe your child has provided us with personal data, please contact us at <a href="mailto:privacy@pearlbeautyent.com" className="text-teal-600 hover:underline">privacy@pearlbeautyent.com</a> and we will delete that information.
            </p>
          </div>

          {/* Section 10 */}
          <div id="section-10" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Update the "Last Updated" date at the top of this page</li>
              <li>Notify you via email if the changes are significant (if you've subscribed)</li>
              <li>Display a notice on our website for 30 days</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </div>

          {/* Section 11 */}
          <div id="section-11" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pearl Beauty Enterprises</h3>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <i className="fas fa-envelope text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <a href="mailto:privacy@pearlbeautyent.com" className="text-teal-600 hover:underline">privacy@pearlbeautyent.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fas fa-globe text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">Website:</p>
                    <a href="https://pearlbeautyent.com" target="_blank" className="text-teal-600 hover:underline">www.pearlbeautyent.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p>Trinidad & Tobago</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-teal-300">
                <p className="text-sm text-gray-600">
                  <strong>Response Time:</strong> We aim to respond to all privacy requests within 30 days.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center pt-8 border-t">
            <a href="#" className="inline-block text-teal-600 hover:text-teal-700 font-semibold">
              <i className="fas fa-arrow-up mr-2"></i>
              Back to Top
            </a>
          </div>
        </div>
      </section>
    </div>,
    { title: 'Privacy Policy | Caribbean Players by Pearl Beauty' }
  )
})

// Terms of Service Page
app.get('/terms', (c) => {
  return c.render(
    <div>
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="/static/images/pearl-logo.webp" 
                alt="Pearl Beauty Enterprises" 
                className="h-12 w-auto"
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Home</a>
              <a href="/products" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Products</a>
              <a href="/#quiz" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Quiz</a>
              <a 
                href="https://pearlbeautyent.com/collections/all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Shop Now
              </a>
            </div>
            <button className="md:hidden text-gray-700 hover:text-teal-600" id="mobile-menu-btn">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        
        <div className="hidden md:hidden bg-white border-t" id="mobile-menu">
          <div className="px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Home</a>
            <a href="/products" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Products</a>
            <a href="/#quiz" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Quiz</a>
            <a 
              href="https://pearlbeautyent.com/collections/all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Shop Now
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
            <i className="fas fa-chevron-right mx-2 text-gray-400 text-xs"></i>
            <span className="text-gray-800 font-medium">Terms of Service</span>
          </div>
        </div>
      </nav>

      {/* Terms of Service Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: November 19, 2024</p>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Pearl Beauty Enterprises ("we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website at pearlbeautyent.com and our Caribbean Players product line.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website.
            </p>
            <div className="bg-coral-50 border-l-4 border-coral-500 p-4">
              <p className="text-gray-800 font-semibold mb-2">
                <i className="fas fa-exclamation-triangle text-coral-500 mr-2"></i>
                Important: These Terms contain important waivers
              </p>
              <p className="text-sm text-gray-700">
                Please read these Terms carefully. They include limitations of liability, dispute resolution provisions, and a waiver of class action rights.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contents</h2>
            <ol className="space-y-2 text-teal-700">
              <li><a href="#section-1" className="hover:underline">1. Acceptance of Terms</a></li>
              <li><a href="#section-2" className="hover:underline">2. Use of Our Website</a></li>
              <li><a href="#section-3" className="hover:underline">3. Products and Services</a></li>
              <li><a href="#section-4" className="hover:underline">4. User Accounts</a></li>
              <li><a href="#section-5" className="hover:underline">5. Intellectual Property</a></li>
              <li><a href="#section-6" className="hover:underline">6. User Content</a></li>
              <li><a href="#section-7" className="hover:underline">7. Prohibited Activities</a></li>
              <li><a href="#section-8" className="hover:underline">8. Disclaimers and Limitations of Liability</a></li>
              <li><a href="#section-9" className="hover:underline">9. Indemnification</a></li>
              <li><a href="#section-10" className="hover:underline">10. Dispute Resolution and Arbitration</a></li>
              <li><a href="#section-11" className="hover:underline">11. Termination</a></li>
              <li><a href="#section-12" className="hover:underline">12. Changes to Terms</a></li>
              <li><a href="#section-13" className="hover:underline">13. General Provisions</a></li>
              <li><a href="#section-14" className="hover:underline">14. Contact Information</a></li>
            </ol>
          </div>

          {/* Section 1 */}
          <div id="section-1" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</a>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are using our website on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use of Our Website</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Eligibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must be at least 16 years old to use our website. By using our website, you represent and warrant that you meet this age requirement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">License to Use</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our website for personal, non-commercial purposes, subject to these Terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Restrictions</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Copy, modify, or distribute website content without authorization</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Products and Services</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Product Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions, colors, or other content on the website is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pricing and Availability</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <ul className="text-gray-700 space-y-2">
                <li><strong>Prices:</strong> All prices are in USD unless otherwise stated and are subject to change without notice.</li>
                <li><strong>Availability:</strong> Products are subject to availability. We reserve the right to limit quantities or discontinue products.</li>
                <li><strong>Errors:</strong> If a product is listed at an incorrect price due to error, we reserve the right to refuse or cancel orders.</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Orders and Fulfillment</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All orders are processed through our Shopify store at pearlbeautyent.com. By placing an order, you agree to Shopify's terms of service and payment processing terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to refuse or cancel any order for any reason, including suspected fraud, errors in product or pricing information, or limitations on quantities.
            </p>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. User Accounts</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you create an account on our Shopify store, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information is accurate and up-to-date</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent activity.
            </p>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on our website, including but not limited to text, graphics, logos, images, videos, software, and design elements (collectively, "Content"), is the property of Pearl Beauty Enterprises or our licensors and is protected by:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                <i className="fas fa-copyright text-teal-600 text-2xl mb-2"></i>
                <p className="text-sm font-semibold text-gray-800">Copyright Laws</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <i className="fas fa-trademark text-blue-600 text-2xl mb-2"></i>
                <p className="text-sm font-semibold text-gray-800">Trademark Laws</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <i className="fas fa-balance-scale text-purple-600 text-2xl mb-2"></i>
                <p className="text-sm font-semibold text-gray-800">IP Regulations</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Trademarks</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              "Pearl Beauty Enterprises," "Caribbean Players," and our logos are trademarks of Pearl Beauty Enterprises. You may not use these trademarks without our prior written permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Restrictions on Use</h3>
            <p className="text-gray-700 leading-relaxed">
              You may not reproduce, distribute, modify, create derivative works, publicly display, or exploit any Content without our express written permission.
            </p>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. User Content</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Submissions</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you submit content to our website (including reviews, photos, quiz responses, or feedback), you grant us a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, and display that content.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">User Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              You represent and warrant that any content you submit:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Is accurate and truthful</li>
              <li>Does not violate any third-party rights</li>
              <li>Does not contain illegal, harmful, or offensive material</li>
              <li>Does not infringe intellectual property rights</li>
              <li>Complies with all applicable laws</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              We reserve the right to remove any user content that violates these Terms or is otherwise objectionable, without notice.
            </p>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Prohibited Activities</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                <i className="fas fa-ban text-red-500 mr-2"></i>
                You are prohibited from:
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Using the website for fraudulent purposes</li>
                <li>• Impersonating any person or entity</li>
                <li>• Harassing, threatening, or abusing other users</li>
                <li>• Transmitting viruses, malware, or harmful code</li>
                <li>• Attempting to hack or compromise website security</li>
                <li>• Scraping or data mining without permission</li>
                <li>• Using the website to spam or distribute unsolicited messages</li>
                <li>• Reverse engineering any part of the website</li>
                <li>• Violating any applicable laws or regulations</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Violation of these prohibitions may result in immediate termination of your access and potential legal action.
            </p>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Disclaimers and Limitations of Liability</h2>
            
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-4">
              <p className="text-gray-800 font-semibold mb-2 uppercase">Important Legal Notice</p>
              <p className="text-sm text-gray-700">
                Please read this section carefully as it limits our liability to you.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer of Warranties</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              OUR WEBSITE AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the website will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or reliability of content</li>
              <li>Warranties that defects will be corrected</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PEARL BEAUTY ENTERPRISES SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Business interruption or loss of opportunities</li>
              <li>Damages arising from your use or inability to use the website</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100 USD, WHICHEVER IS GREATER.
            </p>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless Pearl Beauty Enterprises, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Your use of our website</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your conduct in connection with the website</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div id="section-10" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Dispute Resolution and Arbitration</h2>
            
            <div className="bg-coral-50 border-l-4 border-coral-500 p-6 mb-4">
              <p className="text-gray-800 font-semibold mb-2 uppercase">
                <i className="fas fa-gavel mr-2"></i>
                Binding Arbitration and Class Action Waiver
              </p>
              <p className="text-sm text-gray-700">
                This section contains important provisions that affect your legal rights, including a waiver of your right to bring a lawsuit in court or participate in class actions.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Informal Resolution</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before initiating arbitration, you agree to first contact us at <a href="mailto:support@pearlbeautyent.com" className="text-teal-600 hover:underline">support@pearlbeautyent.com</a> to attempt to resolve the dispute informally.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Binding Arbitration</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If we cannot resolve a dispute informally, any claim or controversy shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Trinidad & Tobago or another mutually agreed location.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Class Action Waiver</h3>
            <p className="text-gray-700 leading-relaxed">
              YOU AND PEARL BEAUTY ENTERPRISES AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A CLASS REPRESENTATIVE OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION.
            </p>
          </div>

          {/* Section 11 */}
          <div id="section-11" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your access to our website at any time, for any reason, without notice or liability.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon termination:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Your license to use the website immediately terminates</li>
              <li>You must cease all use of the website</li>
              <li>We may delete your account and associated data</li>
              <li>Provisions intended to survive termination remain in effect</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div id="section-12" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. When we make changes, we will:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Update the "Last Updated" date at the top of this page</li>
              <li>Post a notice on our website for 30 days</li>
              <li>Notify users via email if changes are material (if you've subscribed)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the website after changes are posted constitutes acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the website.
            </p>
          </div>

          {/* Section 13 */}
          <div id="section-13" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. General Provisions</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Governing Law</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Trinidad & Tobago, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Severability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Entire Agreement</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Pearl Beauty Enterprises regarding the use of our website.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">No Waiver</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our failure to enforce any provision of these Terms shall not be deemed a waiver of such provision or the right to enforce it.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Assignment</h3>
            <p className="text-gray-700 leading-relaxed">
              You may not assign or transfer these Terms or your rights under them. We may assign these Terms to any successor or affiliate without your consent.
            </p>
          </div>

          {/* Section 14 */}
          <div id="section-14" className="mb-10 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pearl Beauty Enterprises</h3>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <i className="fas fa-envelope text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">General Inquiries:</p>
                    <a href="mailto:support@pearlbeautyent.com" className="text-teal-600 hover:underline">support@pearlbeautyent.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fas fa-balance-scale text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">Legal Matters:</p>
                    <a href="mailto:legal@pearlbeautyent.com" className="text-teal-600 hover:underline">legal@pearlbeautyent.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fas fa-globe text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">Website:</p>
                    <a href="https://pearlbeautyent.com" target="_blank" className="text-teal-600 hover:underline">www.pearlbeautyent.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-teal-600 mt-1"></i>
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p>Trinidad & Tobago</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-teal-300">
                <p className="text-sm text-gray-600">
                  <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Agreement Acknowledgment */}
          <div className="bg-gradient-to-br from-coral-50 to-coral-100 border-2 border-coral-300 rounded-lg p-6 mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              <i className="fas fa-file-signature text-coral-500 mr-2"></i>
              Acknowledgment
            </h3>
            <p className="text-gray-700 leading-relaxed">
              BY USING OUR WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE OUR WEBSITE.
            </p>
          </div>

          {/* Back to Top */}
          <div className="text-center pt-8 border-t">
            <a href="#" className="inline-block text-teal-600 hover:text-teal-700 font-semibold">
              <i className="fas fa-arrow-up mr-2"></i>
              Back to Top
            </a>
          </div>
        </div>
      </section>
    </div>,
    { title: 'Terms of Service | Caribbean Players by Pearl Beauty' }
  )
})

// Homepage
app.get('/', (c) => {
  return c.render(
    <div>
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/static/images/pearl-logo.webp" 
                alt="Pearl Beauty Enterprises" 
                className="h-12 w-auto"
              />
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/products" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Products</a>
              <a href="#quiz" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Quiz</a>
              <a href="#ingredients" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">Ingredients</a>
              <a 
                href="https://pearlbeautyent.com/collections/all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Shop Now
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700 hover:text-teal-600" id="mobile-menu-btn">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu (Hidden by default) */}
        <div className="hidden md:hidden bg-white border-t" id="mobile-menu">
          <div className="px-4 py-3 space-y-3">
            <a href="/products" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Products</a>
            <a href="#quiz" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Quiz</a>
            <a href="#ingredients" className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2">Ingredients</a>
            <a 
              href="https://pearlbeautyent.com/collections/all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Shop Now
            </a>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-32 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/static/images/hero-background.jpg" 
            alt="Beautiful defined curls" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-teal-800/75 to-teal-900/85"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Trust Signals Above Headline */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm text-teal-100">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="font-semibold">4.8★ from 500+ reviews</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <i className="fas fa-island-tropical text-coral-400"></i>
              <span className="font-semibold">Made in Trinidad & Tobago</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <i className="fas fa-heart text-coral-400"></i>
              <span className="font-semibold">10,000+ Curls Tamed</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            Humidity-Proof Curls. <span className="text-coral-400">Zero Crunch.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-50 max-w-3xl mx-auto drop-shadow-md">
            Caribbean-made care for every texture—tested in real heat and humidity, loved across the USA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quiz" className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center">
              <i className="fas fa-clipboard-list mr-2"></i>
              Get My Curl Kit
            </a>
            <a href="#best-sellers" className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-teal-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center">
              <i className="fas fa-fire mr-2"></i>
              Shop Best-Sellers
            </a>
          </div>
          
          {/* Social Proof Below CTAs */}
          <p className="mt-6 text-teal-100 text-sm drop-shadow-md">
            <i className="fas fa-users mr-2"></i>
            Join 10,000+ curl queens defeating humidity
          </p>
        </div>
      </section>

      {/* Trust Banner - Above the Fold */}
      <section className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white py-2">
        <div className="max-w-6xl mx-auto px-4">
          <div id="trust-banner" className="flex justify-center items-center gap-8 text-xs md:text-sm font-medium overflow-hidden">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <i className="fas fa-shipping-fast text-coral-300"></i>
              <span>Free Shipping on Orders $50+</span>
            </div>
            <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
              <i className="fas fa-temperature-high text-coral-300"></i>
              <span>Humidity-Tested in 85°F Trinidad Heat</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <i className="fas fa-heart text-coral-300"></i>
              <span>10,000+ Caribbean Curls Trust Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* USP Bar */}
      <section className="bg-teal-50 border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-teal-700">
            <div className="flex items-center gap-2">
              <i className="fas fa-shield-check text-coral-500"></i>
              <span className="font-semibold">Sulfate-Free & Paraben-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-leaf text-coral-500"></i>
              <span className="font-semibold">Natural Caribbean Botanicals</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-flask text-coral-500"></i>
              <span className="font-semibold">Salon-Quality Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Best-Sellers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Humidity-Proof Formulas That Actually Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Island-tested in 90% humidity. No crunch, no flakes—just defined curls that last from morning to night.
            </p>
          </div>
          
          <div id="best-sellers" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards will be loaded dynamically */}
          </div>
        </div>
      </section>

      {/* Quiz Teaser - Updated with Current Pricing */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="inline-block bg-coral-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🎁 Bundle & Save 15%
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Not Sure Where to Start? Take Our 2-Minute Quiz
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Answer 4 quick questions about your hair texture, concern, lifestyle, and location. Get a personalized 3-product routine with climate-specific tips.
          </p>
          
          {/* Quiz Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-gray-800 text-sm">Bundle Pricing</div>
              <div className="text-xs text-gray-600">$22-25 (Save $4+)</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🌴</div>
              <div className="font-semibold text-gray-800 text-sm">Climate Matched</div>
              <div className="text-xs text-gray-600">Trinidad-tested formulas</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">✨</div>
              <div className="font-semibold text-gray-800 text-sm">3 Products</div>
              <div className="text-xs text-gray-600">Complete curl system</div>
            </div>
          </div>
          
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
            <i className="fas fa-clipboard-list mr-2"></i>
            Take the Quiz
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            Takes 60 seconds • Get instant results
          </p>
        </div>
      </section>

      {/* UGC Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Real Curls, Real Humidity, Real Results
            </h2>
            <p className="text-lg text-gray-600">
              See how Caribbean Players holds up in Houston's 90% humidity, Miami's salt air, and DC's brutal summers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[9/16] overflow-hidden bg-black">
                <video 
                  src="/static/videos/ugc/miami-beach.mp4" 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster="/static/images/ugc/miami-beach.jpg"
                >
                  <source src="/static/videos/ugc/miami-beach.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold mb-2">Miami Beach Test</h3>
                <p className="text-gray-600 text-sm">8 hours, 85% humidity - still defined</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[9/16] overflow-hidden bg-black">
                <video 
                  src="/static/videos/ugc/houston-summer.mp4" 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster="/static/images/ugc/houston-summer.jpg"
                >
                  <source src="/static/videos/ugc/houston-summer.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold mb-2">Houston Summer</h3>
                <p className="text-gray-600 text-sm">Type 4A curls - zero crunch after scrunch-out</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[9/16] overflow-hidden bg-black">
                <video 
                  src="/static/videos/ugc/nyc-subway.mp4" 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster="/static/images/ugc/nyc-subway.jpg"
                >
                  <source src="/static/videos/ugc/nyc-subway.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold mb-2">NYC Subway</h3>
                <p className="text-gray-600 text-sm">Underground to street level - curls intact</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="#before-after" className="inline-block border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View Before & After
            </a>
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section id="before-after" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Real Transformations. Zero Editing.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Same person, same curls—just different humidity levels. See how Caribbean Players performs in real-world conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before/After 1 - Houston Humidity */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 bg-teal-600 text-white">
                <h3 className="text-xl font-bold mb-2">Houston, TX - 90% Humidity</h3>
                <p className="text-teal-100">Type 3C Curls • Wash Day to Day 3</p>
              </div>
              <div className="grid grid-cols-2 gap-1 p-1">
                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-coral-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEFORE
                  </div>
                  <i className="fas fa-image text-gray-400 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    No Product
                  </div>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-teal-100 to-teal-200 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    AFTER
                  </div>
                  <i className="fas fa-image text-teal-600 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Day 3 Hold
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Results:</strong> Frizz-free definition lasted 72 hours in peak Houston humidity. Zero refresh needed.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="fas fa-check-circle text-teal-600"></i>
                  <span>No crunch • No flakes • No white cast</span>
                </div>
              </div>
            </div>

            {/* Before/After 2 - Miami Salt Air */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 bg-coral-500 text-white">
                <h3 className="text-xl font-bold mb-2">Miami Beach - Salt Air + Sun</h3>
                <p className="text-coral-100">Type 4A Curls • Beach Day Test</p>
              </div>
              <div className="grid grid-cols-2 gap-1 p-1">
                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-coral-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEFORE
                  </div>
                  <i className="fas fa-image text-gray-400 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Morning
                  </div>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-coral-100 to-coral-200 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    AFTER
                  </div>
                  <i className="fas fa-image text-coral-600 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    8 Hours Later
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Results:</strong> Survived beach waves, salt spray, and 85°F heat. Curls stayed defined and bouncy.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="fas fa-check-circle text-teal-600"></i>
                  <span>UV protected • Lightweight • Non-greasy</span>
                </div>
              </div>
            </div>

            {/* Before/After 3 - NYC Winter to Summer */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 bg-teal-700 text-white">
                <h3 className="text-xl font-bold mb-2">NYC - Extreme Climate Shift</h3>
                <p className="text-teal-100">Type 3B Curls • Winter Dry → Summer Humid</p>
              </div>
              <div className="grid grid-cols-2 gap-1 p-1">
                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-coral-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    WINTER
                  </div>
                  <i className="fas fa-image text-gray-400 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Dry Air
                  </div>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-teal-100 to-teal-200 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SUMMER
                  </div>
                  <i className="fas fa-image text-teal-600 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    High Humidity
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Results:</strong> Same hold strength in both climates. Adapts to moisture levels without buildup.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="fas fa-check-circle text-teal-600"></i>
                  <span>All-season formula • No adjustment needed</span>
                </div>
              </div>
            </div>

            {/* Before/After 4 - DC Gym Test */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 bg-gray-700 text-white">
                <h3 className="text-xl font-bold mb-2">Washington DC - Workout Test</h3>
                <p className="text-gray-300">Type 4B Curls • Pre-Gym to Post-Workout</p>
              </div>
              <div className="grid grid-cols-2 gap-1 p-1">
                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-coral-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEFORE
                  </div>
                  <i className="fas fa-image text-gray-400 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Fresh Curls
                  </div>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    AFTER
                  </div>
                  <i className="fas fa-image text-gray-600 text-4xl"></i>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Post-Cardio
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Results:</strong> Curls maintained structure through sweat and movement. No refresh needed.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="fas fa-check-circle text-teal-600"></i>
                  <span>Sweat-resistant • Flexible hold • Quick refresh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Want to See Your Own Transformation?</h3>
                <p className="text-gray-600">Get personalized product recommendations based on your hair type and climate.</p>
              </div>
              <a href="#quiz" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Take the Quiz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Curl Experts Are Saying
            </h2>
            <p className="text-lg text-gray-600">
              Real reviews from customers who know their hair—and finally found products that deliver.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-1 mb-4">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "After trying 6 other gels, this is the ONLY one that defines my 3C curls without crunch. Houston humidity used to destroy my wash-and-gos by noon—now they last 3 days."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Tamika J.</p>
                  <p className="text-sm text-gray-500">Houston, TX</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-1 mb-4">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "My 4A curls stay soft and moisturized for 48+ hours with ZERO grease. I switched from a $40 salon brand and this works better. Plus it's Caribbean-made! 🇹🇹"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Michelle R.</p>
                  <p className="text-sm text-gray-500">Miami, FL</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-1 mb-4">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "DC summers hit 95°F with 80% humidity and my 3B curls STILL hold their shape for 3 days. Zero white cast, zero flakes. I finally found my holy grail."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  K
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Kendra W.</p>
                  <p className="text-sm text-gray-500">Washington, DC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Story */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Science-Backed. Caribbean-Tested. Zero Compromises.
            </h2>
            <p className="text-lg text-gray-600">
              Natural botanicals meet modern curl technology—formulated where humidity never quits.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-shield-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Frizz Control in Humidity</h3>
              <p className="text-gray-600">
                Moisture-blocking polymers create a protective barrier while allowing curls to breathe.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coral-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-feather text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">No-Flake Finish</h3>
              <p className="text-gray-600">
                Starch-free formula dries to a soft cast that scrunches out for touchable definition.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-gem text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Shine Without the Grease</h3>
              <p className="text-gray-600">
                Lightweight oils and natural emollients add gloss without heavy buildup.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="#ingredients" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Learn Why It Works
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Ingredients & Science Section */}
      <section id="ingredients" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              The Science Behind Humidity-Proof Curls
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We reverse-engineered salon formulas and added Caribbean botanicals. Here's exactly how each ingredient earns its place.
            </p>
          </div>

          {/* Free-From Badges - Quick Win */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-coral-50 via-pink-50 to-coral-50 border-2 border-coral-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                <i className="fas fa-shield-check text-coral-500 mr-2"></i>
                What's NOT in Caribbean Players
              </h3>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Clean formulas without the harsh chemicals that damage curls, strip moisture, or cause buildup.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
                {/* Sulfates */}
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-ban text-red-600 text-2xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">No Sulfates</h4>
                  <p className="text-xs text-gray-600">Won't strip natural oils</p>
                </div>

                {/* Parabens */}
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-ban text-orange-600 text-2xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">No Parabens</h4>
                  <p className="text-xs text-gray-600">Gentle preservatives only</p>
                </div>

                {/* Drying Alcohols */}
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-ban text-yellow-600 text-2xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">No Drying Alcohols</h4>
                  <p className="text-xs text-gray-600">Keeps curls hydrated</p>
                </div>

                {/* Silicones */}
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-ban text-purple-600 text-2xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">No Heavy Silicones</h4>
                  <p className="text-xs text-gray-600">Prevents buildup</p>
                </div>

                {/* Mineral Oil */}
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-ban text-blue-600 text-2xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">No Mineral Oil</h4>
                  <p className="text-xs text-gray-600">Natural oils only</p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  <i className="fas fa-leaf text-teal-600 mr-2"></i>
                  <strong>Safe for:</strong> Color-treated, chemically treated, and natural hair • Curly Girl Method approved
                </p>
                <a 
                  href="#best-sellers" 
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm"
                >
                  Shop Clean Curl Care
                </a>
              </div>
            </div>
          </div>

          {/* Key Ingredient Deep Dives */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Ingredient 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-shield-alt text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Humidity-Lock Polymer Complex</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>What it does:</strong> Creates an invisible moisture barrier around each curl strand without suffocating it.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Unlike traditional gels that seal hair completely, our polymer network allows water vapor to escape while blocking external humidity. Think of it as a breathable raincoat for your curls.
                  </p>
                  <div className="bg-white rounded p-3 text-xs">
                    <strong className="text-teal-700">Testing Results:</strong> Maintained 94% curl definition in 90% relative humidity over 48 hours.
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 2 */}
            <div className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-lg p-6 border border-coral-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-seedling text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Caribbean Botanical Blend</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>What it does:</strong> Natural frizz control + curl definition from plants that thrive in tropical climates.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Hibiscus extract, aloe vera, and sea moss—native to our islands—have evolved natural anti-frizz properties. We extract and stabilize these compounds for consistent performance.
                  </p>
                  <div className="bg-white rounded p-3 text-xs">
                    <strong className="text-coral-600">Why it matters:</strong> Plant-based hold without synthetic buildup or drying alcohols.
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-droplet text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Hydration Amplifiers</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>What it does:</strong> Attracts and locks moisture inside the hair shaft while repelling environmental humidity.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Glycerin and hyaluronic acid work in tandem—glycerin pulls moisture from inside your hair to the surface, while HA creates a flexible seal that keeps it there.
                  </p>
                  <div className="bg-white rounded p-3 text-xs">
                    <strong className="text-blue-600">The Result:</strong> Curls stay hydrated from within, not from external moisture that causes frizz.
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-gem text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Lightweight Shine Complex</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>What it does:</strong> Reflects light without adding weight or grease—like a gloss coat for your curls.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Jojoba oil and argan oil blend at micro-levels with silica microspheres. The oils smooth the cuticle while silica creates light-reflecting facets.
                  </p>
                  <div className="bg-white rounded p-3 text-xs">
                    <strong className="text-purple-600">Why You'll Love It:</strong> Brilliant shine without the "wet look" or oily residue.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's NOT in It */}
          <div className="bg-coral-50 border-2 border-coral-300 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-coral-800 mb-4 text-center">What's NOT in Caribbean Players</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-coral-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-ban text-coral-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">No Sulfates</h4>
                <p className="text-sm text-gray-600">Won't strip natural oils or cause dryness</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-coral-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-ban text-coral-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">No Parabens</h4>
                <p className="text-sm text-gray-600">Clean preservation without controversy</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-coral-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-ban text-coral-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">No Drying Alcohols</h4>
                <p className="text-sm text-gray-600">Only moisturizing fatty alcohols allowed</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-coral-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-ban text-coral-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">No Heavy Silicones</h4>
                <p className="text-sm text-gray-600">Lightweight alternatives prevent buildup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-coral-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-ban text-coral-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">No Mineral Oil</h4>
                <p className="text-sm text-gray-600">Plant oils only—nothing petroleum-based</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-coral-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-ban text-coral-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">No Animal Testing</h4>
                <p className="text-sm text-gray-600">Cruelty-free from lab to shelf</p>
              </div>
            </div>
          </div>

          {/* Clinical Testing Results */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Real Testing. Real Numbers.</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-coral-300 mb-2">94%</div>
                <p className="text-teal-100 text-sm">Curl definition retained after 48hrs in 90% humidity</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-coral-300 mb-2">3 Days</div>
                <p className="text-teal-100 text-sm">Average hold time without refresh (customer reported)</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-coral-300 mb-2">Zero</div>
                <p className="text-teal-100 text-sm">Flaking reported in 200+ user tests across climates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-coral-300 mb-2">87%</div>
                <p className="text-teal-100 text-sm">Users said "softer than previous gel" in blind tests</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every ingredient is chosen for performance and safety. We test in Trinidad's humidity so it works everywhere else.
            </p>
            <a href="https://pearlbeautyent.com/collections/all" target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Shop Caribbean Players
            </a>
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Complete Routines, Better Results
            </h2>
            <p className="text-lg text-gray-600">
              Pre-curated kits for your climate and curl type. Save 15% and skip the guesswork.
            </p>
          </div>
          
          <div id="bundles" className="grid md:grid-cols-3 gap-6">
            {/* Bundle cards will be loaded dynamically */}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 px-4 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get 10% Off + Free Humidity Survival Guide
          </h2>
          <p className="text-lg text-teal-100 mb-8">
            Unlock insider tips for frizz-free curls in any climate. Plus, save on your first order.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400"
            />
            <button className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Get Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  )
})

export default app
