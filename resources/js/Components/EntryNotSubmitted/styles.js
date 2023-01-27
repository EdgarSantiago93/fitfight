import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    console.log(theme);
    const fitRed = theme.colors['fit-red'][4];
    return (
        {
            notSubmitted: {
                marginTop: '15px'
            },

            label: {
                display: "inline-block",
                fontSize: "16px",
                fontWeight: 500,
                color: "#212529",
                wordBreak: "break-word",
                cursor: "default",
                WebkitTapHighlightColor: "transparent"
            },
            image: {
                width: '100%',
                maxHeight: '400px',
                maxWidth: '400px',
                height: 'calc(50vw - 30px)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: '10px',
            }



        }

    );


});


