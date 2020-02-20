var renderHeader = function(props, data) {
  
  var size = (data.header_image && data.header_title && data.header_body) ? 'huge' : (data.header_image) ? 'medium' : 'small';
  
  var classes = {
    header: 'header header-' + size,
    logo: (size == 'small') ? 'logo logo-small' : 'logo logo-large',
    image: 'parallax header-image-' + size
  }
  
  var html = {
    logo: h('a', {className: classes.logo}, h('img', {src: '/assets/logo.svg'})),
    image: '',
    title: '',
    body: '',
    content: '',
    caption: ''
  }
  
  if (data.header_body) {
    html.body = props.widgetFor('header_body');
  }
  
  if (data.header_title && html.body) {
    html.caption = h('div', {className: 'center draw header-caption line-after preview-body-container'}, h('h1', {className: 'heading-large'}, data.header_title), html.body);
  } else if (data.header_title) {
    html.title = h('h1', {className: 'center heading-huge line-after topic'}, data.header_title);
  }
  
  if (data.header_image) {
    var src = props.getAsset(data.header_image).toString() ;
    html.image = h('img', {className: classes.image, src: src});
    html.content = h('div', {className: 'flex flex-center header-content'}, h('div', {className: 'header-logo'}, html.logo), html.caption);
    return h('header', {className: classes.header}, html.image, html.content);
  }
  
  return h('header', {className: classes.header}, html.logo, html.title);

}
