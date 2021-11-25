'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.validate(
      {
        name: { type: 'string' },
        phone: { type: 'phone' },
      },
      this.crx.query
    );
    return this.ctx.response._success([1, 2, 3]);
  }
}

module.exports = HomeController;
