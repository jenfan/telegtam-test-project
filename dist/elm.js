(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.at.S === region.aB.S)
	{
		return 'on line ' + region.at.S;
	}
	return 'on lines ' + region.at.S + ' through ' + region.aB.S;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bu,
		impl.b1,
		impl.bX,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		y: func(record.y),
		au: record.au,
		as: record.as
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.y;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.au;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.as) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bu,
		impl.b1,
		impl.bX,
		function(sendToApp, initialModel) {
			var view = impl.b3;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bu,
		impl.b1,
		impl.bX,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.T && impl.T(sendToApp)
			var view = impl.b3;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.a6);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.f) && (_VirtualDom_doc.title = title = doc.f);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bH;
	var onUrlRequest = impl.bI;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		T: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.aT === next.aT
							&& curr.aE === next.aE
							&& curr.aQ.a === next.aQ.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		bu: function(flags)
		{
			return A3(impl.bu, flags, _Browser_getUrl(), key);
		},
		b3: impl.b3,
		b1: impl.b1,
		bX: impl.bX
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { br: 'hidden', a8: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { br: 'mozHidden', a8: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { br: 'msHidden', a8: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { br: 'webkitHidden', a8: 'webkitvisibilitychange' }
		: { br: 'hidden', a8: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aZ: _Browser_getScene(),
		a2: {
			O: _Browser_window.pageXOffset,
			i: _Browser_window.pageYOffset,
			aj: _Browser_doc.documentElement.clientWidth,
			I: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aj: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		I: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aZ: {
				aj: node.scrollWidth,
				I: node.scrollHeight
			},
			a2: {
				O: node.scrollLeft,
				i: node.scrollTop,
				aj: node.clientWidth,
				I: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aZ: _Browser_getScene(),
			a2: {
				O: x,
				i: y,
				aj: _Browser_doc.documentElement.clientWidth,
				I: _Browser_doc.documentElement.clientHeight
			},
			bi: {
				O: x + rect.left,
				i: y + rect.top,
				aj: rect.width,
				I: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$round = _Basics_round;
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var author$project$Charts$frameSize = function (size) {
	return A2(
		elm$core$Tuple$mapSecond,
		function (y) {
			return elm$core$Basics$round(y * 0.5);
		},
		size);
};
var author$project$Charts$mapSize = function (size) {
	return A2(
		elm$core$Tuple$mapSecond,
		function (y) {
			return elm$core$Basics$round(y * 5.5e-2);
		},
		size);
};
var author$project$Data$charts = _List_fromArray(
	[
		{
		O: _List_fromArray(
			[1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000]),
		P: _List_fromArray(
			[
				{
				e: '#3DC23F',
				x: 0,
				f: '#0',
				i: _List_fromArray(
					[37, 20, 32, 39, 32, 35, 19, 65, 36, 62, 113, 69, 120, 60, 51, 49, 71, 122, 149, 69, 57, 21, 33, 55, 92, 62, 47, 50, 56, 116, 63, 60, 55, 65, 76, 33, 45, 64, 54, 81, 180, 123, 106, 37, 60, 70, 46, 68, 46, 51, 33, 57, 75, 70, 95, 70, 50, 68, 63, 66, 53, 38, 52, 109, 121, 53, 36, 71, 96, 55, 58, 29, 31, 55, 52, 44, 126, 191, 73, 87, 255, 278, 219, 170, 129, 125, 126, 84, 65, 53, 154, 57, 71, 64, 75, 72, 39, 47, 52, 73, 89, 156, 86, 105, 88, 45, 33, 56, 142, 124, 114, 64])
			},
				{
				e: '#F34C44',
				x: 1,
				f: '#1',
				i: _List_fromArray(
					[22, 12, 30, 40, 33, 23, 18, 41, 45, 69, 57, 61, 70, 47, 31, 34, 40, 55, 27, 57, 48, 32, 40, 49, 54, 49, 34, 51, 51, 51, 66, 51, 94, 60, 64, 28, 44, 96, 49, 73, 30, 88, 63, 42, 56, 67, 52, 67, 35, 61, 40, 55, 63, 61, 105, 59, 51, 76, 63, 57, 47, 56, 51, 98, 103, 62, 54, 104, 48, 41, 41, 37, 30, 28, 26, 37, 65, 86, 70, 81, 54, 74, 70, 50, 74, 79, 85, 62, 36, 46, 68, 43, 66, 50, 28, 66, 39, 23, 63, 74, 83, 66, 40, 60, 29, 36, 27, 54, 89, 50, 73, 52])
			}
			])
	},
		{
		O: _List_fromArray(
			[1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000]),
		P: _List_fromArray(
			[
				{
				e: '#3DC23F',
				x: 0,
				f: '#0',
				i: _List_fromArray(
					[6706, 7579, 7798, 8307, 7866, 7736, 7816, 7630, 7536, 7105, 7178, 7619, 7917, 7483, 5772, 5700, 5435, 4837, 4716, 4890, 4753, 4820, 4538, 12162, 39444, 25765, 18012, 14421, 13249, 11310, 10377, 9399, 8917, 8259, 7902, 9442, 47596, 36160, 23866, 18500, 15488, 13722, 12270, 13413, 10574, 7092, 7159, 7880, 8821, 8306, 7780, 7963, 7837, 7611, 7334, 7413, 7015, 6742, 6557, 6593, 6680, 6725, 6345, 5988, 6365, 9911, 28833, 19694, 14873, 11911, 10498, 9708, 8893, 8365, 7960, 7694, 45529, 42858, 31508, 23289, 19147, 15874, 14551, 13124, 11778, 10809, 10522, 9918, 9436, 8617, 8765, 8194, 8035, 7865, 7573, 7422, 7047, 7147, 6861, 6669, 6363, 12073, 32381, 21390, 15311, 12819, 11655, 10696, 9678, 9143, 8296, 7852])
			},
				{
				e: '#F34C44',
				x: 1,
				f: '#1',
				i: _List_fromArray(
					[3522, 4088, 4146, 4477, 4202, 4157, 4177, 4203, 4223, 3948, 3946, 3898, 3979, 4052, 3279, 3229, 3302, 3040, 3054, 2982, 3077, 2965, 2973, 5148, 22485, 13077, 9055, 7446, 6824, 5995, 5787, 5367, 4997, 4689, 4630, 4785, 22365, 15244, 10626, 8666, 7681, 6929, 6219, 6367, 5402, 4932, 4844, 5146, 5265, 4887, 4714, 4722, 4718, 4693, 4746, 4819, 4455, 4419, 4323, 4407, 4277, 11589, 6100, 5076, 4769, 8929, 14002, 9756, 7520, 6343, 5633, 5415, 5052, 4850, 4624, 4480, 14102, 24005, 14263, 10845, 9028, 7755, 7197, 7001, 6737, 6254, 6150, 5922, 5603, 5048, 5423, 5003, 5035, 4747, 4814, 4661, 4462, 4516, 4221, 4111, 4053, 12515, 15781, 10499, 8175, 6831, 6287, 5990, 5590, 5148, 4760, 4809])
			}
			])
	},
		{
		O: _List_fromArray(
			[1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000]),
		P: _List_fromArray(
			[
				{
				e: '#3DC23F',
				x: 0,
				f: '#0',
				i: _List_fromArray(
					[4747, 4849, 5045, 5184, 5746, 5400, 5424, 5576, 6436, 5337, 4840, 5379, 4678, 4736, 5074, 4897, 4349, 5089, 4543, 5033, 5047, 4871, 4812, 4723, 4545, 4723, 4721, 4384, 4277, 4682, 4805, 4001, 4610, 5241, 5113, 4059, 4529, 4673, 5291, 5154, 5123, 5535, 5540, 5161, 5666, 5584, 6999, 6854, 5083, 5361, 5863, 5792, 5586, 6106, 5481, 5532, 5853, 5809, 6244, 6156, 5596, 5426, 5422, 5413, 4795, 5113, 5279, 5530, 4939, 4983, 4984, 5527, 5765, 5001, 5818, 6061, 5956, 5288, 5837, 5703, 5440, 5238, 5957, 6432, 6389, 6064, 7065, 5981, 5779, 6567, 6320, 5634, 6023, 5702, 6066, 5797, 6163, 6182, 4906, 5637, 7073, 6679, 5831, 6015, 6266, 6128, 6156, 6218, 6050, 6140, 5877, 7147])
			},
				{
				e: '#F34C44',
				x: 1,
				f: '#1',
				i: _List_fromArray(
					[4605, 5036, 4956, 5168, 5008, 5069, 5223, 5360, 5695, 5209, 4796, 5028, 4931, 5123, 4987, 4964, 4982, 5037, 5050, 5144, 5049, 4971, 4911, 4792, 4562, 4597, 4759, 4761, 4646, 4543, 4597, 4428, 4213, 4270, 3961, 4784, 4699, 4711, 4855, 4717, 4563, 4923, 5041, 4895, 4877, 5001, 5410, 5033, 5045, 5184, 4976, 5207, 5354, 5205, 4887, 4831, 5083, 5148, 5369, 5176, 5022, 4880, 4969, 5135, 4836, 4764, 4782, 4783, 4646, 4755, 4744, 4932, 5059, 4851, 4614, 4718, 5018, 5034, 5223, 5007, 4839, 4763, 4761, 5048, 5330, 5106, 5956, 5135, 5006, 4919, 5511, 5114, 5122, 5314, 5089, 5022, 4918, 4986, 4626, 4675, 4951, 4921, 5173, 5145, 5209, 4967, 5030, 5120, 5030, 4946, 4795, 5224])
			}
			])
	},
		{
		O: _List_fromArray(
			[1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000]),
		P: _List_fromArray(
			[
				{
				e: '#3DC23F',
				x: 0,
				f: '#0',
				i: _List_fromArray(
					[41, 31, 62, 65, 66, 79, 52, 26, 42, 68, 71, 86, 65, 54, 33, 70, 52, 68, 75, 92, 69, 28, 33, 84, 65, 56, 42, 44, 26, 34, 45, 49, 83, 83, 66, 31, 43, 55, 57, 55, 54, 45, 51, 64, 27, 19, 38, 38, 44, 49, 42, 50, 60, 73, 86, 65, 51, 54, 48, 61, 82, 83, 53, 52, 48, 64, 96, 103, 68, 73, 58, 42, 81, 80, 76, 106, 93, 65, 69, 104, 75, 79, 92, 73, 49, 63, 76, 79, 83, 70, 55, 47, 42, 111, 93, 74, 99, 107, 52, 65, 80, 82, 74, 154, 106, 39, 40, 77, 85, 66, 52, 25])
			},
				{
				e: '#F34C44',
				x: 1,
				f: '#1',
				i: _List_fromArray(
					[19, 10, 36, 41, 28, 39, 24, 16, 14, 40, 39, 37, 47, 28, 16, 32, 25, 29, 36, 45, 38, 11, 25, 37, 35, 22, 25, 30, 16, 20, 32, 34, 37, 26, 31, 10, 19, 32, 34, 23, 25, 22, 21, 18, 11, 18, 18, 23, 11, 18, 22, 19, 27, 27, 30, 25, 27, 23, 28, 30, 23, 31, 27, 16, 30, 21, 36, 33, 25, 34, 16, 24, 37, 33, 26, 24, 31, 21, 37, 32, 35, 31, 30, 27, 15, 17, 38, 40, 32, 34, 30, 17, 21, 28, 36, 30, 24, 25, 20, 24, 22, 42, 34, 47, 40, 29, 29, 31, 39, 30, 29, 18])
			}
			])
	},
		{
		O: _List_fromArray(
			[1520035200000, 1520121600000, 1520208000000, 1520294400000, 1520380800000, 1520467200000, 1520553600000, 1520640000000, 1520726400000, 1520812800000, 1520899200000, 1520985600000, 1521072000000, 1521158400000, 1521244800000, 1521331200000, 1521417600000, 1521504000000, 1521590400000, 1521676800000, 1521763200000, 1521849600000, 1521936000000, 1522022400000, 1522108800000, 1522195200000, 1522281600000, 1522368000000, 1522454400000, 1522540800000, 1522627200000, 1522713600000, 1522800000000, 1522886400000, 1522972800000, 1523059200000, 1523145600000, 1523232000000, 1523318400000, 1523404800000, 1523491200000, 1523577600000, 1523664000000, 1523750400000, 1523836800000, 1523923200000, 1524009600000, 1524096000000, 1524182400000, 1524268800000, 1524355200000, 1524441600000, 1524528000000, 1524614400000, 1524700800000, 1524787200000, 1524873600000, 1524960000000, 1525046400000, 1525132800000, 1525219200000, 1525305600000, 1525392000000, 1525478400000, 1525564800000, 1525651200000, 1525737600000, 1525824000000, 1525910400000, 1525996800000, 1526083200000, 1526169600000, 1526256000000, 1526342400000, 1526428800000, 1526515200000, 1526601600000, 1526688000000, 1526774400000, 1526860800000, 1526947200000, 1527033600000, 1527120000000, 1527206400000, 1527292800000, 1527379200000, 1527465600000, 1527552000000, 1527638400000, 1527724800000, 1527811200000, 1527897600000, 1527984000000, 1528070400000, 1528156800000, 1528243200000, 1528329600000, 1528416000000, 1528502400000, 1528588800000, 1528675200000, 1528761600000, 1528848000000, 1528934400000, 1529020800000, 1529107200000, 1529193600000, 1529280000000, 1529366400000, 1529452800000, 1529539200000, 1529625600000, 1529712000000, 1529798400000, 1529884800000, 1529971200000, 1530057600000, 1530144000000, 1530230400000, 1530316800000, 1530403200000, 1530489600000, 1530576000000, 1530662400000, 1530748800000, 1530835200000, 1530921600000, 1531008000000, 1531094400000, 1531180800000, 1531267200000, 1531353600000, 1531440000000, 1531526400000, 1531612800000, 1531699200000, 1531785600000, 1531872000000, 1531958400000, 1532044800000, 1532131200000, 1532217600000, 1532304000000, 1532390400000, 1532476800000, 1532563200000, 1532649600000, 1532736000000, 1532822400000, 1532908800000, 1532995200000, 1533081600000, 1533168000000, 1533254400000, 1533340800000, 1533427200000, 1533513600000, 1533600000000, 1533686400000, 1533772800000, 1533859200000, 1533945600000, 1534032000000, 1534118400000, 1534204800000, 1534291200000, 1534377600000, 1534464000000, 1534550400000, 1534636800000, 1534723200000, 1534809600000, 1534896000000, 1534982400000, 1535068800000, 1535155200000, 1535241600000, 1535328000000, 1535414400000, 1535500800000, 1535587200000, 1535673600000, 1535760000000, 1535846400000, 1535932800000, 1536019200000, 1536105600000, 1536192000000, 1536278400000, 1536364800000, 1536451200000, 1536537600000, 1536624000000, 1536710400000, 1536796800000, 1536883200000, 1536969600000, 1537056000000, 1537142400000, 1537228800000, 1537315200000, 1537401600000, 1537488000000, 1537574400000, 1537660800000, 1537747200000, 1537833600000, 1537920000000, 1538006400000, 1538092800000, 1538179200000, 1538265600000, 1538352000000, 1538438400000, 1538524800000, 1538611200000, 1538697600000, 1538784000000, 1538870400000, 1538956800000, 1539043200000, 1539129600000, 1539216000000, 1539302400000, 1539388800000, 1539475200000, 1539561600000, 1539648000000, 1539734400000, 1539820800000, 1539907200000, 1539993600000, 1540080000000, 1540166400000, 1540252800000, 1540339200000, 1540425600000, 1540512000000, 1540598400000, 1540684800000, 1540771200000, 1540857600000, 1540944000000, 1541030400000, 1541116800000, 1541203200000, 1541289600000, 1541376000000, 1541462400000, 1541548800000, 1541635200000, 1541721600000, 1541808000000, 1541894400000, 1541980800000, 1542067200000, 1542153600000, 1542240000000, 1542326400000, 1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000, 1552089600000]),
		P: _List_fromArray(
			[
				{
				e: '#cb513a',
				x: 0,
				f: '#0',
				i: _List_fromArray(
					[2298660, 2253410, 2515820, 2506600, 2460240, 2408400, 2317430, 2240100, 2295900, 2609800, 2594200, 2626400, 2615000, 2617800, 2394500, 2391100, 2608300, 2676000, 2637700, 2766600, 3186500, 3067700, 2570700, 2935000, 2949200, 2913500, 2763600, 3216300, 2343500, 2361000, 2580000, 2591800, 2595200, 2569500, 2587700, 2372500, 2351200, 2465600, 2625100, 2651300, 2686700, 2783300, 2417400, 2383800, 2736300, 2751100, 2678900, 2622300, 2586000, 2365700, 2407700, 2541300, 2600400, 2581500, 2576200, 2550100, 2334500, 2139400, 2015400, 2019900, 2210100, 2191800, 2240700, 2107400, 2026900, 2258000, 2255200, 2123200, 2267800, 2236100, 2065700, 2093300, 2315300, 2333200, 2349800, 2318300, 2275000, 2110300, 2077100, 2335200, 2357400, 2350000, 2293800, 2303600, 2118700, 2100300, 2219700, 2361100, 2349500, 2347800, 2318400, 2141600, 2178600, 2432500, 2448700, 2440300, 2450100, 2424100, 2229900, 2152400, 2402600, 2401000, 2418100, 2408600, 2408400, 2212600, 2189000, 2450800, 2444500, 2451900, 2451000, 2442600, 2287900, 2221100, 2451900, 2460200, 2460900, 2319900, 2270300, 2183800, 2195300, 2485000, 2460900, 2500600, 2495300, 2479100, 2290600, 2235800, 2459900, 2484500, 2491000, 2525600, 2477300, 2223700, 2146700, 2528200, 2567800, 2556300, 2540700, 2503000, 2301200, 2251600, 2538600, 2596500, 2553900, 2534200, 2527300, 2337400, 2332900, 2688500, 2585700, 2559600, 2651600, 2586800, 2445700, 2472300, 2633000, 2664600, 2649400, 2648900, 2644600, 2406400, 2426200, 2694000, 2740600, 2711800, 2700900, 2645800, 2422800, 2438500, 2697500, 2712500, 2690300, 2684400, 2517300, 2435300, 2444300, 2781800, 2807800, 2804500, 2771300, 2798800, 2633300, 2597100, 2946300, 2889800, 2949600, 2951400, 2928800, 2701400, 2709900, 3012900, 3019100, 2977200, 3012400, 2989800, 2752100, 2749100, 3033300, 3050400, 3023800, 3066400, 3047800, 2792200, 2799300, 3096100, 3132500, 3082400, 3071200, 3021400, 2818300, 2737500, 3037800, 3123700, 3138900, 3181800, 3118500, 2834500, 2826900, 3171000, 3175900, 3184300, 3195800, 3129100, 2834100, 2876800, 3019000, 3214000, 3227900, 3189600, 3187800, 2886800, 2880500, 3218200, 3253700, 3260400, 3243300, 3204000, 2962700, 2968600, 3282100, 3618900, 3017000, 3037300, 3044500, 2758900, 2784600, 3032900, 3132400, 3075800, 3108200, 3076200, 2851800, 2837800, 3107500, 3146800, 3145100, 3145300, 3158400, 2872100, 2823800, 3190400, 3209300, 3170800, 3195300, 3183000, 2910300, 2937400, 3297100, 3293600, 3278400, 3234200, 3224000, 3013900, 2955300, 3303900, 3323300, 3352600, 3348400, 3340600, 3110600, 3066400, 3409200, 3462100, 3394200, 3383100, 3433700, 3184000, 3092700, 3417400, 4505200, 3094500, 3106100, 3083200, 3005600, 2866700, 2984100, 2954200, 3086800, 3070500, 3040900, 2903500, 3592500, 3316200, 2930500, 2961900, 3009600, 3027200, 2871600, 2831600, 2881700, 3054200, 3116600, 3120800, 3157300, 2950700, 2982700, 3192800, 3223300, 3219500, 3235900, 3214100, 3004400, 2963500, 3280400, 3262400, 3256000, 3258400, 3264900, 3107500, 3057400, 3326600, 3332400, 3357000, 3365100, 3359500, 3127400, 3130200, 3367100, 3422700, 3436400, 3431100, 3600000, 3146100, 3170900, 3467300, 3483400, 3473600, 3454700, 3390200, 3213600, 3188800, 3498200, 3498600, 3493500, 3478900, 3446400, 3239200, 3229100, 3559600, 3563600, 3549800, 3577300, 3524400, 3282500, 3271300, 3599200, 3575200, 3554400, 3540300, 3450600, 2812000])
			},
				{
				e: '#73c03a',
				x: 1,
				f: '#1',
				i: _List_fromArray(
					[1130400, 1065370, 1211030, 1215590, 1206540, 1206720, 1085450, 1047320, 1071720, 1253170, 1261050, 1264660, 1260240, 1264840, 1130440, 1121660, 1294120, 1290780, 1284540, 1302860, 1296810, 1165450, 1128830, 1302070, 1304470, 1307090, 1268000, 1302160, 1159330, 1163530, 1327140, 1320680, 1319200, 1306810, 1287990, 1121240, 1145070, 1132400, 1310310, 1329340, 1340060, 1333530, 1167040, 1153260, 1356930, 1366500, 1375970, 1378570, 1357460, 1192240, 1188650, 1386450, 1400570, 1395730, 1404160, 1378120, 1195410, 1082000, 1189660, 1197540, 1367850, 1389070, 1386300, 1282240, 1209450, 1409070, 1409450, 1271120, 1424860, 1399990, 1240640, 1248530, 1451770, 1460240, 1466100, 1460990, 1446730, 1268830, 1263270, 1473530, 1476230, 1480760, 1460520, 1454730, 1263910, 1227240, 1303900, 1474760, 1473400, 1477380, 1466790, 1285620, 1280100, 1491820, 1499660, 1496260, 1485990, 1473140, 1301290, 1273440, 1487420, 1494560, 1500790, 1508660, 1489400, 1301960, 1297680, 1501170, 1503000, 1488980, 1501170, 1479060, 1367980, 1296050, 1493920, 1487830, 1479120, 1338410, 1318550, 1266620, 1285640, 1487970, 1489080, 1489580, 1475400, 1471140, 1316010, 1271940, 1476160, 1480670, 1491030, 1480940, 1477640, 1305750, 1296770, 1483400, 1494440, 1495740, 1485900, 1484400, 1319160, 1284010, 1488140, 1502910, 1503450, 1485410, 1498200, 1323200, 1303150, 1506840, 1523440, 1521490, 1516770, 1504300, 1327520, 1307630, 1518100, 1521370, 1521280, 1521660, 1517700, 1349880, 1333010, 1543800, 1553730, 1546490, 1541710, 1532690, 1367020, 1354040, 1560080, 1564990, 1565050, 1561110, 1406570, 1340850, 1368550, 1600180, 1630760, 1621360, 1636580, 1652580, 1489550, 1465750, 1731080, 1730190, 1732260, 1730210, 1724800, 1519480, 1520490, 1758280, 1774530, 1770690, 1781100, 1762270, 1551690, 1541620, 1787290, 1795490, 1802940, 1799130, 1778850, 1560040, 1564580, 1822410, 1819680, 1812390, 1814100, 1798060, 1587880, 1589320, 1833920, 1843420, 1851460, 1845550, 1822980, 1596860, 1595900, 1866000, 1860480, 1862600, 1863950, 1827540, 1585280, 1588970, 1683930, 1879500, 1883300, 1879040, 1846160, 1639090, 1632580, 1895780, 1897620, 1906000, 1906730, 1895290, 1670120, 1670190, 1914360, 1932890, 1933160, 1921800, 1898720, 1673530, 1685190, 1937730, 1951850, 1949900, 1949020, 1923160, 1718450, 1704040, 1964800, 1975140, 2002510, 1985340, 1959000, 1736810, 1727670, 2006070, 2013910, 2012460, 1999630, 1977020, 1754720, 1778560, 2060360, 2057730, 2055990, 2036720, 2027870, 1824680, 1794140, 2067460, 2078290, 2094100, 2080950, 2062080, 1836850, 1828130, 2102920, 2112450, 2098790, 2116900, 2080290, 1863760, 1841050, 2105790, 2106420, 2151300, 2098890, 2085380, 1955580, 1819790, 1916140, 1913670, 2080350, 2058160, 2034960, 1911480, 1823940, 2087990, 1774260, 1833950, 1906680, 1902490, 1760460, 1748060, 1775740, 1974730, 2013790, 2026250, 2022210, 1835820, 1835930, 2096230, 2098020, 2095770, 2114060, 2099370, 1902800, 1854380, 2132520, 2143600, 2146120, 2143820, 2157910, 1929390, 1905550, 2183760, 2185970, 2198030, 2198160, 2182120, 1950150, 1931800, 2215380, 2216240, 2226480, 2220480, 2208790, 1972190, 1957520, 2253470, 2247170, 2245720, 2285890, 2220730, 1986340, 1967720, 2264340, 2270140, 2267210, 2268950, 2246450, 2048760, 1994100, 2288680, 2296010, 2313730, 2311290, 2293790, 2034250, 2025380, 2326190, 2323990, 2320790, 2271600, 2244270, 1663290])
			},
				{
				e: '#65b9ac',
				x: 2,
				f: '#2',
				i: _List_fromArray(
					[820900, 766050, 894390, 894540, 887590, 814490, 786610, 744660, 770920, 930330, 930190, 942060, 933690, 922280, 810770, 809760, 952010, 959070, 957020, 955890, 948250, 825710, 804970, 958480, 959090, 970200, 907010, 950150, 825240, 820890, 971020, 973560, 967940, 960360, 931820, 795020, 753860, 808740, 970000, 981020, 979810, 975840, 829690, 819300, 992290, 998040, 1006540, 1013790, 995130, 848190, 851890, 1024210, 1032210, 1032290, 1027510, 1010090, 850110, 741740, 844400, 850410, 1006690, 1018470, 1011630, 916990, 861050, 1039650, 1032640, 904200, 1045560, 1022330, 888970, 896300, 1073460, 1074860, 1074820, 1074880, 1057340, 909410, 906710, 1078860, 1092760, 1083360, 1078680, 1067310, 903090, 858360, 947540, 1089590, 1095060, 1093130, 1070660, 915380, 916530, 1108410, 1109460, 1097230, 1094520, 1074630, 915520, 915750, 1101730, 1104580, 1107930, 1116850, 1106360, 928500, 928210, 1110530, 1103230, 1099970, 1106180, 1096060, 982050, 932620, 1100880, 1099970, 1080040, 959480, 951360, 902160, 916070, 1094120, 1092530, 1089290, 1081760, 1073320, 937320, 900010, 1084910, 1082620, 1080960, 1074050, 1077810, 925090, 913970, 1082900, 1089240, 1088890, 1088720, 1084170, 938750, 904060, 1091540, 1093660, 1104520, 1085860, 1091880, 939720, 919790, 1098590, 1110310, 1105580, 1105220, 1096580, 940670, 923480, 1102360, 1102760, 1102280, 1108680, 1109210, 955490, 944730, 1125380, 1127440, 1123070, 1123910, 1121160, 966340, 946940, 1141980, 1146790, 1147420, 1132920, 990870, 946370, 964610, 1171550, 1187000, 1186370, 1199100, 1213000, 1062280, 1035740, 1274070, 1276740, 1280670, 1282770, 1257200, 1085370, 1080510, 1293120, 1308880, 1302170, 1317570, 1298110, 1111780, 1106410, 1317620, 1318010, 1332680, 1328530, 1305330, 1113540, 1119830, 1340410, 1348770, 1346910, 1352950, 1324040, 1139450, 1136680, 1355970, 1364950, 1377510, 1375770, 1338490, 1140310, 1151830, 1374520, 1374330, 1378990, 1372390, 1347390, 1135560, 1121640, 1217410, 1390340, 1392710, 1383070, 1372400, 1170430, 1169550, 1404540, 1412720, 1414110, 1417200, 1388240, 1194260, 1188850, 1416140, 1425890, 1426380, 1410520, 1388600, 1197940, 1197680, 1432620, 1448350, 1436320, 1438890, 1412650, 1222040, 1215220, 1454190, 1456740, 1490670, 1470910, 1438940, 1243620, 1241210, 1483460, 1489950, 1488440, 1482490, 1465050, 1261450, 1281800, 1552680, 1527050, 1526500, 1511360, 1497560, 1302860, 1292930, 1547830, 1550610, 1546490, 1547790, 1525750, 1324580, 1321580, 1576620, 1575060, 1570240, 1574670, 1543830, 1341780, 1341710, 1577840, 1565630, 1580460, 1569570, 1543390, 1431880, 1301600, 1401500, 1401040, 1530910, 1526670, 1498750, 1383070, 1284000, 1401510, 1189880, 1309810, 1380230, 1383630, 1254140, 1216830, 1243860, 1442240, 1481680, 1480680, 1490700, 1315410, 1300930, 1530520, 1532340, 1539150, 1541510, 1532770, 1344910, 1325530, 1563330, 1568490, 1580110, 1575130, 1564880, 1369810, 1359060, 1608230, 1605640, 1605970, 1601640, 1590810, 1381740, 1375190, 1625850, 1621800, 1629910, 1628510, 1609760, 1397880, 1392180, 1647700, 1646770, 1644200, 1667150, 1610910, 1408450, 1395010, 1652870, 1658870, 1660310, 1659060, 1629490, 1435450, 1407720, 1675610, 1682450, 1682070, 1693010, 1669030, 1448500, 1439490, 1710110, 1702690, 1707000, 1662770, 1512800, 1101660])
			},
				{
				e: '#4682b4',
				x: 3,
				f: '#3',
				i: _List_fromArray(
					[409540, 377260, 456380, 460230, 452020, 389350, 397230, 369000, 382180, 473570, 477470, 477550, 478030, 466150, 397480, 406380, 494570, 494680, 482810, 487700, 475090, 400520, 397940, 484160, 487740, 493260, 434500, 475410, 398650, 404690, 491980, 493410, 485250, 484740, 465490, 377460, 353960, 396390, 493300, 497560, 495110, 485260, 394770, 402910, 500540, 506260, 509680, 514010, 494350, 405360, 412560, 513030, 521320, 515730, 518170, 499850, 394960, 328510, 406450, 408080, 501980, 507800, 496990, 442530, 414260, 525770, 513440, 442660, 526810, 500190, 426220, 436110, 546820, 543480, 545420, 540530, 527770, 431050, 443100, 549550, 551600, 548120, 542290, 528810, 435370, 407250, 463200, 553640, 554110, 555820, 536470, 440460, 447740, 563330, 561850, 556430, 550910, 539440, 441200, 442310, 563100, 563760, 559230, 570870, 555280, 447750, 455570, 564630, 562510, 556050, 555560, 556470, 484080, 451320, 561060, 553630, 540660, 473500, 472500, 438550, 447590, 548670, 549580, 539920, 541510, 540380, 450260, 432260, 535950, 545160, 543810, 536990, 539680, 446570, 444470, 543450, 549070, 547840, 541430, 540200, 450080, 431800, 549290, 545890, 556300, 536500, 543890, 450890, 440180, 550850, 554740, 553460, 553440, 546420, 446710, 436640, 553270, 547750, 551920, 547610, 545500, 449220, 447510, 560050, 561560, 561560, 556630, 559340, 461630, 456300, 569070, 574800, 575220, 566180, 472200, 450530, 462960, 590290, 597250, 592970, 604870, 613050, 512200, 495980, 649860, 645070, 636950, 647120, 630390, 518820, 525990, 661700, 659770, 660650, 669560, 644510, 529610, 539520, 673850, 668530, 673770, 669480, 654540, 536090, 548400, 690100, 684900, 687040, 685940, 666360, 560140, 553050, 696740, 694490, 703000, 697980, 674460, 548230, 557370, 697150, 700110, 701170, 695810, 669780, 543500, 540170, 597430, 711500, 699770, 698520, 682170, 568380, 572950, 715580, 716050, 720770, 720660, 695220, 572970, 578170, 722280, 724280, 727910, 719820, 699840, 580870, 586270, 729850, 733680, 726590, 731270, 709330, 593070, 600500, 743590, 743690, 767660, 747140, 730510, 607540, 610480, 762440, 772960, 763480, 758490, 741090, 614450, 645760, 831130, 792100, 780410, 778620, 761000, 643620, 650320, 802640, 805900, 803960, 800580, 783660, 648310, 668150, 825940, 818650, 816630, 821000, 782790, 657850, 671660, 817660, 816020, 821380, 816280, 800240, 712510, 648060, 711170, 709110, 802240, 792710, 772260, 691490, 636050, 649450, 566120, 651310, 701910, 702270, 627880, 605290, 621710, 744830, 762830, 765640, 764140, 648720, 642430, 786580, 778790, 780060, 789170, 772600, 652160, 648950, 795360, 802250, 808010, 801890, 793490, 669240, 665310, 814370, 810880, 814580, 813950, 802070, 670450, 674250, 823010, 820620, 821400, 820760, 804300, 681870, 681460, 831580, 835600, 835390, 840770, 810700, 675170, 680870, 832000, 836790, 845630, 844560, 821810, 690310, 683810, 851150, 848090, 846480, 858340, 831290, 696470, 695540, 866980, 868190, 861720, 834530, 706650, 439140])
			}
			])
	}
	]);
var author$project$Lines$Line = F5(
	function (points, active, id, color, title) {
		return {al: active, e: color, x: id, bO: points, f: title};
	});
var author$project$Points$Point = elm$core$Basics$identity;
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Points$init = F2(
	function (x, y) {
		return _Utils_Tuple2(x, y);
	});
var author$project$Points$initXY = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return A2(author$project$Points$init, x, y);
};
var elm$core$Basics$True = 0;
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var author$project$Lines$init = function (_n0) {
	var points = _n0.bO;
	var id = _n0.x;
	var color = _n0.e;
	var title = _n0.f;
	return A5(
		author$project$Lines$Line,
		A2(elm$core$List$map, author$project$Points$initXY, points),
		true,
		id,
		color,
		title);
};
var elm$core$List$map2 = _List_map2;
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var author$project$Data$init = function () {
	var lineInit = F2(
		function (x, _n1) {
			var y = _n1.i;
			var color = _n1.e;
			var title = _n1.f;
			var id = _n1.x;
			return author$project$Lines$init(
				{
					e: color,
					x: id,
					bO: A3(
						elm$core$List$map2,
						elm$core$Tuple$pair,
						A2(elm$core$List$map, elm$core$Basics$toFloat, x),
						A2(elm$core$List$map, elm$core$Basics$toFloat, y)),
					f: title
				});
		});
	var linesInit = function (_n0) {
		var x = _n0.O;
		var ys = _n0.P;
		return A2(
			elm$core$List$map,
			lineInit(x),
			ys);
	};
	return A2(elm$core$List$map, linesInit, author$project$Data$charts);
}();
var author$project$Dials$Dial = F3(
	function (xNotchCount, yNotchCount, scaledFrameWidth) {
		return {ag: scaledFrameWidth, av: xNotchCount, a3: yNotchCount};
	});
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$sub = _Basics_sub;
var author$project$Dials$init = F2(
	function (_n0, _n1) {
		var width = _n0.a;
		var height = _n0.b;
		var x1 = _n1.a;
		var x2 = _n1.b;
		var xNotchCount = elm$core$Basics$round(1 / (x2 - x1)) * 5;
		var scaledFrameWidth = elm$core$Basics$round(width / (x2 - x1));
		return A3(author$project$Dials$Dial, xNotchCount, 6, scaledFrameWidth);
	});
var author$project$Points$scale = F2(
	function (_n0, _n1) {
		var scaleX = _n0.a;
		var scaleY = _n0.b;
		var _n2 = _n1;
		var x = _n2.a;
		var y = _n2.b;
		return _Utils_Tuple2(scaleX * x, scaleY * y);
	});
var author$project$Points$translate = F2(
	function (_n0, _n1) {
		var trX = _n0.a;
		var trY = _n0.b;
		var _n2 = _n1;
		var x = _n2.a;
		var y = _n2.b;
		return _Utils_Tuple2(x + trX, y + trY);
	});
var author$project$Points$transform = F2(
	function (transform_, point) {
		return A2(
			author$project$Points$translate,
			transform_.b0,
			A2(author$project$Points$scale, transform_.bS, point));
	});
var author$project$Lines$transform = F2(
	function (transform_, line) {
		var newPoints = A2(
			elm$core$List$map,
			author$project$Points$transform(transform_),
			line.bO);
		return _Utils_update(
			line,
			{bO: newPoints});
	});
var author$project$Points$unzip = function (_n0) {
	var _n1 = _n0;
	var x = _n1.a;
	var y = _n1.b;
	return _Utils_Tuple2(x, y);
};
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var author$project$Ranges$initWithMaybe = F2(
	function (mbX, mbY) {
		if (!mbX.$) {
			var x = mbX.a;
			if (!mbY.$) {
				var y = mbY.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(x, y));
			} else {
				return elm$core$Maybe$Nothing;
			}
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$max, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$min, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Ranges$init = function (floats) {
	var min = elm$core$List$minimum(floats);
	var max = elm$core$List$maximum(floats);
	return A2(author$project$Ranges$initWithMaybe, min, max);
};
var author$project$Ranges$initXYRanges = F2(
	function (maybeXRange, maybeYRange) {
		if (!maybeXRange.$) {
			var xRange = maybeXRange.a;
			if (!maybeYRange.$) {
				var yRange = maybeYRange.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(xRange, yRange));
			} else {
				return elm$core$Maybe$Nothing;
			}
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_n0, _n1) {
			var x = _n0.a;
			var y = _n0.b;
			var xs = _n1.a;
			var ys = _n1.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, x, xs),
				A2(elm$core$List$cons, y, ys));
		});
	return A3(
		elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var author$project$Points$range = function (points) {
	var _n0 = elm$core$List$unzip(
		A2(elm$core$List$map, author$project$Points$unzip, points));
	var xList = _n0.a;
	var yList = _n0.b;
	var xRange = author$project$Ranges$init(xList);
	var yRange = author$project$Ranges$init(yList);
	return A2(author$project$Ranges$initXYRanges, xRange, yRange);
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var author$project$Lines$valuesRange = function (lines) {
	return author$project$Points$range(
		elm$core$List$concat(
			A2(
				elm$core$List$map,
				function ($) {
					return $.bO;
				},
				lines)));
};
var author$project$Grids$pretransformLines = function (lines) {
	var scale = function () {
		var _n0 = author$project$Lines$valuesRange(lines);
		if (!_n0.$) {
			var _n1 = _n0.a;
			var _n2 = _n1.a;
			var x1 = _n2.a;
			var x2 = _n2.b;
			var _n3 = _n1.b;
			var y1 = _n3.a;
			var y2 = _n3.b;
			return _Utils_Tuple2(10000 / x2, 10000 / y2);
		} else {
			return _Utils_Tuple2(1, 1);
		}
	}();
	var newLines = A2(
		elm$core$List$map,
		author$project$Lines$transform(
			{
				bS: scale,
				b0: _Utils_Tuple2(0.0, 0.0)
			}),
		lines);
	return _Utils_Tuple2(newLines, scale);
};
var author$project$Ranges$width = function (_n0) {
	var a = _n0.a;
	var b = _n0.b;
	return b - a;
};
var elm$core$Basics$eq = _Utils_equal;
var author$project$Transforms$calcScale = F2(
	function (_n0, _n1) {
		var w = _n0.a;
		var h = _n0.b;
		var xRange = _n1.a;
		var yRange = _n1.b;
		var yRangeWidth = author$project$Ranges$width(yRange);
		var xRangeWidth = author$project$Ranges$width(xRange);
		var scaleY = function () {
			var _n3 = !yRangeWidth;
			if (_n3) {
				return 1;
			} else {
				return h / yRangeWidth;
			}
		}();
		var scaleX = function () {
			var _n2 = !xRangeWidth;
			if (_n2) {
				return 1;
			} else {
				return w / xRangeWidth;
			}
		}();
		return _Utils_Tuple2(scaleX, scaleY);
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Transforms$calcTranslate = F3(
	function (_n0, _n1, _n2) {
		var w = _n0.a;
		var h = _n0.b;
		var xScale = _n1.a;
		var yScale = _n1.b;
		var _n3 = _n2.a;
		var minX = _n3.a;
		var maxX = _n3.b;
		var _n4 = _n2.b;
		var minY = _n4.a;
		var maxY = _n4.b;
		return _Utils_Tuple2((w - ((minX + maxX) * xScale)) / 2, (((h - (minY * yScale)) - (maxY * yScale)) / 2) * (-1));
	});
var author$project$Transforms$calcTransform = F2(
	function (size, maybeXYRange) {
		if (!maybeXYRange.$) {
			var xyRanges = maybeXYRange.a;
			var scale = A2(author$project$Transforms$calcScale, size, xyRanges);
			var translate = A3(author$project$Transforms$calcTranslate, size, scale, xyRanges);
			return {bS: scale, b0: translate};
		} else {
			return {
				bS: _Utils_Tuple2(1, 1),
				b0: _Utils_Tuple2(0, 0)
			};
		}
	});
var author$project$Grids$Frame$init = function (_n0) {
	var size = _n0.U;
	var position = _n0.aq;
	var lines = _n0.an;
	var margins = _n0.aI;
	var id = _n0.x;
	var _n1 = author$project$Grids$pretransformLines(lines);
	var scaledLines = _n1.a;
	var pretransformScale = _n1.b;
	var valuesRange = author$project$Lines$valuesRange(scaledLines);
	return {
		R: A2(author$project$Dials$init, size, position),
		an: scaledLines,
		aI: margins,
		aq: position,
		ar: pretransformScale,
		U: size,
		ai: A2(author$project$Transforms$calcTransform, size, valuesRange),
		a1: valuesRange
	};
};
var author$project$MapBoxes$calcBoxWidth = function (w) {
	return w / 4.5;
};
var author$project$MapBoxes$calcPosition = F3(
	function (width, leftX, rightX) {
		return _Utils_Tuple2(leftX / width, rightX / width);
	});
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var author$project$MapBoxes$init = F2(
	function (_n0, id) {
		var width = _n0.a;
		var height = _n0.b;
		var x2 = width;
		var boxWidth = author$project$MapBoxes$calcBoxWidth(width);
		var x1 = width - boxWidth;
		return {
			n: 0,
			x: id,
			J: height,
			C: width,
			aq: A3(author$project$MapBoxes$calcPosition, width, x1, x2),
			aj: x2 - x1,
			r: x1,
			s: x2
		};
	});
var author$project$Grids$Map$init = function (_n0) {
	var size = _n0.U;
	var lines = _n0.an;
	var margins = _n0.aI;
	var id = _n0.x;
	var _n1 = author$project$Grids$pretransformLines(lines);
	var scaledLines = _n1.a;
	var pretransformScale = _n1.b;
	var valuesRange = author$project$Lines$valuesRange(scaledLines);
	return {
		x: id,
		an: scaledLines,
		aH: A2(author$project$MapBoxes$init, size, id),
		aI: margins,
		ar: pretransformScale,
		U: size,
		ai: A2(author$project$Transforms$calcTransform, size, valuesRange),
		a1: valuesRange
	};
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$Basics$le = _Utils_le;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$fromInt = _String_fromNumber;
var author$project$Charts$init = function (size) {
	var listLines = author$project$Data$init;
	var chartInit = F2(
		function (id, lines) {
			var map = author$project$Grids$Map$init(
				{
					x: elm$core$String$fromInt(id),
					an: lines,
					aI: 20,
					U: author$project$Charts$mapSize(size)
				});
			var frame = author$project$Grids$Frame$init(
				{
					x: elm$core$String$fromInt(id),
					an: lines,
					aI: 20,
					aq: map.aH.aq,
					U: author$project$Charts$frameSize(size)
				});
			return {t: frame, x: id, p: map, U: size};
		});
	return A2(elm$core$List$indexedMap, chartInit, listLines);
};
var elm$core$Basics$False = 1;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.a) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.c),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.a * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.a);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.c);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{d: nodeList, a: (len / elm$core$Array$branchFactor) | 0, c: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$String$all = _String_all;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (size) {
	return _Utils_Tuple2(
		author$project$Charts$init(size),
		elm$core$Platform$Cmd$none);
};
var author$project$Charts$MapMsg = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Grids$Map$MapBoxMsg = elm$core$Basics$identity;
var author$project$MapBoxes$LeftBoundMoved = function (a) {
	return {$: 1, a: a};
};
var author$project$MapBoxes$Moved = function (a) {
	return {$: 0, a: a};
};
var author$project$MapBoxes$RightBoundMoved = function (a) {
	return {$: 2, a: a};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$index = _Json_decodeIndex;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$MapBoxes$boxMoved = _Platform_incomingPort(
	'boxMoved',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$string)));
var author$project$MapBoxes$leftBoundMoved = _Platform_incomingPort(
	'leftBoundMoved',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$string)));
var author$project$MapBoxes$rightBoundMoved = _Platform_incomingPort(
	'rightBoundMoved',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$string)));
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$MapBoxes$subscriptions = elm$core$Platform$Sub$batch(
	_List_fromArray(
		[
			author$project$MapBoxes$boxMoved(author$project$MapBoxes$Moved),
			author$project$MapBoxes$leftBoundMoved(author$project$MapBoxes$LeftBoundMoved),
			author$project$MapBoxes$rightBoundMoved(author$project$MapBoxes$RightBoundMoved)
		]));
var elm$core$Platform$Sub$map = _Platform_map;
var author$project$Grids$Map$subscriptions = A2(elm$core$Platform$Sub$map, elm$core$Basics$identity, author$project$MapBoxes$subscriptions);
var author$project$Charts$subscriptions = function (chart) {
	return A2(
		elm$core$Platform$Sub$map,
		author$project$Charts$MapMsg(chart.x),
		author$project$Grids$Map$subscriptions);
};
var author$project$Main$ChartMsg = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Main$WindowResized = function (a) {
	return {$: 1, a: a};
};
var elm$json$Json$Decode$int = _Json_decodeInt;
var author$project$Main$windResized = _Platform_incomingPort(
	'windResized',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$int));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$int)));
