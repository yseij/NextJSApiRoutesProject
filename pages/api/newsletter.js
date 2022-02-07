import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://nestjs:1234@cluster0.o0r9z.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection("emails").insertOne({ email: email });
    client.close();

    res.status(201).json({ message: "Signed Up" });
  }
}

export default handler;
