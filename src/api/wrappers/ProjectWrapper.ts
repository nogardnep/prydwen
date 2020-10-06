import { Resource } from './../entities/Resource';
import { Project } from './../entities/Project';

export interface ProjectWrapper {
  project: Project;
  path: string;
}
