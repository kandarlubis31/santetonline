// QRIS Dummy Payment URL generator
// This generates a fake QRIS payment link for satire/humor purposes

export function generateQrisUrl(paketId: string, amount: number): string {
  // Generate a dummy payment URL that looks real but is completely fake
  const dummyMerchantId = "SNT" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const dummyRef = `SNT${Date.now().toString(36).toUpperCase()}`;

  // This URL will redirect to our success page after a "payment"
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const successUrl = `${baseUrl}/success?paket=${paketId}&ref=${dummyRef}&amount=${amount}`;

  // Generate a realistic-looking QRIS payload string (dummy)
  const qrisPayload = [
    "000201",
    "010212",
    "30" + ("000" + amount).slice(-6),
    "5303360",
    "5802ID",
    "5404." + ("000" + amount).slice(-4),
    "6304",
    // Dummy CRC
    generateDummyCRC(),
  ].join("");

  return successUrl;
}

export function generateDummyRef(): string {
  return `SNT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

function generateDummyCRC(): string {
  const chars = "0123456789ABCDEF";
  let crc = "";
  for (let i = 0; i < 4; i++) {
    crc += chars[Math.floor(Math.random() * chars.length)];
  }
  return crc;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Simulate payment processing delay
export function simulatePaymentProcessing(): Promise<boolean> {
  return new Promise((resolve) => {
    // Random delay between 2-5 seconds
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => resolve(true), delay);
  });
}
