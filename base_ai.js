(function(Scratch) {
  'use strict';

  const apiKey = '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';

  class OpenRouterExtension {
    getInfo() {
      return {
        id: 'openrouter',
        name: 'ИИ Чат Бот',
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
      const userInput = args.TEXT;

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://turbowarp.org',
            'X-Title': 'TurboWarp AI ChatBot'
          },
          body: JSON.stringify({
            model: 'mistral/mistral-7b-instruct',
            messages: [
              { role: 'system', content: 'Отвечай кратко и по-русски.' },
              { role: 'user', content: userInput }
            ]
          })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'Ошибка: нет ответа';
      } catch (err) {
        return 'Ошибка подключения: ' + err.message;
      }
    }
  }

  Scratch.extensions.register(new OpenRouterExtension());
})(Scratch);
