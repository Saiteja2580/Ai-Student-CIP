export interface CareerAssessmentModel {
  interests: {
    enjoyedActivities: string[];
    enjoyedSchoolSubjects: string[];
  };
  skills: {
    problemSolving: number;
    communication: number;
    teamwork: number;
    leadership: number;
    proudProject: string;
  };
  values: {
    rankedWorkValues: {
      autonomy: number;
      collaboration: number;
      creativity: number;
      stability: number;
      highIncome: number;
    };
  };
  learningStyle: {
    reading: number;
    practical: number;
    visual: number;
    group: number;
    comfortWithTechnicalDetail: number;
  };
}
