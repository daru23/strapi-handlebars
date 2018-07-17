'use strict';

/**
 * Autor.js controller
 *
 * @description: A set of functions called "actions" for managing `Autor`.
 */

module.exports = {

  /**
   * Retrieve autor records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.autor.search(ctx.query);
    } else {
      return strapi.services.autor.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a autor record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.autor.fetch(ctx.params);
  },

  /**
   * Count autor records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.autor.count(ctx.query);
  },

  /**
   * Create a/an autor record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.autor.add(ctx.request.body);
  },

  /**
   * Update a/an autor record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.autor.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an autor record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.autor.remove(ctx.params);
  }
};
