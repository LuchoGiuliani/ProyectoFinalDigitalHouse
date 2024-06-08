// utils/api.js
export const fetchUserData = async (user_id, token) => {
    try {
      const response = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  