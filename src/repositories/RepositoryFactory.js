import TMdbRepository from "./TMdbRepository";

const repositories = {
  movies: TMdbRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
