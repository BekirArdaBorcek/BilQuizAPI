import Router from "express";
import {
  GetQuizzes,
  GetQuizzesID,
  CreateQuiz,
  SubmitAll,
} from "../Controllers/Controller.js";

const router = Router();

router.get("/quizzes", GetQuizzes);
router.get("/quizzes/:id", GetQuizzesID);

router.post("/quizzes", CreateQuiz);
router.post("/quizzes/submit-all", SubmitAll);

export default router;
