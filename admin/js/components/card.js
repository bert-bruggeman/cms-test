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

      var raw = getAttribute("body", '');

      return {
        title: getAttribute("title", false),
        image: getAttribute("image", false),
        body: (raw) ? markdownUnEscapeString(raw) : false
      };
    },


    toBlock: function(obj) {
      if (obj.image || obj.body) {
        var title = (obj.title) ? ' title="' + obj.title + '"' : '';
        var image = (obj.image) ? ' image="' + obj.image + '"' : '';
        var body = (obj.body) ? ' body="' + markdownEscapeString(obj.body) + '"' : '';
        return '{{ card' + image + title + body + ' }}';
      }
    },


    toPreview: function(obj) {
      if (obj.image || obj.body) {
        var title = (obj.title) ? '<h3>' + obj.title + '</h3>' : '';   
        var image = (obj.image) ? '<img width=400 height=300 src="' + obj.image + '"/>' : '';
        var body = (obj.body) ? Markdown.render(obj.body) : '';
        return ('<article class="card">' + image + title +body + '</article>');
      }
    }

});


var markdownEscapeString = function(str) {
  return str.replace(/\n/g, /\\n/).replace(/\"/g, /\\"/).replace(/\'/g, /\\'/);
}

var markdownUnEscapeString = function(str) {
  return str.replace(/\\n/g, /\n/).replace(/\\"/g, /\"/).replace(/\\'/g, /\'/);
}

