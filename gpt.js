(function(Scratch) {
  'use strict';

  class SimpleAI {
    getInfo() {
      return {
        id: 'simpleai',
        name: 'ИИ Чат Бот',
        blocks: [
          {
            opcode: 'sayHello',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Скажи привет'
          }
        ]
      };
    }

    sayHello() {
      return 'Привет! Я работаю!';
    }
  }

  Scratch.extensions.register(new SimpleAI());
})(Scratch);
