"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/features/portfolio-book/AuthModal';

export const AuthModalWrapper = () => {
  const { isAuthOpen, setIsAuthOpen, isLogin, setIsLogin } = useAuth();

  return (
    <AuthModal
      isOpen={isAuthOpen}
      onClose={() => setIsAuthOpen(false)}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
    />
  );
};
