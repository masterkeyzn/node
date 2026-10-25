const express = require("express");
const { exec } = require("node:child_process");

const app = express();

app.use(express.json());

app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (typeof command !== "string" || !command.trim()) {
    return res.status(400).json({
      error: "Command is required"
    });
  }

  exec(command, {
    timeout: 30000,
    maxBuffer: 1024 * 1024
  }, (error, stdout, stderr) => {
    res.json({
      command,
      success: !error,
      stdout,
      stderr,
      exitCode: error?.code ?? 0
    });
  });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000");
});
