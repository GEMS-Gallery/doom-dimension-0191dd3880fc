import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
}

function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizQuestions() {
      try {
        const quizQuestions = await backend.getQuizQuestions();
        setQuestions(quizQuestions);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizQuestions();
  }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleSubmit = async () => {
    if (selectedAnswer !== null) {
      const isCorrect = await backend.submitQuizAnswer(questions[currentQuestion].id, selectedAnswer);
      if (isCorrect) {
        setScore(score + 1);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (showResult) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Quiz Results
        </Typography>
        <Typography variant="h4">
          Your score: {score} out of {questions.length}
        </Typography>
      </Box>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        DOOM Quiz
      </Typography>
      <Typography variant="h5" gutterBottom>
        Question {currentQuestion + 1} of {questions.length}
      </Typography>
      <Typography variant="body1" paragraph>
        {question.question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {question.answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio />}
              label={answer}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={selectedAnswer === null}>
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </Box>
    </Box>
  );
}

export default Quiz;
