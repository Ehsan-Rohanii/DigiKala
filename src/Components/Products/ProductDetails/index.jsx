// src/Pages/Products/ProductDetail/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Rating,
  Chip,
  Divider,
  Skeleton,
  Alert,
  Snackbar,
  useTheme,
  IconButton,
  Breadcrumbs,
  Link,
  Paper,
  Stack,
  Tabs,
  Tab,
  Avatar,
  Fade,
  Zoom,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  LocalShipping,
  Security,
  CheckCircle,
  Share,
  TrendingUp,
  Inventory,
  Description,
  Widgets,
  Star,
  Verified,
  Timer,
  Storefront,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(198, 40, 40, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(198, 40, 40, 0); }
  100% { box-shadow: 0 0 0 0 rgba(198, 40, 40, 0); }
`;

// Styled Components
const HeroCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(30,30,30,0.95), rgba(20,20,20,0.98))'
    : 'linear-gradient(145deg, #ffffff, #fef8f8)',
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.06)'
      : 'rgba(198,40,40,0.08)'
  }`,
  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 24px 80px rgba(198,40,40,0.12)',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 420,
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at 30% 50%, #2a1a1a, #1a0a0a)'
    : 'radial-gradient(circle at 30% 50%, #fff5f5, #fde8e8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 40,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 70% 80%, rgba(198,40,40,0.06), transparent 70%)',
    pointerEvents: 'none',
  },
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  filter: 'drop-shadow(0 12px 40px rgba(198,40,40,0.12))',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    transform: 'scale(1.04) rotate(-1deg)',
  },
});

const DiscountBadge = styled(Box)({
  position: 'absolute',
  top: 20,
  right: 20,
  padding: '8px 20px',
  borderRadius: 30,
  background: 'linear-gradient(135deg, #C62828, #D32F2F)',
  color: '#fff',
  fontWeight: 800,
  fontSize: '0.85rem',
  boxShadow: '0 8px 30px rgba(198,40,40,0.4)',
  zIndex: 2,
  animation: `${pulse} 2s infinite`,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  letterSpacing: '0.5px',
});

const PriceCard = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 28px',
  background: theme.palette.mode === 'dark'
    ? 'rgba(198,40,40,0.15)'
    : 'rgba(198,40,40,0.05)',
  borderRadius: 20,
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? 'rgba(198,40,40,0.25)'
      : 'rgba(198,40,40,0.12)'
  }`,
  backdropFilter: 'blur(12px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(198,40,40,0.1)',
  },
}));

const PrimaryButton = styled(Button)({
  borderRadius: 50,
  padding: '14px 36px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1rem',
  background: 'linear-gradient(135deg, #C62828, #E53935)',
  color: '#fff',
  boxShadow: '0 8px 32px rgba(198,40,40,0.35)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #B71C1C, #C62828)',
    boxShadow: '0 12px 48px rgba(198,40,40,0.45)',
    transform: 'translateY(-3px)',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
  '&:disabled': {
    background: '#666',
    boxShadow: 'none',
    transform: 'none',
  },
});

const SecondaryButton = styled(Button)({
  borderRadius: 50,
  minWidth: 52,
  height: 52,
  borderColor: '#D32F2F',
  color: '#D32F2F',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: '#C62828',
    background: 'rgba(198,40,40,0.06)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(198,40,40,0.12)',
  },
});

const FeatureCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 18px',
  borderRadius: 16,
  background: theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.03)'
    : '#fafafa',
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(0,0,0,0.04)'
  }`,
  transition: 'all 0.3s ease',
  cursor: 'default',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(198,40,40,0.08)'
      : 'rgba(198,40,40,0.04)',
    borderColor: 'rgba(198,40,40,0.15)',
    transform: 'translateY(-2px)',
  },
}));

const StatusChip = styled(Chip)(({ theme, instock }) => ({
  borderRadius: 12,
  fontWeight: 700,
  fontSize: '0.7rem',
  padding: '2px 8px',
  background: instock
    ? theme.palette.mode === 'dark'
      ? 'rgba(76,175,80,0.15)'
      : 'rgba(76,175,80,0.08)'
    : theme.palette.mode === 'dark'
      ? 'rgba(244,67,54,0.15)'
      : 'rgba(244,67,54,0.08)',
  color: instock ? '#2E7D32' : '#C62828',
  border: `1px solid ${
    instock
      ? 'rgba(76,175,80,0.15)'
      : 'rgba(244,67,54,0.15)'
  }`,
  '& .MuiChip-icon': {
    color: instock ? '#2E7D32' : '#C62828',
  },
}));

const TagChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  height: 28,
  fontSize: '0.7rem',
  fontWeight: 600,
  background: theme.palette.mode === 'dark'
    ? 'rgba(198,40,40,0.12)'
    : 'rgba(198,40,40,0.06)',
  color: '#D32F2F',
  border: '1px solid rgba(198,40,40,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(198,40,40,0.2)'
      : 'rgba(198,40,40,0.12)',
    transform: 'translateY(-2px)',
  },
}));

const SpecRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 18px',
  borderRadius: 14,
  background: theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.02)'
    : '#fafafa',
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.04)'
      : 'rgba(0,0,0,0.04)'
  }`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(198,40,40,0.05)'
      : 'rgba(198,40,40,0.03)',
    transform: 'translateX(-4px)',
    borderColor: 'rgba(198,40,40,0.1)',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 700,
  py: 1.5,
  minHeight: 48,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    color: '#D32F2F',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

// Main Component
const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) throw new Error('شناسه محصول وجود ندارد');

        const res = await fetch(`http://localhost:5000/product-variant/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            const allRes = await fetch('http://localhost:5000/api/products');
            if (allRes.ok) {
              const allData = await allRes.json();
              const found = allData.data?.find(p => p._id === id);
              if (found) {
                setProduct(found);
                setIsFavorite(found.isFavorite || false);
                setLoading(false);
                return;
              }
            }
          }
          throw new Error('محصول یافت نشد');
        }

        const data = await res.json();
        const productData = data.data || data;
        if (productData && productData._id) {
          setProduct(productData);
          setIsFavorite(productData.isFavorite || false);
        } else {
          throw new Error('محصول یافت نشد');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await fetch('http://localhost:5000/api/products/toggle-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (!res.ok) throw new Error('خطا در تغییر وضعیت علاقه‌مندی');

      setIsFavorite(!isFavorite);
      setSnackbar({
        open: true,
        message: isFavorite ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'خطا در تغییر وضعیت علاقه‌مندی',
        severity: 'error',
      });
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSnackbar({
          open: true,
          message: 'لطفاً ابتدا وارد حساب خود شوید',
          severity: 'warning',
        });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      if (!product) {
        setSnackbar({
          open: true,
          message: 'محصول یافت نشد',
          severity: 'error',
        });
        return;
      }

      const productVariantId = product.defaultProductVariantId?._id || product._id || product.id;

      if (!productVariantId) {
        setSnackbar({
          open: true,
          message: 'شناسه محصول یافت نشد',
          severity: 'error',
        });
        return;
      }

      const response = await fetch('http://localhost:5000/api/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          productVariantId: productVariantId,
          quantity: 1,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'خطا در افزودن به سبد خرید');
      }

      setSnackbar({
        open: true,
        message: '✅ محصول با موفقیت به سبد خرید اضافه شد',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'خطا در افزودن به سبد خرید',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Loading
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, direction: 'rtl' }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 4, borderRadius: 2 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={420} sx={{ borderRadius: 4 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={50} width="85%" sx={{ borderRadius: 2, mb: 1 }} />
            <Skeleton variant="text" height={30} width="40%" sx={{ borderRadius: 2, mb: 2 }} />
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 3, mb: 3 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 3, mb: 2 }} />
            <Grid container spacing={1}>
              {[1, 2, 3].map(i => (
                <Grid item xs={4} key={i}>
                  <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Fade in>
          <Alert
            severity="error"
            sx={{
              borderRadius: 4,
              mb: 4,
              fontSize: '1rem',
              p: 3,
              '& .MuiAlert-icon': { fontSize: 28 },
            }}
          >
            {error}
          </Alert>
        </Fade>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{
            bgcolor: '#D32F2F',
            borderRadius: 50,
            px: 6,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { bgcolor: '#C62828' },
          }}
        >
          بازگشت به محصولات
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Fade in>
          <Alert
            severity="warning"
            sx={{
              borderRadius: 4,
              mb: 4,
              fontSize: '1rem',
              p: 3,
              '& .MuiAlert-icon': { fontSize: 28 },
            }}
          >
            محصولی با این شناسه یافت نشد
          </Alert>
        </Fade>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{
            bgcolor: '#D32F2F',
            borderRadius: 50,
            px: 6,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { bgcolor: '#C62828' },
          }}
        >
          بازگشت به محصولات
        </Button>
      </Container>
    );
  }

  const defaultVariant = product.defaultProductVariantId || {};
  const productPrice = defaultVariant.finalPrice || defaultVariant.price || 0;
  const productOriginalPrice = defaultVariant.price || 0;
  const productDiscount = defaultVariant.discountPercent || 0;
  const productInStock = (defaultVariant.quantity || 0) > 0;
  const productRating = product.ratingAvg || 0;
  const imageUrl = product.images?.[0]
    ? `http://localhost:5000/${product.images[0]}`
    : 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <Container maxWidth="md" sx={{ py: 5, direction: 'rtl' }}>

      {/* Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Breadcrumbs
          separator={<span style={{ color: '#D32F2F', fontWeight: 300 }}>›</span>}
          sx={{
            '& .MuiBreadcrumbs-li': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <Link
            onClick={() => navigate('/')}
            sx={{
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'text.secondary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#D32F2F' },
            }}
          >
            خانه
          </Link>
          <Link
            onClick={() => navigate('/products')}
            sx={{
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'text.secondary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#D32F2F' },
            }}
          >
            محصولات
          </Link>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#D32F2F' }}>
            {product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}
          </Typography>
        </Breadcrumbs>

        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(198,40,40,0.04)',
                borderColor: '#D32F2F',
                transform: 'translateX(-2px)',
              },
            }}
          >
            <ArrowBack sx={{ color: '#D32F2F' }} />
          </IconButton>
          <IconButton
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(198,40,40,0.04)',
                borderColor: '#D32F2F',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Share sx={{ color: '#D32F2F' }} />
          </IconButton>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Image */}
        <Grid item xs={12} md={6}>
          <Zoom in style={{ transitionDelay: '100ms' }}>
            <HeroCard>
              <ImageContainer>
                {productDiscount > 0 && (
                  <DiscountBadge>
                    🔥 {productDiscount}% تخفیف
                  </DiscountBadge>
                )}
                <StyledImage src={imageUrl} alt={product.title} />
              </ImageContainer>
            </HeroCard>
          </Zoom>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>

              {/* Status Chips */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <StatusChip
                  icon={<Verified sx={{ fontSize: 16 }} />}
                  label={product.brandId?.title || 'برند'}
                  instock={true}
                />
                <StatusChip
                  icon={productInStock ? <CheckCircle sx={{ fontSize: 16 }} /> : <Inventory sx={{ fontSize: 16 }} />}
                  label={productInStock ? 'موجود در انبار' : 'ناموجود'}
                  instock={productInStock}
                />
                {product.boughtCount > 0 && (
                  <StatusChip
                    icon={<TrendingUp sx={{ fontSize: 16 }} />}
                    label={`${product.boughtCount} خرید`}
                    instock={true}
                    sx={{
                      background: 'rgba(198,40,40,0.06)',
                      color: '#D32F2F',
                      borderColor: 'rgba(198,40,40,0.1)',
                      '& .MuiChip-icon': { color: '#D32F2F' },
                    }}
                  />
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  lineHeight: 1.3,
                  fontSize: '1.75rem',
                  background: isDark ? 'none' : 'linear-gradient(135deg, #1a1a1a, #333)',
                  backgroundClip: isDark ? 'none' : 'text',
                  WebkitBackgroundClip: isDark ? 'none' : 'text',
                  color: isDark ? '#fff' : 'transparent',
                }}
              >
                {product.title}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                <Rating
                  value={productRating}
                  precision={0.1}
                  readOnly
                  size="medium"
                  sx={{
                    direction: 'ltr',
                    '& .MuiRating-iconFilled': { color: '#D32F2F' },
                    '& .MuiRating-iconHover': { color: '#D32F2F' },
                  }}
                />
                <Typography sx={{ color: '#D32F2F', fontWeight: 800, fontSize: '1.1rem' }}>
                  {productRating.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product.ratingCount || 0} نظر)
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ mb: 0.5 }}>
                <PriceCard>
                  {productInStock && productPrice > 0 ? (
                    <>
                      <Typography variant="h3" sx={{ color: '#C62828', fontWeight: 900, fontSize: '2rem' }}>
                        {productPrice.toLocaleString('fa-IR')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        تومان
                      </Typography>
                      {productOriginalPrice > 0 && productOriginalPrice !== productPrice && (
                        <Typography
                          sx={{
                            textDecoration: 'line-through',
                            color: '#bbb',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          }}
                        >
                          {productOriginalPrice.toLocaleString('fa-IR')}
                        </Typography>
                      )}
                      {productDiscount > 0 && (
                        <Chip
                          label={`${productDiscount}%`}
                          size="small"
                          sx={{
                            bgcolor: '#C62828',
                            color: '#fff',
                            fontWeight: 800,
                            height: 28,
                            borderRadius: 2,
                            fontSize: '0.8rem',
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <Typography sx={{ color: '#999', fontStyle: 'italic', fontSize: '1rem' }}>
                      قیمت موجود نیست
                    </Typography>
                  )}
                </PriceCard>
              </Box>

              {/* Actions */}
              <Stack direction="row" spacing={1.5} sx={{ mb: 0.5 }}>
                <PrimaryButton
                  variant="contained"
                  onClick={handleAddToCart}
                  disabled={!productInStock}
                  startIcon={<ShoppingCart />}
                  fullWidth
                >
                  {productInStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                </PrimaryButton>
                <SecondaryButton
                  variant="outlined"
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite ? <Favorite sx={{ fontSize: 22 }} /> : <FavoriteBorder sx={{ fontSize: 22 }} />}
                </SecondaryButton>
              </Stack>

              {/* Features */}
              <Grid container spacing={1.5} sx={{ mb: 0.5 }}>
                <Grid item xs={4}>
                  <FeatureCard>
                    <LocalShipping sx={{ color: '#D32F2F', fontSize: 22 }} />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                        ارسال
                      </Typography>
                      <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.75rem' }}>
                        {productInStock ? '۲۴ ساعته' : 'ناموجود'}
                      </Typography>
                    </Box>
                  </FeatureCard>
                </Grid>
                <Grid item xs={4}>
                  <FeatureCard>
                    <Security sx={{ color: '#D32F2F', fontSize: 22 }} />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                        گارانتی
                      </Typography>
                      <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.75rem' }}>
                        اصالت
                      </Typography>
                    </Box>
                  </FeatureCard>
                </Grid>
                <Grid item xs={4}>
                  <FeatureCard>
                    <CheckCircle sx={{ color: '#D32F2F', fontSize: 22 }} />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                        کیفیت
                      </Typography>
                      <Typography variant="caption" fontWeight={800} sx={{ fontSize: '0.75rem' }}>
                        تضمین
                      </Typography>
                    </Box>
                  </FeatureCard>
                </Grid>
              </Grid>

              <Divider sx={{ my: 1 }} />

              {/* Tags */}
              {product.tags?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                  {product.tags.slice(0, 5).map((tag, index) => (
                    <TagChip
                      key={index}
                      label={`#${tag}`}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Fade>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mt: 5 }}>
        <Fade in style={{ transitionDelay: '300ms' }}>
          <Paper
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.05)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                px: 2,
                '& .MuiTabs-indicator': {
                  bgcolor: '#D32F2F',
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              <StyledTab
                icon={<Description />}
                label="توضیحات"
                iconPosition="start"
              />
              <StyledTab
                icon={<Widgets />}
                label="مشخصات فنی"
                iconPosition="start"
              />
            </Tabs>

            {tabValue === 0 && (
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 2.2,
                    fontSize: '0.95rem',
                    color: isDark ? '#ddd' : '#444',
                  }}
                >
                  {product.description || 'توضیحاتی برای این محصول ثبت نشده است.'}
                </Typography>
              </Box>
            )}

            {tabValue === 1 && (
              <Box sx={{ p: 4 }}>
                {product.information?.length > 0 ? (
                  <Grid container spacing={1.5}>
                    {product.information.map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <SpecRow>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            {item.key}
                          </Typography>
                          <Typography variant="body2" fontWeight={800}>
                            {item.value}
                          </Typography>
                        </SpecRow>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', py: 4 }}>
                    مشخصات فنی ثبت نشده است.
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Fade>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: 4,
            bgcolor: snackbar.severity === 'success' ? '#D32F2F' : undefined,
            '& .MuiAlert-icon': { color: '#fff' },
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;