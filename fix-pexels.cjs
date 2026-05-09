const fs = require('fs');

const file = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const mappings = [
  { test: /صنوبر|كاجو|فول سوداني|عين جمل|بذور|كتان|كينوا|سيليوم/, img: 'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /عصير|قصب السكر|برتقال|كيوي|ليمون|أفوكادو|بابايا/, img: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /ايسكريم|شوكولاتة/, img: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /سمن|مشمش/, img: 'https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /محشي|كوسا|باذنجان|فلفل|بصل|ثوم|خيار|جزر|بروكلي|خضار|سلطة/, img: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /كولا|بيبسي|مياه غازية|مشروبات الطاقة|ستينج|هايب/, img: 'https://images.pexels.com/photos/4389665/pexels-photo-4389665.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /حلويات|كنافة|زلابيا|جولاش|بقلاوة|كوكيز|بسكوت|دايجستف|بيتي فور|هوهوز|توينكيز|ساندويتش|فلمنجو|معمول/, img: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /كرواسون|بيتزا|بلدي|شامي|سوري|صاج|رقاق|فينو|فرنسي|كايزر|دقيق|باتيه|باتون|بقصومات|شمس|فطير|رايس كيك|سامبوسك|كنيلوني|ميني/, img: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /جبن|قريش|بيضا|أجبان|لبنة/, img: 'https://images.pexels.com/photos/824631/pexels-photo-824631.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /لبن|بودرة|زبادي/, img: 'https://images.pexels.com/photos/5946654/pexels-photo-5946654.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /أمستل|بيرل|الشعير/, img: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /شاي/, img: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { test: /مياه قلوية/, img: 'https://images.pexels.com/photos/1451124/pexels-photo-1451124.jpeg?auto=compress&cs=tinysrgb&w=400' }
];

const fixImages = (arr) => {
  arr.forEach(p => {
    // If it's missing, or it's an unsplash link (which is returning 404)
    if (!p.image || p.image.trim() === '' || p.image.includes('unsplash.com')) {
      let matched = false;
      for (const m of mappings) {
        if (m.test.test(p.name)) {
          p.image = m.img;
          matched = true;
          break;
        }
      }
      if (!matched) {
        p.image = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'; // Generic food
      }
    }
  });
};

fixImages(data.allowed);
fixImages(data.forbidden);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Replaced all broken Unsplash and missing images with 100% reliable Pexels images.');
