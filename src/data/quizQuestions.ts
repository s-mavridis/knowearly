import { Question } from "@/components/quiz/QuizQuestion";

export const quizQuestions: Question[] = [
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
