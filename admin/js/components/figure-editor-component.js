CMS.registerEditorComponent({
    id: "image",
    label: "Afbeelding",
    pattern: '^{{ figure(.*)',
    fields: [
      {
        name: 'src',
        label: 'Afbeelding',
        widget: 'image',
        required: true,
        default: ''
      },
      {
        name: 'text',
        label: 'Titel of informatie',
        widget: 'string',
        required: false
      },
      {
        name: 'style',
        label: 'Style',
        widget: 'hidden',
        default: 'thumbnail'
      },
      {
        name: 'zoom',
        label: 'Zoom',
        widget: 'hidden',
        default: true
      },

    ],

    fromBlock: function(match) {

      function getAttribute(attribute, defaultValue) {
        var val = match[1].match(attribute + '="(.*?)"');
        return val ? val[1] : defaultValue;
      }

      return {
        src: getAttribute("src",false),
        text: getAttribute("text",false),
        style: getAttribute("style","thumbnail"),
        zoom: getAttribute("zoom",false)
      };
    },

    toBlock: function(obj) {
      if (obj.src) {
        return '{{ figure src="' + obj.src + '"' + ' style="' + obj.style + '"' + (obj.text ? ' text="' + obj.text + '"' : '') + (obj.zoom ? ' zoom="' + obj.zoom + '"' : '') + ' }}';
      }
    },

    toPreview: function(obj) {
      return h('figure', {className: obj.style}, h('img', {src: obj.src, className: 'cover lazyloaded'}));
    }

});