var author$project$Main$subscriptions = function (charts) {
	var chartSub = function (chart) {
		return A2(
			elm$core$Platform$Sub$map,
			author$project$Main$ChartMsg(chart.x),
			author$project$Charts$subscriptions(chart));
	};
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Main$windResized(author$project$Main$WindowResized),
				elm$core$Platform$Sub$batch(
				A2(elm$core$List$map, chartSub, charts))
			]));
};
var author$project$Grids$resize = F2(
	function (size, grid) {
		return _Utils_update(
			grid,
			{
				U: size,
				ai: A2(author$project$Transforms$calcTransform, size, grid.a1)
			});
	});
var author$project$MapBoxes$resize = F2(
	function (_n0, mapBox) {
		var w = _n0.a;
		var h = _n0.b;
		var boxWidth = author$project$MapBoxes$calcBoxWidth(w);
		var x1 = w - boxWidth;
		return _Utils_update(
			mapBox,
			{J: h, C: w, aj: boxWidth, r: x1, s: x1 + boxWidth});
	});
var author$project$Grids$Map$resize = F2(
	function (size, map) {
		return function (m) {
			return _Utils_update(
				m,
				{
					aH: A2(author$project$MapBoxes$resize, size, map.aH)
				});
		}(
			A2(author$project$Grids$resize, size, map));
	});
