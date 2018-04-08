var Vue = require('vue')

export default class Thank {
  
  constructor() {
    this.value = "test";
  }

  output() {
    let add = "test2";
    console.log(`${add} - ${this.value}`);
  }
}