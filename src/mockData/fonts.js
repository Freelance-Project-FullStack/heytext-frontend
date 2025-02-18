const generateMockFonts = () => {
  const FONT_CATEGORIES = ['Sans Serif', 'Serif', 'Script', 'Display', 'Decorative', 'Monospace', 'Calligraphy', 'Handwritten'];

  const fontNames = [
    'Helvetica Pro',
    'Futura Bold',
    'Roboto Flex',
    'Playfair Display',
    'Montserrat Plus',
    'Open Sans Pro',
    'Lato Premium',
    'Raleway Extended',
    'Poppins Plus',
    'Merriweather Pro',
    'Ubuntu Premium',
    'Nunito Sans',
    'Source Pro',
    'Inter Complete',
    'Oswald Extended',
    'Work Sans Pro',
    'Fira Code',
    'DM Sans Plus',
    'Quicksand Pro',
    'Josefin Premium'
  ];

  const descriptions = [
    'Perfect for modern branding and digital interfaces',
    'Ideal for headlines and corporate identity',
    'Versatile font family for multiple purposes',
    'Elegant typeface for luxury brands',
    'Clean and professional font system'
  ];

  const mockFonts = [];

  for (let i = 0; i < 40; i++) {
    const nameIndex = i % fontNames.length;
    const variant = Math.floor(i / fontNames.length) + 1;
    const fontName = `${fontNames[nameIndex]}${variant > 1 ? ` V${variant}` : ''}`;

    mockFonts.push({
      id: `font_${i + 1}`,
      name: fontName,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      category: FONT_CATEGORIES[Math.floor(Math.random() * FONT_CATEGORIES.length)],
      styles: generateRandomStyles(),
      uses: generateRandomUses(),
      price: Math.floor(Math.random() * 90) + 10, // Price between 10 and 100
      downloads: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
      isActive: Math.random() > 0.2, // 80% chance of being active
      fontUrl: `/mock-fonts/${i + 1}.ttf`,
      tags: generateRandomTags(),
      createdAt: new Date(Date.now() - Math.random() * 10000000000)
    });
  }

  return mockFonts;
};

const generateRandomStyles = () => {
  const styles = [];
  const allStyles = ['Regular', 'Bold', 'Italic', 'Light', 'Medium', 'Black'];
  const numStyles = Math.floor(Math.random() * 4) + 1; // 1 to 4 styles

  while (styles.length < numStyles) {
    const style = allStyles[Math.floor(Math.random() * allStyles.length)];
    if (!styles.includes(style)) {
      styles.push(style);
    }
  }

  return styles;
};

const generateRandomUses = () => {
  const uses = [];
  const allUses = ['Logo', 'Branding', 'Website', 'Print', 'Packaging', 'Social Media', 'Advertisement'];
  const numUses = Math.floor(Math.random() * 3) + 1; // 1 to 3 uses

  while (uses.length < numUses) {
    const use = allUses[Math.floor(Math.random() * allUses.length)];
    if (!uses.includes(use)) {
      uses.push(use);
    }
  }

  return uses;
};

const generateRandomTags = () => {
  const allTags = ['modern', 'classic', 'elegant', 'professional', 'creative', 'clean', 'bold', 'minimal', 'decorative', 'vintage'];
  const tags = [];
  const numTags = Math.floor(Math.random() * 4) + 1; // 1 to 4 tags

  while (tags.length < numTags) {
    const tag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }

  return tags;
};
console.log(generateMockFonts());
export const mockFonts = generateMockFonts();
