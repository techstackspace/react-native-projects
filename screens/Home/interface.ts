import { MoviesInterface } from "@/components/MoviesSection/interface";

interface SectionsProps {
  type: string;
  title?: string;
  data?: MoviesInterface[];
}

export type { SectionsProps };