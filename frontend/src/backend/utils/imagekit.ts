import ImageKit from 'imagekit';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  console.warn('Warning: ImageKit environment variables are missing.');
}

export const imagekit = new ImageKit({
  publicKey: publicKey || '',
  privateKey: privateKey || '',
  urlEndpoint: urlEndpoint || '',
});

/**
 * Generate client-side authentication parameters for direct uploads
 */
export function getImageKitAuth() {
  return imagekit.getAuthenticationParameters();
}

/**
 * Upload a file buffer or base64 or URL to ImageKit
 */
export async function uploadToImageKit({
  file,
  fileName,
  folder = '/iimbbsr',
  tags = [],
}: {
  file: string | Buffer;
  fileName: string;
  folder?: string;
  tags?: string[];
}) {
  return await imagekit.upload({
    file,
    fileName,
    folder,
    tags,
  });
}

/**
 * Delete a file from ImageKit by fileId
 */
export async function deleteFromImageKit(fileId: string) {
  return await imagekit.deleteFile(fileId);
}

export default imagekit;

