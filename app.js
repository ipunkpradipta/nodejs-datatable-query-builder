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
        value: 'ss',
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
let aColumns = [];
requestDataExample.columns.map((value) => {
    if(value.name !== exceptionColumn) aColumns.push(value.name);
});

const buildPagination = (requestDataExample) => {
    let sLimit = ''
    if(requestDataExample.start !== null && requestDataExample.length !== -1){
        sLimit += `LIMIT ${requestDataExample.start}, ${requestDataExample.length}`
    }
    return sLimit;
}

const buildSearchFiltering = (requestDataExample) => {
    let sWhere = '';
    if(typeof requestDataExample.search !== 'undefined' && requestDataExample.search.value != "")
    {
        sWhere = "WHERE (";
        aColumns.map((value) => sWhere += `${value} LIKE '%${requestDataExample.search.value}%' OR `);
        sWhere = sWhere.substring(0, sWhere.length -4);
        sWhere += ')';
    }
    return sWhere;
}

// extra Filtering with "parameter" params
const buildFiltering = (requestDataExample) => {
    let sWhere = buildSearchFiltering(requestDataExample);
    const parameters = requestDataExample.params; 
    if(typeof parameters !== 'undefined'){
        if(Array.isArray(parameters)){
            let wString='';
            parameters.map((param,index) => {
                (param.value.toLowerCase() === 'null') ? wString += `${param.key} IS NULL AND ` : wString += `${param.key} ${param.operator} '${param.value}' AND `
                if(index + 1 == parameters.length) wString = wString.substring(0,wString.length -5);
            })
            sWhere == '' ? sWhere = `WHERE ${wString}` : sWhere += ` AND ${wString}`  
        }
        return sWhere
    }
    return sWhere
}

const query = (requestDataExample) => {
    const pagination = buildPagination(requestDataExample); 
    const filtering = buildFiltering(requestDataExample);
    return `${filtering} ${pagination}` 
}

console.log(query(requestDataExample))

