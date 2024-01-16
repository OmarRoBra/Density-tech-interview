import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

interface commentReq {
  email: string;
  comment: string;
}

interface getParams {
  id: string;
}

router.get("/", async (req, res) => {
  try {
    let comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {}
});

router.get("/:id", async (req: { params: getParams }, res) => {
  try {
    const { id } = req.params;

    if (id == null) return res.json({ error: "No id send" }).status(404);
    let comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!comment) {
      res.json({ error: "comment not found" }).status(404);
    }

    res.json(comment);
  } catch (error) {}
});

router.post("/", async (req: { body: commentReq }, res) => {
  try {
    console.log(req.body);
    const result = await prisma.comment.create({ data: req.body });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const comment = await prisma.comment.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(comment).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id == null) return res.json({ error: "No id send" }).status(404);

    await prisma.comment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ data: "Comment deleted" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
