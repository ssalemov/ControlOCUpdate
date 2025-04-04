(function(Scratch) {
  'use strict';

  const apiKey = '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'; // Вставь сюда свой OpenRouter API-ключ

  class OpenRouterExtension {
    getInfo() {
      return {
        id: 'ControlAI',
        name: 'ИИ чат',
        blocks: [
          {
            opcode: 'askAI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ИИ-ответ на [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Привет, как дела?'
              }
            }
          }
        ]
      };
    }

    async askAI(args) {
      const userMessage = args.TEXT;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://turbowarp.org',
          'X-Title': 'TurboWarp AI Bot'
        },
        body: JSON.stringify({
          model: 'mistral/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'Ты умный помощник. Отвечай кратко, понятно и по-русски.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    }
  }

  Scratch.extensions.register(new OpenRouterExtension());
})(Scratch);
