import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xzaldeeyqtfkgqnvspyo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YWxkZWV5cXRma2dxbnZzcHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyOTc5MzgsImV4cCI6MjAwNTg3MzkzOH0.TcLrs6x1Kmg3j4s-jt-Vil6TQA18xl49oBxBM-JRlxY';
const supabase = createClient(supabaseUrl, supabaseAnonKey, {auth: { persistSession: false }, })


export default supabase;