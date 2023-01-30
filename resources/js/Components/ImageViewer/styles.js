import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    const fitRed = theme.colors['fit-red'][4];
    return (
        {
            loaderProgress: {
                display: 'inline-grid',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 700,
                color: theme.colors.gray[6],
            },
            uploadButton: {
                backgroundColor: '#ef372a2e',
                width: '100%',
                maxHeight: '400px',
                maxWidth: '400px',
                height: 'calc(50vw - 30px)',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '30px',

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
                maxHeight: '350px',
                maxWidth: '350px',
                height: 'calc(50vw - 70px)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: '10px',
            },
            smallImage: {
                width: '80px',
                maxHeight: '80px',
                maxWidth: '80px',
                height: '80px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: '10px',
            },


            noImage: {
                width: '100%',
                maxHeight: '350px',
                maxWidth: '350px',
                height: 'calc(50vw - 70px)',
                background: theme.colors.gray[2],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                fontSize: '30px',
            },
            noImageSmall: {
                width: '80px',
                maxHeight: '80px',
                maxWidth: '80px',
                height: '80px',
                background: theme.colors.gray[2],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                fontSize: '30px',
            },
            photoView: {
                width: "100%", maxWidth: "320px", borderRadius: "10px",
            }



        }

    );


});


