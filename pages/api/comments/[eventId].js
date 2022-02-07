function handler(req, res) {
  const eventId = req.body.eventId;
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || !name.trim() === "" || !text) {
      res.status(422).json({ message: "invalid input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
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
}

export default handler;
