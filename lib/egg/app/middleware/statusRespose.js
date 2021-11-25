'use strict';
module.exports = () =>
  async function statusRespose(ctx, next) {
    await next();
    ctx.body || ctx.response._notFound();
    ctx.status = ctx.body.code;
    delete ctx.body.code;
  };
