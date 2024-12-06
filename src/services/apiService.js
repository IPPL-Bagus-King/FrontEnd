const BASE_URL = import.meta.env.VITE_BASE_URL;
 
// Fetch forums 
export const fetchForums = async () => {
    const response = await fetch(`${BASE_URL}/forum`);
    if (!response.ok) throw new Error(`Failed to fetch forums: ${response.statusText}`);
    return response.json();
  };

// Fetch teacher data
export const fetchTeacher = async (teacherId) => {
    const response = await fetch(`${BASE_URL}/users/${teacherId}`);
    if (!response.ok) throw new Error(`Failed to fetch teacher with id ${teacherId}`);
    return response.json();
  };

// Fetch forum rating
export const fetchRating = async (forumId) => {
    const response = await fetch(`${BASE_URL}/review/${forumId}`);
    return response.json();
  };
  
// Approve teacher
export const approveTeacher = async (teacherId, token) => {
    const response = await fetch(`${BASE_URL}/admin/pending-teacher/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: 'approve' }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to approve teacher');
    }
  };
  
  // Reject teacher
export const rejectTeacher = async (teacherId, token) => {
    const response = await fetch(`${BASE_URL}/admin/pending-teacher/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: 'reject' }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to reject teacher');
    }
  };

  //  Register User
  export const registerUser = async (formData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registrasi gagal');
    }
  
    return response.json();
  };
  
