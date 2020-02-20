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
        body: getAttribute("body", false).replace(/\\n/g, "\n")
      };
    },


    toBlock: function(obj) {
      if (obj.image || obj.body) {
        var title = (obj.title) ? ' title="' + obj.title + '"' : '';
        var image = (obj.image) ? ' image="' + obj.image + '"' : '';
        var body = (obj.body) ? ' body="' + obj.body + '"' : '';
        return '{{ card' + image + title + body + '" }}';
      }
    },


    toPreview: function(obj) {
      if (obj.image || obj.body) {
        var title = (obj.title) ? h('h3', {}, obj.title) : '';
        var image = (obj.image) ? h('img', {src: obj.image}) : '';
        var body = (obj.body) ? h('div', {}, Markdown.render(obj.body)) : '';
        return h('article', {className: 'card'}, image, title, body);
      }
    }

});


var markdownString = function(str) {
  
  
  
  
}
