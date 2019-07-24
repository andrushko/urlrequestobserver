# urlrequestobserver

Allows you to subscribe for object's property updates and replicate them in url search string :)

Example of usage
```
  var obj = {
    sort_by: 'date',
    sort_order: 'asc'
  }

  UrlRequestObserver.run({
    req: obj,
    properties: ['sort_by', 'sort_order'],
    callback: function() {
      console.log('refresh')
    };
  });
```