var author$project$Charts$resize = F2(
	function (chart, size) {
		return _Utils_update(
			chart,
			{
				t: A2(
					author$project$Grids$resize,
					author$project$Charts$frameSize(size),
					chart.t),
				p: A2(
					author$project$Grids$Map$resize,
					author$project$Charts$mapSize(size),
					chart.p),
				U: size
			});
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var author$project$Grids$toggleLine = F2(
	function (grid, lineId) {
		var toggle = function (line) {
			var _n0 = _Utils_eq(line.x, lineId);
			if (_n0) {
				return _Utils_update(
					line,
					{al: !line.al});
			} else {
				return line;
			}
		};
		var lines = A2(elm$core$List$map, toggle, grid.an);
		var valuesRange = author$project$Lines$valuesRange(
			A2(
				elm$core$List$filter,
				function ($) {
					return $.al;
				},
				lines));
		return _Utils_update(
			grid,
			{
				an: lines,
				ai: A2(author$project$Transforms$calcTransform, grid.U, valuesRange),
				a1: valuesRange
			});
	});
var author$project$Dials$recalc = F3(
	function (width, _n0, dial) {
		var x1 = _n0.a;
		var x2 = _n0.b;
		var xNotchCount = elm$core$Basics$round(1 / (x2 - x1)) * 5;
		var scaledFrameWidth = elm$core$Basics$round(width / (x2 - x1));
		return _Utils_update(
			dial,
			{ag: scaledFrameWidth, av: xNotchCount});
	});
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var author$project$Dials$update = F3(
	function (_n0, _n1, dial) {
		var width = _n0.a;
		var x1 = _n1.a;
		var x2 = _n1.b;
		return (elm$core$Basics$abs((width / (x2 - x1)) - dial.ag) < 1.0e-3) ? dial : A3(
			author$project$Dials$recalc,
			width,
			_Utils_Tuple2(x1, x2),
			dial);
	});
var author$project$Grids$Frame$updatePosition = F2(
	function (position, frame) {
		var size = frame.U;
		return _Utils_update(
			frame,
			{
				R: A3(author$project$Dials$update, frame.U, frame.aq, frame.R),
				aq: position
			});
	});
var author$project$MapBoxes$updatePosition = function (mapBox) {
	var x1 = mapBox.r;
	var x2 = mapBox.s;
	var dx = mapBox.n;
	var mapWidth = mapBox.C;
	return _Utils_update(
		mapBox,
		{
			aq: A3(author$project$MapBoxes$calcPosition, mapWidth, x1 + dx, x2 + dx)
		});
};
var author$project$MapBoxes$update = F2(
	function (msg, mapBox) {
		var mapWidth = mapBox.C;
		var width = mapBox.aj;
		var x1 = mapBox.r;
		var x2 = mapBox.s;
		var dx = mapBox.n;
		switch (msg.$) {
			case 0:
				var _n1 = msg.a;
				var id = _n1.a;
				var dX = _n1.b;
				return _Utils_eq(id, mapBox.x) ? (((x1 + dX) < 5) ? author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{n: (x1 * (-1)) + 5})) : ((_Utils_cmp(x2 + dX, mapWidth) > 0) ? author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{n: mapWidth - x2})) : author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{n: dX})))) : mapBox;
			case 1:
				var _n2 = msg.a;
				var id = _n2.a;
				var x = _n2.b;
				return _Utils_eq(id, mapBox.x) ? (((x + dx) < 3) ? _Utils_update(
					mapBox,
					{r: 3 - dx}) : ((_Utils_cmp(x, x2) < 0) ? author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{r: x})) : author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{s: x})))) : mapBox;
			default:
				var _n3 = msg.a;
				var id = _n3.a;
				var x = _n3.b;
				return _Utils_eq(id, mapBox.x) ? ((_Utils_cmp(x + dx, mapWidth) > 0) ? author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{s: mapWidth - dx})) : ((_Utils_cmp(x, x1) > 0) ? author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{s: x})) : author$project$MapBoxes$updatePosition(
					_Utils_update(
						mapBox,
						{r: x})))) : mapBox;
		}
	});
