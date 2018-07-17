'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const readFile = (path, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });

const readFileWithName = (path, name, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res({name: name, data: data});
    });
  });

const writeFile = (path, content) =>
  new Promise((res, rej) => {
    fs.writeFile(path, content, 'utf8', (err) => {
      if (err)
        rej(err);
      res();
    });
  });

const getModelFolders = (path) =>
  new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) rej(err);
      res(files);
    });
  });

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * ViewsHandlebars.js controller
 *
 * @description: A set of functions called "actions" of the `views-handlebars` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {

    const apiDir = __dirname + '/../../../api';

    // Get models
    let files = await getModelFolders(apiDir);

    let promises = files.map(model => {
      return [readFileWithName(apiDir + '/' + model + '/models/' + capitalizeFirstLetter(model) + '.settings.json', capitalizeFirstLetter(model) + '.settings.json'),
              readFileWithName(apiDir + '/' + model + '/models/' + capitalizeFirstLetter(model) + '.js', capitalizeFirstLetter(model) + '.js')];
    });
    let modelStrings = await Promise.all([].concat.apply([], promises));

    let writePromises = modelStrings.map( w => {
      writeFile(__dirname + '/../models/' + w.name, w.data );
    });

    await Promise.all(writePromises);

    // let autor =  await Autor.find();
    // console.log(autor);
    // console.log(results);
    // console.log(services);
    let readTemplatePromises = files.map(m => {
      return readFile(__dirname + '/../views/' + m + '.html', {});
    });
    let getDataPromises = files.map(m => {
      let modelName = capitalizeFirstLetter(m);
      return Post.findOne();
    });
    let templates = await Promise.all(readTemplatePromises);
    let datas = await Promise.all(getDataPromises);

    let writeTemplatePromises = files.map((m, i) => {
      let template = Handlebars.compile(String(templates[i]));
      console.log({...datas[i], model: m});
      let result = template({...datas[i], model: m});
      console.log(result);
      return writeFile(__dirname + '/../../../public/' + m + '.html', result);
    });

    await Promise.all(writeTemplatePromises);

    ctx.send({message: 'ok'});
  },
};
