// 120 wine facts — 20 per category

export const categoryMeta = {
  history: { label: "History" },
  regions: { label: "Regions" },
  technique: { label: "Technique" },
  tasting: { label: "Tasting" },
  grapes: { label: "Grape Varieties" },
  funfacts: { label: "Fun Facts" },
};

export const facts = [
  // ═══ HISTORY (20) ═══
  { id: 1, category: "history", title: "The Oldest Winery", text: "The world's oldest known winery, dating back to 4100 BC, was discovered in a cave in Armenia — over 6,000 years of winemaking history." },
  { id: 2, category: "history", title: "The Judgment of Paris", text: "In 1976, California wines beat France's finest in a blind tasting — shocking the wine world and putting Napa Valley on the global map forever." },
  { id: 3, category: "history", title: "Monks & Monasteries", text: "Medieval monks were Europe's greatest winemakers. The Benedictines and Cistercians mapped Burgundy's vineyards so precisely that their classifications are still used today." },
  { id: 4, category: "history", title: "Phylloxera Catastrophe", text: "In the 1860s, a tiny aphid called phylloxera nearly destroyed every vineyard in Europe. The solution: grafting European vines onto resistant American rootstock." },
  { id: 5, category: "history", title: "Dom Pérignon's Myth", text: "Despite the legend, Dom Pérignon didn't invent Champagne. He actually tried to prevent bubbles — they were considered a flaw. He did perfect blending techniques though." },
  { id: 6, category: "history", title: "Wine in Ancient Egypt", text: "Ancient Egyptians labeled their wine jars with the vintage year, vineyard name, and winemaker — essentially inventing the wine label 5,000 years ago." },
  { id: 7, category: "history", title: "Prohibition's Loophole", text: "During Prohibition, grape growers sold 'wine bricks' with a warning: 'Do not dissolve in water and leave in a cupboard for 21 days, as it will turn into wine.'" },
  { id: 8, category: "history", title: "Napoleon's Vineyard", text: "Napoleon loved Chambertin Burgundy so much he reportedly drank it at every meal, even watered down on battlefields." },
  { id: 9, category: "history", title: "The Widow Clicquot", text: "Madame Clicquot took over her husband's Champagne house at 27 in 1805 and invented riddling — the technique that makes Champagne clear. One of the first international businesswomen." },
  { id: 10, category: "history", title: "Roman Wine Roads", text: "Romans planted vineyards everywhere they conquered — France, Spain, Germany, even England. They preferred sweet wine and often added honey, herbs, and seawater." },
  { id: 11, category: "history", title: "Thomas Jefferson, Wine Nerd", text: "Thomas Jefferson was America's first great wine collector. As ambassador to France, he toured Bordeaux and Burgundy obsessively, shipping hundreds of bottles home to Monticello." },
  { id: 12, category: "history", title: "The Titanic's Cellar", text: "The Titanic carried over 1,500 bottles of wine. In 2012, a salvaged bottle of 1907 Heidsieck Champagne from a different shipwreck sold for $275,000." },
  { id: 13, category: "history", title: "Ancient Greek Dilution", text: "Ancient Greeks considered drinking undiluted wine barbaric. They mixed it with water at symposiums — usually 3 parts water to 1 part wine. Only savages drank it straight." },
  { id: 14, category: "history", title: "Bordeaux Classification", text: "The 1855 Bordeaux Classification ranked estates by price and reputation. It's been updated exactly once in 170 years — when Mouton Rothschild was promoted in 1973." },
  { id: 15, category: "history", title: "California's First Vines", text: "Spanish missionaries planted California's first wine grapes in 1769 using the 'Mission' grape. Commercial winemaking didn't take off until the Gold Rush brought thirsty miners." },
  { id: 16, category: "history", title: "Champagne & War", text: "During WWII, Champagne houses hid their best bottles behind false walls to protect them from German soldiers. Some cellars served as bomb shelters for the local population." },
  { id: 17, category: "history", title: "The Cork Revolution", text: "Cork closures weren't widely used until the 1700s. Before that, wine was sealed with cloth, wax, or olive oil-soaked rags. Cork enabled aging for the first time." },
  { id: 18, category: "history", title: "Pasteur's Discovery", text: "Louis Pasteur's study of wine fermentation in the 1850s led to germ theory — one of medicine's greatest breakthroughs. Wine literally helped save millions of lives." },
  { id: 19, category: "history", title: "Wine's Role in Religion", text: "Wine appears in the Bible over 200 times. It's central to Christian communion, Jewish Kiddush, and was even used in ancient Greek religious ceremonies to honor Dionysus." },
  { id: 20, category: "history", title: "Auction Record", text: "The most expensive wine ever sold at auction: a 1945 Romanée-Conti went for $558,000 in 2018 — about $30,000 per glass." },

  // ═══ REGIONS (20) ═══
  { id: 21, category: "regions", title: "Terroir Matters", text: "The same grape in different soils, climates, and altitudes produces dramatically different wines. The French call this 'terroir' — the complete natural environment of a vineyard." },
  { id: 22, category: "regions", title: "Bordeaux Left & Right", text: "Bordeaux's Left Bank (gravel) favors Cabernet Sauvignon — structured and powerful. The Right Bank (clay) favors Merlot — softer and rounder. Same region, totally different wines." },
  { id: 23, category: "regions", title: "New Zealand's Rise", text: "NZ Marlborough Sauvignon Blanc created a new style in the 1980s — explosively aromatic, tropical, grassy. It changed how the world sees the grape." },
  { id: 24, category: "regions", title: "Volcanic Wines", text: "Some of the most distinctive wines grow in volcanic soil — Santorini's Assyrtiko, Sicily's Etna Rosso, the Canary Islands. Volcanic minerals create electric, mineral-driven flavors." },
  { id: 25, category: "regions", title: "Argentina's Altitude", text: "Mendoza's vineyards sit at 2,000-5,000 feet — some of the highest in the world. Intense UV at altitude gives Malbec its deep purple color and bold fruit." },
  { id: 26, category: "regions", title: "Champagne's Chalk", text: "Champagne's chalk subsoil, deposited by an ancient sea 70 million years ago, absorbs water in wet years and releases it in dry ones. It's why Champagne is unique." },
  { id: 27, category: "regions", title: "Oregon vs Burgundy", text: "Oregon's Willamette Valley sits at nearly the same latitude as Burgundy. The similar climate makes it one of the best places outside France for Pinot Noir." },
  { id: 28, category: "regions", title: "The Douro Valley", text: "Port wine comes from Portugal's Douro Valley, where vines cling to steep terraces carved by hand over centuries. One of the world's oldest demarcated wine regions (1756)." },
  { id: 29, category: "regions", title: "South Africa's History", text: "South Africa has made wine since 1659. Constantia sweet wine was so famous that Napoleon requested it during his exile on St. Helena." },
  { id: 30, category: "regions", title: "Rioja's Classification", text: "Rioja classifies by aging: Crianza (1 year oak), Reserva (3 years total), Gran Reserva (5+). Longer aging means more complexity and mellowness." },
  { id: 31, category: "regions", title: "Barossa's Old Vines", text: "Australia's Barossa Valley has some of the oldest Shiraz vines in the world — pre-phylloxera survivors from the 1840s. These gnarly old vines produce intensely concentrated wine." },
  { id: 32, category: "regions", title: "Alsace: French or German?", text: "Alsace has bounced between France and Germany for centuries. Its wines reflect both — German grape varieties (Riesling, Gewürztraminer) made in a distinctly French dry style." },
  { id: 33, category: "regions", title: "Chile's Natural Barrier", text: "Chile's vineyards are protected by the Andes, Pacific Ocean, and Atacama Desert — natural barriers that kept phylloxera out. Chile has some of the world's only ungrafted vines." },
  { id: 34, category: "regions", title: "Tuscany's Super Tuscans", text: "In the 1970s, Italian winemakers broke DOC rules by blending Cabernet with Sangiovese. These 'Super Tuscans' were technically table wine but became some of Italy's most expensive bottles." },
  { id: 35, category: "regions", title: "Napa's Fog", text: "San Pablo Bay funnels cool fog into Napa Valley each night, dropping temperatures 30-40°F. This natural air conditioning preserves acidity and extends the growing season." },
  { id: 36, category: "regions", title: "Mosel's Steep Slopes", text: "Germany's Mosel region has some of the steepest vineyards on Earth — up to 65° incline. Workers literally rope themselves to stakes. The slate soil retains heat for Riesling." },
  { id: 37, category: "regions", title: "Georgia's Qvevri", text: "Georgia (the country) makes wine in buried clay vessels called qvevri — a method unchanged for 8,000 years. UNESCO recognized it as intangible cultural heritage." },
  { id: 38, category: "regions", title: "Walla Walla Surprise", text: "Washington State's Walla Walla Valley went from zero wineries in 1977 to over 120 today. Its Cabernet and Syrah rival wines costing three times as much." },
  { id: 39, category: "regions", title: "Priorat's Rebirth", text: "Spain's Priorat was nearly abandoned by the 1980s. A group of winemakers revived it with old-vine Garnacha, and it became only the second Spanish region (after Rioja) to earn DOCa status." },
  { id: 40, category: "regions", title: "English Sparkling Wine", text: "Southern England's chalk soil is geologically identical to Champagne's. English sparkling wines now regularly beat Champagne in blind tastings — climate change is making England viable." },

  // ═══ TECHNIQUE (20) ═══
  { id: 41, category: "technique", title: "Why We Swirl", text: "Swirling releases volatile aroma compounds called esters, unlocking more flavors for your nose. About 30 seconds of gentle swirling is enough." },
  { id: 42, category: "technique", title: "The Legs Myth", text: "'Wine legs' indicate alcohol content and viscosity — not quality. Thicker, slower legs usually mean higher alcohol or residual sugar." },
  { id: 43, category: "technique", title: "Decanting Explained", text: "Decanting separates old wine from sediment and aerates young wine. A young Cabernet can transform with 30-60 minutes of air." },
  { id: 44, category: "technique", title: "Temperature Matters", text: "Most people serve reds too warm and whites too cold. Reds: 60-68°F. Whites: 45-55°F. Temperature dramatically changes how wine tastes." },
  { id: 45, category: "technique", title: "Oak vs Steel", text: "Oak adds vanilla, spice, and toast while allowing micro-oxidation. Stainless steel preserves pure fruit. Neither is 'better' — different tools for different styles." },
  { id: 46, category: "technique", title: "Malolactic Fermentation", text: "That creamy, buttery Chardonnay character? It's from converting sharp malic acid into softer lactic acid. Not all whites go through 'malo' — it's a winemaker's choice." },
  { id: 47, category: "technique", title: "The Cork Truth", text: "About 3-5% of corked wines are tainted by TCA, smelling like wet cardboard. This is why screwcaps are gaining respect — not just a cheap shortcut." },
  { id: 48, category: "technique", title: "Blending Art", text: "Most wines are blends. Even 'single varietal' wines can legally contain 15-25% other grapes. Bordeaux routinely blends 3-5 varieties." },
  { id: 49, category: "technique", title: "Aging Potential", text: "Only about 1% of wines are meant to age beyond 5 years. The vast majority are made to drink within 1-2 years. Don't hoard that Tuesday night wine." },
  { id: 50, category: "technique", title: "Riddling Revolution", text: "Champagne gets its clarity from riddling — slowly rotating bottles until sediment collects in the neck, then freezing and popping it out. It took 6 weeks by hand; machines do it in days." },
  { id: 51, category: "technique", title: "Carbonic Maceration", text: "Beaujolais Nouveau's fruity, bubblegum character comes from fermenting whole grapes in CO2 — the berries ferment from the inside out, creating completely different flavors than crushing." },
  { id: 52, category: "technique", title: "Lees Aging", text: "Aging wine 'sur lie' (on its dead yeast) adds richness, breadth, and bready complexity. Muscadet and Champagne both use this technique to build texture." },
  { id: 53, category: "technique", title: "Green Harvesting", text: "Dropping unripe grape clusters mid-season forces the vine to concentrate energy into fewer bunches. Less fruit = more intensity. It feels wasteful but produces better wine." },
  { id: 54, category: "technique", title: "Punch Downs vs Pump Overs", text: "During red fermentation, grape skins float to the top. Punch downs (pushing them under) extract gently. Pump overs (spraying juice on top) extract more aggressively. Each creates a different texture." },
  { id: 55, category: "technique", title: "Wild vs Cultured Yeast", text: "Commercial yeast gives predictable results. Wild/native yeast from the vineyard is unpredictable but can add complexity and a sense of place. It's the sourdough vs commercial bread debate." },
  { id: 56, category: "technique", title: "Fining & Filtering", text: "Fining agents (egg whites, clay, fish bladder) remove haze and tannins. Some winemakers skip it for more character — that's what 'unfined, unfiltered' means on labels." },
  { id: 57, category: "technique", title: "Concrete Eggs", text: "Concrete egg-shaped fermentation vessels are trendy in modern winemaking. Their shape creates a natural vortex that keeps lees suspended — combining the benefits of oak and steel." },
  { id: 58, category: "technique", title: "Solera System", text: "Sherry uses a fractional blending system called solera — young wine is added to old, so a bottle contains wine from many vintages. Some soleras date back over 100 years." },
  { id: 59, category: "technique", title: "Amphora Revival", text: "Clay amphora fermentation — ancient in Georgia — is seeing a global revival. The porous clay allows gentle oxidation, creating wines with a distinctive textural quality." },
  { id: 60, category: "technique", title: "Harvest Timing", text: "Picking one week early vs late changes everything. Early = higher acid, less sugar (lighter wine). Late = more sugar, less acid (riper, fuller wine). Timing is the most crucial vineyard decision." },

  // ═══ TASTING (20) ═══
  { id: 61, category: "tasting", title: "Tannin Touch", text: "That dry, grippy feeling from red wine? Tannins — natural compounds from grape skins, seeds, and oak. They also help wine age gracefully over decades." },
  { id: 62, category: "tasting", title: "Your Nose Does the Work", text: "About 80% of what you 'taste' is detected by your nose. Hold your nose while sipping — wine will taste like flavored water." },
  { id: 63, category: "tasting", title: "Color Tells a Story", text: "Young reds are purple-ruby; aged reds turn garnet-brown. Young whites are pale green-gold; aged whites deepen to amber. Color reveals age before you sip." },
  { id: 64, category: "tasting", title: "The Finish", text: "A wine's 'finish' is how long flavors linger after swallowing. Great wines last 30-60 seconds. If flavors vanish instantly, the wine is 'short.'" },
  { id: 65, category: "tasting", title: "Minerality Mystery", text: "That flinty, chalky quality in wines like Chablis isn't actually from vines absorbing minerals — it's likely from specific fermentation compounds. Still debated." },
  { id: 66, category: "tasting", title: "Sweetness Perception", text: "High acidity makes sweet wine taste drier; high alcohol makes dry wine taste sweeter. Balance matters more than sugar numbers." },
  { id: 67, category: "tasting", title: "Body Language", text: "Wine 'body' is like milk: light (skim), medium (whole), full (cream). It comes from alcohol, sugar, and extract. Pinot = light, Cab = full, Merlot = medium." },
  { id: 68, category: "tasting", title: "Aroma vs Bouquet", text: "'Aroma' = scents from the grape (fruit, floral). 'Bouquet' = scents from aging (leather, tobacco). Young wines have aromas; old wines develop bouquet." },
  { id: 69, category: "tasting", title: "Palate Fatigue", text: "After 8-10 wines, your palate loses sensitivity. Pros spit for this reason — and sniff coffee beans or their own skin to reset between tastings." },
  { id: 70, category: "tasting", title: "The Retronasal Effect", text: "When you slurp wine (that obnoxious sound tasters make), you're forcing air through the wine and up into your nasal passage — amplifying flavor detection dramatically." },
  { id: 71, category: "tasting", title: "Glass Shape Matters", text: "Glass shape isn't marketing — it directs wine to different parts of your palate. Wide bowls let bold reds breathe; narrow flutes preserve Champagne's bubbles and aroma." },
  { id: 72, category: "tasting", title: "Primary, Secondary, Tertiary", text: "Wine aromas come in layers: primary (grape — fruit, floral), secondary (fermentation — bread, butter), tertiary (aging — leather, earth, tobacco). Great wines show all three." },
  { id: 73, category: "tasting", title: "Umami in Wine", text: "Wine can have umami — that savory, brothy depth. Aged Champagne, mature Burgundy, and Italian wines with sun-dried tomato notes all trigger umami receptors." },
  { id: 74, category: "tasting", title: "Volatile Acidity", text: "A tiny amount of vinegar-like character (volatile acidity) adds lift and complexity. Too much ruins wine. It's a tightrope — great winemakers walk the line." },
  { id: 75, category: "tasting", title: "Blind Tasting Humility", text: "Even master sommeliers get wines wrong in blind tastings. Studies show experts rate the same wine differently when told it costs $5 vs $50. Perception is powerful." },
  { id: 76, category: "tasting", title: "The Five S's", text: "See (color), Swirl (release aromas), Sniff (identify scents), Sip (taste), Savor (finish). Each step reveals something different about the wine." },
  { id: 77, category: "tasting", title: "Acidity Is Life", text: "Acidity makes wine refreshing, food-friendly, and age-worthy. Low-acid wines taste flabby and dull. It's the backbone of every great wine — more important than fruit." },
  { id: 78, category: "tasting", title: "Phenolics Explained", text: "Phenolics are the compounds that give wine color, bitterness, and astringency. Red wines have 10x more phenolics than whites — that's why they taste so different." },
  { id: 79, category: "tasting", title: "Temperature Illusion", text: "Warm wine tastes sweeter, more alcoholic, and less acidic. Cold wine tastes more tannic and acidic. The same wine at different temperatures can seem like two different bottles." },
  { id: 80, category: "tasting", title: "Supertasters", text: "About 25% of people are 'supertasters' with extra taste buds. They find tannins more bitter and alcohol more burning. If wine always seems too harsh, you might be one." },

  // ═══ GRAPES (20) ═══
  { id: 81, category: "grapes", title: "Cabernet Is King", text: "Cabernet Sauvignon is the world's most planted grape. DNA testing in 1996 revealed it's a natural cross between Cabernet Franc and Sauvignon Blanc." },
  { id: 82, category: "grapes", title: "Pinot's Fragility", text: "Pinot Noir is the 'heartbreak grape' — thin-skinned, disease-prone, incredibly climate-sensitive. When it works, it produces some of the most ethereal wines on Earth." },
  { id: 83, category: "grapes", title: "Chardonnay the Chameleon", text: "Chardonnay is the most versatile white grape: lean and mineral (Chablis), rich and buttery (California), or sparkling (Champagne). The winemaker shapes it." },
  { id: 84, category: "grapes", title: "Syrah vs Shiraz", text: "Same grape, different names. In France it's Syrah — peppery and elegant. In Australia it's Shiraz — bolder and jammier. The style, not just the name, changes." },
  { id: 85, category: "grapes", title: "Riesling's Range", text: "Riesling spans bone-dry to dessert-sweet — and excels at every level. Its high acidity gives it incredible aging potential. Some Rieslings improve for 30+ years." },
  { id: 86, category: "grapes", title: "Ancient Georgian Grapes", text: "Georgia has over 500 indigenous grape varieties. Saperavi and Rkatsiteli have been cultivated for 8,000 years — most found nowhere else on Earth." },
  { id: 87, category: "grapes", title: "Zinfandel's Origin", text: "Long considered 'America's grape,' DNA proved Zinfandel is identical to Croatia's Crljenak Kaštelanski and Italy's Primitivo. Croatian origin, American fame." },
  { id: 88, category: "grapes", title: "Tempranillo's Name", text: "Spain's flagship grape gets its name from 'temprano' (early) — it ripens before most red varieties. It's the backbone of Rioja and Ribera del Duero." },
  { id: 89, category: "grapes", title: "Moscato's Family", text: "The Muscat family has over 200 members and is among the oldest grapes. It's one of the few whose wine actually smells and tastes like fresh grapes." },
  { id: 90, category: "grapes", title: "Nebbiolo's Fog", text: "Nebbiolo (Barolo, Barbaresco) gets its name from 'nebbia' — Italian for fog. It ripens in late autumn when fog blankets Piedmont's hills." },
  { id: 91, category: "grapes", title: "Malbec's Migration", text: "Malbec was a minor Bordeaux blending grape until Argentina made it famous. At high altitude in Mendoza, it became a bold, velvety superstar — Argentina's signature." },
  { id: 92, category: "grapes", title: "Grenache's Many Names", text: "Grenache (France), Garnacha (Spain), Cannonau (Sardinia) — same grape, three names. It's the world's most widely planted red variety by some estimates." },
  { id: 93, category: "grapes", title: "Sauvignon Blanc's Aroma", text: "Sauvignon Blanc's signature grapefruit and cat-pee aroma comes from sulfur compounds called thiols. Love it or hate it, it's one of the most recognizable wine scents." },
  { id: 94, category: "grapes", title: "Sangiovese Means Blood of Jove", text: "Italy's most planted grape literally means 'blood of Jupiter.' It's the soul of Chianti, Brunello di Montalcino, and Vino Nobile — Tuscany in a glass." },
  { id: 95, category: "grapes", title: "Grüner Veltliner", text: "Austria's signature white grape was virtually unknown outside Central Europe until the early 2000s. Its white pepper and lentil character pairs with food better than almost any white." },
  { id: 96, category: "grapes", title: "Viognier's Near Death", text: "By the 1960s, fewer than 30 acres of Viognier existed worldwide — nearly extinct. Today it's planted globally, loved for its intoxicating peach and honeysuckle perfume." },
  { id: 97, category: "grapes", title: "Mourvèdre the Difficult", text: "Mourvèdre needs extreme heat and sunlight to ripen — it's the last grape harvested in most vineyards. When ripe, it adds meaty, earthy depth to Rhône and Bandol blends." },
  { id: 98, category: "grapes", title: "Albariño & the Sea", text: "Spain's Albariño thrives in the cool, rainy Rías Baixas region near the Atlantic. Its salty, citrusy character makes it the ultimate seafood wine." },
  { id: 99, category: "grapes", title: "Chenin Blanc's Versatility", text: "Chenin Blanc makes dry, sweet, sparkling, and everything in between. Loire Valley's Vouvray can age for 50+ years. South Africa calls it Steen and makes it a national treasure." },
  { id: 100, category: "grapes", title: "Tannat's Tannins", text: "Uruguay's Tannat grape has some of the highest tannin levels of any variety — it's named after the French word for tanning (leather). Studies suggest it's unusually high in heart-healthy procyanidins." },

  // ═══ FUN FACTS (20) ═══
  { id: 101, category: "funfacts", title: "Champagne Pressure", text: "A bottle of Champagne has about 90 PSI of pressure — three times a car tire. A popping cork can reach 50 mph." },
  { id: 102, category: "funfacts", title: "Wine in Space", text: "In 2019, twelve bottles of Bordeaux were sent to the ISS for 14 months. Experts found the space-aged wine had matured faster and tasted noticeably different." },
  { id: 103, category: "funfacts", title: "The Fear of Wine", text: "Oenophobia is the clinical fear of wine. Oenophilia is the love of it. The word 'wine' itself comes from the Latin 'vinum.'" },
  { id: 104, category: "funfacts", title: "Vatican Drinks Most", text: "Vatican City has the highest per-capita wine consumption — roughly 74 liters per resident per year. With only ~800 residents and ceremonial use, it's a statistical quirk." },
  { id: 105, category: "funfacts", title: "Women Taste Better", text: "Studies show women tend to be better wine tasters — higher density of taste receptors and more likely to be 'supertasters' detecting flavors at lower thresholds." },
  { id: 106, category: "funfacts", title: "Old Vines, Deep Roots", text: "The oldest living grapevine is in Maribor, Slovenia — over 450 years old and still producing grapes. Old vines yield less fruit but more concentrated, complex flavors." },
  { id: 107, category: "funfacts", title: "Rosé's Color Secret", text: "Rosé gets its pink from brief red grape skin contact — 2 to 20 hours. Longer contact = deeper pink. It's not a blend of red and white (except in Champagne)." },
  { id: 108, category: "funfacts", title: "Sommelier's Tastevin", text: "The silver cup sommeliers wear is a tastevin. In dark candlelit cellars, its dimpled surface reflected light to judge wine color before electricity." },
  { id: 109, category: "funfacts", title: "Wine Diamonds", text: "Tiny crystals in wine are tartrate crystals — harmless potassium bitartrate (cream of tartar). They're actually a sign of a less processed, more natural wine." },
  { id: 110, category: "funfacts", title: "Toasting Origins", text: "The word 'toast' comes from Romans dipping burnt bread into wine. Clinking glasses evolved from splashing wine between cups to prove drinks weren't poisoned." },
  { id: 111, category: "funfacts", title: "A Ton of Grapes", text: "It takes roughly 600-800 grapes to make one bottle of wine, about 2.5 pounds of fruit. A single vine produces enough grapes for 4-6 bottles per year." },
  { id: 112, category: "funfacts", title: "The Aroma Wheel", text: "UC Davis professor Ann Noble created the Wine Aroma Wheel in 1984 — a standardized vocabulary for wine scents. It transformed how professionals and amateurs describe wine." },
  { id: 113, category: "funfacts", title: "Wine & Music", text: "Multiple studies show that background music changes how wine tastes. Heavy music makes red wine taste bolder; gentle music makes it taste smoother. Your brain blends the senses." },
  { id: 114, category: "funfacts", title: "Barrel Math", text: "A standard Bordeaux barrel (barrique) holds 225 liters — exactly 300 bottles. An oak tree provides enough wood for about two barriques. New French oak barrels cost $800-1,200 each." },
  { id: 115, category: "funfacts", title: "Largest Wine Barrel", text: "The Great Heidelberg Tun in Germany holds 219,000 liters — about 290,000 bottles. Built in 1751, it's been filled only three times. There's a dance floor on top of it." },
  { id: 116, category: "funfacts", title: "Screw It", text: "New Zealand and Australia close over 90% of their wines with screwcaps. Studies show they preserve freshness better than cork. The stigma is fading — many premium wines use them." },
  { id: 117, category: "funfacts", title: "Wine Tears Are Physics", text: "Wine legs/tears are caused by the Gibbs-Marangoni effect — alcohol evaporates faster than water at the glass edge, creating surface tension differences that pull liquid up." },
  { id: 118, category: "funfacts", title: "The Coravin Effect", text: "The Coravin system uses a needle to extract wine through the cork without removing it, replacing the wine with argon gas. One bottle can be poured over months without oxidizing." },
  { id: 119, category: "funfacts", title: "Wine's Carbon Footprint", text: "The heaviest part of a wine bottle's carbon footprint isn't transportation — it's the glass bottle itself. A standard wine bottle weighs 400-500g; lightweight bottles cut emissions 25-30%." },
  { id: 120, category: "funfacts", title: "Sommelier Exam", text: "The Master Sommelier exam has about a 3% pass rate — harder than the bar exam. Candidates study for years and must blind-identify 6 wines in 25 minutes with full descriptions." },
];

