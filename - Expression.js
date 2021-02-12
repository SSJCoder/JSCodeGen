/*

  pre-fix node: {kind: oJSCodeGen.KI_PREFIX, type, node}
 post-fix node: {kind: oJSCodeGen.KI_POSFIX, type, node}
    value node: {kind: oJSCodeGen.KI_VALUE,  type, str}
   method node: {kind: oJSCodeGen.KI_METHOD, type, node, item}
connector node: {kind: oJSCodeGen.KI_CONOPR, type, lNode, rNode}

*/

// node processing functions ..
oJSCodeGen.prototype.NodeProcFuncs = [
	function (node) {
		// oJSCodeGen.KI_PREFIX = 0;
		// node {type, node}
		let q = this;
		
		let type = node.type, 
			prio = q.PriorityMap.get( type ), 
			prex = q.exprNode( node.node ), 
			 pfx = type.substring( 2, type.length );
		
		if ( prio > prex.prio ) {
			// nest item
			prex.str = '('+prex.str+')';
		}
		
		// update priority
		prex.prio = prio;
		
		// add pre-fix
		if ( q.IsNameChar( pfx[pfx.length-1] ) ) {
			// space out pre-fixes ending with a name/number character
			prex.str = pfx+' '+prex.str;
		} else {
			prex.str = pfx+prex.str;
		}
		
		return prex;
		
	}, function (node) {
		// oJSCodeGen.KI_POSFIX
		// node {type, node}
		let q = this;
		
		let type = node.type, 
			prio = q.PriorityMap.get( type ), 
			prex = q.exprNode( node.node ), 
			posf = type;
		
		if ( prio > prex.prio ) {
			// nest item
			prex.str = '('+prex.str+')';
		}
		
		// update priority
		prex.prio = prio;
		
		// add post-fix
		prex.str = prex.str+posf;
		
		return prex;
		
	}, function (node) {
		// oJSCodeGen.KI_VALUE
		// node {str}
		let q = this;
		return {prio: q.PriorityMax, str: node.str};
	}, function (node) {
		// oJSCodeGen.KI_METHOD
		// node {type, node, item}
		let q = this; prt( 'METHOD', node );
		
		let type = node.type, 
			prio = q.PriorityMap.get( type ), 
			prex = q.exprNode( node.node );
		
		if ( prio > prex.prio ) {
			// nest item
			prex.str = '('+prex.str+')';
		}
		
		// update priority
		prex.prio = prio;
		
		// add method
		prex.str = prex.str+q.meth( type, node.item );
		return prex;
		
	}, function (node) {
		// oJSCodeGen.KI_CONOPR
		// node {type, lNode, rNode}
		let q = this;
		
		let type = node.type, 
			prio = q.PriorityMap.get( type ), 
		   lPrex = q.exprNode( node.lNode ), 
		   rPrex = q.exprNode( node.rNode ), 
		   lPrio = lPrex.prio, 
		   rPrio = rPrex.prio, 
		    lstr = lPrex.str, 
			rstr = rPrex.str, 
		    newp = prio; // new priority
		
		if ( prio > lPrio ) {
			// nest left item
			lstr = '('+lstr+')';
		} else {
			// update priority
			if ( lPrio < newp ) {
				newp = lPrio;
			}
		}
		
		if ( prio >= rPrio ) {
			// nest right item
			rstr = '('+rstr+')';
		} else {
			// update priority
			if ( rPrio < newp ) {
				newp = rPrio;
			}
		}
		
		// space operator if numeric/letter character
		if ( q.IsNameChar( type[0] ) ) type=' '+type;
		if ( q.IsNameChar( type[type.length-1] ) ) type+=' ';
		
		// host in left expression (dump right)
		lPrex.prio = newp;
		lPrex.str  = lstr+type+rstr;
		return lPrex;
		
	}
];

// .exprNode (node);
oJSCodeGen.prototype.exprNode = function (node) {
	let q = this;
	return q.NodeProcFuncs[node.kind].call( q, node );
};

// .expr (root-node);
oJSCodeGen.prototype.expr = function (node) {
	let q = this;
	return q.exprNode(node).str;
};

// .IsNameChar (character);
oJSCodeGen.prototype.IsNameChar = function (c) {
	let stx = c.stx( 0 );
	if ( stx >= 0x1 && stx <= 0x3F ) {
		return true;
	} else {
		return false;
	}
};

/*

TEST!!!!

{
	let gen = new oJSCodeGen();
	
	let newp = function (type, node) {
		return {kind: oJSCodeGen.KI_PREFIX, type: 'p_'+type, node: node};
	};
	
	let news = function (type, node) {
		return {kind: oJSCodeGen.KI_POSFIX, type: type, node: node};
	};
	
	let newv = function (str) {
		return {kind: oJSCodeGen.KI_VALUE, str: str};
	};
	
	let newm = function (type, node, item) {
		return {kind: oJSCodeGen.KI_METHOD, type: 'm_'+type, node: node, item: item};
	};
	
	let newc = function (type, lNode, rNode) {
		return {kind: oJSCodeGen.KI_CONOPR, type: type, lNode: lNode, rNode: rNode};
	};
	
	// build tree
	//let node = newc( '+', newv('1'), newc( '*', newv('2.12'), newc( '*', newv('-3'), newv('1') ) ) );
	//let node = news( '++', newv('a') );
	//let node = newp( '++', newv('a') );
	//let node = newc( '=', newc( '=', newv('a2'), newv('c') ), newv('c2') );
	//let node = 
	let node = newp( 'new', newm( '()', newv('apple'), nil ) );
	
	prt( gen.expr(node) );
}

*/

