const mockFonts = [
  {
    id: '1',
    name: 'Arial Pro',
    description: 'Modern sans-serif font family',
    category: 'Sans Serif',
    styles: ['Regular', 'Bold', 'Italic'],
    uses: ['Website', 'Branding'],
    price: 29.99,
    downloads: 150,
    views: 1200,
    rating: 4.5,
    isActive: true,
    previewUrl: '/images/arial-preview.png',
    tags: ['modern', 'clean', 'professional']
  },
  {
    id: '2',
    name: 'Times New Roman Pro',
    description: 'Classic serif font family',
    category: 'Serif',
    styles: ['Regular', 'Bold', 'Italic'],
    uses: ['Print', 'Website'],
    price: 39.99,
    downloads: 200,
    views: 1500,
    rating: 4.8,
    isActive: true,
    previewUrl: '/images/times-preview.png',
    tags: ['classic', 'traditional', 'readable']
  }
];

module.exports = { mockFonts };
