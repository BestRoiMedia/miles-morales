/**
 * Generate static sitemap.xml for service area pages
 * Only includes indexed pages (hub pages + city pages where indexCityPages is true)
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Import data (we'll need to read from the compiled JS or duplicate minimal data)
// For build-time, we can import from the source TypeScript via a simple data export
// Since this runs at build time, we'll duplicate the minimal data needed

const HUBS = [
  { slug: 'chambersburg-pa', indexCityPages: false },
  { slug: 'washington-dc', indexCityPages: false },
  { slug: 'baltimore-md', indexCityPages: false },
  { slug: 'philadelphia-pa', indexCityPages: false },
  { slug: 'pittsburgh-pa', indexCityPages: false },
];

const CITIES_BY_HUB = {
  'chambersburg-pa': [
    'waynesboro-pa', 'shippensburg-pa', 'greencastle-pa', 'mercersburg-pa', 'fayetteville-pa',
    'scotland-pa', 'marion-pa', 'saint-thomas-pa', 'newburg-pa', 'fort-loudon-pa',
    'mcconnellsburg-pa', 'carlisle-pa', 'hagerstown-md', 'williamsport-md', 'smithsburg-md',
    'thurmont-md', 'gettysburg-pa', 'orrtanna-pa', 'biglerville-pa', 'new-oxford-pa',
    'abbottstown-pa', 'york-springs-pa', 'dillsburg-pa', 'mechanicsburg-pa', 'boiling-springs-pa',
    'newville-pa', 'orrstown-pa', 'fannettsburg-pa', 'dry-run-pa', 'mont-alto-pa',
    'rouzerville-pa', 'blue-ridge-summit-pa', 'cascade-md', 'sabillasville-md', 'emmitsburg-md',
  ],
  'washington-dc': [
    'arlington-va', 'alexandria-va', 'bethesda-md', 'silver-spring-md', 'chevy-chase-md',
    'rockville-md', 'hyattsville-md', 'college-park-md', 'greenbelt-md', 'takoma-park-md',
    'falls-church-va', 'mclean-va', 'vienna-va', 'annandale-va', 'springfield-va',
    'capitol-heights-md', 'suitland-md', 'largo-md', 'oxon-hill-md', 'national-harbor-md',
    'fairfax-va', 'reston-va', 'herndon-va', 'sterling-va', 'leesburg-va',
    'ashburn-va', 'manassas-va', 'woodbridge-va', 'burke-va', 'centreville-va',
    'chantilly-va', 'dumfries-va', 'laurel-md', 'bowie-md', 'upper-marlboro-md',
    'waldorf-md', 'clinton-md', 'fort-washington-md', 'accokeek-md',
  ],
  'baltimore-md': [
    'towson-md', 'catonsville-md', 'ellicott-city-md', 'columbia-md', 'parkville-md',
    'dundalk-md', 'essex-md', 'middle-river-md', 'rosedale-md', 'glen-burnie-md',
    'linthicum-md', 'halethorpe-md', 'arbutus-md', 'pikesville-md', 'cockeysville-md',
    'randallstown-md', 'reisterstown-md', 'severn-md', 'pasadena-md', 'odenton-md',
    'millersville-md', 'severna-park-md', 'arnold-md', 'annapolis-md', 'edgewater-md',
    'crofton-md', 'gambrills-md', 'bel-air-md', 'aberdeen-md', 'havre-de-grace-md',
    'perry-hall-md', 'white-marsh-md', 'nottingham-md', 'timonium-md', 'lutherville-md',
    'hunt-valley-md', 'sparks-md', 'monkton-md',
  ],
  'philadelphia-pa': [
    'camden-nj', 'cherry-hill-nj', 'pennsauken-nj', 'collingswood-nj', 'haddonfield-nj',
    'deptford-nj', 'bala-cynwyd-pa', 'ardmore-pa', 'upper-darby-pa', 'drexel-hill-pa',
    'springfield-pa', 'media-pa', 'bensalem-pa', 'jenkintown-pa', 'glenside-pa',
    'abington-pa', 'conshohocken-pa', 'king-of-prussia-pa', 'norristown-pa', 'west-chester-pa',
    'malvern-pa', 'wayne-pa', 'radnor-pa', 'bryn-mawr-pa', 'narberth-pa',
    'wynnewood-pa', 'merion-pa', 'overbrook-pa', 'yeadon-pa', 'lansdowne-pa',
    'darby-pa', 'sharon-hill-pa', 'folcroft-pa', 'ridley-park-pa', 'swarthmore-pa',
    'wallingford-pa', 'chester-pa', 'marcus-hook-pa', 'essington-pa', 'tinicum-pa',
  ],
  'pittsburgh-pa': [
    'mount-lebanon-pa', 'bethel-park-pa', 'upper-st-clair-pa', 'dormont-pa', 'brentwood-pa',
    'baldwin-pa', 'penn-hills-pa', 'monroeville-pa', 'wilkinsburg-pa', 'carnegie-pa',
    'crafton-pa', 'robinson-township-pa', 'moon-township-pa', 'west-mifflin-pa', 'homestead-pa',
    'mckeesport-pa', 'allison-park-pa', 'shaler-pa', 'ross-township-pa', 'mccandless-pa',
    'franklin-park-pa', 'sewickley-pa', 'leetsdale-pa', 'edgeworth-pa', 'oakmont-pa',
    'plum-pa', 'murrysville-pa', 'white-oak-pa', 'north-versailles-pa', 'turtle-creek-pa',
    'swissvale-pa', 'forest-hills-pa', 'braddock-pa', 'duquesne-pa', 'glassport-pa',
    'elizabeth-pa', 'clairton-pa', 'jefferson-hills-pa', 'pleasant-hills-pa',
  ],
};

const BASE_URL = 'https://djmilesmorales.com';

function generateSitemap() {
  const urls = [];
  
  // Add index page
  urls.push({
    loc: `${BASE_URL}/service-areas`,
    changefreq: 'monthly',
    priority: '0.8',
  });
  
  // Add hub pages
  for (const hub of HUBS) {
    urls.push({
      loc: `${BASE_URL}/service-areas/${hub.slug}`,
      changefreq: 'monthly',
      priority: '0.9',
    });
    
    // Add city pages only if indexCityPages is true
    if (hub.indexCityPages === true) {
      const cities = CITIES_BY_HUB[hub.slug] || [];
      for (const citySlug of cities) {
        urls.push({
          loc: `${BASE_URL}/service-areas/${hub.slug}/${citySlug}`,
          changefreq: 'monthly',
          priority: '0.7',
        });
      }
    }
  }
  
  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Write to public directory
  const outputPath = join(rootDir, 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf8');
  
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
  console.log(`   - Index: 1`);
  console.log(`   - Hubs: ${HUBS.length}`);
  console.log(`   - Cities: ${urls.length - 1 - HUBS.length}`);
}

generateSitemap();

