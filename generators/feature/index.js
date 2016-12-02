const yeoman = require('yeoman-generator');
const plural = require('plural');

module.exports = yeoman.Base.extend({
  initializing() {
    this.argument('name', {
      type: String,
      required: true,
      description: 'Your feature name:',
    });
  },
  prompting() {
    return this.prompt([
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select modules:',
        choices: [
          'container',
          'component',
          'style',
          'api',
          'action',
          'reducer',
          'schema',
          'saga',
          'selector',
        ],
      },
      {
        when: function (response) {
          return response.modules.includes('action');
        },
        name: 'actionType',
        type: 'list',
        message: 'List the operations',
        choices: [
          'requestAction',
          'typeAction'
        ]
      },
      {
        when: function (response) {
          if (response.actionType)
            return response.actionType.includes('requestAction');
          return false;
        },
        name: 'operations',
        type: 'checkbox',
        message: 'List the operations',
        choices: [
          'GET_LIST',
          'ADD',
          'UPDATE',
          'REMOVE',
        ]
      },
      {
        when: function (response) {
          if (response.actionType)
            return response.actionType.includes('typeAction');
          return false;
        },
        name: 'operations',
        message: 'List the operations seperated by ,',
      }
    ]).then((answers) => {
      this.modules = answers.modules;
      this.actionType = answers.actionType || '';
      if (this.modules.includes('action') && answers.actionType === 'typeAction')
        this.operations = answers.operations.split(',');
      else if (this.modules.includes('action'))
        this.operations = answers.operations || [];
      else
        this.operations = [];

    });
  },

  writing() {
    this.className = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.plural = plural(this.name);
    this.upper = this.name.toUpperCase();
    this.upperOperations = this.operations.map((x) => x.toUpperCase().trim());

    this.modules.forEach(module => {
      const suffix = module === 'style' ? 'css' : 'js';
      const folder = `${plural(module)}`;
      let tmplFileName = `${module}`;

      if (module === 'action') {
        if (this.actionType === 'typeAction')
          tmplFileName = 'typeAction';
        else
          tmplFileName = 'requestAction';
      }
      this.fs.copyTpl(
        this.templatePath(`${tmplFileName}.${suffix}`),
        this.destinationPath(`src/${folder}/${this.name}.${suffix}`),
        this
      );
    });
  },
});
