import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface GalleryImage {
  'id' : bigint,
  'url' : string,
  'caption' : string,
}
export interface GameInfo {
  'title' : string,
  'description' : [] | [string],
  'releaseDate' : string,
  'developer' : string,
}
export interface QuizQuestion {
  'id' : bigint,
  'question' : string,
  'answers' : Array<string>,
  'correctAnswerIndex' : bigint,
}
export interface _SERVICE {
  'getAverageRating' : ActorMethod<[], [] | [number]>,
  'getGalleryImages' : ActorMethod<[], Array<GalleryImage>>,
  'getGameInfo' : ActorMethod<[], GameInfo>,
  'getQuizQuestions' : ActorMethod<[], Array<QuizQuestion>>,
  'getRatings' : ActorMethod<[], Array<bigint>>,
  'submitQuizAnswer' : ActorMethod<[bigint, bigint], boolean>,
  'submitRating' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
