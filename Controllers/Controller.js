import QuizSchema from "../Models/Model.js";

const GetQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizSchema.find();
    res.json(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const GetQuizzesID = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await QuizSchema.findById(quizId);

    if (!quiz) {
      return res
        .status(404)
        .json({ error: `Quiz with ID ${quizId} not found` });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const CreateQuiz = async (req, res) => {
  try {
    const { question, options, correctOption } = req.body;
    const quiz = new QuizSchema({
      question,
      options,
      correctOption,
    });
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const SubmitAll = async (req, res) => {
  const userAnswers = req.body.userAnswers;

  try {
    const results = [];

    for (const answer of userAnswers) {
      const quizId = answer.quizId;
      const selectedOption = answer.selectedOption;

      const quiz = await QuizSchema.findById(quizId);
      if (!quiz) {
        return res
          .status(404)
          .json({ error: `Quiz with ID ${quizId} not found` });
      }

      const isCorrect = parseInt(selectedOption) === quiz.correctOption;

      results.push({
        quizId,
        question: quiz.question,
        selectedOption,
        correctOption: quiz.options[quiz.correctOption],
        isCorrect,
      });
    }

    const correctCount = results.filter(result => result.isCorrect).length;
    const incorrectCount = results.length - correctCount;

    return res.json({ results, correctCount, incorrectCount });
  } catch (error) {
    console.error("Error submitting all quizzes:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export { GetQuizzes, GetQuizzesID, CreateQuiz, SubmitAll };
