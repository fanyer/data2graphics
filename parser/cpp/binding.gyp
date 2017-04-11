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
        "include_dirs" : [
            "<!(node -e \"require('nan')\")"
        ],
        'conditions':[
            ['OS=="mac"',{
                'xcode_settings':{
                    'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
                },
                'include_dirs':[]
            }]
        ]

    }]
}
