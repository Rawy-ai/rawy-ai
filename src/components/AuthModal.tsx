'use client';

import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem('rawy_user', JSON.stringify({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
    }));

    setIsLoading(false);
    onSuccess();
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem('rawy_user', JSON.stringify({
      name: 'User',
      email: 'user@gmail.com',
    }));

    setIsLoading(false);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px',
            borderRadius: '50%',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#8888a0'
          }}
        >
          <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div style={{ padding: '40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1D9B50 0%, #008C95 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 4px 16px rgba(29, 155, 80, 0.3)'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>R</span>
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1a1a2e',
              marginBottom: '8px'
            }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p style={{ color: '#4a4a68', fontSize: '15px' }}>
              {mode === 'login'
                ? 'Sign in to continue to Rawy'
                : 'Start creating Arabic stories in seconds'}
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: 'white',
              border: '2px solid #e4e4ee',
              borderRadius: '14px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              fontSize: '15px',
              fontWeight: '600'
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style={{ color: '#1a1a2e' }}>Continue with Google</span>
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '28px 0'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e4e4ee' }} />
            <span style={{ fontSize: '13px', color: '#8888a0' }}>or continue with email</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e4e4ee' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a1a2e',
                  marginBottom: '8px'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    border: `2px solid ${errors.name ? '#dc3545' : '#e4e4ee'}`,
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fc',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.name && (
                  <p style={{ marginTop: '6px', fontSize: '13px', color: '#dc3545' }}>{errors.name}</p>
                )}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1a1a2e',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '15px',
                  border: `2px solid ${errors.email ? '#dc3545' : '#e4e4ee'}`,
                  borderRadius: '12px',
                  backgroundColor: '#f8f9fc',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.email && (
                <p style={{ marginTop: '6px', fontSize: '13px', color: '#dc3545' }}>{errors.email}</p>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1a1a2e',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  style={{
                    width: '100%',
                    padding: '14px 50px 14px 18px',
                    fontSize: '15px',
                    border: `2px solid ${errors.password ? '#dc3545' : '#e4e4ee'}`,
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fc',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8888a0',
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{ marginTop: '6px', fontSize: '13px', color: '#dc3545' }}>{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: 'linear-gradient(135deg, #1D9B50 0%, #17874a 100%)',
                border: 'none',
                borderRadius: '14px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
                boxShadow: '0 4px 16px rgba(29, 155, 80, 0.3)'
              }}
            >
              {isLoading ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <p style={{
            textAlign: 'center',
            color: '#4a4a68',
            marginTop: '28px',
            fontSize: '14px'
          }}>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: '600',
                color: '#1D9B50',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
