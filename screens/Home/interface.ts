interface MovieSectionInterface {
  rating: {
    average: number;
    count: number;
  };
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  genres: string[];
}

interface SectionsProps {
  type: string;
  title?: string;
  data?: MovieSectionInterface[];
}

export type { SectionsProps };