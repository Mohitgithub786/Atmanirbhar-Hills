const axios = require("axios");

// Smart AI Knowledge & Recommendation Engine for Atmanirbhar Hills
const KNOWLEDGE_BASE = [
  {
    keywords: ["craft", "handicraft", "wood", "artisan", "bamboo"],
    response: "🌄 Atmanirbhar Hills features authentic handmade wooden crafts, bamboo items, and traditional mountain artwork crafted directly by local SHG (Self Help Group) artisans."
  },
  {
    keywords: ["tea", "organic", "spice", "food", "herbal"],
    response: "🍵 Our region is famous for Kangra & Darjeeling Organic Teas, wild Himalayan honey, and farm-fresh Pahadi spices (Kala Jeera, Jakhiya, Turmeric)."
  },
  {
    keywords: ["gift", "under", "budget", "recommend", "suggestion"],
    response: "🎁 Top Recommendations under ₹1000:\n1. Handcrafted Kullu Woolen Muffler (₹450)\n2. Pure Himalayan Herbal Tea Box (₹350)\n3. Handmade Pine Cones Decor (₹299)"
  },
  {
    keywords: ["atmanirbhar", "mission", "hills", "about", "vocal for local"],
    response: "🇮🇳 Atmanirbhar Hills is a Vocal-for-Local initiative supporting mountain artisans, rural entrepreneurs, and Self-Help Groups across hill states by providing direct market access."
  },
  {
    keywords: ["ship", "delivery", "order", "buy", "time"],
    response: "🚚 Orders are shipped directly from local artisan cooperatives with 3-5 business days delivery across India."
  }
];

module.exports.askAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).send({ message: "Prompt is required" });
    }

    const lowerPrompt = prompt.toLowerCase();

    // If Gemini API Key is available in environment, use Gemini AI API
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `You are Atmanirbhar AI, a friendly assistant for Atmanirbhar Hills marketplace (selling authentic hill products, handicrafts, organic teas, and woolens). Answer helpful & concisely:\nUser Query: ${prompt}`
                  }
                ]
              }
            ]
          }
        );
        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.send({ message: "success", reply });
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to smart engine:", geminiErr.message);
      }
    }

    // Smart Engine Fallback matching keywords
    let matchedResponse = null;
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lowerPrompt.includes(kw))) {
        matchedResponse = item.response;
        break;
      }
    }

    if (!matchedResponse) {
      matchedResponse = `✨ Atmanirbhar AI Suggestion: Exploring "${prompt}"? Check out our Handlooms, Organic Mountain Spices, and Handcrafted Wooden Art directly from local hill artisans!`;
    }

    return res.send({ message: "success", reply: matchedResponse });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    res.status(500).send({ message: "server err", reply: "Sorry, AI assistant is temporarily unavailable." });
  }
};

module.exports.generateDescription = async (req, res) => {
  try {
    const { pname, category } = req.body;
    if (!pname) {
      return res.status(400).send({ message: "Product name required" });
    }

    const generated = `Authentic ${pname} handcrafted by skilled hill artisans in the ${category || "local"} category. Made using eco-friendly traditional techniques, supporting local micro-entrepreneurs and sustainable livelihoods. Perfect for daily use or gifting!`;
    res.send({ message: "success", description: generated });
  } catch (err) {
    res.status(500).send({ message: "server err" });
  }
};
