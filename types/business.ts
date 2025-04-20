export interface Business {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    website: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
