{
    'variables': {

    },
    'targets': [{
        'target_name': 'parser',
        'win_delay_load_hook': 'true',
        'type': 'none',
        'sources': ['parser.cpp'],
        'cglags':[],
        'cglags!':[],
        'conditions':[
            ['OS=="mac"',{
                'xcode_settings':{
                    'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
                },
                'include_dirs':[]
            }]
        ]

    },{
        'target_name':''
    }
    }]
}
