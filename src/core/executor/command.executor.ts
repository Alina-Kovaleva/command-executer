import { ChildProcessWithoutNullStreams } from 'child_process'
import { StreamLoggerInterface } from '../handlers/stream-logger.interface'
import { CommandExecutorInterface } from './command.types'

export abstract class CommandExecutor<Input> {
  constructor(private logger: StreamLoggerInterface) {}

  public async execute() {
    const input = await this.prompt()
    const command = this.build(input)

    const stream = this.spawn(command)
    this.processStream(stream, this.logger)
  }

  protected abstract prompt(): Promise<Input>
  protected abstract build(input: Input): CommandExecutorInterface
  protected abstract spawn(command: CommandExecutorInterface): ChildProcessWithoutNullStreams
  protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void
}
