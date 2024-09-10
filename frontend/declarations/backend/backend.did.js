export const idlFactory = ({ IDL }) => {
  const GalleryImage = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'caption' : IDL.Text,
  });
  const GameInfo = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'releaseDate' : IDL.Text,
    'developer' : IDL.Text,
  });
  const QuizQuestion = IDL.Record({
    'id' : IDL.Nat,
    'question' : IDL.Text,
    'answers' : IDL.Vec(IDL.Text),
    'correctAnswerIndex' : IDL.Nat,
  });
  return IDL.Service({
    'getAverageRating' : IDL.Func([], [IDL.Opt(IDL.Float64)], ['query']),
    'getGalleryImages' : IDL.Func([], [IDL.Vec(GalleryImage)], ['query']),
    'getGameInfo' : IDL.Func([], [GameInfo], ['query']),
    'getQuizQuestions' : IDL.Func([], [IDL.Vec(QuizQuestion)], ['query']),
    'getRatings' : IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
    'submitQuizAnswer' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'submitRating' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
