/** Checks whether an image uses a supported format and stays within the upload limit. */
export function validateImageFile(file: File): boolean {
  return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type) && file.size <= 5 * 1024 * 1024
}

/** Reads an image file and resolves with its data URL for a preview. */
export function readImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Не удалось прочитать фото.'))
    reader.readAsDataURL(file)
  })
}