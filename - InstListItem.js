/*

'{}'       =>  list
'let'      =>  list
'if'       => {expr, inst}
'elif'     => {expr, inst}
'else'     => {inst}
'while'    => {expr, inst}
'continue' 
'break'    
'return'   =>  expr
'try'      => {inst}
'catch'    => {args, inst}
'throw'    =>  expr
'expr'     =>  expr

*/

{
	let map = new Map();
	
	// '{}' => list
	map.set( '{}', function (list) {
		let q = this;
		if ( list !== nil ) {
			return '{'+q.instList(list)+'}';
		} else {
			return '{}';
		}
	});
	
	// 'let' => list
	map.set( 'let', function (list) {
		let q = this;
		
		let str = 'let '+list[0];
		for (let i=1, e=list.length; i<e; i++) {
			str+=','+list[i];
		}
		
		return str;
	});
	
	// 'if' => {expr, inst}
	map.set( 'if', function (item) {
		let q = this;
		return 'if('+q.expr(item.expr)+')'+q.instSecure(item.inst);
	});
	
	// 'elif' => {expr, inst}
	map.set( 'elif', function (item) {
		let q = this;
		return 'else if('+q.expr(item.expr)+')'+q.instSecure(item.inst);
	});
	
	// 'else' => {inst}
	map.set( 'else', function (item) {
		let q = this;
		return 'else '+q.instSecure(item.inst);
	});
	
	// 'while' => {expr, inst}
	map.set( 'while', function (item) {
		let q = this;
		return 'while('+q.expr(item.expr)+')'+q.instSecure(item.inst);
	});
	
	// 'continue'
	map.set( 'continue', function (item) {
		return 'continue;';
	});
	
	// 'break'
	map.set( 'break', function (item) {
		return 'break;';
	});
	
	// 'return' => expr
	map.set( 'return', function (expr) {
		let q = this;
		return 'return '+q.expr(expr)+';';
	});
	
	// 'try' => {inst}
	map.set( 'try', function (item) {
		let q = this;
		return 'try '+q.instBk( item.inst );
	});
	
	// 'catch' => {args, inst}
	map.set( 'catch', function (item) {
		let q = this;
		return 'catch '+q.args(item.args)+q.instBk(item.inst);
	});
	
	// 'throw' => expr
	map.set( 'throw', function (expr) {
		let q = this;
		return 'throw '+q.expr(expr)+';';
	});
	
	// 'expr' => expr
	map.set( 'expr', function (expr) {
		let q = this;
		return q.expr(expr)+';';
	});
	
	// store map
	oJSCodeGen.prototype.iMap = map;
}

oJSCodeGen.prototype.iReqBlock = new Map([
	['{}',       false], 
	['let',      false], 
	['if',       true], 
	['elif',     true], 
	['else',     true], 
	['while',    true], 
	['continue', false], 
	['break',    false], 
	['return',   false], 
	['try',      true], 
	['catch',    true], 
	['throw',    false], 
	['expr',     false]
]);

