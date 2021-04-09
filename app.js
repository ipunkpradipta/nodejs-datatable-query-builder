const exceptionColumn = 'action';
const requestDataExample = {
    draw: 1,
    columns: [
        {
            data:0,
            name:'name',
            searchable:true,
            orderable:true,
            search:{
                value:'',
                regex:false,
            }
        },
        {
            data:1,
            name:'email',
            searchable:true,
            orderable:true,
            search:{
                value:'',
                regex:false,
            }
        },
        {
            data:2,
            name:'phone_number',
            searchable:true,
            orderable:true,
            search:{
                value:'',
                regex:false,
            }
        },
        {
            data:3,
            name:'address',
            searchable:true,
            orderable:true,
            search:{
                value:'',
                regex:false,
            }
        },
        {
            data:4,
            name:'id',
            searchable:true,
            orderable:true,
            search:{
                value:'',
                regex:false,
            }
        },
    ],
    order: [
        {
            column:0,
            dir:'asc',
        }
    ],
    start: 0,
    length: 10,
    search:{
        value: '',
        regex: false,
    },
    table: 'm_users',
    params:[{
        key:'deleted_by',
        operator: "!=",
        value:'IPUNG',
    }]
}

//list of Column from request
let listColumn = [];
requestDataExample.columns.map((value) => {
    if(value.name !== exceptionColumn) listColumn.push(value.name);
});

const buildPagination = (requestDataExample) => {
    let limit = ''
    if(requestDataExample.start !== null && requestDataExample.length !== -1){
        limit += `LIMIT ${requestDataExample.start}, ${requestDataExample.length}`
    }
    return limit;
}

const buildSearchFiltering = (requestDataExample) => {
    let filter = '';
    if(typeof requestDataExample.search !== 'undefined' && requestDataExample.search.value != "")
    {
        filter = "WHERE (";
        listColumn.map((value) => filter += `${value} LIKE '%${requestDataExample.search.value}%' OR `);
        filter = filter.substring(0, filter.length -4);
        filter += ')';
    }
    return filter;
}

// extra Filtering with "parameter" params
const buildFiltering = (requestDataExample) => {
    let filter = buildSearchFiltering(requestDataExample);
    const parameters = requestDataExample.params; 
    if(typeof parameters !== 'undefined'){
        if(Array.isArray(parameters)){
            let whereParameter='';
            parameters.map((param,index) => {
                (param.value.toLowerCase() === 'null') ? whereParameter += `${param.key} IS NULL AND ` : whereParameter += `${param.key} ${param.operator} '${param.value}' AND `
                if(index + 1 == parameters.length) whereParameter = whereParameter.substring(0,whereParameter.length -5);
            })
            filter == '' ? filter = `WHERE ${whereParameter}` : filter += ` AND ${whereParameter}`  
        }
        return filter
    }
    return filter
}

const buildQuery = (requestDataExample) => {
    const pagination = buildPagination(requestDataExample); 
    const filtering = buildFiltering(requestDataExample);
    return `SELECT SQL_CALC_FOUND_ROWS ${listColumn.join(',')} FROM ${requestDataExample.table} ${filtering} ${pagination}`
}

console.log(buildQuery(requestDataExample))