var author$project$Grids$Map$update = F2(
	function (msg, map) {
		var subMsg = msg;
		return _Utils_update(
			map,
			{
				aH: A2(author$project$MapBoxes$update, subMsg, map.aH)
			});
	});
var author$project$Charts$update = F2(
	function (msg, chart) {
		if (!msg.$) {
			var id = msg.a;
			return _Utils_update(
				chart,
				{
					t: A2(author$project$Grids$toggleLine, chart.t, id),
					p: A2(author$project$Grids$toggleLine, chart.p, id)
				});
		} else {
			var id = msg.a;
			var subMsg = msg.b;
			if (_Utils_eq(chart.x, id)) {
				var map = A2(author$project$Grids$Map$update, subMsg, chart.p);
				var frame = A2(author$project$Grids$Frame$updatePosition, map.aH.aq, chart.t);
				return _Utils_update(
					chart,
					{t: frame, p: map});
			} else {
				return chart;
			}
		}
	});
var author$project$Main$update = F2(
	function (msg, charts) {
		if (!msg.$) {
			var id = msg.a;
			var subMsg = msg.b;
			var updateChart = function (chart) {
				return _Utils_eq(chart.x, id) ? A2(author$project$Charts$update, subMsg, chart) : chart;
			};
			return _Utils_Tuple2(
				A2(elm$core$List$map, updateChart, charts),
				elm$core$Platform$Cmd$none);
		} else {
			var size = msg.a;
			var updateChart = function (chart) {
				return A2(author$project$Charts$resize, chart, size);
			};
			return _Utils_Tuple2(
				A2(elm$core$List$map, updateChart, charts),
				elm$core$Platform$Cmd$none);
		}
	});
