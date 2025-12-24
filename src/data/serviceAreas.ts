/**
 * Service Area Data
 * Hub cities and their nearby cities within ~20-mile radius
 */

export interface Hub {
  name: string;
  state: string;
  slug: string;
  latitude: number;
  longitude: number;
  introCopy: string;
  indexCityPages?: boolean; // If true, city pages are indexed; default false
  hubSpecificNotes?: {
    travelNote?: string; // 1-2 sentences about travel/setup
    venueNote?: string; // 1-2 sentences about popular venues
    neighborhoodNote?: string; // 1-2 sentences about neighborhoods/areas
  };
}

export interface City {
  name: string;
  state: string;
  slug: string;
}

export const HUBS: Hub[] = [
  {
    name: 'Chambersburg',
    state: 'PA',
    slug: 'chambersburg-pa',
    latitude: 39.9376,
    longitude: -77.6611,
    introCopy: 'Based in Chambersburg, PA, DJ Miles Morales brings professional DJ services to the heart of south-central Pennsylvania.',
    indexCityPages: false,
    hubSpecificNotes: {
      travelNote: 'We typically travel within approximately 20 miles of Chambersburg, including areas like Waynesboro, Shippensburg, and Gettysburg. Setup time is usually 60-90 minutes before your event.',
      venueNote: 'Popular venues in the Chambersburg area include historic barns, community centers, and outdoor event spaces. We\'re familiar with local venues and their sound requirements.',
      neighborhoodNote: 'Serving the greater Franklin County area, including rural communities and small towns throughout south-central Pennsylvania.',
    },
  },
  {
    name: 'Washington',
    state: 'DC',
    slug: 'washington-dc',
    latitude: 38.9072,
    longitude: -77.0369,
    introCopy: 'Serving the Washington, DC metro area with premium DJ services for weddings, corporate events, and private celebrations.',
    indexCityPages: false,
    hubSpecificNotes: {
      travelNote: 'We serve the entire DC metro area, including Northern Virginia and Maryland suburbs within about 20 miles. Traffic considerations are factored into our setup timeline.',
      venueNote: 'DC is home to many prestigious venues, from historic hotels to modern event spaces. We\'ve worked at venues throughout the District and surrounding areas.',
      neighborhoodNote: 'Serving neighborhoods from Georgetown to Capitol Hill, and extending into Arlington, Alexandria, Bethesda, and Silver Spring.',
    },
  },
  {
    name: 'Baltimore',
    state: 'MD',
    slug: 'baltimore-md',
    latitude: 39.2904,
    longitude: -76.6122,
    introCopy: 'Professional DJ services throughout the Baltimore metro area, from intimate gatherings to large-scale corporate events.',
    indexCityPages: false,
    hubSpecificNotes: {
      travelNote: 'We cover Baltimore and surrounding communities within approximately 20 miles, including Towson, Columbia, and Annapolis. Setup typically takes 60-90 minutes.',
      venueNote: 'Baltimore offers diverse venues from waterfront locations to historic buildings. We\'re experienced with venues throughout the Inner Harbor and surrounding neighborhoods.',
      neighborhoodNote: 'Serving Baltimore City and County, including areas like Fells Point, Federal Hill, Canton, and extending to nearby suburbs.',
    },
  },
  {
    name: 'Philadelphia',
    state: 'PA',
    slug: 'philadelphia-pa',
    latitude: 39.9526,
    longitude: -75.1652,
    introCopy: 'Bringing high-energy DJ services to Philadelphia and surrounding communities for weddings, parties, and corporate events.',
    indexCityPages: false,
    hubSpecificNotes: {
      travelNote: 'We serve Philadelphia and surrounding suburbs within about 20 miles, including areas in both Pennsylvania and New Jersey. Parking and venue access are considered in our planning.',
      venueNote: 'Philadelphia boasts a mix of historic venues, modern event spaces, and unique locations. We\'re familiar with venues throughout Center City and the surrounding region.',
      neighborhoodNote: 'Serving Center City, University City, Old City, and extending to suburbs like King of Prussia, Conshohocken, and Cherry Hill, NJ.',
    },
  },
  {
    name: 'Pittsburgh',
    state: 'PA',
    slug: 'pittsburgh-pa',
    latitude: 40.4406,
    longitude: -79.9959,
    introCopy: 'Professional DJ services for Pittsburgh-area events, from weddings to corporate galas and everything in between.',
    indexCityPages: false,
    hubSpecificNotes: {
      travelNote: 'We cover Pittsburgh and surrounding communities within approximately 20 miles, including areas like Mount Lebanon, Bethel Park, and Monroeville. Setup time accounts for Pittsburgh\'s unique geography.',
      venueNote: 'Pittsburgh offers diverse venues from industrial spaces to elegant ballrooms. We\'ve worked at venues throughout the city and surrounding suburbs.',
      neighborhoodNote: 'Serving neighborhoods from Downtown to the South Hills, North Hills, and East End, including areas like Shadyside, Squirrel Hill, and Lawrenceville.',
    },
  },
];

