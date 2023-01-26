import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    console.log(theme);
    const fitRed = theme.colors['fit-red'][4];
    console.log(fitRed);
    return (
        {
            wrapper: {
                position: 'relative',
                padding: '15px 10px',
                width: '100%',
                height: '100vh',
                // display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',

                // borderRadius: theme.radius.sm,

                // // Dynamic media queries, define breakpoints in theme, use anywhere
                // [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                //     // Type safe child reference in nested selectors via ref
                //     [`& .${getRef('child')}`]: {
                //         fontSize: theme.fontSizes.xs,
                //     },
                // },
            },


            greeting: {
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                width: '100%',
                color: theme.colors.gray[8],
                height: '55px',

            },

            greeting_text: {
                fontSize: '23px',
                fontWeight: '500',
                letterSpacing: '-1px',
                lineHeight: 1,
            },
            greeting_text_name: {
                fontSize: '23px',
                fontWeight: '700',
                letterSpacing: '-1px',
                lineHeight: 1,
                marginTop: '2px'
            },
            avatarContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '55px',
            },

            // 


            missingVotesContainer: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '55px',
                borderRadius: theme.radius.lg,
                background: fitRed,
            },

            // 
            actionButton: {
                position: 'fixed',
                bottom: 30,
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center'
            },



            missingVotesContainer_top: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '-1px',
                lineHeight: 1,
            }








        }

    );


});


