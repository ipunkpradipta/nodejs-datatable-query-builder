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
    table: m_users
} 