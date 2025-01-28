import ressurectit from 'eslint-plugin-ressurectit';

export default
[
    ...ressurectit.configs.recommended,
    {
        rules:
        {
            '@stylistic/keyword-spacing':
            [
                'warn',
                {
                    before: false,
                    after: false,
                    overrides:
                    {
                        import:
                        {
                            after: true,
                        },
                        export:
                        {
                            after: true,
                        },
                        from:
                        {
                            before: true,
                            after: true,
                        },
                        extends:
                        {
                            before: true,
                        },
                        as:
                        {
                            before: true,
                        },
                        return:
                        {
                            after: true,
                        },
                        type:
                        {
                            after: true,
                        },
                    },
                },
            ],
        },
    },
];
