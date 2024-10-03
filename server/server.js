const WebSocket = require("ws");
const http = require("http");
const crypto = require("crypto");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 4004;

// Создаем HTTP сервер на базе приложения Express
const server = http.createServer(app);

// Инициализация WebSocket сервера на том же порту
const wss = new WebSocket.Server({ server });

const DEFAULT_USER = {
  email: "a@a.a",
  fullName: "Ivan Pupkin",
  password: "11111111",
  phoneNumber: "8-989-898-98-98",
};

const CHAT_HISTORY = [
  {
    type: "supportMessage",
    message: "Hello! How can I help you today?",
    timeStamp: new Date().valueOf() - 100000,
  },
  {
    type: "userMessage",
    message: "I am having trouble logging in.",
    timeStamp: new Date().valueOf() - 95000,
  },
  {
    type: "supportMessage",
    message: "Have you tried resetting your password?",
    timeStamp: new Date().valueOf() - 90000,
  },
  {
    type: "userMessage",
    message: "Yes, but it didn't work.",
    timeStamp: new Date().valueOf() - 85000,
  },
  {
    type: "supportMessage",
    message: "Can you please provide your registered email address?",
    timeStamp: new Date().valueOf() - 80000,
  },
  {
    type: "userMessage",
    message: "Sure, it's example@example.com.",
    timeStamp: new Date().valueOf() - 75000,
  },
  {
    type: "supportMessage",
    message:
      "Thank you, I will reset your password manually. Please check your email shortly.",
    timeStamp: new Date().valueOf() - 70000,
  },
  {
    type: "userMessage",
    message: "Received the reset link, trying now.",
    timeStamp: new Date().valueOf() - 65000,
  },
  {
    type: "supportMessage",
    message: "Great! Let me know if it works.",
    timeStamp: new Date().valueOf() - 60000,
  },
  {
    type: "userMessage",
    message: "It worked, thanks!",
    timeStamp: new Date().valueOf() - 55000,
  },
  {
    type: "supportMessage",
    message:
      "You're welcome! If you have any more questions, feel free to ask.",
    timeStamp: new Date().valueOf() - 50000,
  },
  {
    type: "userMessage",
    message: "Will do. Have a great day!",
    timeStamp: new Date().valueOf() - 45000,
  },
  {
    type: "userMessage",
    message: "It worked, thanks!",
    timeStamp: new Date().valueOf() - 55000,
  },
  {
    type: "supportMessage",
    message:
      "You're welcome! If you have any more questions, feel free to ask.",
    timeStamp: new Date().valueOf() - 50000,
  },
  {
    type: "userMessage",
    message: "Will do. Have a great day!",
    timeStamp: new Date().valueOf() - 45000,
  },
];

app.use(cors());
app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

let users = { [DEFAULT_USER.email]: DEFAULT_USER };

function generateTokens() {
  return {
    accessToken: crypto.randomBytes(16).toString("hex"),
    refreshToken: crypto.randomBytes(16).toString("hex"),
  };
}

