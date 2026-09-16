// QRIS Dummy Payment URL generator
// This generates a fake QRIS payment link for satire/humor purposes

export function generateQrisUrl(paketId: string, amount: number, ref?: string): string {
  // Generate a dummy payment URL that looks real but is completely fake.
  // `ref` opsional: pakai resi yang sama dengan yang ditampilkan di UI.
  const dummyRef = ref ?? `SNT${Date.now().toString(36).toUpperCase()}`;

  // This URL will redirect to our success page after a "payment"
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const successUrl = `${baseUrl}/success?paket=${paketId}&ref=${dummyRef}&amount=${amount}`;

  return successUrl;
}

export function generateDummyRef(): string {
  return `SNT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
