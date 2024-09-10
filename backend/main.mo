import Bool "mo:base/Bool";
import Int "mo:base/Int";

import Array "mo:base/Array";
import Float "mo:base/Float";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type GameInfo = {
    title: Text;
    releaseDate: Text;
    developer: Text;
    description: ?Text;
  };

  type GalleryImage = {
    id: Nat;
    url: Text;
    caption: Text;
  };

  type QuizQuestion = {
    id: Nat;
    question: Text;
    answers: [Text];
    correctAnswerIndex: Nat;
  };

  stable var gameInfo: GameInfo = {
    title = "DOOM";
    releaseDate = "December 10, 1993";
    developer = "id Software";
    description = ?"DOOM is a first-person shooter game developed by id Software.";
  };

  stable var galleryImages: [GalleryImage] = [
    { id = 0; url = "doom_cover.jpg"; caption = "DOOM Cover Art" },
    { id = 1; url = "doom_gameplay.jpg"; caption = "DOOM Gameplay Screenshot" },
  ];

  stable var quizQuestions: [QuizQuestion] = [
    {
      id = 0;
      question = "Who is the main protagonist in DOOM?";
      answers = ["Doomguy", "Master Chief", "Gordon Freeman", "Duke Nukem"];
      correctAnswerIndex = 0;
    },
    {
      id = 1;
      question = "What year was the original DOOM released?";
      answers = ["1991", "1993", "1995", "1997"];
      correctAnswerIndex = 1;
    },
  ];

  stable var ratings: [Nat] = [];

  public query func getGameInfo(): async GameInfo {
    gameInfo
  };

  public query func getGalleryImages(): async [GalleryImage] {
    galleryImages
  };

  public query func getQuizQuestions(): async [QuizQuestion] {
    Array.map(quizQuestions, func (q: QuizQuestion): QuizQuestion {
      {
        id = q.id;
        question = q.question;
        answers = q.answers;
        correctAnswerIndex = 0; // Hide correct answer
      }
    })
  };

  public func submitQuizAnswer(questionId: Nat, answerIndex: Nat): async Bool {
    switch (Array.find(quizQuestions, func (q: QuizQuestion): Bool { q.id == questionId })) {
      case (?question) {
        question.correctAnswerIndex == answerIndex
      };
      case null { false };
    }
  };

  public query func getRatings(): async [Nat] {
    ratings
  };

  public func submitRating(rating: Nat): async () {
    if (rating >= 1 and rating <= 5) {
      ratings := Array.append(ratings, [rating]);
    };
  };

  public query func getAverageRating(): async ?Float {
    let sum = Array.foldLeft(ratings, 0, func (acc: Nat, r: Nat): Nat { acc + r });
    let count = ratings.size();
    if (count > 0) {
      ?(Float.fromInt(sum) / Float.fromInt(count))
    } else {
      null
    }
  };
}
