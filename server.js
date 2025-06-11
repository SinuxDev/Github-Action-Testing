const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .welcome-box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        h1 {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="welcome-box">
        <h1>Welcome to My Express Server!</h1>
        <p>This is the home page served with HTML.</p>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
