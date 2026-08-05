module.exports = {
  apps: [
    {
      name: "macprotec-api",
      cwd: "./apps/api",
      script: "dist/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        HOST: "0.0.0.0",
      },
    },
    {
      name: "macprotec-web",
      cwd: "./apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
