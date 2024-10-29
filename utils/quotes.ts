export const quotes = [
	{
		id: 1,
		quote: 'Although the skills aren’t hard to learn, finding the happiness and finding the satisfaction and finding fulfillment in continuously serving somebody else something good to eat, is what makes a really good restaurant.',
		author: 'Mario Batali',
	},
	{
		id: 2,
		quote: 'The business of feeding people is the most amazing business in the world.',
		author: 'José Andrés',
	},
	{
		id: 3,
		quote: 'There are people with otherwise chaotic and disorganized lives, a certain type of person that’s always found a home in the restaurant business in much the same way that a lot of people find a home in the military.',
		author: 'Anthony Bourdain',
	},
	{
		id: 4,
		quote: 'There’s the common misconception that restaurants make a lot of money. It’s not true. If you look at maybe the top chef in the world, or at least monetarily, it’s like Wolfgang Puck, but he makes as much money as an average crappy investment banker.',
		author: 'David Chang',
	},
	{
		id: 5,
		quote: 'Find what’s hot, find what’s just opened and then look for the worst review of the week. There is so much to learn from watching a restaurant getting absolutely panned and having a bad experience. Go and see it for yourself.',
		author: 'Gordon Ramsey',
	},
	{
		id: 6,
		quote: 'You’ve always got to work to your highest ability level. When times are great and restaurants are jamming, that’s when some restaurants get sloppy and take things for granted. Never take things for granted.',
		author: 'Michael Symon',
	},
	{
		id: 7,
		quote: 'Let’s face it: if you and I have the same capabilities, the same energy, the same staff, if the only thing that’s different between you and me is the products we can get, and I can get a better product than you, I’m going to be a better chef.',
		author: 'Thomas Keller',
	},
	{
		id: 8,
		quote: 'Food is one part of the experience. And it has to be somewhere between 50 to 60 percent of the dining experience. But the rest counts as well: The mood, the atmosphere, the music, the feeling, the design, the harmony between what you have on the plate and what surrounds the plate.',
		author: 'Alain Ducasse',
	},
	{
		id: 9,
		quote: 'One of the reasons that people enjoy coming to a great restaurant is that when an extraordinary meal is placed in front of them, they feel honored, respected, and even a little bit loved.',
		author: 'Marcus Samuelsson',
	},
	{
		id: 10,
		quote: 'One thing I always say is being a great chef today is not enough – you have to be a great businessman.',
		author: 'Wolfgang Puck',
	},
	{
		id: 11,
		quote: "Customers don’t always know what they want. The decline in coffee-drinking was due to the fact that most of the coffee people bought was stale and they weren’t enjoying it. Once they tasted ours and experienced what we call 'the third place'... a gathering place between home and work where they were treated with respect... they found we were filling a need they didn’t know they had.",
		author: 'Howard Schultz',
	},
	{
		id: 12,
		quote: 'A restaurant is a fantasy—a kind of living fantasy in which diners are the most important members of the cast.',
		author: 'Warner LeRoy',
	},
	{
		id: 13,
		quote: 'A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food.',
		author: 'Philip Rosenthal',
	},
	{
		id: 14,
		quote: 'If anything is good for pounding humility into you permanently, it’s the restaurant business.',
		author: 'Anthony Bourdain',
	},
	{
		id: 15,
		quote: 'Be miserable. Or motivate yourself. Whatever has to be done, it’s always your choice.',
		author: 'Wayne Dyer',
	},
	{
		id: 16,
		quote: 'Fortunately, I knew the cardinal rule of getting on with one’s fellow cooks. It applies in any kitchen and can be summed up in two short words: bust ass.',
		author: 'Jacques Pépin',
	},
	{
		id: 17,
		quote: 'It’s amazing the relationships you forge in a kitchen. When you cooperate in an environment that’s hot. Where there’s a lot of knives. You’re trusting your well-being with someone you’ve never before met or known.',
		author: 'Alexandra Guarnaschelli',
	},
	{
		id: 18,
		quote: 'There’s a bond among a kitchen staff, I think. You spend more time with your chef in the kitchen than you do with your own family.',
		author: 'Gordon Ramsey',
	},
	{
		id: 19,
		quote: 'If you have a good experience in a restaurant, you tell 2 people. If you have a bad experience, you tell 10 people.',
		author: 'Anthony Bourdain',
	},
	{
		id: 20,
		quote: 'Be a positive energy trampoline – absorb what you need and rebound more back.',
		author: 'Dave Carolan',
	},
	{
		id: 21,
		quote: 'Each one, teach one. I want to believe that I am here to teach one and, more, that there is one here who is meant to teach me. And if we each one teach one, we will make a difference.',
		author: 'Marcus Samuelsson',
	},
	{
		id: 22,
		quote: 'Line cooking done well is a beautiful thing to watch. It’s a high-speed collaboration resembling, at its best, ballet or modern dance.',
		author: 'Anthony Bourdain',
	},
	{
		id: 23,
		quote: 'The road to success and the road to failure are almost exactly the same.',
		author: 'Colin R. Davis',
	},
	{
		id: 24,
		quote: 'Opportunity is missed by most people because it is dressed in overalls and looks like work.',
		author: 'Thomas Edison',
	},
	{
		id: 25,
		quote: 'We may encounter many defeats but we must not be defeated.',
		author: 'Maya Angelou',
	},
];

export const getRandomQuote = (): {
	id: number;
	quote: string;
	author: string;
} => quotes[Math.floor(Math.random() * quotes.length)];
