const crypto = require("crypto");
const http = require("http");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const express = require("express");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

function generateUUID() {
  return uuidv4(); // Генерация уникального UUID
}

function generateChatHistory() {
  const numberOfMessages = 12; // Количество сообщений в истории
  const adminId = DEFAULT_ADMIN.id; // ID администратора
  let chatHistory = [];
  const senderId = generateUUID();

  for (let i = 0; i < numberOfMessages; i++) {
    chatHistory.push({
      type: "message",
      message: faker.lorem.sentence(),
      timeStamp: new Date().valueOf() - (100000 - i * 5000),
      payload: {
        messageId: generateUUID(),
        wasRead: Math.random() > 0.5,
        senderId,
        receiverId: adminId, // Фиксированный ID администратора
      },
    });
  }

  return chatHistory;
}

const app = express();
const port = 4004;

// Создаем HTTP сервер на базе приложения Express
const server = http.createServer(app);

// Инициализация WebSocket сервера на том же порту
const wss = new WebSocket.Server({ server });

const DEFAULT_USER = {
  id: "000",
  email: "a@a.a",
  fullName: "Ivan Pupkin",
  password: "11111111",
  phoneNumber: "8-989-898-98-98",
};

const DEFAULT_ADMIN = {
  id: "111",
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

const CHAT_HISTORY = [
  {
    type: "message",
    message: "Hello! How can I help you today?",
    timeStamp: new Date().valueOf() - 100000,
    payload: { sender: "support" },
  },
  {
    type: "message",
    message: "I am having trouble logging in.",
    timeStamp: new Date().valueOf() - 95000,
    payload: { sender: "user" },
  },
  {
    type: "message",
    message: "Have you tried resetting your password?",
    timeStamp: new Date().valueOf() - 90000,
    payload: { sender: "support" },
  },
  {
    type: "message",
    message: "Yes, but it didn't work.",
    timeStamp: new Date().valueOf() - 85000,
    payload: { sender: "user" },
  },
  {
    type: "message",
    message: "Can you please provide your registered email address?",
    timeStamp: new Date().valueOf() - 80000,
    payload: { sender: "support" },
  },
  {
    type: "message",
    message: "Sure, it's example@example.com.",
    timeStamp: new Date().valueOf() - 75000,
    payload: { sender: "user" },
  },
  {
    type: "message",
    message:
      "Thank you, I will reset your password manually. Please check your email shortly.",
    timeStamp: new Date().valueOf() - 70000,
    payload: { sender: "support" },
  },
  {
    type: "message",
    message: "Received the reset link, trying now.",
    timeStamp: new Date().valueOf() - 65000,
    payload: { sender: "user" },
  },
  {
    type: "message",
    message: "Great! Let me know if it works.",
    timeStamp: new Date().valueOf() - 60000,
    payload: { sender: "support" },
  },
  {
    type: "message",
    message: "It worked, thanks!",
    timeStamp: new Date().valueOf() - 55000,
    payload: { sender: "user" },
  },
  {
    type: "message",
    message:
      "You're welcome! If you have any more questions, feel free to ask.",
    timeStamp: new Date().valueOf() - 50000,
    payload: { sender: "support" },
  },
  {
    type: "message",
    message: "Will do. Have a great day!",
    timeStamp: new Date().valueOf() - 45000,
    payload: { sender: "user" },
  },
];

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

CHAT_HISTORY.forEach((message) => {
  message.read = Math.random() > 0.5;
});

function handleChatsData(ws) {
  const adminId = DEFAULT_ADMIN.id; // ID администратора
  // Статистика для подсчета количества прочитанных и непрочитанных сообщений
  const data = [
    {
      userId: "111222",
      userName: "Mr Smith",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 1 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "333",
      userName: "John Doe",
      hasUnreadMessages: false,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 2 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "444",
      userName: "Bob Dylan",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 3 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "555",
      userName: "Wow Ser",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 4 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "111222",
      userName: "Mr Smith",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 1 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "333",
      userName: "John Doe",
      hasUnreadMessages: false,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 2 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "444",
      userName: "Bob Dylan",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 3 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "555",
      userName: "Wow Ser",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 4 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "111222",
      userName: "Mr Smith",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 1 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "333",
      userName: "John Doe",
      hasUnreadMessages: false,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 2 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "444",
      userName: "Bob Dylan",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 3 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
    {
      userId: "555",
      userName: "Wow Ser",
      hasUnreadMessages: true,
      lastMessage: {
        type: "message",
        message: faker.lorem.sentence(),
        timeStamp: new Date().valueOf() - (100000 - 4 * 5000),
        payload: {
          messageId: generateUUID(),
          wasRead: Math.random() > 0.5,
          senderId: generateUUID(),
          receiverId: adminId, // Фиксированный ID администратора
        },
      },
    },
  ];

  // Отправка статистики обратно на клиент
  const response = {
    type: "chatStats",
    payload: data,
  };

  ws.send(JSON.stringify(response));
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

  // Немедленно отправить первую активность
  // sendActivity();

  // Обновление и отправка активности каждые 15 секунд
  const intervalId = setInterval(() => {
    activityRecord = generateActivity(); // Генерация новой активности
    sendActivity();
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
      receivedData.type === "chatHistory"
      // && receivedData.code === "getHistory"
    ) {
      console.log(
        "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c \u0438\u0441\u0442\u043e\u0440\u0438\u044e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439"
      );
      const response = {
        type: "chatHistory",
        payload: CHAT_HISTORY,
        timestamp: new Date().valueOf(),
      };

      ws.send(JSON.stringify(response));
    }

    if (receivedData.type === "message") {
      // Отправка typingStarted
      ws.send(
        JSON.stringify({
          code: "typingStarted",
          message: receivedData.message,
          timeStamp: receivedData.timeStamp,
          type: "typing",
        })
      );

      // Отправка typingStopped через 2 секунды
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            code: "typingStopped",
            message: receivedData.message,
            timeStamp: receivedData.timeStamp,
            type: "typing",
          })
        );
      }, 3000);

      // Отправка окончательного сообщения через 4 секунды
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            type: "message",
            message: "Thank you for your message. We are looking into it.",
            timeStamp: new Date().valueOf(),
            payload: { sender: "support" },
          })
        );
      }, 6000);
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

    if (receivedData.type === "getChatStats") {
      handleChatsData(ws);
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

app.put("/api/users/currentUser", (req, res) => {
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
