import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { CommandExecutor } from '../../core/executor/command.executor'
import { StreamLoggerInterface } from '../../core/handlers/stream-logger.interface'
import { FfmpegCommandExec, FfmpegInput } from './ffmpeg.types'
import { FileService } from '../../core/files/file.service'
import { PromptService } from '../../core/prompt/prompt.service'
import { FfmpegBuilder } from './ffmpeg.builder'
import { StreamHandler } from '../../core/handlers/stream.handler'

export class FfmpegExecutor extends CommandExecutor<FfmpegInput> {
  private fileService: FileService = new FileService()
  private promptService: PromptService = new PromptService()

  constructor(logger: StreamLoggerInterface) {
    super(logger)
  }

  protected async prompt(): Promise<FfmpegInput> {
    const width = await this.promptService.input<number>('Width', 'number')
    const height = await this.promptService.input<number>('Height', 'number')
    const inputPath = await this.promptService.input<string>('Input path to video', 'input')
    const outputPath = await this.promptService.input<string>('Output path (name)', 'input')

    return { width, height, inputPath, outputPath }
  }
  protected build({ width, height, inputPath, outputPath }: FfmpegInput): FfmpegCommandExec {
    const output = this.fileService.getFilePath(inputPath, outputPath, 'mp4')
    const args = new FfmpegBuilder().input(inputPath).setVideoSize(width, height).output(output)

    const builder = { command: 'ffmpeg', args, output }
    return builder
  }
  protected spawn({ output, command, args }: FfmpegCommandExec): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExist(output)
    return spawn(command, args)
  }
  protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void {
    const handler = new StreamHandler(logger)
    handler.processOutput(stream)
  }
}
