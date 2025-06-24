// src/api/RoadmapService.js
import apiClient from './apiClient';

// Makes a LIVE API call to generate a roadmap from a career goal.
export const getRoadmapByGoal = async (goal) => {
  try {
    // Note the endpoint is plural and specific as in your backend
    const response = await apiClient.post('/roadmaps/generate-by-text', { goal });
    // The actual data is nested under response.data.data
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to connect to the AI service. Please try again later.';
    throw new Error(errorMessage);
  }
};

// Makes a LIVE API call to generate a roadmap from a resume file.
export const generateFromResume = async (formData) => {
    try {
        // The endpoint for resume upload
        const response = await apiClient.post('/roadmaps/generate-by-resume', formData, {
            headers: {
                // Let browser set Content-Type for multipart/form-data
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to process the resume. Please ensure it is a valid PDF.';
        throw new Error(errorMessage);
    }
};