'use strict';

(function () {
  var elementDefaultAvatarPhoto = document.querySelector('.ad-form-header__preview').querySelector('img');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImageAvatar = function (source) {
    this.width = 70;
    this.height = 70;
    this.src = source;
    this.alt = 'Фотография пользователя';
  };
  var ImageApartments = function (source) {
    this.width = 70;
    this.height = 70;
    this.src = source;
    this.alt = 'Фотография апартаментов';
  };
  var toNode = function (image) {
    var elementImage = document.createElement('img');
    Object.keys(image).forEach(function (key) {
      elementImage[key] = image[key];
    });
    return elementImage;
  };
  var renderer = {
    renderPhoto: function (source) {
      var elementImage = toNode(new this.renderParameters.constructor(source));
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
  var idInputFileToRenderParameters = {
    images: {
      container: {
        node: document.querySelector('.ad-form__photo'),
        moreThanOnePhoto: true
      },
      constructor: ImageApartments
    },
    avatar: {
      container: {
        node: document.querySelector('.ad-form-header__preview'),
        moreThanOnePhoto: false
      },
      constructor: ImageAvatar
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
    elementInput.renderParameters = idInputFileToRenderParameters[elementInput.id];
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
    Object.keys(idInputFileToRenderParameters).forEach(function (key) {
      var container = idInputFileToRenderParameters[key].container.node;
      if (isAnyPhotoes(container)) {
        renderer.deletePhotoes.call(container);
      }
    });
    renderDefaultAvatarPhoto();
  };
})();
