// Skeleton bersama buat app/**/loading.tsx — server component (tanpa "use
// client"), jadi nol JS tambahan. Hanya tampil saat navigasi pertama ke route
// yang belum ke-prefetch (chunk client masih di-download) → instant loading UI
// bertema, bukan layar kosong. Warna pakai token tema → adaptif dark/light.

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-lg bg-foreground/10 dark:bg-foreground/[0.07] ${className}`}
    />
  );
}

export function SkeletonHeader({ width = "w-56" }: { width?: string }) {
  return (
    <div className="mb-10" aria-hidden>
      <Skeleton className={`h-9 ${width} mb-3`} />
      <Skeleton className="h-4 w-80 max-w-full" />
    </div>
  );
}

/** Katalog paket (santet & ruqiah): banner + grid 2 kolom kartu */
export function KatalogSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <p className="sr-only">Memuat katalog…</p>
      <div className="max-w-6xl mx-auto px-4">
        <SkeletonHeader width="w-52" />
        <div className="max-w-2xl mx-auto mb-10">
          <Skeleton className="h-[74px] w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-base p-6" aria-hidden>
              <div className="flex items-start gap-3 mb-4">
                <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton className="h-4 w-2/5" />
                  <Skeleton className="h-3 w-3/5" />
                </div>
              </div>
              <Skeleton className="h-3 w-full mb-1.5" />
              <Skeleton className="h-3 w-11/12 mb-4" />
              <Skeleton className="h-3 w-full mb-1.5" />
              <Skeleton className="h-3 w-4/5 mb-4" />
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Flow bayar: steps indicator + kartu QR + form */
export function FlowSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <p className="sr-only">Memuat halaman pembayaran…</p>
      <div className="max-w-2xl mx-auto px-4">
        <Skeleton className="h-3 w-24 mb-6" />
        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="h-2.5 w-14" />
              {i < 2 && <Skeleton className="h-px w-8 rounded-none" />}
            </div>
          ))}
        </div>
        <div className="card-base p-6 md:p-8 space-y-6" aria-hidden>
          <div className="flex items-start gap-3">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3 w-56 max-w-full" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 py-2">
            <Skeleton className="w-[200px] h-[200px] rounded-2xl" />
            <Skeleton className="h-8 w-64 max-w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
          <Skeleton className="h-[52px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/** Success: check circle + resi + tracking list */
export function SuccessSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-start justify-center px-4">
      <p className="sr-only">Memuat konfirmasi…</p>
      <div className="w-full max-w-lg" aria-hidden>
        <div className="text-center mb-8">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-8 w-64 max-w-full mx-auto mb-3" />
          <Skeleton className="h-4 w-80 max-w-full mx-auto" />
        </div>
        <div className="card-base p-5 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="card-base p-5 mt-4 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
              <Skeleton className="h-3 flex-1" />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-full rounded-xl mt-6" />
      </div>
    </div>
  );
}

/** Chat konsultasi: header online + bubble chat + input bar */
export function ChatSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <p className="sr-only">Memuat konsultasi…</p>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-6" aria-hidden>
          <Skeleton className="h-8 w-72 max-w-full mx-auto mb-2" />
          <Skeleton className="h-4 w-56 max-w-full mx-auto" />
        </div>
        <div className="card-base overflow-hidden" aria-hidden>
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-2.5 w-20" />
            </div>
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <div className="h-[420px] px-4 py-4 space-y-4">
            <div className="flex items-end gap-2">
              <Skeleton className="w-7 h-7 rounded-full shrink-0" />
              <Skeleton className="h-12 w-2/3 rounded-2xl" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-1/2 rounded-2xl" />
            </div>
            <div className="flex items-end gap-2">
              <Skeleton className="w-7 h-7 rounded-full shrink-0" />
              <Skeleton className="h-14 w-3/5 rounded-2xl" />
            </div>
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <Skeleton className="h-11 flex-1 rounded-xl" />
              <Skeleton className="h-11 w-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
