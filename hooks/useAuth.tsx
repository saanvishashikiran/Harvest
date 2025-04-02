import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

type AuthData = {
  user: User | null;
  role: string | null;
  loading: boolean;
  error: Error | null;
};

export function useAuth(): AuthData {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserRole = async (userId: string): Promise<string | null> => {
    try {
      // get user role from accounts table
      console.log("Fetching user role for ID:", userId);
      const { data:data, error: roleError } = await supabase
        .from("accounts")
        .select("role")
        .eq("uuid", userId)
        .single();
        
      if (roleError) throw roleError;
      return data?.role ?? null;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        setUser(session?.user ?? null);

        if (session?.user) {
          const userRole = await fetchUserRole(session.user.id);
          setRole(userRole);
        } else {
          setRole(null);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const userRole = await fetchUserRole(session.user.id);
        setRole(userRole);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return useMemo(
    () => ({ user, role, loading, error }),
    [user, role, loading, error]
  );
}
