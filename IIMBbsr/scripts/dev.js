const os = require('os');
const { spawn } = require('child_process');

function getNetworkIp() {
  const nets = os.networkInterfaces();
  let fallback = null;
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      const isIpv4 = net.family === 'IPv4' || net.family === 4;
      if (isIpv4 && !net.internal) {
        if (!net.address.startsWith('169.254') && !net.address.startsWith('192.168.137.')) {
          return net.address;
        }
        if (!fallback) fallback = net.address;
      }
    }
  }
  return fallback || '127.0.0.1';
}

const ip = getNetworkIp();
const port = process.env.PORT || '3000';

console.log('\n\x1b[1m\x1b[34m=================================================================\x1b[0m');
console.log('\x1b[1m\x1b[32m  🚀 IIM BHUBANESWAR - LOCAL & NETWORK DEV SERVER\x1b[0m');
console.log('\x1b[1m\x1b[34m=================================================================\x1b[0m');
console.log(`  💻 \x1b[1mLocal URL:\x1b[0m     \x1b[36mhttp://localhost:${port}\x1b[0m`);
console.log(`  📱 \x1b[1mNetwork URL:\x1b[0m   \x1b[32m\x1b[1mhttp://${ip}:${port}\x1b[0m \x1b[33m(Open on your Mobile Phone)\x1b[0m`);
console.log(`  🔐 \x1b[1mAdmin Portal:\x1b[0m  \x1b[35mhttp://${ip}:${port}/admin\x1b[0m`);
console.log('\x1b[1m\x1b[34m=================================================================\x1b[0m\n');

const nextBin = require.resolve('next/dist/bin/next');

const child = spawn(
  process.execPath,
  [nextBin, 'dev', '-H', '0.0.0.0', '-p', String(port)],
  { stdio: 'inherit' }
);

child.on('exit', (code) => {
  process.exit(code || 0);
});
