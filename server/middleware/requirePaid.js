import supabase from "../config/supabase.js";

export const requirePaidUser = async (req, res, next) => {
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", req.user.id)
    .single();

  if (data?.role !== "PAID_SUBSCRIBER") {
    return res.status(403).json({ message: "Subscription required" });
  }

  next();
};
