/**
 * Formats length to 2 digits
 * @param {string} value - Value to get length of
 * @returns {string} Two digit length
 */
const lengthFormat = (value) => {
  const length = String(String(value).length);
  return length.padStart(2, '0');
};

function crc16(str) {
  // Khởi tạo bảng CRC lookup
  const crcTable = new Array(256);
  const polynomial = 0x1021; // Polynomial CRC-16-CCITT

  // Tạo bảng lookup
  for (let i = 0; i < 256; i++) {
    let crc = i << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc = crc << 1;
      }
    }
    crcTable[i] = crc & 0xffff;
  }

  // Chuyển đổi string thành mảng bytes
  const bytes = new TextEncoder().encode(str);

  // Tính CRC
  let crc = 0xffff; // Giá trị khởi tạo

  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    crc = ((crc << 8) & 0xffff) ^ crcTable[((crc >> 8) ^ byte) & 0xff];
  }

  // Trả về giá trị CRC16 dưới dạng hex
  return crc.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Generates VietQR code data string
 * @param {string} bankName - Banh name
 * @param {string} bankBin - Bank ID number
 * @param {string} accountNo - Account number
 * @param {string} accountName - Account holder name
 * @param {string|number} [amount=""] - Optional payment amount
 * @param {string} [message=""] - Optional payment message
 * @returns {string} QR code data string
 */
export const generateVietQRString = (bankBin, accountNo, accountName, amount = '', message = '', bankName) => {
  try {
    let qrString = '';
    if (bankName == 'Vietcombank')
      qrString = `00020101021238540010A00000072701240006${bankBin}01${String(accountNo).length}${accountNo}0208QRIBFTTA530370454${lengthFormat(amount)}${amount}5802VN62${lengthFormat(`08${lengthFormat(message)}${message}`)}08${lengthFormat(message)}${message}6304`;
    if (bankName == 'TPBank')
      qrString = `000201010211153139700704005204460000${accountNo}38550010A0000007270125000697042301${lengthFormat(accountNo)}${accountNo}0208QRIBFTTA5204513753037045802VN54${lengthFormat(amount)}${amount} 59${lengthFormat(message)}${message}6006Ha Noi8707CLASSIC6304`;
    return qrString + crc16(qrString);
  } catch (err) {
    console.log(err.message);
  }
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
export const generateVietQRCode = async (bankBin, accountNo, accountName, amount = '', message = '', bankName) => {
  try {
    const QRCode = (await import('qrcode')).default;
    const qrData = generateVietQRString(bankBin, accountNo, accountName, amount, message, bankName);
    console.log('qrDataqrDataqrDataqrData', qrData);
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
