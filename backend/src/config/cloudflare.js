// Environment variables
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Check if environment variables are set
if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
  console.error('❌ Missing environment variables:');
  console.error('CLOUDFLARE_ACCOUNT_ID:', CLOUDFLARE_ACCOUNT_ID ? 'Set' : 'Missing');
  console.error('CLOUDFLARE_API_TOKEN:', CLOUDFLARE_API_TOKEN ? 'Set' : 'Missing');
}

// Available free models on Cloudflare
const MODELS = {
  'stable-diffusion': '@cf/stabilityai/stable-diffusion-xl-base-1.0',
  'dreamshaper': '@cf/lykon/dreamshaper-8-lcm',
  'flux-schnell': '@cf/black-forest-labs/flux-1-schnell'
};

module.exports = {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN,
  MODELS
};
