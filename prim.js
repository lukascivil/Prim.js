var _ = require('underscore');
var dialog = require('dialog');
var colors = require('colors');

/*
    Student: LUCAS CORDEIRO DA SILVA
    University: UFF
    Algorithm: PRIM
    P.S: Connected Graph / Grafo Conexo
         Undirected  Graph / Grafo não Direcional   
*/

/*
var edges = [
    ["A", "B", 7], ["A", "D", 5],
    ["B", "C", 8], ["B", "D", 9], ["B", "E", 7],
    ["C", "E", 5],
    ["D", "E", 15], ["D", "F", 6],
    ["E", "F", 8], ["E", "G", 9],
    ["F", "G", 11]
];
*/

/*
var edges = [
    ["A", "B", 5],
    ["B", "C", 8], ["B", "D", 7],
    ["C", "D", 10],
    ["D", "A", 8]
];
*/


var edges = [
    ["A", "B", 4], ["A", "H", 8],
    ["B", "H", 11], ["B", "C", 8],
    ["C", "D", 7], ["C", "F", 4],
    ["D", "F", 14], ["D", "E", 9],
    ["E", "F", 10],
    ["F", "G", 2],
    ["G", "I", 6], ["G", "H", 1],
    ["H", "I", 7],
    ["I", "C", 2],
];


/*
var edges = [
    ["A", "B", 2], ["A", "D", 5], ["A", "F", 6],
    ["B", "C", 8], ["B", "D", 6],
    ["C", "B", 8], ["C", "E", 5], ["C", "D", 3],
    ["E", "D", 6], ["E", "F", 2],
];
*/

//Pega todos os nós e ordena
var nodes = [];
edges.forEach(function(edge, key){ nodes.push(edge[0]); nodes.push(edge[1]); });
nodes = _.sortBy(_.uniq(nodes), function(letra){ return letra; });

function prim(nodes, edges){

    process.stdout.write('\033c');
    var minimaledgecache = [];
    var minimalpath = [];
    var forest = [];
    forest = ["A"];
    var edgecache = [];
    var i = 0;
    var existe = false;
    var edgecachepolido = [];
    var cycleforest = new Object();
    nodes.forEach(function(node,key){ cycleforest[node]=key; });

    //(nodes==0) significa que a floresta já está completa, e os nodes que estavam fora da floresta acabaram
    while(nodes.length != 0) {

        //Pega todos os possiveis caminhos a partir dos nodes na floresta
        forest.forEach(function(forestedge, key) {
            edges.forEach(function(edge, key){
                
                if((edge[0] == forestedge) || (edge[1] == forestedge)) {
                    if(edgecache.length==0){

                        minimalpath.forEach(function(minimaledge, key) {
                            if(_.isEqual(minimaledge, edge)){
                                existe = true;
                            }
                        });

                        if(existe == false){
                            edgecache.push(edge);                       
                        }   
                    existe = false;
                    }else{

                        minimalpath.forEach(function(minimaledge, key) {
                            if(_.isEqual(minimaledge, edge)){
                                existe = true;
                            }
                        });

                        if(existe == false){
                            edgecache.push(edge);
                        }    
                    existe = false;
                    }
                }
            });
        });

        //Pega do cache, somente de quem nao faz ciclo
        edgecache.forEach(function(edge, key) {
            if(cycleforest[edge[0]] != cycleforest[edge[1]]) {
                edgecachepolido.push(edge);
            }   
        });

        //Pega a aresta de custo minimo do cachepolido sem ciclo
        minimaledgecache = _.min(edgecachepolido, function(edge) { 
            return edge[2]; 
        });
        
        forest = _.union(forest,[minimaledgecache[0]],[minimaledgecache[1]]);

        //Add a floresta de seguranca
        minimalpath.push(minimaledgecache);
        var aux = cycleforest[minimaledgecache[1]];
        cycleforest[minimaledgecache[1]] = cycleforest[minimaledgecache[0]];

        for(var index in cycleforest) { 
           if(cycleforest[index] == aux){ cycleforest[index] = cycleforest[minimaledgecache[0]]; }
        }

        //Remove o node que foi adicionado a floresta
        minimalpath.forEach(function(edge, key) {
            if(_.contains(nodes, edge[0])){
                nodes=_.without(nodes, edge[0]);
            }
            if(_.contains(nodes, edge[1])){
                nodes=_.without(nodes, edge[1]);
            }
        });
        
        console.log('edgecache'.green);
        console.log(edgecache);
        console.log('cycleforest analise da floresta'.green);
        console.log(JSON.stringify(cycleforest));
        console.log('edgecachepolido sem cycle'.green);
        console.log(edgecachepolido);
        console.log('forest'.green);
        console.log(forest);
        console.log('minimalpath'.green);
        console.log(minimalpath);
        console.log('nodes pendentes'.green);
        console.log(nodes);
        /*console.log('cycleforest'.green);
        console.log(JSON.stringify(cycleforest));*/
        console.log('\n---------------------------------------------------------------------------\n');

    //Limpa cache
    minimaledgecache = [];
    edgecachepolido = []
    edgecache = [];
    }
}

prim(nodes, edges);
