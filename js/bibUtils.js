function splitFile(bibFile){
    var bibtex = bibFile.split('@')
    var b = []
    // console.log(bibtex)
    // var bibOrigin = {}
    // var num = 0;
    for (let index = 0; index < bibtex.length; index++) {
        if(bibtex[index] != ""){
            // bibOrigin["biborigin"] = '@'+bibtex[index]
            b.push(getTag('@'+bibtex[index]));
            // bibOrigin = {}
        }
    }
    // console.log(b)
    return b
}

function getTag(bibtex){
    bibtex = bibtex.replace(/[\r\n\t]/g,"")
    // bibtex = re.sub('[\r\n\t]', '', bibtex)
    for (let index = 0; index < 200; index++) {
        bibtex = bibtex.replace("  ", " ")
    }
    bibtex = bibtex.split(',')
    b = bibtex[1]
    for (let index = 2; index < bibtex.length; index++) {
        b  = b + "," + bibtex[index];
    }
    templeteBibtex = bibtex[0]
    bibtex = []
    bibtex.push(templeteBibtex)
    bibtex.push(b)
    // console.log(bibtex)
    
    //first_row = bibtex[0]+","
    // dblp_id = bibtex[0].split(':')[1]

    // console.log(bibtex)
    // console.log(dblp_id)
    // newBibtex = []
    // for (let index = 0; index < bibtex.length-1; index++) {
    //     newBibtex.push(bibtex[index+1]);
    //     // console.log(bibtex[index])
    // }// delete 0


    // console.log(typeof(newBibtex[0]))
    bibtex_1 = bibtex[1].split(' = ')
    bibtex_2 = []
    bibtex_1.forEach(bib => {
        bib = bib.replace(/\s+$/,'')
        bib = bib.replace(/^\s+/,'')
        bib = bib.replace(/[\r\n\t]/g,"")
        // templeteB = bib.split('}')
        // var s = ""
        // for (let index = 0; index < templeteB.length-1; index++) {
        //     s += templeteB[index]
        // }
        // b = bib.split("}")[templeteB.length-1]
        // bib = []
        // bib.push(b)
        // bib.push(s)
        bib = bib.split('},', -1)
        // console.log(bib)
        bib.forEach(b => {
            b = b.replace(/{/g,"")
            b = b.replace(/[/n]/g,"")
            b = b.replace(/}/g,"")
            b = b.replace(/\s+$/,'')
            b = b.replace(/^\s+/,'')
            console.log(b)
            // b = b.replace(/(^/s*)|(/s*$)/g, "")
            bibtex_2.push(b)
        });
    });
    // console.log(bibtex_2)
    bibTag = {}
    for (let index = 0; index < bibtex_2.length; index = index +2) {
        bibTag[bibtex_2[index]] = bibtex_2[index+1];
    }
    // console.log(bibTag)
    return bibTag
}