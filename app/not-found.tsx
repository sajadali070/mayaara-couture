import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-ivory-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-ivory-200/80 shadow-card text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>

        <div>
          <span className="font-serif text-5xl sm:text-6xl font-bold text-maroon-900 block tracking-tight">
            404
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mt-2">
            Garment or Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-2 leading-relaxed">
            The page you are looking for might have been moved, renamed, or this exclusive collection has concluded.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-full bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Boutique Home</span>
          </Link>

          <Link
            href="/shop"
            className="w-full py-3 px-6 rounded-full border border-maroon-900 text-maroon-900 hover:bg-maroon-50 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Explore All Collections
          </Link>
        </div>

        <div className="pt-4 border-t border-ivory-200 text-[11px] text-charcoal-400">
          Need styling assistance? Chat with us directly on WhatsApp anytime.
        </div>
      </div>
    </div>
  );
}
