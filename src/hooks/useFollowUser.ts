import { useState, useEffect, useCallback, useMemo } from "react";
import { apiFetch } from "helpers/api";
import { showSuccessNotification } from "components";

interface UseFollowUser {
  toggleFollow: (follow: boolean) => Promise<void>;
  isFollowing: boolean;
  isLoading: boolean;
}

export const useFollowUser = (username: string): UseFollowUser => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = useMemo(() => localStorage.getItem("jwtToken"), []);
  const headers = useMemo(() => (token ? { Authorization: `Token ${token}` } : undefined), [token]);

  useEffect(() => {
    apiFetch<{ profile: { following: boolean } }>(
      `${process.env.REACT_APP_API_URL}/api/profiles/${username}`, { headers }
    ).then(data => {
      if (data) setIsFollowing(data.profile.following);
    });
  }, [username, headers]);

  const toggleFollow = useCallback(
    async (follow: boolean) => {
      setIsLoading(true);
      const method = follow ? "POST" : "DELETE";
      const url = `${process.env.REACT_APP_API_URL}/api/profiles/${username}/follow`;

      const data = await apiFetch<{ profile: { following: boolean } }>(url, { method, headers });
      if (data) {
        setIsFollowing(data.profile.following);
        showSuccessNotification(follow ? "Followed successfully!" : "Unfollowed successfully!");
      }
      setIsLoading(false);
    },
    [username, headers]
  );

  return { toggleFollow, isFollowing, isLoading };
};
