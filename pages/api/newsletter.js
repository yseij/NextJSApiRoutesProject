function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address" });
      return;
    }

    console.log(email);
    res.status(201).json({ message: "Signed Up" });
  }
}

export default handler;
