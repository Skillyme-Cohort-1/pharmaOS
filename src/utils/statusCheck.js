export const getProductStatus = (quantity, expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffInDays = Math.ceil((expiry - today) / (1000 * 3600 * 24));

  if (expiry < today) return 'EXPIRED';
  if (diffInDays <= 30) return 'EXPIRING_SOON';
  if (quantity === 0) return 'OUT_OF_STOCK';
  if (quantity < 10) return 'LIMITED_STOCK';
  
  return 'HEALTHY';
};