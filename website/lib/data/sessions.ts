export interface SessionData {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  badge: string;
  culturalNote: { tradition: string; text: string };
  hookFact: string;
  learningPoints: { title: string; text: string; emoji: string }[];
  funFacts: string[];
  activities: { name: string; description: string; emoji: string }[];
  relatedModule: { href: string; label: string; emoji: string } | null;
}

export const sessions: SessionData[] = [
  {
    id: 1,
    title: "Meet the Honeybee",
    subtitle: "Anatomy of Apis mellifera and what makes honeybees special",
    emoji: "🔬",
    color: "from-amber-400 to-amber-600",
    badge: "Bee Spotter",
    culturalNote: {
      tradition: "Ancient Egypt",
      text: "The ancient Egyptians believed honeybees were born from the tears of the sun god Ra. Honey was used in medicine, embalming, and offerings to the gods. The bee was the symbol of Lower Egypt for over 3,000 years!",
    },
    hookFact: "A honeybee has 5 eyes, 6 legs, 4 wings, and a brain the size of a sesame seed — yet she can do math, navigate by the sun, and communicate through dance!",
    learningPoints: [
      { title: "Three Body Parts", emoji: "🐝", text: "Every honeybee has a head (with 5 eyes and antennae), a thorax (with 4 wings and 6 legs), and an abdomen (with the stinger, wax glands, and honey stomach). This three-part body plan is what makes her an insect." },
      { title: "Five Amazing Eyes", emoji: "👀", text: "Honeybees have 2 large compound eyes with 6,900 tiny lenses each — plus 3 simple eyes (ocelli) on top of their head for detecting light. They can see ultraviolet light that we can't!" },
      { title: "Pollen Baskets & Proboscis", emoji: "🧺", text: "The proboscis is a long straw-like tongue for sipping nectar. Pollen baskets (corbiculae) are concave areas on the back legs where bees pack pollen into neat little balls for the trip home." },
      { title: "The Barbed Stinger", emoji: "⚡", text: "Only female honeybees can sting, and they die after stinging because the barbed stinger pulls out. Queens have smooth stingers and can sting multiple times. Drones have no stinger at all!" },
    ],
    funFacts: [
      "A honeybee's wings beat 200 times per second — that's what makes the buzzing sound!",
      "Honeybees can fly at speeds up to 15 mph and visit 50-100 flowers per foraging trip.",
      "The queen bee can lay up to 2,000 eggs per day — that's one every 43 seconds!",
      "A single honeybee produces only 1/12th of a teaspoon of honey in her entire lifetime.",
    ],
    activities: [
      { name: "Life-Size Bee Model", emoji: "🎨", description: "Build a collaborative life-size honeybee model showing all anatomical features — compound eyes, proboscis, pollen baskets, wax glands, and barbed stinger!" },
      { name: "Microscope Station", emoji: "🔬", description: "Examine real bee parts under magnification — see branched hairs, compound eye lenses, and pollen grains up close!" },
      { name: "Worker, Drone, or Queen?", emoji: "🔍", description: "Compare the three castes side by side. Learn to identify each by size, eyes, and body shape — you'll need this skill at the hive!" },
    ],
    relatedModule: { href: "/hive", label: "Explore Inside a Langstroth Hive", emoji: "🏠" },
  },
  {
    id: 2,
    title: "The Waggle Dance & Bee Communication",
    subtitle: "How honeybees talk through dance, scent, and vibration",
    emoji: "💃",
    color: "from-purple-400 to-purple-600",
    badge: "Waggle Dancer",
    culturalNote: {
      tradition: "Nobel Prize Discovery",
      text: "Karl von Frisch spent 50 years studying honeybees before winning the Nobel Prize in 1973 for decoding the waggle dance. He proved that bees have a symbolic language — one of only a handful of non-human species to communicate this way!",
    },
    hookFact: "Honeybees encode exact flower locations into a dance — direction relative to the sun, distance, AND a quality rating — all on a dark honeycomb!",
    learningPoints: [
      { title: "The Waggle Dance", emoji: "💃", text: "A scout bee dances in a figure-8 on the comb. The angle of the straight 'waggle run' relative to straight up tells direction compared to the sun. The duration of the waggle tells distance. Longer waggle = farther flowers!" },
      { title: "Pheromone Signals", emoji: "👃", text: "The queen releases 'queen mandibular pheromone' that says 'I'm here and healthy.' Workers spread it through the hive mouth-to-mouth. If the queen's scent fades, workers know something is wrong and may raise a new queen." },
      { title: "Piping & Tooting", emoji: "🎵", text: "Virgin queens 'pipe' and 'toot' — vibration sounds that mean 'I'm here!' and 'Stay in your cell!' It's how rival queens communicate before one emerges to take over the colony." },
      { title: "The Alarm Signal", emoji: "🚨", text: "When a honeybee stings, she releases alarm pheromone (smells like bananas!) that marks the target and tells other bees 'danger here — attack!' This is why beekeepers use smoke — it masks the alarm scent." },
    ],
    funFacts: [
      "The alarm pheromone honeybees release is called isopentyl acetate — it smells like bananas!",
      "A dancing bee can recruit up to 100 foragers to a new flower source in minutes.",
      "Bees can transmit information about a flower patch 10 km away through dance alone.",
      "Honeybees also do a 'tremble dance' when the hive's nectar receivers are overwhelmed — it means 'we need more house bees!'",
    ],
    activities: [
      { name: "Human Waggle Dance", emoji: "🕺", description: "Become a scout bee! Communicate a hidden object's location to your team using only body movement and angle — no talking allowed!" },
      { name: "Pheromone Scavenger Hunt", emoji: "👃", description: "Follow scent trails (essential oils on cotton balls) to find hidden 'flower patches' — experience how bees use smell to navigate!" },
      { name: "Decode the Dance", emoji: "🧩", description: "Watch waggle dance animations and calculate where the flowers are using the sun's position and dance angle." },
    ],
    relatedModule: { href: "/waggle", label: "Try the Waggle Dance Simulator", emoji: "💃" },
  },
  {
    id: 3,
    title: "Suiting Up: Safety & Equipment",
    subtitle: "Your first lesson in beekeeping safety and the beekeeper's toolkit",
    emoji: "🧤",
    color: "from-green-400 to-green-600",
    badge: "Gear Pro",
    culturalNote: {
      tradition: "Medieval Beekeeping",
      text: "Medieval beekeepers (called 'bee masters') used woven straw skeps as hives and had no protective gear at all! They relied on calm handling and smoke from burning cow dung. Today's equipment makes beekeeping much safer and more humane for both bees and beekeepers.",
    },
    hookFact: "The beekeeper's smoker isn't magic — smoke triggers bees to gorge on honey (preparing to flee a 'fire'), which makes them too full to sting easily!",
    learningPoints: [
      { title: "The Bee Suit", emoji: "🧥", text: "A full bee suit has a zippered veil (so bees can't reach your face), elastic cuffs at wrists and ankles, and is light-colored (bees are calmer around light colors). Some beekeepers prefer just a jacket and veil!" },
      { title: "The Smoker", emoji: "💨", text: "The smoker burns natural fuel (pine needles, burlap, wood shavings) to produce cool white smoke. Smoke masks alarm pheromones AND triggers bees to eat honey. Full bees = calm bees. Never use hot or chemical smoke!" },
      { title: "The Hive Tool", emoji: "🔧", text: "Bees glue everything shut with propolis (bee glue). The hive tool is a flat metal bar used to pry apart frames, scrape propolis, and lever boxes apart. It's the beekeeper's most-used tool!" },
      { title: "Calm & Slow", emoji: "🧘", text: "The #1 safety rule: move slowly and calmly. Quick movements alarm bees. Stand to the side of the hive (not in front of the flight path). If a bee bumps you, stay still — she's investigating, not attacking." },
    ],
    funFacts: [
      "Beekeepers choose light-colored suits because dark colors remind bees of their natural predators (bears, skunks)!",
      "A well-lit smoker should produce cool, white smoke — if it's hot or has sparks, it needs more fuel.",
      "Propolis is so sticky that beekeepers joke their hive tools are permanently golden-brown!",
      "Some experienced beekeepers work their hives bare-handed — but they've been stung thousands of times and no longer swell up.",
    ],
    activities: [
      { name: "Suit-Up Relay Race", emoji: "🏃", description: "Teams race to properly don a full bee suit — veil zipped, gloves on, no gaps! Speed matters, but so does doing it right." },
      { name: "Light the Smoker", emoji: "🔥", description: "Learn to light, fuel, and maintain a smoker. Practice producing cool white puffs. This is a real skill every beekeeper needs!" },
      { name: "Hive Tool Handling", emoji: "🔧", description: "Practice prying apart frames, scraping propolis, and using the hive tool safely. Feel the real weight and learn the proper grip." },
    ],
    relatedModule: { href: "/adventure", label: "Play At the Apiary Adventure", emoji: "🧤" },
  },
  {
    id: 4,
    title: "Inside the Hive: Your First Inspection",
    subtitle: "Opening a Langstroth hive and reading the frames",
    emoji: "🔍",
    color: "from-orange-400 to-orange-600",
    badge: "Frame Reader",
    culturalNote: {
      tradition: "Lorenzo Langstroth (1851)",
      text: "Reverend Lorenzo Langstroth discovered 'bee space' — bees leave exactly 3/8 inch (9.5mm) gaps as walkways. Any smaller and they seal it with propolis; any larger and they fill it with comb. This insight led to the movable-frame hive that revolutionized beekeeping!",
    },
    hookFact: "A single Langstroth hive can hold 60,000-80,000 bees and produce over 60 pounds of honey in a good year!",
    learningPoints: [
      { title: "Hive Anatomy", emoji: "🏗️", text: "Bottom to top: screened bottom board, deep hive bodies (brood chamber), queen excluder, honey supers, inner cover, outer cover. Each box holds 10 frames. The brood nest is in the bottom boxes; honey storage is on top." },
      { title: "Reading Brood Frames", emoji: "🥚", text: "A healthy brood frame shows a rainbow pattern: eggs in the center (tiny rice grains), larvae (C-shaped grubs in milk), capped brood (tan caps), then pollen and honey arcs around the edges. Spotty patterns can mean trouble!" },
      { title: "Finding the Queen", emoji: "👑", text: "The queen is longer than workers with a pointed abdomen. Look for her in the brood area — she's usually surrounded by a circle of attendant bees facing her. Tip: mark her with a dot of paint so she's easier to find next time!" },
      { title: "Bee Space & Burr Comb", emoji: "📏", text: "Bees build comb in any gap larger than 3/8 inch. 'Burr comb' is extra comb built between frames or on top of boxes. It's messy but normal! The hive tool is essential for cleaning it up during inspections." },
    ],
    funFacts: [
      "Honeycomb cells are tilted at a 13-degree angle so honey doesn't drip out!",
      "It takes about 8 pounds of honey for bees to produce just 1 pound of beeswax.",
      "The hexagon is mathematically the most efficient shape for storage — bees figured this out millions of years before humans proved it!",
      "During a good nectar flow, bees can fill an entire honey super (about 30 lbs) in just one week.",
    ],
    activities: [
      { name: "Frame Reading Relay", emoji: "🖼️", description: "Teams examine real or photo frames and identify: eggs, larvae, capped brood, pollen, and capped honey. First team to correctly identify all five wins!" },
      { name: "Brood Pattern Bingo", emoji: "🎯", description: "Play bingo using brood frame photos — spot healthy patterns, spotty brood, queen cells, drone cells, and pollen stores." },
      { name: "Queen Spotting Challenge", emoji: "👑", description: "Timed challenge: find the queen in close-up hive photos. Start with obvious marked queens, progress to unmarked queens hiding among thousands of workers." },
    ],
    relatedModule: { href: "/hive", label: "Explore the Virtual Hive", emoji: "🏠" },
  },
  {
    id: 5,
    title: "The Colony: Workers, Drones & the Queen",
    subtitle: "The social structure and lifecycle of a honeybee colony",
    emoji: "👑",
    color: "from-blue-400 to-blue-600",
    badge: "Colony Expert",
    culturalNote: {
      tradition: "Celtic Tradition",
      text: "In Celtic cultures, people practiced 'telling the bees' — sharing important family news (births, deaths, marriages) with the hive. They believed bees were wise beings that would leave if not kept informed of family events.",
    },
    hookFact: "A honeybee colony is like a superorganism — no single bee can survive alone, but together 60,000 bees function as one intelligent being!",
    learningPoints: [
      { title: "The Queen's Life", emoji: "👑", text: "A queen develops from a regular egg fed exclusively royal jelly. She takes a mating flight at ~1 week old, mates with 15-20 drones mid-air, then spends her life laying eggs — up to 2,000/day for 2-5 years. She stores all the sperm she'll ever need from that single flight!" },
      { title: "Worker Progression", emoji: "👷", text: "Workers live ~6 weeks in summer and progress through jobs by age: cleaner (days 1-2), nurse (3-11), wax builder (12-17), guard (18-21), and finally forager (22+). It's like getting promoted every few days!" },
      { title: "The Drone's Purpose", emoji: "🐝", text: "Drones are the males — bigger, louder, with huge eyes for spotting queens mid-flight. Their only job is mating. They can't sting, can't forage, and can't make wax. In fall, workers evict drones to save food for winter!" },
      { title: "Supersedure & Swarming", emoji: "🔄", text: "If the queen weakens, workers build 'supersedure cells' to raise a replacement. If the colony is too crowded, the old queen leaves with half the bees (a swarm) while a new queen takes over. Swarming is bee reproduction at the colony level!" },
    ],
    funFacts: [
      "A queen bee mates at 200+ feet in the air during her mating flight — drones that can't fly that high don't get to mate!",
      "In winter, bees form a 'cluster' and vibrate their muscles to generate heat, keeping the center at 95°F even when it's below zero outside.",
      "Worker bees have barbed stingers, but the queen has a smooth stinger — she can sting repeatedly (but usually only stings rival queens).",
      "Drones that successfully mate die immediately — the mating act is literally their last act.",
    ],
    activities: [
      { name: "Colony Role-Play", emoji: "🎭", description: "Kids are assigned colony roles (queen, nurses, foragers, guards, drones) and act out a day in the hive — including a surprise 'bear attack' that tests the guards!" },
      { name: "Lifecycle Timeline", emoji: "📅", description: "Create a visual timeline showing the worker bee's progression from egg to forager, with key milestones and job changes at each stage." },
      { name: "Hive Democracy Debate", emoji: "🗳️", description: "Should the colony swarm or supersede? Teams argue for different colony decisions based on real scenarios — crowding, weak queen, disease threat." },
    ],
    relatedModule: { href: "/species", label: "Explore Honeybee Breeds", emoji: "🍯" },
  },
  {
    id: 6,
    title: "Honeybee Breeds Around the World",
    subtitle: "Italian, Carniolan, Russian, Buckfast — comparing honeybee subspecies",
    emoji: "🌍",
    color: "from-teal-400 to-teal-600",
    badge: "Breed Scholar",
    culturalNote: {
      tradition: "Brother Adam of Buckfast Abbey",
      text: "Brother Adam (Karl Kehrle) was a Benedictine monk who spent 70 years breeding honeybees at Buckfast Abbey in England. He traveled the world collecting bee genetics and created the famous Buckfast bee — prized for gentleness, productivity, and disease resistance.",
    },
    hookFact: "There are 29 recognized subspecies of Apis mellifera — each adapted to its local environment over thousands of years!",
    learningPoints: [
      { title: "Italian Bees", emoji: "🇮🇹", text: "Apis mellifera ligustica — the most popular bee worldwide! Golden-yellow color, gentle temperament, prolific egg-laying, excellent honey producers. Downside: they can eat through winter stores quickly because the queen keeps laying late." },
      { title: "Carniolan Bees", emoji: "🏔️", text: "Apis mellifera carnica — from the Alps of Slovenia/Austria. Dark gray with light bands. Extremely gentle, winter-hardy (small winter clusters save food), and explosive spring buildup. Perfect for cold climates!" },
      { title: "Russian Bees", emoji: "🇷🇺", text: "Bred from bees in Russia's Primorsky region that co-evolved with Varroa mites for 150+ years. They've developed natural mite resistance! More defensive than Italians, and they build queen cells constantly (which confuses new beekeepers)." },
      { title: "Buckfast Bees", emoji: "⛪", text: "A hybrid created by Brother Adam by crossing dozens of subspecies. Gentle, productive, good housekeepers, and resistant to tracheal mites. Not a true subspecies — they're a carefully maintained hybrid line." },
    ],
    funFacts: [
      "The German Dark Bee (Apis mellifera mellifera) was the original European honeybee, brought to North America by colonists in the 1600s.",
      "Africanized bees ('killer bees') are a hybrid of African and European bees that escaped from a Brazilian lab in 1957 — they're spreading north and are incredibly defensive.",
      "Cordovan bees are a color variant of Italian bees — they're bright golden-orange with no dark stripes at all!",
      "Some queen breeders instrument-inseminate queens with syringes to control exactly which drone genetics are passed on.",
    ],
    activities: [
      { name: "Breed Comparison Chart", emoji: "📊", description: "Fill in a comparison matrix rating each breed on gentleness, honey production, winter hardiness, mite resistance, and spring buildup." },
      { name: "Design Your Dream Bee", emoji: "✏️", description: "If you could breed the perfect honeybee, what traits would you pick? Draw and describe your ideal subspecies with explanations for each trait choice." },
      { name: "Breed Trading Card Game", emoji: "🃏", description: "Use the collector cards to play a stats-comparison game — pit breeds against each other in different categories!" },
    ],
    relatedModule: { href: "/species", label: "Explore the Breed Database", emoji: "🍯" },
  },
  {
    id: 7,
    title: "Hive Products & Honey Harvest",
    subtitle: "From nectar to jar — honey, beeswax, propolis, and royal jelly",
    emoji: "🍯",
    color: "from-amber-500 to-amber-700",
    badge: "Honey Scientist",
    culturalNote: {
      tradition: "Ancient World",
      text: "Honey is the only food produced by insects that humans eat. Ancient peoples used it as medicine, currency, and offerings to gods. Archaeologists found 3,000-year-old honey in Egyptian tombs that was still perfectly edible — honey truly never spoils!",
    },
    hookFact: "It takes 556 worker bees visiting 2 million flowers, flying 55,000 miles total, to make just ONE pound of honey!",
    learningPoints: [
      { title: "Nectar to Honey", emoji: "🍯", text: "1) Forager sips nectar into her honey stomach. 2) She passes it mouth-to-mouth to a house bee. 3) House bees add enzymes that break sucrose into glucose and fructose. 4) They spread it in thin layers on comb. 5) Fan it with wings (80% water down to 18%). 6) Cap it with beeswax — done!" },
      { title: "Beeswax Production", emoji: "🕯️", text: "Worker bees aged 12-17 days have special wax glands on their abdomen that secrete tiny wax scales. They chew and mold these into comb. It takes about 8 pounds of honey to produce just 1 pound of wax — it's precious stuff!" },
      { title: "Propolis: Bee Glue", emoji: "🧪", text: "Bees collect tree resins and mix them with wax and enzymes to create propolis — a sticky, antimicrobial substance. They coat the entire inside of the hive with it, seal cracks, and even mummify intruders (like mice!) that are too big to remove." },
      { title: "Royal Jelly", emoji: "✨", text: "All larvae eat royal jelly for the first 3 days. But only queen larvae keep eating it — this single dietary difference turns a regular egg into a queen! Royal jelly is packed with proteins, vitamins, and unique fatty acids." },
    ],
    funFacts: [
      "The color and flavor of honey depends entirely on which flowers the bees visited — clover honey is light and mild, buckwheat honey is dark and molasses-like!",
      "Honey is naturally antibacterial — its low water content, low pH, and hydrogen peroxide production kill bacteria. Medical-grade honey is used to treat wounds!",
      "Bees must visit about 2 million flowers and fly 55,000 miles to produce a single pound of honey.",
      "Propolis has been used medicinally for over 2,000 years — Hippocrates used it to heal sores, and it's still studied for its antimicrobial properties today.",
    ],
    activities: [
      { name: "Honey Extraction Demo", emoji: "🍯", description: "Watch (or participate in) a real honey extraction — uncapping frames, spinning in the extractor, straining, and jarring. Taste honey straight from the comb!" },
      { name: "Honey Tasting Lab", emoji: "🧪", description: "Blind taste-test 4-6 honey varieties (clover, wildflower, buckwheat, orange blossom) and guess the flower source. Compare colors, aromas, and flavors!" },
      { name: "Beeswax Candle Rolling", emoji: "🕯️", description: "Roll beautiful honeycomb-textured candles from real beeswax foundation sheets. The warm, sweet scent is amazing — and they're yours to keep!" },
    ],
    relatedModule: { href: "/pollination", label: "Play the Pollination Puzzle", emoji: "🌸" },
  },
  {
    id: 8,
    title: "Hive Health & Bee Stewardship",
    subtitle: "Protecting your bees — pests, diseases, and the young melittologist's pledge",
    emoji: "🛡️",
    color: "from-red-400 to-red-600",
    badge: "Hive Guardian",
    culturalNote: {
      tradition: "Modern Melittology",
      text: "Melittology is the scientific study of bees — from the Greek 'melitta' meaning bee. Today's melittologists use genetics, tracking technology, and citizen science to understand and protect honeybees. You're joining a tradition of bee scientists stretching back to Aristotle!",
    },
    hookFact: "Varroa destructor mites are the #1 threat to honeybees worldwide — they're like a tick the size of a dinner plate feeding on your blood, AND they spread deadly viruses!",
    learningPoints: [
      { title: "Varroa Mites", emoji: "🦠", text: "Varroa destructor is a parasitic mite that feeds on bee fat bodies and spreads deadly viruses (deformed wing virus, acute bee paralysis virus). Left untreated, a colony will collapse within 1-2 years. Monitoring and treating for Varroa is every beekeeper's #1 job!" },
      { title: "Small Hive Beetles", emoji: "🪲", text: "Small hive beetles (Aethina tumida) lay eggs in the hive. Their larvae tunnel through comb, eating honey, pollen, and brood — and their slime ferments the honey. Strong colonies can control them, but weak hives can be destroyed." },
      { title: "Integrated Pest Management", emoji: "🎯", text: "IPM means using multiple strategies together: monitoring mite levels (sugar roll or alcohol wash), cultural controls (brood breaks, drone frame trapping), organic treatments (oxalic acid, formic acid), and genetics (mite-resistant bee stocks)." },
      { title: "The Young Melittologist's Pledge", emoji: "🤝", text: "I pledge to monitor my hives regularly, treat responsibly when needed, keep learning about bee health, share my knowledge with others, and always remember: healthy bees depend on informed, caring beekeepers!" },
    ],
    funFacts: [
      "A single Varroa mite on a bee is equivalent (by body proportion) to a parasitic tick the size of a football attached to a human!",
      "American Foulbrood is so contagious that infected hive equipment must be burned — there's no cure, only prevention.",
      "The sugar roll test lets you count how many Varroa mites are in your hive by dusting bees with powdered sugar and shaking off the mites.",
      "Some honeybee colonies show 'Varroa Sensitive Hygiene' (VSH) — workers can detect and remove mite-infested pupae before the mites reproduce!",
    ],
    activities: [
      { name: "Varroa Mite Count Demo", emoji: "🔢", description: "Learn to perform a sugar roll test — dust 300 bees with powdered sugar, shake over a white tray, and count the mites. Calculate your mite percentage and decide: treat or wait?" },
      { name: "Disease ID Flash Cards", emoji: "🃏", description: "Study photos of common bee diseases and pests — American Foulbrood, European Foulbrood, chalkbrood, Varroa, hive beetles. Can you diagnose the problem?" },
      { name: "Graduation: Young Melittologist Pledge", emoji: "🎓", description: "Take the Young Melittologist's Pledge, receive your certificate with all 8 achievement badges, and commit to your first action as a bee steward!" },
    ],
    relatedModule: { href: "/citizen-science", label: "Start Your Hive Journal", emoji: "📓" },
  },
];

export function getSessionById(id: number): SessionData | undefined {
  return sessions.find((s) => s.id === id);
}
