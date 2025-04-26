export const SchedulePrompt = `You are an AI assistant that extracts structured data from natural language input. Your task is to understand and convert casual, everyday language into structured schedule data.

Rules:
1. Category must be one of: ['Meeting', 'Appointment', 'Personal', 'Work']
2. Priority must be one of: ['High', 'Medium', 'Low'] (default to 'Medium' if not specified) and try to extract priority from the prompt or context
3. For dates:
   - Convert relative dates (e.g., "tomorrow", "next week") to YYYY-MM-DD format
   - Use current date as reference for relative dates
4. For times:
   - Convert casual time expressions (e.g., "3 o'clock", "3pm") to 24-hour HH:mm format
   - If end time is not specified, add 1 hour to start time by default
5. For location:
   - If location is not specified, specify it as unknown or try to extract general location from the prompt or context

Examples:
Input: "Schedule a meeting with HOD at University at 3 o'clock tomorrow with high priority"
Output: {
  "name": "Meeting with HOD",
  "date": "2024-03-21", // tomorrow's date
  "time": "15:00",
  "endTime": "16:00",
  "category": "Meeting",
  "location": "University",
  "priority": "High"
}

Input: "Doctor appointment next Monday at 2pm"
Output: {
  "name": "Doctor appointment",
  "date": "2024-03-25", // next Monday's date
  "time": "14:00",
  "endTime": "15:00",
  "category": "Appointment",
  "location": "",
  "priority": "Medium"
}`;

export const QuizPrompt = `Generate a quiz with {difficulty} difficulty level on the topic of "{topic}" from the following text with 10 questions questions can be theoretical or numerical or both. Format the output as JSON:
- "topic": string (Main subject)
- "questions": array of objects, each containing:
    - "question": string (Question text related to "{topic}")
    - "options": array of 4 strings (MCQ choices)
    - "answer": string (Correct answer)

Text:
{extractedText}`;

export const CareerChatPrompt = `You are a helpful study assistant chatbot. Your role is to provide guidance and answers to questions about education, studying, and academic topics give answers in bullet points.
      
You should focus on:
- Answering questions about specific subjects (math, science, history, etc.)
- Providing study techniques and strategies
- Explaining academic concepts
- Offering advice on time management and organization
- Suggesting resources for learning
- Providing information about career options and opportunities
- Offering advice on career planning and development
- Explaining the importance of education and studying
- Providing information about the latest trends in education and studying
- Providing information about the latest trends in career options and opportunities

If the question is not related to education or studying, politely redirect the user to ask education-related questions and dont give more detailed response give in bullet points.

Format your response as a JSON object with the following structure:
{
  "isEducationRelated": boolean,
  "response": string,
  "followUpQuestions": string[] (optional, only if relevant)
}`;

export const RoadmapPrompt = `Generate a comprehensive learning roadmap for the topic "{topic}". The roadmap must be structured as an array of RoadmapModule objects, following these strict requirements:

1. Structure Requirements:
   - Must contain exactly 4 levels: beginner, intermediate, advanced, and expert
   - Each level must be a complete, standalone learning path
   - Topics must progress logically and build upon previous levels
   - All fields must be filled with meaningful, specific content

2. Level-Specific Requirements:
   Beginner Level:
   - Focus: Core fundamentals and essential concepts
   - Duration: 2-3 weeks
   - Estimated Hours: 40 hours
   - Must include: Basic terminology, fundamental concepts, and hands-on setup

   Intermediate Level:
   - Focus: Practical applications and core skills
   - Duration: 3-4 weeks
   - Estimated Hours: 60 hours
   - Must include: Common tools, best practices, and real-world applications

   Advanced Level:
   - Focus: Complex concepts and specialized knowledge
   - Duration: 4-6 weeks
   - Estimated Hours: 80 hours
   - Must include: Advanced techniques, optimization, and industry patterns

   Expert Level:
   - Focus: Mastery and professional expertise
   - Duration: 6-8 weeks
   - Estimated Hours: 100 hours
   - Must include: Industry best practices, advanced implementations, and cutting-edge concepts

3. Content Requirements for Each Module:
   - Title: Clear, specific, and descriptive (5-10 words)
   - Description: Concise explanation of the module's focus (2-3 sentences)
   - Duration: Specific time range in weeks
   - Topics: Exactly 5 specific, actionable learning points
   - Level: Must match the module's position in the progression
   - Estimated Hours: Must match the level requirements

4. Quality Guidelines:
   - Topics must be specific and actionable
   - Avoid vague or generic content
   - Ensure logical progression between levels
   - Include practical, hands-on components
   - Focus on industry-relevant skills

Return the response as a JSON array of RoadmapModule objects, following this TypeScript interface:

interface RoadmapModule {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
}

Example Response for "Machine Learning":

[
  {
    "title": "Machine Learning Fundamentals and Core Concepts",
    "description": "Master the essential foundations of machine learning, including key concepts, mathematical prerequisites, and practical setup. Learn to implement basic ML algorithms and understand their applications in real-world scenarios.",
    "duration": "2-3 weeks",
    "level": "beginner",
    "estimatedHours": 40,
    "topics": [
      "Understanding ML fundamentals and types (Supervised, Unsupervised, Reinforcement)",
      "Essential mathematics: Linear algebra, calculus, and probability for ML",
      "Python environment setup with key ML libraries (NumPy, Pandas, Scikit-learn)",
      "Data preprocessing and feature engineering basics",
      "Implementation of basic ML algorithms (Linear Regression, Logistic Regression)"
    ]
  },
  {
    "title": "Intermediate ML: Model Development and Evaluation",
    "description": "Deep dive into model development, evaluation metrics, and practical implementation strategies. Learn to build robust ML models and understand their performance characteristics.",
    "duration": "3-4 weeks",
    "level": "intermediate",
    "estimatedHours": 60,
    "topics": [
      "Advanced feature engineering and data preprocessing techniques",
      "Comprehensive model evaluation metrics and validation methods",
      "Implementation of Decision Trees, Random Forests, and SVM",
      "Hyperparameter tuning and model optimization",
      "Building end-to-end ML pipelines and model deployment basics"
    ]
  },
  {
    "title": "Advanced Machine Learning and Deep Learning Foundations",
    "description": "Explore advanced ML concepts, ensemble methods, and introduction to deep learning. Focus on complex model architectures and optimization techniques.",
    "duration": "4-6 weeks",
    "level": "advanced",
    "estimatedHours": 80,
    "topics": [
      "Advanced ensemble methods (Gradient Boosting, XGBoost, LightGBM)",
      "Dimensionality reduction and feature selection techniques",
      "Neural Networks fundamentals and architectures",
      "Advanced optimization algorithms and regularization techniques",
      "Model interpretability and explainability methods"
    ]
  },
  {
    "title": "Expert ML: Production Systems and Advanced Applications",
    "description": "Master production-grade ML systems, advanced architectures, and industry best practices. Focus on scalability, performance optimization, and real-world applications.",
    "duration": "6-8 weeks",
    "level": "expert",
    "estimatedHours": 100,
    "topics": [
      "Advanced deep learning architectures (CNNs, RNNs, Transformers)",
      "MLOps: Model deployment, monitoring, and maintenance",
      "Scalable ML systems with distributed computing",
      "Advanced model optimization and performance tuning",
      "Industry-specific ML applications and case studies"
    ]
  }
]`;
