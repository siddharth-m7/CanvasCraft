require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');

// Routes
const uploadRoutes = require("./routes/uploadRoutes.js");
const imageRoutes = require("./routes/imageRoutes.js");
const imageGenRoutes = require('./routes/imageGenRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "blob:"],
      "connect-src": ["'self'", process.env.SUPABASE_URL],
      "frame-ancestors": ["'none'"],
    },
  },
}));

app.use(cookieParser());
app.use(morgan('combined'));


const allowedOrigin = process.env.CLIENT_URL;
app.use(cors({
  origin: function (origin, cb) {
    if (!origin || origin === allowedOrigin) return cb(null, true);
    return cb(new Error('CORS blocked'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-CSRF-Token'],
}));



// Routes
app.use('/api/auth', authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/images", imageRoutes);
app.use('/api/generate-image', imageGenRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// DB + Server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
