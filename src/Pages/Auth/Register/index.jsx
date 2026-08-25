// src/Pages/Register/index.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PersonAdd, Phone, Verified } from '@mui/icons-material';

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('شماره موبایل معتبر نیست');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const result = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        setError(result.message || 'خطا در ارسال کد');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const codeRegex = /^[0-9]{4,6}$/;
    if (!codeRegex.test(verificationCode)) {
      setError('کد تأیید باید ۴ تا ۶ رقم باشد');
      setIsLoading(false);
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

      if (!response.ok) {
        throw new Error(result.message || 'کد تأیید نامعتبر است');
      }

      localStorage.setItem('token', result.data?.token || result.token);
      if (result.data?.user) {
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }

      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fafafa',
        p: 2,
        direction: 'rtl',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: '#ffffff',
          }}
        >
          {/* آیکون */}
          <Box
            sx={{
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 2,
              borderRadius: '50%',
              bgcolor: '#FF1744',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {step === 1 ? (
              <PersonAdd sx={{ color: '#fff', fontSize: 28 }} />
            ) : (
              <Verified sx={{ color: '#fff', fontSize: 28 }} />
            )}
          </Box>

          <Typography variant="h5" textAlign="center" fontWeight={700} sx={{ color: '#FF1744', mb: 1 }}>
            {step === 1 ? 'ثبت‌نام' : 'تأیید کد'}
          </Typography>

          <Typography textAlign="center" variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 3 }}>
            {step === 1
              ? 'برای ادامه، شماره موبایل خود را وارد کنید'
              : `کد تأیید به شماره ${phoneNumber} ارسال شد`}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {step === 1 ? (
            <Box component="form" onSubmit={handleSendCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: 'rgba(0,0,0,0.3)' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#FF1744',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF1744',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={{
                  height: 48,
                  borderRadius: 2,
                  fontWeight: 700,
                  bgcolor: '#FF1744',
                  '&:hover': {
                    bgcolor: '#d50000',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(255,23,68,0.4)',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'ارسال کد تأیید'}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleVerifyCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="کد ۴ تا ۶ رقمی"
                required
                inputProps={{
                  maxLength: 6,
                  style: { textAlign: 'center', letterSpacing: '8px' },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Verified sx={{ color: 'rgba(0,0,0,0.3)' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#FF1744',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF1744',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={{
                  height: 48,
                  borderRadius: 2,
                  fontWeight: 700,
                  bgcolor: '#FF1744',
                  '&:hover': {
                    bgcolor: '#d50000',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(255,23,68,0.4)',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'تأیید کد'}
              </Button>

              <Button
                variant="text"
                onClick={() => {
                  setStep(1);
                  setVerificationCode('');
                  setError('');
                }}
                sx={{
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#1a1a1a',
                  },
                }}
              >
                تغییر شماره موبایل
              </Button>
            </Box>
          )}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.4)', display: 'inline' }}>
              حساب کاربری دارید؟
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{
                color: '#FF1744',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  color: '#d50000',
                },
              }}
            >
              وارد شوید
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}