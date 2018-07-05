'use strict';

(function () {
  var DEFAULT_IMAGE_WIDTH = 70;
  var DEFAULT_IMAGE_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var elementAvatarContainer = document.querySelector('.ad-form-header__preview');
  var elementDefaultAvatarPhoto = elementAvatarContainer.querySelector('img');
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

  var Image = function (inputIdName, source) {
    var renderParameter = idInputFileToRenderParameter[inputIdName];
    this.element = document.createElement('img');
    this.element.width = renderParameter.config.width || DEFAULT_IMAGE_WIDTH;
    this.element.height = renderParameter.config.height || DEFAULT_IMAGE_HEIGHT;
    this.element.alt = renderParameter.config.alt;
    this.element.src = source;
    this.container = renderParameter.container;
  };

  Image.prototype.isAnyPhotos = function () {
    return (this.container.node.querySelector('img') !== null) ? true : false;
  };
  Image.prototype.canBeMorePhotos = function () {
    return this.container.moreThanOnePhoto;
  };
  Image.prototype.render = function () {
    if (this.isAnyPhotos() && !this.canBeMorePhotos()) {
      this.deletePhotos();
    }
    this.container.node.appendChild(this.element);
  };
  Image.prototype.deletePhotos = function () {
    var elementsPhotos = this.container.node.querySelectorAll('img');
    Array.prototype.forEach.call(elementsPhotos, function (elementPhoto) {
      elementPhoto.remove();
    });
  };

  var onChanged = function (evt) {
    var elementInput = evt.target;
    Array.prototype.forEach.call(elementInput.files, function (file) {
      var fileName = file.name.toLowerCase();
      var match = FILE_TYPES.some(function (typeName) {
        return fileName.endsWith(typeName);
      });
      if (match) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var image = new Image(elementInput.id, reader.result);
          image.render();
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var renderDefaultAvatarPhoto = function () {
    elementAvatarContainer.appendChild(elementDefaultAvatarPhoto);
  };

  var addListeners = function () {
    window.library.addListenerTo('#avatar', 'change', onChanged);
    window.library.addListenerTo('#images', 'change', onChanged);
  };

  addListeners();

  window.loadRenderPictures = {};

  window.loadRenderPictures.deletePhotos = function () {
    Object.keys(idInputFileToRenderParameter).forEach(function (key) {
      var elementContainer = idInputFileToRenderParameter[key].container.node;
      var elementsPhoto = elementContainer.querySelectorAll('img');
      Array.prototype.forEach.call(elementsPhoto, function (elementPhoto) {
        elementPhoto.remove();
      });
    });
    renderDefaultAvatarPhoto();
  };
})();
