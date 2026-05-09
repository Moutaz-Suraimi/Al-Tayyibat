const fs = require('fs');
const { image_search } = require('duckduckgo-images-api');

const file = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updateImages = async () => {
  for (let i = 0; i < data.forbidden.length; i++) {
    const product = data.forbidden[i];
    try {
      // Remove symbols and generic words for better search
      let q = product.name.replace(/[\/\-\(\)\\\.]/g, ' ').replace(/بكل انواعه|و مشتقاته/g, '').trim();
      let results = await image_search({ query: q + " منتج", moderate: true });
      if (!results || results.length === 0) {
        results = await image_search({ query: q, moderate: true });
      }
      
      if (results && results.length > 0) {
        product.image = results[0].image;
        console.log(`Updated ${product.name} => ${results[0].image}`);
      } else {
        console.log(`No image found for ${product.name}`);
      }
    } catch (e) {
      console.log(`Error searching ${product.name}: ${e.message}`);
    }
    // Small delay to prevent rate limit
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Finished updating forbidden images!');
};

updateImages();
