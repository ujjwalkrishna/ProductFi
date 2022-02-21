const QRCode = require('qrcode');

class QRCodeService {
    async generateQR(code) {
        const data = await QRCode.toDataURL(code);
        return data;
    }
}

module.exports = new QRCodeService();