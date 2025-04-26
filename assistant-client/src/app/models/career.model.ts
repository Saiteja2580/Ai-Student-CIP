export interface RoadmapModule {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
}
