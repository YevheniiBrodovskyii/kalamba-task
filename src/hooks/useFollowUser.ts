import { useState, useCallback, useEffect } from "react";

interface ProfileResponse {
  profile: {
    following: boolean;
  };
}

interface UseFollowUser {
  followUser: (username: string) => Promise<void>;
  unfollowUser: (username: string) => Promise<void>;
  isFollowing: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useFollowUser = (username: string): UseFollowUser => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:3000/api/profiles/${username}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch follow status");
        const data: ProfileResponse = await response.json();
        setIsFollowing(data.profile.following);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchFollowStatus();
  }, [username, token]);

  const followUser = useCallback(
    async (username: string) => {
      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/profiles/${username}/follow`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to follow user");
        const data: ProfileResponse = await response.json();
        setIsFollowing(data.profile.following);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const unfollowUser = useCallback(
    async (username: string) => {
      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/profiles/${username}/follow`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to unfollow user");
        const data: ProfileResponse = await response.json();
        setIsFollowing(data.profile.following);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return { followUser, unfollowUser, isFollowing, isLoading, error };
};
