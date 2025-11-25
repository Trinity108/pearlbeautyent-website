import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Humidity-Proof Curls. Zero Crunch. | Caribbean Players by Pearl Beauty'}</title>
        <meta 
          name="description" 
          content="Natural ingredients meet salon results. Caribbean-made curl care that holds through humidity. Made in Trinidad & Tobago. Free US shipping $50+." 
        />
        <meta name="keywords" content="curly hair, humidity proof, Caribbean hair care, curl defining gel, anti-frizz, natural hair products" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title || 'Humidity-Proof Curls. Zero Crunch. | Caribbean Players'} />
        <meta property="og:description" content="Caribbean-made curl care tested in real heat and humidity. Define, moisturize & protect curls naturally." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/static/images/hero-curls.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || 'Island-Proof Curls by Caribbean Players'} />
        <meta name="twitter:description" content="Humidity-proof curl care made in the Caribbean, loved across the USA." />
        
        {/* Favicon - Comprehensive browser and device support */}
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/static/android-chrome-512x512.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <meta name="theme-color" content="#0D9488" />
        
        {/* Styles */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'coral': {
                      '400': '#FF7F7F',
                      '500': '#FF6B6B',
                      '600': '#FF5252'
                    },
                    'teal': {
                      '50': '#F0FDFA',
                      '100': '#CCFBF1', 
                      '600': '#0D9488',
                      '700': '#0F766E',
                      '800': '#115E59'
                    }
                  }
                }
              }
            }
          `
        }} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pearl Beauty Enterprises - Caribbean Players",
            "url": "https://pearlbeautyent.com",
            "logo": "/static/images/logo.png",
            "description": "Caribbean-made hair care products specializing in humidity-proof curl definition and natural ingredients.",
            "address": {
              "@type": "PostalAddress", 
              "addressCountry": "TT"
            },
            "founder": {
              "@type": "Person",
              "name": "Pearl Beauty Founders"
            },
            "sameAs": [
              "https://instagram.com/pearlbeautyent",
              "https://facebook.com/pearlbeautyent"
            ]
          })
        }} />
      </head>
      <body className="font-sans">
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              
              {/* Brand */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-coral-400">Caribbean Players</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Island-tested curl care made in Trinidad & Tobago, loved across the USA.
                </p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/pearlbeautyent" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-coral-400 transition-colors" aria-label="Instagram">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="https://facebook.com/pearlbeautyent" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-coral-400 transition-colors" aria-label="Facebook">
                    <i className="fab fa-facebook text-xl"></i>
                  </a>
                  <a href="https://www.tiktok.com/@pearlbeautyent" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-coral-400 transition-colors" aria-label="TikTok">
                    <i className="fab fa-tiktok text-xl"></i>
                  </a>
                </div>
              </div>
              
              {/* Shop */}
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://pearlbeautyent.com/collections/all" target="_blank" className="text-gray-300 hover:text-white transition-colors">All Products</a></li>
                  <li><a href="https://pearlbeautyent.com/collections/curl-care" target="_blank" className="text-gray-300 hover:text-white transition-colors">Curl Defining</a></li>
                  <li><a href="https://pearlbeautyent.com/collections/moisture" target="_blank" className="text-gray-300 hover:text-white transition-colors">Moisture & Shine</a></li>
                  <li><a href="https://pearlbeautyent.com/collections/bundles" target="_blank" className="text-gray-300 hover:text-white transition-colors">Starter Kits</a></li>
                  <li><a href="#quiz" className="text-gray-300 hover:text-white transition-colors">Take the Quiz</a></li>
                </ul>
              </div>
              
              {/* Support */}
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Track Order</a></li>
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ingredients</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wholesale</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>
              
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2024 Pearl Beauty Enterprises. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <button id="footer-cookie-settings" className="hover:text-white transition-colors">Cookie Settings</button>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Cookie Consent Banner */}
        <div id="cookie-banner" className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 shadow-lg z-50 hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Some tracking technologies such as cookies are important for the correct functioning of our website and are always on. By clicking "Accept All" you are also directing us to use optional tracking technologies to improve user experience, analyse site usage, and assist in our marketing efforts. <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>
                </p>
              </div>
              <div className="flex flex-row gap-2 min-w-fit">
                <button 
                  id="cookie-settings-btn"
                  className="px-4 py-2 text-xs md:text-sm border border-gray-600 hover:border-white text-white rounded transition-colors whitespace-nowrap"
                >
                  Privacy Settings
                </button>
                <button 
                  id="cookie-reject-btn"
                  className="px-4 py-2 text-xs md:text-sm border border-gray-600 hover:border-white text-white rounded transition-colors whitespace-nowrap"
                >
                  Reject
                </button>
                <button 
                  id="cookie-accept-btn"
                  className="px-4 py-2 text-xs md:text-sm bg-white hover:bg-gray-200 text-gray-900 rounded font-semibold transition-colors whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cookie Preference Center Modal */}
        <div id="cookie-modal" className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Cookie Preferences</h2>
                <button id="cookie-modal-close" className="text-white hover:text-gray-200 transition-colors">
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
              <p className="text-teal-100 text-sm mt-2">
                Choose which cookies you want to allow. You can change these settings at any time.
              </p>
            </div>
            
            {/* Modal Body - Scrollable */}
            <div className="overflow-y-auto flex-1 p-6">
              {/* Strictly Necessary Cookies - Always On */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-shield-alt text-teal-600"></i>
                      <h3 className="text-lg font-bold text-gray-800">Strictly Necessary</h3>
                      <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full font-semibold">Always Active</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Examples:</strong> Session cookies, security cookies, load balancing cookies
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative inline-block w-14 h-8 cursor-not-allowed opacity-50">
                      <input type="checkbox" id="cookie-necessary" checked disabled className="sr-only" />
                      <div className="bg-teal-600 w-14 h-8 rounded-full shadow-inner"></div>
                      <div className="absolute w-6 h-6 bg-white rounded-full shadow top-1 right-1 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Functional Cookies */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-cog text-blue-600"></i>
                      <h3 className="text-lg font-bold text-gray-800">Functional</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and quiz results.
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Examples:</strong> Preference cookies, language settings, quiz responses
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                      <input type="checkbox" id="cookie-functional" className="sr-only cookie-toggle" />
                      <div className="toggle-bg bg-gray-300 w-14 h-8 rounded-full shadow-inner transition-colors"></div>
                      <div className="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow top-1 left-1 transition-transform"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Performance Cookies */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-chart-line text-purple-600"></i>
                      <h3 className="text-lg font-bold text-gray-800">Performance & Analytics</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the user experience.
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Examples:</strong> Google Analytics, page view tracking, heatmaps
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                      <input type="checkbox" id="cookie-performance" className="sr-only cookie-toggle" />
                      <div className="toggle-bg bg-gray-300 w-14 h-8 rounded-full shadow-inner transition-colors"></div>
                      <div className="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow top-1 left-1 transition-transform"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Targeting Cookies */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-bullseye text-coral-500"></i>
                      <h3 className="text-lg font-bold text-gray-800">Targeting & Advertising</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      These cookies are used to deliver ads more relevant to you and your interests. They may also be used to limit the number of times you see an ad and measure the effectiveness of advertising campaigns.
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Examples:</strong> Facebook Pixel, Google Ads, retargeting cookies
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                      <input type="checkbox" id="cookie-targeting" className="sr-only cookie-toggle" />
                      <div className="toggle-bg bg-gray-300 w-14 h-8 rounded-full shadow-inner transition-colors"></div>
                      <div className="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow top-1 left-1 transition-transform"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Privacy Policy Link */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                <p className="text-xs text-gray-600">
                  <i className="fas fa-info-circle text-teal-600 mr-1"></i>
                  For more information about how we use cookies and protect your privacy, please read our 
                  <a href="/privacy" className="text-teal-600 hover:underline font-semibold ml-1">Privacy Policy</a>.
                </p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button 
                  id="cookie-modal-reject-all"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                >
                  Reject All
                </button>
                <button 
                  id="cookie-modal-accept-all"
                  className="px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
                >
                  Accept All
                </button>
                <button 
                  id="cookie-modal-confirm"
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                >
                  Confirm My Choices
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* JavaScript */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
