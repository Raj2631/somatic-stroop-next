-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "diagnosis" TEXT,
    "language" TEXT NOT NULL,
    "interference" INTEGER NOT NULL,
    "rt_somatic" INTEGER NOT NULL,
    "rt_neutral" INTEGER NOT NULL,
    "rt_color" INTEGER NOT NULL,
    "accuracy" REAL NOT NULL,
    "totalTrials" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Trial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "trialNum" INTEGER NOT NULL,
    "phase" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "rt_ms" INTEGER NOT NULL,
    CONSTRAINT "Trial_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
