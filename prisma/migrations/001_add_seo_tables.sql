-- Add SEO pages table for programmatic content
CREATE TABLE IF NOT EXISTS "seo_pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "template" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT,
    "district" TEXT,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "h1Title" TEXT NOT NULL,
    "content" TEXT NOT NULL, -- JSON content
    "schemaMarkup" TEXT NOT NULL, -- JSON schema
    "keywords" TEXT NOT NULL, -- Comma-separated keywords
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add location data table for SEO targeting
CREATE TABLE IF NOT EXISTS "location_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "population" INTEGER NOT NULL DEFAULT 0,
    "climateScore" INTEGER NOT NULL DEFAULT 50,
    "soilPh" REAL NOT NULL DEFAULT 5.0,
    "teaEstatesCount" INTEGER NOT NULL DEFAULT 0,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "governmentSchemes" TEXT NOT NULL, -- JSON array
    "nearbyFarms" TEXT NOT NULL, -- JSON array
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add keyword tracking table
CREATE TABLE IF NOT EXISTS "keyword_tracking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keyword" TEXT NOT NULL,
    "searchVolume" INTEGER NOT NULL DEFAULT 0,
    "difficulty" INTEGER NOT NULL DEFAULT 50,
    "currentRank" INTEGER,
    "targetPage" TEXT,
    "lastChecked" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "seo_pages_state_city_idx" ON "seo_pages"("state", "city");
CREATE INDEX IF NOT EXISTS "seo_pages_template_idx" ON "seo_pages"("template");
CREATE INDEX IF NOT EXISTS "seo_pages_published_idx" ON "seo_pages"("isPublished");
CREATE INDEX IF NOT EXISTS "location_data_state_idx" ON "location_data"("state");
CREATE INDEX IF NOT EXISTS "keyword_tracking_keyword_idx" ON "keyword_tracking"("keyword");