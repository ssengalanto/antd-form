export interface FormData {
  id: string;
  pet: string;
  src?: string;
  questions: { id: string; content: string }[];
}

export const formData = [
  {
    id: 'petId1',
    pet: 'dog',
    src: 'https://petdogowner.com/wp-content/uploads/2019/12/cute-dog-P9N2TKV.jpg',
    questions: [
      {
        id: 'questionId1',
        content: 'Is your dog on heartworm medication?',
      },
      {
        id: 'questionId2',
        content: 'Is he at a healthy weight?',
      },
    ],
  },
  {
    id: 'petId2',
    pet: 'cat',
    src: '',
    questions: [
      {
        id: 'questionId3',
        content: 'Is he or she getting the vaccines they need?',
      },
      {
        id: 'questionId4',
        content: 'How much does he or she weigh?',
      },
    ],
  },
];