var author$project$Charts$ToggleLine = function (a) {
	return {$: 0, a: a};
};
var author$project$Lines$backgroundColor = function (line) {
	return line.al ? line.e : 'transparent';
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Lines$galka = A2(
	elm$svg$Svg$svg,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$height('45'),
			elm$svg$Svg$Attributes$width('45'),
			elm$svg$Svg$Attributes$viewBox('0 0 159.67 125.84')
		]),
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$path,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke('none'),
					elm$svg$Svg$Attributes$d('M154.22,5.45h0a18.31,18.31,0,0,0-25.82,0L52.23,81.62l-20.95-21a18.32,18.32,0,0,0-25.83,0h0a18.32,18.32,0,0,0,0,25.83l33,33c.26.3.54.6.83.89h0a18.31,18.31,0,0,0,25.82,0l89.11-89.11A18.31,18.31,0,0,0,154.22,5.45Z')
				]),
			_List_Nil)
		]));
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var author$project$Utils$classList = function (list) {
	return elm$svg$Svg$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, list))));
};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var author$project$Lines$viewBtn = F2(
	function (msg, line) {
		return A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(
					msg(line.x)),
					author$project$Utils$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('active', line.al)
						]))
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$style(
							'background-color: ' + (author$project$Lines$backgroundColor(line) + ('; border: 8px solid ' + line.e))),
							elm$svg$Svg$Attributes$class('circle')
						]),
					_List_fromArray(
						[author$project$Lines$galka])),
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(line.f)
						]))
				]));
	});
