'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    try {
      this.ctx.validate(
        {
          name: { type: 'string' },
          phone: { type: 'phone' },
        },
        this.ctx.query
      );
      return this.ctx.response._success([1, 2, 3]);
    } catch (error) {
      this.ctx.response._error(error);
    }
  }
}

module.exports = HomeController;
