import { Job } from 'src/entities';
export type JobPayload = {
    job: Partial<Job>;
    company: string;
    category: string;
};
