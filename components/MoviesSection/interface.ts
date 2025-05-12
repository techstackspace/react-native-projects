export interface MoviesSectionInterface {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  posterUrl: string;
  rating: {
    average: number;
    count: number;
  };
  totalMovies: number;
}