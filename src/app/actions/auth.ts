"use server";

export async function authenticate(formData: FormData, mode: 'login' | 'register') {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (mode === 'login') {
    if (email === "abdihakim@example.com" && password === "password123") {
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Please try again." };
  } else {
    // Registration simulation
    if (email === "abdihakim@example.com") {
      return { success: false, error: "This email is already registered." };
    }
    return { success: true };
  }
}