var author$project$Charts$viewLineBtn = function (line) {
	return A2(author$project$Lines$viewBtn, author$project$Charts$ToggleLine, line);
};
var author$project$Charts$viewLineBtns = function (lines) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$svg$Svg$Attributes$class('buttons')
			]),
		A2(elm$core$List$map, author$project$Charts$viewLineBtn, lines));
};
var author$project$Grids$Frame$viewBoxAttr = F2(
	function (_n0, margin) {
		var w = _n0.a;
		var h = _n0.b;
		return elm$svg$Svg$Attributes$viewBox(
			A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$map,
					elm$core$String$fromInt,
					_List_fromArray(
						[0 - margin, (h + margin) * (-1), w + margin, h + (margin * 7)]))));
	});
var elm$core$String$fromFloat = _String_fromNumber;
var author$project$Points$renderY = function (_n0) {
	var _n1 = _n0;
	var y = _n1.b;
	return elm$core$String$fromFloat(-y);
};
var elm$svg$Svg$line = elm$svg$Svg$trustedNode('line');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var author$project$Dials$hLine = F2(
	function (w, point) {
		return A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x1('0'),
					elm$svg$Svg$Attributes$y1(
					author$project$Points$renderY(point)),
					elm$svg$Svg$Attributes$x2(
					elm$core$String$fromInt(w)),
					elm$svg$Svg$Attributes$y2(
					author$project$Points$renderY(point)),
					elm$svg$Svg$Attributes$stroke('black'),
					elm$svg$Svg$Attributes$strokeWidth('0.1'),
					elm$svg$Svg$Attributes$transform('scale(1.5,1) translate(-10,0)')
				]),
			_List_Nil);
	});
