module.exports = {
  apps: [
    {
      name: "macprotec-api",
      cwd: "./apps/api",
      script: "dist/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "macprotec-web",
      cwd: "./apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1.5G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
