const { timeStamp } = require("console");
const crypto = require("crypto");
const http = require("http");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");

function generateUUID() {
  return uuidv4(); // Генерация уникального UUID
}

const app = express();
const port = 4004;

// Создаем HTTP сервер на базе приложения Express
const server = http.createServer(app);

// Инициализация WebSocket сервера на том же порту
const wss = new WebSocket.Server({ server });

const DEFAULT_USER = {
  id: "0",
  email: "a@a.a",
  fullName: "Ivan Pupkin",
  password: "11111111",
  phoneNumber: "8-989-898-98-98",
  chatWithAdminId: "0000"
};

const DEFAULT_ADMIN = {
  id: "007",
  email: "admin@admin.ru",
  fullName: "Admin Adminovich",
  password: "11111111",
  phoneNumber: "8-989-898-98-98",
};

const generateUsers = () => {
  const users = {};
  // Добавление администратора
  users["admin@admin.ru"] = DEFAULT_ADMIN;
  users["a@a.a"] = DEFAULT_USER;

  // Генерация 20 пользователей
  for (let i = 0; i < 20; i++) {
    const email = faker.internet.email();
    users[email] = {
      email: email,
      fullName: faker.person.fullName(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.number(),
      id: faker.number.float(),
    };
  }
  return users;
};

let users = generateUsers();

function handleCallHistoryStats(ws) {
  const statuses = [
    "idle",
    "processing",
    "accepted",
    "declined",
    "onTheWay",
    "onTheSpot",
    "completed",
    "canceled",
  ];
  const statusCounts = {};

  statuses.forEach((status) => {
    // Генерация случайного количества для каждого статуса от 1 до 100
    statusCounts[status] = Math.floor(Math.random() * 100) + 1;
  });

  const sendStats = () => {
    const response = {
      type: "callHistoryStats",
      payload: statusCounts,
    };
    ws.send(JSON.stringify(response));
  };

  // Отправка начальной статистики
  sendStats();

  // Создание интервала для регулярного обновления статистики
  const intervalId = setInterval(() => {
    Object.keys(statusCounts).forEach((key) => {
      statusCounts[key] += 1; // Увеличение счетчика каждого статуса на 1
    });
    sendStats();
  }, 5000);

  // Обработка закрытия соединения и очистка интервала
  ws.on("close", () => {
    clearInterval(intervalId);
    console.log("WebSocket connection closed and interval cleared.");
  });

  ws.on("error", () => {
    clearInterval(intervalId);
    console.log("WebSocket encountered an error and interval cleared.");
  });
}

function handleNewActivity(ws) {
  // Генерация случайной активности
  const generateActivity = () => {
    const userKeys = Object.keys(users);
    const userKey = userKeys[Math.floor(Math.random() * userKeys.length)];
    return {
      date: faker.date.recent(90).toISOString(),
      status: randomize([
        "processing",
        "accepted",
        "onTheWay",
        "onTheSpot",
        "completed",
        "canceled",
      ]),
      address: faker.address.streetAddress(),
      comment: faker.lorem.sentence(),
      id: faker.number.float(),
      userId: users[userKey].id,
      userFullName: users[userKey].fullName,
    };
  };

  let activityRecord = generateActivity();

  // Отправка активности
  const sendActivity = () => {
    const response = {
      type: "newActivity",
      payload: activityRecord,
    };
    ws.send(JSON.stringify(response));
  };

  // Обработка закрытия соединения и очистка интервала
  ws.on("close", () => {
    // clearInterval(intervalId);
    console.log("WebSocket connection closed and interval cleared.");
  });

  ws.on("error", () => {
    // clearInterval(intervalId);
    console.log("WebSocket encountered an error and interval cleared.");
  });
}

const generateChatHistory = (chatId) => {
  const length = 20;
  return Array.from({ length }, (_, i, arr) => ({
    timeStamp: new Date().valueOf() - (100000 - i * 5000),
    text: faker.lorem.sentence(),
    messageId: generateUUID(),
    wasReadBy:
      i < length - 3 ? [DEFAULT_USER.id] : [DEFAULT_ADMIN.id, DEFAULT_USER.id],
    senderId: i % 2 ? DEFAULT_ADMIN.id : DEFAULT_USER.id,
    // receiverId: i % 2 ? DEFAULT_USER.id : DEFAULT_ADMIN.id,
    chatId,
  }));
};

function sendRandomMessage(ws) {
  // для проверки админа
  // const randomMessage = {
  //   timeStamp: Date.now(),
  //   text: faker.lorem.sentence(),
  //   messageId: generateUUID(),
  //   wasReadBy: [DEFAULT_USER.id],
  //   senderId: DEFAULT_USER.id,
  //   chatId: "0000",
  // };

  // для проверки юзера
  const randomMessage = {
    timeStamp: Date.now(),
    text: faker.lorem.sentence(),
    messageId: generateUUID(),
    wasReadBy: [DEFAULT_ADMIN.id],
    senderId: DEFAULT_ADMIN.id,
    chatId: "0000",
  };

  const response = { type: "message", payload: randomMessage };

  // Отправляем сообщение через WebSocket
  ws.send(JSON.stringify(response));
}

app.use(cors());
app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

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
      receivedData.type === "callStatus"
      // && receivedData.code === "call"
    ) {
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
      receivedData.type === "callStatus"
      // &&receivedData.code === "getCallStatus"
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

    if (
      receivedData.type === "getCallHistoryStats"
      // &&receivedData.code === "getCallHistoryStats"
    ) {
      handleCallHistoryStats(ws);
    }

    if (receivedData.type === "getNewActivity") {
      handleNewActivity(ws);
    }

    // if (receivedData.type === "getChatStats") {
    //   handleChatsData(ws);
    // }
  });

  const messageInterval = setInterval(() => {
    sendRandomMessage(ws);
  }, 10000); // Интервал 10 секунд

  ws.on("close", function () {
    console.log("WebSocket connection closed");
    clearInterval(messageInterval);

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
    clearInterval(messageInterval);

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
app.post("/api/auth/registration", (req, res) => {
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

app.get("/api/currentUser", (req, res) => {
  res.json(DEFAULT_ADMIN);
});

app.get("/api/chats/:id/messages", (req, res) => {
  const chatId = req.params.id;

  res.json(generateChatHistory(chatId));
});

app.get("/api/chats/:chatId/stats", (req, res) => {
  const chatId = req.params.chatId;  // Extracting the chat ID from the URL parameter

  // Mock data for chat statistics
  const chatStats = {
    total: Math.floor(Math.random() * 100),
    read: Math.floor(Math.random() * 50),
    unRead: Math.floor(Math.random() * 50),
  };

  // You might want to check if such a chat exists or if the user has the right to view these stats
  // For now, we assume the chat ID is valid and the user can view the stats
  res.json(chatStats);
});

// Новый REST API эндпоинт для получения статистики чатов
app.get("/api/chats", (req, res) => {
  // Статистика для подсчета количества прочитанных и непрочитанных сообщений

  const user2Id = generateUUID();
  const data = [
    {
      chatId: "0000",
      users: [DEFAULT_USER.id, DEFAULT_ADMIN.id],
      fullName: DEFAULT_USER.fullName,
      hasNewMessages: true,
      lastMessage: {
        timeStamp: Date.now(),
        text: faker.lorem.sentence(),
        messageId: generateUUID(),
        wasReadBy: [DEFAULT_USER.id],
        senderId: DEFAULT_ADMIN.id,
        chatId: "0000",
      },
    },
    {
      chatId: "1111",
      users: [user2Id, DEFAULT_ADMIN.id],
      fullName: "Biba Pisin",
      hasNewMessages: true,
      lastMessage: {
        timeStamp: Date.now(),
        text: faker.lorem.sentence(),
        messageId: generateUUID(),
        wasReadBy: [user2Id],
        senderId: DEFAULT_ADMIN.id,
        receiverId: DEFAULT_USER.id,
      },
    },
  ];

  res.json(data);
});

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

app.get("/api/users", (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "fullName",
    order = "asc",
  } = req.query;

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;

  const filteredUsers = Object.values(users).filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const valueA = a[sort] ? String(a[sort]).toLowerCase() : "";
    const valueB = b[sort] ? String(b[sort]).toLowerCase() : "";
    return order === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const usersOnPage = sortedUsers.slice(startIndex, endIndex);

  res.json({
    items: usersOnPage,
    pageNumber,
    totalPages: Math.ceil(sortedUsers.length / limitNumber),
    totalRecords: sortedUsers.length,
  });
});

// New fetchCallHistory endpoint with mock data
app.get("/api/users/:userId/callHistory", (req, res) => {
  const { userId } = req.params;
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "date",
    order = "asc",
  } = req.query;

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;

  // Mock call history data
  const callHistory = Array.from({ length: 20 }).map((_, index) => {
    const userIndex = Math.round(
      Math.random() * (Object.values(users).length - 1)
    );

    const userKey = Object.keys(users)[userIndex];

    return {
      date: faker.date.recent(90).toISOString(),
      status: randomize([
        "processing",
        "accepted",
        "onTheWay",
        "onTheSpot",
        "completed",
        "canceled",
      ]),
      address: faker.address.streetAddress(),
      comment: faker.lorem.sentence(),
      id: faker.number.float(),
      userId: users[userKey].id, // Связываем каждый вызов с ID пользователя
      userFullName: users[userKey].fullName,
    };
  });

  // Apply search and sort filters
  const filteredHistory = callHistory
    .filter((entry) =>
      entry.comment.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = a[sort] || "";
      const valueB = b[sort] || "";
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

  // Paginate the results
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const historyForPage = filteredHistory.slice(startIndex, endIndex);

  res.json({
    items: historyForPage,
    pageNumber,
    totalPages: Math.ceil(filteredHistory.length / limitNumber),
    totalRecords: filteredHistory.length,
  });
});

app.get("/api/users/currentUser", (req, res) => {
  res.json(DEFAULT_USER);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = Object.values(users).find((user) => user.id.toString() === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ errorMessage: "User not found" });
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

app.put("/api/user", (req, res) => {
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

app.patch("/api/call/:id", (req, res) => {
  res.status(200).json({ message: "OK" });
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

// Запуск сервера
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function randomize(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Please provide a non-empty array.");
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
