import { Question } from "@/components/quiz/QuizQuestion";

export const quizQuestions: Question[] = [
  {
    id: "age",
    text: "What is your age?",
    subtext: "Your age helps determine appropriate screening recommendations",
    options: [
      { id: "35-44", label: "35-44 years old" },
      { id: "45-54", label: "45-54 years old" },
      { id: "55-64", label: "55-64 years old" },
      { id: "65+", label: "65 or older" },
    ],
  },
  {
    id: "family-cancer",
    text: "Has anyone in your immediate family been diagnosed with cancer?",
    subtext: "Immediate family includes parents, siblings, and children",
    options: [
      { id: "yes-one", label: "Yes, one family member" },
      { id: "yes-multiple", label: "Yes, multiple family members" },
      { id: "no", label: "No" },
      { id: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: "cancer-age",
    text: "At what age was your family member diagnosed?",
    subtext: "If multiple, consider the youngest age at diagnosis",
    options: [
      { id: "under-50", label: "Under 50 years old" },
      { id: "50-60", label: "50-60 years old" },
      { id: "over-60", label: "Over 60 years old" },
      { id: "unknown", label: "I don't know" },
    ],
  },
  {
    id: "cancer-type",
    text: "What type of cancer was diagnosed in your family?",
    subtext: "Select the most relevant option",
    options: [
      { id: "breast-ovarian", label: "Breast or ovarian cancer" },
      { id: "colorectal", label: "Colorectal cancer" },
      { id: "prostate", label: "Prostate cancer" },
      { id: "lung", label: "Lung cancer" },
      { id: "other", label: "Other type of cancer" },
      { id: "multiple", label: "Multiple types" },
    ],
  },
  {
    id: "genetic-testing",
    text: "Has anyone in your family had genetic testing for cancer risk?",
    options: [
      { id: "yes-positive", label: "Yes, and a mutation was found" },
      { id: "yes-negative", label: "Yes, but no mutation was found" },
      { id: "no", label: "No genetic testing has been done" },
      { id: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: "smoking-history",
    text: "Which best describes your smoking history?",
    subtext: "Smoking history affects lung cancer screening recommendations",
    options: [
      { id: "never", label: "Never smoked" },
      { id: "former", label: "Former smoker" },
      { id: "current", label: "Current smoker" },
    ],
  },
  {
    id: "personal-history",
    text: "Have you personally had any cancer screenings?",
    subtext: "Such as mammograms, colonoscopies, or PSA tests",
    options: [
      { id: "yes-regular", label: "Yes, I get regular screenings" },
      { id: "yes-once", label: "Yes, but only once or twice" },
      { id: "no", label: "No, I haven't had any screenings" },
      { id: "unsure", label: "I'm not sure what counts" },
    ],
  },
];
