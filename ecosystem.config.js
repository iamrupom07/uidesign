module.exports = {
  apps: [
    {
      name: "macprotec-api",
      cwd: "./apps/api",
      script: "dist/server.js",
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
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
