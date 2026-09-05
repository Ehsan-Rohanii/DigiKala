// src/Pages/LoginOtp/index.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
  Divider,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// ============================================================
//  BRAND COLORS - Red Theme
// ============================================================
const BRAND_RED = '#EF3F3E';
const BRAND_RED_DARK = '#D32F2F';
const BRAND_RED_LIGHT = '#FFEBEE';
const BRAND_DARK = '#1A1A1A';

// ============================================================
//  ANIMATIONS
// ============================================================

const floatOrb = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -35px) scale(1.15); }
  50% { transform: translate(-35px, 50px) scale(0.85); }
  75% { transform: translate(35px, 25px) scale(1.05); }
`;

const slideUp = keyframes`
  0% { opacity: 0; transform: translateY(30px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

export default function LoginOtp() {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const phoneNumber = useSelector((state) => state.phone.phone);
  console.log(phoneNumber);

  useEffect(() => {
    setIsVisible(true);

    if (!phoneNumber) {
      navigate('/login');
    }
  }, [phoneNumber, navigate]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const codeRegex = /^[0-9]{4,6}$/;
    if (!codeRegex.test(verificationCode)) {
      setError('کد تأیید باید ۴ تا ۶ رقم باشد و فقط شامل اعداد باشد');
      setLoading(false);
      return;
    }

    if (!phoneNumber) {
      setError('شماره موبایل یافت نشد. لطفاً دوباره وارد شوید.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          code: verificationCode,
        }),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'کد تأیید نامعتبر است , لطفا دقت کنید');
      }

      // ✅ ذخیره توکن در localStorage
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
      }

      // ✅ ذخیره دیتای کاربر در localStorage
      if (result.data.user) {
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }

      // ✅ هدایت به صفحه اصلی
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  //  THEME-BASED STYLES
  // ============================================================

  const bgGradient = isDark
    ? `
      radial-gradient(ellipse at 25% 35%, rgba(239,63,62,0.06) 0%, transparent 55%),
      radial-gradient(ellipse at 75% 65%, rgba(211,47,47,0.04) 0%, transparent 55%),
      linear-gradient(180deg, #0b0f1a 0%, #060a14 100%)
    `
    : `
      radial-gradient(ellipse at 25% 35%, rgba(239,63,62,0.03) 0%, transparent 55%),
      radial-gradient(ellipse at 75% 65%, rgba(211,47,47,0.02) 0%, transparent 55%),
      linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)
    `;

  const paperBg = isDark
    ? 'rgba(11, 15, 26, 0.95)'
    : 'rgba(255, 255, 255, 0.95)';

  const borderColor = isDark
    ? 'rgba(239,63,62,0.12)'
    : 'rgba(239,63,62,0.15)';

  const textPrimary = isDark ? '#e2e8f0' : '#1a1a2e';
  const textSecondary = isDark ? '#94a3b8' : '#4a4a5e';
  const textMuted = isDark ? 'rgba(148,163,184,0.4)' : 'rgba(74,74,94,0.4)';

  const inputBg = isDark
    ? 'rgba(255,255,255,0.05)'
    : 'rgba(0,0,0,0.04)';

  const inputBorder = isDark
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.08)';

  const inputFocusBorder = BRAND_RED;
  const inputFocusBg = isDark
    ? 'rgba(239,63,62,0.08)'
    : 'rgba(239,63,62,0.04)';

  const buttonGradient = `linear-gradient(135deg, ${BRAND_RED_DARK}, ${BRAND_RED})`;
  const buttonHoverGradient = `linear-gradient(135deg, #B71C1C, ${BRAND_RED_DARK})`;

  // اگر شماره تلفن وجود نداشت، چیزی نشان نده (تا useEffect هدایت کند)
  if (!phoneNumber) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgGradient,
        padding: '16px',
        direction: 'rtl',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ===== BACKGROUND ORBS ===== */}
      <Box
        sx={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(239,63,62,0.035), transparent 70%)'
            : 'radial-gradient(circle, rgba(239,63,62,0.02), transparent 70%)',
          top: -350,
          right: -250,
          animation: `${floatOrb} 25s ease-in-out infinite`,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 650,
          height: 650,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(211,47,47,0.025), transparent 70%)'
            : 'radial-gradient(circle, rgba(211,47,47,0.015), transparent 70%)',
          bottom: -280,
          left: -180,
          animation: `${floatOrb} 30s ease-in-out infinite reverse`,
          pointerEvents: 'none',
        }}
      />

      {/* ===== GRID BACKGROUND ===== */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? `
              linear-gradient(rgba(239,63,62,0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,63,62,0.012) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(239,63,62,0.006) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,63,62,0.006) 1px, transparent 1px)
            `,
          backgroundSize: '55px 55px',
          pointerEvents: 'none',
        }}
      />

      {/* ===== MAIN CONTENT ===== */}
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5 },
            borderRadius: 4,
            backdropFilter: 'blur(20px)',
            backgroundColor: paperBg,
            border: `1px solid ${borderColor}`,
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: `${slideUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            '&:hover': {
              boxShadow: isDark
                ? '0 30px 60px -12px rgba(0, 0, 0, 1)'
                : '0 30px 60px -12px rgba(0, 0, 0, 0.15)',
              borderColor: BRAND_RED,
            },
          }}
        >
          {/* ===== HEADER ===== */}
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            gutterBottom
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)'
                : `linear-gradient(135deg, ${BRAND_RED_DARK}, ${BRAND_RED})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
              mb: 1,
            }}
          >
            تأیید کد
          </Typography>

          <Typography
            textAlign="center"
            variant="body2"
            sx={{
              color: textMuted,
              mb: 4,
              fontSize: '0.95rem',
            }}
          >
            کد تأیید به شماره <strong style={{ color: BRAND_RED }}>{phoneNumber}</strong> ارسال شد
          </Typography>

          {/* ===== ERROR ===== */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: isDark
                  ? 'rgba(211, 47, 47, 0.15)'
                  : 'rgba(211, 47, 47, 0.08)',
                color: BRAND_RED,
                '& .MuiAlert-icon': {
                  color: BRAND_RED,
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* ===== FORM ===== */}
          <Box
            component="form"
            onSubmit={handleVerifyCode}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* OTP Input */}
            <Box>
              <Typography
                component="label"
                sx={{
                  display: 'block',
                  color: textSecondary,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  mb: 1.5,
                  textAlign: 'right',
                  width: '100%',
                }}
              >
                کد تأیید
              </Typography>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="کد ۴ تا ۶ رقمی را وارد کنید"
                required
                maxLength={6}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  backgroundColor: inputBg,
                  border: `2px solid ${inputBorder}`,
                  borderRadius: '12px',
                  color: textPrimary,
                  fontSize: '1.2rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  textAlign: 'center',
                  direction: 'ltr',
                  letterSpacing: '8px',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = inputFocusBorder;
                  e.target.style.backgroundColor = inputFocusBg;
                  e.target.style.boxShadow = `0 0 0 4px rgba(239,63,62,0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = inputBorder;
                  e.target.style.backgroundColor = inputBg;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </Box>

            {/* Submit Button - Red Theme */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                height: 56,
                borderRadius: 3,
                fontSize: '1.05rem',
                fontWeight: 700,
                background: buttonGradient,
                color: '#fff',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                boxShadow: `0 4px 15px rgba(239,63,62,0.3)`,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 8px 30px rgba(239,63,62,0.4)`,
                  background: buttonHoverGradient,
                },
                '&:active': {
                  transform: 'translateY(0px)',
                },
                '&.Mui-disabled': {
                  backgroundColor: isDark
                    ? 'rgba(239,63,62,0.3)'
                    : 'rgba(239,63,62,0.2)',
                  color: isDark
                    ? 'rgba(255,255,255,0.3)'
                    : 'rgba(0,0,0,0.3)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'تأیید کد'
              )}
            </Button>

            {/* ===== DIVIDER ===== */}
            <Divider sx={{ my: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  color: textMuted,
                  px: 2,
                }}
              >
                یا
              </Typography>
            </Divider>

            {/* ===== LOGIN WITH PASSWORD ===== */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                height: 48,
                borderRadius: 3,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: textSecondary,
                borderColor: inputBorder,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: BRAND_RED,
                  backgroundColor: isDark
                    ? 'rgba(239,63,62,0.05)'
                    : 'rgba(239,63,62,0.04)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              ورود با رمز عبور
            </Button>

            {/* ===== REGISTER LINK ===== */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: textMuted,
                  display: 'inline-block',
                  ml: 1,
                }}
              >
                حساب کاربری ندارید؟
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate('/')}
                sx={{
                  color: BRAND_RED,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    color: BRAND_RED_DARK,
                    backgroundColor: 'transparent',
                    transform: 'scale(1.02)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                ثبت‌نام کنید
              </Button>
            </Box>
          </Box>

          {/* ===== FOOTER ===== */}
          <Typography
            textAlign="center"
            variant="caption"
            sx={{
              display: 'block',
              mt: 3,
              color: textMuted,
              fontSize: '0.65rem',
              opacity: 0.5,
            }}
          >
            کد تأیید به شماره موبایل شما ارسال شد
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}