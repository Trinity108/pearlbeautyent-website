import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Island-Proof Curls. Zero Crunch. | Caribbean Players by Pearl Beauty'}</title>
        <meta 
          name="description" 
          content="Natural ingredients meet salon results. Caribbean-made curl care that holds through humidity. Made in Trinidad & Tobago. Free US shipping $50+." 
        />
        <meta name="keywords" content="curly hair, humidity proof, Caribbean hair care, curl defining gel, anti-frizz, natural hair products" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title || 'Island-Proof Curls. Zero Crunch. | Caribbean Players'} />
        <meta property="og:description" content="Caribbean-made curl care tested in real heat and humidity. Define, moisturize & protect curls naturally." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/static/images/hero-curls.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || 'Island-Proof Curls by Caribbean Players'} />
        <meta name="twitter:description" content="Humidity-proof curl care made in the Caribbean, loved across the USA." />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        
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
                  <a href="#" className="text-gray-400 hover:text-coral-400 transition-colors">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-coral-400 transition-colors">
                    <i className="fab fa-facebook text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-coral-400 transition-colors">
                    <i className="fab fa-tiktok text-xl"></i>
                  </a>
                </div>
              </div>
              
              {/* Shop */}
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">All Products</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Curl Defining</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Moisture & Shine</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Starter Kits</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Take the Quiz</a></li>
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
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* JavaScript */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