var author$project$Points$renderX = function (_n0) {
	var _n1 = _n0;
	var x = _n1.a;
	return elm$core$String$fromFloat(x);
};
var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
var elm$svg$Svg$text_ = elm$svg$Svg$trustedNode('text');
var elm$svg$Svg$Attributes$alignmentBaseline = _VirtualDom_attribute('alignment-baseline');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var author$project$Dials$textY = F2(
	function (title, point) {
		return A2(
			elm$svg$Svg$text_,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x(
					author$project$Points$renderX(point)),
					elm$svg$Svg$Attributes$y(
					author$project$Points$renderY(point)),
					elm$svg$Svg$Attributes$alignmentBaseline('text-after-edge'),
					elm$svg$Svg$Attributes$transform('translate(0,-20)')
				]),
			_List_fromArray(
				[
					elm$svg$Svg$text(title)
				]));
	});
var author$project$Dials$v = F3(
	function (width, actualY, point) {
		var title = actualY(point);
		return _List_fromArray(
			[
				A2(author$project$Dials$hLine, width, point),
				A2(author$project$Dials$textY, title, point)
			]);
	});
var author$project$Points$unscale = F2(
	function (_n0, _n1) {
		var scaleX = _n0.a;
		var scaleY = _n0.b;
		var _n2 = _n1;
		var x = _n2.a;
		var y = _n2.b;
		return _Utils_Tuple2(x / scaleX, y / scaleY);
	});
var author$project$Points$untranslate = F2(
	function (_n0, _n1) {
		var trX = _n0.a;
		var trY = _n0.b;
		var _n2 = _n1;
		var x = _n2.a;
		var y = _n2.b;
		return _Utils_Tuple2(x - trX, (0 - y) - trY);
	});
var author$project$Points$actual = F3(
	function (prescale, transform_, point) {
		return A2(
			author$project$Points$unscale,
			prescale,
			A2(
				author$project$Points$unscale,
				transform_.bS,
				A2(author$project$Points$untranslate, transform_.b0, point)));
	});
var author$project$Points$renderRoundY = function (_n0) {
	var _n1 = _n0;
	var y = _n1.b;
	return elm$core$String$fromInt(
		elm$core$Basics$round(-y));
};
var author$project$Points$actualRoundY = F3(
	function (prescale, transform_, point) {
		return author$project$Points$renderRoundY(
			A3(author$project$Points$actual, prescale, transform_, point));
	});
var author$project$Points$initWithX0 = function (y) {
	return A2(author$project$Points$init, 0, y);
};
var author$project$Ranges$initListFloats = F2(
	function (count, width_) {
		var step = width_ / count;
		return A2(
			elm$core$List$map,
			function (a) {
				return a * step;
			},
			A2(
				elm$core$List$map,
				elm$core$Basics$toFloat,
				A2(elm$core$List$range, 0, count)));
	});
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var author$project$Dials$viewY = F4(
	function (_n0, transform, prescale, dial) {
		var width = _n0.a;
		var height = _n0.b;
		var vDivs = elm$core$List$concat(
			A2(
				elm$core$List$map,
				A2(
					author$project$Dials$v,
					width,
					A2(author$project$Points$actualRoundY, prescale, transform)),
				A2(
					elm$core$List$map,
					author$project$Points$initWithX0,
					A2(author$project$Ranges$initListFloats, dial.a3, height))));
		return A2(
			elm$svg$Svg$g,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$class('dial')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$g,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$class('v')
						]),
					vDivs)
				]));
	});
var author$project$Grids$Frame$viewDial = function (frame) {
	return A4(author$project$Dials$viewY, frame.U, frame.ai, frame.ar, frame.R);
};
var author$project$Dials$textX = F2(
	function (title, point) {
		return A2(
			elm$svg$Svg$text_,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x(
					author$project$Points$renderX(point)),
					elm$svg$Svg$Attributes$y(
					author$project$Points$renderY(point)),
					elm$svg$Svg$Attributes$transform('translate(0,70)')
				]),
			_List_fromArray(
				[
					elm$svg$Svg$text(title)
				]));
	});
var author$project$Dials$h = F2(
	function (actualX, point) {
		var title = actualX(point);
		return A2(author$project$Dials$textX, title, point);
	});
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Basics$modBy = _Basics_modBy;
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$utc = A2(elm$time$Time$Zone, 0, _List_Nil);
var AdrianRibao$elm_derberos_date$Derberos$Date$Core$posixToCivil = function (time) {
	var milliseconds = elm$time$Time$posixToMillis(time);
	var minute = A2(
		elm$core$Basics$modBy,
		60,
		elm$core$Basics$floor(milliseconds / (60 * 1000)));
	var minutes = elm$core$Basics$floor(milliseconds / (60 * 1000));
	var rawDay = elm$core$Basics$floor((minutes / (60 * 24)) + 719468);
	var second = A2(
		elm$core$Basics$modBy,
		60,
		elm$core$Basics$floor(milliseconds / 1000));
	var millis = A2(elm$core$Basics$modBy, 1000, milliseconds);
	var hour = A2(
		elm$core$Basics$modBy,
		24,
		elm$core$Basics$floor(milliseconds / ((60 * 60) * 1000)));
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		bf: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		_: hour,
		aa: millis,
		ab: minute,
		by: month,
		ah: second,
		aw: year + ((month <= 2) ? 1 : 0),
		ak: elm$time$Time$utc
	};
};
var author$project$Date$monthString = function (num) {
	switch (num) {
		case 1:
			return 'Jan';
		case 2:
			return 'Feb';
		case 3:
			return 'Mar';
		case 4:
			return 'Apr';
		case 5:
			return 'May';
		case 6:
			return 'Jun';
		case 7:
			return 'Jul';
		case 8:
			return 'Aug';
		case 9:
			return 'Sep';
		case 10:
			return 'Oct';
		case 11:
			return 'Nov';
		case 12:
			return 'Dec';
		default:
			return '';
	}
};
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
var author$project$Date$fromPosix = function (millisecond) {
	var date = AdrianRibao$elm_derberos_date$Derberos$Date$Core$posixToCivil(
		elm$time$Time$millisToPosix(millisecond));
	return author$project$Date$monthString(date.by) + (' ' + elm$core$String$fromInt(date.bf));
};
var author$project$Points$renderRoundX = function (_n0) {
	var _n1 = _n0;
	var x = _n1.a;
	return elm$core$Basics$round(x);
};
var author$project$Points$actualRoundX = F3(
	function (prescale, transform_, point) {
		return author$project$Date$fromPosix(
			author$project$Points$renderRoundX(
				A3(author$project$Points$actual, prescale, transform_, point)));
	});
var author$project$Points$initWithY0 = function (x) {
	return A2(author$project$Points$init, x, 0);
};
var author$project$Dials$viewX = F5(
	function (_n0, _n1, transform, prescale, dial) {
		var width = _n0.a;
		var height = _n0.b;
		var x1 = _n1.a;
		var x2 = _n1.b;
		var hDivs = A2(
			elm$core$List$map,
			author$project$Dials$h(
				A2(author$project$Points$actualRoundX, prescale, transform)),
			A2(
				elm$core$List$map,
				author$project$Points$initWithY0,
				A2(author$project$Ranges$initListFloats, dial.av, dial.ag)));
		return A2(
			elm$svg$Svg$g,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$class('dial')
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$g,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$class('x')
						]),
					hDivs)
				]));
	});
var author$project$Points$render = function (point) {
	return author$project$Points$renderX(point) + (',' + author$project$Points$renderY(point));
};
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var author$project$Lines$pointsAttr = function (line) {
	return elm$svg$Svg$Attributes$points(
		A2(
			elm$core$String$join,
			' ',
			A2(elm$core$List$map, author$project$Points$render, line.bO)));
};
var elm$svg$Svg$polyline = elm$svg$Svg$trustedNode('polyline');
var elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var author$project$Lines$draw = F3(
	function (transform_, size, line) {
		return A2(
			elm$svg$Svg$polyline,
			_List_fromArray(
				[
					author$project$Lines$pointsAttr(line),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$stroke(line.e),
					elm$svg$Svg$Attributes$strokeWidth('2'),
					author$project$Utils$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('hidden', !line.al),
							_Utils_Tuple2('line', true)
						])),
					elm$svg$Svg$Attributes$id(
					elm$core$String$fromInt(line.x))
				]),
			_List_Nil);
	});
var author$project$Transforms$Slow = 0;
var author$project$Utils$joinWithComma = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return A2(
		elm$core$String$join,
		',',
		A2(
			elm$core$List$map,
			elm$core$String$fromFloat,
			_List_fromArray(
				[x, y])));
};
var author$project$Transforms$scaleAttr = function (_n0) {
	var scale = _n0.bS;
	return elm$svg$Svg$Attributes$transform(
		function (v) {
			return 'scale(' + (v + ')');
		}(
			author$project$Utils$joinWithComma(scale)));
};
var author$project$Transforms$transitionToStr = function (transition) {
	if (transition === 1) {
		return 'transition-fast';
	} else {
		return 'transition-slow';
	}
};
var author$project$Transforms$scaleGroup = F3(
	function (transform_, transition, svg_) {
		return A2(
			elm$svg$Svg$g,
			_List_fromArray(
				[
					author$project$Transforms$scaleAttr(transform_),
					elm$svg$Svg$Attributes$class(
					author$project$Transforms$transitionToStr(transition))
				]),
			_List_fromArray(
				[svg_]));
	});
var author$project$Transforms$translateAttr = function (translate) {
	return elm$svg$Svg$Attributes$transform(
		function (v) {
			return 'translate(' + (v + ')');
		}(
			author$project$Utils$joinWithComma(translate)));
};
var author$project$Transforms$translateGroup = F3(
	function (transform_, transition, svg_) {
		return A2(
			elm$svg$Svg$g,
			_List_fromArray(
				[
					author$project$Transforms$translateAttr(transform_.b0),
					elm$svg$Svg$Attributes$class(
					author$project$Transforms$transitionToStr(transition))
				]),
			_List_fromArray(
				[svg_]));
	});
