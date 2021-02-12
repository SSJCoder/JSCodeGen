.priority: 100;

class oJSCodeGen {
	constructor(){
		let q = this;
		
		// types of items
		oJSCodeGen.KI_PREFIX = 0;
		oJSCodeGen.KI_POSFIX = 1;
		oJSCodeGen.KI_VALUE  = 2; // values are stored as strings .. {kind: KI_VALUE, str}
		oJSCodeGen.KI_METHOD = 3;
		oJSCodeGen.KI_CONOPR = 4;
		
		let opli = [
			['m_.', 'm_[]', 'm_()', 'm_?.'], 
			['p_new', 'p_!', 'p_~', 'p_+', 'p_-', 'p_++', 'p_--', 'p_typeof', 'p_void', 'p_delete', 'p_await'], 
			['++', '--'], 
			['**'], 
			['*', '/', '%'], 
			['+', '-'], 
			['<<', '>>', '>>>'], 
			['<', '<=', '>', '>=', 'in', 'instanceof'], 
			['==', '!=', '===', '!=='], 
			['&'], 
			['^'], 
			['|'], 
			['&&'], 
			['||'], 
			['??'], 
			['?', ':'], 
			['=', '+=', '-=', '**=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '^=', '|=', '&&=', '||=', '??='], 
			[',']
		];
		
		// create priority map
		let map = new Map();
		
		for (let i=0, e=opli.length; i<e; ++i) {
			let list = opli[i], 
				prio = e-i;
			for (let i=0, e=list.length; i<e; ++i) {
				map.set( list[i], prio );
			}
		}
		
		// store priority map
		q.PriorityMap = map;
		q.PriorityMax = opli.length;
	};
};

