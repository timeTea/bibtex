import {getTag} from './bibUtils.js'


var bibtex = "@article{DBLP:journals/access/AshrafKHP20,\n	author    = {Imran Ashraf and Mingyu Kang and Soojung Hur and Yongwan Park},\n	 title     = {MINLOC: Magnetic Field Patterns-Based Indoor Localization Using Convolutional Neural Networks},\n	 journal   = {IEEE Access},\n	 volume    = {8},\n	 pages     = {66213--66227},\n	 year      = {2020},\n	 url       = {https://doi.org/10.1109/ACCESS.2020.2985384},\n	 doi       = {10.1109/ACCESS.2020.2985384},\n	 timestamp = {Fri, 22 May 2020 21:54:48 +0200},\n	 biburl    = {https://dblp.org/rec/journals/access/AshrafKHP20.bib},\n	 bibsource = {dblp computer science bibliography, https://dblp.org}}";

console.log(getTag(bibtex));