export const CITIES_BY_HUB: Record<string, City[]> = {
  'chambersburg-pa': [
    { name: 'Waynesboro', state: 'PA', slug: 'waynesboro-pa' },
    { name: 'Shippensburg', state: 'PA', slug: 'shippensburg-pa' },
    { name: 'Greencastle', state: 'PA', slug: 'greencastle-pa' },
    { name: 'Mercersburg', state: 'PA', slug: 'mercersburg-pa' },
    { name: 'Fayetteville', state: 'PA', slug: 'fayetteville-pa' },
    { name: 'Scotland', state: 'PA', slug: 'scotland-pa' },
    { name: 'Marion', state: 'PA', slug: 'marion-pa' },
    { name: 'Saint Thomas', state: 'PA', slug: 'saint-thomas-pa' },
    { name: 'Newburg', state: 'PA', slug: 'newburg-pa' },
    { name: 'Fort Loudon', state: 'PA', slug: 'fort-loudon-pa' },
    { name: 'McConnellsburg', state: 'PA', slug: 'mcconnellsburg-pa' },
    { name: 'Carlisle', state: 'PA', slug: 'carlisle-pa' },
    { name: 'Hagerstown', state: 'MD', slug: 'hagerstown-md' },
    { name: 'Williamsport', state: 'MD', slug: 'williamsport-md' },
    { name: 'Smithsburg', state: 'MD', slug: 'smithsburg-md' },
    { name: 'Thurmont', state: 'MD', slug: 'thurmont-md' },
    { name: 'Gettysburg', state: 'PA', slug: 'gettysburg-pa' },
    { name: 'Orrtanna', state: 'PA', slug: 'orrtanna-pa' },
    { name: 'Biglerville', state: 'PA', slug: 'biglerville-pa' },
    { name: 'New Oxford', state: 'PA', slug: 'new-oxford-pa' },
    { name: 'Abbottstown', state: 'PA', slug: 'abbottstown-pa' },
    { name: 'York Springs', state: 'PA', slug: 'york-springs-pa' },
    { name: 'Dillsburg', state: 'PA', slug: 'dillsburg-pa' },
    { name: 'Mechanicsburg', state: 'PA', slug: 'mechanicsburg-pa' },
    { name: 'Boiling Springs', state: 'PA', slug: 'boiling-springs-pa' },
    { name: 'Newville', state: 'PA', slug: 'newville-pa' },
    { name: 'Orrstown', state: 'PA', slug: 'orrstown-pa' },
    { name: 'Fannettsburg', state: 'PA', slug: 'fannettsburg-pa' },
    { name: 'Dry Run', state: 'PA', slug: 'dry-run-pa' },
    { name: 'Mont Alto', state: 'PA', slug: 'mont-alto-pa' },
    { name: 'Rouzerville', state: 'PA', slug: 'rouzerville-pa' },
    { name: 'Blue Ridge Summit', state: 'PA', slug: 'blue-ridge-summit-pa' },
    { name: 'Cascade', state: 'MD', slug: 'cascade-md' },
    { name: 'Sabillasville', state: 'MD', slug: 'sabillasville-md' },
    { name: 'Emmitsburg', state: 'MD', slug: 'emmitsburg-md' },
  ],
  'washington-dc': [
    { name: 'Arlington', state: 'VA', slug: 'arlington-va' },
    { name: 'Alexandria', state: 'VA', slug: 'alexandria-va' },
    { name: 'Bethesda', state: 'MD', slug: 'bethesda-md' },
    { name: 'Silver Spring', state: 'MD', slug: 'silver-spring-md' },
    { name: 'Chevy Chase', state: 'MD', slug: 'chevy-chase-md' },
    { name: 'Rockville', state: 'MD', slug: 'rockville-md' },
    { name: 'Hyattsville', state: 'MD', slug: 'hyattsville-md' },
    { name: 'College Park', state: 'MD', slug: 'college-park-md' },
    { name: 'Greenbelt', state: 'MD', slug: 'greenbelt-md' },
    { name: 'Takoma Park', state: 'MD', slug: 'takoma-park-md' },
    { name: 'Falls Church', state: 'VA', slug: 'falls-church-va' },
    { name: 'McLean', state: 'VA', slug: 'mclean-va' },
    { name: 'Vienna', state: 'VA', slug: 'vienna-va' },
    { name: 'Annandale', state: 'VA', slug: 'annandale-va' },
    { name: 'Springfield', state: 'VA', slug: 'springfield-va' },
    { name: 'Capitol Heights', state: 'MD', slug: 'capitol-heights-md' },
    { name: 'Suitland', state: 'MD', slug: 'suitland-md' },
    { name: 'Largo', state: 'MD', slug: 'largo-md' },
    { name: 'Oxon Hill', state: 'MD', slug: 'oxon-hill-md' },
    { name: 'National Harbor', state: 'MD', slug: 'national-harbor-md' },
    { name: 'Fairfax', state: 'VA', slug: 'fairfax-va' },
    { name: 'Reston', state: 'VA', slug: 'reston-va' },
    { name: 'Herndon', state: 'VA', slug: 'herndon-va' },
    { name: 'Sterling', state: 'VA', slug: 'sterling-va' },
    { name: 'Leesburg', state: 'VA', slug: 'leesburg-va' },
    { name: 'Ashburn', state: 'VA', slug: 'ashburn-va' },
    { name: 'Manassas', state: 'VA', slug: 'manassas-va' },
    { name: 'Woodbridge', state: 'VA', slug: 'woodbridge-va' },
    { name: 'Burke', state: 'VA', slug: 'burke-va' },
    { name: 'Centreville', state: 'VA', slug: 'centreville-va' },
    { name: 'Chantilly', state: 'VA', slug: 'chantilly-va' },
    { name: 'Dumfries', state: 'VA', slug: 'dumfries-va' },
    { name: 'Laurel', state: 'MD', slug: 'laurel-md' },
    { name: 'Bowie', state: 'MD', slug: 'bowie-md' },
    { name: 'Upper Marlboro', state: 'MD', slug: 'upper-marlboro-md' },
    { name: 'Waldorf', state: 'MD', slug: 'waldorf-md' },
    { name: 'Clinton', state: 'MD', slug: 'clinton-md' },
    { name: 'Fort Washington', state: 'MD', slug: 'fort-washington-md' },
    { name: 'Accokeek', state: 'MD', slug: 'accokeek-md' },
  ],
  'baltimore-md': [
    { name: 'Towson', state: 'MD', slug: 'towson-md' },
    { name: 'Catonsville', state: 'MD', slug: 'catonsville-md' },
    { name: 'Ellicott City', state: 'MD', slug: 'ellicott-city-md' },
    { name: 'Columbia', state: 'MD', slug: 'columbia-md' },
    { name: 'Parkville', state: 'MD', slug: 'parkville-md' },
    { name: 'Dundalk', state: 'MD', slug: 'dundalk-md' },
    { name: 'Essex', state: 'MD', slug: 'essex-md' },
    { name: 'Middle River', state: 'MD', slug: 'middle-river-md' },
    { name: 'Rosedale', state: 'MD', slug: 'rosedale-md' },
    { name: 'Glen Burnie', state: 'MD', slug: 'glen-burnie-md' },
    { name: 'Linthicum', state: 'MD', slug: 'linthicum-md' },
    { name: 'Halethorpe', state: 'MD', slug: 'halethorpe-md' },
    { name: 'Arbutus', state: 'MD', slug: 'arbutus-md' },
    { name: 'Pikesville', state: 'MD', slug: 'pikesville-md' },
    { name: 'Cockeysville', state: 'MD', slug: 'cockeysville-md' },
    { name: 'Randallstown', state: 'MD', slug: 'randallstown-md' },
    { name: 'Reisterstown', state: 'MD', slug: 'reisterstown-md' },
    { name: 'Severn', state: 'MD', slug: 'severn-md' },
    { name: 'Pasadena', state: 'MD', slug: 'pasadena-md' },
    { name: 'Odenton', state: 'MD', slug: 'odenton-md' },
    { name: 'Millersville', state: 'MD', slug: 'millersville-md' },
    { name: 'Severna Park', state: 'MD', slug: 'severna-park-md' },
    { name: 'Arnold', state: 'MD', slug: 'arnold-md' },
    { name: 'Annapolis', state: 'MD', slug: 'annapolis-md' },
    { name: 'Edgewater', state: 'MD', slug: 'edgewater-md' },
    { name: 'Crofton', state: 'MD', slug: 'crofton-md' },
    { name: 'Gambrills', state: 'MD', slug: 'gambrills-md' },
    { name: 'Bel Air', state: 'MD', slug: 'bel-air-md' },
    { name: 'Aberdeen', state: 'MD', slug: 'aberdeen-md' },
    { name: 'Havre de Grace', state: 'MD', slug: 'havre-de-grace-md' },
    { name: 'Perry Hall', state: 'MD', slug: 'perry-hall-md' },
    { name: 'White Marsh', state: 'MD', slug: 'white-marsh-md' },
    { name: 'Nottingham', state: 'MD', slug: 'nottingham-md' },
    { name: 'Timonium', state: 'MD', slug: 'timonium-md' },
    { name: 'Lutherville', state: 'MD', slug: 'lutherville-md' },
    { name: 'Hunt Valley', state: 'MD', slug: 'hunt-valley-md' },
    { name: 'Sparks', state: 'MD', slug: 'sparks-md' },
    { name: 'Monkton', state: 'MD', slug: 'monkton-md' },
  ],
  'philadelphia-pa': [
    { name: 'Camden', state: 'NJ', slug: 'camden-nj' },
    { name: 'Cherry Hill', state: 'NJ', slug: 'cherry-hill-nj' },
    { name: 'Pennsauken', state: 'NJ', slug: 'pennsauken-nj' },
    { name: 'Collingswood', state: 'NJ', slug: 'collingswood-nj' },
    { name: 'Haddonfield', state: 'NJ', slug: 'haddonfield-nj' },
    { name: 'Deptford', state: 'NJ', slug: 'deptford-nj' },
    { name: 'Bala Cynwyd', state: 'PA', slug: 'bala-cynwyd-pa' },
    { name: 'Ardmore', state: 'PA', slug: 'ardmore-pa' },
    { name: 'Upper Darby', state: 'PA', slug: 'upper-darby-pa' },
    { name: 'Drexel Hill', state: 'PA', slug: 'drexel-hill-pa' },
    { name: 'Springfield', state: 'PA', slug: 'springfield-pa' },
    { name: 'Media', state: 'PA', slug: 'media-pa' },
    { name: 'Bensalem', state: 'PA', slug: 'bensalem-pa' },
    { name: 'Jenkintown', state: 'PA', slug: 'jenkintown-pa' },
    { name: 'Glenside', state: 'PA', slug: 'glenside-pa' },
    { name: 'Abington', state: 'PA', slug: 'abington-pa' },
    { name: 'Conshohocken', state: 'PA', slug: 'conshohocken-pa' },
    { name: 'King of Prussia', state: 'PA', slug: 'king-of-prussia-pa' },
    { name: 'Norristown', state: 'PA', slug: 'norristown-pa' },
    { name: 'West Chester', state: 'PA', slug: 'west-chester-pa' },
    { name: 'Malvern', state: 'PA', slug: 'malvern-pa' },
    { name: 'Wayne', state: 'PA', slug: 'wayne-pa' },
    { name: 'Radnor', state: 'PA', slug: 'radnor-pa' },
    { name: 'Bryn Mawr', state: 'PA', slug: 'bryn-mawr-pa' },
    { name: 'Narberth', state: 'PA', slug: 'narberth-pa' },
    { name: 'Wynnewood', state: 'PA', slug: 'wynnewood-pa' },
    { name: 'Merion', state: 'PA', slug: 'merion-pa' },
    { name: 'Overbrook', state: 'PA', slug: 'overbrook-pa' },
    { name: 'Yeadon', state: 'PA', slug: 'yeadon-pa' },
    { name: 'Lansdowne', state: 'PA', slug: 'lansdowne-pa' },
    { name: 'Darby', state: 'PA', slug: 'darby-pa' },
    { name: 'Sharon Hill', state: 'PA', slug: 'sharon-hill-pa' },
    { name: 'Folcroft', state: 'PA', slug: 'folcroft-pa' },
    { name: 'Ridley Park', state: 'PA', slug: 'ridley-park-pa' },
    { name: 'Swarthmore', state: 'PA', slug: 'swarthmore-pa' },
    { name: 'Wallingford', state: 'PA', slug: 'wallingford-pa' },
    { name: 'Chester', state: 'PA', slug: 'chester-pa' },
    { name: 'Marcus Hook', state: 'PA', slug: 'marcus-hook-pa' },
    { name: 'Essington', state: 'PA', slug: 'essington-pa' },
    { name: 'Tinicum', state: 'PA', slug: 'tinicum-pa' },
  ],
  'pittsburgh-pa': [
    { name: 'Mount Lebanon', state: 'PA', slug: 'mount-lebanon-pa' },
    { name: 'Bethel Park', state: 'PA', slug: 'bethel-park-pa' },
    { name: 'Upper St Clair', state: 'PA', slug: 'upper-st-clair-pa' },
    { name: 'Dormont', state: 'PA', slug: 'dormont-pa' },
    { name: 'Brentwood', state: 'PA', slug: 'brentwood-pa' },
    { name: 'Baldwin', state: 'PA', slug: 'baldwin-pa' },
    { name: 'Penn Hills', state: 'PA', slug: 'penn-hills-pa' },
    { name: 'Monroeville', state: 'PA', slug: 'monroeville-pa' },
    { name: 'Wilkinsburg', state: 'PA', slug: 'wilkinsburg-pa' },
    { name: 'Carnegie', state: 'PA', slug: 'carnegie-pa' },
    { name: 'Crafton', state: 'PA', slug: 'crafton-pa' },
    { name: 'Robinson Township', state: 'PA', slug: 'robinson-township-pa' },
    { name: 'Moon Township', state: 'PA', slug: 'moon-township-pa' },
    { name: 'West Mifflin', state: 'PA', slug: 'west-mifflin-pa' },
    { name: 'Homestead', state: 'PA', slug: 'homestead-pa' },
    { name: 'McKeesport', state: 'PA', slug: 'mckeesport-pa' },
    { name: 'Allison Park', state: 'PA', slug: 'allison-park-pa' },
    { name: 'Shaler', state: 'PA', slug: 'shaler-pa' },
    { name: 'Ross Township', state: 'PA', slug: 'ross-township-pa' },
    { name: 'McCandless', state: 'PA', slug: 'mccandless-pa' },
    { name: 'Franklin Park', state: 'PA', slug: 'franklin-park-pa' },
    { name: 'Sewickley', state: 'PA', slug: 'sewickley-pa' },
    { name: 'Leetsdale', state: 'PA', slug: 'leetsdale-pa' },
    { name: 'Edgeworth', state: 'PA', slug: 'edgeworth-pa' },
    { name: 'Oakmont', state: 'PA', slug: 'oakmont-pa' },
    { name: 'Plum', state: 'PA', slug: 'plum-pa' },
    { name: 'Murrysville', state: 'PA', slug: 'murrysville-pa' },
    { name: 'White Oak', state: 'PA', slug: 'white-oak-pa' },
    { name: 'North Versailles', state: 'PA', slug: 'north-versailles-pa' },
    { name: 'Turtle Creek', state: 'PA', slug: 'turtle-creek-pa' },
    { name: 'Swissvale', state: 'PA', slug: 'swissvale-pa' },
    { name: 'Forest Hills', state: 'PA', slug: 'forest-hills-pa' },
    { name: 'Braddock', state: 'PA', slug: 'braddock-pa' },
    { name: 'Duquesne', state: 'PA', slug: 'duquesne-pa' },
    { name: 'Glassport', state: 'PA', slug: 'glassport-pa' },
    { name: 'Elizabeth', state: 'PA', slug: 'elizabeth-pa' },
    { name: 'Clairton', state: 'PA', slug: 'clairton-pa' },
    { name: 'Jefferson Hills', state: 'PA', slug: 'jefferson-hills-pa' },
    { name: 'Pleasant Hills', state: 'PA', slug: 'pleasant-hills-pa' },
  ],
};

/**
 * Get hub by slug
 */
export function getHubBySlug(slug: string): Hub | undefined {
  return HUBS.find((hub) => hub.slug === slug);
}

/**
 * Get cities for a hub
 */
export function getCitiesByHub(hubSlug: string): City[] {
  return CITIES_BY_HUB[hubSlug] || [];
}

/**
 * Get city by slug and hub
 */
export function getCityBySlug(hubSlug: string, citySlug: string): City | undefined {
  const cities = getCitiesByHub(hubSlug);
  return cities.find((city) => city.slug === citySlug);
}

/**
 * Get all hub slugs
 */
export function getAllHubSlugs(): string[] {
  return HUBS.map((hub) => hub.slug);
}

/**
 * Get all city slugs for a hub
 */
export function getAllCitySlugsForHub(hubSlug: string): string[] {
  return getCitiesByHub(hubSlug).map((city) => city.slug);
}

