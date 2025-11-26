import { useState, useEffect } from 'react';

interface UserDataToStore {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  avatar: string;
  is_superadmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<UserDataToStore | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      try {
        const parsedUser: UserDataToStore = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('user_data'); 
      }
    }
  }, []); 

  

  return { user, isAuthenticated };
}