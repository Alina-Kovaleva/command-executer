import { PromptService } from './core/prompt/prompt.service'

export class App {
  async run() {
    const result = await new PromptService().input<number>('Enter a number', 'number')

    console.log(result)
  }
}

const app = new App()
app.run()
