module.exports = {
    apps: [{
        name: 'API',
        script: 'build/main.js',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        args: '--env production',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],
    deploy: {
        production: {
            user: '',
            port: "",
            host: '',
            ref: 'origin/master',
            repo: '',
            path: '/server/client-apps/taobao-node-flush',
            'post-deploy': 'yarn && pm2 reload ecosystem.config.js --env production'
        }
    }
};
