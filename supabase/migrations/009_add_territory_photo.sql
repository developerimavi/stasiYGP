-- Adds an optional photo thumbnail to territories (wilayah).
-- Run this in the Supabase SQL editor after migrations 001-008.

alter table territories add column if not exists photo_url text;
