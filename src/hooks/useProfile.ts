import { apiFetch } from "helpers/api";
import { useEffect, useState } from "react";
import { Author } from "types";

interface UseProfileResult {
  profile: Author | null;
  loading: boolean;
}

export const useProfile = (username: string): UseProfileResult => {
  const [profile, setProfile] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const data = await apiFetch<{ profile: Author }>(
        `${process.env.REACT_APP_API_URL}/api/profiles/${username}`
      );

      if (data) {
        setProfile(data.profile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [username]);

  return { profile, loading };
};
