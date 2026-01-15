import { createClient } from "../supabase/client";

export async function sendOtp(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Verify OTP code entered by user
 */
export async function verifyOtp(email: string, token: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Get current session
 */
export async function getSession() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}

/**
 * Get current user
 */
export async function getUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}
