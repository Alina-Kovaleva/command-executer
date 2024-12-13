import { promises } from 'fs'
import { dirname, isAbsolute, join } from 'path'

export class FileService {
  public getFilePath(path: string, fileName: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = join(__dirname, path)
    }
    return join(dirname(path), `${fileName}.${ext}`)
  }

  async deleteFileIfExist(path: string): Promise<void> {
    try {
      await promises.unlink(path)
    } catch (error) {
      if (isNodeError(error) && error.code !== 'ENOENT') {
        console.error(`Failed to delete file at ${path}: `, error)
      }
    }
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
