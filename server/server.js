import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import swaggerSpec from './utils/swagger.js';
import connectDb from './config/mongodb.js';
import './config/cloudinary.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import documentRouter from './routes/document.route.js';
import collaboratorRoute from './routes/collaborator.route.js';
import { initSocket } from './utils/socket.js';

console.log(
  'TEST URI:',
  process.env.MONGO_DB_URI ? 'Found it!' : 'Still Undefined'
);

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Security & Optimization Middlewares
app.use(helmet());
app.use(compression());

// Global API Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window`
  standardHeaders: true, 
  legacyHeaders: false, 
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use('/api', apiLimiter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'session_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Realtime Collaboration System "CUBE COLLAB"');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/document', documentRouter);
app.use('/api/collaborator', collaboratorRoute);

initSocket(server);
connectDb();
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
