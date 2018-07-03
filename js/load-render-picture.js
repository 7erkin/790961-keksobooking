'use strict';

(function () {
  var DEFAULT_IMAGE_WIDTH = 70;
  var DEFAULT_IMAGE_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var elementDefaultAvatarPhoto = document.querySelector('.ad-form-header__preview').querySelector('img');

  var Image = function (config, source) {
    this.width = config.width || DEFAULT_IMAGE_WIDTH;
    this.height = config.height || DEFAULT_IMAGE_HEIGHT;
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
      if (isAnyPhotos(this.renderParameters.container.node) && !canBeMorePhotos(this.renderParameters.container)) {
        renderer.deletePhotos.call(this.renderParameters.container.node);
      }
      this.renderParameters.container.node.appendChild(elementImage);
    },
    deletePhotos: function () {
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
        alt: 'Фотография апартаментов'
      }
    },
    avatar: {
      container: {
        node: document.querySelector('.ad-form-header__preview'),
        moreThanOnePhoto: false
      },
      config: {
        alt: 'Фотография пользователя'
      }
    }
  };

  var isAnyPhotos = function (elementContainer) {
    return (elementContainer.querySelector('img') !== null) ? true : false;
  };

  var canBeMorePhotos = function (elementContainer) {
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

  window.loadRenderPictures.deletePhotos = function () {
    Object.keys(idInputFileToRenderParameter).forEach(function (key) {
      var container = idInputFileToRenderParameter[key].container.node;
      if (isAnyPhotos(container)) {
        renderer.deletePhotos.call(container);
      }
    });
    renderDefaultAvatarPhoto();
  };
})();
