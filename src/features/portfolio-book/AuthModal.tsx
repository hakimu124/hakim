"use client";
import React, { useState } from 'react';
import { authenticate } from '@/app/actions/auth';
import { IonIcon } from '@/components/ui/IonIcon';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthModal = ({ isOpen, onClose, isLogin, setIsLogin }: AuthModalProps) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await authenticate(formData, isLogin ? 'login' : 'register');

    setIsLoading(false);
    if (result.success) {
      login({ email: formData.get("email") as string, name: "Abdihakim Mohamed" });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } else {
      setError(result.error || "Authentication failed");
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 style={{ color: success ? 'var(--noir-green)' : 'inherit' }}>
            {success ? 'Welcome Back!' : (isLogin ? 'Login' : 'Register')}
          </h2>

          {error && <div className="auth-error" style={{ color: 'red', fontSize: '12px', marginBottom: '1rem' }}>{error}</div>}
          {success && <div className="auth-success" style={{ color: 'var(--noir-green)', fontSize: '12px', marginBottom: '1rem' }}>Login successful! Redirecting...</div>}

          <div className="auth-input-box">
            <span className="icon">
              <IonIcon name="mail"></IonIcon>
            </span>
            <input type="email" name="email" required />
            <label>Email</label>
          </div>

          <div className="auth-input-box">
            <span className="icon">
              <IonIcon name={isLogin ? "lock-closed" : "person-outline"}></IonIcon>
            </span>
            <input type={isLogin ? "password" : "text"} name="password" required />
            <label>{isLogin ? "Password" : "Username"}</label>
          </div>

          <div className="auth-remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button className="auth-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>

          <div className="auth-register-link">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
                {isLogin ? 'Register' : 'Login'}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
