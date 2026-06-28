const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const response = await fetch(`${url}/rest/v1/_ping?select=id&limit=1`, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
  },
});

if (!response.ok) {
  console.error(`Keep-alive ping failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

console.log('Keep-alive ping successful');
