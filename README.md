```markdown
# ControlSystemBackend

Backend-часть монолитного веб-приложения для централизованного управления строительными объектами.  
Проект разделён на несколько сервисов с отдельными Fastify-серверами и единым API Gateway.

---

## Структура проекта

```

ControlSystemBackend/
│
├─ api_gateway/          # Шлюз (Gateway)
├─ service_users/        # Сервис пользователей
├─ service_orders/       # Сервис заказов
├─ .env                  # Переменные окружения (по желанию)
└─ README.md

````

---

## Требования

- Node.js >= 20.x
- npm >= 9.x
- TypeScript >= 5.x

---

## Установка зависимостей

Для каждого сервиса выполняется отдельно:

### 1. `service_users`

```bash
cd service_users
npm install
````

### 2. `service_orders`

```bash
cd ../service_orders
npm install
```

### 3. `api_gateway`

```bash
cd ../api_gateway
npm install
```

---

## Настройка переменных окружения

Создайте файл `.env` в корне каждого сервиса при необходимости:

```env
# service_users/.env
PORT=4000

# service_orders/.env
PORT=5000

# api_gateway/.env
PORT=3000
USERS_URL=http://localhost:4000
ORDERS_URL=http://localhost:5000
```

---

## Запуск сервисов локально

**Важно:** Gateway должен стартовать **после** всех сервисов.

### 1. Сервис пользователей

```bash
cd service_users
npm run dev
```

Локальный сервер будет слушать на `http://0.0.0.0:4000`.

### 2. Сервис заказов

```bash
cd ../service_orders
npm run dev
```

Локальный сервер будет слушать на `http://0.0.0.0:5000`.

### 3. API Gateway

```bash
cd ../api_gateway
npm run dev
```

Локальный сервер будет слушать на `http://0.0.0.0:3000`.

---

## Тестирование

### 1. Прямой запрос к сервисам

```bash
# Получить пользователей
curl http://localhost:4000/users

# Получить заказы
curl http://localhost:5000/orders
```

### 2. Через Gateway

```bash
# Получить пользователей через Gateway
curl http://localhost:3000/api/v1/users

# Получить заказы через Gateway
curl http://localhost:3000/api/v1/orders
```

---

## Сборка проекта (Production)

Для каждого сервиса:

```bash
npm run build
```

Для запуска скомпилированной версии:

```bash
npm start
```

---

## Стек технологий

* [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [Fastify](https://www.fastify.io/) — HTTP-фреймворк
* [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit) — лимитирование запросов
* [@fastify/http-proxy](https://github.com/fastify/fastify-http-proxy) — проксирование API Gateway
* [uuid](https://www.npmjs.com/package/uuid) — генерация уникальных идентификаторов
* [Pino](https://getpino.io/) — логирование

---

## Полезные команды

| Команда                          | Действие                           |
| -------------------------------- | ---------------------------------- |
| `npm run dev`                    | Запуск сервиса в режиме разработки |
| `npm run build`                  | Сборка TypeScript в JS             |
| `npm start`                      | Запуск скомпилированного сервиса   |
| `curl http://localhost:PORT/...` | Тест API                           |


```
