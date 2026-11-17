import type { Metadata } from 'next';
import SectionHeading from '@/components/common/SectionHeading';
import { Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Size & Measurement Guide | Mayaara Couture',
  description:
    'Comprehensive sizing charts for Kurtis, Anarkalis, Saree Blouses, Lehengas, and Pre-draped Gowns with measuring guidelines.',
};

export default function SizeGuidePage() {
  const kurtiChart = [
    { size: 'XS', bustIn: '32-34', waistIn: '26-28', hipIn: '36-38', bustCm: '81-86', waistCm: '66-71', hipCm: '91-96' },
    { size: 'S', bustIn: '34-36', waistIn: '28-30', hipIn: '38-40', bustCm: '86-91', waistCm: '71-76', hipCm: '96-101' },
    { size: 'M', bustIn: '36-38', waistIn: '30-32', hipIn: '40-42', bustCm: '91-96', waistCm: '76-81', hipCm: '101-106' },
    { size: 'L', bustIn: '38-40', waistIn: '32-34', hipIn: '42-44', bustCm: '96-101', waistCm: '81-86', hipCm: '106-111' },
    { size: 'XL', bustIn: '40-42', waistIn: '34-36', hipIn: '44-46', bustCm: '101-106', waistCm: '86-91', hipCm: '111-116' },
    { size: 'XXL', bustIn: '42-44', waistIn: '36-38', hipIn: '46-48', bustCm: '106-111', waistCm: '91-96', hipCm: '116-121' },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          badge="Tailoring Standards"
          title="Boutique Size & Measurement Guide"
          subtitle="Ensure the perfect fit for your silhouette across all our ready-to-wear and tailored designs"
        />

        {/* Measuring steps guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200/80 shadow-subtle space-y-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              How to Take Your Measurements at Home
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-charcoal-600">
            <div className="p-4 rounded-2xl bg-ivory-100/60 space-y-2 border border-ivory-200">
              <span className="font-bold text-maroon-900 block font-serif text-sm">
                1. Bust Measurement
              </span>
              <p>
                Measure across the fullest part of your bust while wearing your usual innerwear. Keep the tape comfortably snug and parallel to the floor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100/60 space-y-2 border border-ivory-200">
              <span className="font-bold text-maroon-900 block font-serif text-sm">
                2. Natural Waist
              </span>
              <p>
                Measure around your natural waistline, usually 1 to 2 inches above your navel. Keep one finger between your body and the measuring tape.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100/60 space-y-2 border border-ivory-200">
              <span className="font-bold text-maroon-900 block font-serif text-sm">
                3. Hip & Skirt Length
              </span>
              <p>
                Measure around the widest curve of your hips. For lehengas and gowns, measure from your waist down to the floor wearing your wedding footwear.
              </p>
            </div>
          </div>
        </div>

        {/* Kurtis & Sets Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200/80 shadow-subtle space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal-900">
            Standard Kurti, Anarkali & Dress Sizing
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-ivory-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-ivory-100/70 border-b border-ivory-200 text-charcoal-700 font-serif font-bold">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust (Inches)</th>
                  <th className="py-3 px-4">Waist (Inches)</th>
                  <th className="py-3 px-4">Hip (Inches)</th>
                  <th className="py-3 px-4">Bust (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-100 text-charcoal-800">
                {kurtiChart.map((row) => (
                  <tr key={row.size} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-maroon-900">{row.size}</td>
                    <td className="py-2.5 px-4">{row.bustIn}&quot;</td>
                    <td className="py-2.5 px-4">{row.waistIn}&quot;</td>
                    <td className="py-2.5 px-4">{row.hipIn}&quot;</td>
                    <td className="py-2.5 px-4">{row.bustCm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sarees & Blouses Note */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200/80 shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Sarees & Blouse Fabric Specifications
            </h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-charcoal-600 list-disc list-inside">
            <li><strong>Saree Length:</strong> Standard 5.5 meters (6 yards) of pure handwoven fabric.</li>
            <li><strong>Blouse Piece:</strong> 0.8 meters to 1 meter unstitched matching pure silk fabric included with every saree.</li>
            <li><strong>Fall & Pico:</strong> Available complimentary upon request via WhatsApp when ordering.</li>
            <li><strong>Custom Tailoring:</strong> Send your measurement blouse photo or specs via WhatsApp and our master tailor in Chennai will craft it to your exact fit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
