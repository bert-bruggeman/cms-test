CMS.registerEditorComponent({
    id: "card",
    label: "Kaart",
    pattern: '^{{ card (.*) }}',
    fields: [
      {
        name: 'title',
        label: 'Title',
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
        title: getAttribute("title", false),
        image: getAttribute("image", false),
        body: getAttribute("body", false).replace("\\n", "\n")
      };
    },


    toBlock: function(obj) {
      if (obj.image || obj.body) {
      console.log(obj.body.replace("\n", "\\n"));
        return '{{ card title="' + obj.title + '" image="' + obj.image + '" body="' + obj.body.replace("\n", "\\n") + '" }}';
      }
    },


    toPreview: function(obj) {
      if (obj.image || obj.body) {
        var title = (obj.title) ? h('h3', {}, obj.title) : '';
        var image = (obj.image) ? h('img', {src: obj.image}) : '';
        var body = (obj.body) ? h('div', {}, obj.body) : '';
      
        return h('article', {className: 'card'}, image, title, body.toString());
      }
    }

});
