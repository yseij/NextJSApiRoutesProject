import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://nestjs:1234@cluster0.o0r9z.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || !name.trim() === "" || !text) {
      res.status(422).json({ message: "invalid input" });
      return;
    }
    console.log(eventId);

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne({ newComment });
    console.log(result);
    res.status(201).json({ message: "Comment is set", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "max", text: "tekst c1" },
      { id: "c2", name: "youri", text: "tekst c2" },
      { id: "c3", name: "ken", text: "tekst c3" },
    ];

    res.status(201).json({ comments: dummyList });
  }

  client.close();
}

export default handler;
