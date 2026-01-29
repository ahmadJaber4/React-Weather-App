import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { weatherData, question } = req.body;

    if (!weatherData || !question) {
        return res.status(400).json({ error: "Missing data" });
    }

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful weather assistant. Summarize the weather data and give advices (activities, what to wear) in one paragraph, no emojies."
                },
                {
                    role: "user",
                    content: 
                        `Weather data: ${JSON.stringify(weatherData, null, 2)}`
                }
            ]
        });

        res.status(200).json({
            answer: completion.choices[0].message.content
        });
    } catch (error) {
        res.status(500).json({ error: "AI request failed" });
    }
}