import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPass() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "ورود ناموفق بود");
      }

      console.log(result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/latout");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#0a0a0a",
        padding: "16px",
        direction: "rtl",
        backgroundImage:"blackbackground.jpg"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5 },
            borderRadius: 4,
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(20, 20, 20, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            "&:hover": {
              boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            ورود
          </Typography>

          <Typography
            textAlign="center"
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              mb: 4,
              fontSize: "0.95rem",
            }}
          >
            خوش آمدید! لطفاً اطلاعات خود را وارد کنید
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <Typography
                component="label"
                sx={{
                  display: "block",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  mb: 1.5,
                  textAlign: "right",
                  width: "100%",
                }}
              >
                شماره موبایل
              </Typography>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  textAlign: "right",
                  direction: "rtl",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                  e.target.style.boxShadow = "0 0 0 4px rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </Box>

            <Box>
              <Typography
                component="label"
                sx={{
                  display: "block",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  mb: 1.5,
                  textAlign: "right",
                  width: "100%",
                }}
              >
                رمز عبور
              </Typography>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                required
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  textAlign: "right",
                  direction: "rtl",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                  e.target.style.boxShadow = "0 0 0 4px rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 1,
                  backgroundColor: "rgba(211, 47, 47, 0.15)",
                  color: "#ff6b6b",
                  "& .MuiAlert-icon": {
                    color: "#ff6b6b",
                  },
                }}
              >
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                height: 56,
                borderRadius: 3,
                fontSize: "1.05rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #ffffff 0%, #d0d0d0 100%)",
                color: "#0a0a0a",
                transition: "all 0.3s ease",
                textTransform: "none",
                boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 30px rgba(255, 255, 255, 0.2)",
                  background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
                "&.Mui-disabled": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={24} sx={{ color: "#0a0a0a" }} />
                  در حال ورود...
                </Box>
              ) : (
                "ورود"
              )}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.3)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                onClick={() => navigate("/loginOtp")}
              >
                رمز عبور را فراموش کرده‌اید؟
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.3)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                ثبت‌نام
              </Typography>
            </Box>

            {/* ===== دکمه ورود با کد یکبارمصرف ===== */}
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255, 255, 255, 0.2)",
                    px: 2,
                  }}
                >
                  یا
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/loginOtp")}
                sx={{
                  height: 48,
                  borderRadius: 3,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.6)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                ورود با کد یکبارمصرف
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}