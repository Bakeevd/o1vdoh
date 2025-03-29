module.exports = {
  apps: [
    {
      name: "app.vdohnovenie.pro",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      cwd: "/var/www/admin78/data/www/app.vdohnovenie.pro",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      },
      watch: false,
      max_memory_restart: "250M",
      restart_delay: 3000
    }
  ]
}; 