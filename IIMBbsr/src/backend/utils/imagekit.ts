import ImageKit from 'imagekit';

let imagekitInstance: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (imagekitInstance) {
    return imagekitInstance;
  }

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error('ImageKit environment variables are missing (NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT).');
  }

  imagekitInstance = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });

  return imagekitInstance;
}

export const imagekit: ImageKit = new Proxy({} as ImageKit, {
  get(_target, prop: string | symbol, receiver) {
    const instance = getImageKit();
    const value = Reflect.get(instance as unknown as Record<string | symbol, unknown>, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

/**
 * Generate client-side authentication parameters for direct uploads
 */
export function getImageKitAuth() {
  return getImageKit().getAuthenticationParameters();
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
  return await getImageKit().upload({
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
  return await getImageKit().deleteFile(fileId);
}

export default imagekit;
