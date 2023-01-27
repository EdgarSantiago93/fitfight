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
                overflowY: 'scroll',

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
                height: '100px',
                padding: '10px 15px',
                borderRadius: theme.radius.xl,
                background: fitRed,
                color: 'white',
                marginTop: '20px',
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
                fontSize: '19px',
                fontWeight: '600',
                letterSpacing: '0px',
                lineHeight: 1,
            },

            missingVotesContainer_bottom: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: '500',
                letterSpacing: '-1px',
                lineHeight: 1,
                marginTop: '10px'
            },
            dateContainer: {
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "9px 10px",
            },
            day: {
                fontSize: '15px',
                fontWeight: '600',
                color: theme.colors.gray[6],
                lineHeight: 1,

            },
            date: {
                fontSize: '14px',
                fontWeight: '700',
                color: theme.colors.gray[8],
                lineHeight: 1,
                marginTop: '6px'
            },
            todayDateContainer: {
                lineHeight: 1,
                display: 'flex',
                fontSize: '15px',
                fontWeight: '600',
                color: theme.colors.gray[7],

                marginTop: '15px', marginLeft: '1px'
            },
            todayLabel: {
                lineHeight: 1,
                fontSize: '20px',
                fontWeight: '700',
                color: theme.colors.gray[8],
                marginTop: '0px',
                letterSpacing: '-1px'
            },

            today: {
                background: theme.colors.gray[1],
                padding: "9px 10px",
                borderRadius: "10px"
            },
            selectedDay: {
                border: `2px solid ${theme.colors['fit-red'][4]}`,
                padding: "9px 10px",
                borderRadius: "10px"
            }







        }

    );


});


