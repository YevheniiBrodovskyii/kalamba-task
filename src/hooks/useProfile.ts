import { useEffect, useState } from "react";
import { Author } from "types";

interface UseProfileResult {
  profile: Author | null;
  loading: boolean;
  error: string | null;
}

export const useProfile = (username: string): UseProfileResult => {
  const [profile, setProfile] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/profiles/${username}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return { profile, loading, error };
};
