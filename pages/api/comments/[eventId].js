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

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Comment is set", comment: newComment });
  }

  if (req.method === "GET") {
    console.log("hier");
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    console.log(documents);
    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
