/**
 * Formats length to 2 digits
 * @param {string} value - Value to get length of
 * @returns {string} Two digit length
 */
const lengthFormat = (value) => {
  const length = value.length.toString();
  return length.padStart(2, '0');
};

/**
 * Serializes data object into VietQR format
 * @param {object} data - Data object to serialize
 * @returns {string} Serialized data string
 */
const serializeData = (data) => {
  let result = '';

  for (const [id, value] of Object.entries(data)) {
    if (typeof value === 'object') {
      result += id + lengthFormat(serializeData(value)) + serializeData(value);
    } else {
      result += id + lengthFormat(value) + value;
    }
  }

  return result;
};

/**
 * Generates VietQR code data string
 * @param {string} bankBin - Bank ID number
 * @param {string} accountNo - Account number
 * @param {string} accountName - Account holder name
 * @param {string|number} [amount=""] - Optional payment amount
 * @param {string} [message=""] - Optional payment message
 * @returns {string} QR code data string
 */
export const generateVietQRString = (bankBin, accountNo, accountName, amount = '', message = '') => {
  const consumerInfo = {
    52: '5999', // Merchant Category Code for Individual
    58: 'VN', // Country Code (VN)
    53: '704' // Currency Code (VND)
  };

  // Initialize with payload format indicator
  const data = {
    '00': '01', // Version
    '01': '11', // InitMethod (Static)
    38: {
      // Additional Consumer Data
      '00': accountName, // Account name
      '01': message // Additional info
    }
  };

  // Merchant account information for VietQR
  const merchantAccInfo = {
    '00': 'A000000727', // VietQR application ID
    '01': bankBin, // Bank BIN
    '02': accountNo // Account number
  };

  data['30'] = serializeData(merchantAccInfo);

  // Add amount if provided
  if (amount) {
    data['54'] = amount.toString();
  }

  // Add consumer info
  Object.assign(data, consumerInfo);

  return serializeData(data);
};

/**
 * Generates VietQR code as base64 image
 * @param {string} bankBin - Bank ID number
 * @param {string} accountNo - Account number
 * @param {string} accountName - Account holder name
 * @param {string|number} [amount=""] - Optional payment amount
 * @param {string} [message=""] - Optional payment message
 * @returns {Promise<string>} Base64 encoded QR code image
 */
export const generateVietQRCode = async (bankBin, accountNo, accountName, amount = '', message = '') => {
  try {
    const QRCode = (await import('qrcode')).default;
    const qrData = generateVietQRString(bankBin, accountNo, accountName, amount, message);
    return await QRCode.toDataURL(qrData);
  } catch (err) {
    throw new Error('Failed to generate QR code: ' + err.message);
  }
};

// Bank BIN constants (you can add more)
export const BANK_BINs = {
  VCB: '970403', // Vietcombank
  TCB: '970407', // Techcombank
  MB: '970422', // MBBank
  ACB: '970416', // ACB
  BIDV: '970418' // BIDV
};
