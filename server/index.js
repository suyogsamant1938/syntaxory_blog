import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

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
