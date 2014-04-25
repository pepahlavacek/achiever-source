Accounts.ui.config({
  requestPermissions: {
    facebook: ['email']
  }
});

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});