
// Event listener for incoming fetch events
addEventListener('fetch', (event, env) => {
    event.respondWith(handleRequest(event.request, env));
  });
  
  /**
   * Handle the incoming request and perform actions based on the HTTP method.
   * @param {Request} request
   */
  async function handleRequest(request, env) {
    if (request.method === 'GET') {
      // Handle GET requests for redirection
      return handleGetRequest(request, env);
    } else if (request.method === 'POST') {
      // Handle POST requests for storing URLs
      return handlePostRequest(request, env);
    } else {
      // Respond with an error for unsupported HTTP methods
      return new Response('Unsupported HTTP method.', { status: 405 });
    }
  }
  
  /**
   * Handle GET requests and redirect based on the KV store value.
   * @param {Request} request
   */
  async function handleGetRequest(request, env) {
    const urlPath = new URL(request.url).pathname.substring(1);
    const redirectUrl = await kv.get(urlPath);
  
    if (redirectUrl) {
      return Response.redirect(redirectUrl, 302);
    } else {
      return new Response('Not Found', { status: 404 });
    }
  }
  
  /**
   * Handle POST requests to store a URL in the KV store.
   * @param {Request} request
   */
  async function handlePostRequest(request, env) {
    try {
      // Parse JSON body
      const { key, url } = await request.json();
  
      // Validate the key and URL
      if (!key || !url) {
        return new Response('Invalid request body. Key and URL are required.', { status: 400 });
      }
      if (!isValidUrl(url)) {
        return new Response('Invalid URL.', { status: 400 });
      }
  
      // Check if the key already exists
      const existingValue = await kv.get(key);
      if (existingValue) {
        return new Response('Key already exists: '+ existingValue, { status: 409 });
      }
  
      // Store the URL in the KV store
      await kv.put(key, url);
      return new Response('URL stored successfully.', { status: 200 });
  
    } catch (err) {
      // Handle JSON parsing errors or other issues
      return new Response('Invalid request. Could not process.', { status: 400 });
    }
  }
  
  /**
   * Validate if a URL is well-formed.
   * @param {string} url
   */
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  