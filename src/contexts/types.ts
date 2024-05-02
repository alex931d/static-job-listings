interface IJob {
  id: number;
  company: string;
  logo: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  level: string;
  role: string;
  languages: string[];
  tools: string[];
  new: boolean;
  featured: boolean;
}
interface IProject extends Array<IJob> {}
export type { IJob, IProject };
