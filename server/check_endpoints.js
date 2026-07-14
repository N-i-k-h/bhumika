

async function test() {
  const urls = [
    'http://localhost:5040/api/products',
    'http://localhost:5040/api/customers',
    'http://localhost:5040/api/certificates'
  ];
  
  for (const url of urls) {
    console.log("Fetching:", url);
    try {
      const res = await fetch(url);
      console.log("Status:", res.status);
      if (!res.ok) {
        const text = await res.text();
        console.log("Error body:", text);
      } else {
        const data = await res.json();
        console.log("Returned count:", data.length);
      }
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  }
}

test();
