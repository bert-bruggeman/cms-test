var frontpagePreview = createClass({

  render: function() {
  
    var props = this.props;
    var entry = props.entry;

    var data = {
      layout:        entry.getIn(['data', 'layout']),
      title:         entry.getIn(['data', 'title']),
      header_image:  entry.getIn(['data', 'header_image']),
      header_title:  entry.getIn(['data', 'header_title']),
      header_body:   entry.getIn(['data', 'header_body']),
      about:         entry.getIn(['data', 'about']),
      cards:         entry.getIn(['data', 'cards']),
      banner:        entry.getIn(['data', 'banner']),
    };

    var html = [
      renderHeader(props, data),
      renderAbout(props, data),
      renderCards(props, data),
      renderBanner(props, data),
      renderPreview('overview', 'Overzicht van recente nieuwsberichten')
    ];

    return h('div', {}, html);
  
  }
  
});


var renderAbout = function (props, entryData) {
  
  if (entryData.about) {
  
    var widgets = props.widgetsFor('about');
    
    var data = {
      title:  widgets.getIn(['data', 'title']),
      body:   widgets.getIn(['data', 'body'])
    }
    
    var html = {
      title: '',
      body: '',
      image: h('img', {src: '/media/achtergrond-sfeerbeeld.jpg', className: 'cover'})
    }
    
    if (data.body) {
      html.body = widgets.getIn(['widgets', 'body']);
    }
    
    if (data.title) {
      html.title = h('h2', {className: 'draw heading-huge line-after text-light'}, data.title);
    }
    
    if (data.body || data.title) {
      return h('article', {className: 'dark flex flex-center height-half wrap'}, html.image, h('div', {className: 'article-content center preview-body-container'}, html.title, html.body)); 
    }

  }
  
  return '';
    
}


var renderCards = function(props, entryData) {

  if (entryData.cards) {

    var widgets = props.widgetsFor('cards');

    return h('section', {className: 'flex wrap'}, h('div', {className: "cards flex"}, widgets.map(function(entry, index) {

      var data = {
        title:  entry.getIn(['data', 'title']),
        image: entry.getIn(['data', 'image']),
        body:   entry.getIn(['data', 'body'])
      }

      var html = {
        image: '',
        title: '',
        body: '',
        content: ''
      }
      
      if (data.image) {
        var src = props.getAsset(data.image).toString();
        html.image = h('figure', {className: 'card-figure'}, h('img', {className: 'cover', src: src}))
      }
    
      if (data.title) {
        html.title = h('h3', {className: 'card-title'}, data.title);
      }
      
      if (data.body) {
        html.body = entry.getIn(['widgets', 'body']);
      }
      
      if (data.symbol) {
        var src = '/assets/symbols/' + data.symbol + '.svg';
        html.symbol = h('img', {className: 'card-symbol', src: src});
      }
      
      if (html.title || html.body) {
        html.content = h('div', {className: 'card-content preview-body-container'}, html.title, data.body);
      }
      
      return h('article', {className: 'card'}, html.image, html.content);

    })));

  }
  
  return '';

}

    
    
var renderBanner = function (props, entryData) {
  
  if (entryData.banner) {
    
    var widgets = props.widgetsFor('banner');
    
    var data = {
      title:  widgets.getIn(['data', 'title']),
      image:  widgets.getIn(['data', 'image']),
      body:   widgets.getIn(['data', 'body'])
    }
    
    var html = {
      title: '',
      body: '',
      image: '',
      caption: ''
    }
    
    if (data.image) {
      var src = props.getAsset(data.image).toString();
      html.image = h('img', {className: 'cover parallax', src: src});
    }
  
    if (data.title) {
      html.title = h('h2', {className: 'caption-heading heading-medium'}, data.title);
    }
    
    if (data.body) {
      html.body = widgets.getIn(['widgets', 'body']);
    }
    
    if (html.body || html.title) {
      html.caption = h('figcaption', {className: 'caption center'}, html.title, data.body); 
    }
    
    if (html.image) {
      return h('figure', {className: 'banner flex flex-center height-half'}, html.image, html.caption);
    }
    
    return '';
      
  }

}



