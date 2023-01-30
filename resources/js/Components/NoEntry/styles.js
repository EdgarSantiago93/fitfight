import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    const fitRed = theme.colors['fit-red'][4];
    return (
        {
            noEntry: {
                marginTop: '60px',
                textAlign: 'center',
            },

            label: {
                display: "inline-block",
                fontSize: "16px",
                fontWeight: 600,
                color: "#212529",
                marginBottom: "10px",
                letterSpacing: "-0.5px",

            },
            dogImg: {
                width: '100%',
                maxWidth: '200px'
            }

        }

    );


});


