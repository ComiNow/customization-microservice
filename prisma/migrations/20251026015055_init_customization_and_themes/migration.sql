-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UI_Configuration" (
    "id" SERIAL NOT NULL,
    "business_id" TEXT NOT NULL,
    "logo" TEXT,
    "font" TEXT DEFAULT 'Inter',
    "font_size" INTEGER DEFAULT 16,
    "image_carousel" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "theme_id" INTEGER NOT NULL,

    CONSTRAINT "UI_Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UI_Configuration_business_id_key" ON "UI_Configuration"("business_id");

-- CreateIndex
CREATE INDEX "UI_Configuration_business_id_idx" ON "UI_Configuration"("business_id");

-- AddForeignKey
ALTER TABLE "UI_Configuration" ADD CONSTRAINT "UI_Configuration_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
