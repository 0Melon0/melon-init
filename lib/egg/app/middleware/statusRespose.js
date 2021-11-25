'use strict';
module.exports = () =>
  async function statusRespose(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.response._error(error);
    }
    ctx.body || ctx.response._notFound();
    ctx.status = ctx.body.code;
    delete ctx.body.code;
  };
