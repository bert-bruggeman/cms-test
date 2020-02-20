CMS.registerEditorComponent({
    id: "code-block",
    label: "Knop",
    pattern: '^{{ button (.*) }}',
    fields: [
      {
        name: 'text',
        label: 'Tekst',
        widget: 'string'
      },
      {
        name: 'href',
        label: 'Link',
        widget: 'string',
        hint: 'Dit kan een externe link zijn zoals "https://www.google.com" of een interne link zoals "/over-ons".\n Geef een interne link steeds in zonder de domeinnaam, beginnend met de eerste "/" na de domeinnaam (bv. "www.mijn-website.be/blog/welkom" wordt "/blog/welkom").'
      }
    ],


    fromBlock: function(match) {

      function getAttribute(attribute, defaultValue) {
        var val = match[1].match(attribute + '="(.*?)"');
        return val ? val[1] : defaultValue;
      }

      return {
        text: getAttribute("text", false),
        href: getAttribute("href", false)
      };
    },


    toBlock: function(obj) {
      if (obj.text && obj.href) {
        return '{{ button text="' + obj.text + '" href="' + obj.href + '" }}';
      }
    },


    toPreview: function(obj) {
      if (obj.text && obj.href) {
        return h('a', {href: obj.href, className: 'button'}, obj.text);
      }
    }

});
