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
        price: 24.99,
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
        image: '/static/images/curl-gel.jpg'
      },
      {
        id: 2,
        name: 'Caribbean Players Leave-In Conditioner',
        price: 22.99,
        size: '8oz',
        description: 'Moisture-locking conditioner that preps curls for humidity while adding slip and protection.',
        benefits: [
          'Deep moisture without heaviness',
          'Heat protection up to 400°F',
          'Detangles and adds slip for easy styling'
        ],
        climate_tested: 'Island-tested for tropical climates',
        hair_types: ['2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B'],
        rating: 4.8,
        reviews: 203,
        in_stock: true,
        image: '/static/images/leave-in.jpg'
      },
      {
        id: 3,
        name: 'Caribbean Players Softening Hair Moisturizer',
        price: 26.99,
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
        image: '/static/images/moisturizer.jpg'
      },
      {
        id: 4,
        name: 'Caribbean Players Moisturizing Shine Spray',
        price: 19.99,
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
        image: '/static/images/shine-spray.jpg'
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
                    <span>Free shipping $49+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-undo text-coral-500"></i>
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-alt text-coral-500"></i>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-phone text-coral-500"></i>
                    <span>Customer support</span>
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

// Homepage
app.get('/', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Island-Proof Curls. <span className="text-coral-400">Zero Crunch.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
            Caribbean-made care for every texture—tested in real heat and humidity, loved across the USA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Find Your Routine
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Shop Best-Sellers
            </button>
          </div>
        </div>
      </section>

      {/* USP Bar */}
      <section className="bg-teal-50 border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-teal-700">
            <div className="flex items-center gap-2">
              <i className="fas fa-shipping-fast text-coral-500"></i>
              <span>Free US shipping $49+</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-undo text-coral-500"></i>
              <span>30-day happiness guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-user-md text-coral-500"></i>
              <span>Dermatologist-guided care</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-coral-500"></i>
              <span>Made in the Caribbean, fulfilled in the USA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Best-Sellers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Beat Humidity with Science
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Island-tested formulas that keep your curls defined, frizz-free, and gorgeous from sunrise to night.
            </p>
          </div>
          
          <div id="best-sellers" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards will be loaded dynamically */}
          </div>
        </div>
      </section>

      {/* Quiz Teaser */}
      <section className="py-16 px-4 bg-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Your Perfect Island Routine—In 2 Minutes
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Tell us your texture and main concern. We'll build a simple 3-step routine you can start today.
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Take the Quiz
          </button>
        </div>
      </section>

      {/* UGC Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Real People. Real Island Weather.
            </h2>
            <p className="text-lg text-gray-600">
              See curls stay defined from sunrise to night—no flakes, no heavy grease.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-8 rounded-lg text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-camera text-white text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Miami Beach Test</h3>
              <p className="text-gray-600 text-sm">8 hours, 85% humidity - still defined</p>
            </div>
            <div className="bg-gradient-to-br from-coral-100 to-coral-200 p-8 rounded-lg text-center">
              <div className="w-20 h-20 bg-coral-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-camera text-white text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Houston Summer</h3>
              <p className="text-gray-600 text-sm">Type 4A curls - zero crunch after scrunch-out</p>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-8 rounded-lg text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-camera text-white text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">NYC Subway</h3>
              <p className="text-gray-600 text-sm">Underground to street level - curls intact</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View Before & After
            </button>
          </div>
        </div>
      </section>

      {/* Ingredient Story */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Lightweight Power, All-Day Hold
            </h2>
            <p className="text-lg text-gray-600">
              Caribbean botanicals meet modern curl science for humidity-proof results.
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
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Learn Why It Works
            </button>
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Save with Starter Kits
            </h2>
            <p className="text-lg text-gray-600">
              Complete routines designed for your climate and curl type.
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
            Get 10% Off + Our Humidity Survival Guide
          </h2>
          <p className="text-lg text-teal-100 mb-8">
            Tips for frizz-free definition in hot, sticky weather—delivered to your inbox.
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
