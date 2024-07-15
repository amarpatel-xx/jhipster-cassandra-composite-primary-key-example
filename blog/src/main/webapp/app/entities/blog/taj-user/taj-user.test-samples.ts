import { ITajUser, NewTajUser } from './taj-user.model';

export const sampleWithRequiredData: ITajUser = {
  id: 'ac112413-552f-49c3-bf37-2d81fcf39693',
  login: 'comprise like for',
};

export const sampleWithPartialData: ITajUser = {
  id: '0abed490-f3d0-4a6f-a90f-5e7b81cb97e9',
  login: 'cooperate for',
};

export const sampleWithFullData: ITajUser = {
  id: 'b9dc5497-b6ff-429f-8cd1-7ff28e080222',
  login: 'amazing overcharge',
};

export const sampleWithNewData: NewTajUser = {
  login: 'busy incidentally',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
