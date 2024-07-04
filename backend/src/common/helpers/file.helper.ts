export const generateRandomFileName = (req, file, cb) => {
    const originalName = file.originalname || '';
    const nameParts = originalName.split('.');
    const extension = nameParts[nameParts.length-1];
    const filename = `${Date.now()}.${extension}`;
    cb(null, filename);
};