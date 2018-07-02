'use strict';

(function () {
  var elementDefaultAvatarPhoto = document.querySelector('.ad-form-header__preview').querySelector('img');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var Image = function (config, source) {
    this.width = config.width;
    this.height = config.height;
    this.src = source;
    this.alt = config.alt;
  };
  Image.prototype.toNode = function () {
    var elementImage = document.createElement('img');
    var self = this;
    Object.keys(this).forEach(function (key) {
      elementImage[key] = self[key];
    });
    return elementImage;
  };
  var renderer = {
    renderPhoto: function (source) {
      var elementImage = (new Image(this.renderParameters.config, source)).toNode();
      if (isAnyPhotoes(this.renderParameters.container.node) && !canBeMorePhotoes(this.renderParameters.container)) {
        renderer.deletePhotoes.call(this.renderParameters.container.node);
      }
      this.renderParameters.container.node.appendChild(elementImage);
    },
    deletePhotoes: function () {
      var elementPhotoes = this.querySelectorAll('img');
      Array.prototype.forEach.call(elementPhotoes, function (photo) {
        photo.remove();
      });
    }
  };
  var idInputFileToRenderParameter = {
    images: {
      container: {
        node: document.querySelector('.ad-form__photo'),
        moreThanOnePhoto: true
      },
      config: {
        width: 70,
        height: 70,
        alt: 'Фотография апартаментов'
      }
    },
    avatar: {
      container: {
        node: document.querySelector('.ad-form-header__preview'),
        moreThanOnePhoto: false
      },
      config: {
        width: 70,
        height: 70,
        alt: 'Фотография пользователя'
      }
    }
  };
  var isAnyPhotoes = function (elementContainer) {
    return (elementContainer.querySelector('img') !== null) ? true : false;
  };
  var canBeMorePhotoes = function (elementContainer) {
    return elementContainer.moreThanOnePhoto;
  };

  var onChanged = function (evt) {
    var elementInput = evt.target;
    elementInput.renderParameters = idInputFileToRenderParameter[elementInput.id];
    Array.prototype.forEach.call(elementInput.files, function (file) {
      var fileName = file.name.toLowerCase();
      var match = FILE_TYPES.some(function (typeName) {
        return fileName.endsWith(typeName);
      });

      if (match) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          renderer.renderPhoto.call(elementInput, reader.result);
        });
        reader.readAsDataURL(file);
      }
    });
  };
  var renderDefaultAvatarPhoto = function () {
    var elementContainer = document.querySelector('.ad-form-header__preview');
    elementContainer.appendChild(elementDefaultAvatarPhoto);
  };


  var addListeners = function () {
    window.library.addListenerTo('#avatar', 'change', onChanged);
    window.library.addListenerTo('#images', 'change', onChanged);
  };

  addListeners();

  window.loadRenderPictures = {};
  window.loadRenderPictures.deletePhotoes = function () {
    Object.keys(idInputFileToRenderParameter).forEach(function (key) {
      var container = idInputFileToRenderParameter[key].container.node;
      if (isAnyPhotoes(container)) {
        renderer.deletePhotoes.call(container);
      }
    });
    renderDefaultAvatarPhoto();
  };
})();