// Обработчик WebSocket соединений
wss.on("connection", function connection(ws) {
  console.log("WebSocket connection established");

  // Отправка приветственного сообщения сразу после подключения
  ws.send(
    JSON.stringify({
      type: "connection",
      message: "Connection successful",
    })
  );

  ws.on("message", function incoming(message) {
    // Обработка входящего сообщения и ответ в зависимости от содержимого
    const receivedData = JSON.parse(message);
    if (receivedData.type === "ping") {
      ws.send(
        JSON.stringify({
          type: "pong",
          message: "Pong!",
        })
      );
    }

    if (
      receivedData.type === "chatHistory" &&
      receivedData.code === "getHistory"
    ) {
      console.log("Отправляем историю сообщений");
      const response = {
        type: "chatHistory",
        payload: CHAT_HISTORY,
        timestamp: new Date().valueOf(),
      };

      ws.send(JSON.stringify(response));
    }

    if (receivedData.type === "callStatus" && receivedData.code === "call") {
      ws.send(
        JSON.stringify({
          type: "callStatus",
          message: "processing",
          timeStamp: new Date().valueOf(),
        })
      );

      setTimeout(() => {
        ws.send(
          JSON.stringify({
            type: "callStatus",
            message: "accepted",
            timeStamp: new Date().valueOf(),
          })
        );
      }, 1000);

      setTimeout(() => {
        ws.send(
          JSON.stringify({
            type: "callStatus",
            message: "onTheWay",
            timeStamp: new Date().valueOf(),
          })
        );
      }, 3000);

      setTimeout(() => {
        ws.send(
          JSON.stringify({
            type: "callStatus",
            message: "onTheSpot",
            timeStamp: new Date().valueOf(),
          })
        );
      }, 5000);

      setTimeout(() => {
        ws.send(
          JSON.stringify({
            type: "callStatus",
            message: "completed",
            timeStamp: new Date().valueOf(),
          })
        );
      }, 7000);
    }

    if (
      receivedData.type === "callStatus" &&
      receivedData.code === "getCallStatus"
    ) {
      //idle, processing, accepted (declined), onTheWay, onTheSpot, completed
      console.log("ws.send");
      ws.send(
        JSON.stringify({
          type: "callStatus",
          message: "idle",
          timeStamp: new Date().valueOf(),
        })
      );
    }
  });

  ws.on("close", function () {
    console.log("WebSocket connection closed");
    // Отправка сообщения о закрытии соединения
    ws.send(
      JSON.stringify({
        type: "disconnection",
        message: "Disconnected",
        timeStamp: new Date().valueOf(),
      })
    );
  });

  ws.on("error", function (error) {
    console.log("WebSocket error:", error);
    ws.send(
      JSON.stringify({
        type: "error",
        message: "An error occurred",
      })
    );
  });
});

// REST API endpoints
app.post("/api/user/create", (req, res) => {
  const { email, password } = req.body;
  if (users[email]?.toLocaleLowerCase()) {
    res
      .status(400)
      .json({ errorMessage: "Пользователь с таким имейлом уже существует" });
  } else {
    const tokens = generateTokens();
    users[email] = { ...DEFAULT_USER, email, password, tokens };
    res.status(200).json({ message: "OK" });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { login, password } = req.body;
  if (
    users[login.toLocaleLowerCase()] &&
    users[login.toLocaleLowerCase()].password.toLocaleLowerCase() ===
      password.toLocaleLowerCase()
  ) {
    const tokens = generateTokens();
    users[login.toLocaleLowerCase()] = {
      ...users[login.toLocaleLowerCase()],
      ...tokens,
    };
    res.json(tokens);
  } else {
    res.status(401).json({ errorMessage: "Неверные учетные данные" });
  }
});

app.put("/api/currentUser", (req, res) => {
  const { email, fullName, password, phoneNumber } = req.body;
  if (users[DEFAULT_USER.email]) {
    users[DEFAULT_USER.email] = {
      ...users[DEFAULT_USER.email],
      email: email || users[DEFAULT_USER.email].email,
      fullName: fullName || users[DEFAULT_USER.email].fullName,
      password: password || users[DEFAULT_USER.email].password,
      phoneNumber: phoneNumber || users[DEFAULT_USER.email].phoneNumber,
    };
    res.json(users[DEFAULT_USER.email]);
  } else {
    res.status(404).json({ errorMessage: "Пользователь не найден" });
  }
});

app.post("/api/refresh", (req, res) => {
  const { refreshToken } = req.body;
  const user = Object.values(users).find(
    (user) => user.refreshToken === refreshToken
  );
  if (user) {
    const tokens = generateTokens();
    Object.keys(users).forEach((key) => {
      if (users[key].refreshToken === refreshToken) {
        users[key] = { ...users[key], ...tokens };
      }
    });
    res.json(tokens);
  } else {
    res.status(403).json({ errorMessage: "Неверный refresh token" });
  }
});

app.get("/api/currentUser", (req, res) => {
  res.json(DEFAULT_USER);
});

// Запуск сервера
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
