CMS.registerEditorComponent({
    id: "card",
    label: "Kaart",
    pattern: '^{{ card (.*) }}',
    fields: [
      {
        name: 'title',
        label: 'Tekst',
        widget: 'string'
      },
      {
        name: 'image',
        label: 'Afbeelding',
        widget: 'image'
      },
      {
        name: 'body',
        label: 'Inhoud',
        widget: 'markdown'
      }
    ],


    fromBlock: function(match) {

      function getAttribute(attribute, defaultValue) {
        var val = match[1].match(attribute + '="(.*?)"');
        return val ? val[1] : defaultValue;
      }

      return {
        text: getAttribute("title", false),
        href: getAttribute("image", false)
        href: getAttribute("body", false)
      };
    },


    toBlock: function(obj) {
      if (obj.text && obj.href) {
        return '{{ card title="' + obj.title + '" image="' + obj.image + '" body="' + obj.body + '" }}';
      }
    },


    toPreview: function(obj) {
      if (obj.text && obj.href) {
        
        var title = (obj.title) ? h('h3', {}, obj.title) : '';
        var image = (obj.image) ? h('img', {src: obj.image}) : '';
        var body = (obj.body) ? h('div', {}, obj.body) : '';
      
        return h('article', {className: 'card'}, image, title, body);
      }
    }

});
