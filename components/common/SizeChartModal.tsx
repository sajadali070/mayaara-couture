'use client';

import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'kurtis' | 'lehengas' | 'blouse'>('kurtis');

  if (!isOpen) return null;

  const kurtiSizes = [
    { size: 'XS', bust: unit === 'inches' ? '32-34' : '81-86', waist: unit === 'inches' ? '26-28' : '66-71', hip: unit === 'inches' ? '36-38' : '91-96' },
    { size: 'S', bust: unit === 'inches' ? '34-36' : '86-91', waist: unit === 'inches' ? '28-30' : '71-76', hip: unit === 'inches' ? '38-40' : '96-101' },
    { size: 'M', bust: unit === 'inches' ? '36-38' : '91-96', waist: unit === 'inches' ? '30-32' : '76-81', hip: unit === 'inches' ? '40-42' : '101-106' },
    { size: 'L', bust: unit === 'inches' ? '38-40' : '96-101', waist: unit === 'inches' ? '32-34' : '81-86', hip: unit === 'inches' ? '42-44' : '106-111' },
    { size: 'XL', bust: unit === 'inches' ? '40-42' : '101-106', waist: unit === 'inches' ? '34-36' : '86-91', hip: unit === 'inches' ? '44-46' : '111-116' },
    { size: 'XXL', bust: unit === 'inches' ? '42-44' : '106-111', waist: unit === 'inches' ? '36-38' : '91-96', hip: unit === 'inches' ? '46-48' : '116-121' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-2xl bg-ivory-50 rounded-2xl shadow-2xl border border-gold-500/20 overflow-hidden z-10 animate-slide-up p-5 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900">
              Mayaara Couture Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-ivory-200 text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Units & Category Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-4">
          <div className="flex items-center gap-1.5 p-1 bg-ivory-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('kurtis')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'kurtis' ? 'bg-maroon-900 text-white shadow-sm' : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              Kurtis & Sets
            </button>
            <button
              onClick={() => setActiveTab('lehengas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'lehengas' ? 'bg-maroon-900 text-white shadow-sm' : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              Lehengas & Gowns
            </button>
            <button
              onClick={() => setActiveTab('blouse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'blouse' ? 'bg-maroon-900 text-white shadow-sm' : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              Saree Blouses
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 bg-ivory-200/80 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                unit === 'inches' ? 'bg-white text-maroon-900 font-bold shadow-sm' : 'text-charcoal-600'
              }`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                unit === 'cm' ? 'bg-white text-maroon-900 font-bold shadow-sm' : 'text-charcoal-600'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-ivory-200 bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-ivory-100/70 border-b border-ivory-200 text-charcoal-700 font-serif font-bold">
              <tr>
                <th className="py-2.5 px-4">Size</th>
                <th className="py-2.5 px-4">Bust ({unit})</th>
                <th className="py-2.5 px-4">Waist ({unit})</th>
                <th className="py-2.5 px-4">Hip ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100 text-charcoal-800">
              {kurtiSizes.map((row) => (
                <tr key={row.size} className="hover:bg-ivory-50/80 transition-colors">
                  <td className="py-2 px-4 font-bold text-maroon-900">{row.size}</td>
                  <td className="py-2 px-4">{row.bust}</td>
                  <td className="py-2 px-4">{row.waist}</td>
                  <td className="py-2 px-4">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Free size & custom stitching note */}
        <div className="mt-4 p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-charcoal-700 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-maroon-900">Custom Stitching Available:</strong> All our sarees include complimentary unstitched blouse fabric. If you would like bespoke blouse stitching with custom necklines and pads, simply message us on WhatsApp when placing your order!
          </div>
        </div>
      </div>
    </div>
  );
}
