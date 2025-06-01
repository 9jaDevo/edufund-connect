import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RECAPTCHA_V3_SECRET_KEY = Deno.env.get("RECAPTCHA_V3_SECRET_KEY");
const RECAPTCHA_V2_SECRET_KEY = Deno.env.get("RECAPTCHA_V2_SECRET_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 200 });
  }

  try {
    const { token, version } = await req.json();
    
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const secretKey = version === "v3" ? RECAPTCHA_V3_SECRET_KEY : RECAPTCHA_V2_SECRET_KEY;
    
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Verification failed" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});