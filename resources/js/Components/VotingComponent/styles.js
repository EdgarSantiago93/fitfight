import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    const fitRed = theme.colors['fit-red'][4];
    return (
        {
            innerContainer: {
                background: 'white',
                borderRadius: "10px",
            },
            moduleBorderWrap: {
                width: "100%",
                padding: "11px 3px",
                position: "relative",
                backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),

                borderRadius: "10px",
                marginBottom: "10px"
            },

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
                maxHeight: '300px',
                maxWidth: '300px',
                height: 'calc(50vw - 30px)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: '10px',
            },
            photoView: {
                width: "100%", maxWidth: "320px", borderRadius: "10px",
            }
        }

    );


});


