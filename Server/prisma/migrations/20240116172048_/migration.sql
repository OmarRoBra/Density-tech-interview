-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
