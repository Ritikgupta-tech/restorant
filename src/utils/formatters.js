// Utility formatters and calculations for The Sizzle Restaurant prototype

export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Pricing calculations (demo rules)
export const calculateOrderTotals = (items, couponCode = null) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Demo Delivery calculation: Free above ₹500, else ₹50
  const deliveryFee = subtotal > 0 ? (subtotal >= 500 ? 0 : 50) : 0;
  
  // Demo Restaurant GST: 5%
  const demoTax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  
  // Demo Packaging Charge: ₹25
  const packagingFee = subtotal > 0 ? 25 : 0;
  
  // Coupon discount
  let discount = 0;
  if (couponCode && couponCode.toUpperCase() === 'SIZZLE20' && subtotal > 0) {
    discount = Math.min(Math.round(subtotal * 0.20), 150); // 20% up to ₹150
  } else if (couponCode && couponCode.toUpperCase() === 'FIRSTBITE' && subtotal > 0) {
    discount = Math.min(Math.round(subtotal * 0.15), 100); // 15% up to ₹100
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + demoTax + packagingFee - discount);

  return {
    subtotal,
    deliveryFee,
    demoTax,
    packagingFee,
    discount,
    grandTotal,
    isFreeDelivery: deliveryFee === 0 && subtotal > 0,
    amountForFreeDelivery: Math.max(0, 500 - subtotal),
  };
};

export const generateDemoOrderId = () => {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `SZL-${new Date().getFullYear()}-${randomSuffix}`;
};

export const generateDemoReservationId = () => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `TBL-${randomSuffix}`;
};
