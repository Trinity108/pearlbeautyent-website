// PM2 configuration for Pearl Beauty development server
module.exports = {
  apps: [
    {
      name: 'pearl-beauty',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false, // Disable PM2 file monitoring (wrangler handles hot reload)
      instances: 1, // Development mode uses only one instance
      exec_mode: 'fork',
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '150M'
    }
  ]
}