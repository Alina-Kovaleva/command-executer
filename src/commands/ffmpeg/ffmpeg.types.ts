import { CommandExecutorInterface } from '../../core/executor/command.types'

export interface FfmpegInput {
  width: number
  height: number
  inputPath: string
  outputPath: string
}

export interface FfmpegCommandExec extends CommandExecutorInterface {
  output: string
}
