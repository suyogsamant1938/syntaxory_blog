import { supabaseAdmin } from "../config/supabase.js";

/**
 * POST /upload-image
 * Middleware: authenticate, requirePaidUser
 */
export const uploadImage = async (req, res) => {
  try {
    const { fileName, fileType, blogId } = req.body;

    // Limit file size check should be done on frontend first
    // Backend double-check: 2MB = 2 * 1024 * 1024 bytes
    if (req.headers["content-length"] > 2 * 1024 * 1024) {
      return res.status(400).json({ message: "File too large (max 2MB)" });
    }

    const { data, error } = await supabaseAdmin.storage
      .from("blog-images")
      .createSignedUploadUrl(fileName, 60 * 5); // 5 min signed URL

    if (error) return res.status(500).json({ message: error.message });

    res.json({ signedUrl: data.signedUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
