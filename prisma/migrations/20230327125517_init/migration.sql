-- CreateTable

CREATE TABLE
    "users" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "categories" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "icon" TEXT NOT NULL,
        CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "trainings" (
        "id" TEXT NOT NULL,
        "clientName" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "exercises" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "instructions" TEXT [],
        "series" TEXT NOT NULL,
        "waitTime" TEXT NOT NULL,
        "imagePath" TEXT NOT NULL,
        "categoryId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "_trainings" (
        "A" TEXT NOT NULL,
        "B" TEXT NOT NULL
    );

-- CreateIndex

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex

CREATE UNIQUE INDEX "_trainings_AB_unique" ON "_trainings"("A", "B");

-- CreateIndex

CREATE INDEX "_trainings_B_index" ON "_trainings"("B");

-- AddForeignKey

ALTER TABLE "trainings"
ADD
    CONSTRAINT "trainings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "exercises"
ADD
    CONSTRAINT "exercises_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "exercises"
ADD
    CONSTRAINT "exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "_trainings"
ADD
    CONSTRAINT "_trainings_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "_trainings"
ADD
    CONSTRAINT "_trainings_B_fkey" FOREIGN KEY ("B") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;