import { CartItem, Product, ProductSize } from '@/types';
import { siteConfig } from '@/site.config';

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Clean phone number to digits only for wa.me
 */
export function getWhatsAppNumber(): string {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsappNumber;
  return rawNumber.replace(/\D/g, '');
}

/**
 * Generate WhatsApp message URL for a single product order
 */
export function generateProductWhatsAppUrl(
  product: Product,
  selectedSize: ProductSize,
  selectedColor: string,
  currentUrl?: string
): string {
  const number = getWhatsAppNumber();
  const effectivePrice = product.discountPrice || product.price;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : siteConfig.url;
  const productUrl = currentUrl || `${baseUrl}/shop/${product.slug}`;

  const message = [
    `🙏 *Namaste Mayaara Couture!*`,
    ``,
    `I would like to place an order for this piece:`,
    `✨ *${product.name}*`,
    `🏷️ *SKU:* ${product.sku}`,
    `📏 *Selected Size:* ${selectedSize}`,
    `🎨 *Selected Color:* ${selectedColor}`,
    `💰 *Price:* ${formatCurrency(effectivePrice)}${
      product.discountPrice
        ? ` (MRP: ~${formatCurrency(product.price)}~)`
        : ''
    }`,
    `🔗 *Product Link:* ${productUrl}`,
    ``,
    `Could you please verify availability and provide dispatch & payment details (GPay/UPI/Bank)?`,
    `Thank you!`,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp checkout URL for all cart items
 */
export function generateCartWhatsAppUrl(
  cartItems: CartItem[],
  subtotal: number,
  customerName?: string,
  deliveryCity?: string
): string {
  const number = getWhatsAppNumber();

  const itemsList = cartItems
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}*\n   Size: ${item.size} | Color: ${item.color} | Qty: ${
          item.quantity
        }\n   Subtotal: ${formatCurrency(item.price * item.quantity)}`
    )
    .join('\n\n');

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const message = [
    `🛍️ *NEW ORDER - MAYAARA COUTURE*`,
    `----------------------------------------`,
    itemsList,
    `----------------------------------------`,
    `📦 *Total Items:* ${totalItems}`,
    `💳 *Estimated Total:* *${formatCurrency(subtotal)}*`,
    `🚚 *Shipping:* Complimentary across India`,
    `----------------------------------------`,
    `👤 *Customer Name:* ${customerName?.trim() || '[Please fill your name]'}`,
    `📍 *Delivery City / Pin:* ${deliveryCity?.trim() || '[Please fill your city & pincode]'}`,
    ``,
    `Please share your payment details (GPay/UPI/Bank Transfer) to confirm this order. Thank you!`,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp message URL for custom styling or boutique enquiry
 */
export function generateEnquiryWhatsAppUrl(
  name: string,
  phone: string,
  serviceType: string,
  message: string
): string {
  const number = getWhatsAppNumber();

  const formattedMessage = [
    `✨ *INQUIRY - MAYAARA COUTURE*`,
    `----------------------------------------`,
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    `👗 *Interested In:* ${serviceType}`,
    `💬 *Message:* ${message}`,
    `----------------------------------------`,
    `Sent via Mayaara Couture Website`,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(formattedMessage)}`;
}
