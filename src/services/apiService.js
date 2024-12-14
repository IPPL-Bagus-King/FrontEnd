const BASE_URL = import.meta.env.VITE_BASE_URL;
 
// Fetch forums 
export const fetchForums = async () => {
    const response = await fetch(`${BASE_URL}/forum`);
    if (!response.ok) throw new Error(`Failed to fetch forums: ${response.statusText}`);
    return response.json();
  };

// fetch forum by its id
export const fetchForumById = async (forumId, token) => {
  const response = await fetch(`${BASE_URL}/forum/${forumId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch forum with id ${forumId}: ${response.statusText}`);
  return response.json();
}

// Fetch forums by teacher id and combine data
export const fetchForumsByTeacherId = async (teacherId, token) => {
  const response = await fetch(`${BASE_URL}/forum/teacher-forums/${teacherId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch forums by teacher id: ${response.statusText}`);
  }

  const forums = await response.json();

  // For each forum, fetch teacher data and rating
  const enrichedForums = await Promise.all(
    forums.data.map(async (forum) => {
      try {
        const teacherData = await fetchTeacher(forum.teacher_id);
        const ratingData = await fetchRating(forum.id);

        return {
          ...forum,
          teacher_name: teacherData.data.username,
          teacher_picture: teacherData.data.picture,
          rating: ratingData.averageRating,
        };
      } catch (error) {
        console.error(`Failed to fetch additional data for forum ${forum.id}:`, error);
        return forum;
      }
    })
  );
  return enrichedForums;
};

// Fetch history checkout forum by forum id
export const fetchHistoryCheckoutbyForum = async (forumId, token) => {
  const response = await fetch(`${BASE_URL}/checkout/history-forum/${forumId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch checkout history: ${response.statusText}`);
  }

  return response.json();
}

// Fetch teacher data
export const fetchTeacher = async (teacherId) => {
    const response = await fetch(`${BASE_URL}/users/${teacherId}`);
    if (!response.ok) throw new Error(`Failed to fetch teacher with id ${teacherId}`);
    return response.json();
  };

// Fetch forum rating
export const fetchRating = async (forumId) => {
    const response = await fetch(`${BASE_URL}/review/${forumId}`);
    if (!response.ok) throw new Error(`Failed to fetch forum review with id ${forumId}`);
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

  // Fetch pending teachers
export const fetchPendingTeachers = async (token) => {
  const response = await fetch(`${BASE_URL}/admin/pending-teacher`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch pending teachers');
  }

  return response.json();
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

export const createForum = async (formData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/forum`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Gunakan token untuk otorisasi
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create forum: ${response.statusText}`);
    }

    return await response.json(); // Kembalikan data forum yang baru dibuat
  } catch (error) {
    console.error('Error creating forum:', error);
    throw error; // Re-throw error supaya bisa ditangani di komponen
  }
};


// Fetch checkout 
export const fetchCheckout = async (forumId) => {
  try {
    const response = await fetch(`${BASE_URL}/checkout/check-purchase/${forumId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Menangani status selain 200
    if (!response.ok) {
      if (response.status === 404) {
        return 'not_found'; // Jika 404, kembalikan 'not_found'
      }
      throw new Error(`Failed to fetch checkout data: ${response.statusText}`);
    }

    const data = await response.json(); // Mengambil data JSON
    return data; // Mengembalikan data checkout yang valid jika status 200

  } catch (error) {
    console.error('Error fetching checkout data:', error);
    return 'not_found'; // Jika terjadi error, kembalikan 'not_found'
  }

};

export const editForum = async (forumId, formData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/forum/${forumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update forum: ${response.statusText}`);
    }

    return await response.json(); // Kembalikan data forum yang baru diedit
  } catch (error) {
    console.error('Error updating forum:', error);
    throw error; // Re-throw error supaya bisa ditangani di komponen
  }
};

export const deleteForum = async (forumId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/forum/${forumId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Gagal menghapus forum');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting forum:', error);
    throw error; // Re-throw the error to be handled in the component
  }
};

export const uploadMaterial = async (forumId, formData, token) => {
  try {
    console.log(formData)
    const response = await fetch(`${BASE_URL}/forum/${forumId}/materials`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

  if (!response.ok) {
    throw new Error('Gagal upload materi!');
  }

  return await response.json();
  } catch (error) {
    console.error('Error uploading material:', error);
    throw error;
  }
};