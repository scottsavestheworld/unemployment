      const $$ = {
        element : function (tagName, primaryClass, secondaryClasses, idName, innerImage) {
          tagName       = $$.string(tagName);
          idName        = $$.string(idName);
          innerImage    = $$.string(innerImage);
          let className = `${$$.string(primaryClass)} ${$$.string(secondaryClasses)}`.trim();
          let element;

          try {
            element = document.createElement(tagName);
          }
          catch (error) {
            console.warn(`$$.element: ${tagName} is not a valid tag name.`);
            return null;
          }

          if (className) {
            element.className = className;
          }

          if (idName) {
            element.id = idName;
          }

          if (innerImage) {
            element.image = $$.element("img");
            element.image.src = innerImage;
            element.image.className = `${primaryClass}_image`;
            element.appendChild(element.image);
          }

          return element;
        },

        string: function (value) {
          return typeof value === "string" ? value : "";
        },

        random: function (min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      };
