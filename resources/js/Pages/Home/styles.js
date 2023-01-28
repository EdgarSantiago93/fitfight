import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    const fitRed = theme.colors['fit-red'][4];
    return (
        {
            wrapper: {
                position: 'relative',
                padding: '15px 10px',
                width: '100%',
                // height: '100vh',
                alignItems: 'start',
                justifyContent: 'start',
                // overflowY: 'scroll',


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
                fontSize: '21px',
                fontWeight: '500',
                letterSpacing: '-1px',
                lineHeight: 1,
            },
            greeting_text_name: {
                fontSize: '21px',
                fontWeight: '700',
                letterSpacing: '-1px',
                lineHeight: 1,
                marginTop: '2px'
            },
            avatarContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
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
                marginTop: '10px',
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
                padding: "0px 10px",
                paddingTop: '5px',
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box"
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
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                background: theme.colors.gray[1],
                padding: "0px 10px",
                paddingTop: '5px',
                borderRadius: "10px"
            },
            selectedDay: {
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                border: `2px solid ${theme.colors['fit-red'][4]}`,
                padding: "0px 10px",
                paddingTop: '5px',
                borderRadius: "10px"
            },
            validatedSelected: {
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                border: `2px solid ${theme.colors.lime[4]}!important`,
                borderRadius: "10px",
                padding: "0px 10px",
                paddingTop: '5px',
            },
            validated: {
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                background: theme.colors.lime[1],
                borderRadius: "10px",
                padding: "0px 10px",
                paddingTop: '5px',
            },
            forcedRest: {
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                background: theme.colors.gray[4],
                borderRadius: "10px",
                padding: "0px 10px",
                paddingTop: '5px',
            },
            pending: {
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                // background: theme.colors.yellow[1],
                borderRadius: "10px",
                padding: "0px 10px",
                paddingTop: '5px',
            }





        }

    );


});


