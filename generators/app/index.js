const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting() {
    this.log(yosay(
      `Welcome to the stellar ${chalk.red('generator-reactapp')} generator!`
    ));

    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'Your project name',
        default: this.appname.replace(/\s/g, '-'),
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      this.props
    );

    this.fs.copy(
      this.templatePath('server.js'),
      this.destinationPath('server.js')
    );

    this.fs.copy(
      this.templatePath('api.js'),
      this.destinationPath('api.js')
    );

    this.fs.copy(
      this.templatePath('db.json'),
      this.destinationPath('db.json')
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath('.npmignore')
    );

    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    );

    this.fs.copy(
      this.templatePath('stylelintrc'),
      this.destinationPath('.stylelintrc')
    );

    const ignore = {
    };

    this.fs.copyTpl(
      this.templatePath('test'),
      this.destinationPath('test'),
      this.props,
      null
    );

    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      this.props
    );

    this.fs.copy(
      this.templatePath('src/assets'),
      this.destinationPath('src/assets')
    );
  },

  install() {
    this.installDependencies();
  },
});
