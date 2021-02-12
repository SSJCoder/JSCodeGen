/*

'm_.'   => name
'm_[]'  => expr
'm_()'  => expr
'mJ_?.' => name

*/

// .meth (type, item);
oJSCodeGen.prototype.meth = function (type, item) {
	let q = this;
	
	let fn = q.mMap.get( type );
	if ( fn ) {
		return fn.call( q, item );
	} else {
		prt( item ); throw 'oJSCodeGen :: unknown method type';
	}
};

{
	let map = new Map();
	
	map.set( 'm_.', function (name) {
		return '.'+name;
	});
	
	map.set( 'm_[]', function (expr) {
		let q = this;
		return '['+q.expr(expr)+']';
	});
	
	map.set( 'm_()', function (expr) {
		let q = this;
		if ( expr !== nil ) {
			return '('+q.expr(expr)+')';
		} else {
			return '()';
		}
	});
	
	map.set( 'm_?.', function (name) {
		return '?.'+name;
	});
	
	// store methods map
	oJSCodeGen.prototype.mMap = map;
}

