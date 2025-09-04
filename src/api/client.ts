import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://dummy-api-jtg6bessta-ey.a.run.app';

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/getCategories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const fetchQuestions = async () => {
  const response = await fetch(`${BASE_URL}/getQuestions`);
  if (!response.ok) throw new Error('Failed to fetch questions');
  return response.json();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
};