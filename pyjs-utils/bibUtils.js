// Transcrypt'ed from Python, 2020-10-18 22:02:09
var re = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
var __name__ = '__main__';
export var calcu_sub_str_num = function (mom_str, sun_str) {
	var count = 0;
	for (var i = 0; i < len (mom_str) - 1; i++) {
		if (mom_str.__getslice__ (i, i + len (sun_str), 1) == sun_str) {
			count++;
		}
	}
	return count;
};
export var getData = function (bibtex) {
	var bibtex = getTag (bibtex);
	var lists = ['author', 'title', 'journal', 'volume', 'pages', 'url', 'doi', 'timestamp', 'biburl', 'bibsource', 'booktitle', 'editor', 'eprint', 'year', 'archivePrefix', 'keyWords', 'modelAlgo', 'memo', 'rating', 'users', 'publisher', 'address', 'biborigin'];
	for (var list of lists) {
		if (!__in__ (list, bibtex.py_keys ())) {
			bibtex [list] = '';
		}
	}
	return bibtex;
};
export var calcu_spacenumber = function (string) {
	var count = 0;
	for (var str of string) {
		if (str == ' ') {
			count++;
		}
		else if (str != ' ') {
			break;
		}
	}
	return count;
};
export var insertCharacter = function (string, n, character) {
	var length = len (string) - 1;
	if (n <= length) {
		var list_i = list (string);
		list_i.insert (n, character);
		var str_i = ''.join (list_i);
	}
	else {
		var list_i = list (string);
		for (var x = 0; x < (n - length) - 1; x++) {
			list_i.append (' ');
		}
		list_i.insert (n, character);
		var str_i = ''.join (list_i);
	}
	return str_i;
};
export var getConbine = function (dict_data_orgin, dict_data_new) {
	dict_data_orgin ['biborigin'] = dict_data_orgin.py_get ('biborigin').py_replace ('\r', '');
	var rows = dict_data_orgin.py_get ('biborigin').py_split (',\n');
	delete rows [-(1)];
	var rows_lists = ['author', 'keyWords', 'modelAlgo', 'users', 'first_row'];
	var space_number = calcu_spacenumber (rows [1]);
	var space_string = '';
	var equal_position = rows [1].find ('=');
	for (var x = 0; x < space_number; x++) {
		space_string += ' ';
	}
	var new_rows = [];
	new_rows.append (dict_data_new.py_get ('first_row'));
	for (var [key, value] of dict_data_new.py_items ()) {
		if (dict_data_new.py_get (key) && key == 'author') {
			var s = insertCharacter (space_string + key, equal_position, '=');
			var s = insertCharacter (s, equal_position + 2, '{');
			var value = value.py_replace ('and', ',');
			var s = s + value.py_replace (',', 'and');
			var s = insertCharacter (s, len (s), '},');
			new_rows.append (s);
		}
		else if (dict_data_new.py_get (key) && !__in__ (key, rows_lists)) {
			var s = insertCharacter (space_string + key, equal_position, '=');
			var s = insertCharacter (s, equal_position + 2, '{');
			if (isinstance (value, int)) {
				var s = s + str (value);
			}
			else {
				var s = s + value;
			}
			var s = insertCharacter (s, len (s), '},');
			new_rows.append (s);
		}
		else if (dict_data_new.py_get (key) && key != 'first_row' && __in__ (key, rows_lists)) {
			var s = insertCharacter (space_string + key, equal_position, '=');
			var s = insertCharacter (s, equal_position + 2, '{');
			for (var val of value) {
				var s = (s + val) + ',';
			}
			var s = s.rstrip (',');
			var s = insertCharacter (s, len (s), '},');
			new_rows.append (s);
		}
	}
	new_rows [-(1)] = new_rows [-(1)].rstrip (',');
	new_rows.append ('}');
	var bibtex = '\n'.join (new_rows);
	return bibtex;
};
export var getTag = function (bibtex) {
	var bibtex = re.sub ('[\r\n\t]', '', bibtex);
	//console.log(bibtex)
	for (var x = 0; x < 200; x++) {
		var bibtex = bibtex.py_replace ('  ', ' ');
	}
	//console.log(bibtex)
	var bibtex = bibtex.py_split (',', 1);
	var first_row = bibtex [0] + ',';
	delete bibtex [0];
	var bibtex = ''.join (bibtex);
	var bibtex = bibtex.strip ();
	var bibtex_1 = bibtex.py_split (' = ');
	//console.log(bibtex_1)
	var bibtex_2 = [];
	for (var bib of bibtex_1) {
		var bib = bib.strip ();
		var bib = bib.py_split ('},', -(1));
		//console.log(bib)
		for (var b of bib) {
			var b = b.py_replace ('{', '');
			var b = b.py_replace ('}', '');
			var b = b.strip ();
			//console.log(b)
			bibtex_2.append (b);
		}
	}
	var dic = dict (zip (bibtex_2.__getslice__ (0, null, 2), bibtex_2.__getslice__ (1, null, 2)));
	dic ['first_row'] = first_row;
	if (dic.py_get ('author')) {	
		dic ['author'] = dic ['author'];
	}
	if (dic.py_get ('year')) {
		dic ['year'] = int (dic ['year']);
	}
	if (dic.py_get ('rating')) {
		dic ['rating'] = int (dic ['rating']);
	}
	return dic;
};
//# sourceMappingURL=bibUtils.map
//var bibtex = "@article{DBLP:journals/access/AshrafKHP20,\n	author    = {Imran Ashraf and Mingyu Kang and Soojung Hur and Yongwan Park},\n	 title     = {MINLOC: Magnetic Field Patterns-Based Indoor Localization Using Convolutional Neural Networks},\n	 journal   = {IEEE Access},\n	 volume    = {8},\n	 pages     = {66213--66227},\n	 year      = {2020},\n	 url       = {https://doi.org/10.1109/ACCESS.2020.2985384},\n	 doi       = {10.1109/ACCESS.2020.2985384},\n	 timestamp = {Fri, 22 May 2020 21:54:48 +0200},\n	 biburl    = {https://dblp.org/rec/journals/access/AshrafKHP20.bib},\n	 bibsource = {dblp computer science bibliography, https://dblp.org}}";

//console.log(getTag(bibtex));