var author$project$Transforms$transformGroup = F3(
	function (transform_, transition, svg_) {
		return A3(
			author$project$Transforms$translateGroup,
			transform_,
			transition,
			A3(author$project$Transforms$scaleGroup, transform_, transition, svg_));
	});
var author$project$Grids$viewLines = function (grid) {
	return A3(
		author$project$Transforms$transformGroup,
		grid.ai,
		0,
		A2(
			elm$svg$Svg$g,
			_List_Nil,
			A2(
				elm$core$List$map,
				A2(author$project$Lines$draw, grid.ai, grid.U),
				grid.an)));
};
var author$project$Transforms$Fast = 1;
var author$project$Transforms$Transform = F2(
	function (scale, translate) {
		return {bS: scale, b0: translate};
	});
var author$project$Transforms$transformToPositionGroup = F2(
	function (_n0, _n1) {
		var x1 = _n0.a;
		var x2 = _n0.b;
		var w = _n1.a;
		var scaleX = 1 / (x2 - x1);
		var translateX = ((w * scaleX) * x1) * (-1);
		return A2(
			author$project$Transforms$Transform,
			_Utils_Tuple2(scaleX, 1.0),
			_Utils_Tuple2(translateX, 0.0));
	});
var author$project$Grids$Frame$viewLines = function (frame) {
	var transform = A2(author$project$Transforms$transformToPositionGroup, frame.aq, frame.U);
	var transformedLines = A3(
		author$project$Transforms$transformGroup,
		transform,
		1,
		author$project$Grids$viewLines(frame));
	var translatedDial = A3(
		author$project$Transforms$translateGroup,
		transform,
		1,
		A5(author$project$Dials$viewX, frame.U, frame.aq, frame.ai, frame.ar, frame.R));
	return A2(
		elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[transformedLines, translatedDial]));
};
var elm$svg$Svg$Attributes$preserveAspectRatio = _VirtualDom_attribute('preserveAspectRatio');
var elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var author$project$Grids$Frame$view = function (frame) {
	var size = frame.U;
	var w = size.a - frame.aI;
	var h = size.b;
	var _n0 = frame.a1;
	if (!_n0.$) {
		var range = _n0.a;
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(w)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(h)),
					A2(author$project$Grids$Frame$viewBoxAttr, frame.U, frame.aI),
					elm$svg$Svg$Attributes$preserveAspectRatio('none'),
					elm$svg$Svg$Attributes$class('frame')
				]),
			_List_fromArray(
				[
					author$project$Grids$Frame$viewDial(frame),
					author$project$Grids$Frame$viewLines(frame)
				]));
	} else {
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(w)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(h))
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$text_,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$x(
							elm$core$String$fromInt((w / 2) | 0)),
							elm$svg$Svg$Attributes$y(
							elm$core$String$fromInt((h / 2) | 0)),
							elm$svg$Svg$Attributes$style('font-size: 40pt'),
							elm$svg$Svg$Attributes$textAnchor('middle')
						]),
					_List_fromArray(
						[
							elm$svg$Svg$text('NO DATA')
						]))
				]));
	}
};
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var author$project$MapBoxes$background = F4(
	function (x, mapWidth, mapHeight, dx) {
		return A2(
			elm$svg$Svg$rect,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromFloat(mapWidth)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromFloat(mapHeight + 10)),
					elm$svg$Svg$Attributes$x(
					elm$core$String$fromFloat(x)),
					elm$svg$Svg$Attributes$y(
					elm$core$String$fromFloat(((-1) * mapHeight) - 5)),
					elm$svg$Svg$Attributes$fill('#f8fafe'),
					elm$svg$Svg$Attributes$strokeWidth('0'),
					elm$svg$Svg$Attributes$fillOpacity('0.7'),
					elm$svg$Svg$Attributes$transform(
					'translate(' + (elm$core$String$fromFloat(dx) + ',0)'))
				]),
			_List_Nil);
	});
var author$project$MapBoxes$leftBackground = function (_n0) {
	var x1 = _n0.r;
	var dx = _n0.n;
	var mapWidth = _n0.C;
	var mapHeight = _n0.J;
	return A4(author$project$MapBoxes$background, (x1 - mapWidth) - 5, mapWidth, mapHeight, dx);
};
var author$project$MapBoxes$rightBackground = function (_n0) {
	var x2 = _n0.s;
	var dx = _n0.n;
	var mapWidth = _n0.C;
	var mapHeight = _n0.J;
	return A4(author$project$MapBoxes$background, x2 + 5, mapWidth, mapHeight, dx);
};
var author$project$MapBoxes$viewBackground = function (mapBox) {
	return A2(
		elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				author$project$MapBoxes$leftBackground(mapBox),
				author$project$MapBoxes$rightBackground(mapBox)
			]));
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$svg$Svg$map = elm$virtual_dom$VirtualDom$map;
var author$project$Grids$Map$viewBackground = function (map) {
	return A2(
		elm$svg$Svg$map,
		elm$core$Basics$identity,
		author$project$MapBoxes$viewBackground(map.aH));
};
var author$project$Grids$Map$viewBoxAttr = F2(
	function (_n0, margin) {
		var w = _n0.a;
		var h = _n0.b;
		return elm$svg$Svg$Attributes$viewBox(
			A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$map,
					elm$core$String$fromInt,
					_List_fromArray(
						[0, h * (-1), w + 10, h]))));
	});
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var author$project$MapBoxes$viewBox = function (mapBox) {
	var x1 = mapBox.r;
	var x2 = mapBox.s;
	var mapHeight = mapBox.J;
	return A2(
		elm$svg$Svg$rect,
		_List_fromArray(
			[
				elm$svg$Svg$Attributes$width(
				elm$core$String$fromFloat(
					elm$core$Basics$abs(x2 - x1))),
				elm$svg$Svg$Attributes$height(
				elm$core$String$fromFloat(mapHeight + 10)),
				elm$svg$Svg$Attributes$x(
				elm$core$String$fromFloat(
					A2(elm$core$Basics$min, x1, x2))),
				elm$svg$Svg$Attributes$y(
				elm$core$String$fromFloat(((-1) * mapHeight) - 5)),
				elm$svg$Svg$Attributes$fill('white'),
				elm$svg$Svg$Attributes$fillOpacity('0.15'),
				elm$svg$Svg$Attributes$stroke('#e5edf4'),
				elm$svg$Svg$Attributes$strokeWidth('15'),
				elm$svg$Svg$Attributes$id(mapBox.x),
				elm$svg$Svg$Attributes$class('mapBox'),
				elm$svg$Svg$Attributes$strokeOpacity('1'),
				elm$svg$Svg$Attributes$transform(
				'translate(' + (elm$core$String$fromFloat(mapBox.n) + ',0)')),
				A2(
				elm$html$Html$Attributes$attribute,
				'dragx',
				elm$core$String$fromFloat(mapBox.n))
			]),
		_List_Nil);
};
var author$project$MapBoxes$view = function (mapBox) {
	return A2(
		elm$svg$Svg$g,
		_List_Nil,
		_List_fromArray(
			[
				author$project$MapBoxes$viewBox(mapBox)
			]));
};
var author$project$Grids$Map$viewMapBox = function (map) {
	return A2(
		elm$svg$Svg$map,
		elm$core$Basics$identity,
		author$project$MapBoxes$view(map.aH));
};
var author$project$Grids$Map$view = function (grid) {
	return A2(
		elm$svg$Svg$svg,
		_List_fromArray(
			[
				elm$svg$Svg$Attributes$width(
				elm$core$String$fromInt(grid.U.a - (grid.aI * 2))),
				elm$svg$Svg$Attributes$height(
				elm$core$String$fromInt(grid.U.b)),
				A2(author$project$Grids$Map$viewBoxAttr, grid.U, grid.aI),
				elm$svg$Svg$Attributes$id('svgMap'),
				elm$svg$Svg$Attributes$style('margin: 0 20px')
			]),
		_List_fromArray(
			[
				A2(elm$svg$Svg$g, _List_Nil, _List_Nil),
				author$project$Grids$Map$viewMapBox(grid),
				author$project$Grids$viewLines(grid),
				author$project$Grids$Map$viewBackground(grid)
			]));
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var author$project$Charts$view = function (chart) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$style('padding: 40px; font-size: 40pt')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						'Chart ' + elm$core$String$fromInt(chart.x))
					])),
				author$project$Grids$Frame$view(chart.t),
				A2(
				elm$html$Html$map,
				author$project$Charts$MapMsg(chart.x),
				author$project$Grids$Map$view(chart.p)),
				author$project$Charts$viewLineBtns(chart.p.an)
			]));
};
var author$project$Main$view = function (charts) {
	var viewChart = function (chart) {
		return A2(
			elm$html$Html$map,
			author$project$Main$ChartMsg(chart.x),
			author$project$Charts$view(chart));
	};
	return A2(elm$core$List$map, viewChart, charts);
};
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aD: fragment, aE: host, aO: path, aQ: port_, aT: protocol, aU: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$document = _Browser_document;
var author$project$Main$main = elm$browser$Browser$document(
	{
		bu: author$project$Main$init,
		bX: author$project$Main$subscriptions,
		b1: author$project$Main$update,
		b3: function (grid) {
			return {
				a6: author$project$Main$view(grid),
				f: 'Telegram test chart'
			};
		}
	});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$int));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$int)))(0)}});}(this));