// ── Seen tracking + daily pick ──
const SEEN_KEY = 'sipstreak_seen_facts';
const DAILY_KEY = 'sipstreak_daily_fact';

function getSeenFacts() {
  try { return JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'); } catch { return []; }
}

function markSeen(id) {
  const seen = getSeenFacts();
  if (!seen.includes(id)) {
    seen.push(id);
    if (seen.length >= facts.length) localStorage.setItem(SEEN_KEY, JSON.stringify([id]));
    else localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  }
}

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

export function getDailyFact() {
  const today = new Date().toISOString().slice(0, 10);
  
  // Check if we already picked today's fact
  try {
    const cached = JSON.parse(localStorage.getItem(DAILY_KEY) || '{}');
    if (cached.date === today && cached.id) {
      const fact = facts.find(f => f.id === cached.id);
      if (fact) return fact;
    }
  } catch {}

  const seen = getSeenFacts();
  const rand = seededRandom(today);

  // Get categories of last 5 seen facts to avoid repeats
  const recentCategories = seen.slice(-5).map(id => facts.find(f => f.id === id)?.category).filter(Boolean);

  // Prefer unseen facts from underrepresented categories
  let pool = facts.filter(f => !seen.includes(f.id));
  if (pool.length === 0) pool = facts;

  // Filter out recently shown categories if possible
  const diversePool = pool.filter(f => !recentCategories.includes(f.category));
  const finalPool = diversePool.length > 0 ? diversePool : pool;

  const idx = Math.floor(rand() * finalPool.length);
  const fact = finalPool[idx];

  markSeen(fact.id);
  localStorage.setItem(DAILY_KEY, JSON.stringify({ date: today, id: fact.id }));
  return fact;
}

export function getCategoryLabel(categoryId) {
  return categoryMeta[categoryId]?.label || categoryId;
}
