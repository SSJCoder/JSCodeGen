// .args (arguments);
oJSCodeGen.prototype.args = function (args) {
	let q = this;
	
	let str = '';
	if ( args !== nil ) {
		str = args[0];
		for (let i=1, e=args.length; i<e; i++) {
			str+=','+args[i];
		}
	}
	
	return str;
	
};

// .fn (arguments, instruction-list);
oJSCodeGen.prototype.fn = function (args, list) {
	let q = this;
	return 'function('+args( args )+')'+q.instBk( list );
};

// .instBk (instruction);
oJSCodeGen.prototype.instBk = function (inst) {
	let q = this;
	
	if ( inst.type !== '{}' ) {
		return '{'+q.inst(inst)+'}';
	} else {
		return q.inst(inst);
	}
	
};

// .inst (instruction);
oJSCodeGen.prototype.inst = function (inst) {
	let q = this;
	
	let fn = q.iMap.get( inst.type );
	if ( fn ) {
		return fn.call( q, inst );
	} else {
		prt( inst ); throw 'oJSCodeGen :: unknown instruction type';
	}
};

// .instSecure (instruction);
oJSCodeGen.prototype.instSecure = function (inst) {
	let q = this;
	
	// convert to block if necessary
	if ( q.iReqBlock.get( inst.type ) ) {
		inst = {type: '{}', item: [inst]};
	}
	
	return q.inst( inst );
};

// .instList (instructions-list);
oJSCodeGen.prototype.instList = function (list) {
	let q = this;
	
	let str = '';
	for (let i=0, e=list.length; i<e; i++) {
		str+=q.inst(list[i]);
	}
	
	return str;
};

