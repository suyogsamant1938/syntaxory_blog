import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";
import webhookHandler from './controllers/webhookController.js';
import blogRoutes from "./routes/blogRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import aiBlogRoutes from "./routes/aiBlogRoutes.js";
import rateLimit from 'express-rate-limit';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
app.use(limiter);

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Stripe webhook endpoint requires the raw body for signature verification
// Register it BEFORE the JSON body parser so the raw body is preserved
app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// JSON parsing for all other routes
app.use(express.json());

// Mount routes under /api
app.use('/api/blogs', blogRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiBlogRoutes);
app.use("/api/images", imageRoutes);

app.use(errorHandler);

// Add a health check route at /health
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Test Supabase connection by fetching 1 blog
app.get('/db-health', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json({ 
      message: 'Supabase connection successful', 
      data 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Start server on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
