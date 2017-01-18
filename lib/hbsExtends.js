
exports.extend = function(){
  var hbs=require('hbs');
  //判断是否是偶数
  hbs.registerHelper('if_even', function(value, options) {
    console.log('value:', value); // value: 2
    console.log('this:', this); // this: Object {num: 2}
    console.log('fn(this):', options.fn(this)); // fn(this): 2是偶数
    if((value % 2) == 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  hbs.registerHelper( "compare", function( v1, op, v2, options ) {
    var c = {
      "eq": function( v1, v2 ) {
        return v1 == v2;
      },
      "neq": function( v1, v2 ) {
        return v1 != v2;
      }
    }
    if( Object.prototype.hasOwnProperty.call( c, op ) ) {
      return c[ op ].call( this, v1, v2 ) ? options.fn( this ) : options.inverse( this );
    }
      return options.inverse( this );
  });
  // 使用的时候就可以直接使用{{> userMessage}}将这个小块引入到页面中了。这里就是简单的局部替换
  hbs.registerPartial('userMessage',
     '<{{tagName}}>By {{author.firstName}} {{author.lastName}}</{{tagName}}>'
     + '<div class="body">{{body}}</div>'
  );
}