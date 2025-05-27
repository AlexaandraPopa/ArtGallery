window.SUPABASE_URL = "https://vkwewthnnbmqqzxqlvtn.supabase.co";
window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrd2V3dGhubmJtcXF6eHFsdnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzY1ODksImV4cCI6MjA2MzI1MjU4OX0.UMjHOB0TB6enhIM86c9AwzlkvagAaqULAHXXbQdc_xA";

const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
window.supabase = supabaseClient;
