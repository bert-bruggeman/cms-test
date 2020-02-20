var defaultPreview = createClass({

  render: function() {
  
    var props = this.props;
    var entry = props.entry;

    var data = {
      layout:        entry.getIn(['data', 'layout']),
      title:         entry.getIn(['data', 'title']),
      date:          entry.getIn(['data', 'date']),
      header_image:  entry.getIn(['data', 'header_image']),
      header_title:  entry.getIn(['data', 'header_title']),
      header_body:   entry.getIn(['data', 'header_body']),
      body:          entry.getIn(['data', 'body']),
      sidebar:       entry.getIn(['data', 'sidebar']),
      form:          entry.getIn(['data', 'form'])
    };

    var html = [
      renderHeader(props, data),
      renderContent(props, data)
    ]

    return h('div', {}, html);
  
  }
  
});



var renderContent = function(props, data) {
  
  var html = {
    title: '',
    body: '',
    form: '',
    sidebar: '',
    overview: ''
  }
  
  if (data.layout == 'post') {
    html.title = h('h1', {}, data.title);
  }
  
  if (data.date) {
    html.date = h('time', {className: 'article-date'}, 'Gepost op ' + formatDate(data.date));
  }
  
  if (data.body) {
    html.body = props.widgetFor('body');
  }
  
  if (data.form) {
    html.form = renderForm(props, data);
  }
  
  if (data.sidebar) {
    html.sidebar = renderSidebar(props, data);
  }
  
  if (html.title || html.body || html.form || html.sidebar ) {
    return h('main', {}, h('div', {className: 'flex wrap'}, h('article', {className: 'article-content preview-body-container'}, html.title, html.date, html.body, html.form), html.sidebar));
  }
  
  return '';
}



var renderSidebar = function (props, entryData) {

  if (entryData.sidebar) {

    var widgets = props.widgetsFor('sidebar'); 

    var data = {
      image:        widgets.getIn(['data', 'image']),
      title:        widgets.getIn(['data', 'title']),
      body:         widgets.getIn(['data', 'body']),
      vcard:        widgets.getIn(['data', 'vcard']),
      recent_posts: widgets.getIn(['data', 'recent_posts'])
    }
    
    var html = {
      image: '',
      title: '',
      body: '',
      content: '',
      vcard: '',
      recent_posts: ''
    }
    
    if (data.image) {
      var src = props.getAsset(data.image).toString();
      html.image = h('img', {src: data.image});
    }
    
    if (data.title) {
      html.title = h('h2', {}, data.title);
    }
    
    if (data.body) {
      html.body = widgets.getIn(['widgets', 'body']);
    }
    
    if (html.body || data.title) {
      html.content = h('article', {className: 'grey sidebar-content'}, html.title, html.body);
    }
    
    if (data.vcard) {
      html.vcard = renderPreview('vcard', 'Contactgegevens');
    }
    
    if (data.recent_posts) {
      html.recent_posts = renderPreview('recent-posts', 'Recente nieuwsberichten');
    }

    return h('aside', {className: 'article-sidebar sidebar'}, html.image, html.content, html.vcard, html.recent_posts); 
    
  }

  return '';

}



var renderForm = function(props, entryData) {

  if (entryData.form) {

    var widgets = props.widgetsFor('form');

    var data = {
      fields:   widgets.getIn(['data', 'fields']),
      submit:   widgets.getIn(['data', 'submit'])
    }
    
    if (data.fields) {
    
      var fields = widgets.getIn(['widgets', 'fields']);
      var formFields = [];
      
      for (let obj of fields.props.value) {

        var field = {
          label: obj.get('label'),
          type: obj.get('type'),
          required: obj.get('required')
        };
        
        var input = '';
        
        if (field.required) {
          field.label += ' *';
        }
        
        switch (field.type) {

          case 'textarea':
            input = h('textarea', {placeholder: field.label, className: 'input'})
          break;
          
          default:
           input = h('input', {placeholder: field.label, type: 'text', className: 'input'})
           
        }

        formFields.push(h('div', {className: 'form-item'}, input));

      }
      
      if (data.submit) {
        formFields.push(h('input', {className: 'button', type: 'button', value: data.submit}));
      }
    
      return h('section', {className: 'form-wrapper'}, h('form', {className: "form"}, formFields));
      
    }

  }
  
  return ''; 
  
}


