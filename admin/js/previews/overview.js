var overviewPreview = createClass({

  render: function() {
  
    var props = this.props;
    var entry = props.entry;

    var data = {
      layout:        entry.getIn(['data', 'layout']),
      header_title:  entry.getIn(['data', 'header_title']),
      body:          entry.getIn(['data', 'body'])
    };

    var html = [
      renderHeader(props, data),
      renderIntro(props, data)
    ]

    return h('div', {}, html);
  
  }
  
});



var renderIntro = function(props, data) {
  
  var text = {
    posts: 'Overzicht van alle nieuwsberichten',
    products: 'Overzicht van het aanbod'
  }
  
  var html = {
    body: '',
    overview: renderPreview('overview', text[data.layout])
  }
  
  if (data.body) {
    html.body = props.widgetFor('body');
  }


  return h('article', {className: 'center wrap wrap-top'}, html.body, html.overview);

}
